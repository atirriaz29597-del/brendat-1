"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
  FileText,
  Clock,
  Briefcase,
  User,
  Users,
  Building,
  Award,
  PenTool,
  Zap,
  Globe,
  Layout,
  FileCheck,
  Search
} from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

const STATE_FEES: { [key: string]: number } = {
  "Alabama": 236,
  "Alaska": 250,
  "Arizona": 85,
  "Arkansas": 45,
  "California": 75,
  "Colorado": 50,
  "Connecticut": 120,
  "Delaware": 140,
  "Florida": 125,
  "Georgia": 100,
  "Hawaii": 51,
  "Idaho": 100,
  "Illinois": 175,
  "Indiana": 95,
  "Iowa": 50,
  "Kansas": 165,
  "Kentucky": 40,
  "Louisiana": 105,
  "Maine": 175,
  "Maryland": 120,
  "Massachusetts": 500,
  "Michigan": 50,
  "Minnesota": 155,
  "Mississippi": 50,
  "Missouri": 50,
  "Montana": 35,
  "Nebraska": 105,
  "Nevada": 425,
  "New Hampshire": 100,
  "New Jersey": 125,
  "New Mexico": 50,
  "New York": 210,
  "North Carolina": 125,
  "North Dakota": 135,
  "Ohio": 99,
  "Oklahoma": 104,
  "Oregon": 100,
  "Pennsylvania": 125,
  "Rhode Island": 156,
  "South Carolina": 135,
  "South Dakota": 165,
  "Tennessee": 307,
  "Texas": 308,
  "Utah": 76,
  "Vermont": 125,
  "Virginia": 100,
  "Washington": 200,
  "West Virginia": 130,
  "Wisconsin": 130,
  "Wyoming": 100
};

const pricingPlans = [
  {
    name: "Standard",
    price: "99",
    features: [
      "Creation of Your LLC Operating Agreement",
      "Drafted to meet USA state requirements",
      "Ready for signature and filing"
    ],
    buttonText: "Start My Operating Agreement",
    href: "/order/step2",
    color: "gray"
  },
  {
    name: "Fastest service",
    price: "299",
    subtext: "Auto-renews. Cancel anytime.",
    features: [
      "LLC Operating Agreement (Custom or Template)",
      "Operating Agreement for a Single-Member LLC",
      "Real Estate or Multi-Member Agreements",
      "Legal Review & Custom Clauses",
      "Digital & Printable Copies",
      "Help Understanding Key Terms",
      "Add-on: Filing with Articles of Organization",
      "Optional: Notarization Support"
    ],
    buttonText: "Get Started Now",
    href: "/order/step2",
    color: "accent",
    badge: "Most Popular"
  }
];

const whyChooseBrendat = [
  { icon: FileText, title: "Transparent Pricing", description: "Get high-quality drafting or professional templates at a clear, upfront cost, no hidden fees or surprise invoices." },
  { icon: Scale, title: "USA Law Compliance", description: "Every agreement is built to meet current USA LLC laws, so you can be confident your document holds up if challenged." },
  { icon: Shield, title: "Real-World Focus", description: "We design agreements that are legally sound, easy to understand, implement, and enforce in day-to-day operations." },
  { icon: Clock, title: "Fast Turnaround Time", description: "Move forward with your business plans sooner thanks to our quicker delivery compared to traditional law firms." },
  { icon: Briefcase, title: "Tailored to Your Industry", description: "From restaurants to real estate, we offer customization that reflects the specific needs and risks of your sector." },
];

const whyNeedAgreement = [
  { icon: FileCheck, title: "Proof of Ownership in Legal Disputes", description: "An operating agreement acts as undeniable evidence of who owns what percentage of your LLC, which can be invaluable if ownership is ever questioned in court or during internal disputes." },
  { icon: User, title: "Control Over Your Own Rules", description: "Without an agreement, your LLC will be governed by USA’ default state laws, which may not fit your business model. A customized operating agreement for an LLC in USA ensures you set the rules that work best for your company." },
  { icon: Award, title: "Boost in Loan and Investor Confidence", description: "Banks, lenders, and potential investors often require a formal operating agreement before providing funding. Having one in place makes your business appear well-structured and investment-ready." },
  { icon: Building, title: "Enhanced Professional Image", description: "Presenting a detailed LLC operating agreement in USA to partners, vendors, or clients demonstrates that you take your business seriously and operate with clear processes in place." },
];

