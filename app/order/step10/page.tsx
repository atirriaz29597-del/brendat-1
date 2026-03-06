"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Info, MapPin, Home, CreditCard, Lock } from "lucide-react";
import Header from "../../components/Header";
import { buildPricingParams, resolveSelectedPricing } from "../pricing";

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="bg-white border-b border-gray-100 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-accent">Your Progress:</span>
          <span className="text-xs font-bold text-gray-400">{pct}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

/* -- Success Modal -------------------------------------------- */
function SuccessModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-10 max-w-lg w-full mx-4 text-center shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Confetti-style icon */}
        <div className="relative mx-auto mb-6 w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-30" />
          <div className="relative w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
        </div>

        <h3 className="text-2xl font-black text-black mb-2">Thank You for Your Order!</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-2">
          Your payment has been processed successfully. Our team will begin working on your business formation right away.
        </p>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          A confirmation email has been sent to your inbox. Our team will get in touch with you within <span className="font-bold text-black">1-2 business days</span> with updates on your filing.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white font-bold rounded-xl hover:bg-accent-dark transition-all shadow-lg shadow-accent/25"
          >
            <Home className="w-4 h-4" /> Go to Home Page
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">Order reference will be included in your confirmation email.</p>
      </div>
    </div>
  );
}

/* -- Processing Overlay --------------------------------------- */
function ProcessingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-10 max-w-md w-full mx-4 text-center shadow-2xl">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <h3 className="text-xl font-black text-black mb-2">Processing Payment...</h3>
        <p className="text-gray-500 text-sm">Please wait while we securely process your payment.</p>
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
          <Lock className="w-3.5 h-3.5" />
          <span>256-bit SSL Encrypted</span>
        </div>
      </div>
    </div>
  );
}

