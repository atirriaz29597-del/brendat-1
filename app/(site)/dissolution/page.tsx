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
  Search,
  Mail,
  Bell,
  Activity,
  MapPin,
  Lock,
  RefreshCw,
  Star,
  Trash2,
  XCircle
} from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

// ─────────────────────────────────────────────────────────────────────────────
// Content & Data
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
    name: "Standard Dissolution",
    price: "129",
    description: "With Brendat’s Standard Business Dissolution in USA, we simplify the process by preparing and filing all the required paperwork on your behalf.",
    features: [
      "Preparation of dissolution documents",
      "Submit your dissolution paperwork to the USA Secretary of State"
    ],
    buttonText: "Start My Dissolution",
    href: "/order/step2",
    color: "gray"
  },
  {
    name: "Express Dissolution",
    price: "239",
    description: "Ensures your business is closed quickly and without unnecessary delays. You’ll get expedited processing to help achieve legal closure faster.",
    features: [
      "Fast-tracked dissolution paperwork, reducing wait times and giving you peace of mind",
      "Delivery of official dissolution documents within 2–3 business days of approval"
    ],
    buttonText: "Start My Dissolution",
    includesLabel: "Everything from Standard, plus:",
    href: "/order/step2",
    color: "accent",
  },
  {
    name: "Dissolution Concierge",
    price: "799",
    description: "This premium service ensures every step is managed seamlessly, so you can focus on moving forward while we handle the details.",
    features: [
      "Experience peace of mind with white-glove, start-to-finish dissolution management handled by a dedicated Brendat concierge.",
      "A trained professional dedicated to managing your dissolution process, ensuring nothing slips through the cracks.",
      "Direct phone and email access to your concierge with prompt, priority responses to all your questions and concerns.",
      "Full evaluation of your Secretary of State status to identify any prerequisites, missing filings, or potential issues before final closure.",
      "Access to full-service compliance support, including handling Annual Reports, Beneficial Ownership Information Reports (BOI), and any other outstanding obligations required for legal closure."
    ],
    buttonText: "Get Dissolution Support",
    includesLabel: "Everything in Rush, plus:",
    href: "/contact",
    color: "gray",
    badge: "Full service"
  }
];

const whyBrendat = [
  { icon: Scale, title: "Attorney-Led Guidance", description: "Your dissolution is handled and reviewed by experienced USA business dissolution attorneys." },
  { icon: Zap, title: "Speed & Compliance", description: "We ensure your paperwork is filed quickly and in full compliance with state laws." },
  { icon: Users, title: "Peace of Mind for All Parties", description: "Clear communication and professional handling to support partners, investors, and stakeholders." },
  { icon: Globe, title: "Trusted by USA Businesses", description: "From startups to partnerships, businesses across USA and USA count on us to dissolve the right way." },
  { icon: Lock, title: "Confidential & Secure", description: "Your business and personal information are always protected with the highest privacy standards." },
  { icon: FileCheck, title: "Transparent & Affordable", description: "Straightforward pricing with no hidden costs or surprise fees." },
];

const whenToDissolve = [
  { icon: XCircle, title: "Permanent Closure of Operations", description: "When you’ve decided to stop business activities entirely and no longer plan to reopen." },
  { icon: TrendingDown, title: "Financial Unsustainability", description: "If the business is no longer profitable or lacks the resources to continue operating." },
  { icon: Users, title: "Partnership Changes", description: "In cases of partner disputes, retirement, or a buyout, dissolution may be necessary to legally end the business relationship." },
  { icon: Briefcase, title: "Mergers or Acquisitions", description: "If your company is joining with another or being purchased, dissolution of the original entity may be required." },
  { icon: AlertOctagon, title: "Avoiding Future Costs", description: "To prevent ongoing taxes, fees, or penalties on an inactive or abandoned business entity." },
];

const typesOfClosures = [
  { title: "LLC Dissolution (Single- or Multi-Member)", description: "From drafting dissolution agreements to filing with the USA Secretary of State, we handle every step to legally and cleanly close your LLC.", icon: FileText },
  { title: "Corporation Dissolution", description: "Whether you run a C-Corp or S-Corp, our USA dissolution attorneys guide you through shareholder approvals, compliance filings, and final tax obligations.", icon: Building },
  { title: "Partnership Dissolution", description: "We help resolve disputes, retirement exits, and buyouts by drafting legally binding agreements that protect each partner’s rights and obligations.", icon: Users },
  { title: "Sole Proprietorship Termination", description: "Even small businesses need proper closure to avoid future tax liabilities and fees. Our team ensures your business is legally terminated.", icon: User },
  { title: "Business Partner Buyouts", description: "Our lawyers help negotiate, draft, and file the right agreements to ensure buyouts are handled fairly and with full compliance.", icon: Scale },
  { title: "Owner Retirement or Exit Planning", description: "If you’re stepping away from your business, we provide legal and strategic guidance to ensure your exit is smooth and liability-free.", icon: Clock },
  { title: "Dissolution Due to Lawsuit or Dispute", description: "In cases of litigation, deadlock, or court-ordered dissolution, our USA attorneys protect your legal rights while managing the closure.", icon: Shield },
  { title: "Business Company Evaluation and Valuation", description: "Before dissolving, we help you assess your company’s financial standing and explore exit alternatives to maximize your return.", icon: Activity },
];

