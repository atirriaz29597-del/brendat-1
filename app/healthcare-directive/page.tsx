"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  CheckCircle,
  Scale,
  Heart,
  FileText,
  MessageCircle,
  Phone,
  Users,
  DollarSign,
  Cross,
  AlertCircle,
  Activity,
  Stethoscope,
  ChevronDown,
  FileCheck,
  UserCheck,
  ArrowRight,
  Clock,
} from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";

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

export default function HealthcareDirectivePage() {
  const router = useRouter();
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleStartBusiness = () => {
    const params = new URLSearchParams();
    if (selectedEntity) params.set("entity", selectedEntity);
    if (selectedState) params.set("state", selectedState);
    router.push(`/order/step2?${params.toString()}`);
  };

  const whyChoose = [
    {
      title: "USA-Focused Lawyers",
      description: "Every directive aligns with the USA Health & Safety Code.",
      icon: <Scale className="w-6 h-6 text-accent" />,
    },
    {
      title: "Faith-Sensitive Planning",
      description: "From standard directives to Catholic Health Care Directives, we honor your values.",
      icon: <Cross className="w-6 h-6 text-accent" />,
    },
    {
      title: "Local Support",
      description: "USA-based attorneys familiar with Harris County healthcare systems.",
      icon: <Users className="w-6 h-6 text-accent" />,
    },
    {
      title: "Flat-Fee Pricing",
      description: "No hidden costs, clear packages.",
      icon: <DollarSign className="w-6 h-6 text-accent" />,
    },
  ];

  const directiveTypes = [
    {
      title: "Living Will (Directive to Physicians)",
      description: "Specifies your wishes about life-sustaining treatment if you are terminally ill or permanently unconscious.",
      icon: <FileText className="w-6 h-6 text-accent" />,
    },
    {
      title: "Medical Power of Attorney",
      description: "Appoints someone you trust to make health decisions on your behalf if you can't.",
      icon: <UserCheck className="w-6 h-6 text-accent" />,
    },
    {
      title: "Out-of-Hospital DNR (Do Not Resuscitate Order)",
      description: "Tells emergency personnel not to use CPR or other life-saving measures if your heart or breathing stops.",
      icon: <AlertCircle className="w-6 h-6 text-accent" />,
    },
    {
      title: "Religious or Ethical Directives",
      description: "Customized options, such as a Catholic Health Care Directive for USA, ensure your medical treatment reflects your beliefs.",
      icon: <Cross className="w-6 h-6 text-accent" />,
    },
  ];

  const whyCreate = [
    {
      title: "Clarity for Your Family",
      description: "Relieve loved ones from the burden of making difficult choices during medical emergencies.",
      icon: <Users className="w-6 h-6 text-accent" />,
    },
    {
      title: "Legal Protection",
      description: "Ensure your wishes are respected under the USA Advance Health Care Directives Act.",
      icon: <Shield className="w-6 h-6 text-accent" />,
    },
    {
      title: "Medical Control",
      description: "Decide in advance about life-sustaining treatments, pain relief, and organ donation.",
      icon: <Stethoscope className="w-6 h-6 text-accent" />,
    },
    {
      title: "Faith-Based Options",
      description: "We also prepare documents like the Catholic Health Care Directive for those who want their medical care aligned with religious values.",
      icon: <Cross className="w-6 h-6 text-accent" />,
    },
  ];

  const requirements = [
    {
      title: "Written Directive",
      description: "Using the official USA Health Care Directive Form or a legally equivalent attorney-prepared document.",
    },
    {
      title: "Competent Declarant",
      description: "You must be of sound mind when signing.",
    },
    {
      title: "Witnesses or Notarization",
      description: "USA requires two qualified witnesses or notarization for validity.",
    },
    {
      title: "Compliance with State Law",
      description: "Must align with the USA Health and Human Services advance directives standards.",
    },
  ];

  const whatToInclude = [
    {
      title: "Life-Sustaining Treatments",
      description: "Specify which medical interventions (such as ventilators, feeding tubes, or resuscitation) you would or would not want in serious situations.",
    },
    {
      title: "Decision-Maker Appointment",
      description: "Choose the trusted person who will act as your medical power of attorney if you can't make choices yourself.",
    },
    {
      title: "Comfort & End-of-Life Care",
      description: "Outline your preferences for palliative care, pain management, and hospice support.",
    },
    {
      title: "Organ & Tissue Donation",
      description: "State your wishes regarding organ, tissue, or whole-body donation.",
    },
    {
      title: "Religious or Ethical Directives",
      description: "Ensure your plan reflects personal or faith-based beliefs, such as preparing a Catholic Health Care Directive for USA.",
    },
  ];

  const processSteps = [
    {
      title: "Personal Consultation",
      description: "Share your medical wishes, values, and any religious or ethical preferences with our USA-based attorneys.",
    },
    {
      title: "Custom Drafting",
      description: "We prepare a USA Advance Health Care Directive Form tailored to your exact needs and compliant with state requirements.",
    },
    {
      title: "Guided Signing",
      description: "We walk you through the proper witnessing or notarization steps to ensure your directive is legally valid.",
    },
    {
      title: "Secure Delivery",
      description: "Receive both digital and printed copies, so you and your loved ones always have access.",
    },
    {
      title: "Ongoing Updates",
      description: "Easily revise your directive if your health, beliefs, or preferences change over time.",
    },
  ];

  const faqs = [
    {
      question: "What is a USA Advance Health Care Directive?",
      answer: "It's a legal document that lets you state your medical treatment preferences and/or appoint someone to make health decisions for you if you're unable to communicate.",
    },
    {
      question: "How do I get a USA Health Care Directive Form?",
      answer: "You can work with Brendat's attorneys to prepare a customized, attorney-reviewed USA Health Care Directive Form that meets all state requirements.",
    },
    {
      question: "Do I need both a Living Will and a Medical Power of Attorney?",
      answer: "It's recommended. A Living Will states your treatment wishes, while a Medical Power of Attorney names someone to make decisions for you. Together, they provide comprehensive coverage.",
    },
    {
      question: "Is a Catholic Health Care Directive valid in USA?",
      answer: "Yes, as long as it meets USA legal requirements and is properly executed with witnesses or notarization.",
    },
    {
      question: "Do health care directives in USA need to be notarized?",
      answer: "USA requires either two qualified witnesses or notarization. Our attorneys guide you through the proper execution process.",
    },
    {
      question: "Can I change or revoke my advance directive?",
      answer: "Yes, you can update or revoke your advance directive at any time as long as you are mentally competent.",
    },
    {
      question: "What is the difference between a health directive and a DNR?",
      answer: "A health directive covers a range of medical decisions, while a DNR (Do Not Resuscitate) is a specific order about CPR and life-saving measures.",
    },
    {
      question: "How much does it cost to create an advance directive in USA?",
      answer: "Our Essential Healthcare Directive package is $39, and our Premium package with attorney review is $49.",
    },
    {
      question: "Where should I keep my advance directive?",
      answer: "Keep copies with your healthcare providers, family members, and your medical power of attorney. Brendat also provides secure online storage.",
    },
    {
      question: "Do I need a lawyer to complete my advance directive in USA?",
      answer: "While not required, working with an attorney ensures your directive complies with USA law and accurately reflects your wishes.",
    },
    {
      question: "Can my spouse automatically make medical decisions for me?",
      answer: "Not automatically. USA law requires you to formally designate a medical power of attorney, even if it's your spouse.",
    },
    {
      question: "How quickly can I get my directive completed?",
      answer: "Your paperwork is typically available for download within two to three business days after purchase.",
    },
  ];

  const reviews = [
    {
      name: "Samantha P., LLC Customer",
      review: "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!",
    },
    {
      name: "Carlos M., Trademark Customer",
      review: "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way.",
    },
    {
      name: "Nell C., Last Will Customer",
      review: "We used Brendat for our estate planning documents, and I can't thank them enough. Everything was explained thoroughly, and now I know my family is taken care of.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,0,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
              Advance Health Care Directives in USA, Prepared by USA Attorney
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Making medical decisions during a crisis can be overwhelming for families. At Brendat, our USA attorneys prepare advance healthcare directives that comply with the USA Health and Human Services advance directives requirements, ensuring your documents are both valid and enforceable.
            </p>
            <Link href="/contact" className="inline-block bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
              Create My USA Healthcare Directive
            </Link>
          </div>
        </div>
      </section>

      {/* ENTITY & STATE SELECTION */}
      <section className="py-24 bg-white relative overflow-hidden" id="start-order">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Start Your Business Today
            </h2>
            <p className="text-xl text-gray-600">
              Select your entity type and state to see pricing
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
            {/* Entity Type Selection */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                Entity Type
              </label>
              <div className="relative">
                <select
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl appearance-none bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all cursor-pointer font-medium"
                >
                  <option value="">Select your entity type...</option>
                  <option value="llc">Limited Liability Company (LLC)</option>
                  <option value="corporation">Corporation (C-Corp / S-Corp)</option>
                  <option value="nonprofit">Nonprofit Organization</option>
                  <option value="sole-proprietorship">Sole Proprietorship</option>
                  <option value="dba">DBA (Doing Business As)</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* State Selection */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                State of Formation
              </label>
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl appearance-none bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all cursor-pointer font-medium"
                >
                  <option value="">Select your state...</option>
                  {Object.keys(STATE_FEES).map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Price Display */}
            {selectedState && (
              <div className="mb-8 p-6 bg-gradient-to-r from-accent/5 to-accent/10 rounded-2xl border border-accent/20">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">State Filing Fee:</span>
                  <span className="text-3xl font-black text-accent">${STATE_FEES[selectedState as keyof typeof STATE_FEES]}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">+ Service fee calculated at checkout</p>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleStartBusiness}
              disabled={!selectedEntity || !selectedState}
              className="w-full py-5 bg-accent text-white text-xl font-bold rounded-xl shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg flex items-center justify-center gap-3"
            >
              Continue
              <ArrowRight className="w-6 h-6" />
            </button>

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Shield className="w-8 h-8 text-accent mb-2" />
                  <span className="text-xs font-medium text-gray-600">Secure Process</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="w-8 h-8 text-accent mb-2" />
                  <span className="text-xs font-medium text-gray-600">Fast Filing</span>
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircle className="w-8 h-8 text-accent mb-2" />
                  <span className="text-xs font-medium text-gray-600">Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Brendat */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Choose Brendat to Create Your Advance Healthcare Directive in USA?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all flex flex-col items-center text-center">
                <div className="bg-accent/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
              Work with a USA Advance Health Directive Attorney Today
            </Link>
          </div>
        </div>
      </section>

      {/* Types of Health Directives */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Types of Health Directives in USA
              </h2>
              <p className="text-lg text-gray-600">
                Not all advance directives are the same. USA law recognizes several different forms, each serving a unique purpose in protecting your medical wishes. Depending on your situation, you may need one or a combination of these documents to ensure your voice is heard during a medical emergency. At Brendat, our attorneys explain your options and prepare the right directive so your care reflects your values, priorities, and beliefs.
              </p>
            </div>
            <div className="hidden md:block">
              <Image
                src="/family-trust.svg"
                alt="Family Trust"
                width={500}
                height={400}
                className="w-full h-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {directiveTypes.map((type, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-gray-600 text-sm">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
              Speak with a USA Healthcare Directive Attorney
            </Link>
          </div>
        </div>
      </section>

      {/* Why Create */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Create a Health Care Directive in USA?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A USA Advance Health Care Directive gives you control over critical decisions even if you&apos;re unable to speak for yourself. Benefits include:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCreate.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all flex flex-col items-center text-center">
                <div className="bg-accent/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 space-y-4">
            <Link href="/contact" className="inline-block text-center bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
              Start My Advance Health Directive in USA
            </Link>
            <p>
              <Link href="/contact" className="text-accent font-bold hover:underline">
                See examples of healthcare directives.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              USA Health Care Directive Requirements
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To be valid under USA law, your Advance Health Directive Form must include:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {requirements.map((req, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all text-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-black">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{req.title}</h3>
                <p className="text-gray-600 text-sm">{req.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
              Get My USA Advance Health Directive Form Prepared by an Attorney
            </Link>
          </div>
        </div>
      </section>

      {/* What to Include */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="hidden md:block">
              <Image
                src="/assets_c543375419b34ced8a551fab246ac1bc_95f65bff9744446b90e7e6d76c09c471.svg"
                alt="Healthcare Directive"
                width={500}
                height={400}
                className="w-full h-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                What Can I Include in My Advance Health Care Directive?
              </h2>
              <p className="text-lg text-gray-600">
                When preparing a USA Health Care Directive or Advance Health Care Directive in USA, it&apos;s important to think through your personal values and medical preferences. With Brendat, our attorneys help you document decisions such as:
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatToInclude.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
              Start My Advance Health Directive Now
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              How It Works with Brendat
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Creating a USA Health Care Directive doesn&apos;t need to be stressful or confusing. At Brendat, we make the process simple, supportive, and fully compliant with USA advance health directive laws, so you can focus on peace of mind.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black text-white">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{step.title}</h3>
                <p className="text-gray-600 text-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent/5 border-y border-accent/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-8">
            Ready to Get Your Advance Healthcare Directive in USA, USA?
          </h2>
          <Link href="/contact" className="inline-block bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
            Create My USA Health Care Directive Today
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Frequently Asked Questions About USA Advance Health Directives
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left bg-gray-50 hover:bg-gray-100 transition"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                >
                  <span className="font-bold text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFAQ === i ? "rotate-180" : ""}`} />
                </button>
                {openFAQ === i && (
                  <div className="p-6 bg-white border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent font-bold text-sm uppercase tracking-wider mb-2">Our Reviews</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              What our customers<br />are saying?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <p className="text-gray-600 mb-6 italic">&ldquo;{review.review}&rdquo;</p>
                <p className="font-bold text-gray-900">{review.name}</p>
              </div>
            ))}
          </div>
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call An Agent At (303) 246-8693</h3>
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