function Step10Inner() {
  const params = useSearchParams();
  const entity = params.get("entity") || "LLC";
  const state = params.get("state") || "";
  const pkg = (params.get("package") || "Standard") as "Basic" | "Standard" | "Premium";
  const companyName = params.get("name") || "";
  const designator = params.get("designator") || "LLC";
  const filing = params.get("filing") || "standard";
  const virtualAddress = (params.get("virtualAddress") || "own") as "virtual" | "own";
  const einChoice = (params.get("einChoice") || "skip") as "get" | "skip";
  const { packagePrice, stateFee } = resolveSelectedPricing(params, state, pkg);
  const expeditedFee = filing === "expedited" ? 50 : 0;
  const virtualAddressFee = virtualAddress === "virtual" ? 110 : 0;
  const einFee = (pkg === "Basic" && einChoice === "get") ? 70 : 0;
  const orderTotal = packagePrice + stateFee + expeditedFee + virtualAddressFee + einFee;

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const formatCardNumber = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 16);
    return d.replace(/(.{4})/g, "$1 ").trim();
  };
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length > 2) return d.slice(0, 2) + "/" + d.slice(2);
    return d;
  };

  const buildBackUrl = () => {
    const q = new URLSearchParams({ entity, state, package: pkg, name: companyName, designator, filing, virtualAddress, einChoice, ...buildPricingParams(packagePrice, stateFee) });
    return `/order/step9?${q.toString()}`;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!cardName.trim()) e.cardName = "Cardholder name is required";
    if (cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Enter a valid 16-digit card number";
    if (expiry.length < 5) e.expiry = "Enter a valid expiry date";
    if (cvv.length < 3) e.cvv = "Enter a valid CVV";
    if (!agreed) e.agreed = "You must agree to the terms to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = async () => {
    if (!validate()) return;
    setProcessing(true);
    setPaymentError(null);

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardNumber: cardNumber.replace(/\s/g, ""),
          cardExpiry: expiry,
          cardCvv: cvv,
          cardName,
          amount: orderTotal,
          planName: `${entity} ${pkg}`,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        // Send order notification email
        try {
          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "order",
              data: {
                entity,
                state,
                packageName: pkg,
                packagePrice,
                companyName,
                designator,
                filing,
                stateFee,
                expeditedFee,
                orderTotal,
                cardName,
                transactionId: data.transactionId || "",
              },
            }),
          });
        } catch (emailErr) {
          console.error("Failed to send order email:", emailErr);
          // Don't block success even if email fails
        }

        setProcessing(false);
        setSuccess(true);
      } else {
        setProcessing(false);
        setPaymentError(data.message || "Payment was declined. Please check your card details and try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setProcessing(false);
      setPaymentError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-black">
      <Header />
      <ProgressBar pct={90} />

      {processing && <ProcessingOverlay />}
      {success && <SuccessModal />}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">

          {/* Left - Billing Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
            <h2 className="text-xl font-black text-black mb-8">Billing Information</h2>

            {/* Payment Error Alert */}
            {paymentError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-red-700">Payment Failed</p>
                  <p className="text-sm text-red-600 mt-1">{paymentError}</p>
                </div>
              </div>
            )}

            {/* Credit Card Information */}
            <form autoComplete="on" onSubmit={(e) => { e.preventDefault(); handlePay(); }}>
            <div className="border border-gray-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <h3 className="text-base font-bold text-gray-700">Credit Card Information</h3>
              </div>

              {/* Cardholder Full Name */}
              <div className="mb-5">
                <label className="block text-sm font-bold text-gray-600 mb-2">Cardholder Full Name</label>
                <input
                  type="text"
                  name="ccname"
                  autoComplete="cc-name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Full Name"
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.cardName ? "border-red-400" : "border-gray-200"}`}
                />
                {errors.cardName && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Info className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-xs text-red-500 font-medium">{errors.cardName}</span>
                  </div>
                )}
              </div>

              {/* Card Number */}
              <div className="mb-5">
                <label className="block text-sm font-bold text-gray-600 mb-2">Card number</label>
                <input
                  type="text"
                  name="cardnumber"
                  autoComplete="cc-number"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.cardNumber ? "border-red-400" : "border-gray-200"}`}
                />
                {errors.cardNumber && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Info className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-xs text-red-500 font-medium">{errors.cardNumber}</span>
                  </div>
                )}
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Expiry date</label>
                  <input
                    type="text"
                    name="cc-exp"
                    autoComplete="cc-exp"
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.expiry ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.expiry && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Info className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs text-red-500 font-medium">{errors.expiry}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">CVV/CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    autoComplete="cc-csc"
                    inputMode="numeric"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="3 digits"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.cvv ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.cvv && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Info className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs text-red-500 font-medium">{errors.cvv}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <h3 className="text-base font-bold text-black mb-4">Billing Address</h3>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-8 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-accent shrink-0" />
              <span className="text-sm text-gray-700 font-medium">
                Address provided in previous step will be used as billing address.
              </span>
            </div>

            {/* Agreement */}
            <div className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${agreed ? "bg-accent border-accent" : "border-gray-300 group-hover:border-gray-400"}`}>
                    {agreed && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-600 leading-relaxed">
                  I agree to the{" "}
                  <span className="text-blue-600 hover:underline font-medium cursor-pointer">Legal Statement</span>,{" "}
                  <span className="text-accent hover:underline font-medium cursor-pointer">Cancellation Policy</span>{" "}
                  and authorize the payment of{" "}
                  <span className="font-black text-black">${orderTotal.toFixed(2)}</span>.
                </span>
              </label>
              {errors.agreed && (
                <div className="flex items-center gap-1.5 mt-2 ml-8">
                  <Info className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-xs text-red-500 font-medium">{errors.agreed}</span>
                </div>
              )}
            </div>

            {/* Back / Complete and Pay */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <Link
                href={buildBackUrl()}
                className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="flex items-center gap-2 text-sm font-bold text-white bg-accent hover:bg-accent-dark rounded-xl px-8 py-3.5 shadow-lg shadow-accent/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Lock className="w-4 h-4" /> Complete &amp; Pay
              </button>
            </div>
            </form>
          </div>

          {/* Right - Order Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
            <h3 className="text-2xl font-black text-black mb-5">Order Summary</h3>
            <div className="border-t border-gray-200 pt-5 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Entity Type</span>
                <span className="font-bold text-accent">{entity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{pkg} Package</span>
                <span className="font-bold text-black">{packagePrice === 0 ? "Free" : `$${packagePrice}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{state} State Filing Fee</span>
                <span className="font-bold text-black">${stateFee}</span>
              </div>
              {expeditedFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Expedited Filing</span>
                  <span className="font-bold text-black">${expeditedFee}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Business Address (1st Month)</span>
                <span className="font-bold text-emerald-600">Free</span>
              </div>
              {virtualAddress === "virtual" && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Virtual Address (1 Year)</span>
                  <span className="font-bold text-black">$110</span>
                </div>
              )}
              {pkg === "Basic" && einChoice === "get" && (
                <div className="flex justify-between">
                  <span className="text-gray-500">EIN Filing Fee</span>
                  <span className="font-bold text-black">$70</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="font-black text-black">Total:</span>
                <span className="font-black text-black text-xl">${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Step10Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <Step10Inner />
    </Suspense>
  );
}
