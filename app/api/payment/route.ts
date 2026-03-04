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

const MERCHANT_ID = process.env.BAMS_MERCHANT_ID!;
const KEY_ID = process.env.BAMS_KEY_ID!;
const SECRET_KEY = process.env.BAMS_SECRET_KEY!; // base64-encoded
const GATEWAY_HOST =
  process.env.BAMS_GATEWAY_HOST || "apitest.cybersource.com";

const PAYMENTS_PATH = "/pts/v2/payments";

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

  const decodedKey = Buffer.from(SECRET_KEY, "base64");
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
    const body = await req.json();
    const { cardNumber, cardExpiry, cardCvv, cardName, email, amount, planName } =
      body;

    /* ── Server-side validation ── */
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName || !amount) {
      return NextResponse.json(
        { ok: false, message: "Missing required payment fields." },
        { status: 400 }
      );
    }

    const cleanCard = cardNumber.replace(/\s/g, "");
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
          totalAmount: String(Number(amount).toFixed(2)),
          currency: "USD",
        },
        billTo: {
          firstName,
          lastName,
          email: email || "customer@example.com",
          country: "US",
          // Minimal required address fields
          address1: "N/A",
          locality: "Houston",
          administrativeArea: "TX",
          postalCode: "77001",
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

    /* ── Evaluate response ── */
    // CyberSource returns status "AUTHORIZED" or "DECLINED" etc.
    const txnStatus: string = data?.status || "";

    if (
      gatewayRes.ok &&
      (txnStatus === "AUTHORIZED" || txnStatus === "PENDING")
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
    const errMsg =
      data?.errorInformation?.message ||
      data?.message ||
      data?.status ||
      "Payment was declined. Please check your card details and try again.";

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
