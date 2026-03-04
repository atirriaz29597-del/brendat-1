"use client";

import React, { useState } from "react";
import {
  Shield,
  CheckCircle,
  Scale,
  FileText,
  MessageCircle,
  Phone,
  Users,
  Home,
  ClipboardCheck,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function ResidentialLeasePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const whyMatters = [
    {
      title: "USA-Compliant Drafting",
      description: "Our agreements align with the USA Property Code and can integrate forms like the USA Real Estate Commission Residential Lease Agreement.",
      icon: <Scale className="w-6 h-6 text-accent" />,
    },
    {
      title: "Customized Terms",
      description: "Rent, deposits, repairs, pets, and renewals structured to fit your property.",
      icon: <ClipboardCheck className="w-6 h-6 text-accent" />,
    },
    {
      title: "Personlized Guidance",
      description: "Plain-English documents so both parties fully understand their rights.",
      icon: <BookOpen className="w-6 h-6 text-accent" />,
    },
    {
      title: "Local Experience",
      description: "Drafted by USA attorneys familiar with Harris County housing regulations.",
      icon: <Home className="w-6 h-6 text-accent" />,
    },
  ];

  const faqs = [
    {
      question: "What is a residential lease agreement?",
      answer: "A residential lease is a legally binding contract between a landlord and tenant, outlining terms such as rent, duration, and responsibilities.",
    },
    {
      question: "Is a verbal rental agreement valid in USA?",
      answer: "While some verbal agreements may be enforceable, written leases are strongly recommended to avoid disputes and ensure clarity. USA law requires written leases for terms longer than one year.",
    },
    {
      question: "Can I use a free online template instead of hiring a lawyer?",
      answer: "Free templates may not be up-to-date with USA law or tailored to your specific situation. An attorney-prepared lease ensures compliance and protects your rights.",
    },
    {
      question: "What is included in a basic residential lease agreement?",
      answer: "A basic residential lease typically includes tenant and landlord information, property address, rent amount and due date, lease term, security deposit details, maintenance responsibilities, and required USA disclosures.",
    },
    {
      question: "What's the difference between a USA Real Estate Commission lease and a custom lease?",
      answer: "The USA Real Estate Commission Residential Lease Agreement is a standardized form used widely in the state. A custom lease is tailored to your specific needs and may include additional provisions not in the standard form.",
    },
    {
      question: "Do residential leases in USA need to be notarized?",
      answer: "No, residential leases in USA do not require notarization to be valid. However, both parties should sign the agreement.",
    },
    {
      question: "Can a landlord increase rent during the lease term?",
      answer: "Generally, no. Rent increases can only occur during the lease term if specifically stated in the lease agreement. Otherwise, increases take effect upon lease renewal.",
    },
    {
      question: "What happens if a tenant breaks the lease early?",
      answer: "The consequences depend on the lease terms. Typically, the tenant remains responsible for rent until a new tenant is found or until the lease term ends, minus the landlord's duty to mitigate damages.",
    },
    {
      question: "Can a lease include rules about pets, smoking, or subleasing?",
      answer: "Yes, landlords can include reasonable rules about pets, smoking, subleasing, and other property use restrictions in the lease agreement.",
    },
    {
      question: "How long does it take to create a residential lease agreement in USA with Brendat?",
      answer: "Most lease agreements are prepared within 2-3 business days after you complete our questionnaire and provide all necessary information.",
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
              USA Residential Lease Agreements Made Simple and Legally Strong
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              At Brendat, we help landlords and tenants create a residential lease agreement in USA that is legally sound, compliant with USA law, and tailored to your situation. Whether you need a basic residential lease agreement for a single-family home or a more detailed basic residential rental agreement lease for a multi-unit property, our attorneys ensure your rights and responsibilities are clearly defined.
            </p>
            <Link href="/order/step2" className="inline-block bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
              Get A Legally Sound Lease Today
            </Link>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why a Residential Lease Agreement Matters
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A well-written lease protects both landlords and tenants by preventing disputes and outlining clear expectations. With Brendat, you&apos;ll receive:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="text-center mt-12">
            <Link href="/order/step2" className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
              Get a USA-compliant Lease Agreement Now
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Flexible Lease Solutions for Everyone
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Essential */}
            <div className="bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-lg hover:-translate-y-1 transition-transform">
              <div className="mb-4">
                <h3 className="text-xl font-black text-gray-900 mb-1">Essential Lease Package</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-black text-gray-900">$29</span>
                </div>
              </div>
              <Link href="/order/step2" className="block w-full py-3 rounded-xl font-bold mb-6 transition shadow-md bg-gray-900 text-white hover:bg-gray-800 text-center">
                Get My Lease Now
              </Link>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Personalized Residential Lease Agreement in USA
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  USA-required disclosure forms included
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Landlord tools & forms to help manage your rental property
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Unlimited revisions for 1 week
                </li>
              </ul>
            </div>

            {/* Comprehensive */}
            <div className="relative bg-white p-8 rounded-3xl border-2 border-accent shadow-2xl hover:-translate-y-1 transition-transform scale-105">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-black text-gray-900 mb-1">Comprehensive Lease Package</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-black text-gray-900">$49</span>
                </div>
              </div>
              <Link href="/order/step2" className="block w-full py-3 rounded-xl font-bold mb-6 transition shadow-md bg-accent text-white hover:bg-accent/90 shadow-accent/20 text-center">
                Secure My Comprehensive Lease
              </Link>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Personalized Residential Lease Agreement in USA
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  USA-required disclosure forms included
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Landlord tools & forms to simplify rental management
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Unlimited revisions for 6 months
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              FAQs About Residential Lease Agreements in USA
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

      {/* Contact */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Questions?</h2>
            <p className="text-xl text-gray-600">Get expert support for legal matters with our attorney by your side.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 flex gap-6 items-start hover:border-accent/30 transition-colors shadow-sm">
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
            <div className="bg-white rounded-2xl p-8 border border-gray-200 flex gap-6 items-start hover:border-accent/30 transition-colors shadow-sm">
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
