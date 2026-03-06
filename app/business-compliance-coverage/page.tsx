"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Check, 
  Phone, 
  MessageCircle, 
  Shield, 
  Scale, 
  ChevronRight,
  ChevronDown, 
  HelpCircle, 
  Briefcase, 
  FileText,
  Clock,
  Landmark,
  UserCheck,
  Building,
  AlertTriangle,
  BadgeCheck,
  ScanLine,
  Gavel,
  History,
  FileCheck,
  Building2,
  BookOpen,
  Receipt,
  ArrowRight,
  CircleDot,
  CircleCheck,
  Timer
} from "lucide-react";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const STATE_FEES: Record<string, number> = {
  Alabama: 236, Alaska: 250, Arizona: 85, Arkansas: 45, California: 70,
  Colorado: 25, Connecticut: 80, Delaware: 90, Florida: 125, Georgia: 100,
  Hawaii: 51, Idaho: 100, Illinois: 75, Indiana: 50, Iowa: 45,
  Kansas: 55, Kentucky: 40, Louisiana: 75, Maine: 85, Maryland: 300,
  Massachusetts: 500, Michigan: 25, Minnesota: 155, Mississippi: 50, Missouri: 50,
  Montana: 35, Nebraska: 10, Nevada: 425, "New Hampshire": 100, "New Jersey": 125,
  "New Mexico": 50, "New York": 200, "North Carolina": 125, "North Dakota": 135, Ohio: 99,
  Oklahoma: 100, Oregon: 100, Pennsylvania: 70, "Rhode Island": 150, "South Carolina": 110,
  "South Dakota": 150, Tennessee: 300, Texas: 300, Utah: 59, Vermont: 125,
  Virginia: 100, Washington: 180, "West Virginia": 25, Wisconsin: 130, Wyoming: 100,
};

const pricingPlans = [
  {
    name: "Compliance Filings",
    price: "199",
    period: "/yr*",
    subtext: "Auto-renews. Cancel anytime.",
    description: "Stay Ahead of Penalties and Legal Risks: Keep your business in good standing with our comprehensive business compliance support in USA, ensuring every filing and requirement is handled accurately and on time.",
    buttonText: "Get Compliant Now",
    href: "/order/step2",
    includesLabel: "Includes:",
    features: [
      "Initial and annual reports to meet USA state filing requirements",
      "Amendments with the Secretary of State for any business updates",
      "Real-time notifications to keep you informed of your compliance status",
      "Customized alerts for all required filings and deadlines",
      "Expert attorney oversight tracking rule changes and assessing their impact",
      "Filing and ongoing updates for your Beneficial Ownership Information Report, if applicable",
      "Personalized guidance and support from experienced compliance specialists"
    ],
    color: "gray"
  },
  {
    name: "Compliance Filings + Licenses & Permits",
    price: "299",
    period: "/yr*",
    subtext: "Auto-renews. Cancel anytime.",
    description: "Take the stress out of staying compliant in USA. Our pro business compliance package in USA covers both essential filings and all necessary licenses, so your business operates smoothly and legally.",
    buttonText: "Manage Licenses Now",
    href: "/order/step2",
    includesLabel: "Everything in Compliance Filings, plus:",
    features: [
      "Initial and annual reports to satisfy ongoing state filing requirements",
      "Identification of all required federal, state, and local business licenses and permits",
      "Assistance with license and permit applications, renewals, and tracking expiration dates",
      "Easy-to-use dashboard for uploading, accessing, and sharing all your licenses and permits securely from your Brendat account.",
      "Real-time monitoring of government databases to keep you fully informed about updates or changes to your business licenses and permits.",
      "Custom alerts and reminders for all filings and license renewals",
      "Personalized guidance from our experienced compliance lawyers in USA to ensure you never miss a critical deadline"
    ],
    color: "gray"
  },
  {
    name: "Comprehensive Compliance Coverage",
    badge: "Full Service",
    price: "Concierge Support",
    priceSubtext: "Experience end-to-end compliance support",
    description: "Experience end-to-end compliance support with a dedicated concierge who handles filings, licenses, and regulatory requirements so you can focus on growing your business.",
    buttonText: "Start Concierge Support",
    href: "/contact",
    includesLabel: "Everything in Compliance Filings + Licenses & Permits, plus:",
    features: [
      "Personalized concierge assigned to your business, providing hands-on management and proactive monitoring of your compliance obligations",
      "Unlimited phone and email access to your concierge for guidance and questions",
      "Regular check-ins to identify risks, close gaps, and ensure your business remains audit-ready",
      "Initial review of your business standing, tailored compliance plan, and complete execution of filings and ongoing requirements",
      "Timely updates on every action taken on your behalf to keep you informed",
      "Quick responses to resolve compliance issues as soon as they arise",
      "Access to full-service solutions managed by your concierge, including Certificate of Good Standing, Foreign Qualification, and more",
      "AI-enhanced monitoring of federal, state, and local regulations to ensure you never miss critical updates",
      "Streamlined tools for uploading, viewing, and sharing business licenses and compliance documents",
      "Priority notifications for renewals, filings, and audits, keeping you fully protected and in good standing"
    ],
    color: "accent"
  }
];

