"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Check, 
  Phone, 
  MessageCircle, 
  Shield, 
  Scale, 
  ChevronRight, 
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
  ChevronDown,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

// ─────────────────────────────────────────────────────────────────────────────
// Content & Data
// ─────────────────────────────────────────────────────────────────────────────

const whyBrendatReasons = [
  { 
    icon: FileText, 
    title: "Instant Digital Access to Documents", 
    description: "Never wait days to see critical paperwork. We scan and upload every official document to your secure online account the same day it’s received, so you can act without delay." 
  },
  { 
    icon: Bell, 
    title: "Real-Time Legal Mail Notifications", 
    description: "Get notified the moment new legal or government correspondence arrives. With immediate alerts via email and dashboard updates, you’ll always be ahead of deadlines." 
  },
  { 
    icon: Activity, 
    title: "Proactive Compliance Monitoring", 
    description: "We track important filing dates and compliance requirements for your LLC, corporation, or nonprofit, sending timely reminders so you never risk penalties or dissolution." 
  },
  { 
    icon: Briefcase, 
    title: "Versatile Business Expertise", 
    description: "From startups to established corporations and nonprofits, our registered agents understand the unique compliance needs of every entity type in USA." 
  },
  { 
    icon: MapPin, 
    title: "Local USA Advantage", 
    description: "We’re not a faceless national service. Our office is right here in USA, giving you easy access to in-person support and a registered agent who truly knows USA business law." 
  }
];

const registeredAgentIncludes = [
  "USA Registered Agent Address in USA",
  "Document Scanning & Forwarding Access From Anywhere",
  "Legal Notice Handling",
  "Compliance Reminders",
  "24/7 Access to Documents",
  "Change of Agent Filing (If Needed)",
  "Privacy Protection",
  "Support from Our USA-Based Team",
  "Online Copyright Registration"
];

const whyNeedAgent = [
  { icon: Scale, title: "Required by USA Law", description: "Without a registered agent in USA, you cannot legally form or operate, LLC, corporation, or nonprofit." },
  { icon: FileCheck, title: "Keeps Good Standing", description: "Timely handling of official notices ensures you remain compliant with state regulations." },
  { icon: Bell, title: "Never Miss Important Notices", description: "We receive and forward documents so you’re always aware of deadlines and requirements." },
  { icon: Lock, title: "Protects Your Privacy", description: "Especially beneficial for home-based businesses, as it keeps your personal address off public records." },
  { icon: Globe, title: "Facilitates Multi-State Operations", description: "Allows your business to expand or operate in other states without compliance issues." },
  { icon: RefreshCw, title: "Supports Seamless Relocation", description: "Move your business within or outside USA without interrupting compliance." }
];

const changeAgentSteps = [
  { title: "Complete the Official Change Form", description: "Start the process by sharing your legal business name." },
  { title: "Pay the Required State Fee", description: "Answer a few questions." },
  { title: "Obtain Signed Consent from New Agent", description: "We'll let your state know that we’re your new registered agent. And if you’re switching registered agents, we’ll cover those costs." },
  { title: "Submit and Wait for State Approval", description: "We handle the submission and monitor for approval confirmation." }
];

const reviews = [
  { name: "Samantha P.", role: "LLC Customer", text: "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!" },
  { name: "Carlos M.", role: "Trademark Customer", text: "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way." },
  { name: "Nell C.", role: "Last Will Customer", text: "We used Brendat for our estate planning documents, and I can’t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of." },
];

