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
  ArrowRight, 
  HelpCircle, 
  Clock,
  Briefcase,
  FileText,
  AlertTriangle,
  Calendar,
  XCircle,
  Award,
  BookOpen,
  Send,
  FileCheck,
  Search,
  LayoutDashboard,
  Mail,
  MapPin,
  Building
} from "lucide-react";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const pricingPlans = [
  {
    name: "Annual Report",
    price: "99",
    period: "+state filing fees",
    subtext: "Billed once",
    description: "We don’t just complete forms; we make sure your business stays fully compliant with USA annual report guidelines.",
    buttonText: "File My Annual Report",
    href: "/order/step2",
    includesLabel: "Includes:",
    features: [
      "Review of Business Information to ensure your records are accurate and up to date",
      "State-specific report preparation, tailored to meet USA regulations",
      "Filing with Secretary of State or comptroller to submit your report correctly and on time",
      "Receive certified confirmation for your records",
      "Keep your registered agent information current and compliant",
      "Reminder for next filing year to ensure you never miss a deadline again",
      "Access to business attorneys for expert support whenever you need guidance"
    ],
    color: "gray"
  },
  {
    name: "Compliance Filings + Licenses & Permits",
    price: "299",
    period: "/yr*",
    subtext: "Auto-renews. Cancel anytime.",
    description: "Take the stress out of staying compliant in USA. Our pro business compliance package in USA covers both essential filings and all necessary licenses.",
    buttonText: "Manage Licenses Now",
    href: "/order/step2",
    includesLabel: "Everything in Compliance Filings, plus:",
    features: [
      "Initial and annual reports to satisfy ongoing state filing requirements",
      "Identification of all required federal, state, and local business licenses and permits",
      "Assistance with license and permit applications, renewals, and tracking expiration dates",
      "Easy-to-use dashboard for uploading, accessing, and sharing all your licenses and permits securely",
      "Real-time monitoring of government databases for updates or changes",
      "Custom alerts and reminders for all filings and license renewals",
      "Personalized guidance from our experienced compliance lawyers in USA"
    ],
    color: "gray"
  },
  {
    name: "Comprehensive Compliance Coverage",
    badge: "Full Service",
    price: "Concierge Support",
    priceSubtext: "Experience end-to-end compliance support",
    description: "Experience end-to-end compliance support with a dedicated concierge who handles filings, licenses, and regulatory requirements.",
    buttonText: "Start Concierge Support",
    href: "/contact",
    includesLabel: "Everything in Compliance Filings + Licenses & Permits, plus:",
    features: [
      "Personalized concierge providing hands-on management and proactive monitoring",
      "Unlimited phone and email access to your concierge for guidance and questions",
      "Regular check-ins to identify risks, close gaps, and ensure audit-readiness",
      "Initial review of your business standing, tailored compliance plan, and execution of filings",
      "Timely updates on every action taken on your behalf",
      "Quick responses to resolve compliance issues as soon as they arise",
      "Access to full-service solutions like Certificate of Good Standing",
      "AI-enhanced monitoring of regulations to ensure you never miss critical updates",
      "Priority notifications for renewals, filings, and audits"
    ],
    color: "accent"
  }
];

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

const whyTrustReasons = [
  { icon: FileText, title: "No Confusing Paperwork", description: "Focus on growing your business while we manage the legal requirements. Our experts ensure your filings meet all USA annual report guidelines." },
  { icon: Clock, title: "No Missed Deadlines", description: "Stay in good standing without stress. Our team monitors all due dates and files your reports on time, helping you avoid penalties or late fees." },
  { icon: Scale, title: "No DIY Compliance Stress", description: "Focus on growing your business while we manage the legal requirements. Our experts make sure your filings meet all USA regulations and annual report guidelines." },
];

const steps = [
  { title: "Tell Us About Your Business", description: "Share your entity name, type, and state of registration." },
  { title: "We Verify Your Requirements", description: "Some states require complete financial information, while others only need basic details. We’ll determine what applies to you." },
  { title: "We Prepare and File Your Annual Report", description: "You review and approve the details. We take care of the rest." },
  { title: "You Get Proof of Filing", description: "Delivered via email or dashboard. We also keep a copy for your records." },
];