const whyChooseMetadata = [
  { icon: Clock, title: "End-to-End Compliance Support", description: "From state filings to licenses, we handle all ongoing requirements so you never miss a critical deadline." },
  { icon: Scale, title: "Expert Business Compliance Lawyers", description: "Access guidance from experienced attorneys familiar with USA-specific regulations." },
  { icon: AlertTriangle, title: "Proactive Alerts and Monitoring", description: "Receive timely notifications about filings, renewals, and legal changes that impact your business." },
  { icon: Building, title: "Tailored Solutions for Every Business", description: "Whether you’re a startup, LLC, corporation, or nonprofit, we provide compliance plans that fit your needs." },
];

const auditItems = [
  "State and Federal Filings: Ensure all your required filings with state and federal agencies are accurate, submitted on time, and fully compliant.",
  "Business Licenses and Permits: Verify that your business holds all necessary local, state, and federal licenses to operate legally and avoid fines.",
  "Tax Registration Status: Confirm that your business is properly registered for all applicable taxes, from income to sales, payroll, and beyond.",
  "Employment Compliance: Stay compliant with labor laws, wage regulations, and workplace policies to protect your business and employees.",
  "Annual Reports and Amendments: Keep your business records current with timely filing of annual reports, amendments, and other required documents.",
  "Entity Structure and Governance: Review your organizational structure, bylaws, and corporate governance to maintain compliance and minimize legal risks.",
];

const complianceRisks = [
  { icon: Gavel, title: "State Penalties", description: "Failing to submit required state filings on time can result in hefty fines, late fees, or even administrative dissolution of your business, putting your operations and good standing at risk." },
  { icon: ScanLine, title: "Legal Investigations", description: "Operating with expired or invalid business licenses can draw attention from regulatory authorities, potentially leading to investigations, fines, or interruptions to your business activities." },
  { icon: FileCheck, title: "Audits", description: "Neglecting to file accurate and timely tax returns may prompt IRS or state audits, exposing your business to penalties, interest charges, and increased scrutiny." },
  { icon: UserCheck, title: "Trust Loss", description: "Poor or incomplete documentation of financials, contracts, and compliance records can erode trust with investors, lenders, and partners, limiting growth opportunities and strategic business decisions." },
];

const lawyerBenefits = [
  { title: "Governance Document Support", description: "Get expert help drafting and reviewing corporate bylaws, operating agreements, and other documents to ensure correct business structure." },
  { title: "Compliance Notices & Response", description: "Navigate and respond to compliance inquiries or notices efficiently, minimizing the risk of penalties and disruptions to business operations." },
  { title: "Risk Reduction Strategies", description: "Receive guidance on structuring your business to protect personal assets, manage liability, and reduce exposure to legal and financial risks." },
  { title: "Tax Compliance Advice", description: "Stay on top of state and federal tax requirements with counsel on filings, reporting, and strategic decisions to avoid audits and penalties." },
  { title: "Contract & Filing Review", description: "Ensure all contracts, registrations, and legal filings meet USA and USA compliance standards, keeping your business legally secure." },
];

