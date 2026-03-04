"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "../../components/Header";
import { STATE_FEES, packagePrices } from "../data";

/* -- Step 4 Inner -- */
function Step4Inner() {
  const router = useRouter();
  const params = useSearchParams();
  const entity = params.get("entity") || "LLC";
  const state = params.get("state") || "";
  const pkg = (params.get("package") || "Standard") as "Basic" | "Standard" | "Premium";
  const companyName = params.get("name") || "";
  const designator = params.get("designator") || "LLC";
  const stateFee = STATE_FEES[state] ?? 50;

  const [filingSpeed, setFilingSpeed] = useState<"expedited" | "standard">("standard");

  const expeditedFee = filingSpeed === "expedited" ? 50 : 0;
  const orderTotal = packagePrices[pkg] + stateFee + expeditedFee;

  const today = new Date();
  const expeditedDate = new Date(today);
  expeditedDate.setDate(today.getDate() + 2);
  while (expeditedDate.getDay() === 0 || expeditedDate.getDay() === 6) expeditedDate.setDate(expeditedDate.getDate() + 1);
  const standardDate = new Date(today);
  standardDate.setDate(today.getDate() + 21);
  const formatDate = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "2-digit" });

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-accent">Your Progress:</span>
            <span className="text-xs font-bold text-gray-400">40%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: "40%" }} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="mb-10">
          <Link
            href={`/order/step3?entity=${encodeURIComponent(entity)}&state=${encodeURIComponent(state)}&package=${pkg}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Company Info
          </Link>
          <h1 className="text-4xl font-black text-black leading-tight mb-2">
            State Filing <span className="text-accent">Time</span>
          </h1>
          <p className="text-gray-500 text-base">
            The typical state filing time for <strong className="text-black">{state}</strong> is <strong className="text-black">3 weeks</strong>. Choose the speed that works for you.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Left - Filing options */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Expedited */}
              <button
                onClick={() => setFilingSpeed("expedited")}
                className={`relative text-left rounded-2xl border-2 p-5 transition-all ${filingSpeed === "expedited" ? "border-accent bg-accent/5 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
              >
                <span className="absolute -top-3 left-4 bg-accent text-white text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full">Fast</span>
                <div className="flex items-center justify-between mb-3 mt-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${filingSpeed === "expedited" ? "border-accent" : "border-gray-300"}`}>
                      {filingSpeed === "expedited" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                    </div>
                    <span className="font-bold text-black text-sm">2 business days filing time.</span>
                  </div>
                  <span className="font-black text-black">$50</span>
                </div>
                <p className="text-xs text-accent font-semibold">Estimated Formation Date:</p>
                <p className="text-sm font-bold text-accent">{formatDate(expeditedDate)}*</p>
              </button>

              {/* Standard */}
              <button
                onClick={() => setFilingSpeed("standard")}
                className={`relative text-left rounded-2xl border-2 p-5 transition-all ${filingSpeed === "standard" ? "border-accent bg-accent/5 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${filingSpeed === "standard" ? "border-accent" : "border-gray-300"}`}>
                      {filingSpeed === "standard" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                    </div>
                    <span className="font-bold text-black text-sm">3 weeks filing time.</span>
                  </div>
                  <span className="font-black text-black">$0</span>
                </div>
                <p className="text-xs text-gray-500 font-semibold">Estimated Formation Date:</p>
                <p className="text-sm font-bold text-black">{formatDate(standardDate)}*</p>
              </button>
            </div>

            <p className="text-xs text-gray-400 italic mb-8">
              * These dates are estimations based on current state turnaround times and are subject to change based on state processing.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <Link
                href={`/order/step3?entity=${encodeURIComponent(entity)}&state=${encodeURIComponent(state)}&package=${pkg}`}
                className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black border border-gray-200 rounded-xl px-6 py-3 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Link>
              <button
                onClick={() => {
                  const q = new URLSearchParams({
                    entity, state, package: pkg, name: companyName, designator,
                    filing: filingSpeed,
                  });
                  router.push(`/order/step5?${q.toString()}`);
                }}
                className="flex items-center gap-2 text-sm font-bold text-white bg-accent hover:bg-accent-dark rounded-xl px-6 py-3 shadow-lg shadow-accent/25 transition-all"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sticky top-24">
            <h3 className="text-2xl font-black text-black mb-5">Order Summary</h3>
            <div className="border-t border-gray-200 pt-5 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Entity Type</span>
                <span className="font-bold text-accent">{entity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Company Name</span>
                <span className="font-bold text-black text-right max-w-[180px] truncate">{companyName} {designator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{pkg} Package</span>
                <span className="font-bold text-black">{packagePrices[pkg] === 0 ? "Free" : `$${packagePrices[pkg]}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{state} State Filing Fee</span>
                <span className="font-bold text-black">${stateFee}</span>
              </div>
              {filingSpeed === "expedited" && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Expedited Filing</span>
                  <span className="font-bold text-accent">$50</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Electronic Delivery</span>
                <CheckCircle2 className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Phone Support</span>
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                </div>
                <p className="text-xs text-accent mt-1">Available Monday - Friday<br />From 9 A.M. To 6 P.M. CST</p>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="font-black text-black">Total:</span>
                <span className="font-black text-black text-xl">${orderTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Step4Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <Step4Inner />
    </Suspense>
  );
}
