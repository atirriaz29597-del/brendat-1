"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, BookOpen, Calculator, FileText, TrendingDown, AlertTriangle, Sparkles } from "lucide-react";
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

/* -- Learn items ------------------------------------------------ */
const learnItems = [
  { icon: Calculator, text: "How your Corporation is taxed" },
  { icon: BookOpen, text: "Business bookkeeping requirements" },
  { icon: FileText, text: "How to choose the proper IRS tax election" },
  { icon: AlertTriangle, text: "How to reduce the chance of an IRS audit" },
  { icon: TrendingDown, text: "Commonly missed tax deductions" },
  { icon: Shield, text: "How to reduce self employment taxes" },
];

function Step9Inner() {
  const router = useRouter();
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

  const [consultChoice, setConsultChoice] = useState<"yes" | "no">("no");

  const buildBackUrl = () => {
    const q = new URLSearchParams({ entity, state, package: pkg, name: companyName, designator, filing, virtualAddress, einChoice, ...buildPricingParams(packagePrice, stateFee) });
    return `/order/step8?${q.toString()}`;
  };

  const handleNext = () => {
    const q = new URLSearchParams({ entity, state, package: pkg, name: companyName, designator, filing, virtualAddress, einChoice, ...buildPricingParams(packagePrice, stateFee) });
    router.push(`/order/step10?${q.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-black">
      <Header />
      <ProgressBar pct={85} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">

          {/* Left */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-xl font-black text-black">Tax Strategy / Free Consultation</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Thousands of dollars are exposed to unnecessary taxation due to missed deductions and improperly choosing the wrong IRS classification. The right tax strategy can save your business thousands every year.
            </p>

            {/* What you will learn */}
            <div className="border border-gray-200 rounded-2xl p-6 mb-8 bg-gray-50/60">
              <h3 className="text-base font-black text-black mb-5">What you&apos;ll learn</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learnItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Choice cards */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setConsultChoice("no")}
                className={`flex-1 py-5 px-5 rounded-2xl border-2 text-left transition-all ${consultChoice === "no" ? "border-accent bg-accent/5 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${consultChoice === "no" ? "border-accent" : "border-gray-300"}`}>
                    {consultChoice === "no" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                  </div>
                  <span className="font-bold text-black text-sm">I&apos;m not interested at this time</span>
                </div>
              </button>
              <button
                onClick={() => setConsultChoice("yes")}
                className={`flex-1 py-5 px-5 rounded-2xl border-2 text-left transition-all ${consultChoice === "yes" ? "border-accent bg-accent/5 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${consultChoice === "yes" ? "border-accent" : "border-gray-300"}`}>
                    {consultChoice === "yes" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                  </div>
                  <div>
                    <span className="font-bold text-black text-sm block">Yes, I would like to receive the Business Tax Consultation</span>
                    <span className="text-xs text-emerald-600 font-bold mt-0.5 inline-block">(FREE)</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Back / Proceed to Payment */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <Link
                href={buildBackUrl()}
                className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Link>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 text-sm font-bold text-white bg-accent hover:bg-accent-dark rounded-xl px-8 py-3 shadow-lg shadow-accent/25 transition-all"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
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
              {consultChoice === "yes" && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax Consultation</span>
                  <span className="font-bold text-emerald-600">Free</span>
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

export default function Step9Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <Step9Inner />
    </Suspense>
  );
}
