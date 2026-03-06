"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Search,
  CheckCircle,
  AlertTriangle,
  Scale,
  Users,
  Briefcase,
  TrendingDown,
  Gavel,
  Bell,
  Globe,
  PieChart,
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Phone,
  Star as StarIcon,
  ArrowRight,
  Clock,
} from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

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

export default function TrademarkMonitoringPage() {
  const router = useRouter();
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  const handleStartBusiness = () => {
    const params = new URLSearchParams();
    if (selectedEntity) params.set("entity", selectedEntity);
    if (selectedState) params.set("state", selectedState);
    router.push(`/order/step2?${params.toString()}`);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const monitoringFeatures = [
    "We scan new federal trademark filings for direct or similar matches to your registered mark",
    "Tracking of marks registered within the State of USA",
    "Visual similarity detection for logos and symbols",
    "We catch cleverly disguised or sound-alike attempts to mimic your brand",
    "Regular summaries of potential conflicts in your inbox",
    "A trademark attorney is available to review suspicious filings or advise on cease & desist letters",
  ];

  const whyChoose = [
    {
      title: "Attorney Insight",
      description: "When a potential infringement pops up, our attorneys review the findings and provide guidance on whether action is necessary so that you don’t waste time on false alarms.",
      icon: <Scale className="w-6 h-6 text-accent" />,
    },
    {
      title: "Comprehensive Coverage",
      description: "We scan newly filed federal, state, and common law databases, as well as online sources, to catch potential conflicts early.",
      icon: <Globe className="w-6 h-6 text-accent" />,
    },
    {
      title: "Affordable & efficient",
      description: "Our trademark monitoring plans are designed to be affordable while delivering the level of vigilance your business needs.",
      icon: <PieChart className="w-6 h-6 text-accent" />,
    },
    {
      title: "Custom Alerts",
      description: "Instead of overwhelming you with raw data, we deliver clear, prioritized alerts that highlight the most relevant threats to your brand.",
      icon: <Bell className="w-6 h-6 text-accent" />,
    },
  ];

  const attorneySupport = [
    {
      title: "Vetted IP Attorneys",
      description: "Work with rigorously screened intellectual property lawyers who know the ins and outs of trademark law.",
      icon: <Users className="w-6 h-6 text-accent" />,
    },
    {
      title: "Focused Trademark Expertise",
      description: "Our attorneys average 8+ years of hands-on experience handling trademark protection, disputes, and enforcement.",
      icon: <Briefcase className="w-6 h-6 text-accent" />,
    },
    {
      title: "Trusted by Thousands",
      description: "Businesses across the U.S. rely on our legal team to help them spot threats early and take the right action.",
      icon: <CheckCircle className="w-6 h-6 text-accent" />,
    },
  ];

  const whyMatters = [
    {
      id: "01",
      title: "Customer Confusion",
      description: "When another business uses a similar name or logo, your customers may mistake them for you, leading to lost trust and missed sales.",
      icon: <Users className="w-8 h-8 text-accent" />,
    },
    {
      id: "02",
      title: "Eroded Brand Recognition",
      description: "Years of investment in building a recognizable brand can be diluted if others enter the market with similar marks.",
      icon: <TrendingDown className="w-8 h-8 text-accent" />,
    },
    {
      id: "03",
      title: "Weakened Legal Rights",
      description: "Failing to monitor and enforce your trademark can make it harder to defend your rights later, leaving your protection vulnerable.",
      icon: <Shield className="w-8 h-8 text-accent" />,
    },
    {
      id: "04",
      title: "Damaged Market Position",
      description: "Competitors using lookalike branding can chip away at your market share, slowing growth and reducing your competitive edge.",
      icon: <PieChart className="w-8 h-8 text-accent" />,
    },
    {
      id: "05",
      title: "Costly Legal Battles",
      description: "What starts as a small oversight can escalate into expensive litigation, forcing you to spend time and resources in court instead of growing your business.",
      icon: <Gavel className="w-8 h-8 text-accent" />,
    },
  ];

  const faqs = [
    {
      question: "Is trademark monitoring required after registration?",
      answer: "The USPTO does not require it, but it’s highly recommended. If you don’t monitor and enforce your trademark, your rights could weaken over time.",
    },
    {
      question: "How soon will I be alerted to a potential match?",
      answer: "We send alerts regularly as new filings are published. Typically, you will be notified quickly so you can take action before the opposition window closes.",
    },
    {
      question: "Can I take legal action if someone files a similar trademark?",
      answer: "Yes. If a conflicting mark is filed, you can file an opposition with the USPTO or send a cease-and-desist letter. Our attorneys can guide you through this process.",
    },
    {
      question: "What types of trademarks can be monitored?",
      answer: "We can monitor word marks, logos, slogans, and other registered trademarks to ensure comprehensive protection.",
    },
    {
      question: "How does Brendat use the Trademark Search System?",
      answer: "We utilize advanced software that integrates with the USPTO's database to scan for exact matches, phonetic similarities, and visual likenesses automatically.",
    },
    {
      question: "What if someone uses my trademark?",
      answer: "If infringement is detected, we will notify you immediately. You can then consult with our attorneys to determine the best enforcement strategy.",
    },
    {
      question: "How do you know if you are violating a trademark?",
      answer: "A comprehensive trademark search and ongoing monitoring are the best ways to ensure you aren't infringing on existing marks and that others aren't infringing on yours.",
    },
  ];

    const reviews = [
    {
      name: "Samantha P.",
      role: "LLC Customer",
      text: "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!",
    },
    {
      name: "Carlos M.",
      role: "Trademark Customer",
      text: "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way.",
    },
    {
      name: "Nell C.",
      role: "Last Will Customer",
      text: "We used Brendat for our estate planning documents, and I can’t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 overflow-hidden">
        <HeroAvatars />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,0,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
           <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                 <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                   Protect Your Brand with Trademark Monitoring Service in USA
                 </h1>
                 <p className="text-xl text-gray-600 mb-8">
                   Once your trademark is registered, the real work begins. Every day, new trademarks are filed that may infringe on your brand or dilute your reputation. Brendat’s trademark monitoring service in USA gives you the peace of mind that someone is watching your back, so you can focus on running your business, not policing imitators.
                 </p>
                 <Link href="/order/step2" className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                   Protect My Trademark
                 </Link>
              </div>
              
              <div>
                 <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -mr-8 -mt-8" />
                    <h3 className="text-2xl font-black text-gray-900 mb-4">What's Included</h3>
                    <div className="space-y-4">
                       <ul className="space-y-3">
                         {monitoringFeatures.map((feature, i) => (
                            <li key={i} className="flex gap-3 text-sm text-gray-600">
                               <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                               {feature}
                            </li>
                         ))}
                       </ul>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ENTITY & STATE SELECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
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

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why Choose Brendat for Trademark Monitoring in USA?</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Trademark registration is only the first step; ongoing monitoring is what keeps your brand secure. At Brendat, we go beyond basic alerts to provide you with a reliable, attorney-backed monitoring solution that helps you stay ahead of copycats. Here’s why entrepreneurs and growing businesses trust us:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChoose.map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all text-center flex flex-col items-center">
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attorney Support Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-black mb-4">USA-Based Attorney Support to Safeguard Your Brand</h2>
             <p className="text-lg text-gray-300 max-w-3xl mx-auto">
               Need expert guidance on a potential infringement? For an additional fee, Brendat gives you access to experienced trademark attorneys who can review your monitoring report and provide tailored recommendations on the best next steps to protect your brand from competitors.
             </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              {attorneySupport.map((item, index) => (
                 <div key={index} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:bg-gray-700 transition">
                    <div className="text-accent mb-4">{item.icon}</div>
                    <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Why It Matters (Negative Consequences) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-6">Why Trademark Monitoring in USA Matters</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
                Your trademark gives you exclusive rights, but only if you actively enforce them. The USPTO does not notify you when someone files a similar mark. With our USA-based trademark monitoring service, you’ll know when to take action before it’s too late. Without monitoring, infringing businesses can:
            </p>

            <div className="grid md:grid-cols-5 gap-6">
                {whyMatters.map((item, i) => (
                    <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all">
                        <span className="text-4xl font-black text-gray-200 mb-4">{item.id}</span>
                        <div className="mb-4">{item.icon}</div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* What Happens If You Don't Monitor */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
               <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">What Happens If You Don’t Monitor Your Trademark?</h2>
                  <p className="text-lg text-gray-600 mb-8">
                      Registering a trademark is only the first step; protecting it requires ongoing vigilance. Without active trademark monitoring in USA, new filings can slip through unnoticed, slowly chipping away at the distinct identity you worked hard to build. Competitors or copycats may use marks that look or sound similar, and by the time you find out, the damage to your brand and legal rights may already be done.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-left mb-8 max-w-2xl mx-auto">
                      <div className="flex gap-2 items-start">
                          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                          <p className="text-gray-700"><strong>Brand Dilution:</strong> Your mark becomes less distinct if others use similar names</p>
                      </div>
                      <div className="flex gap-2 items-start">
                          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                          <p className="text-gray-700"><strong>Weakened Legal Protection:</strong> Courts may view inaction as abandonment of rights</p>
                      </div>
                      <div className="flex gap-2 items-start">
                          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                          <p className="text-gray-700"><strong>Loss of Revenue:</strong> Confused customers may buy from competitors</p>
                      </div>
                      <div className="flex gap-2 items-start">
                          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                          <p className="text-gray-700"><strong>Higher Legal Costs:</strong> You may need to litigate instead of sending a simple early warning</p>
                      </div>
                      <div className="flex gap-2 items-start md:col-span-2">
                          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                          <p className="text-gray-700"><strong>Missed Enforcement Windows:</strong> USPTO oppositions must be filed quickly after publication</p>
                      </div>
                  </div>

                  <p className="text-gray-900 font-bold mb-8">With our proactive trademark monitoring in USA, you stay in control of your brand.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/order/step2" className="text-center bg-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                          Protect My Trademark
                      </Link>
                      <Link href="/contact" className="text-center bg-transparent border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition">
                          Talk To Trademark Infringement Attorney
                      </Link>
                  </div>
               </div>
           </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-12">
            What our customers
            <br />
            are saying?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="flex gap-1 text-accent mb-6">
                  {[...Array(5)].map((_, starI) => (
                    <StarIcon key={starI} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{review.text}"</p>
                <div className="mt-auto">
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md"
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left bg-gray-50 hover:bg-gray-100 transition"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-bold text-gray-900 flex gap-3 text-lg items-center">
                    <HelpCircle className="w-6 h-6 text-accent shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      openFaqIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6 pt-4 text-gray-600 pl-16 bg-white border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA / Contact */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Questions?</h2>
            <p className="text-xl text-gray-600">Get expert support for legal matters with our attorney by your side.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 flex gap-6 items-start hover:border-accent/30 transition-colors shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ask An Attorney</h3>
                <p className="text-gray-600 mb-4">Get expert support for legal matters with our attorney by your side.</p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>Mon–Fri 5 am–7 pm PT</p>
                  <p>Sat–Sun 7 am–4 pm PT</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 flex gap-6 items-start hover:border-accent/30 transition-colors shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                <Phone className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call An Agent</h3>
                <p className="text-3xl font-black text-accent mb-2">(303) 246-8693</p>
                <div className="space-y-1 text-sm text-gray-500 mb-6">
                  <p>Mon–Fri 5 am–7 pm PT</p>
                  <p>Sat–Sun 7 am–4 pm PT</p>
                </div>
                <a href="tel:3032468693" className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                  Get legal help
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
