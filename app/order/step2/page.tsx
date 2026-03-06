"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "../../components/Header";
import { STATE_FEES, packagePrices as defaultPackagePrices } from "../data";

function Step2Inner() {
  const router = useRouter();
  const params = useSearchParams();
  const entity = params.get("entity") || "LLC";
  const state = params.get("state") || "";
  
  // Dynamic prices from Supabase (fallback to hardcoded)
  const [statePrices, setStatePrices] = useState<Record<string, number>>(STATE_FEES);
  const [packagePricesData, setPackagePricesData] = useState<Record<string, number>>(defaultPackagePrices);
  const [pricesLoaded, setPricesLoaded] = useState(false);
  
  // Map entity param to API entity type
  const getEntityType = (entityParam: string): string => {
    const entityMap: Record<string, string> = {
      'LLC': 'LLC',
      'S-Corp': 'S-Corp',
      'S-Corporation': 'S-Corp',
      'C-Corp': 'C-Corp',
      'C-Corporation': 'C-Corp',
      'Corporation': 'C-Corp',
      'Nonprofit': 'Nonprofit',
      'Non-Profit': 'Nonprofit',
    };
    return entityMap[entityParam] || 'LLC';
  };

  const entityType = getEntityType(entity);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const [stateRes, packageRes] = await Promise.all([
          fetch(`/api/state-prices?entity=${encodeURIComponent(entityType)}`),
          fetch(`/api/package-prices?state=${encodeURIComponent(state)}`),
        ]);
        
        if (stateRes.ok) {
          const data = await stateRes.json();
          setStatePrices(data);
        }
        if (packageRes.ok) {
          const data = await packageRes.json();
          setPackagePricesData(data);
        }
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      } finally {
        setPricesLoaded(true);
      }
    }
    if (state) {
      fetchPrices();
    } else {
      setPricesLoaded(true);
    }
  }, [state, entityType]);
  
  const stateFee = statePrices[state] ?? 50;

  // Features included in each package
  const packageFeatures: Record<"Basic" | "Standard" | "Premium", string[]> = {
    Basic: [
      "Preparing & Filing Articles of Organization",
      "Name Availability Check",
      "Business Tax Consultation",
    ],
    Standard: [
      "Preparing & Filing Articles of Organization",
      "Name Availability Check",
      "Registered Agent (1st year)",
      "EIN Business Tax Number",
      "Banking Resolutions",
      "Operating Agreement",
      "Business Banking Account Offer",
      "Phone & Email Support",
      "Business Tax Consultation",
      "Lifetime Compliance Alerts",
    ],
    Premium: [
      "Preparing & Filing Articles of Organization",
      "Name Availability Check",
      "Registered Agent (1st year)",
      "EIN Business Tax Number",
      "Banking Resolutions",
      "Operating Agreement",
      "Fintech Bank Account Setup",
      "Domain Name + Business Email",
      "Expedited Filing (3 to 5 Business Days)",
      "Google My Business (GMB) Setup",
      "Unlimited Phone & Email Support",
      "Business Tax Consultation",
      "Lifetime Compliance Alerts",
      "IRS Form 2553",
      "Basic multi-page website (Home, About, Services, Contact)",
    ],
  };

  const [selectedPackage, setSelectedPackage] = useState<"Basic" | "Standard" | "Premium">("Standard");
  const orderTotal = (packagePricesData[selectedPackage] ?? 0) + stateFee;

  const handleNext = () => {
    router.push(
      `/order/step3?entity=${encodeURIComponent(entity)}&state=${encodeURIComponent(state)}&package=${selectedPackage}`
    );
  };

  // Show loading state while prices are being fetched
  if (!pricesLoaded) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 font-medium">Loading packages...</p>
          </div>
        </div>
      </div>
    );
  }

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
          {/* Package Selection & Features */}
          <div className="space-y-6">
            {/* Package Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(["Basic", "Standard", "Premium"] as const).map((pkg) => (
                <div
                  key={pkg}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedPackage === pkg 
                      ? "border-accent bg-accent/5 shadow-lg shadow-accent/10" 
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {pkg === "Standard" && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Recommended</div>
                  )}
                  <div className="text-center">
                    <span className={`inline-block text-xs font-bold rounded-full px-3 py-1 mb-3 ${
                      selectedPackage === pkg ? "bg-accent/15 text-accent" : "bg-gray-100 text-gray-500"
                    }`}>
                      {pkg}
                    </span>
                    <div className="text-3xl font-black text-black">${packagePricesData[pkg] ?? 0}</div>
                    <p className="text-xs text-gray-400 mt-1">+ ${stateFee} state fee</p>
                    <div className={`flex items-center justify-center gap-1 mt-3 text-xs font-semibold ${
                      pkg === "Premium" ? "text-accent" : "text-gray-400"
                    }`}>
                      <Calendar className="w-3 h-3" /> {pkg === "Premium" ? "3-5 days" : "1-2 weeks"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features List for Selected Package */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-black">
                  {selectedPackage} Package Includes:
                </h3>
                <span className="text-sm font-bold text-accent">
                  ${packagePricesData[selectedPackage] ?? 0} + ${stateFee} State Fee
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packageFeatures[selectedPackage].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-accent/5 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
                {selectedPackage === "Basic" && "Perfect for simple formations • Upgrade anytime"}
                {selectedPackage === "Standard" && "Most popular choice • Everything you need to get started"}
                {selectedPackage === "Premium" && "Complete package • Fastest processing time"}
              </div>
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
