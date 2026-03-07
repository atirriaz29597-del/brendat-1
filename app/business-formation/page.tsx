"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Phone, MessageCircle, Shield, DollarSign, FileText, Building2, Users, Scale, ChevronRight, ChevronDown, ArrowRight, Star, Clock, HelpCircle, Briefcase } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

/* ── State Fees Data ──────────────────────────────────────── */
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

/* ── Entity Types Data ────────────────────────────────────── */
const entityTypes = [
  {
    icon: Building2,
    title: "Limited Liability Company (LLC)",
    price: "Starts at $0 + state filing fees",
    description: "Great for small businesses and partnerships looking for liability protection, flexible tax options, and simple compliance.",
    cta: "Start My LLC",
    href: "/limited-liability-company-llc",
  },
  {
    icon: Briefcase,
    title: "Corporation (S corp or C corp)",
    price: "Starts at $0 + state filing fees",
    description: "Ideal for businesses planning to raise capital or scale nationally. Includes more formal structures and potential tax advantages. Discuss more with experts.",
    cta: "Start My Corporation",
    href: "/corporation-c-corp-s-corp",
  },
  {
    icon: Shield,
    title: "Nonprofit (501c3)",
    price: "Starts at $0 + state filing fees",
    description: "Perfect for mission-driven organizations. Includes IRS recognition and exemption support. Feel free to discuss more with our agents.",
    cta: "Start My Nonprofit",
    href: "/nonprofit",
  },
  {
    icon: Users,
    title: "Sole Proprietorship",
    price: "Starts at $0 + state filing fees",
    description: "A basic structure for individuals starting small. Fast to set up, but offers limited protection. Get more details from our agents.",
    cta: "Start My DBA",
    href: "/sole-proprietorship",
  },
];

/* ── LLC Comparison Data ──────────────────────────────────── */
const llcDetails = {
  whyItStandsOut: [
    "Flexible management structure. No board of directors required",
    "Unlimited owners (\u201Cmembers\u201D) allowed",
    "Works for small startups to larger growing companies",
  ],
  protections: [
    "Members are not personally liable for business debts or lawsuits",
    "Option to choose how you\u2019re taxed, pass-through or corporate",
  ],
  keepInMind: [
    "Requires ongoing state filings and compliance fees",
    "Not recognized globally. May be taxed as a corporation in some countries",
  ],
};

/* ── Documents Data ───────────────────────────────────────── */
const documents = [
  {
    title: "Articles of Organization or Incorporation",
    description: "Filed with the Secretary of State (or equivalent authority), this document officially creates your LLC or corporation and outlines basic details such as business name, address, purpose, and registered agent.",
  },
  {
    title: "Operating Agreement or Bylaws",
    description: "An LLC Operating Agreement or corporate Bylaws sets out ownership rights, management responsibilities, voting procedures, and profit distribution rules. While not always required by law, they are essential for preventing disputes.",
  },
  {
    title: "Employer Identification Number (EIN)",
    description: "Issued by the IRS, an EIN is required for tax purposes, hiring employees, and opening a business bank account.",
  },
  {
    title: "Business Licenses and Permits",
    description: "Depending on your industry and location, you may need state, federal, or local business licenses (such as sales tax permits, health permits, or professional licenses).",
  },
  {
    title: "Registered Agent Consent Form",
    description: "Most states require you to designate a registered agent with a physical address in the state to receive legal documents on behalf of your business.",
  },
  {
    title: "Partnership or Shareholder Agreements",
    description: "If forming a partnership or corporation with multiple owners, these agreements outline each party\u2019s rights, obligations, and procedures for resolving disputes or transferring ownership.",
  },
  {
    title: "Trade Name Registration (DBA)",
    description: "If you plan to operate under a name different from your legal entity name, you\u2019ll need to file a \u201CDoing Business As\u201D DBA registration with the appropriate state or county authority.",
  },
  {
    title: "Initial & Annual Reports",
    description: "Some states require initial reports shortly after formation and annual reports to keep business information current with the state.",
  },
];

/* ── Steps Data ───────────────────────────────────────────── */
const steps = [
  {
    number: "01",
    title: "Choose Your Business Type",
    description: "Select the right structure: LLC, Corporation, or Nonprofit.",
  },
  {
    number: "02",
    title: "Tell Us About Your Business",
    description: "We\u2019ll gather the necessary details to file your paperwork correctly.",
  },
  {
    number: "03",
    title: "We File With the State",
    description: "We handle your business registration, name search, and compliance documents.",
  },
  {
    number: "04",
    title: "Receive Your Documents",
    description: "Get your formation certificate, EIN, and legal paperwork, ready to do business in the US.",
  },
];