const faqs = [
  { question: "What is a registered agent in USA?", answer: "A Texan registered agent is a person or business entity that receives official state mail and legal documents on behalf of your business." },
  { question: "How do I change the registered agent in USA, USA?", answer: "You file a Change of Registered Agent form with the Secretary of State. Brendat can handle the entire process for you to ensure it's done correctly." },
  { question: "Is a registered agent required for an LLC in USA?", answer: "Yes, USA law requires every LLC to designate and maintain a registered agent with a physical street address in the state." },
  { question: "What’s the difference between a registered agent and an owner?", answer: "An owner holds equity in the business. A registered agent is strictly a point of contact for legal and government mail. They can be different people or entities." },
  { question: "Where can I do a USA registered agent lookup in USA?", answer: "You can search the USA Secretary of State’s taxable entity search or business database to see who is listed as the agent for any company." },
  { question: "Is your registered agent service suitable for corporations as well?", answer: "Absolutely. We provide registered agent services for C Corporations, S Corporations, Nonprofits, and LLCs alike." },
  { question: "What kind of mail could I receive and how does it work?", answer: "You’ll receive service of process (lawsuits), tax notices from the Comptroller, and compliance reminders. We scan these immediately to your dashboard." },
  { question: "Can I talk to an attorney if I receive court documents?", answer: "Yes. With Brendat, we can connect you to legal professionals to help you understand what a served lawsuit means for your business." },
  { question: "What's the difference between a resident agent, agent for service of process, and registered agent?", answer: "These terms are often used interchangeably. They all refer to the designated person or entity responsible for receiving legal documents for a business." },
  { question: "What is a registered agent for an LLC?", answer: "Specifically for an LLC, the registered agent acts as the state’s way of communicating with your company to ensure due process and compliance." },
  { question: "What if my registered agent isn’t always there during business hours?", answer: "By law, a registered agent must be available during normal business hours. If you act as your own agent and aren't there, you risk missing critical legal notices." },
  { question: "What happens if I have more than one business or have a business in more than one state needing a registered agent?", answer: "You need a registered agent in each state where you operate. Brendat can serve as your agent across multiple entities and states." },
  { question: "Do limited liability partnerships need a registered agent?", answer: "Yes, LLPs are also required to maintain a registered agent in USA." },
  { question: "Why should I choose an established registered agent service?", answer: "Established services like Brendat ensure reliability, privacy, and compliance expertise that an individual or fly-by-night service cannot match." }
];

const STATE_FEES: { [key: string]: number } = {
  "Alabama": 236, "Alaska": 250, "Arizona": 85, "Arkansas": 45, "California": 75, "Colorado": 50,
  "Connecticut": 120, "Delaware": 140, "Florida": 125, "Georgia": 100, "Hawaii": 51, "Idaho": 100,
  "Illinois": 175, "Indiana": 95, "Iowa": 50, "Kansas": 165, "Kentucky": 40, "Louisiana": 105,
  "Maine": 175, "Maryland": 120, "Massachusetts": 500, "Michigan": 50, "Minnesota": 155,
  "Mississippi": 50, "Missouri": 50, "Montana": 35, "Nebraska": 105, "Nevada": 425,
  "New Hampshire": 100, "New Jersey": 125, "New Mexico": 50, "New York": 210, "North Carolina": 125,
  "North Dakota": 135, "Ohio": 99, "Oklahoma": 104, "Oregon": 100, "Pennsylvania": 125,
  "Rhode Island": 156, "South Carolina": 135, "South Dakota": 165, "Tennessee": 307, "Texas": 308,
  "Utah": 76, "Vermont": 125, "Virginia": 100, "Washington": 200, "West Virginia": 130,
  "Wisconsin": 130, "Wyoming": 100
};

