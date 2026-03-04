"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, ArrowRight, Info, ChevronDown, Search } from "lucide-react";
import Header from "../../components/Header";
import { STATE_FEES, packagePrices } from "../data";

const COUNTRIES = [
  { flag: "\u{1F1FA}\u{1F1F8}", name: "United States",          code: "+1",    digits: 10 },
  { flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom",          code: "+44",   digits: 10 },
  { flag: "\u{1F1E8}\u{1F1E6}", name: "Canada",                  code: "+1",    digits: 10 },
  { flag: "\u{1F1E6}\u{1F1FA}", name: "Australia",               code: "+61",   digits: 9  },
  { flag: "\u{1F1E9}\u{1F1EA}", name: "Germany",                 code: "+49",   digits: 11 },
  { flag: "\u{1F1EB}\u{1F1F7}", name: "France",                  code: "+33",   digits: 9  },
  { flag: "\u{1F1EE}\u{1F1F9}", name: "Italy",                   code: "+39",   digits: 10 },
  { flag: "\u{1F1EA}\u{1F1F8}", name: "Spain",                   code: "+34",   digits: 9  },
  { flag: "\u{1F1F3}\u{1F1F1}", name: "Netherlands",             code: "+31",   digits: 9  },
  { flag: "\u{1F1E7}\u{1F1EA}", name: "Belgium",                 code: "+32",   digits: 9  },
  { flag: "\u{1F1E8}\u{1F1ED}", name: "Switzerland",             code: "+41",   digits: 9  },
  { flag: "\u{1F1E6}\u{1F1F9}", name: "Austria",                 code: "+43",   digits: 13 },
  { flag: "\u{1F1F8}\u{1F1EA}", name: "Sweden",                  code: "+46",   digits: 9  },
  { flag: "\u{1F1F3}\u{1F1F4}", name: "Norway",                  code: "+47",   digits: 8  },
  { flag: "\u{1F1E9}\u{1F1F0}", name: "Denmark",                 code: "+45",   digits: 8  },
  { flag: "\u{1F1EB}\u{1F1EE}", name: "Finland",                 code: "+358",  digits: 12 },
  { flag: "\u{1F1F5}\u{1F1F1}", name: "Poland",                  code: "+48",   digits: 9  },
  { flag: "\u{1F1F5}\u{1F1F9}", name: "Portugal",                code: "+351",  digits: 9  },
  { flag: "\u{1F1EC}\u{1F1F7}", name: "Greece",                  code: "+30",   digits: 10 },
  { flag: "\u{1F1E8}\u{1F1FF}", name: "Czech Republic",          code: "+420",  digits: 9  },
  { flag: "\u{1F1ED}\u{1F1FA}", name: "Hungary",                 code: "+36",   digits: 9  },
  { flag: "\u{1F1F7}\u{1F1F4}", name: "Romania",                 code: "+40",   digits: 9  },
  { flag: "\u{1F1E7}\u{1F1EC}", name: "Bulgaria",                code: "+359",  digits: 9  },
  { flag: "\u{1F1ED}\u{1F1F7}", name: "Croatia",                 code: "+385",  digits: 9  },
  { flag: "\u{1F1F8}\u{1F1F0}", name: "Slovakia",                code: "+421",  digits: 9  },
  { flag: "\u{1F1F8}\u{1F1EE}", name: "Slovenia",                code: "+386",  digits: 8  },
  { flag: "\u{1F1F7}\u{1F1F8}", name: "Serbia",                  code: "+381",  digits: 9  },
  { flag: "\u{1F1FA}\u{1F1E6}", name: "Ukraine",                 code: "+380",  digits: 9  },
  { flag: "\u{1F1F7}\u{1F1FA}", name: "Russia",                  code: "+7",    digits: 10 },
  { flag: "\u{1F1F9}\u{1F1F7}", name: "Turkey",                  code: "+90",   digits: 10 },
  { flag: "\u{1F1EE}\u{1F1F1}", name: "Israel",                  code: "+972",  digits: 9  },
  { flag: "\u{1F1F8}\u{1F1E6}", name: "Saudi Arabia",            code: "+966",  digits: 9  },
  { flag: "\u{1F1E6}\u{1F1EA}", name: "United Arab Emirates",    code: "+971",  digits: 9  },
  { flag: "\u{1F1F6}\u{1F1E6}", name: "Qatar",                   code: "+974",  digits: 8  },
  { flag: "\u{1F1F0}\u{1F1FC}", name: "Kuwait",                  code: "+965",  digits: 8  },
  { flag: "\u{1F1E7}\u{1F1ED}", name: "Bahrain",                 code: "+973",  digits: 8  },
  { flag: "\u{1F1F4}\u{1F1F2}", name: "Oman",                    code: "+968",  digits: 8  },
  { flag: "\u{1F1EF}\u{1F1F4}", name: "Jordan",                  code: "+962",  digits: 9  },
  { flag: "\u{1F1F1}\u{1F1E7}", name: "Lebanon",                 code: "+961",  digits: 8  },
  { flag: "\u{1F1EA}\u{1F1EC}", name: "Egypt",                   code: "+20",   digits: 10 },
  { flag: "\u{1F1FF}\u{1F1E6}", name: "South Africa",            code: "+27",   digits: 9  },
  { flag: "\u{1F1F3}\u{1F1EC}", name: "Nigeria",                 code: "+234",  digits: 10 },
  { flag: "\u{1F1F0}\u{1F1EA}", name: "Kenya",                   code: "+254",  digits: 9  },
  { flag: "\u{1F1EC}\u{1F1ED}", name: "Ghana",                   code: "+233",  digits: 9  },
  { flag: "\u{1F1EA}\u{1F1F9}", name: "Ethiopia",                code: "+251",  digits: 9  },
  { flag: "\u{1F1F9}\u{1F1FF}", name: "Tanzania",                code: "+255",  digits: 9  },
  { flag: "\u{1F1FA}\u{1F1EC}", name: "Uganda",                  code: "+256",  digits: 9  },
  { flag: "\u{1F1F2}\u{1F1E6}", name: "Morocco",                 code: "+212",  digits: 9  },
  { flag: "\u{1F1E9}\u{1F1FF}", name: "Algeria",                 code: "+213",  digits: 9  },
  { flag: "\u{1F1F9}\u{1F1F3}", name: "Tunisia",                 code: "+216",  digits: 8  },
  { flag: "\u{1F1F8}\u{1F1E9}", name: "Sudan",                   code: "+249",  digits: 9  },
  { flag: "\u{1F1E8}\u{1F1F2}", name: "Cameroon",                code: "+237",  digits: 9  },
  { flag: "\u{1F1EE}\u{1F1F3}", name: "India",                   code: "+91",   digits: 10 },
  { flag: "\u{1F1E8}\u{1F1F3}", name: "China",                   code: "+86",   digits: 11 },
  { flag: "\u{1F1EF}\u{1F1F5}", name: "Japan",                   code: "+81",   digits: 10 },
  { flag: "\u{1F1F0}\u{1F1F7}", name: "South Korea",             code: "+82",   digits: 10 },
  { flag: "\u{1F1EE}\u{1F1E9}", name: "Indonesia",               code: "+62",   digits: 12 },
  { flag: "\u{1F1F5}\u{1F1ED}", name: "Philippines",             code: "+63",   digits: 10 },
  { flag: "\u{1F1FB}\u{1F1F3}", name: "Vietnam",                 code: "+84",   digits: 9  },
  { flag: "\u{1F1F9}\u{1F1ED}", name: "Thailand",                code: "+66",   digits: 9  },
  { flag: "\u{1F1F2}\u{1F1FE}", name: "Malaysia",                code: "+60",   digits: 10 },
  { flag: "\u{1F1F8}\u{1F1EC}", name: "Singapore",               code: "+65",   digits: 8  },
  { flag: "\u{1F1E7}\u{1F1E9}", name: "Bangladesh",              code: "+880",  digits: 10 },
  { flag: "\u{1F1F5}\u{1F1F0}", name: "Pakistan",                code: "+92",   digits: 10 },
  { flag: "\u{1F1F1}\u{1F1F0}", name: "Sri Lanka",               code: "+94",   digits: 9  },
  { flag: "\u{1F1F3}\u{1F1F5}", name: "Nepal",                   code: "+977",  digits: 10 },
  { flag: "\u{1F1F2}\u{1F1F2}", name: "Myanmar",                 code: "+95",   digits: 9  },
  { flag: "\u{1F1F0}\u{1F1ED}", name: "Cambodia",                code: "+855",  digits: 9  },
  { flag: "\u{1F1F1}\u{1F1E6}", name: "Laos",                    code: "+856",  digits: 9  },
  { flag: "\u{1F1F2}\u{1F1FD}", name: "Mexico",                  code: "+52",   digits: 10 },
  { flag: "\u{1F1E7}\u{1F1F7}", name: "Brazil",                  code: "+55",   digits: 11 },
  { flag: "\u{1F1E6}\u{1F1F7}", name: "Argentina",               code: "+54",   digits: 10 },
  { flag: "\u{1F1E8}\u{1F1F4}", name: "Colombia",                code: "+57",   digits: 10 },
  { flag: "\u{1F1E8}\u{1F1F1}", name: "Chile",                   code: "+56",   digits: 9  },
  { flag: "\u{1F1F5}\u{1F1EA}", name: "Peru",                    code: "+51",   digits: 9  },
  { flag: "\u{1F1FB}\u{1F1EA}", name: "Venezuela",               code: "+58",   digits: 10 },
  { flag: "\u{1F1EA}\u{1F1E8}", name: "Ecuador",                 code: "+593",  digits: 9  },
  { flag: "\u{1F1E7}\u{1F1F4}", name: "Bolivia",                 code: "+591",  digits: 8  },
  { flag: "\u{1F1F5}\u{1F1FE}", name: "Paraguay",                code: "+595",  digits: 9  },
  { flag: "\u{1F1FA}\u{1F1FE}", name: "Uruguay",                 code: "+598",  digits: 8  },
  { flag: "\u{1F1E8}\u{1F1F7}", name: "Costa Rica",              code: "+506",  digits: 8  },
  { flag: "\u{1F1EC}\u{1F1F9}", name: "Guatemala",               code: "+502",  digits: 8  },
  { flag: "\u{1F1F5}\u{1F1E6}", name: "Panama",                  code: "+507",  digits: 8  },
  { flag: "\u{1F1E9}\u{1F1F4}", name: "Dominican Republic",      code: "+1",    digits: 10 },
  { flag: "\u{1F1E8}\u{1F1FA}", name: "Cuba",                    code: "+53",   digits: 8  },
  { flag: "\u{1F1F5}\u{1F1F7}", name: "Puerto Rico",             code: "+1",    digits: 10 },
  { flag: "\u{1F1F3}\u{1F1FF}", name: "New Zealand",             code: "+64",   digits: 9  },
  { flag: "\u{1F1F5}\u{1F1EC}", name: "Papua New Guinea",        code: "+675",  digits: 8  },
  { flag: "\u{1F1EB}\u{1F1EF}", name: "Fiji",                    code: "+679",  digits: 7  },
  { flag: "\u{1F1EE}\u{1F1EA}", name: "Ireland",                 code: "+353",  digits: 9  },
  { flag: "\u{1F1EE}\u{1F1F8}", name: "Iceland",                 code: "+354",  digits: 7  },
  { flag: "\u{1F1F1}\u{1F1FA}", name: "Luxembourg",              code: "+352",  digits: 9  },
  { flag: "\u{1F1F2}\u{1F1F9}", name: "Malta",                   code: "+356",  digits: 8  },
  { flag: "\u{1F1E8}\u{1F1FE}", name: "Cyprus",                  code: "+357",  digits: 8  },
  { flag: "\u{1F1E6}\u{1F1F1}", name: "Albania",                 code: "+355",  digits: 9  },
  { flag: "\u{1F1F2}\u{1F1F0}", name: "North Macedonia",         code: "+389",  digits: 8  },
  { flag: "\u{1F1E7}\u{1F1E6}", name: "Bosnia and Herzegovina",  code: "+387",  digits: 8  },
  { flag: "\u{1F1F2}\u{1F1EA}", name: "Montenegro",              code: "+382",  digits: 8  },
  { flag: "\u{1F1F1}\u{1F1FB}", name: "Latvia",                  code: "+371",  digits: 8  },
  { flag: "\u{1F1F1}\u{1F1F9}", name: "Lithuania",               code: "+370",  digits: 8  },
  { flag: "\u{1F1EA}\u{1F1EA}", name: "Estonia",                 code: "+372",  digits: 8  },
  { flag: "\u{1F1E7}\u{1F1FE}", name: "Belarus",                 code: "+375",  digits: 9  },
  { flag: "\u{1F1F2}\u{1F1E9}", name: "Moldova",                 code: "+373",  digits: 8  },
  { flag: "\u{1F1EC}\u{1F1EA}", name: "Georgia",                 code: "+995",  digits: 9  },
  { flag: "\u{1F1E6}\u{1F1F2}", name: "Armenia",                 code: "+374",  digits: 8  },
  { flag: "\u{1F1E6}\u{1F1FF}", name: "Azerbaijan",              code: "+994",  digits: 9  },
  { flag: "\u{1F1F0}\u{1F1FF}", name: "Kazakhstan",              code: "+7",    digits: 10 },
  { flag: "\u{1F1FA}\u{1F1FF}", name: "Uzbekistan",              code: "+998",  digits: 9  },
  { flag: "\u{1F1F9}\u{1F1F2}", name: "Turkmenistan",            code: "+993",  digits: 8  },
  { flag: "\u{1F1F0}\u{1F1EC}", name: "Kyrgyzstan",              code: "+996",  digits: 9  },
  { flag: "\u{1F1F9}\u{1F1EF}", name: "Tajikistan",              code: "+992",  digits: 9  },
  { flag: "\u{1F1E6}\u{1F1EB}", name: "Afghanistan",             code: "+93",   digits: 9  },
  { flag: "\u{1F1EE}\u{1F1F7}", name: "Iran",                    code: "+98",   digits: 10 },
  { flag: "\u{1F1EE}\u{1F1F6}", name: "Iraq",                    code: "+964",  digits: 10 },
  { flag: "\u{1F1F8}\u{1F1FE}", name: "Syria",                   code: "+963",  digits: 9  },
  { flag: "\u{1F1FE}\u{1F1EA}", name: "Yemen",                   code: "+967",  digits: 9  },
  { flag: "\u{1F1F1}\u{1F1FE}", name: "Libya",                   code: "+218",  digits: 9  },
  { flag: "\u{1F1F8}\u{1F1F3}", name: "Senegal",                 code: "+221",  digits: 9  },
  { flag: "\u{1F1E8}\u{1F1EE}", name: "Ivory Coast",             code: "+225",  digits: 10 },
  { flag: "\u{1F1F2}\u{1F1F1}", name: "Mali",                    code: "+223",  digits: 8  },
  { flag: "\u{1F1E7}\u{1F1EB}", name: "Burkina Faso",            code: "+226",  digits: 8  },
  { flag: "\u{1F1F3}\u{1F1EA}", name: "Niger",                   code: "+227",  digits: 8  },
  { flag: "\u{1F1F9}\u{1F1E9}", name: "Chad",                    code: "+235",  digits: 8  },
  { flag: "\u{1F1F8}\u{1F1F4}", name: "Somalia",                 code: "+252",  digits: 9  },
  { flag: "\u{1F1F7}\u{1F1FC}", name: "Rwanda",                  code: "+250",  digits: 9  },
  { flag: "\u{1F1FF}\u{1F1F2}", name: "Zambia",                  code: "+260",  digits: 9  },
  { flag: "\u{1F1FF}\u{1F1FC}", name: "Zimbabwe",                code: "+263",  digits: 9  },
  { flag: "\u{1F1F2}\u{1F1FF}", name: "Mozambique",              code: "+258",  digits: 9  },
  { flag: "\u{1F1F2}\u{1F1EC}", name: "Madagascar",              code: "+261",  digits: 9  },
  { flag: "\u{1F1E6}\u{1F1F4}", name: "Angola",                  code: "+244",  digits: 9  },
  { flag: "\u{1F1E8}\u{1F1EC}", name: "Republic of Congo",       code: "+242",  digits: 9  },
  { flag: "\u{1F1E8}\u{1F1E9}", name: "DR Congo",                code: "+243",  digits: 9  },
] as const;

type Country = typeof COUNTRIES[number];

function ProgressBar() {
  return (
    <div className="bg-white border-b border-gray-100 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-accent">Your Progress:</span>
          <span className="text-xs font-bold text-gray-400">50%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: "50%" }} />
        </div>
      </div>
    </div>
  );
}