const taxFeatures = [
  "Identifying required city, county, and state business licenses",
  "Reviewing your business tax compliance obligations in USA",
  "Ensuring your EIN, sales tax permits, and franchise tax accounts are properly filed",
  "Monitoring renewal dates and preparing documentation",
  "Our legal team tracks USA- and USA-specific regulations to ensure you’re never caught off guard by a missed filing or overlooked requirement." // Included as final point
];

const whoNeeds = [
  "Small and midsize businesses in USA",
  "Online businesses expanding into new states",
  "Franchises, LLCs, and corporations",
  "Nonprofits and professional service firms",
  "Founders preparing for investment or sale"
];

const faqs = [
  { question: "What is compliance in business?", answer: "It’s the ongoing process of following state, federal, and local laws that apply to your business. This includes licenses, tax filings, entity reports, and internal documentation." },
  { question: "What are filing fees?", answer: "" },
  { question: "What are business compliance services?", answer: "" },
  { question: "What happens during a compliance audit?", answer: "" },
  { question: "What’s included in your business compliance packages?", answer: "" },
  { question: "Who needs a compliance lawyer in USA?", answer: "" },
];

const reviews = [
  { name: "Samantha P.", type: "LLC Customer", text: "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!" },
  { name: "Carlos M.", type: "Trademark Customer", text: "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way." },
  { name: "Nell C.", type: "Last Will Customer", text: "We used Brendat for our estate planning documents, and I can’t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of." },
];

