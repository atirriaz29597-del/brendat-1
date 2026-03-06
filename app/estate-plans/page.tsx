"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  CheckCircle,
  Scale,
  Heart,
  DollarSign,
  Users,
  Zap,
  FileText,
  HelpCircle,
  MessageCircle,
  Phone,
  ChevronDown,
  ArrowRight,
  Clock,
} from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";

type Plan = "individual" | "couple";

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

export default function EstatePlansPage() {
  const router = useRouter();
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [activePlan, setActivePlan] = useState<Plan>("individual");

  const handleStartBusiness = () => {
    const params = new URLSearchParams();
    if (selectedEntity) params.set("entity", selectedEntity);
    if (selectedState) params.set("state", selectedState);
    router.push(`/order/step2?${params.toString()}`);
  };

  const whyMatters = [
    {
      title: "Asset Protection & Distribution",
      description: "Ensure your wealth and property are passed on exactly as you intended.",
      icon: <Shield className="w-6 h-6 text-accent" />,
    },
    {
      title: "Probate Avoidance",
      description: "Spare your family from the stress, delays, and expenses of probate court.",
      icon: <Scale className="w-6 h-6 text-accent" />,
    },
    {
      title: "Protection for Dependents",
      description: "Establish trusts and guardianship plans to safeguard minors and loved ones.",
      icon: <Heart className="w-6 h-6 text-accent" />,
    },
    {
      title: "Healthcare & Financial Planning",
      description: "Assign trusted decision-makers for medical care and finances in case of incapacity.",
      icon: <FileText className="w-6 h-6 text-accent" />,
    },
    {
      title: "Tax Efficiency",
      description: "Minimize estate and inheritance taxes so more of your legacy stays with your heirs.",
      icon: <DollarSign className="w-6 h-6 text-accent" />,
    },
  ];

  const willPlans = [
    {
      name: "Basic Will",
      price: "$99",
      subtitle: "Do it myself",
      cta: "Start My Will",
      features: [
        "Last will & testament",
        "Healthcare directive",
        "Financial power of attorney",
        "HIPAA authorization",
        "30 days of free revisions",
        "One set of printed and shipped documents",
        "Secure document storage",
      ],
      popular: false,
    },
    {
      name: "Premium Will",
      price: "$249",
      subtitle: "Do it myself",
      cta: "Start My Will",
      preamble: "Everything in a Basic Will, plus:",
      features: [
        "Attorney review of estate planning documents",
        "Unlimited 30-minute calls with an attorney for 1 year*",
        "Attorney advice for your family",
        "1 year of free revisions",
        "25% off attorney services",
        "10% off LegalZoom products",
      ],
      popular: true,
    },
  ];

  const trustPlans = [
    {
      name: "Basic Trust",
      price: "$399",
      subtitle: "Do it myself",
      cta: "Start My Trust",
      features: [
        "Living trust",
        "Pour-over will",
        "Healthcare directive",
        "Financial power of attorney",
        "HIPAA authorization",
        "Certificate of trust",
        "Schedule of assets",
        "Bill of transfer",
        "30 days of free revisions",
        "One set of printed and shipped documents",
        "Secure document storage",
      ],
      popular: false,
    },
    {
      name: "Premium Trust",
      price: "$549",
      subtitle: "Do it myself",
      cta: "Start My Trust",
      preamble: "Everything in a Basic Trust, plus:",
      features: [
        "Attorney review of estate planning documents",
        "Unlimited 30-minute calls with an attorney for 1 year*",
        "Attorney advice for your family",
        "1 year of free revisions",
        "25% off attorney services",
        "10% off LegalZoom products",
      ],
      popular: true,
    },
  ];

  const whyChoose = [
    {
      title: "Experienced Attorneys",
      description: "In-depth knowledge of state-specific probate and asset protection rules.",
      icon: <Scale className="w-6 h-6 text-accent" />,
    },
    {
      title: "Guidance You Can Understand",
      description: "Straightforward explanations of wills, trusts, and probate options.",
      icon: <HelpCircle className="w-6 h-6 text-accent" />,
    },
    {
      title: "Strategies Built Around You",
      description: "Tailored plans designed to protect your assets, family, and legacy.",
      icon: <Users className="w-6 h-6 text-accent" />,
    },
    {
      title: "Pricing You Can Trust",
      description: "Transparent pricing with no hourly surprises, so you know exactly what to expect.",
      icon: <DollarSign className="w-6 h-6 text-accent" />,
    },
    {
      title: "Statewide Reach",
      description: "Trusted by Texans statewide to safeguard their wealth and provide peace of mind.",
      icon: <Zap className="w-6 h-6 text-accent" />,
    },
  ];

  const PricingCard = ({
    plan,
  }: {
    plan: (typeof willPlans)[0];
  }) => (
    <div
      className={`relative flex flex-col p-8 rounded-3xl border-2 transition-transform hover:-translate-y-1 ${
        plan.popular
          ? "border-accent bg-white shadow-2xl scale-105 z-10"
          : "border-gray-100 bg-gray-50 shadow-lg"
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
          Most Popular
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-xl font-black text-gray-900 mb-1">{plan.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-gray-900">{plan.price}</span>
          <span className="text-sm text-gray-500">{plan.subtitle}</span>
        </div>
      </div>
      <button
        className={`w-full py-3 rounded-xl font-bold mb-6 transition shadow-md ${
          plan.popular
            ? "bg-accent text-white hover:bg-accent/90 shadow-accent/20"
            : "bg-gray-900 text-white hover:bg-gray-800"
        }`}
      >
        {plan.cta}
      </button>
      {plan.preamble && (
        <p className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">{plan.preamble}</p>
      )}
      <ul className="space-y-3 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,0,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
              Estate Planning in USA: Protect Your Legacy with Trusted Attorneys
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Planning for the future shouldn't feel overwhelming. With our estate planning services in USA, you can safeguard your assets, protect your loved ones, and gain peace of mind knowing everything is legally structured for your wishes. Whether you need a simple will, a detailed trust, or comprehensive guidance, our USA estate planning attorneys are here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/order/step2" className="bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20 text-center">
                Start My Estate Plan
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition text-center">
                Talk to A USA Attorney
              </Link>
            </div>
            <p className="text-sm text-gray-500 italic">Contact our USA estate planning attorneys today for a confidential consultation!</p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Why Estate Planning Matters in USA?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Estate planning is about more than just drafting documents; it's about securing your family's future. With the right estate planning lawyer in USA, USA, you can:
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {whyMatters.map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all flex flex-col items-center text-center">
                <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTITY & STATE SELECTION */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
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
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl">
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
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span>100% Accuracy Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Brendat */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Choose Brendat's Trusted Estate Planning Attorney?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Finding the right legal partner matters. Whether you're searching for "my USA estate plan", need online estate planning services in USA, or want in-person attorney support, we provide flexible solutions. With our USA estate planning lawyers, you'll get:
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {whyChoose.map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all flex flex-col items-center text-center">
                <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Will vs Trust CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Will vs. Trust: What's the difference?</h2>
          <p className="text-gray-300 text-lg mb-8">Choose the right estate plan for you</p>
          <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <h3 className="font-bold text-xl text-accent mb-4">Last Will & Testament</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Takes effect after death</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Goes through probate court</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Names guardians for minor children</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Generally lower cost to set up</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <h3 className="font-bold text-xl text-accent mb-4">Living Trust</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Takes effect immediately upon creation</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Avoids probate — private & faster</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Covers incapacity during your lifetime</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> More complex but stronger protection</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-accent/5 border-y border-accent/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Ready to start your estate plan?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Contact our USA estate planning attorneys today for a confidential consultation and take the first step toward securing your legacy.
          </p>
          <Link href="/order/step2" className="inline-block bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
            Create My Estate Plan Now
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Questions?</h2>
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
