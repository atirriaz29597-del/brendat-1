"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, ArrowRight, ChevronDown, Info } from "lucide-react";
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

function Step8Inner() {
  const router = useRouter();
  const params = useSearchParams();
  const entity = params.get("entity") || "LLC";
  const state = params.get("state") || "";
  const pkg = (params.get("package") || "Standard") as "Basic" | "Standard" | "Premium";
  const companyName = params.get("name") || "";
  const designator = params.get("designator") || "LLC";
  const filing = params.get("filing") || "standard";
  const virtualAddress = (params.get("virtualAddress") || "own") as "virtual" | "own";
  const firstName = params.get("firstName") || "";
  const lastName = params.get("lastName") || "";
  const email = params.get("email") || "";
  const phone = params.get("phone") || "";
  const country = params.get("country") || "United States";
  const street = params.get("street") || "";
  const addressCont = params.get("addressCont") || "";
  const city = params.get("city") || "";
  const addrState = params.get("addrState") || "";
  const zip = params.get("zip") || "";
  const { packagePrice, stateFee } = resolveSelectedPricing(params, state, pkg);
  const expeditedFee = filing === "expedited" ? 50 : 0;
  const virtualAddressFee = virtualAddress === "virtual" ? 110 : 0;

  const [einChoice, setEinChoice] = useState<"get" | "skip">("get");
  const einFee = (pkg === "Basic" && einChoice === "get") ? 70 : 0;
  const orderTotal = packagePrice + stateFee + expeditedFee + virtualAddressFee + einFee;

  const [responsibleParty, setResponsibleParty] = useState("");
  const [businessPurpose, setBusinessPurpose] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const buildBackUrl = () => {
    const q = new URLSearchParams({
      entity,
      state,
      package: pkg,
      name: companyName,
      designator,
      filing,
      firstName,
      lastName,
      email,
      phone,
      virtualAddress,
      country,
      street,
      addressCont,
      city,
      addrState,
      zip,
      ...buildPricingParams(packagePrice, stateFee),
    });
    return `/order/step7?${q.toString()}`;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (einChoice === "get") {
      if (!responsibleParty.trim()) e.responsibleParty = "Responsible Party is required";
      if (!businessPurpose.trim()) e.businessPurpose = "Business Purpose is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    const q = new URLSearchParams({
      entity,
      state,
      package: pkg,
      name: companyName,
      designator,
      filing,
      firstName,
      lastName,
      email,
      phone,
      virtualAddress,
      country,
      street,
      addressCont,
      city,
      addrState,
      zip,
      einChoice,
      ...buildPricingParams(packagePrice, stateFee),
    });
    router.push(`/order/step9?${q.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-black">
      <Header />
      <ProgressBar pct={80} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">

          {/* Left */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
            <h2 className="text-xl font-black text-black mb-3">EIN / Tax Identification Number Information</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              An Employer Identification Number (EIN) is a nine-digit number that is assigned by the IRS and used to identify taxpayers. We will apply and obtain your EIN from the IRS electronically.
            </p>

            {/* EIN Choice */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setEinChoice("get")}
                className={`flex-1 py-4 px-5 rounded-2xl border-2 text-left transition-all ${einChoice === "get" ? "border-accent bg-accent/5 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${einChoice === "get" ? "border-accent" : "border-gray-300"}`}>
                    {einChoice === "get" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                  </div>
                  <span className="font-bold text-black text-sm">Get my EIN for me</span>
                  {pkg === "Basic" && <span className="text-xs text-amber-600 font-bold">$70 Fee for EIN</span>}
                </div>
                <p className="text-xs text-gray-500 ml-8">We will obtain your EIN from the IRS</p>
              </button>
              <button
                onClick={() => setEinChoice("skip")}
                className={`flex-1 py-4 px-5 rounded-2xl border-2 text-left transition-all ${einChoice === "skip" ? "border-accent bg-accent/5 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${einChoice === "skip" ? "border-accent" : "border-gray-300"}`}>
                    {einChoice === "skip" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                  </div>
                  <span className="font-bold text-black text-sm">I do not need EIN</span>
                </div>
                <p className="text-xs text-gray-500 ml-8">Skip this step</p>
              </button>
            </div>

            {/* EIN Application Details (shown only when "get") */}
            {einChoice === "get" && (
              <div className="border border-amber-200 bg-amber-50/40 rounded-2xl p-6 mb-8">
                <h3 className="text-base font-black text-black mb-1">EIN Application Details</h3>
                <p className="text-xs text-gray-500 mb-6">
                  We will need some additional information to complete your EIN application with the IRS.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Responsible Party</label>
                    <div className="relative">
                      <select
                        value={responsibleParty}
                        onChange={(e) => setResponsibleParty(e.target.value)}
                        className={`appearance-none w-full pl-4 pr-10 py-3 rounded-xl border text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent ${errors.responsibleParty ? "border-red-400" : "border-gray-200"}`}
                      >
                        <option value="">Select Responsible Party</option>
                        <option value="member">Member / Owner</option>
                        <option value="manager">Manager</option>
                        <option value="officer">Officer</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {errors.responsibleParty && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <Info className="w-3.5 h-3.5 text-red-500" />
                        <span className="text-xs text-red-500 font-medium">{errors.responsibleParty}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Business Purpose</label>
                    <input
                      type="text"
                      value={businessPurpose}
                      onChange={(e) => setBusinessPurpose(e.target.value)}
                      placeholder="e.g., Consulting Services"
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.businessPurpose ? "border-red-400" : "border-gray-200"}`}
                    />
                    {errors.businessPurpose && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <Info className="w-3.5 h-3.5 text-red-500" />
                        <span className="text-xs text-red-500 font-medium">{errors.businessPurpose}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Back / Next */}
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

export default function Step8Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <Step8Inner />
    </Suspense>
  );
}