function CountryPicker({ selected, onChange }: { selected: Country; onChange: (c: Country) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const filtered = COUNTRIES.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search)
  );

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); setSearch(""); }}
        className="flex items-center gap-1.5 pr-1 focus:outline-none"
      >
        <span className="text-xl leading-none">{selected.flag}</span>
        <span className="text-xs font-bold text-gray-500">{selected.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 w-72 bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-black/10 overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl">
              <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country or code..."
                className="flex-1 bg-transparent text-sm text-black focus:outline-none placeholder-gray-400"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-center text-xs text-gray-400 py-6">No results found</p>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => { onChange(c); setOpen(false); setSearch(""); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left ${c.name === selected.name ? "bg-accent/5" : ""}`}
                >
                  <span className="text-lg leading-none">{c.flag}</span>
                  <span className="flex-1 text-sm font-medium text-black truncate">{c.name}</span>
                  <span className="text-xs font-bold text-gray-400">{c.code}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Step5Inner() {
  const router = useRouter();
  const params = useSearchParams();
  const entity = params.get("entity") || "LLC";
  const state = params.get("state") || "";
  const pkg = (params.get("package") || "Standard") as "Basic" | "Standard" | "Premium";
  const companyName = params.get("name") || "";
  const designator = params.get("designator") || "LLC";
  const filing = params.get("filing") || "standard";
  const stateFee = STATE_FEES[state] ?? 50;
  const expeditedFee = filing === "expedited" ? 50 : 0;
  const orderTotal = packagePrices[pkg] + stateFee + expeditedFee;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [smsConsent, setSmsConsent] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCountryChange = (c: Country) => {
    setCountry(c);
    setPhone("");
  };

  const handlePhoneInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, country.digits);
    setPhone(digits);
  };

  const buildBackUrl = () =>
    `/order/step4?entity=${encodeURIComponent(entity)}&state=${encodeURIComponent(state)}&package=${pkg}&name=${encodeURIComponent(companyName)}&designator=${encodeURIComponent(designator)}`;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "First Name is required";
    if (!lastName.trim()) e.lastName = "Last Name is required";
    if (!email.includes("@")) e.email = "Valid email is required";
    if (phone.length < country.digits)
      e.phone = `Enter a valid ${country.digits}-digit number for ${country.name}`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    const q = new URLSearchParams({
      entity, state, package: pkg, name: companyName, designator, filing,
      firstName: firstName.trim(), lastName: lastName.trim(),
      email: email.trim(),
      phone: `${country.code} ${phone}`,
    });
    router.push(`/order/step6?${q.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-black">
      <Header />
      <ProgressBar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 items-start">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
            <h2 className="text-2xl font-black text-black mb-3">Contact Person</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Please provide the name of the person responsible for this order whom we may contact if additional information is needed.
            </p>

            <div className="border-t border-gray-200 pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.firstName ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.firstName && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Info className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs text-red-500 font-medium">{errors.firstName}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.lastName ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.lastName && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Info className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs text-red-500 font-medium">{errors.lastName}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all ${errors.email ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Info className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs text-red-500 font-medium">{errors.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">Mobile Phone</label>
                  <div className={`flex items-center gap-2 pl-3 pr-4 py-3 rounded-xl border bg-white transition-all ${errors.phone ? "border-red-400" : "border-gray-200"} focus-within:ring-2 focus-within:ring-accent/30 focus-within:border-accent`}>
                    <CountryPicker selected={country} onChange={handleCountryChange} />
                    <div className="w-px h-5 bg-gray-200 shrink-0" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => handlePhoneInput(e.target.value)}
                      placeholder={"#".repeat(country.digits)}
                      maxLength={country.digits}
                      className="flex-1 bg-transparent text-black border-none focus:outline-none font-medium text-sm tracking-wider"
                    />
                    <span className="text-[10px] text-gray-300 font-bold shrink-0">
                      {phone.length}/{country.digits}
                    </span>
                  </div>
                  {errors.phone && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Info className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs text-red-500 font-medium">{errors.phone}</span>
                    </div>
                  )}
                  <p className="text-[11px] text-gray-400 mt-1.5">{country.name} - {country.digits} digits required</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-8">
                <button
                  type="button"
                  onClick={() => setSmsConsent(!smsConsent)}
                  className={`mt-0.5 w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center transition-all ${smsConsent ? "bg-accent border-accent" : "border-gray-300 bg-white"}`}
                >
                  {smsConsent && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span className="text-sm text-gray-600 leading-relaxed">
                  I consent to receiving SMS text messages and phone calls from Brendat.
                </span>
              </div>

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

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
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

export default function Step5Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <Step5Inner />
    </Suspense>
  );
}