const agreementTypes = [
  { title: "Single-Member LLC Agreements", description: "A clear, well-structured agreement that establishes your sole ownership, outlines decision-making authority, and safeguards your limited liability status.", icon: User },
  { title: "2 or Multi-Member Real Estate LLCs", description: "Agreements designed to define each member’s rights, profit distribution, and dispute resolution, critical for smooth operations in property ventures.", icon: Users },
  { title: "Professional Services & Medical LLCs", description: "Tailored to meet regulatory standards while clarifying ownership, responsibilities, and compliance requirements for licensed professionals.", icon: User }, // Using User as placeholder for stethoscope
  { title: "Investor-Backed LLCs", description: "Strategically drafted agreements that protect founders while addressing investor rights, profit-sharing, and exit strategies.", icon: Briefcase },
  { title: "Owner-Operator Lease Agreements", description: "A clear framework for equipment use, responsibilities, and profit allocation between owners and operators in logistics or transportation businesses.", icon: FileText },
  { title: "Corporation Operating Agreements", description: "Used in specialized cases to define internal governance, clarify shareholder roles, and strengthen operational transparency.", icon: Building },
];

const reviews = [
  { name: "Samantha P.", role: "LLC Customer", text: "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!" },
  { name: "Carlos M.", role: "Trademark Customer", text: "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way." },
  { name: "Nell C.", role: "Last Will Customer", text: "We used Brendat for our estate planning documents, and I can’t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of." },
];

const faqs = [
  { question: "What is an LLC operating agreement?", answer: "It’s a legal document that outlines the internal operations of your LLC, including member roles, profit distribution, voting, and decision-making processes." },
  { question: "Is an operating agreement required in USA?", answer: "While not strictly required by law to form an LLC in USA, it is highly recommended to protect your liability shield and avoid default state rules." },
  { question: "What’s the difference between articles of organization and an operating agreement?", answer: "Articles of Organization are filed with the state to create your LLC. An Operating Agreement is an internal document that sets the rules for how your LLC runs." },
  { question: "Can I use a template for my operating agreement?", answer: "Yes, templates are a good starting point, especially for simple LLCs. However, customization is key to ensure it fits your specific business needs." },
  { question: "Do corporations use operating agreements?", answer: "Not typically. Corporations use bylaws. However, some may use internal agreements for specific management structures." },
  { question: "Does an operating agreement need to be notarized?", answer: "It is not legally required in USA, but notarization is recommended to verify signatures and prevent future disputes." },
];

// Comparison Data
const articlesVsAgreement = [
  {
    point: "Purpose",
    agreement: "Outlines the internal rules, ownership structure, and management procedures of your LLC.",
    articles: "Officially registers your LLC with the USA Secretary of State and establishes its legal existence."
  },
  {
    point: "Filing Requirement",
    agreement: "Not required to be filed with the state, but strongly recommended for operational clarity.",
    articles: "Must be filed with the Secretary of State to legally form your LLC."
  },
  {
    point: "Legal Standing",
    agreement: "Serves as an internal contract binding LLC members to agreed-upon terms.",
    articles: "Serves as the public legal document proving the LLC’s formation."
  },
  {
    point: "Content Focus",
    agreement: "Covers detailed provisions like profit distribution, voting rights, and member duties.",
    articles: "Includes basic business information such as name, address, registered agent, and purpose."
  },
  {
    point: "Public vs. Private",
    agreement: "Remains a private, internal document between members.",
    articles: "Becomes a public record accessible through the Secretary of State."
  },
  {
    point: "Flexibility",
    agreement: "Highly customizable to suit your LLC’s specific operational and financial needs.",
    articles: "Limited information is standardized by the state’s filing requirements."
  },
  {
    point: "Importance in Disputes",
    agreement: "Provides the agreed rules that can help resolve internal conflicts or misunderstandings.",
    articles: "Primarily proves that the LLC exists legally."
  }
];

const bylawsVsAgreement = [
  {
    point: "Purpose",
    bylaws: "Establishes the internal governance rules for a corporation.",
    agreement: "Defines ownership, management structure, and operating procedures for an LLC."
  },
  {
    point: "Entity Type",
    bylaws: "Used exclusively by corporations.",
    agreement: "Used exclusively by Limited Liability Companies (LLCs)."
  },
  {
    point: "Filing Requirement",
    bylaws: "Not filed with the state; kept internally by the corporation.",
    agreement: "Not filed with the state; kept internally by LLC members."
  },
  {
    point: "Content Focus",
    bylaws: "Outlines roles of directors, officers, shareholder meetings, and voting procedures.",
    agreement: "Outlines member duties, profit distribution, decision-making, and management guidelines."
  },
  {
    point: "Public vs. Private",
    bylaws: "Private internal document, though some provisions may be referenced in public filings.",
    agreement: "Private internal document not accessible to the public."
  },
  {
    point: "Flexibility",
    bylaws: "Governed more strictly by state corporate laws.",
    agreement: "Highly customizable to suit the LLC’s specific needs."
  },
  {
    point: "Importance in Disputes",
    bylaws: "Helps resolve disagreements among directors, officers, and shareholders.",
    agreement: "Provides a binding framework to resolve conflicts between LLC members."
  }
];

