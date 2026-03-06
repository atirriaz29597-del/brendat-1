"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, ArrowRight, ChevronDown, Info, Pencil, UserPlus, X } from "lucide-react";
import Header from "../../components/Header";
import { buildPricingParams, resolveSelectedPricing } from "../pricing";

/* -- Progress Bar (linear) -- */
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

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming","District of Columbia",
];

const DIRECTOR_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

interface OfficerData {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
}

const emptyOfficer: OfficerData = { firstName: "", lastName: "", city: "", state: "" };

type OfficerMode = "idle" | "editing" | "saved";

/* -- Officer Form Card -- */
function OfficerCard({
  title,
  description,
  optional,
  data,
  mode,
  onOpen,
  onSave,
  onEdit,
  onCancel,
  onChange,
  errors,
}: {
  title: string;
  description: string;
  optional?: boolean;
  data: OfficerData;
  mode: OfficerMode;
  onOpen: () => void;
  onSave: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onChange: (field: keyof OfficerData, value: string) => void;
  errors: Record<string, string>;
}) {
  /* Saved state - show summary */
  if (mode === "saved") {
    return (
      <div className="mb-8">
        <h4 className="text-sm font-black text-black mb-0.5">
          {title} {optional && <span className="text-gray-400 font-normal">(Optional)</span>}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">{description}</p>
        <div className="border border-emerald-200 bg-emerald-50/50 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-black">{data.firstName} {data.lastName}</p>
              <p className="text-xs text-gray-500">{data.city}, {data.state}</p>
            </div>
          </div>
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-dark transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
        </div>
      </div>
    );
  }

  /* Editing state - show form */
  if (mode === "editing") {
    return (
      <div className="mb-8">
        <h4 className="text-sm font-black text-black mb-0.5">
          {title} {optional && <span className="text-gray-400 font-normal">(Optional)</span>}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">{description}</p>
        <div className="border border-accent/30 bg-accent/[0.02] rounded-2xl p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">First Name</label>
              <input
                type="text"
                value={data.firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
                placeholder="First Name"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.firstName ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.firstName && (
                <div className="flex items-center gap-1 mt-1">
                  <Info className="w-3 h-3 text-red-500" />
                  <span className="text-[11px] text-red-500 font-medium">{errors.firstName}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Last Name</label>
              <input
                type="text"
                value={data.lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
                placeholder="Last Name"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.lastName ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.lastName && (
                <div className="flex items-center gap-1 mt-1">
                  <Info className="w-3 h-3 text-red-500" />
                  <span className="text-[11px] text-red-500 font-medium">{errors.lastName}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">City</label>
              <input
                type="text"
                value={data.city}
                onChange={(e) => onChange("city", e.target.value)}
                placeholder="City"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.city ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.city && (
                <div className="flex items-center gap-1 mt-1">
                  <Info className="w-3 h-3 text-red-500" />
                  <span className="text-[11px] text-red-500 font-medium">{errors.city}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">State</label>
              <div className="relative">
                <select
                  value={data.state}
                  onChange={(e) => onChange("state", e.target.value)}
                  className={`appearance-none w-full px-4 pr-10 py-2.5 rounded-xl border text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.state ? "border-red-400" : "border-gray-200"} ${!data.state ? "text-gray-400" : "text-black"}`}
                >
                  <option value="">Select State</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.state && (
                <div className="flex items-center gap-1 mt-1">
                  <Info className="w-3 h-3 text-red-500" />
                  <span className="text-[11px] text-red-500 font-medium">{errors.state}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onSave}
              className="px-6 py-2 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-dark transition-all shadow-md shadow-accent/20"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-gray-500 hover:text-black transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* Idle state - show "Select Officer" button */
  return (
    <div className="mb-8">
      <h4 className="text-sm font-black text-black mb-0.5">
        {title} {optional && <span className="text-gray-400 font-normal">(Optional)</span>}
      </h4>
      <p className="text-xs text-gray-500 leading-relaxed mb-3">{description}</p>
      <button
        onClick={onOpen}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-sm font-bold text-gray-500 hover:border-accent hover:text-accent transition-all"
      >
        <UserPlus className="w-4 h-4" /> Select Officer
      </button>
    </div>
  );
}

function Step7Inner() {
  const router = useRouter();
  const params = useSearchParams();
  const entity = params.get("entity") || "LLC";
  const state = params.get("state") || "";
  const pkg = (params.get("package") || "Standard") as "Basic" | "Standard" | "Premium";
  const companyName = params.get("name") || "";
  const designator = params.get("designator") || "LLC";
  const filing = params.get("filing") || "standard";
  const virtualAddress = (params.get("virtualAddress") || "own") as "virtual" | "own";
  const { packagePrice, stateFee } = resolveSelectedPricing(params, state, pkg);
  const expeditedFee = filing === "expedited" ? 50 : 0;
  const virtualAddressFee = virtualAddress === "virtual" ? 110 : 0;
  const orderTotal = packagePrice + stateFee + expeditedFee + virtualAddressFee;

  const [numDirectors, setNumDirectors] = useState("");
  const [directors, setDirectors] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* Officer state per role */
  const [presidentData, setPresidentData] = useState<OfficerData>({ ...emptyOfficer });
  const [presidentMode, setPresidentMode] = useState<OfficerMode>("idle");
  const [presidentErrors, setPresidentErrors] = useState<Record<string, string>>({});

  const [secretaryData, setSecretaryData] = useState<OfficerData>({ ...emptyOfficer });
  const [secretaryMode, setSecretaryMode] = useState<OfficerMode>("idle");
  const [secretaryErrors, setSecretaryErrors] = useState<Record<string, string>>({});

  const [treasurerData, setTreasurerData] = useState<OfficerData>({ ...emptyOfficer });
  const [treasurerMode, setTreasurerMode] = useState<OfficerMode>("idle");
  const [treasurerErrors, setTreasurerErrors] = useState<Record<string, string>>({});

  const [vpData, setVpData] = useState<OfficerData>({ ...emptyOfficer });
  const [vpMode, setVpMode] = useState<OfficerMode>("idle");
  const [vpErrors, setVpErrors] = useState<Record<string, string>>({});

  const handleDirectorsChange = (count: string) => {
    setNumDirectors(count);
    const n = parseInt(count) || 0;
    const names: string[] = [];
    for (let i = 0; i < n; i++) names.push(directors[i] || "");
    setDirectors(names);
  };

  const updateDirector = (idx: number, val: string) => {
    const copy = [...directors];
    copy[idx] = val;
    setDirectors(copy);
  };

  const validateOfficer = (data: OfficerData): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!data.firstName.trim()) e.firstName = "First name is required";
    if (!data.lastName.trim()) e.lastName = "Last name is required";
    if (!data.city.trim()) e.city = "City is required";
    if (!data.state) e.state = "State is required";
    return e;
  };

  const buildBackUrl = () => {
    const q = new URLSearchParams({ entity, state, package: pkg, name: companyName, designator, filing, virtualAddress, ...buildPricingParams(packagePrice, stateFee) });
    return `/order/step6?${q.toString()}`;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!numDirectors) e.numDirectors = "Select number of directors";
    directors.forEach((d, i) => { if (!d.trim()) e[`dir${i}`] = `Director ${i + 1} name is required`; });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    const q = new URLSearchParams({ entity, state, package: pkg, name: companyName, designator, filing, virtualAddress, ...buildPricingParams(packagePrice, stateFee) });
    router.push(`/order/step8?${q.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-black">
      <Header />
      <ProgressBar pct={70} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">

          {/* Left */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
            <h2 className="text-xl font-black text-black mb-1">
              Please provide Directors Information for{" "}
              <span className="text-accent">{companyName} {designator}.</span>
            </h2>

            {/* Number of Directors */}
            <div className="mt-6 mb-8 flex items-center gap-4 flex-wrap">
              <span className="text-sm font-semibold text-gray-600">Number of Directors/Owners</span>
              <div className="relative">
                <select
                  value={numDirectors}
                  onChange={(e) => handleDirectorsChange(e.target.value)}
                  className={`appearance-none pl-4 pr-10 py-2.5 rounded-xl border text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent min-w-[220px] ${errors.numDirectors ? "border-red-400" : "border-gray-200"}`}
                >
                  <option value="">Select Director/Owner</option>
                  {DIRECTOR_OPTIONS.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Director Name Inputs */}
            {directors.length > 0 && (
              <div className="mb-8 space-y-4">
                <h3 className="text-sm font-black text-gray-500 uppercase tracking-wider">Director Names</h3>
                {directors.map((d, i) => (
                  <div key={i}>
                    <label className="block text-sm font-bold text-black mb-1.5">Director {i + 1}</label>
                    <input
                      type="text"
                      value={d}
                      onChange={(e) => updateDirector(i, e.target.value)}
                      placeholder="Full legal name"
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors[`dir${i}`] ? "border-red-400" : "border-gray-200"}`}
                    />
                    {errors[`dir${i}`] && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <Info className="w-3.5 h-3.5 text-red-500" />
                        <span className="text-xs text-red-500 font-medium">{errors[`dir${i}`]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Officer Information */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-black text-black mb-6">Officer Information</h3>

              {/* President/CEO */}
              <OfficerCard
                title="President/CEO"
                optional
                description="The President (a.k.a. Chief Executive Officer or CEO) has general supervision, direction, and control of the day-to-day business and affairs of the corporation, subject to the direction and control of the board of directors."
                data={presidentData}
                mode={presidentMode}
                onOpen={() => setPresidentMode("editing")}
                onEdit={() => setPresidentMode("editing")}
                onCancel={() => { if (presidentData.firstName) setPresidentMode("saved"); else setPresidentMode("idle"); }}
                onSave={() => {
                  const e = validateOfficer(presidentData);
                  setPresidentErrors(e);
                  if (Object.keys(e).length === 0) setPresidentMode("saved");
                }}
                onChange={(field, value) => setPresidentData((prev) => ({ ...prev, [field]: value }))}
                errors={presidentErrors}
              />

              {/* Secretary */}
              <OfficerCard
                title="Secretary"
                optional
                description="The Corporate Secretary (or other corporate officer designated by the board of directors to maintain and keep corporate records) will keep, or cause to be kept, at the principal office of the corporation, a book of minutes of all meetings of directors and shareholders."
                data={secretaryData}
                mode={secretaryMode}
                onOpen={() => setSecretaryMode("editing")}
                onEdit={() => setSecretaryMode("editing")}
                onCancel={() => { if (secretaryData.firstName) setSecretaryMode("saved"); else setSecretaryMode("idle"); }}
                onSave={() => {
                  const e = validateOfficer(secretaryData);
                  setSecretaryErrors(e);
                  if (Object.keys(e).length === 0) setSecretaryMode("saved");
                }}
                onChange={(field, value) => setSecretaryData((prev) => ({ ...prev, [field]: value }))}
                errors={secretaryErrors}
              />

              {/* Treasurer */}
              <OfficerCard
                title="Treasurer"
                optional
                description="The Treasurer (a.k.a. Chief Financial Officer or CFO) will keep and maintain, or cause to be kept and maintained, adequate and correct books and records of accounts of the properties and business transactions of the corporation."
                data={treasurerData}
                mode={treasurerMode}
                onOpen={() => setTreasurerMode("editing")}
                onEdit={() => setTreasurerMode("editing")}
                onCancel={() => { if (treasurerData.firstName) setTreasurerMode("saved"); else setTreasurerMode("idle"); }}
                onSave={() => {
                  const e = validateOfficer(treasurerData);
                  setTreasurerErrors(e);
                  if (Object.keys(e).length === 0) setTreasurerMode("saved");
                }}
                onChange={(field, value) => setTreasurerData((prev) => ({ ...prev, [field]: value }))}
                errors={treasurerErrors}
              />

              {/* Vice President (Optional) */}
              <OfficerCard
                title="Vice President"
                optional
                description="The Officer position of Vice President is optional, but the role of the Vice President is to be able to fill in for the president anytime the President is unavailable, whether it be in corporate meetings or day to day business decisions."
                data={vpData}
                mode={vpMode}
                onOpen={() => setVpMode("editing")}
                onEdit={() => setVpMode("editing")}
                onCancel={() => { if (vpData.firstName) setVpMode("saved"); else setVpMode("idle"); }}
                onSave={() => {
                  const e = validateOfficer(vpData);
                  setVpErrors(e);
                  if (Object.keys(e).length === 0) setVpMode("saved");
                }}
                onChange={(field, value) => setVpData((prev) => ({ ...prev, [field]: value }))}
                errors={vpErrors}
              />
            </div>

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

export default function Step7Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <Step7Inner />
    </Suspense>
  );
}
