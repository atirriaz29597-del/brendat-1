import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Bank of America Merchant Services – CyberSource REST API
 *
 * Integration method: Card-Not-Present (CNP) Integration Toolkit
 * Authentication:     HTTP Signature (shared secret / HMAC-SHA256)
 *
 * Reference: https://developer.cybersource.com/docs/cybs/en-us/platform/
 *   developer/all/rest/rest-getting-started/restgs-http-message-intro/
 *   restgs-http-message-conf-intro.html
 *
 * Credentials stay 100% server-side. Card data is forwarded to the
 * gateway and never stored.
 */

const MERCHANT_ID = normalizeEnvValue(process.env.BAMS_MERCHANT_ID || "");
const KEY_ID = normalizeEnvValue(process.env.BAMS_KEY_ID || "");
const SECRET_KEY = normalizeEnvValue(process.env.BAMS_SECRET_KEY || ""); // base64-encoded
const DEFAULT_GATEWAY_HOST =
  process.env.NODE_ENV === "production"
    ? "api.cybersource.com"
    : "apitest.cybersource.com";
const GATEWAY_HOST = normalizeGatewayHost(
  process.env.BAMS_GATEWAY_HOST || DEFAULT_GATEWAY_HOST
);

const PAYMENTS_PATH = "/pts/v2/payments";

const US_STATE_CODES: Record<string, string> = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
  "District of Columbia": "DC",
};

/* ═══════════════════════════════════════════
   CyberSource HTTP-Signature helpers
   ═══════════════════════════════════════════ */

/** SHA-256 digest of the JSON body: "SHA-256=<base64>" */
function computeDigest(body: string): string {
  const hash = crypto.createHash("sha256").update(body, "utf8").digest("base64");
  return `SHA-256=${hash}`;
}

/** RFC 1123 date: "Thu, 18 Jul 2019 00:18:03 GMT" */
function rfc1123Date(): string {
  return new Date().toUTCString();
}

function normalizeAdministrativeArea(value: string, country: string): string {
  const trimmedValue = value.trim();

  if (country.toUpperCase() !== "US") {
    return trimmedValue;
  }

  return US_STATE_CODES[trimmedValue] || trimmedValue.toUpperCase();
}

function normalizeGatewayHost(rawHost: string): string {
  return rawHost
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");
}

