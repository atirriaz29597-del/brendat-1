"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronDown, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "../../components/Header";
import { STATE_FEES, packagePrices as defaultPackagePrices, comparisonFeatures as defaultFeatures } from "../data";

function Step2Inner() {
  const router = useRouter();
  const params = useSearchParams();
  const entity = params.get("entity") || "LLC";
  const state = params.get("state") || "";
  
  // Dynamic prices from Supabase (fallback to hardcoded)
  const [statePrices, setStatePrices] = useState<Record<string, number>>(STATE_FEES);
  const [packagePricesData, setPackagePricesData] = useState<Record<string, number>>(defaultPackagePrices);
  const [addonPrices, setAddonPrices] = useState<Record<string, number>>({
    expedited_filing: 50,
    contract_templates: 150,
    ein_tax_number: 70,
    operating_agreement: 99,
    irs_form_2553: 50,
  });
  const [pricesLoading, setPricesLoading] = useState(true);
  
  useEffect(() => {
    async function fetchAllPrices() {
      try {
        const [stateRes, packageRes, addonRes] = await Promise.all([
          fetch('/api/state-prices'),
          fetch(`/api/package-prices?state=${encodeURIComponent(state)}`),
          fetch(`/api/addon-prices?state=${encodeURIComponent(state)}`),
        ]);
        
        if (stateRes.ok) {
          const data = await stateRes.json();
          setStatePrices(data);
        }
        if (packageRes.ok) {
          const data = await packageRes.json();
          setPackagePricesData(data);
        }
        if (addonRes.ok) {
          const data = await addonRes.json();
          setAddonPrices(data);
        }
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      } finally {
        setPricesLoading(false);
      }
    }
    if (state) {
      fetchAllPrices();
    }
  }, [state]);
  
  const stateFee = statePrices[state] ?? 50;

  // Generate dynamic comparison features with updated addon prices
  const comparisonFeatures = [
    { label: "Preparing & Filing the Articles of Organization", sub: "See what's included →", basic: "✓", standard: "✓", premium: "✓" },
    { label: "FREE 1st Year Registered Agent Service!", basic: "✓", standard: "✓", premium: "✓" },
    { label: "FREE 1st Month of Virtual Address Service!", basic: "—", standard: "✓", premium: "✓" },
    { label: "Expedited Filing", sub: "2 business days (instead of 3 weeks)", basic: `+ $${addonPrices.expedited_filing || 50}`, standard: `+ $${addonPrices.expedited_filing || 50}`, premium: "✓" },
    { label: "Business Contract Templates", basic: `+ $${addonPrices.contract_templates || 150}`, standard: `+ $${addonPrices.contract_templates || 150}`, premium: "✓" },
    { label: "EIN Business Tax Number", basic: `+ $${addonPrices.ein_tax_number || 70}`, standard: "✓", premium: "✓" },
    { label: "Operating Agreement", basic: `+ $${addonPrices.operating_agreement || 99}`, standard: "✓", premium: "✓" },
    { label: "Domain Name + Business Email", basic: "—", standard: "—", premium: "✓" },
    { label: "FREE 1st Year Business Phone Number", sub: "*Offer valid only for US based clients.", basic: "—", standard: "—", premium: "✓" },
    { label: "Lifetime Compliance Alerts", basic: "—", standard: "✓", premium: "✓" },
    { label: "Unlimited Phone & Email Support", basic: "—", standard: "✓", premium: "✓" },
    { label: "Online Access Dashboard", basic: "✓", standard: "✓", premium: "✓" },
    { label: "Business Banking Account Offer", basic: "✓", standard: "✓", premium: "✓" },
    { label: "Business Tax Consultation", basic: "—", standard: "✓", premium: "✓" },
    { label: "IRS Form 2553", basic: `+ $${addonPrices.irs_form_2553 || 50}`, standard: "—", premium: "✓" },
  ];

  const [selectedPackage, setSelectedPackage] = useState<"Basic" | "Standard" | "Premium">("Standard");
  const orderTotal = (packagePricesData[selectedPackage] ?? 0) + stateFee;

  const handleNext = () => {
    router.push(
      `/order/step3?entity=${encodeURIComponent(entity)}&state=${encodeURIComponent(state)}&package=${selectedPackage}`
    );
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-accent">Your Progress:</span>
            <span className="text-xs font-bold text-gray-400">20%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: "20%" }} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="mb-10">
          <Link href="/#hero" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Start
          </Link>
          <h1 className="text-4xl font-black text-black leading-tight mb-2">
            Choose Your <span className="text-accent">Package</span>
          </h1>
          <p className="text-gray-500 text-base">
            Forming a <strong className="text-black">{entity}</strong> in <strong className="text-black">{state}</strong>. State fee: <strong className="text-black">${stateFee}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Comparison Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header row */}
              <div className="grid grid-cols-[1fr_120px_120px_120px] border-b border-gray-200">
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-lg font-black text-black">Business Formation<br />Packages</h3>
                </div>
                {(["Basic", "Standard", "Premium"] as const).map((pkg) => (
                  <div
                    key={pkg}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-4 text-center cursor-pointer transition-all border-l border-gray-200 relative ${selectedPackage === pkg ? (pkg === "Basic" ? "bg-gray-50" : "bg-accent/5") : "hover:bg-gray-50/50"}`}
                  >
                    {pkg === "Standard" && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-accent text-white text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-b-lg">Recommended</div>
                    )}
                    <span className={`inline-block text-xs font-bold rounded-full px-3 py-1 mb-2 mt-2 ${selectedPackage === pkg ? (pkg === "Basic" ? "bg-gray-200 text-black" : "bg-accent/15 text-accent") : "bg-gray-100 text-gray-500"}`}>
                      {pkg}
                    </span>
                    <div className="text-2xl font-black text-black">${packagePricesData[pkg] ?? 0}</div>
                    <p className="text-[10px] text-gray-400 mt-0.5">+ ${stateFee} state fee</p>
                    <div className={`flex items-center justify-center gap-1 mt-2 text-[10px] font-semibold ${pkg === "Premium" ? "text-accent" : "text-gray-400"}`}>
                      <Calendar className="w-3 h-3" /> {pkg === "Premium" ? "2 days" : "3 weeks"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature rows */}
              {comparisonFeatures.map((feat, i) => (
                <div key={i} className={`grid grid-cols-[1fr_120px_120px_120px] border-b border-gray-100 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                  <div className="px-6 py-3.5 flex flex-col justify-center">
                    <span className="text-sm font-semibold text-black italic">{feat.label}</span>
                    {feat.sub && <span className="text-[10px] text-gray-400 mt-0.5">{feat.sub}</span>}
                  </div>
                  {(["basic", "standard", "premium"] as const).map((plan) => {
                    const val = feat[plan];
                    return (
                      <div key={plan} className="px-2 py-3.5 flex items-center justify-center border-l border-gray-100">
                        {val === "check" ? (
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                        ) : val === "-" ? (
                          <span className="w-4 h-0.5 bg-gray-300 rounded-full inline-block" />
                        ) : (
                          <span className="text-xs font-bold text-accent">{val}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sticky top-24">
            <h3 className="text-lg font-black text-black mb-5">Order Summary</h3>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Entity Type:</span>
                <span className="font-bold text-accent">{entity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">State:</span>
                <span className="font-bold text-black">{state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{selectedPackage} Package:</span>
                <span className="font-bold text-black">${packagePricesData[selectedPackage] ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{state} State Fee:</span>
                <span className="font-bold text-black">${stateFee}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-black text-black">Total:</span>
                <span className="font-black text-black text-xl">${orderTotal}</span>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-accent/25 transition-all text-sm"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-2 mt-4 text-[11px] text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span><strong className="text-accent">One-time fee.</strong> Unlike other companies that charge annual fees, our formation fee is one-time.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Step2Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <Step2Inner />
    </Suspense>
  );
}