const faqs = [
  { question: "What is a business dissolution?", answer: "It’s the legal process of formally ending a business entity’s existence. It involves filing the proper forms with the USA Secretary of State and wrapping up business affairs." },
  { question: "What are the business dissolution documents in USA?", answer: "The primary document is the Articles of Dissolution (or Certificate of Termination). You may also need tax clearance certificates and a formal dissolution agreement between owners." },
  { question: "Do I need a business dissolution lawyer?", answer: "While simpler dissolutions can be filed directly, a lawyer ensures that debts are properly handled, assets are distributed correctly, and you are protected from future liability." },
  { question: "What happens in a business partnership dissolution?", answer: "Partners must agree on how to split assets and debts. A dissolution agreement is critical here to prevent disputes and clarify terms." },
  { question: "Can I dissolve a business without the other partner?", answer: "It depends on your operating agreement. Usually, a vote is required. If deadlocked, you may need legal intervention or court-ordered dissolution." },
  { question: "What’s the difference between voluntary and involuntary dissolution?", answer: "Voluntary is when owners choose to close. Involuntary is forced by the state (due to unpaid taxes) or a court order (due to lawsuits or deadlock)." },
];

const reviews = [
  { name: "Samantha P.", role: "LLC Customer", text: "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!" },
  { name: "Carlos M.", role: "Trademark Customer", text: "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way." },
  { name: "Nell C.", role: "Last Will Customer", text: "We used Brendat for our estate planning documents, and I can’t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of." },
];

export default function DissolutionPage() {
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">End Your Business the Right Way with Professional Dissolution Services in USA</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Whether you’re closing a chapter or dissolving a partnership, Brendat will help you make a clean legal exit with expert business dissolution services in USA, USA. We assist LLCs, corporations, and partnerships through every step of the USA business dissolution process.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all text-lg">
                  Start My Business Dissolution
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg">
                  Talk to a Dissolution Attorney
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* {/* ENTITY & STATE SELECTION */}
        <section className="py-24 bg-white relative overflow-hidden" id="start-order">
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
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why Choose Brendat to Dissolve Your Business in USA?</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Looking for the best business dissolution lawyer in USA or reliable services near you? Our local, trusted team understands the complexities of closing a business and provides the expertise, care, and efficiency you need to move forward with confidence.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyBrendat.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHEN TO DISSOLVE */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">When Should You Dissolve a Business in USA?</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Deciding to dissolve a business is never easy, but there are times when closing your company the right way is the best step forward. Whether you’re shutting down due to financial challenges, internal changes, or strategic growth through a merger, filing for business dissolution in USA allows you to close the chapter with clarity and compliance, ensuring you’re protected from ongoing legal, financial, and tax obligations.
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-xl transition-all">
                    Start My Dissolution
                  </Link>
               </div>
               <div className="space-y-6">
                 {whenToDissolve.map((item, i) => {
                   const Icon = item.icon;
                   return (
                     <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex gap-4">
                       <div className="shrink-0 mt-1">
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

        {/* WHAT IS DISSOLUTION & AGREEMENT */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Left */}
              <div>
                <h2 className="text-3xl font-black mb-6">What Is Business Dissolution?</h2>
                <p className="text-white/80 mb-6 text-lg">
                  Business dissolution is the formal process of ending a business entity’s legal existence. Whether you’re closing voluntarily or due to internal disputes, dissolving your business correctly is essential to:
                </p>
                <ul className="space-y-3 mb-8">
                  {["Prevent future tax or legal liabilities", "Terminate ongoing business obligations", "Distribute remaining assets fairly", "Protect your personal liability"].map((item, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-white/60 text-sm">We handle all aspects of business dissolution in USA, from evaluating your company’s situation to preparing and filing your business dissolution documents.</p>
              </div>

              {/* Right */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <FileText className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-black mb-4">Do I Need a Business Dissolution Agreement in USA?</h3>
                <p className="text-white/80 mb-6">
                  Yes, especially in the case of partnerships, corporations, or multi-member LLCs. A business dissolution agreement in USA outlines:
                </p>
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-accent mt-0.5" /> Which members or partners agree to dissolve the business</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-accent mt-0.5" /> How will the remaining assets and liabilities be distributed</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-accent mt-0.5" /> Who is responsible for filing the final documents</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-accent mt-0.5" /> What happens to contracts, clients, and intellectual property</li>
                </ul>
                <div className="bg-accent/10 p-4 rounded-xl border border-accent/20 mb-6">
                   <p className="text-sm font-medium text-white">If you’re managing a business partnership dissolution, this document is crucial for preventing disputes and protecting each party’s rights.</p>
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-3 rounded-xl transition-all">
                  Talk to a Dissolution Attorney
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* TYPES OF CLOSURES */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-accent font-black uppercase tracking-widest text-sm mb-2 block">Business License Attorney</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">We Help With All Types of Business Closures in USA</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Closing a business is a big decision, and it requires more than just paperwork; it takes careful planning, legal compliance, and the right guidance. At Brendat, our team, led by the best business dissolution lawyers in USA, helps business owners navigate every step of the process with clarity and confidence.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {typesOfClosures.map((type, i) => {
                const Icon = type.icon;
                return (
                  <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all group h-full">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-12 text-center">
               <p className="text-gray-600 mb-4 font-medium">We’ll also guide you in comparing the right business dissolution options so you can make the best decision before committing to closure.</p>
               <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all">
                 Get Help with My Business Exit
               </Link>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2 flex gap-3 text-left">
                    <HelpCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 pl-8 text-left">{faq.answer}</p>
                </div>
              ))}
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

        {/* CONTACT CTA FOOTER */}
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

function TrendingDown({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  )
}

function AlertOctagon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}
