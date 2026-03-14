"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  FileText,
  Globe2,
  Headset,
  HeartHandshake,
  PiggyBank,
  Shield,
  ShieldCheck,
  Star,
  Zap,
  BookOpen,
  BadgeCheck,
  Landmark,
  Mail,
  ClipboardList,
  RefreshCw,
  ScrollText,
  Building,
  UserCheck,
  CreditCard,
  Lock,
  MessageCircle,
  X,
  Calendar,
  User,
  ArrowLeft,
  Info,
  TrendingUp,
  BarChart3,
  PieChart,
  Timer,
  ChevronRight,
  Scale,
  Stamp,
} from "lucide-react";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import Footer from "./components/Footer";

const FallingText = dynamic(() => import("./components/FallingText"), {
  ssr: false,
  loading: () => <div className="w-full h-[400px]" />,
});
const FloatingContactButtons = dynamic(() => import("./components/FloatingContactButtons"), {
  ssr: false,
});

/* ─── Payment Modal ─── */
type Plan = { name: string; price: string; color: string };

const WHATSAPP_HREF = "https://wa.me/13032468693?text=Hi%20Brendat%2C%20I%20need%20help%20with%20my%20business%20formation.";

function PaymentModal({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const [step, setStep] = useState<"details" | "processing" | "success" | "error">("details");
  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [apiError, setApiError] = useState("");
  const [txnId, setTxnId] = useState("");

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (v: string) =>
    v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d)/, "$1/$2");

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.card.replace(/\s/g, "").length < 16) e.card = "Enter a valid 16-digit card number";
    if (form.expiry.length < 5) e.expiry = "Enter MM/YY";
    if (form.cvv.length < 3) e.cvv = "Enter 3-digit CVV";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setStep("processing");
    setApiError("");

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardNumber: form.card,
          cardExpiry: form.expiry,
          cardCvv: form.cvv,
          cardName: form.name,
          email: form.email,
          amount: plan.price.replace("$", ""),
          planName: plan.name,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setTxnId(data.transactionId || "");
        setStep("success");
      } else {
        setApiError(data.message || "Payment failed. Please try again.");
        setStep("error");
      }
    } catch {
      setApiError("Network error. Please check your connection and try again.");
      setStep("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {step === "details" ? (
          <>
            {/* Modal header */}
            <div className="bg-primary px-8 pt-8 pb-6">
              <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-accent/20 p-2.5 rounded-xl">
                  <CreditCard className="w-5 h-5 text-accent-light" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Selected Plan</p>
                  <p className="text-white font-extrabold text-lg">{plan.name} — {plan.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <Lock className="w-3.5 h-3.5" /> Secured with 256-bit SSL encryption
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -trangray-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${
                      errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${
                    errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Card number */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-1/2 -trangray-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={form.card}
                    onChange={(e) => setForm({ ...form, card: formatCard(e.target.value) })}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium text-primary font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${
                      errors.card ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {errors.card && <p className="text-xs text-red-500 mt-1">{errors.card}</p>}
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Expiry</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -trangray-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                      className={`w-full pl-10 pr-3 py-3 rounded-xl border text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${
                        errors.expiry ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                      }`}
                    />
                  </div>
                  {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">CVV</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -trangray-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={3}
                      value={form.cvv}
                      onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, "") })}
                      className={`w-full pl-10 pr-3 py-3 rounded-xl border text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${
                        errors.cvv ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                      }`}
                    />
                  </div>
                  {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-dark text-white font-black py-4 rounded-xl shadow-lg shadow-accent/25 transition-all flex items-center justify-center gap-2 text-base mt-2"
              >
                <Lock className="w-4 h-4" /> Pay {plan.price} Securely
              </button>

              <p className="text-center text-[11px] text-gray-400 leading-relaxed">
                By completing this purchase you agree to our{" "}
                <span className="text-accent cursor-pointer hover:underline">Terms of Service</span> &amp;{" "}
                <span className="text-accent cursor-pointer hover:underline">Privacy Policy</span>.
              </p>
            </form>
          </>
        ) : step === "processing" ? (
          /* ─── Processing State ─── */
          <div className="flex flex-col items-center justify-center px-10 py-20 text-center">
            <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-8" />
            <h3 className="text-xl font-black text-primary mb-2">Processing Payment...</h3>
            <p className="text-gray-500 text-sm">Securely connecting to your bank. Please do not close this window.</p>
          </div>
        ) : step === "error" ? (
          /* ─── Error State ─── */
          <div className="flex flex-col items-center justify-center px-10 py-16 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <X className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-primary mb-2">Payment Failed</h3>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed max-w-xs">{apiError}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("details")}
                className="bg-accent text-white font-bold px-6 py-3 rounded-xl hover:bg-accent-dark transition-all shadow-lg shadow-accent/20"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="border border-gray-200 text-gray-600 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* ─── Success State ─── */
          <div className="flex flex-col items-center justify-center px-10 py-16 text-center">
            <div className="w-20 h-20 bg-emerald/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald" />
            </div>
            <h3 className="text-2xl font-black text-primary mb-2">Payment Successful!</h3>
            <p className="text-gray-500 mb-2">You&apos;ve signed up for the <strong>{plan.name}</strong> plan.</p>
            <p className="text-gray-400 text-sm mb-2">A confirmation will be sent to <strong>{form.email}</strong>.</p>
            {txnId && (
              <p className="text-gray-400 text-xs mb-6 font-mono bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                Transaction ID: {txnId}
              </p>
            )}
            <button
              onClick={onClose}
              className="bg-accent text-white font-bold px-8 py-3.5 rounded-xl hover:bg-accent-dark transition-all shadow-lg shadow-accent/20 mt-2"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Reusable Section Heading ─── */
function SectionLabel({ label }: { label: string }) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent bg-accent/5 border border-accent/10 px-3 py-1 rounded-full mb-4">
      {label}
    </span>
  );
}

/* ─── FAQ Data ─── */
const faqs = [
  { q: "Is Brendat a law firm?", a: "No. Brendat is a document filing service. We do not provide legal, financial, or tax advice. We streamline the paperwork so you can focus on building your business." },
  { q: "What are state filing fees?", a: "State fees are charges required by each state to process your formation documents. They range from roughly $50 to $500+ depending on the state and entity type." },
  { q: "How long does formation take?", a: "Standard processing is 5–10 business days. With our expedited option, most formations are filed within 1–2 business days." },
  { q: "Do I need a lawyer to start an LLC?", a: "No. Our platform guides you through every step of the process. However, we always recommend consulting a legal professional for complex situations." },
  { q: "Can I change my entity type later?", a: "Yes. You can convert between entity types (e.g., LLC to S-Corp). This typically involves state filings and possible IRS forms, which we can help facilitate." },
  { q: "What services do you offer after formation?", a: "We provide ongoing registered agent service, annual report filings, amendments, certificates of good standing, foreign qualification, and even voluntary dissolution." },
];

/* ─── Entity Types ─── */
const entities = [
  { icon: ShieldCheck, name: "LLC", desc: "Flexible liability protection for small businesses and startups.", tag: "Most Popular" },
  { icon: PiggyBank, name: "S Corporation", desc: "Pass-through tax savings for qualifying established businesses.", tag: null },
  { icon: Building2, name: "C Corporation", desc: "Ideal for venture-backed startups and large-scale growth.", tag: null },
  { icon: HeartHandshake, name: "Nonprofit", desc: "Tax-exempt entities built around a charitable mission.", tag: null },
];

/* ─── Additional Services ─── */
const services = [
  { icon: BadgeCheck, title: "EIN / Tax ID", desc: "Get your federal Employer Identification Number for banking, taxes, and hiring." },
  { icon: BookOpen, title: "DBA Registration", desc: "Register a 'Doing Business As' name to operate under a trade name." },
  { icon: Shield, title: "Trademark Filing", desc: "Protect your brand name, logo, or slogan with federal trademark registration." },
  { icon: ClipboardList, title: "Business License Research", desc: "We research the licenses and permits your business needs at every level." },
  { icon: Mail, title: "Virtual Address", desc: "A professional business address for mail, filings, and your public presence." },
  { icon: Landmark, title: "Registered Agent", desc: "A required representative for legal and state documents — included for one year." },
];

/* ─── Management Services ─── */
const managementServices = [
  { icon: RefreshCw, title: "Annual Reports", desc: "Never miss a state filing deadline with automated annual report service." },
  { icon: ScrollText, title: "Amendments", desc: "Update your business name, address, members, or other formation details." },
  { icon: Building, title: "Foreign Qualification", desc: "Expand and register your business to operate legally in additional states." },
  { icon: FileText, title: "Certificate of Good Standing", desc: "Prove your business is compliant and in good standing with the state." },
  { icon: UserCheck, title: "Registered Agent Service", desc: "Ongoing registered agent representation to keep you compliant year-round." },
  { icon: Globe2, title: "Dissolution", desc: "Formally close your business the right way with proper state filings." },
];

/* ─── Entity Tabs Data ─── */
const entityTabsData = [
  {
    id: "LLC",
    label: "LLC",
    title: "Limited Liability Companies (LLCs)",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    faqs: [
      { q: "Flexibility & Operational Ease", a: "An LLC offers maximum flexibility with minimal formalities. There\u2019s no requirement for a board of directors, annual meetings, or rigid management structures. Members can run the business directly or appoint managers, and operating agreements can be customized to fit almost any need." },
      { q: "Ownership & Management", a: "LLCs can have unlimited members (owners), including individuals, corporations, or foreign nationals. Management can be member-managed (all owners involved) or manager-managed (designated individuals run operations), giving significant structural freedom." },
      { q: "Taxation Advantages", a: "By default, LLCs are pass-through entities \u2014 profits and losses flow directly to members\u2019 personal tax returns, avoiding corporate-level taxation. LLCs can also elect to be taxed as an S-Corp or C-Corp, offering additional planning flexibility." },
      { q: "Liability Protection", a: "Members enjoy strong personal liability protection \u2014 their personal assets (home, savings, etc.) are generally shielded from business debts and lawsuits, as long as the corporate veil is maintained (no commingling of funds, etc.)." },
      { q: "Compliance Requirements", a: "LLCs have relatively light compliance burdens. Requirements vary by state but typically include filing Articles of Organization, paying annual fees/reports, and maintaining a registered agent. No mandatory board meetings or minutes are required." },
      { q: "Financing Options", a: "LLCs can secure funding through bank loans, private investors, and member contributions. However, they cannot issue stock, which makes attracting venture capital or institutional investors more challenging compared to corporations." },
      { q: "Great Choice For", a: "Small to mid-sized businesses, real estate investors, freelancers, consultants, and entrepreneurs who want liability protection with minimal red tape and flexible tax options." },
    ],
  },
  {
    id: "S-Corp",
    label: "S-Corp",
    title: "S-Corporations",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    faqs: [
      { q: "Flexibility & Operational Ease", a: "S-Corps require more structure than LLCs, including a board of directors, officer roles, and annual shareholder meetings. However, they still offer meaningful operational simplicity compared to C-Corps and are well-suited for small business owners." },
      { q: "Ownership & Management", a: "S-Corps are limited to 100 shareholders, all of whom must be U.S. citizens or permanent residents. Only one class of stock is allowed. Management follows a traditional corporate structure with a board of directors and elected officers." },
      { q: "Taxation Advantages", a: "Like LLCs, S-Corps are pass-through entities \u2014 income is taxed at the shareholder level, not the corporate level. A key advantage is that owner-employees can split income between salary and distributions, potentially reducing self-employment tax liability." },
      { q: "Liability Protection", a: "Shareholders receive strong personal liability protection similar to a C-Corp. Personal assets are protected from business debts and legal claims, provided corporate formalities are properly maintained." },
      { q: "Compliance Requirements", a: "S-Corps must follow standard corporate formalities: file Articles of Incorporation, hold annual meetings, maintain minutes and bylaws, and file IRS Form 2553 to elect S-Corp status. State-level reporting requirements also apply." },
      { q: "Financing Options", a: "S-Corps can issue stock to raise capital, but are restricted to one class of stock and 100 shareholders, which limits large-scale fundraising. They work well for small business investment but aren\u2019t ideal for venture-backed growth." },
      { q: "Great Choice For", a: "Small business owners, family businesses, and self-employed professionals who want pass-through taxation, liability protection, and the ability to reduce self-employment taxes through a salary/distribution structure." },
    ],
  },
  {
    id: "C-Corp",
    label: "C-Corp",
    title: "C-Corporations",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    faqs: [
      { q: "Flexibility & Operational Ease", a: "C-Corps are the most structured entity type, requiring a board of directors, officers, shareholder meetings, bylaws, and detailed record-keeping. While operationally complex, this structure provides a clear governance framework ideal for scaling." },
      { q: "Ownership & Management", a: "C-Corps have no restrictions on the number or type of shareholders \u2014 domestic, foreign, individuals, and entities can all hold stock. Multiple classes of stock (common, preferred) are allowed, enabling complex ownership and governance arrangements." },
      { q: "Taxation Advantages", a: "C-Corps are taxed at the corporate level (currently a flat 21% federal rate), and shareholders are taxed again on dividends \u2014 known as \u201cdouble taxation.\u201d However, C-Corps can retain earnings at lower corporate rates and offer tax-advantaged benefits like deductible health insurance and retirement plans." },
      { q: "Liability Protection", a: "Shareholders, directors, and officers are protected from personal liability for corporate debts and lawsuits. This is one of the strongest liability protections available, particularly important as the business grows and takes on more risk." },
      { q: "Compliance Requirements", a: "C-Corps have the most rigorous compliance requirements: Articles of Incorporation, bylaws, annual meetings, board resolutions, detailed minutes, and both state and federal filings. Public companies face additional SEC regulations." },
      { q: "Financing Options", a: "C-Corps are the gold standard for raising capital. They can issue multiple classes of stock, attract venture capital, pursue IPOs, and offer stock options (like ISOs) to employees. Most institutional investors and VCs require a C-Corp structure." },
      { q: "Great Choice For", a: "Startups seeking venture capital, businesses planning to go public, companies with international investors or complex equity structures, and any business prioritizing long-term scalability and institutional investment." },
    ],
  },
  {
    id: "Non-Profit",
    label: "Non-Profit",
    title: "Non-Profit Organizations",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    faqs: [
      { q: "Flexibility & Operational Ease", a: "Non-profits operate under a mission-driven structure governed by a board of directors. While there are operational requirements around governance and reporting, the structure is designed around serving a public purpose rather than generating profit, offering a unique kind of operational focus." },
      { q: "Ownership & Management", a: "Non-profits have no owners \u2014 they are governed by a board of directors who serve in a fiduciary capacity. There are no shareholders or equity interests. Leadership is responsible for advancing the organization\u2019s mission, not personal financial gain." },
      { q: "Taxation Advantages", a: "Qualifying non-profits (typically 501(c)(3) organizations) are exempt from federal and most state income taxes. Donors can make tax-deductible contributions, which is a major fundraising advantage. The organization must use funds exclusively for its exempt purpose." },
      { q: "Liability Protection", a: "Board members and officers are generally protected from personal liability for organizational debts and actions, especially when acting in good faith within their roles. Directors & Officers (D&O) insurance is commonly used as an added layer of protection." },
      { q: "Compliance Requirements", a: "Non-profits must file for tax-exempt status (IRS Form 1023 or 1023-EZ), maintain detailed financial records, file annual Form 990s, and adhere to state charitable registration requirements. Ongoing compliance is critical to maintaining tax-exempt status." },
      { q: "Financing Options", a: "Non-profits cannot raise equity capital, but they can receive grants, donations, membership dues, program fees, and government funding. A 501(c)(3) designation significantly expands grant eligibility and donor appeal." },
      { q: "Great Choice For", a: "Charities, educational institutions, religious organizations, foundations, community service groups, and mission-driven organizations focused on public benefit rather than profit generation." },
    ],
  },
];

const STATE_FEES: Record<string, number> = {
  Alabama: 236, Alaska: 250, Arizona: 50, Arkansas: 45, California: 70,
  Colorado: 50, Connecticut: 120, Delaware: 90, Florida: 125, Georgia: 100,
  Hawaii: 50, Idaho: 100, Illinois: 150, Indiana: 95, Iowa: 50, Kansas: 160,
  Louisiana: 75, Maine: 175, Maryland: 100, Massachusetts: 500, Michigan: 50,
  Minnesota: 155, Mississippi: 50, Missouri: 50, Montana: 70, Nebraska: 105,
  Nevada: 75, "New Hampshire": 100, "New Jersey": 125, "New Mexico": 50,
  "New York": 200, "North Carolina": 125, "North Dakota": 135, Ohio: 99,
  Oklahoma: 100, Oregon: 100, Pennsylvania: 125, "Rhode Island": 150,
  "South Carolina": 110, "South Dakota": 150, Tennessee: 300, Texas: 300,
  Utah: 72, Vermont: 125, Virginia: 100, Washington: 200, "Washington DC": 220,
  "West Virginia": 100, Wisconsin: 130, Wyoming: 100,
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [entityTab, setEntityTab] = useState<string>("LLC");
  const [entityFaq, setEntityFaq] = useState<number | null>(0);

  /* Hero step flow */
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const router = useRouter();
  const handleStartBusiness = () => {
    if (selectedEntity && selectedState) {
      router.push(`/order/step2?entity=${encodeURIComponent(selectedEntity)}&state=${encodeURIComponent(selectedState)}`);
    }
  };

  const openPayment = (plan: Plan) => setActivePlan(plan);
  const closePayment = () => setActivePlan(null);

  return (
    <div className="min-h-screen bg-white text-primary">
      {activePlan && <PaymentModal plan={activePlan} onClose={closePayment} />}
      <Header />
      <FloatingContactButtons />

      {/* ═══════════════ BANNER ═══════════════ */}
      <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/hero section.png"
          alt="Business Registration Services"
          fill
          priority
          fetchPriority="high"
          quality={65}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Text content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-xl text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-6">
              <span className="text-accent">Reliable & Fully Compliant Business</span>{" "}
              <span className="text-black">Registration Services in the USA</span>
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Starting a fully legal business can be challenging, but Brendat LLC makes it simple. We provide complete business registration services in the USA, including LLC and S corporation formation, legal services, trademarks, and everything you need to make doing business easier.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all text-sm"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#25D366] bg-white/90 px-7 py-3.5 text-sm font-bold text-[#128C4A] shadow-lg shadow-black/10 transition-all hover:bg-[#25D366] hover:text-white"
              >
                WhatsApp <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ HERO ═══════════════ */}
      <section id="hero" className="bg-white pt-28 md:pt-36 pb-20 md:pb-28 px-4">
        <div className="mx-auto max-w-7xl">

          {/* ── Step 1: Entity & State selection ── */}
          <>
              {/* Heading */}
              <div className="text-left mb-14">
                <h1 className="animate-fade-in-up text-[48px] font-black text-black leading-[1.08] tracking-tight mb-6">
                  Start Your Business<br />
                  With <span className="text-accent">Confidence</span>
                </h1>
                <p className="animate-fade-in-up-delay text-gray-600 text-base max-w-lg leading-relaxed">
                  Join over 1,000,000 happy business owners. Get started by choosing your entity type and state of formation.
                </p>
              </div>

              {/* Form card */}
              <div className="animate-fade-in-up-delay-2 bg-white rounded-2xl border border-gray-200 shadow-lg p-8 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  {/* Pick Entity */}
                  <div>
                    <div className="flex items-center gap-3 border border-accent rounded-xl px-4 py-3.5 bg-gray-50 focus-within:ring-2 ring-accent/30 transition-all">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-white text-xs font-bold shrink-0">1</span>
                      <div className="flex flex-col flex-1">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">Entity Type</span>
                        <select
                          value={selectedEntity}
                          onChange={(e) => setSelectedEntity(e.target.value)}
                          className="bg-transparent text-black border-none focus:outline-none w-full font-semibold appearance-none cursor-pointer text-sm"
                        >
                          <option value="">Pick Entity</option>
                          <option>LLC</option>
                          <option>S-Corporation</option>
                          <option>C-Corporation</option>
                          <option>Nonprofit</option>
                        </select>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 pointer-events-none" />
                    </div>
                  </div>

                  {/* Select State */}
                  <div>
                    <div className="flex items-center gap-3 border border-accent rounded-xl px-4 py-3.5 bg-gray-50 focus-within:ring-2 ring-accent/30 transition-all">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-white text-xs font-bold shrink-0">2</span>
                      <div className="flex flex-col flex-1">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">State</span>
                        <select
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                          className="bg-transparent text-black border-none focus:outline-none w-full font-semibold appearance-none cursor-pointer text-sm"
                        >
                          <option value="">Select State</option>
                          {Object.keys(STATE_FEES).map((st) => (
                            <option key={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 pointer-events-none" />
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={handleStartBusiness}
                    disabled={!selectedEntity || !selectedState}
                    className="bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl px-6 py-3.5 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/25 text-sm whitespace-nowrap"
                  >
                    Start My Business <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>

        </div>
      </section>

      {/* ═══════════════ SERVICES OVERVIEW ═══════════════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[48px] font-black text-primary mb-4 leading-tight text-left">Pick the Right Service for Yourself</h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl mb-10 text-left">
            From LLC formation and trademark registration to bookkeeping and legal services, Brendat offers everything your business needs.
          </p>
          {/* Top row — 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">

            {/* ── Formation ── */}
            <div className="rounded-3xl bg-[#FEF9E7] p-8 pb-0 flex flex-col min-h-[500px] overflow-hidden">
              <div className="flex items-center gap-2 mb-5">
                <FileText className="w-4 h-4 text-[#8B6914]" />
                <span className="text-sm font-bold text-[#8B6914]">Formation</span>
              </div>
              <h3 className="text-2xl md:text-[27px] font-black text-black leading-[1.15] mb-3">
                Form Your Business in the U.S From Anywhere.
              </h3>
              <Link href="/business-formation" className="text-sm font-semibold text-black flex items-center gap-0.5 mb-8 hover:gap-1.5 transition-all">
                Start Your Business <ChevronRight className="w-4 h-4" />
              </Link>
              {/* Mock dashboard */}
              <div className="mt-auto w-full">
                <div className="bg-white rounded-t-2xl shadow-2xl border border-gray-100 p-4 translate-y-3">
                  <p className="font-bold text-xs text-black mb-3">Company</p>
                  <div className="flex gap-3">
                    <div className="flex-1 space-y-2">
                      {["Initial Formation", "Company profile", "Filed in Wyoming"].map((s, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[10px]">
                          <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle2 className="w-2 h-2 text-white" />
                          </div>
                          <span className="text-gray-600">{s}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <div className="w-3 h-3 rounded-full bg-gray-200" />
                        <span className="text-gray-400">Articles of Organization</span>
                      </div>
                    </div>
                    <div className="flex-1 bg-[#FEF9E7] rounded-lg p-2.5">
                      <span className="text-[8px] bg-green-100 text-green-700 font-semibold px-1.5 py-0.5 rounded-full">In progress</span>
                      <p className="font-bold text-[11px] mt-1.5">Filed with Wyoming</p>
                      <p className="text-[8px] text-gray-500 mt-0.5 leading-snug">Your business formation is officially in the works. Processing times vary by state.</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex gap-3">
                    <div className="flex-1">
                      <p className="font-bold text-[10px] mb-1.5">Information</p>
                      <div className="space-y-1 text-[9px] text-gray-500">
                        <div className="flex justify-between"><span>Name</span><span className="text-black font-medium">Wonderland Digital</span></div>
                        <div className="flex justify-between"><span>Entity Type</span><span className="text-black font-medium">C-Corp</span></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[10px] mb-1.5">Company Documents</p>
                      <p className="text-[9px] text-gray-500">8 Documents</p>
                      <button className="mt-1.5 bg-green-600 text-white text-[8px] font-bold px-2.5 py-1 rounded-md">My Documents ▸</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Bookkeeping ── */}
            <div className="rounded-3xl bg-[#ECFDF5] p-8 pb-0 flex flex-col min-h-[500px] overflow-hidden">
              <div className="flex items-center gap-2 mb-5">
                <BookOpen className="w-4 h-4 text-[#166534]" />
                <span className="text-sm font-bold text-[#166534]">Bookkeeping</span>
              </div>
              <h3 className="text-2xl md:text-[27px] font-black text-black leading-[1.15] mb-3">
                Easy Bookkeeping for Your Finances.
              </h3>
              <Link href="/contact" className="text-sm font-semibold text-black flex items-center gap-0.5 mb-8 hover:gap-1.5 transition-all">
                Track Your Finances <ChevronRight className="w-4 h-4" />
              </Link>
              {/* Mock transactions */}
              <div className="mt-auto w-full">
                <div className="bg-white rounded-t-2xl shadow-2xl border border-teal-100 p-4 translate-y-3">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-xs text-black">Transactions</p>
                    <div className="flex gap-1.5 items-center">
                      <div className="h-5 w-24 bg-gray-100 rounded-md flex items-center px-2">
                        <span className="text-[8px] text-gray-400">Search a transaction…</span>
                      </div>
                      <div className="h-5 w-5 bg-blue-600 rounded-md flex items-center justify-center text-[8px] text-white font-bold">+</div>
                    </div>
                  </div>
                  <div className="text-[8px] text-gray-400 flex gap-4 mb-2 border-b border-gray-100 pb-1.5">
                    <span className="w-12">Date</span><span className="flex-1">Description</span><span className="w-14 text-right">Amount</span><span className="w-16 text-right">Status</span>
                  </div>
                  <div className="space-y-0">
                    {[
                      { date: "May 2, 2025", desc: "x7257 Amazon.com*W87DSF0", cat: "Money · Desktop · 1786", amount: "+$2,058.10", status: "Received", color: "bg-green-100 text-green-700" },
                      { date: "Apr 24, 2025", desc: "GUSTO TAX 95531", cat: "Credit Card · Desktop · 1123", amount: "$47.00", status: "Upcoming", color: "bg-amber-100 text-amber-700" },
                      { date: "Apr 18, 2025", desc: "Invoice #r 238", cat: "", amount: "$1,990.00", status: "Rejected", color: "bg-red-100 text-red-600" },
                      { date: "Apr 7, 2025", desc: "Emergency Fund Transfer", cat: "Mon · Checking · 1235", amount: "$4,900.00", status: "To-Do", color: "bg-purple-100 text-purple-700" },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0 text-[9px]">
                        <span className="text-gray-400 w-12 shrink-0 leading-tight">{tx.date}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-700 font-medium truncate">{tx.desc}</p>
                          {tx.cat && <p className="text-[7px] text-gray-400 truncate">{tx.cat}</p>}
                        </div>
                        <span className="font-bold text-black w-14 text-right shrink-0">{tx.amount}</span>
                        <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[7px] font-semibold shrink-0 ${tx.color}`}>{tx.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Taxes ── */}
            <div className="rounded-3xl bg-[#E8F5E9] p-8 pb-0 flex flex-col min-h-[500px] overflow-hidden">
              <div className="flex items-center gap-2 mb-5">
                <PieChart className="w-4 h-4 text-[#166534]" />
                <span className="text-sm font-bold text-[#166534]">Taxes</span>
              </div>
              <h3 className="text-2xl md:text-[27px] font-black text-black leading-[1.15] mb-3">
                Worry Free Tax Filings using Brendat Dashboard.
              </h3>
              <Link href="/contact" className="text-sm font-semibold text-black flex items-center gap-0.5 mb-8 hover:gap-1.5 transition-all">
                File Your Taxes <ChevronRight className="w-4 h-4" />
              </Link>
              {/* Mock taxes dashboard */}
              <div className="mt-auto w-full">
                <div className="flex gap-2 translate-y-3">
                  <div className="flex-[2] bg-white rounded-tl-2xl shadow-2xl border border-gray-100 p-4">
                    <p className="font-bold text-xs text-black mb-1">Taxes</p>
                    <p className="text-[9px] text-gray-500 mb-3">Tax Filings · <span className="text-green-600 font-semibold">In progress</span></p>
                    <div className="mb-3">
                      <div className="flex gap-1 mb-1">
                        {[60, 40, 80, 55, 90, 70, 45].map((h, i) => (
                          <div key={i} className="flex-1 bg-gray-100 rounded-sm" style={{ height: `${h * 0.4}px` }}>
                            <div className="bg-green-500/60 rounded-sm w-full" style={{ height: `${h * 0.25}px` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 text-[8px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 bg-red-50 rounded" />
                          <span className="text-gray-600">TaxReturn-2023.pdf</span>
                        </div>
                        <span className="text-gray-400">Aug 1, 2023</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 bg-blue-50 rounded" />
                          <span className="text-gray-600">CPA Consultation</span>
                        </div>
                        <span className="text-gray-400">Jul 15, 2023</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-accent rounded-tr-2xl shadow-2xl p-3.5 text-white min-w-[120px]">
                    <p className="font-bold text-[11px] mb-1">This month</p>
                    <p className="text-[8px] opacity-80 leading-snug mb-3">Ready to file? Let our experts handle your taxes and provide the guidance you need.</p>
                    <div className="space-y-1.5 text-[8px]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Feb 28, 10 days</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>CPA Consultation</span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-1.5">
                      <button className="bg-white/20 text-[7px] font-bold px-2 py-1 rounded-md">View all</button>
                      <button className="bg-white text-accent text-[7px] font-bold px-2 py-1 rounded-md">Join ▸</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row — 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* ── Legal Services ── */}
            <div className="rounded-3xl bg-[#E0F7FA] p-8 overflow-hidden min-h-[380px]">
              <div className="flex flex-col md:flex-row gap-6 h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-5">
                    <Scale className="w-4 h-4 text-[#00695C]" />
                    <span className="text-sm font-bold text-[#00695C]">Legal Services</span>
                  </div>
                  <h3 className="text-2xl md:text-[28px] font-black text-black leading-[1.15] mb-3">
                    Expert Legal Support for Your Business.
                  </h3>
                  <Link href="/business-attorney-plans" className="text-sm font-semibold text-black flex items-center gap-0.5 hover:gap-1.5 transition-all">
                    Talk to an Attorney <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                {/* Mock legal consultation */}
                <div className="flex-1 flex items-center">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-full">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-[#00695C] flex items-center justify-center">
                        <Scale className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-bold text-xs">Legal Advisor</span>
                      <span className="text-[8px] text-green-500 font-semibold ml-auto">● Available</span>
                    </div>
                    <div className="space-y-2 text-[10px]">
                      {/* Consultation items */}
                      {[
                        { title: "Operating Agreement", status: "Completed", color: "bg-green-100 text-green-700", icon: "✓" },
                        { title: "Trademark Search", status: "In Review", color: "bg-amber-100 text-amber-700", icon: "◷" },
                        { title: "NDA Template", status: "Ready", color: "bg-blue-100 text-blue-700", icon: "↓" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-gray-50 rounded-lg p-2">
                          <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold">{item.icon}</div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 text-[10px]">{item.title}</p>
                            <p className="text-[8px] text-gray-400">Business legal document</p>
                          </div>
                          <span className={`px-1.5 py-0.5 rounded-full text-[7px] font-semibold ${item.color}`}>{item.status}</span>
                        </div>
                      ))}
                      {/* Attorney note */}
                      <div className="bg-[#E0F7FA] rounded-lg p-2.5 mt-1">
                        <p className="font-bold text-[9px] text-[#00695C] mb-0.5">Attorney Note</p>
                        <p className="text-[8px] text-gray-600 leading-relaxed">Your operating agreement has been reviewed and finalized. Trademark application is pending USPTO review — estimated 3-4 weeks.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Business Licensing ── */}
            <div className="rounded-3xl bg-[#FCE4EC] p-8 overflow-hidden min-h-[380px]">
              <div className="flex flex-col md:flex-row gap-6 h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-5">
                    <Stamp className="w-4 h-4 text-[#880E4F]" />
                    <span className="text-sm font-bold text-[#880E4F]">Business Licensing</span>
                  </div>
                  <h3 className="text-2xl md:text-[28px] font-black text-black leading-[1.15] mb-3">
                    Get Every License &amp; Permit You Need.
                  </h3>
                  <Link href="/business-licenses" className="text-sm font-semibold text-black flex items-center gap-0.5 hover:gap-1.5 transition-all">
                    Check My Licenses <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                {/* Mock license dashboard */}
                <div className="flex-1 flex items-center">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-full">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-bold text-xs">License Tracker</p>
                      <div className="flex gap-1 text-[8px]">
                        <span className="bg-[#880E4F] text-white px-2 py-0.5 rounded-full font-medium">All States</span>
                        <span className="text-gray-400 px-2 py-0.5 rounded-full bg-gray-50">Federal</span>
                      </div>
                    </div>
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[
                        { label: "Active Licenses", value: "4", color: "text-green-600" },
                        { label: "Pending", value: "2", color: "text-amber-600" },
                        { label: "Renewals Due", value: "1", color: "text-red-500" },
                      ].map((s, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
                          <p className="text-[7px] text-gray-400">{s.label}</p>
                          <p className={`text-[14px] font-black ${s.color}`}>{s.value}</p>
                        </div>
                      ))}
                    </div>
                    {/* License list */}
                    <div className="space-y-1.5 text-[9px]">
                      {[
                        { name: "General Business License", state: "Wyoming", status: "Active", color: "bg-green-100 text-green-700", date: "Exp: Dec 2026" },
                        { name: "Sales Tax Permit", state: "Wyoming", status: "Active", color: "bg-green-100 text-green-700", date: "Exp: Mar 2027" },
                        { name: "EIN Confirmation", state: "Federal", status: "Active", color: "bg-green-100 text-green-700", date: "Permanent" },
                        { name: "DBA Filing", state: "Wyoming", status: "Pending", color: "bg-amber-100 text-amber-700", date: "Est: 5 days" },
                        { name: "Professional License", state: "California", status: "Renewal", color: "bg-red-100 text-red-600", date: "Due: Apr 2026" },
                      ].map((lic, i) => (
                        <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                          <div className="w-5 h-5 rounded bg-[#FCE4EC] flex items-center justify-center">
                            <Stamp className="w-3 h-3 text-[#880E4F]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-700 truncate">{lic.name}</p>
                            <p className="text-[7px] text-gray-400">{lic.state} · {lic.date}</p>
                          </div>
                          <span className={`px-1.5 py-0.5 rounded-full text-[7px] font-semibold shrink-0 ${lic.color}`}>{lic.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ ENTITY TYPES — TABBED FAQ ═══════════════ */}
      <section className="py-20 md:py-28 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-left mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">
              Find the Entity That&apos;s Right For You
            </h2>
            <p className="text-gray-500 max-w-xl text-lg">
              Brendat will <strong className="text-black">guide you through the process.</strong>{" "}
              Use our resources to select a business formation type.
            </p>
          </div>

          {/* Tip badge */}
          <div className="flex justify-start mb-8">
            <span className="inline-flex items-center gap-2 border border-accent/30 rounded-full px-5 py-2 text-sm text-accent font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              Did you know LLCs are the most popular choice for startups?
            </span>
          </div>

          {/* Tabs */}
          <div className="flex justify-start mb-14">
            <div className="inline-flex items-center border border-gray-200 rounded-full p-1">
              {entityTabsData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setEntityTab(tab.id); setEntityFaq(0); }}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                    entityTab === tab.id
                      ? "bg-accent text-white shadow-md"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content — FAQ + Image */}
          {entityTabsData.map((tab) =>
            entityTab === tab.id ? (
              <div key={tab.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left: FAQ accordion */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-black mb-8">{tab.title}</h3>
                  <div className="divide-y divide-gray-100">
                    {tab.faqs.map((faq, i) => (
                      <div key={i}>
                        <button
                          className="w-full flex justify-between items-center py-5 text-left cursor-pointer select-none group"
                          onClick={() => setEntityFaq(entityFaq === i ? null : i)}
                        >
                          <h4 className={`font-bold pr-4 transition-colors ${entityFaq === i ? "text-black" : "text-gray-700"}`}>{faq.q}</h4>
                          <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${entityFaq === i ? "rotate-180" : ""}`} />
                        </button>
                        {entityFaq === i && (
                          <p className="pb-5 text-gray-500 text-[15px] leading-relaxed -mt-1">{faq.a}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Image */}
                <div className="hidden lg:block">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={tab.image}
                      alt={tab.title}
                      className="w-full h-[520px] object-cover"
                    />
                  </div>
                </div>
              </div>
            ) : null
          )}

          <div className="mt-12 flex justify-start">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-dark"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ WITH & WITHOUT ═══════════════ */}
      <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left — WITHOUT Brendat */}
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 md:p-10 relative min-h-[520px] overflow-hidden">
              <h3 className="text-xl md:text-2xl font-black text-gray-400 uppercase tracking-widest mb-4">Without Brendat</h3>

              {/* Physics-based falling words */}
              <div className="w-full h-[400px]">
                <FallingText
                  text="Outdated Structure Compliance Penalties Tax Confusion Security Risks Missed Deadlines No Expert Guidance Poor Filing Slow Processing Hidden Fees Lost Documents"
                  highlightWords={["Outdated", "Compliance", "Tax", "Security", "Missed", "No", "Poor", "Slow", "Hidden", "Lost"]}
                  highlightClass="highlighted"
                  trigger="scroll"
                  backgroundColor="transparent"
                  gravity={1}
                  mouseConstraintStiffness={0.2}
                  fontSize="0.75rem"
                />
              </div>
            </div>

            {/* Right — WITH Brendat */}
            <div className="rounded-3xl border-2 border-accent/40 bg-white p-8 md:p-10 shadow-[0_0_60px_-15px_rgba(255,74,0,0.12)]">
              <h3 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-tight mb-3">
                With <span className="text-accent">Brendat</span>
              </h3>
              <p className="text-gray-500 leading-relaxed mb-10 max-w-lg">
                Build a future-ready business with expert formation, full compliance support, and tools designed for growth from day one.
              </p>

              <div className="space-y-5">
                {[
                  {
                    title: "Hassle-Free Formation",
                    desc: "We handle all the paperwork — articles of organization, EIN filing, and state registration — so you can focus on building your business.",
                  },
                  {
                    title: "Ongoing Compliance & Support",
                    desc: "Stay on track with automated compliance alerts, annual report reminders, and access to dedicated support whenever you need it.",
                  },
                  {
                    title: "All-in-One Business Dashboard",
                    desc: "Manage your documents, track deadlines, and access every filing from a single, clean online dashboard — anytime, anywhere.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ ONGOING MANAGEMENT ═══════════════ */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel label="Business Management" />
              <h2 className="text-4xl font-black text-primary mb-4 leading-tight">
                Stay Compliant <br />
                <span className="text-accent">Long After Launch</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-lg">
                Formation is just the beginning. We provide ongoing management services so your business stays in good standing — year after year.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {managementServices.map((s) => (
                  <div key={s.title} className="flex items-start gap-3 p-4 rounded-xl bg-surface-alt border border-gray-100">
                    <s.icon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm text-primary">{s.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Dashboard */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-primary font-bold">Compliance Dashboard</div>
                    <div className="text-gray-500 text-xs">All tasks up to date</div>
                  </div>
                  <div className="ml-auto bg-emerald/20 text-emerald text-xs font-bold px-3 py-1 rounded-full">Active</div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Annual Report — Texas", status: "Filed", color: "bg-emerald" },
                    { label: "Registered Agent Renewal", status: "Due in 45 days", color: "bg-amber" },
                    { label: "EIN Confirmation", status: "Complete", color: "bg-emerald" },
                    { label: "Certificate of Good Standing", status: "Available", color: "bg-accent-light" },
                    { label: "Business License Renewal", status: "Pending", color: "bg-blue-500" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
                      <span className="text-sm text-gray-700">{item.label}</span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.color} text-white`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SOCIAL PROOF ═══════════════ */}
      <section className="py-24 bg-surface-alt border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-6 text-left">
            <div>
              <SectionLabel label="Testimonials" />
              <h2 className="text-3xl font-black text-primary">Trusted by Entrepreneurs Nationwide</h2>
            </div>
            <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-200">
              <Star className="text-amber w-9 h-9 fill-amber" />
              <div>
                <p className="font-black text-2xl text-primary">4.8 / 5</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Trustpilot</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah M.", role: "LLC Owner, Austin TX", quote: "Brendat made starting my LLC ridiculously easy. I finished in under 15 minutes and my documents were filed the next day." },
              { name: "David R.", role: "S-Corp Founder, Miami FL", quote: "The compliance dashboard is a lifesaver. I never miss a filing deadline, and their support team is incredibly responsive." },
              { name: "Priya K.", role: "Nonprofit Director, Houston TX", quote: "We formed our nonprofit through Brendat and the process was seamless. They handled everything from articles to EIN." },
            ].map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex text-amber mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber" />
                  ))}
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed text-[15px]">"{review.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-bold text-sm">{review.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-primary">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black text-primary leading-tight max-w-3xl">
              Easy Business Registration with <span className="text-accent">Brendat</span>
            </h2>
          </div>

          {/* Content: steps overlapping image */}
          <div className="relative grid grid-cols-1 lg:grid-cols-[420px_580px] gap-0 items-stretch min-h-[600px] justify-center mx-auto">
            {/* Steps (left, overlapping image) */}
            <div className="relative z-10 flex flex-col justify-between py-4 lg:-mr-16 space-y-6">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-sm h-[188px] flex flex-col">
                <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center text-sm font-black mb-3 shadow-md shadow-accent/20">1</div>
                <h3 className="font-black text-primary text-base mb-2">Choose your company&apos;s structure</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Choose between LLC, S-Corp, C-Corp, or Nonprofit as your company&apos;s corporate and tax structure.</p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-sm lg:ml-8 h-[188px] flex flex-col">
                <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center text-sm font-black mb-3 shadow-md shadow-accent/20">2</div>
                <h3 className="font-black text-primary text-base mb-2">Choose the company registration state</h3>
                <p className="text-gray-500 text-sm leading-relaxed">With Brendat, you can register your business in any of the 50 states, each with its own specifics: Delaware, Wyoming, Texas, Florida, and more.</p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-sm h-[188px] flex flex-col">
                <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center text-sm font-black mb-3 shadow-md shadow-accent/20">3</div>
                <h3 className="font-black text-primary text-base mb-2">Choose your plan and leave the rest to us!</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Each plan covers formation, renewals, and taxes. Pick the right package and our team handles all the paperwork so you can focus on your business.</p>
              </div>
            </div>

            {/* Image (right) */}
            <div className="hidden lg:block relative rounded-3xl overflow-hidden shadow-2xl min-h-[600px]">
              <img
                src="/how-it-works.jpeg"
                alt="American flag with city buildings"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/40" />
            </div>

            {/* Mobile image (below steps) */}
            <div className="lg:hidden mt-10 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/how-it-works.jpeg"
                alt="American flag with city buildings"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CUSTOMER SUPPORT ═══════════════ */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-6 px-8 py-6">
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Headset className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-white font-black text-base">Customer support is our priority</h3>
                  <p className="text-gray-400 text-xs">Real help from real people · English & Spanish speaking</p>
                </div>
              </div>
              <div className="hidden lg:block flex-1 border-t border-white/10" />
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm hidden sm:inline">Need help?</span>
                <Link href="/contact" className="inline-block bg-accent hover:bg-accent-dark text-white font-bold text-xs px-6 py-2.5 rounded-full transition-all">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ══════════════*/}
      <section id="faq" className="py-24 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Heading */}
            <div className="lg:sticky lg:top-24">
              <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-4">
                Frequently Asked<br />Questions
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed max-w-md">
                Everything you need to know about starting and managing your business with Brendat.
              </p>
            </div>

            {/* Right — Accordion */}
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    className="w-full flex justify-between items-center py-6 text-left cursor-pointer select-none group"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <h4 className={`font-bold pr-4 transition-colors ${openFaq === i ? "text-accent" : "text-primary group-hover:text-accent"}`}>{faq.q}</h4>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${openFaq === i ? "border-accent bg-accent text-white rotate-180" : "border-gray-300 text-gray-400"}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {openFaq === i && (
                    <p className="pb-6 text-gray-500 text-[15px] leading-relaxed -mt-2">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