export default function OperatingAgreementPage() {
  const router = useRouter();
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const handleStartBusiness = () => {
    const params = new URLSearchParams();
    if (selectedEntity) params.set("entity", selectedEntity);
    if (selectedState) params.set("state", selectedState);
    router.push(`/order/step2?${params.toString()}`);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 overflow-hidden">
          <HeroAvatars />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,0,0.08),transparent_50%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">Create a Legally Sound Operating Agreement for Your USA Business</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Whether you need help customizing your LLC operating agreement in USA, or simply want to ensure it’s done correctly, Brendat has got your back. We help single-member and 2-member LLCs draft and file personalized operating agreement documents that meet USA state requirements and your company’s structure.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all text-lg">
                  Start My Operating Agreement
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg">
                  Talk to a Legal Advisor
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500 font-medium">Operating agreements start at $99.</p>
            </div>
          </div>
        </section>

        {/* ENTITY & STATE SELECTION */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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

        {/* WHY CHOOSE BRENDAT */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why Choose Brendat to Create Your LLC Operating Agreement in USA, USA?</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Forming an LLC in USA is more than just filling out paperwork; it’s about protecting your business, avoiding costly disputes, and making sure your agreement works in the real world. At Brendat, we combine legal precision with practical know-how to create operating agreements that are rock-solid, investor-friendly, and fully compliant with USA law.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseBrendat.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY YOU NEED IT */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
               <div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why You Need an LLC Operating Agreement in USA, USA</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Even though the Secretary of State doesn’t require an LLC operating agreement in USA, it offers key protections. Need to create an operating agreement in USA or revise an existing one? We offer templates, custom drafting services in USA, and legal review options specifically tailored to your business.
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-xl transition-all">
                    Get Legal Review Support
                  </Link>
               </div>
               <div className="grid gap-6">
                  {whyNeedAgreement.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="bg-gray-50 rounded-2xl p-6 flex gap-4 border border-gray-100">
                        <div className="shrink-0 pt-1">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
               </div>
             </div>
          </div>
        </section>

        {/* WHAT IS AN OA */}
        <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div className="order-2 lg:order-1">
                 <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    {/* Placeholder for image */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-white/5 mb-6">
                       <FileText className="w-20 h-20 text-white/20" />
                    </div>
                    <div className="flex gap-4 items-center">
                       <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                         <Check className="w-6 h-6 text-white" />
                       </div>
                       <div>
                         <p className="font-bold text-lg">Ready to make it official?</p>
                         <p className="text-white/60 text-sm">Our experts are standing by.</p>
                       </div>
                    </div>
                 </div>
               </div>
               <div className="order-1 lg:order-2">
                 <h2 className="text-3xl md:text-4xl font-black mb-6">What Is an LLC Operating Agreement?</h2>
                 <p className="text-white/80 mb-6 text-lg">
                   A USA LLC operating agreement is a legal document that outlines the ownership, responsibilities, and internal rules of a limited liability company in USA. It covers:
                 </p>
                 <ul className="space-y-4 mb-8">
                   {[
                     "Member roles and voting rights",
                     "Capital contributions and profit distribution",
                     "Rules for adding or removing members",
                     "Dispute resolution processes",
                     "What happens if a member exits or passes away"
                   ].map((item, i) => (
                     <li key={i} className="flex gap-3 items-center">
                       <div className="w-2 h-2 rounded-full bg-accent" />
                       <span className="font-medium">{item}</span>
                     </li>
                   ))}
                 </ul>
                 <p className="text-white/60 italic mb-8 border-l-4 border-accent pl-4">
                   "Even if USA doesn’t require one by law, it’s highly recommended. Without an agreement, your LLC may be governed by default state rules, which may not align with your business goals."
                 </p>
                 <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all">
                   Start My Operating Agreement
                 </Link>
               </div>
            </div>
          </div>
        </section>

        {/* COMMON TYPES */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-4">Common Types of Operating Agreements in USA</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agreementTypes.map((type, i) => {
                const Icon = type.icon;
                return (
                  <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{type.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CORPORATIONS & NOTARIZATION */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Left: Corporations */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                <Globe className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-black text-gray-900 mb-4">Do Corporations Have Operating Agreements?</h3>
                <p className="text-gray-600 mb-6">
                  Not typically. Corporations typically have bylaws, shareholder agreements, and board resolutions in place. However, some corporations choose to adopt internal corporate operating agreements in USA to clarify management roles or multi-owner structures.
                </p>
                <div className="bg-accent/5 p-4 rounded-xl border border-accent/10 mb-6">
                   <p className="text-sm font-medium text-gray-800">If you’re not sure which applies, we’ll help you choose the correct document based on your business entity and legal needs.</p>
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl transition-all">
                  Talk to a Legal Advisor
                </Link>
              </div>

              {/* Right: Notarization */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                <PenTool className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-black text-gray-900 mb-4">Does an LLC Operating Agreement Need to Be Notarized?</h3>
                <p className="text-gray-600 mb-4">
                  In USA, an LLC operating agreement is legally valid even if it is not notarized. The state does not require notarization for this document to take effect. That said, notarizing serves several benefits:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="text-sm text-gray-700 flex gap-2"><Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> <span><strong>Verifies Signatures:</strong> essential in legal disputes.</span></li>
                  <li className="text-sm text-gray-700 flex gap-2"><Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> <span><strong>Prevents Conflicts:</strong> Avoids misunderstandings.</span></li>
                  <li className="text-sm text-gray-700 flex gap-2"><Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> <span><strong>Legal Protection:</strong> Strengthens enforceability.</span></li>
                </ul>
                <p className="text-sm text-gray-500 italic mb-6">While optional, many business owners in USA choose this extra step for security.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-6 py-3 rounded-xl transition-all">
                  Get Legal Review Support
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* COMPARISON TABLES */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Table 1: OA vs Articles */}
            <div className="mb-24">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-gray-900 mb-4">Understanding the Difference Between Articles of Organization & LLC Operating Agreement</h2>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 text-gray-900 uppercase tracking-wider text-xs font-bold">
                    <tr>
                      <th className="px-6 py-4 w-1/4">Point of Comparison</th>
                      <th className="px-6 py-4 w-1/3 bg-accent/5">LLC Operating Agreement</th>
                      <th className="px-6 py-4 w-1/3">Articles of Organization</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white text-sm text-gray-700">
                    {articlesVsAgreement.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-bold text-gray-900">{row.point}</td>
                        <td className="px-6 py-4 bg-accent/5 font-medium text-gray-900">{row.agreement}</td>
                        <td className="px-6 py-4">{row.articles}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 text-center">
                 <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-accent-dark transition-all">
                   Draft My Operating Agreement
                 </Link>
              </div>
            </div>

            {/* Table 2: Bylaws vs OA */}
            <div>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-gray-900 mb-4">Understanding the Difference Between Bylaws & LLC Operating Agreement</h2>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 text-gray-900 uppercase tracking-wider text-xs font-bold">
                    <tr>
                      <th className="px-6 py-4 w-1/4">Point of Comparison</th>
                      <th className="px-6 py-4 w-1/3">Bylaws (Corporations)</th>
                      <th className="px-6 py-4 w-1/3 bg-accent/5">Operating Agreement (LLCs)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white text-sm text-gray-700">
                    {bylawsVsAgreement.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-bold text-gray-900">{row.point}</td>
                        <td className="px-6 py-4">{row.bylaws}</td>
                        <td className="px-6 py-4 bg-accent/5 font-medium text-gray-900">{row.agreement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 text-center">
                 <p className="text-gray-600 mb-4 font-medium">Bylaws or Operating Agreement? We’ll Guide You, Draft It & Protect Your Business Future.</p>
                 <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 hover:border-accent hover:text-accent font-bold px-8 py-3 rounded-xl transition-all">
                   Get Legal Review Support Now
                 </Link>
              </div>
            </div>

          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2 flex gap-3">
                    <HelpCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 pl-8">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">From Filing to Fine Print, Brendat Will Make Your USA LLC Rock Solid</h3>
              <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-accent-dark transition-all">
                 Draft My Operating Agreement
              </Link>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
                <p className="uppercase text-accent font-black tracking-widest text-sm mb-2">Our Reviews</p>
                <h2 className="text-3xl font-black text-gray-900">What our customers are saying?</h2>
             </div>
             <div className="grid md:grid-cols-3 gap-8">
               {reviews.map((review, i) => (
                 <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center flex flex-col items-center">
                    <div className="mb-4 text-accent flex gap-1 justify-center">
                      {[1,2,3,4,5].map(star => <StarIcon key={star} className="w-5 h-5 fill-current" />)}
                    </div>
                    <p className="text-gray-600 italic mb-6">"{review.text}"</p>
                    <div className="mt-auto">
                      <p className="font-bold text-gray-900">{review.name}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{review.role}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* CONTACT CTA */}
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
  );
}