/* ── FAQ Data ─────────────────────────────────────────────── */
const faqs = [
  {
    question: "What\u2019s the difference between an LLC and a corporation?",
    answer: "Both protect owners so they\u2019re not personally on the hook for business liabilities or debts. But, key differences include how they\u2019re owned (LLCs have one or more individual owners and corporations have shareholders) and maintained (corporations generally have more formal record-keeping and reporting requirements). Even though LLCs are considered easier to start and maintain, investors tend to prefer corporations.",
  },
  {
    question: "What\u2019s the difference between a C corporation and an S corporation?",
    answer: "C corporations are taxed at the corporate level and shareholders pay taxes on dividends, resulting in double taxation. S corporations allow pass-through taxation where profits go directly to shareholders\u2019 personal tax returns. S corporations have restrictions on the number and type of shareholders.",
  },
  {
    question: "What\u2019s the main difference between a sole proprietorship and an LLC?",
    answer: "A sole proprietorship offers no liability protection\u2014your personal assets are at risk. An LLC separates your personal and business assets, providing liability protection while still being relatively simple to manage.",
  },
  {
    question: "How are different business types taxed?",
    answer: "LLCs typically use pass-through taxation. C corporations face double taxation. S corporations enjoy pass-through taxation with some restrictions. Sole proprietorships report business income on personal tax returns.",
  },
  {
    question: "Which business types give me personal liability protection?",
    answer: "LLCs, C corporations, and S corporations all provide personal liability protection, separating your personal assets from business debts and lawsuits. Sole proprietorships do not offer this protection.",
  },
  {
    question: "How do I choose the right business structure?",
    answer: "Consider factors like liability protection needs, tax preferences, number of owners, growth plans, and administrative requirements. Our business formation attorneys can help you evaluate each option based on your specific situation.",
  },
];

/* ── Reviews Data ─────────────────────────────────────────── */
const reviews = [
  {
    name: "Samantha P.",
    type: "LLC Customer",
    text: "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!",
  },
  {
    name: "Carlos M.",
    type: "Trademark Customer",
    text: "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way.",
  },
  {
    name: "Nell C.",
    type: "Last Will Customer",
    text: "We used Brendat for our estate planning documents, and I can\u2019t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of.",
  },
];