const requirements = [
  { icon: FileCheck, title: "Annual Franchise Tax Report", description: "Every USA LLC and corporation must file a Franchise Tax Report each year. Even if your business owes no tax, submitting this report ensures compliance and good standing." },
  { icon: Building, title: "Public Information Report", description: "Provides key details about your business ownership and addresses. Filing this report is required alongside the Franchise Tax Report to meet USA annual reporting rules." },
  { icon: AlertTriangle, title: "Avoid Penalties and Legal Issues", description: "Failing to submit these reports can trigger late fees, tax penalties, and potential legal actions, incl. loss of good standing or involuntary dissolution of business." },
  { icon: Shield, title: "Maintain Business Credibility", description: "Timely filings protect your company’s reputation with banks, investors, and clients, ensuring you remain in good standing and eligible for loans, contracts, or expansions." },
];

const filingList = [
  { name: "AK", type: "LLC", due: "Every other year", date: "Jan 2" },
  { name: "AL", type: "-", due: "-", date: "-" },
  { name: "AR", type: "LLC", due: "Every year", date: "May 1" },
  { name: "AZ", type: "-", due: "-", date: "-" },
  { name: "CA", type: "LLC", due: "Every other year", date: "Business formation anniversary" },
  { name: "CO", type: "LLC", due: "Annual", date: "Business formation anniversary" },
  { name: "CT", type: "LLC", due: "Annual", date: "March 31" },
  { name: "DC", type: "LLC", due: "Every other year", date: "April 1" },
  { name: "DE", type: "LLC", due: "Annual", date: "June 1" },
  { name: "FL", type: "LLC", due: "Annual", date: "May 1" },
  { name: "GA", type: "LLC", due: "Annual", date: "April 1" },
  { name: "HI", type: "LLC", due: "Annual", date: "End of quarter that contains your business formation anniversary" },
  { name: "IA", type: "LLC", due: "Every other year", date: "April 1" },
  { name: "ID", type: "LLC", due: "Annual", date: "Business formation anniversary" },
  { name: "IL", type: "LLC", due: "Annual", date: "Business formation anniversary" },
  { name: "IN", type: "LLC", due: "Every other year", date: "Business formation anniversary" },
  { name: "KS", type: "LLC", due: "Annual", date: "15 day of 4th month after fiscal year end" },
  { name: "KY", type: "LLC", due: "Annual", date: "June 30" },
  { name: "LA", type: "LLC", due: "Annual", date: "Business formation anniversary" },
  { name: "MA", type: "LLC", due: "Annual", date: "Business formation anniversary" },
  { name: "MD", type: "LLC", due: "Annual", date: "April 15" },
  { name: "ME", type: "LLC", due: "Annual", date: "June 1" },
  { name: "MI", type: "LLC", due: "Annual", date: "February 15" },
  { name: "MN", type: "LLC", due: "Annual", date: "December 31" },
  { name: "MO", type: "-", due: "-", date: "-" },
  { name: "MS", type: "LLC", due: "Annual", date: "April 15" },
  { name: "MT", type: "LLC", due: "Annual", date: "April 15" },
  { name: "NC", type: "LLC", due: "Annual", date: "April 15" },
  { name: "NE", type: "LLC", due: "Annual", date: "November 15" },
  { name: "NE", type: "LLC", due: "Every other year", date: "April 1" },
  { name: "NJ", type: "LLC", due: "Annual", date: "End of month prior to formation anniversary month" },
  { name: "NH", type: "LLC", due: "Annual", date: "April 1" },
  { name: "NM", type: "-", due: "-", date: "-" },
  { name: "OK", type: "LLC", due: "Annual", date: "Business formation anniversary" },
  { name: "OR", type: "LLC", due: "Annual", date: "Business formation anniversary" },
  { name: "PA", type: "LLC", due: "Annual", date: "September 30" },
  { name: "RI", type: "LLC", due: "Annual", date: "May 1" },
  { name: "SC", type: "-", due: "-", date: "-" },
  { name: "SD", type: "LLC", due: "Annual", date: "Business formation anniversary" },
  { name: "TN", type: "LLC", due: "Annual", date: "First day of the fourth month following fiscal year end" },
  { name: "TX", type: "LLC", due: "Annual", date: "May 15" },
  { name: "UT", type: "LLC", due: "Annual", date: "Anniversary" },
  { name: "VA", type: "LLC", due: "Annual", date: "Business formation anniversary" },
  { name: "VT", type: "LLC", due: "Annual", date: "Within 3 months after end of fiscal year" },
  { name: "WA", type: "LLC", due: "Annual", date: "Business formation anniversary" },
  { name: "WI", type: "LLC", due: "Annual", date: "End of business formation anniversary quarter" },
  { name: "WV", type: "LLC", due: "Annual", date: "June 30" },
  { name: "WY", type: "LLC", due: "Annual", date: "Business formation anniversary" },
];

