"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: any[]) => void;
  }
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const isOrder = searchParams.get("type") === "order";
  const transactionId = searchParams.get("transactionId") || "";
  const parsedValue = Number(searchParams.get("value"));
  const conversionValue = Number.isFinite(parsedValue) ? parsedValue : 1.0;

  useEffect(() => {
    if (!isOrder) return;

    // Fire Google Ads purchase conversion only for real orders (not form submissions)
    // and only once per unique transaction id (or once per session if none).
    const dedupeKey = transactionId ? `ads_conv_order_${transactionId}` : "ads_conv_order";
    try {
      if (typeof window !== "undefined" && window.sessionStorage?.getItem(dedupeKey)) return;
      window.sessionStorage?.setItem(dedupeKey, "1");
    } catch {
      // ignore storage errors (private mode / blocked storage)
    }

    if (typeof window.gtag !== "function") return;
    window.gtag("event", "conversion", {
      send_to: "AW-17996578935/FeG0CNXAl6AcEPeAuIVD",
      value: conversionValue,
      currency: "USD",
      transaction_id: transactionId,
      // new_customer: true/false, // add when available
    });
  }, [isOrder, transactionId, conversionValue]);

  return (
    <main className="min-h-screen bg-white px-4 py-20">
      <section className="mx-auto w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-xl sm:p-14">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        </div>

        <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-accent">
          {isOrder ? "Order Confirmed" : "Submission Received"}
        </p>
        <h1 className="mb-4 text-3xl font-black text-primary sm:text-4xl">
          {isOrder ? "Thank You for Your Order!" : "Thank You for Contacting Us"}
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-base text-gray-600">
          {isOrder
            ? "Your payment has been processed successfully. A confirmation email has been sent to your inbox. Our team will get in touch with you within 1-2 business days with updates on your filing."
            : "Your message was sent successfully. Our team will review it and get back to you as soon as possible."}
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-3 font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark"
          >
            Back to Home
          </Link>
          {!isOrder && (
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-7 py-3 font-semibold text-primary transition-all hover:bg-gray-50"
            >
              Submit another message <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