export default function BusinessFormationPage() {
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
      {/* ── Hero Section ───────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 overflow-hidden">
        <HeroAvatars />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,0,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
              Reliable Business Formation Services in USA Powered By Trusted Attorneys
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Whether you&apos;re looking to register an LLC, a corporation, or a nonprofit, get your business off the ground with reliable, attorney-backed business formation service in USA for every step of your journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all text-lg"
              >
                <Briefcase className="w-5 h-5" />
                Register My Business
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Talk to an Agent
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Phone className="w-5 h-5 text-accent" />
              <span>Have Questions? Call</span>
              <a href="tel:3032468693" className="font-bold text-accent hover:underline">(303) 246-8693</a>
              <span>to Speak with a Business Formation Lawyer.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Choose Right Structure Section ──────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Choose the Right Business Formation Structure in USA
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {entityTypes.map((entity) => {
              const Icon = entity.icon;
              return (
                <div key={entity.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:border-accent/20 transition-all flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{entity.title}</h3>
                  <p className="text-xs font-semibold text-accent mb-2">{entity.price}</p>
                  <p className="text-sm text-gray-600 mb-4 flex-1">{entity.description}</p>
                  <Link
                    href={entity.href}
                    className="block w-full text-center bg-accent hover:bg-accent-dark text-white font-bold py-3 rounded-xl transition-all text-sm"
                  >
                    {entity.cta}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── All Business Types at a Glance (Comparison) ────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              All Business Types at a Glance
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Limited Liability Company (LLC)
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Why it stands out */}
            <div className="bg-gradient-to-b from-accent/5 to-accent/10 rounded-2xl p-6 border-2 border-accent">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Why It Stands Out</h3>
              </div>
              <div className="space-y-4">
                {llcDetails.whyItStandsOut.map((item) => (
                  <div key={item} className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" />
                      {item}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Protections & tax benefits */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Protections &amp; Tax Benefits</h3>
              </div>
              <div className="space-y-4">
                {llcDetails.protections.map((item) => (
                  <div key={item} className="bg-white rounded-xl p-4">
                    <p className="text-sm text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Things to keep in mind */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Things to Keep in Mind</h3>
              </div>
              <div className="space-y-4">
                {llcDetails.keepInMind.map((item) => (
                  <div key={item} className="bg-white rounded-xl p-4">
                    <p className="text-sm text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12 bg-accent/5 rounded-2xl p-8 border border-accent/20">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Register Your LLC in the USA?</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-accent/20 transition-all"
              >
                Talk to Business Formation Lawyer
              </Link>
              <Link
                href="/limited-liability-company-llc"
                className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-6 py-3 rounded-xl transition-all"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-6 py-3 rounded-xl transition-all"
              >
                Start My LLC
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 100% Accurate Filing Guarantee ─────────────────────── */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">100% Accurate Filing Guarantee</h3>
                <p className="text-white/80">We&apos;re committed to the highest quality and accuracy. If your filing is rejected or contains errors because of us, we&apos;ll fix it with the state of USA at no additional cost, no questions asked.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Documents Required Section ─────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Documents Required for Business Formation in the U.S.
              </h2>
              <h3 className="text-xl font-bold text-accent mb-4">What You&apos;ll Need to Get Started</h3>
              <p className="text-gray-600 mb-6">
                Starting a business in the United States requires preparing and filing certain legal documents, depending on the type of entity you choose: LLC, corporation, partnership, or sole proprietorship. While requirements vary by state, the following are the most common documents you&apos;ll need:
              </p>
              <ul className="space-y-3 mb-8">
                {documents.slice(0, 4).map((doc) => (
                  <li key={doc.title} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-800 font-semibold">{doc.title}</span>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-3xl p-8 border border-accent/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Formation Documents</h4>
                  <p className="text-sm text-gray-500">Business Registration Services</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">Additional Documents</h4>
                <ul className="space-y-3">
                  {documents.slice(4).map((doc) => (
                    <li key={doc.title} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-700 font-semibold">{doc.title}</span>
                        <p className="text-xs text-gray-500">{doc.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Start Your Business Section ──────────────────────── */}
      <section className="py-20 bg-gray-50" id="start-order">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Start Your Business Today
            </h2>
            <p className="text-gray-600 text-base max-w-lg leading-relaxed">
              Choose your entity type and state to begin the formation process.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 md:p-10 max-w-4xl">
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
        </div>
      </section>

      {/* ── 4 Easy Steps Section ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              How It Works?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Want legal support along the way? Choose our Legal package to speak directly with a business formation attorney. Our business formation services in the USA have made things simple:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                  <div className="w-14 h-14 rounded-xl bg-accent text-white flex items-center justify-center font-black text-xl mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Speak With a Lawyer Section ────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">
            Speak With a Business Formation Lawyer in the US
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-600 mb-6">
                Business formation in the USA involves more than just paperwork. If you&apos;re unsure about which structure is best for you, how ownership should be divided, or how to avoid future liability issues, our business formation lawyers can provide clarity and confidence.
              </p>
              <p className="text-gray-700 font-semibold mb-4">Our Local business formation attorneys in the USA are here to:</p>
              <ul className="space-y-3 mb-6">
                {[
                  "Explain the pros and cons of each business type",
                  "Draft or review your operating agreement",
                  "Assist with compliance and ongoing legal obligations",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 mb-4">
                Speaking with a professional lawyer and consultant from Brendat before starting your business registration in the USA is crucial for laying a strong legal and strategic foundation. Many new business owners rush into registration without fully understanding the implications of their business structure, licensing requirements, or intellectual property protections. Our legal and consulting experts help you make informed decisions from day one—ensuring your business is registered under the right entity (LLC, corporation, etc.), complies with state and federal regulations, and is protected against potential legal issues down the road. We provide tailored advice based on your industry, goals, and budget, helping you avoid costly mistakes and delays.
              </p>
              <p className="text-gray-600">
                With Brendat, you&apos;re not just filling out forms—you&apos;re building a compliant, future-ready business with expert support. Starting with professional guidance ensures you&apos;re set up for success, with clarity and confidence every step of the way.
              </p>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop"
                  alt="Business Formation Lawyer Consultation"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <Scale className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Schedule A Consultation</p>
                        <p className="text-sm text-gray-500">with Business Formation Lawyer Nearby</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-accent/20 transition-all"
            >
              Talk to Business Formation Lawyer
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Frequently Asked Questions About Business Formation in the USA
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <span className="font-bold text-gray-900">{faq.question}</span>
                </h3>
                <p className="text-gray-600 mt-3 pl-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews Section ────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Our Reviews
            </h2>
            <p className="text-lg text-gray-600">What our customers are saying?</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-bold">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact/CTA Section ────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-300 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Questions? Ask An Attorney</h3>
                <p className="text-sm text-gray-600 mt-1 mb-3">Get expert support for legal matters with our attorney by your side.</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Mon–Fri 5 am–7 pm PT &nbsp;·&nbsp; Sat–Sun 7 am–4 pm PT</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-300 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Call An Agent</h3>
                <a href="tel:3032468693" className="text-2xl font-black text-accent hover:underline block mt-1">(303) 246-8693</a>
                <p className="text-sm text-gray-500 mt-1">Mon–Fri 5 am–7 pm PT &nbsp;·&nbsp; Sat–Sun 7 am–4 pm PT</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-5 py-2.5 rounded-xl mt-4 text-sm shadow-md shadow-accent/20 transition-all"
                >
                  Get legal help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Form Section ───────────────────────────────── */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-black uppercase tracking-widest text-accent mb-4">Get Started Today</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-6">
                Launch your Business in USA
              </h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                Dreaming to start a business in USA? At Brendat, we believe every entrepreneur deserves expert assistance and legal backup. Our vetted network of USA-based attorneys is here to guide you.
              </p>
              <ul className="space-y-5">
                {[
                  { icon: FileText, text: "50 State Filing Compliance" },
                  { icon: Shield,   text: "Registered Agent Service Included" },
                  { icon: Check,    text: "Fast Transparent Service" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-semibold text-lg">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-300 p-8 md:p-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push("/thank-you");
                }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                    <input type="text" placeholder="John" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <input type="tel" placeholder="(555) 000-0000" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                  <textarea rows={4} placeholder="Tell us about your business idea..." className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition resize-none" />
                </div>
                <button type="submit" className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3.5 rounded-xl shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/30 transition-all text-sm">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