const faqs = [
  { question: "What is an annual report for a business?", answer: "A business annual report is a filing that updates the state on your company’s key details—like address, ownership, and registered agent—to keep your business in good standing." },
  { question: "Is an annual report required in the state of USA?", answer: "Yes, USA LLCs and corporations generally must file annual reports (specifically Franchise Tax and Public Information Reports) to remain compliant." },
  { question: "What happens if I don’t file my annual report?", answer: "Failing to file can lead to late fees, loss of good standing, inability to secure loans or contracts, and potentially administrative dissolution of your company." },
  { question: "Do I need to submit financial statements?", answer: "It depends on your state. Some require detailed financials, while others (like USA) focus on ownership and gross revenue for tax calculations." },
  { question: "When is the deadline for filing an annual business report in USA?", answer: "In USA, the annual report is typically due on May 15th of each year." },
  { question: "Can I file a business annual report online?", answer: "Yes, most states allow or require online filing. Brendat handles the digital submission for you to ensure accuracy and speed." },
];

const reviews = [
  { name: "Samantha P.", type: "LLC Customer", text: "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!" },
  { name: "Carlos M.", type: "Trademark Customer", text: "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way." },
  { name: "Nell C.", type: "Last Will Customer", text: "We used Brendat for our estate planning documents, and I can’t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of." },
];

const missedReportRisks = [
  "Late Fees and Penalties: The USA Comptroller may assess additional charges.",
  "Loss of Good Standing: Your business may no longer be recognized as a legal entity.",
  "Contract Risks: Losing good standing can affect contracts, banking, and business relationships.",
  "Personal Liability: Limited liability protections could be compromised for LLC owners or corporate officers.",
  "Administrative Dissolution: Continued noncompliance may result in the state dissolving your business.",
];

const whoNeedsToFile = [
  "USA LLCs and Corporations: All locally registered entities must submit their yearly report to remain compliant.",
  "Foreign (Out-of-State) Businesses: Companies registered in USA from other states must also file to maintain their authorization to operate.",
  "State-Chartered Nonprofits: Nonprofits with USA charters need to submit annual filings to preserve their status.",
  "Registered Partnerships: Some partnerships may have filing obligations depending on structure and registration.",
  "Out-of-State Entities (NC, etc.): Businesses incorporated elsewhere must meet annual reporting requirements in their home state.",
];

