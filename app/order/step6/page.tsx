"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, ArrowRight, Info, Shield, Mail, MapPin, Clock, Eye } from "lucide-react";
import Header from "../../components/Header";
import { buildPricingParams, resolveSelectedPricing } from "../pricing";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming","District of Columbia",
];

function ProgressBar() {
  return (
    <div className="bg-white border-b border-gray-100 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-accent">Your Progress:</span>
          <span className="text-xs font-bold text-gray-400">60%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: "60%" }} />
        </div>
      </div>
    </div>
  );
}

/* -- Virtual address benefits ------------------------------- */
const virtualBenefits = [
  { icon: Eye, text: "- Keep your home address off public records" },
  { icon: MapPin, text: "- Real physical address with unique suite number, not a PO Box" },
  { icon: Shield, text: "- Compliant with state/mail requirements" },
  { icon: Mail, text: "- Mail scans included" },
  { icon: Clock, text: "- 24/7 online access to your mailbox" },
];

function Step6Inner() {
  const router = useRouter();
  const params = useSearchParams();
  const entity = params.get("entity") || "LLC";
  const state = params.get("state") || "";
  const pkg = (params.get("package") || "Standard") as "Basic" | "Standard" | "Premium";
  const companyName = params.get("name") || "";
  const designator = params.get("designator") || "LLC";
  const filing = params.get("filing") || "standard";
  const firstName = params.get("firstName") || "";
  const lastName = params.get("lastName") || "";
  const email = params.get("email") || "";
  const phone = params.get("phone") || "";

  const { packagePrice, stateFee } = resolveSelectedPricing(params, state, pkg);
  const expeditedFee = filing === "expedited" ? 50 : 0;

  const [virtualAddress, setVirtualAddress] = useState<"virtual" | "own">("virtual");
  const virtualAddressFee = virtualAddress === "virtual" ? 110 : 0;
  const orderTotal = packagePrice + stateFee + expeditedFee + virtualAddressFee;

  const [country] = useState("United States");
  const [street, setStreet] = useState("");
  const [addressCont, setAddressCont] = useState("");
  const [city, setCity] = useState("");
  const [addrState, setAddrState] = useState("");
  const [zip, setZip] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const buildBackUrl = () => {
    const q = new URLSearchParams({
      entity, state, package: pkg, name: companyName, designator, filing,
      firstName, lastName, email, phone,
      ...buildPricingParams(packagePrice, stateFee),
    });
    return `/order/step5?${q.toString()}`;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!street.trim()) e.street = "Street Address is required";
    if (!city.trim()) e.city = "City is required";
    if (!addrState) e.addrState = "State is required";
    if (!zip.trim() || zip.replace(/\D/g, "").length < 5) e.zip = "Valid Zip Code is required";
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
      street: street.trim(),
      addressCont: addressCont.trim(),
      city: city.trim(),
      addrState,
      zip,
      ...buildPricingParams(packagePrice, stateFee),
    });
    router.push(`/order/step7?${q.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-black">
      <Header />
      <ProgressBar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">

          {/* Left - Address Form */}
          <div className="space-y-8">

            {/* Virtual Address Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-2xl font-black text-black">Company Address Information</h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Formation documents associated with your company are publicly available. Using a virtual address keeps your home address off public records.
              </p>

              {/* Virtual Address Promo */}
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-black text-black">Virtual Address</h3>
                  {virtualAddress === "virtual" && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-black rounded-full uppercase tracking-wide">$110 charges for One Year.</span>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {virtualBenefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <b.icon className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{b.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <button
                    onClick={() => setVirtualAddress("virtual")}
                    className={`flex-1 py-3.5 px-4 rounded-xl text-sm font-bold border-2 transition-all ${virtualAddress === "virtual" ? "border-accent bg-accent/5 text-accent" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                  >
                    <div className="flex items-center gap-2 justify-center">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${virtualAddress === "virtual" ? "border-accent" : "border-gray-300"}`}>
                        {virtualAddress === "virtual" && <div className="w-2 h-2 rounded-full bg-accent" />}
                      </div>
                      Use Virtual Address
                    </div>
                  </button>
                  <button
                    onClick={() => setVirtualAddress("own")}
                    className={`flex-1 py-3.5 px-4 rounded-xl text-sm font-bold border-2 transition-all ${virtualAddress === "own" ? "border-accent bg-accent/5 text-accent" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                  >
                    <div className="flex items-center gap-2 justify-center">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${virtualAddress === "own" ? "border-accent" : "border-gray-300"}`}>
                        {virtualAddress === "own" && <div className="w-2 h-2 rounded-full bg-accent" />}
                      </div>
                      I&apos;ll use my own address
                    </div>
                  </button>
                </div>

              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
                <Info className="w-4 h-4 text-blue-500 shrink-0" />
                <p className="text-xs text-blue-600 font-medium">USPS requires all commercial mail receiving agencies to have authorization on file.</p>
              </div>
            </div>

            {/* Contact Address Form */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
              <h3 className="text-lg font-black text-black mb-6">Contact Address</h3>

              {/* Country */}
              <div className="mb-5">
                <label className="block text-sm font-bold text-black mb-2">Country</label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
                  <span className="text-base">{"\u{1F1FA}\u{1F1F8}"}</span>
                  {country}
                </div>
              </div>

              {/* Street Address */}
              <div className="mb-5">
                <label className="block text-sm font-bold text-black mb-2">Street Address</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.street ? "border-red-400" : "border-gray-200"}`}
                />
                {errors.street && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Info className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-xs text-red-500 font-medium">{errors.street}</span>
                  </div>
                )}
              </div>

              {/* Address (Cont) */}
              <div className="mb-5">
                <label className="block text-sm font-bold text-black mb-2">
                  Address (Cont) <span className="text-gray-400 font-normal">Optional</span>
                </label>
                <input
                  type="text"
                  value={addressCont}
                  onChange={(e) => setAddressCont(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                />
              </div>

              {/* City / State / Zip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.city ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.city && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Info className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs text-red-500 font-medium">{errors.city}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">State</label>
                  <select
                    value={addrState}
                    onChange={(e) => setAddrState(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.addrState ? "border-red-400" : "border-gray-200"}`}
                  >
                    <option value="">Select</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.addrState && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Info className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs text-red-500 font-medium">{errors.addrState}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.zip ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.zip && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Info className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs text-red-500 font-medium">{errors.zip}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Back / Proceed to Payment */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Link
                  href={buildBackUrl()}
                  className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black border border-gray-200 rounded-xl px-6 py-3 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Link>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 text-sm font-bold text-white bg-accent hover:bg-accent-dark rounded-xl px-6 py-3 shadow-lg shadow-accent/25 transition-all"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
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
              {virtualAddress === "virtual" && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Virtual Address (1 Year)</span>
                  <span className="font-bold text-black">$110</span>
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
                <p className="text-xs text-accent mt-1">Available Monday - Saturday<br />8AM - 8PM CT</p>
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

export default function Step6Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <Step6Inner />
    </Suspense>
  );
}