export default function RegisteredAgentPage() {
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">Reliable USA Registered Agent Services for Your LLC or Corporation in USA</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Whether you’re starting an LLC or corporation, our USA registered agent services ensure your business never misses an important deadline or legal notice. We provide professional, secure, and affordable registered agent service for USA-based and out-of-state businesses doing business in USA.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all text-lg">
                  Get a Registered Agent
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg">
                  Change My Registered Agent
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* WHY BRENDAT */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why is Brendat the Best Registered Agent Service in USA?</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                When it comes to registered agent services in USA, choosing the right partner can make all the difference in your business’s compliance, peace of mind, and efficiency. At Brendat, we don’t just accept legal documents; we safeguard your company’s good standing, keep you informed in real time, and provide the local expertise you deserve. Here’s why USA businesses trust us above the rest:
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyBrendatReasons.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
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

        {/* ENTITY & STATE SELECTION */}
        <section className="py-24 bg-white relative overflow-hidden" id="start-order">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Start Your Business <span className="text-accent">Today</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select your entity type and state to see pricing and get started
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Entity Type Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Entity Type</label>
                  <div className="relative">
                    <select
                      value={selectedEntity}
                      onChange={(e) => setSelectedEntity(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 pr-12 text-gray-900 font-medium focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all cursor-pointer"
                    >
                      <option value="">Select entity type...</option>
                      <option value="llc">Limited Liability Company (LLC)</option>
                      <option value="corporation">Corporation (C-Corp)</option>
                      <option value="s-corp">S-Corporation</option>
                      <option value="nonprofit">Nonprofit Organization</option>
                      <option value="sole-proprietorship">Sole Proprietorship</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* State Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2">State of Formation</label>
                  <div className="relative">
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 pr-12 text-gray-900 font-medium focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all cursor-pointer"
                    >
                      <option value="">Select state...</option>
                      {Object.keys(STATE_FEES).map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* State Fee Display */}
              {selectedState && (
                <div className="mb-8 p-6 bg-gradient-to-r from-accent/5 to-accent/10 rounded-2xl border border-accent/20">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">State Filing Fee for {selectedState}</p>
                      <p className="text-3xl font-black text-gray-900">${STATE_FEES[selectedState]}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Service Fee</p>
                      <p className="text-3xl font-black text-accent">$0</p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <button
                onClick={handleStartBusiness}
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-accent/25 flex items-center justify-center gap-3 text-lg"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-900">Secure Process</p>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-900">Fast Filing</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-900">Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IS RA & OWN AGENT */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Left Column */}
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-6">What Is a Registered Agent in USA?</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  A registered agent in USA, USA, is a person or company designated to receive legal documents, service of process, tax notices, and compliance mail on behalf of your business. It’s required by USA law for:
                </p>
                <ul className="space-y-3 mb-8">
                  {["LLCs", "Corporations", "Nonprofits", "Foreign (out-of-state) entities registered in USA"].map((item, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="font-medium text-gray-800">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
                   <p className="text-gray-700 font-medium mb-4">Whether you’re conducting a USA registered agent lookup or simply want to update your current contact information, our team ensures your business remains in compliance.</p>
                   <Link href="/contact" className="inline-flex items-center gap-2 text-accent font-bold hover:underline">
                      Get a Registered Agent <ChevronRight className="w-4 h-4" />
                   </Link>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-6">Can I Be My Own Registered Agent in USA, USA?</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Yes, you can, but it comes with risks. To serve as your own Texan registered agent, you must:
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <span className="text-gray-700">Be a USA resident or have a physical street address in USA</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <span className="text-gray-700">Be available at that address during all business hours</span>
                  </li>
                  <li className="flex gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <span className="text-gray-700">Be willing to receive legal notices (lawsuits, subpoenas) in person</span>
                  </li>
                </ul>
                <div className="bg-accent/5 p-6 rounded-2xl border border-accent/10">
                   <p className="text-gray-800 mb-4 font-medium">If privacy, availability, or professionalism matter, it’s better to appoint a third-party LLC registered agent service in USA, USA. At Brendat, we help keep your business and personal life separate.</p>
                   <Link href="/contact" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl transition-all">
                      Learn Why Businesses Choose Professionals
                   </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* WHY YOU NEED ONE */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-6">Why You Need a Registered Agent for Your USA LLC or Corporation</h2>
              <p className="text-white/80 max-w-4xl mx-auto text-lg">
                When forming or maintaining an LLC or corporation in USA, USA, appointing a registered agent is a legal requirement. Your registered agent acts as the official point of contact between your business and the state, ensuring that critical legal and tax documents are received promptly and handled correctly. Whether you run a local startup, a growing corporation, or a nonprofit organization, having a reliable USA registered agent service in USA protects your compliance, privacy, and operational flexibility.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyNeedAgent.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW TO CHANGE */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-accent font-black uppercase tracking-widest text-sm mb-2 block">Business License Attorney</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">How to Change Your Registered Agent in USA with Brendat</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Already working with a registered agent but considering a switch? Whether you’re moving to a more reliable provider or simply relocating your business, changing your registered agent in USA is easier than you might think, especially when you have the right guidance. At Brendat, we streamline the entire process so you can focus on running your business, not paperwork.
                </p>
                
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Let Brendat Handle the Entire Process for You</h3>
                  <p className="text-gray-600 mb-6">
                    Don’t want to deal with forms, fees, and follow-ups? We’ll take care of the entire USA registered agent change process in USA, from completing the paperwork to securing the necessary approvals. Whether you’re switching from an individual agent or another service provider, we’ll ensure your transition is fast, smooth, and fully compliant.
                  </p>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all">
                    Change My Registered Agent Now
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                {changeAgentSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 font-black text-gray-400 group-hover:bg-accent group-hover:text-white transition-colors text-xl">
                      {idx + 1}
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex-1 group-hover:border-accent/30 transition-all">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* READY TO APPOINT CTA */}
        <section className="py-20 bg-accent text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black mb-8">Ready to Appoint a USA Registered Agent You Can Rely On?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-accent font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-gray-100 transition-all text-lg min-w-[200px] justify-center">
                Hire a Registered Agent in USA
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-accent-dark border-2 border-white/20 hover:bg-white/10 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-all text-lg min-w-[200px] justify-center">
                Talk to a USA Registered Agent Expert
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
