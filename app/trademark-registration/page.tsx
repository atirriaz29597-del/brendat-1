"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  CheckCircle,
  FileText,
  Users,
  Award,
  ChevronRight,
  ChevronDown,
  Star,
  Check,
  XCircle,
  Copyright as CopyrightIcon,
  Palette,
  ShoppingBag,
  PenTool,
  Phone,
  MessageCircle,
  Briefcase,
  HelpCircle,
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

export default function TrademarkRegistrationPage() {
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

  const whyRegister = [
    {
      number: "01",
      title: "Secure Exclusive Rights to Your Brand",
      description:
        "Trademark registration gives you the exclusive right to use your business name, logo, or slogan in connection with your products or services, preventing anyone from using a similar identity in USA or beyond.",
    },
    {
      number: "02",
      title: "Stop Competitors from Copying",
      description:
        "With a registered trademark, you can prevent competitors from using confusingly similar marks that might mislead customers or damage your reputation.",
    },
    {
      number: "03",
      title: "Strengthen Brand Recognition",
      description:
        "A trademark helps build long-term brand recognition by signaling consistency and authenticity, making it easier to stand out in the crowded USA market.",
    },
    {
      number: "04",
      title: "Increase Business Value",
      description:
        "Trademarks are considered intellectual property and can add significant value for investors, lenders, or potential buyers. They can also be licensed, creating additional revenue streams for your business.",
    },
    {
      number: "05",
      title: "Right to Use the \u00AE Symbol",
      description:
        "Once your federal trademark is approved, you can proudly display the \u00AE symbol, signaling to others that your brand is officially protected. This not only deters copycats but also enhances your professional image.",
    },
  ];

  const importanceItems = [
    {
      icon: <Palette className="w-8 h-8 text-orange-500" />,
      title: "Logo Registration Trademark",
      description: "Secure exclusive rights to your brand’s logo.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-blue-500" />,
      title: "Name Trademark Registration",
      description: "Protect your business or product name from competitors.",
    },
    {
      icon: <FileText className="w-8 h-8 text-green-500" />,
      title: "Business/Brand Trademark Filing",
      description: "Ensure your brand identity is legally protected.",
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-purple-500" />,
      title: "E-commerce Brand Names",
      description: "Safeguard your online store or app’s unique identity.",
    },
    {
      icon: <PenTool className="w-8 h-8 text-red-500" />,
      title: "Content Creators & Designers' IP",
      description: "Protect creative works, designs, and assets from misuse.",
    },
  ];

  const comparisonData = [
    {
      feature: "Approval Rate",
      us: "Up to 4x higher",
      others: "Standard",
    },
    {
      feature: "Firm Type",
      us: "Fully owned law firm in USA",
      others: "Generic filing service",
    },
    {
      feature: "Attorney Support",
      us: "Direct work with experienced attorney",
      others: "Automated / No direct access",
    },
    {
      feature: "Second Search",
      us: "Free if issues found",
      others: "Charged extra",
    },
    {
      feature: "Rejection Protection",
      us: "Second app fee waived",
      others: "Full fee charged again",
    },
    {
      feature: "Volume",
      us: "2x more apps filed than most",
      others: "Lower volume",
    },
  ];

  const faqs = [
    {
      question: "Do I need a trademark registration attorney?",
      answer:
        "While not required, a trademark registration attorney in USA increases your chances of approval and helps avoid office actions. We include attorney support in all filings.",
    },
    {
      question: "What\u2019s the difference between federal and USA trademark registration?",
      answer:
        "Federal (USPTO) registration protects your mark nationwide. USA registration offers protection only within the state. We can help you decide what’s right for your business.",
    },
    {
      question: "Can I file my trademark online?",
      answer:
        "Yes, our secure online platform allows you to start the trademark process from anywhere. We handle the complex paperwork and filing with the appropriate government offices.",
    },
    {
      question: "What does the \u00AE trademark registration symbol mean?",
      answer:
        "The \u00AE symbol indicates that a trademark is officially registered with the USPTO. It provides notice to the public of your ownership and exclusive rights to use the mark.",
    },
    {
      question: "How many trademark classes do I need to register in?",
      answer:
        "It depends on the goods and services you offer. You should register in every class that is relevant to your business to ensure comprehensive protection. Our attorneys can help you determine the correct classes.",
    },
    {
      question: "How long will it take to register my trademark?",
      answer:
        "The process typically takes 8 to 12 months for federal registration, provided there are no major legal objections or office actions. State registrations may be faster.",
    },
    {
      question: "How do I find trademark registration in USA, USA?",
      answer:
        "You can find trademark registration services right here with Brendat. We offer comprehensive support from search to filing, all handled by experienced attorneys.",
    },
    {
      question: "How much does trademark registration cost in USA?",
      answer:
        "Our state trademark registration starts at $99 + state fees. Federal USPTO registration starts at $249 + USPTO fees. We offer transparent, flat-fee pricing.",
    },
    {
      question: "How do I protect against trademark infringement?",
      answer:
        "Registering your trademark is the first and most important step. Once registered, you have the legal standing to take action against infringers. We also offer monitoring services to alert you of potential conflicts.",
    },
  ];

  const features = [
    "Search existing marks in USPTO & TX databases to avoid rejections",
    "Application prep, filing, and tracking with the U.S. Patent & Trademark Office",
    "In-state brand protection for businesses operating only in USA",
    "File from anywhere with full attorney support",
    "Protect brand symbols, graphics, or stylized business names",
    "Ensure your trademark remains active and enforceable",
    "Track potential infringers and notify you of similar filings",
    "Get guidance from trademark attorneys in USA through every step of the process",
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
                Get Fast and Legally Sound Trademark Registration Services in USA
              </h1>
              <p className="text-xl mb-8 text-gray-600">
                Whether you’re protecting a brand name, logo, or product, our trademark attorneys make registration in USA affordable and straightforward. We handle everything from trademark search to application filing and ongoing support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/order/step2" className="bg-accent text-white px-6 py-3 rounded-lg font-bold text-base hover:bg-accent/90 transition shadow-md shadow-accent/20 text-center">
                  Start My Trademark Registration
                </Link>
                <Link href="/contact" className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold text-base hover:border-accent hover:text-accent transition text-center">
                  Get a Free Trademark Check
                </Link>
              </div>
            </div>
            
            {/* Feature Highlights */}
            <div className="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl relative border-2 border-accent/20">
              <h3 className="text-2xl font-black text-gray-900 mb-6">What&apos;s Included</h3>
              <ul className="space-y-4">
                {features.slice(0, 5).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust/Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Trusted Trademark Attorneys in USA</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
               Looking for the best trademark attorney in USA to protect your brand? Brendat makes trademark protection simple, accurate, and stress-free.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
               <div className="bg-accent/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-accent" />
               </div>
               <h3 className="text-xl font-black text-gray-900 mb-3">Proven Success</h3>
               <p className="text-gray-600 leading-relaxed">
                 Our firm has successfully registered over three times more trademarks than many online competitors, giving our clients a stronger chance at approval.
               </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
               <div className="bg-accent/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-accent" />
               </div>
               <h3 className="text-xl font-black text-gray-900 mb-3">Dedicated Expertise</h3>
               <p className="text-gray-600 leading-relaxed">
                 Work with rigorously vetted intellectual property and trademark attorneys near you, each with an average of 8 years of hands-on experience.
               </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
               <div className="bg-accent/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-accent" />
               </div>
               <h3 className="text-xl font-black text-gray-900 mb-3">Comprehensive Support</h3>
               <p className="text-gray-600 leading-relaxed">
                 Whether you need a trademark infringement attorney in USA to defend your rights or a trademark registration attorney to secure your brand, Brendat has you covered.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Register Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">Why Register a Trademark in USA?</h2>
          <div className="grid gap-8">
            {whyRegister.map((item, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 flex gap-6 items-start hover:shadow-md transition-all">
                <div className="text-5xl font-black text-accent/10">{item.number}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
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

      {/* Importance Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why Trademark Registration is Important</h2>
             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
               You can file for business name trademark registration in USA, logos, slogans, packaging designs, product names, and even sound or color marks.
             </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              {importanceItems.map((item, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                      <div className="mb-6 w-14 h-14 bg-accent/5 rounded-2xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                        {/* We need to clone the element to change props if needed, but here we just rely on the icon itself. 
                            However, the original definition has explicit colors. Let's rely on className replacement if we can, or just accept the colors.
                            Actually, the user wants the color scheme SAME as others. 
                            I'll leave the icons as they are defined in the array (multicolor) as that might be content specific, 
                            but change the container styling to match the theme.
                        */}
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
              ))}
           </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">What Sets Us Apart</h2>
           
           <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
             <div className="grid grid-cols-3 bg-gray-900 text-white p-6 font-bold text-lg">
                <div>Feature</div>
                <div className="text-center">Brendat</div>
                <div className="text-center text-gray-400">Other Online Competitors</div>
             </div>
             {comparisonData.map((row, index) => (
               <div key={index} className={`grid grid-cols-3 p-6 border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} items-center`}>
                 <div className="font-bold text-gray-900 text-sm md:text-base">{row.feature}</div>
                 <div className="text-center font-bold flex flex-col items-center">
                    <CheckCircle className="w-6 h-6 text-accent mb-2 hidden md:block" />
                    <span className="text-sm md:text-base text-gray-800">{row.us}</span>
                 </div>
                 <div className="text-center text-gray-400 flex flex-col items-center">
                    <XCircle className="w-6 h-6 mb-2 hidden md:block" />
                    <span className="text-sm md:text-base">{row.others}</span>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Trademark vs Copyright */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">Difference between a Trademark and a Copyright?</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
             {/* Trademark */}
             <div className="bg-white p-8 rounded-3xl border-2 border-accent shadow-xl shadow-accent/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -mr-16 -mt-16"></div>
                <div className="flex items-center gap-4 mb-8 relative">
                    <div className="bg-accent text-white p-4 rounded-2xl shadow-lg shadow-accent/20"><Award className="w-8 h-8"/></div>
                    <h3 className="text-3xl font-black text-gray-900">Trademark</h3>
                </div>
                <div className="space-y-8 relative">
                    <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">Protects Your Brand Identity</h4>
                        <p className="text-gray-600">Safeguards unique elements like brand names, logos, and slogans.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">Requires Registration for Full Protection</h4>
                        <p className="text-gray-600">Registration with USPTO gives nationwide legal protection.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">Renewable and Long-Lasting</h4>
                        <p className="text-gray-600">Can be renewed indefinitely every 10 years.</p>
                    </div>
                </div>
             </div>
             
             {/* Copyright */}
             <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-bl-full -mr-16 -mt-16"></div>
                <div className="flex items-center gap-4 mb-8 relative">
                    <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-lg"><CopyrightIcon className="w-8 h-8"/></div>
                    <h3 className="text-3xl font-black text-gray-900">Copyright</h3>
                </div>
                <div className="space-y-8 relative">
                    <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">Protects Creative Works</h4>
                        <p className="text-gray-600">Safeguards original works like books, music, art, and software.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">Applies Automatically</h4>
                        <p className="text-gray-600">Protection begins the moment a work is fixed in a tangible form.</p>
                    </div>
                    <div>
                         <h4 className="font-bold text-gray-900 text-lg mb-2">Limited Duration</h4>
                         <p className="text-gray-600">Generally lasts for the author's lifetime plus 70 years.</p>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-12">
            What our customers are saying
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
              <div className="flex gap-1 text-accent mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!"
              </p>
              <div className="mt-auto">
                <p className="font-bold text-gray-900">Samantha P.</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">LLC Customer</p>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
              <div className="flex gap-1 text-accent mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way."
              </p>
              <div className="mt-auto">
                <p className="font-bold text-gray-900">Carlos M.</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Trademark Customer</p>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
              <div className="flex gap-1 text-accent mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "We used Brendat for our estate planning documents, and I can’t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of."
              </p>
              <div className="mt-auto">
                <p className="font-bold text-gray-900">Nell C.</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Last Will Customer</p>
              </div>
            </div>
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
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-bold text-gray-900 flex gap-3 text-lg">
                    <HelpCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      openFaqIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6 pt-0 text-gray-600 pl-16">
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
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 flex gap-6 items-start hover:border-accent/30 transition-colors">
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

              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 flex gap-6 items-start hover:border-accent/30 transition-colors">
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
                  <a href="tel:3032468693" className="inline-block bg-accent text-white px-8 py-3 rounded-xl font-bold hover:bg-accent/90 transition shadow-lg shadow-accent/20">
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