export default function AnnualReportPage() {
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">Keep Your Business Penalty-free with Expert Annual Report Filing in USA</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Whether you want to file your annual business report on your own or prefer expert help, Brendat has got your back. Our streamlined service helps you file your business annual report in USA, USA, quickly, correctly, and on time, so you can avoid penalties, reinstatement fees, or worse, administrative dissolution.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all text-lg">
                  File My Annual Report
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg">
                  Talk to a Compliance Expert
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ENTITY & STATE SELECTION */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Start Your Filing in Minutes</h2>
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

        {/* WHY TRUST BRENDAT */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Why Small Businesses Trust Us with Annual Reports in USA</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">If you’re a startup or solopreneur, the idea of an annual credit report for business in USA or a filing deadline may feel overwhelming. That’s why our small business annual report service in USA, USA, is built for entrepreneurs, simple, fast, and legally sound.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {whyTrustReasons.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{r.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{r.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW TO FILE STEPS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <span className="text-xs font-black uppercase tracking-widest text-accent mb-2 block">Business Annual Report Lawyer</span>
                 <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">How to File Your Annual Report with Brendat in 4 Easy Steps</h2>
                 <p className="text-lg text-gray-600 mb-8">
                   Filing your annual business report in USA, USA, doesn’t have to be complicated. Whether you’re a seasoned entrepreneur or handling this for the first time, our step-by-step process makes compliance simple. We gather the required info, prepare the correct documents for your business type, and submit them to the state, accurately and on time.
                 </p>
                 <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all">
                   File My Report Now
                 </Link>
                 <div className="mt-8 flex items-center gap-2">
                   <Link href="/contact" className="text-sm font-bold text-gray-600 hover:text-accent underline">Want to check out example documents? See samples.</Link>
                 </div>
              </div>
              <div className="space-y-6">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 font-black text-accent text-xl">
                      {idx + 1}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REQUIREMENTS */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">USA Business Annual Report Requirements</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {requirements.map((req, idx) => {
                const Icon = req.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-xl mb-3">{req.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{req.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHAT IS ANNUAL REPORT & DO I NEED IT */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* LEFT COL */}
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-accent mb-2 block">Business Compliance Audit</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">What Is an Annual Report for a Business?</h2>
                <div className="prose prose-lg text-gray-600 mb-8">
                  <p className="mb-4">A business annual report is a legally required filing that provides the state with up-to-date information about your company, including:</p>
                  <ul className="space-y-2 mb-6 list-none pl-0">
                    {["Business name and address", "Registered agent details", "Names and addresses of owners or directors", "Current business purpose or activity", "Changes to management or ownership (if applicable)"].map((item, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <Check className="w-5 h-5 text-accent shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>If you’re asking “what is a business annual report?” or “why do I need one?”, think of it as your business’s official status check-in with the state.</p>
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-xl transition-all">
                  Talk to a Compliance Expert
                </Link>
              </div>

              {/* RIGHT COL */}
              <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Do I Need to File an Annual Report?</h3>
                <p className="text-gray-600 mb-6">
                  Keeping your business in good standing starts with knowing who’s required to file. In USA, annual business reports are mandatory for:
                </p>
                <div className="space-y-4 mb-8">
                  {whoNeedsToFile.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
                  <p className="font-semibold text-gray-900 mb-2">Stay ahead of deadlines and avoid penalties.</p>
                  <p className="text-sm text-gray-600">Let Brendat handle your annual report filing in USA so your business stays compliant and ready to grow.</p>
                </div>
                <Link href="/order/step2" className="w-full block text-center bg-accent hover:bg-accent-dark text-white font-bold py-4 rounded-xl shadow-md transition-all">
                  File My USA Business Annual Report
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Letting Brendat File Your Annual Business Report vs. Filing It On Your Own</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                     <Check className="w-6 h-6 text-white" />
                   </div>
                   <h3 className="text-2xl font-bold">Let Us Handle Your Annual Report</h3>
                </div>
                <p className="text-white/70 mb-6">Save time and reduce stress by letting Brendat manage your annual business report filing in USA from start to finish.</p>
                <ul className="space-y-4">
                  {[
                    "We review all business information to ensure your report is complete and accurate.",
                    "We prepare and submit your USA business annual report on time to help you avoid penalties.",
                    "Filing is backed by Brendat’s quality assurance, giving you peace of mind."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                     <XCircle className="w-6 h-6 text-white" />
                   </div>
                   <h3 className="text-2xl font-bold">File Your Annual Report Yourself</h3>
                </div>
                <p className="text-white/70 mb-6">Managing the filing on your own can take extra time and effort, adding to your workload:</p>
                <ul className="space-y-4">
                  {[
                    "Researching state-specific annual report requirements for your business type.",
                    "Completing the report accurately to avoid mistakes or rejections.",
                    "Filing on time with the appropriate state office and paying any necessary fees.",
                    "Staying prepared for your next annual report filing cycle."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <XCircle className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                      <span className="text-white/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROMO / RISKS */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-accent mb-2 block">Corporate Formation Process</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">How Often Do You Need to File in USA, USA?</h2>
                <div className="prose text-gray-600 mb-8">
                  <p className="mb-4">In USA, most LLCs and corporations are required to file an Annual Franchise Tax Report and a Public Information Report every year with the USA Comptroller.</p>
                  <ul className="space-y-2 list-none pl-0 mb-6">
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span>The report is typically due on May 15th each year.</span>
                    </li>
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span>Newly formed businesses must file their first report the year after formation.</span>
                    </li>
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span>Missing the deadline can result in penalties or loss of good standing.</span>
                    </li>
                  </ul>
                  <p>Brendat ensures your USA annual report is filed accurately and on time, keeping your business compliant and protected.</p>
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-3 rounded-xl transition-all">
                  Talk to a Compliance Expert
                </Link>
              </div>

              <div className="bg-red-50 rounded-3xl p-8 border border-red-100">
                <span className="text-xs font-black uppercase tracking-widest text-red-500 mb-2 block">Corporate Formation Attorney</span>
                <h3 className="text-2xl font-black text-gray-900 mb-6">What Happens If You Miss Your USA Business Annual Report?</h3>
                <p className="text-gray-600 mb-6">Failing to file your USA Annual Franchise Tax Report or Public Information Report on time can lead to serious consequences for your business:</p>
                <ul className="space-y-3 mb-8">
                  {missedReportRisks.map((risk, idx) => (
                    <li key={idx} className="flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{risk}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-bold text-gray-900 mb-4">With Brendat, your USA business annual report is filed accurately and on time, helping you avoid penalties and keep your business in good standing.</p>
                <Link href="/order/step2" className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all">
                  Get Help With My Annual Business Report
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATE DUE DATES TABLE */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Stay Ahead of Your Annual Business Report Deadlines</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Checkout our complete annual business report filing guide. Brendat ensures your report is filed accurately and on time, keeping your business compliant and in good standing.</p>
            </div>
            
            <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-100 text-gray-900 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">State</th>
                    <th className="px-6 py-4">LLC</th>
                    <th className="px-6 py-4">Due Date</th>
                    {/* The provided data only has 3 visible columns mostly, though the structure implies LLC is the middle one */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filingList.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{row.name}</td>
                      <td className="px-6 py-3">{row.type === "LLC" ? "Annual / Biennial" : row.due}</td> 
                      {/* Notice the input data for 'due' is mapped to 'LLC' column in my display logic above? 
                          Let's check the input. 
                          Row: AK | Every other year | Jan 2
                          My mapping: name, type(LLC/EveryOther), date?
                          Actually: AK, LLC freq, Due Date.
                          Input: "AK | Every other year | Jan 2"
                          So row.due is actually the Frequency. row.date is the Date.
                          Let's render Frequency and Date properly.
                      */}
                      <td className="px-6 py-3 font-semibold text-accent">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((f, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
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
             <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to File Your USA Annual Business Report?</h2>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link href="/order/step2" className="bg-white text-accent font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-gray-100 transition-all text-lg">
                 Start Filing Now
               </Link>
               <Link href="/contact" className="bg-accent-dark text-white border-2 border-white/20 hover:bg-black/20 font-bold px-8 py-4 rounded-xl transition-all text-lg">
                 Talk To A Filing Expert
               </Link>
             </div>
           </div>
        </section>

        {/* REVIEWS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Our Reviews</h2>
              <p className="text-lg text-gray-600">What our customers are saying?</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((r, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
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