function normalizeEnvValue(rawValue: string): string {
  const trimmed = rawValue.trim();
  // Handles env platforms that store quoted strings, e.g. "value".
  return trimmed.replace(/^['\"]+|['\"]+$/g, "").trim();
}

function isConfigured(): boolean {
  return Boolean(MERCHANT_ID && KEY_ID && SECRET_KEY && GATEWAY_HOST);
}

function isTestGatewayHost(host: string): boolean {
  return /apitest\.cybersource\.com$/i.test(host);
}

function isValidCardNumber(rawValue: string): boolean {
  const digits = rawValue.replace(/\D/g, "");
  return digits.length >= 13 && digits.length <= 19;
}

function isValidExpiry(rawExpiry: string): boolean {
  const match = rawExpiry.trim().match(/^(\d{2})\/(\d{2}|\d{4})$/);
  if (!match) return false;

  const month = Number(match[1]);
  if (!Number.isInteger(month) || month < 1 || month > 12) return false;

  const yearPart = match[2];
  const fullYear = yearPart.length === 2 ? 2000 + Number(yearPart) : Number(yearPart);
  if (!Number.isInteger(fullYear)) return false;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (fullYear < currentYear) return false;
  if (fullYear === currentYear && month < currentMonth) return false;
  return true;
}

/**
 * Build the HTTP Signature header value.
 *
 * Validation string (each line separated by \n, NO trailing \n):
 *   host: <host>
 *   date: <date>
 *   request-target: post <path>
 *   digest: SHA-256=<hash>
 *   v-c-merchant-id: <mid>
 *
 * Signed with HMAC-SHA256 using the base64-decoded secret key.
 */
function buildSignatureHeader(
  host: string,
  date: string,
  requestTarget: string,
  digest: string,
  merchantId: string
): string {
  const signatureString = [
    `host: ${host}`,
    `date: ${date}`,
    `request-target: ${requestTarget}`,
    `digest: ${digest}`,
    `v-c-merchant-id: ${merchantId}`,
  ].join("\n");

  const decodedKey = Buffer.from(SECRET_KEY.replace(/\s+/g, ""), "base64");
  const signatureHash = crypto
    .createHmac("sha256", decodedKey)
    .update(signatureString, "utf8")
    .digest("base64");

  return (
    `keyid="${KEY_ID}", ` +
    `algorithm="HmacSHA256", ` +
    `headers="host date request-target digest v-c-merchant-id", ` +
    `signature="${signatureHash}"`
  );
}

/* ═══════════════════════════════════════════
   POST handler
   ═══════════════════════════════════════════ */
export async function POST(req: NextRequest) {
  try {
    if (process.env.NODE_ENV === "production" && isTestGatewayHost(GATEWAY_HOST)) {
      console.error("[payment] Production is configured with test CyberSource gateway host.");
      return NextResponse.json(
        {
          ok: false,
          message:
            "Payment service is configured for test mode on production. Please contact support.",
        },
        { status: 500 }
      );
    }

    if (!isConfigured()) {
      console.error("[payment] Missing gateway configuration.");
      return NextResponse.json(
        {
          ok: false,
          message:
            "Payment service is not configured correctly. Please contact support.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const {
      cardNumber,
      cardExpiry,
      cardCvv,
      cardName,
      email,
      amount,
      planName,
      billingAddress,
    } = body;

    const address1 = String(billingAddress?.address1 || "").trim();
    const address2 = String(billingAddress?.address2 || "").trim();
    const locality = String(billingAddress?.locality || "").trim();
    const country = String(billingAddress?.country || "US").trim() || "US";
    const administrativeArea = normalizeAdministrativeArea(
      String(billingAddress?.administrativeArea || ""),
      country
    );
    const postalCode = String(billingAddress?.postalCode || "").trim();
    const numericAmount = Number(amount);

    /* ── Server-side validation ── */
    if (
      !cardNumber ||
      !cardExpiry ||
      !cardCvv ||
      !cardName ||
      !email ||
      !amount ||
      !address1 ||
      !locality ||
      !administrativeArea ||
      !postalCode ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      return NextResponse.json(
        { ok: false, message: "Missing required payment or billing fields." },
        { status: 400 }
      );
    }

    const cleanCard = cardNumber.replace(/\s/g, "");

    if (!isValidCardNumber(cleanCard) || !isValidExpiry(String(cardExpiry || ""))) {
      return NextResponse.json(
        { ok: false, message: "Invalid card information." },
        { status: 400 }
      );
    }

    const [expMonth, rawYear] = cardExpiry.split("/");
    const expYear = rawYear.length === 2 ? `20${rawYear}` : rawYear;

    /* Split cardholder name for billTo (CyberSource requires first/last) */
    const nameParts = cardName.trim().split(/\s+/);
    const firstName = nameParts[0] || "N/A";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "N/A";

    /* ── Build CyberSource payment payload ── */
    const payload = {
      clientReferenceInformation: {
        code: `biz-${(planName || "plan").toLowerCase()}-${Date.now()}`,
      },
      processingInformation: {
        capture: true,
      },
      paymentInformation: {
        card: {
          number: cleanCard,
          expirationMonth: expMonth.padStart(2, "0"),
          expirationYear: expYear,
          securityCode: cardCvv,
        },
      },
      orderInformation: {
        amountDetails: {
          totalAmount: String(numericAmount.toFixed(2)),
          currency: "USD",
        },
        billTo: {
          firstName,
          lastName,
          email,
          country,
          address1,
          ...(address2 ? { address2 } : {}),
          locality,
          administrativeArea,
          postalCode,
        },
      },
    };

    const payloadStr = JSON.stringify(payload);

    /* ── CyberSource HTTP Signature auth ── */
    const date = rfc1123Date();
    const digest = computeDigest(payloadStr);
    const requestTarget = `post ${PAYMENTS_PATH}`;
    const signatureHeader = buildSignatureHeader(
      GATEWAY_HOST,
      date,
      requestTarget,
      digest,
      MERCHANT_ID
    );

    const url = `https://${GATEWAY_HOST}${PAYMENTS_PATH}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      host: GATEWAY_HOST,
      date: date,
      "v-c-date": date,
      "v-c-merchant-id": MERCHANT_ID,
      digest: digest,
      signature: signatureHeader,
    };

    console.log("[payment] POST", url);
    console.log("[payment] Headers:", {
      ...headers,
      signature: signatureHeader.replace(/signature="[^"]+"/, 'signature="***"'),
    });

    /* ── Forward to CyberSource ── */
    const gatewayRes = await fetch(url, {
      method: "POST",
      headers,
      body: payloadStr,
    });

    const data = await gatewayRes.json();
    console.log("[payment] Status:", gatewayRes.status);
    console.log("[payment] Response:", JSON.stringify(data, null, 2));

    if (gatewayRes.status === 401) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Payment processor authentication failed (401). Please verify production BAMS credentials and gateway host.",
        },
        { status: 502 }
      );
    }

    /* ── Evaluate response ── */
    // CyberSource returns status "AUTHORIZED" or "DECLINED" etc.
    const txnStatus: string = data?.status || "";

    if (
      gatewayRes.ok &&
      ["AUTHORIZED", "PENDING", "TRANSMITTED", "CAPTURED"].includes(txnStatus)
    ) {
      return NextResponse.json({
        ok: true,
        message: "Payment approved",
        transactionId: data.id || "",
        data: {
          status: txnStatus.toLowerCase(),
          amount,
          plan: planName,
          email,
        },
      });
    }

    /* ── Error / decline ── */
    const gatewayReason =
      data?.errorInformation?.reason ||
      data?.processorInformation?.responseCode ||
      data?.status ||
      `HTTP_${gatewayRes.status}`;

    const errMsg =
      data?.errorInformation?.message ||
      data?.message ||
      `Payment was declined by the processor (${gatewayReason}).`;

    return NextResponse.json(
      { ok: false, message: String(errMsg) },
      { status: 402 }
    );
  } catch (err: unknown) {
    console.error("[payment] Unexpected error:", err);
    return NextResponse.json(
      {
        ok: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
