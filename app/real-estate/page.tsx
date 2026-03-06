"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  CheckCircle,
  Scale,
  FileText,
  MessageCircle,
  Phone,
  Home,
  Key,
  Users,
  ClipboardCheck,
  FileCheck,
  Building,
  ChevronDown,
  ChevronRight,
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

export default function RealEstatePage() {
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

  const services = [
    {
      title: "Residential Lease Agreements",
      description: "Attorney-prepared lease agreements that protect both landlords and tenants, ensuring compliance with USA property laws and Harris County regulations.",
      icon: <Key className="w-8 h-8 text-accent" />,
      features: [
        "USA-compliant residential leases",
        "Customized terms for rent, deposits, and property rules",
        "Required USA disclosure forms included",
        "Landlord tools and tenant protections",
      ],
      href: "/residential-lease",
    },
    {
      title: "Property Deed Transfer",
      description: "Professional deed transfer services for adding owners, estate planning, business transfers, and correcting property records with full legal protection.",
      icon: <FileCheck className="w-8 h-8 text-accent" />,
      features: [
        "Comprehensive title research and verification",
        "Custom-prepared property deeds",
        "Filing with Harris County Clerk's Office",
        "Multiple deed types: warranty, quitclaim, TODD",
      ],
      href: "/property-deed-transfer",
    },
  ];

  const whyChoose = [
    {
      title: "USA Law Expertise",
      description: "Our attorneys are deeply familiar with USA property laws, the USA Property Code, and Harris County filing requirements.",
      icon: <Scale className="w-6 h-6 text-accent" />,
    },
    {
      title: "Comprehensive Protection",
      description: "From lease disputes to title issues, we ensure your real estate documents are legally sound and enforceable.",
      icon: <Shield className="w-6 h-6 text-accent" />,
    },
    {
      title: "Local Experience",
      description: "We understand USA real estate markets and work with Harris County, Fort Bend County, and surrounding areas.",
      icon: <Home className="w-6 h-6 text-accent" />,
    },
    {
      title: "Transparent Pricing",
      description: "Clear, flat-fee pricing with no hidden costs. You know exactly what you're paying upfront.",
      icon: <CheckCircle className="w-6 h-6 text-accent" />,
    },
  ];

  const whenYouNeed = [
    {
      title: "Renting Property",
      description: "Whether you're a landlord leasing out your investment property or a tenant signing a residential lease, proper documentation protects everyone.",
      icon: <Key className="w-6 h-6 text-accent" />,
    },
    {
      title: "Buying or Selling",
      description: "Property deed transfers are essential for finalizing sales, ensuring clear title, and recording ownership changes.",
      icon: <Building className="w-6 h-6 text-accent" />,
    },
    {
      title: "Estate Planning",
      description: "Transfer property to trusts, add family members to deeds, or set up transfer-on-death deeds to avoid probate.",
      icon: <Users className="w-6 h-6 text-accent" />,
    },
    {
      title: "Family Changes",
      description: "Marriage, divorce, or gifting property to loved ones requires proper deed transfers and legal documentation.",
      icon: <FileText className="w-6 h-6 text-accent" />,
    },
  ];

  const faqs = [
    {
      question: "What real estate legal services does Brendat offer in USA?",
      answer: "We provide residential lease agreement preparation and property deed transfer services. Our attorneys ensure all documents comply with USA law and are properly filed with county clerks.",
    },
    {
      question: "Do I need a lawyer for a residential lease in USA?",
      answer: "While not legally required, having an attorney prepare your lease ensures it complies with USA property laws, includes required disclosures, and protects both landlord and tenant rights.",
    },
    {
      question: "How long does a property deed transfer take?",
      answer: "Standard deed transfers typically take 5-7 business days. We also offer expedited service with 2-business-day turnaround for time-sensitive situations.",
    },
    {
      question: "What's included in your residential lease agreements?",
      answer: "Our leases include USA-required disclosures, customizable terms for rent and deposits, pet and sublease policies, maintenance responsibilities, and compliance with the USA Property Code.",
    },
    {
      question: "Can you help with deed transfers for inherited property?",
      answer: "Yes, we handle estate-related deed transfers including transfers from estates, adding property to trusts, and transfer-on-death deeds (TODD) to avoid probate.",
    },
    {
      question: "Do your services cover properties outside Harris County?",
      answer: "Yes, we can prepare documents and file with any USA county clerk's office, including Fort Bend, Montgomery, Galveston, and other counties throughout the state.",
    },
    {
      question: "What's the difference between a lease and a deed?",
      answer: "A lease is a rental agreement that grants temporary use of property. A deed transfers actual ownership. Leases are for landlord-tenant relationships; deeds are for buying, selling, or transferring ownership.",
    },
    {
      question: "How much do your real estate legal services cost?",
      answer: "Our pricing is transparent with no hidden costs. State filing fees vary by location. Use our pricing tool to get an instant quote for your specific needs.",
    },
    {
      question: "Can you help landlords with multiple properties?",
      answer: "Absolutely. We offer customized lease agreements for single-family homes, multi-unit properties, and investment portfolios. Contact us for volume pricing.",
    },
    {
      question: "What if I need to correct an error on a deed?",
      answer: "We can prepare corrective deeds to fix errors in names, property descriptions, or other details. This ensures your property records are accurate and up-to-date.",
    },
  ];

  const reviews = [
    {
      name: "Jennifer K., Real Estate Investor",
      review: "I've used Brendat for lease agreements on all five of my rental properties. The documents are thorough, USA-compliant, and give me peace of mind. Highly recommend for any landlord!",
    },
    {
      name: "Michael T., Homeowner",
      review: "Needed to transfer my property into a trust for estate planning. Brendat's team handled everything smoothly - from title search to filing with the county. Professional service at a fair price.",
    },
    {
      name: "Sara L., First-Time Landlord",
      review: "As a new landlord, I was worried about getting the lease right. Brendat walked me through every clause and made sure I was protected. The tenant had no issues either. Win-win!",
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
              USA Real Estate Legal Services – Protect Your Property Rights
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Whether you&apos;re renting, buying, selling, or transferring property in USA, Brendat provides expert legal support for all your real estate needs. Our attorneys ensure your documents are legally sound, compliant with USA law, and properly filed with county authorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/residential-lease">
                <button className="bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20 w-full sm:w-auto">
                  Create a Lease Agreement
                </button>
              </Link>
              <Link href="/property-deed-transfer">
                <button className="bg-transparent border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition w-full sm:w-auto">
                  Transfer Property Deed
                </button>
              </Link>
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

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Our Real Estate Legal Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From rental agreements to property transfers, we provide comprehensive legal solutions for USA real estate matters.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 hover:border-accent/30 transition-all shadow-lg hover:shadow-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">{service.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={service.href}>
                  <button className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent/90 transition shadow-md flex items-center justify-center gap-2">
                    Learn More
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Choose Brendat for Real Estate Legal Services?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our USA-based attorneys bring local expertise and comprehensive protection to every real estate transaction.
            </p>
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
        </div>
      </section>

      {/* When You Need */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              When Do You Need Real Estate Legal Services?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whenYouNeed.map((item, i) => (
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

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              How Our Real Estate Services Work
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black text-white">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Choose Your Service</h3>
              <p className="text-gray-600 text-sm">Select residential lease agreement or property deed transfer based on your needs.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black text-white">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Complete Questionnaire</h3>
              <p className="text-gray-600 text-sm">Answer simple questions about your property and specific requirements.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black text-white">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Attorney Preparation</h3>
              <p className="text-gray-600 text-sm">Our USA attorneys draft your documents with full legal compliance.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black text-white">
                4
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Sign & File</h3>
              <p className="text-gray-600 text-sm">Review, sign, and we handle the filing with county authorities when needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent/5 to-accent/10 border-y border-accent/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Ready to Protect Your Real Estate Interests?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get started with professional real estate legal services tailored to USA law.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/residential-lease">
              <button className="bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                Create Lease Agreement
              </button>
            </Link>
            <Link href="/property-deed-transfer">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg">
                Transfer Property Deed
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Frequently Asked Questions
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
                <button className="bg-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                  Get legal help
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