export default function BusinessCompliancePage() {
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const router = useRouter();

  const handleStartBusiness = () => {
    if (selectedEntity && selectedState) {
      router.push(`/order/step2?entity=${encodeURIComponent(selectedEntity)}&state=${encodeURIComponent(selectedState)}`);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 overflow-hidden">
          <HeroAvatars />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,0,0.08),transparent_50%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">USA Business Compliance Services You Can Trust</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Stay ahead of evolving regulations with our business compliance services in USA. From annual report filings to managing licenses, our USA business compliance lawyers provide complete support to keep your company in good standing. Plans start at $199/year*.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all text-lg">
                  Register My Business
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg">
                  Talk to a USA Business Attorney
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES DASHBOARD */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Everything Your Business Needs, In One Place</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Manage your formation, finances, taxes, legal support, and licensing — all from your Brendat dashboard.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Formation */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900">Formation</h3>
                    <p className="text-xs text-gray-500">Form Your Business in the U.S From Anywhere.</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4 flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Initial Formation</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Timer className="w-4 h-4 text-accent shrink-0" />
                      <span>Articles of Organization — <span className="text-accent font-semibold">In progress</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CircleCheck className="w-4 h-4 text-green-500 shrink-0" />
                      <span>Filed in Wyoming</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">Your business formation is officially in the works. Processing times vary by state.</p>
                </div>
                <Link href="/business-formation" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-5 py-3 rounded-xl transition-all text-sm">
                  Start Your Business <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Bookkeeping */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900">Bookkeeping</h3>
                    <p className="text-xs text-gray-500">Easy Bookkeeping for Your Finances.</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4 flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Recent Transactions</p>
                  <div className="space-y-2">
                    {[
                      { date: "May 2", desc: "Amazon.com Purchase", amount: "+$2,058.10", status: "Received", color: "text-green-600" },
                      { date: "Apr 24", desc: "GUSTO TAX", amount: "$47.00", status: "Upcoming", color: "text-yellow-600" },
                      { date: "Apr 18", desc: "Invoice #r 238", amount: "$1,990.00", status: "Rejected", color: "text-red-500" },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div>
                          <span className="text-gray-400 mr-1">{tx.date}</span>
                          <span className="text-gray-700 font-medium">{tx.desc}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-gray-900">{tx.amount}</span>
                          <span className={`ml-2 font-bold ${tx.color}`}>{tx.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-5 py-3 rounded-xl transition-all text-sm">
                  Track Your Finances <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Taxes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Receipt className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900">Taxes</h3>
                    <p className="text-xs text-gray-500">Worry Free Tax Filings using Brendat Dashboard.</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4 flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Tax Filings · In progress</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-gray-700">TaxReturn-2023.pdf</span>
                      <span className="text-xs text-gray-400 ml-auto">Aug 1, 2023</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CircleDot className="w-4 h-4 text-yellow-500 shrink-0" />
                      <span className="text-gray-700">CPA Consultation</span>
                      <span className="text-xs text-gray-400 ml-auto">Jul 15, 2023</span>
                    </div>
                  </div>
                  <div className="mt-3 bg-accent/5 rounded-lg p-2">
                    <p className="text-xs text-gray-600">Ready to file? Let our experts handle your taxes and provide the guidance you need.</p>
                  </div>
                </div>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-5 py-3 rounded-xl transition-all text-sm">
                  File Your Taxes <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Legal Services */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Scale className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900">Legal Services</h3>
                    <p className="text-xs text-gray-500">Expert Legal Support for Your Business.</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4 flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    <span className="text-xs font-bold text-green-600">Legal Advisor · Available</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { icon: CircleCheck, label: "Operating Agreement", status: "Completed", color: "text-green-600" },
                      { icon: Timer, label: "Trademark Search", status: "In Review", color: "text-yellow-600" },
                      { icon: FileText, label: "NDA Template", status: "Ready", color: "text-blue-600" },
                    ].map((doc, i) => {
                      const Icon = doc.icon;
                      return (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="text-gray-700">{doc.label}</span>
                          </div>
                          <span className={`text-xs font-bold ${doc.color}`}>{doc.status}</span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-400 mt-3 italic">Trademark application pending USPTO review — est. 3–4 weeks.</p>
                </div>
                <Link href="/business-attorney-plans" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-5 py-3 rounded-xl transition-all text-sm">
                  Talk to an Attorney <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Business Licensing */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:col-span-2 lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900">Business Licensing</h3>
                    <p className="text-xs text-gray-500">Get Every License &amp; Permit You Need.</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4 flex-1">
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div className="bg-white rounded-xl p-3 border border-gray-100">
                      <p className="text-2xl font-black text-gray-900">4</p>
                      <p className="text-xs text-gray-500">Active Licenses</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-gray-100">
                      <p className="text-2xl font-black text-yellow-600">2</p>
                      <p className="text-xs text-gray-500">Pending</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-gray-100">
                      <p className="text-2xl font-black text-red-500">1</p>
                      <p className="text-xs text-gray-500">Renewals Due</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "General Business License", location: "Wyoming · Exp: Dec 2026", status: "Active", color: "bg-green-100 text-green-700" },
                      { name: "Sales Tax Permit", location: "Wyoming · Exp: Mar 2027", status: "Active", color: "bg-green-100 text-green-700" },
                      { name: "EIN Confirmation", location: "Federal · Permanent", status: "Active", color: "bg-green-100 text-green-700" },
                      { name: "DBA Filing", location: "Wyoming · Est: 5 days", status: "Pending", color: "bg-yellow-100 text-yellow-700" },
                      { name: "Professional License", location: "California · Due: Apr 2026", status: "Renewal", color: "bg-red-100 text-red-700" },
                    ].map((lic, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-semibold text-gray-900">{lic.name}</span>
                          <span className="text-xs text-gray-400 ml-2">{lic.location}</span>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${lic.color}`}>{lic.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/business-licenses" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-5 py-3 rounded-xl transition-all text-sm">
                  Check My Licenses <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ENTITY & STATE SELECTION */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Start Your Filing in Minutes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select your business type and state to get started with our expert filing service.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Entity Type Dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Business Entity Type</label>
                    <div className="relative">
                      <select
                        value={selectedEntity}
                        onChange={(e) => setSelectedEntity(e.target.value)}
                        className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-4 pr-10 text-gray-900 font-medium focus:border-accent focus:ring-0 focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="">Select Entity Type</option>
                        <option value="LLC">Limited Liability Company (LLC)</option>
                        <option value="C-Corporation">C-Corporation</option>
                        <option value="S-Corporation">S-Corporation</option>
                        <option value="Nonprofit">Nonprofit</option>
                        <option value="Sole Proprietorship">Sole Proprietorship</option>
                        <option value="Partnership">Partnership</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* State Dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-2">State of Formation</label>
                    <div className="relative">
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-4 pr-10 text-gray-900 font-medium focus:border-accent focus:ring-0 focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="">Select State</option>
                        {Object.keys(STATE_FEES).map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* State Fee Display */}
                {selectedState && (
                  <div className="mb-8 p-4 bg-accent/5 rounded-xl border border-accent/20">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">State Filing Fee for {selectedState}:</span>
                      <span className="text-2xl font-black text-accent">${STATE_FEES[selectedState]}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">This fee is paid directly to the state</p>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={handleStartBusiness}
                  disabled={!selectedEntity || !selectedState}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${
                    selectedEntity && selectedState
                      ? "bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/25 hover:shadow-xl"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continue to Filing
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-accent" />
                      <span>Secure & Confidential</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-accent" />
                      <span>Fast Processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-accent" />
                      <span>100% Accuracy Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GUARANTEE BAR */}
        <section className="py-16 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">100% Accurate Filing Guarantee</h3>
                <p className="text-white/80 max-w-3xl">We’re committed to the highest quality and accuracy. If your filing is rejected or incorrect due to our error, we’ll correct it with the government agency at no additional cost to you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE BRENDAT */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Why Choose Brendat for Your Business Compliance Needs?</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">Staying compliant with USA laws and regulations can be complex, but Brendat makes it simple. Our business compliance services in USA help you focus on growth, not paperwork. Here’s why entrepreneurs trust us:</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseMetadata.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{r.title}</h3>
                    <p className="text-sm text-gray-600">{r.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* COMPLIANCE AUDIT */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
                <BadgeCheck className="w-16 h-16 text-accent mb-6" />
                <h3 className="text-2xl font-black text-gray-900 mb-4">Compliance Audits for Businesses in USA, USA</h3>
                <p className="text-gray-600 mb-6">
                  Not sure if your business is fully compliant? Brendat offers thorough compliance audits for businesses in USA, reviewing your filings, licenses, and regulatory obligations. Our USA business compliance services track deadlines, manage requirements, and provide tailored guidance, so you can focus on growing your company with confidence.
                </p>
                <div className="space-y-4 mb-8">
                  {auditItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="font-semibold text-gray-900 mb-6">
                  You’ll receive a detailed compliance report with action steps and solutions for gaps, ideal for businesses preparing for expansion, funding, or sale.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all">
                  Book a Compliance Audit in USA
                </Link>
              </div>
              <div>
                <span className="text-sm font-black uppercase tracking-widest text-accent mb-2 block">Business Compliance Audit</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why Compliance in Business Matters</h2>
                <p className="text-lg text-gray-600 mb-8">Business compliance isn’t optional; it’s essential for maintaining your company’s good standing with the state, ensuring legal protection, and avoiding fines or shutdowns. Here’s what happens when compliance is ignored:</p>
                <div className="space-y-6">
                  {complianceRisks.map((risk, idx) => {
                    const Icon = risk.icon;
                    return (
                      <div key={idx} className="flex gap-5">
                        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{risk.title}</h4>
                          <p className="text-sm text-gray-600">{risk.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <p className="text-gray-700 font-medium mb-4">Our USA-based team of business compliance lawyers helps you navigate the complex world of regulatory compliance in business so you can focus on growth, not government notices.</p>
                  <Link href="/contact" className="text-accent font-bold hover:underline inline-flex items-center gap-1">
                    Talk to Business Compliance Attorney <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORK WITH A LAWYER */}
        <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-accent mb-2 block">Business Compliance Pros</span>
                <h2 className="text-3xl md:text-4xl font-black mb-6">Work With a USA Business Compliance Lawyer in USA</h2>
                <p className="text-white/80 mb-8 text-lg">Whether you’re launching your business or operating across state lines, legal oversight helps you stay protected. Our Legal Plan gives you access to a vetted USA business compliance lawyer who can help with:</p>
                
                <div className="space-y-6">
                  {lawyerBenefits.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                        <Check className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-sm text-white/60">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 bg-white/5 rounded-2xl p-6 border border-white/10">
                  <p className="text-white font-bold mb-4">Ready to Stay Compliant Year-Round?</p>
                  <p className="text-white/60 text-sm mb-6">From solo startups to established companies, we offer the best compliance services for online and local businesses in USA, eliminating the guesswork and legal stress.</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all">
                    Talk to a Business Law Compliance Lawyer in USA
                  </Link>
                </div>
              </div>
              <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 hidden lg:block">
                 <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop" alt="Business Compliance Lawyer" fill className="object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                 <div className="absolute bottom-8 left-8 right-8">
                   <div className="bg-gray-900/80 backdrop-blur rounded-xl p-4 border border-white/10">
                     <p className="font-bold text-white">Business Compliance Lawyer</p>
                     <p className="text-xs text-white/60">Expert Guidance & Support</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* TAX COMPLIANCE & WHO NEEDS */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                <Landmark className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-black text-gray-900 mb-4">Business Tax Compliance & Licensing in USA</h3>
                <p className="text-gray-600 mb-6">We help you avoid issues before they become penalties. Our USA business compliance services include:</p>
                <ul className="space-y-3 mb-8">
                  {taxFeatures.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-xl transition-all">
                  Select My Package
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                <History className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-black text-gray-900 mb-4">Who Needs Business Compliance Support?</h3>
                <p className="text-gray-600 mb-6">Brendat’s business compliance services in USA are designed for any organization that wants to stay audit-ready and legally protected. Our solutions help:</p>
                <ul className="space-y-3 mb-8">
                  {whoNeeds.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                   <p className="text-sm text-gray-600 font-medium">Even if your business has never faced a compliance issue, proactive management ensures you avoid costly penalties and maintain your good standing.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/order/step2" className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl transition-all text-center">
                    Select My Plan
                  </Link>
                  <Link href="/contact" className="bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-6 py-3 rounded-xl transition-all text-center">
                    Talk to Business Compliance Attorney
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions About DBA Registration in USA</h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((f, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="flex items-start gap-3">
                    <HelpCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                    <span className="font-bold text-gray-900">{f.question}</span>
                  </h3>
                  {f.answer && <p className="text-gray-600 mt-3 pl-9">{f.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-accent text-white text-center">
           <div className="max-w-4xl mx-auto px-4">
             <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Get Proactive Compliance Solutions for Your USA Business?</h2>
             <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-accent font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-gray-100 transition-all text-lg">
               Get a Custom Compliance Plan
             </Link>
           </div>
        </section>

        {/* REVIEWS */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Our Reviews</h2>
              <p className="text-lg text-gray-600">What our customers are saying?</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((r, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 font-medium leading-relaxed">“{r.text}”</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                      {r.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{r.name}</p>
                      <p className="text-sm text-gray-500">{r.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERT SUPPORT */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-300 flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Questions?</h3>
                  <p className="text-sm text-gray-600 mt-1 mb-3">Get expert support for legal matters with our attorney by your side.</p>
                  <Link href="/contact" className="text-accent font-bold hover:underline">
                    Ask An Attorney
                  </Link>
                  <p className="text-sm text-gray-500 mt-2">Mon–Fri 5 am–7 pm PT</p>
                  <p className="text-sm text-gray-500">Sat–Sun 7 am–4 pm PT</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-300 flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Call An Agent At</h3>
                  <a href="tel:3032468693" className="text-2xl font-black text-accent hover:underline block mt-1">
                    (303) 246-8693
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Mon–Fri 5 am–7 pm PT</p>
                  <p className="text-sm text-gray-500">Sat–Sun 7 am–4 pm PT</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-5 py-2.5 rounded-xl mt-4 text-sm shadow-md transition-all"
                  >
                    Get legal help
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

// Helper for Star Icon since I forgot to import it from lucide but used it
function StarIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
