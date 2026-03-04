"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronDown, ArrowLeft, ArrowRight, Info } from "lucide-react";
import Header from "../../components/Header";
import { STATE_FEES, packagePrices } from "../data";

function Step3Inner() {
  const router = useRouter();
  const params = useSearchParams();
  const entity = params.get("entity") || "LLC";
  const state = params.get("state") || "";
  const pkg = (params.get("package") || "Standard") as "Basic" | "Standard" | "Premium";
  const stateFee = STATE_FEES[state] ?? 50;
  const orderTotal = packagePrices[pkg] + stateFee;

  const [companyName, setCompanyName] = useState("");
  const [designator, setDesignator] = useState("LLC");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleNext = () => {
    if (!companyName.trim()) return;
    router.push(
      `/order/step4?entity=${encodeURIComponent(entity)}&state=${encodeURIComponent(state)}&package=${pkg}&name=${encodeURIComponent(companyName.trim())}&designator=${encodeURIComponent(designator)}`
    );
  };

  const faqs = [
    {
      q: "What if company name is unavailable?",
      a: "If your desired company name is already taken or too similar to an existing business in the state, we will notify you and work with you to find a suitable alternative. You can provide up to 3 backup names during the formation process.",
    },
    {
      q: `Does the company name end with "LLC" or "INC"?`,
      a: `Yes - every formally registered business must include a legal designator at the end of its name. For LLCs, common suffixes include "LLC" or "L.L.C." For corporations, you'll use "Inc.", "Corp.", or similar. The designator you select above will be appended to your company name automatically.`,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-accent">Your Progress:</span>
            <span className="text-xs font-bold text-gray-400">30%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: "30%" }} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="mb-10">
          <Link
            href={`/order/step2?entity=${encodeURIComponent(entity)}&state=${encodeURIComponent(state)}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Packages
          </Link>
          <h1 className="text-4xl font-black text-black leading-tight mb-2">
            Company <span className="text-accent">Information</span>
          </h1>
          <p className="text-gray-500 text-base">
            Enter the name for your <strong className="text-black">{entity}</strong> in <strong className="text-black">{state}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Left - Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 md:p-10">
              <h2 className="text-2xl font-black text-black mb-6">Enter Your Company Name</h2>
              <div className="border-t border-gray-200 pt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-bold text-gray-600 mb-2">
                      {entity} Name
                      <span className="group relative cursor-help">
                        <Info className="w-3.5 h-3.5 text-gray-400" />
                        <span className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black text-white text-xs rounded-lg px-3 py-2 w-52 text-center shadow-lg z-10">
                          Enter your desired company name without the designator.
                        </span>
                      </span>
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter company name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-bold text-gray-600 mb-2">
                      Designator
                      <span className="group relative cursor-help">
                        <Info className="w-3.5 h-3.5 text-gray-400" />
                        <span className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black text-white text-xs rounded-lg px-3 py-2 w-52 text-center shadow-lg z-10">
                          The legal suffix added to your company name.
                        </span>
                      </span>
                    </label>
                    <div className="relative">
                      <select
                        value={designator}
                        onChange={(e) => setDesignator(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all appearance-none cursor-pointer"
                      >
                        <option>LLC</option>
                        <option>L.L.C.</option>
                        <option>Limited Liability Company</option>
                        {(entity === "S-Corporation" || entity === "C-Corporation") && (
                          <>
                            <option>Inc.</option>
                            <option>Corp.</option>
                            <option>Corporation</option>
                            <option>Incorporated</option>
                          </>
                        )}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {companyName && (
                  <div className="bg-gray-50 rounded-xl px-5 py-3.5 mb-8 border border-gray-200">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Your company will be registered as:</p>
                    <p className="text-lg font-black text-black">{companyName} {designator}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <Link
                    href={`/order/step2?entity=${encodeURIComponent(entity)}&state=${encodeURIComponent(state)}`}
                    className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black border border-gray-200 rounded-xl px-6 py-3 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Link>
                  <button
                    onClick={handleNext}
                    disabled={!companyName.trim()}
                    className="flex items-center gap-2 text-sm font-bold text-white bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-3 shadow-lg shadow-accent/25 transition-all"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 md:p-10">
              <h3 className="text-lg font-black text-black mb-5">Additional Explanation</h3>
              {faqs.map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-xl mb-3 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {item.q}
                    <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{item.a}</div>
                  )}
                </div>
              ))}
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
                <span className="text-gray-500">{pkg} Package</span>
                <span className="font-bold text-black">{packagePrices[pkg] === 0 ? "Free" : `$${packagePrices[pkg]}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{state} State Filing Fee</span>
                <span className="font-bold text-black">${stateFee}</span>
              </div>
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

export default function Step3Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <Step3Inner />
    </Suspense>
  );
}
