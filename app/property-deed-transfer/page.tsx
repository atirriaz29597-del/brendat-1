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
  Heart,
  Building,
  AlertCircle,
  ChevronDown,
  FileCheck,
  Clock,
} from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function PropertyDeedTransferPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const whenNeeded = [
    {
      title: "Adding or Removing Owners",
      description: "Marriage, divorce, or gifting property to a family member.",
      icon: <Users className="w-6 h-6 text-accent" />,
    },
    {
      title: "Estate Planning Transfers",
      description: "Moving property into a trust or passing real estate to heirs.",
      icon: <FileText className="w-6 h-6 text-accent" />,
    },
    {
      title: "Correcting Ownership",
      description: "Fixing clerical errors or updating outdated information.",
      icon: <FileCheck className="w-6 h-6 text-accent" />,
    },
    {
      title: "Business & Investment Transfers",
      description: "Assigning real estate to an LLC or business entity.",
      icon: <Building className="w-6 h-6 text-accent" />,
    },
    {
      title: "Deed Restricted Property Guidance",
      description: "Understanding limitations and compliance in USA neighborhoods.",
      icon: <AlertCircle className="w-6 h-6 text-accent" />,
    },
  ];

  const whyHire = [
    {
      title: "Local Expertise",
      description: "Attorneys familiar with Harris County Clerk filing requirements.",
      icon: <Home className="w-6 h-6 text-accent" />,
    },
    {
      title: "Tailored Solutions",
      description: "Guidance on the best way to take title deed of property based on your goals (joint tenancy, community property, trust ownership).",
      icon: <Users className="w-6 h-6 text-accent" />,
    },
    {
      title: "Seamless Process",
      description: "From the search property deed to the final recording, our attorneys ensure a seamless process.",
      icon: <CheckCircle className="w-6 h-6 text-accent" />,
    },
    {
      title: "Peace of Mind",
      description: "Legal review ensures your transfer is valid and enforceable.",
      icon: <Shield className="w-6 h-6 text-accent" />,
    },
  ];

  const deedTypes = [
    {
      title: "General Warranty Deed",
      description: "Provides full protection by guaranteeing clear title.",
    },
    {
      title: "Special Warranty Deed",
      description: "Limits guarantees to the time the grantor owned the property.",
    },
    {
      title: "Quitclaim Deed",
      description: "Transfers ownership interest without title guarantees.",
    },
    {
      title: "Transfer on Death Deed (TODD)",
      description: "Allows property to transfer directly to heirs without probate.",
    },
    {
      title: "Gift Deed",
      description: "Used for transferring property to family members without payment.",
    },
  ];

  const requirements = [
    {
      number: "01",
      title: "Written Deed Document",
      description: "Properly drafted and signed by the current owner(s).",
    },
    {
      number: "02",
      title: "Notarization",
      description: "Every deed must be signed before a USA notary.",
    },
    {
      number: "03",
      title: "Legal Property Description",
      description: "Accurate lot and block description from county records.",
    },
    {
      number: "04",
      title: "Delivery and Acceptance",
      description: "The grantee must accept the deed.",
    },
    {
      number: "05",
      title: "Filing with the County Clerk",
      description: "Recording the deed in Harris County ensures it becomes public record.",
    },
  ];

  const faqs = [
    {
      question: "What's the difference between a property title vs deed?",
      answer: "The title represents your legal ownership rights over a property, while the deed is the physical, legal document that transfers those rights from one party to another. A USA property deed lawyer ensures both are clear and valid.",
    },
    {
      question: "Where can I get a copy of my property deed in USA?",
      answer: "You can obtain a copy of your property deed from the Harris County Clerk's Office or the relevant county clerk where the property is located. Many counties also offer online property deed search services.",
    },
    {
      question: "How do I transfer a property deed in USA?",
      answer: "To transfer a property deed in USA, you need to prepare the appropriate deed document, have it signed and notarized, and file it with the county clerk's office. Working with a property deed attorney ensures the process is done correctly.",
    },
    {
      question: "How much does it cost to record a deed in USA?",
      answer: "Recording fees vary by county but typically range from $25 to $50. Our Standard package starts at $249 plus state filing fees.",
    },
    {
      question: "What's the best way to take title deed of property in USA?",
      answer: "The best way depends on your situation. Options include joint tenancy, tenancy in common, community property, or trust ownership. Our attorneys help you choose the right option for your goals.",
    },
    {
      question: "Do deed restricted properties require special handling?",
      answer: "Yes, deed restricted properties have special covenants or limitations. Our attorneys review these restrictions to ensure compliance during the transfer.",
    },
    {
      question: "What is a Lady Bird Deed, and why is it common in USA?",
      answer: "A Lady Bird Deed (enhanced life estate deed) allows you to transfer property to heirs while retaining control during your lifetime. It avoids probate and is popular for estate planning in USA.",
    },
    {
      question: "Can I remove someone's name from a deed in USA?",
      answer: "Yes, through a quitclaim deed or other appropriate deed type. The person being removed must usually sign the deed voluntarily. Our attorneys can guide you through this process.",
    },
    {
      question: "What's the difference between a general warranty deed and a quitclaim deed?",
      answer: "A general warranty deed guarantees clear title and protects the buyer from past claims. A quitclaim deed transfers whatever interest the grantor has without any guarantees or warranties.",
    },
    {
      question: "Do I need a lawyer for property deed transfer in USA?",
      answer: "While not legally required, hiring a property deed lawyer is strongly recommended to avoid costly errors, ensure proper execution, and protect your ownership rights.",
    },
    {
      question: "How long does a property deed transfer take in USA?",
      answer: "With our Standard package, deeds are typically ready within 5-7 business days. Our Expedited package prepares your deed within 2 business days.",
    },
    {
      question: "Can property deeds in USA be transferred online?",
      answer: "While some counties offer e-filing, the deed must still be properly prepared, signed, and notarized. We handle the entire process, including electronic filing where available.",
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
              Property Deed Transfer in USA – Trusted Legal Support for a Smooth Process
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Whether you&apos;re adding a spouse to a deed, transferring real estate to family, or finalizing a sale, Brendat&apos;s experienced property deed lawyers in USA simplify the process. We ensure your property title vs deed concerns are addressed, documents are properly filed, and your transfer is legally valid under USA law.
            </p>
            <p className="text-lg font-bold text-gray-900 mb-8">
              Pricing starts at $249 + Charges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/order/step2" className="bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20 text-center">
                Start My Property Deed Transfer
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition text-center">
                Speak with a Property Deed Attorney in USA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Flexible Packages to Transfer Your Property with Confidence
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard */}
            <div className="bg-gray-50 p-8 rounded-3xl border-2 border-gray-100 shadow-lg hover:-translate-y-1 transition-transform">
              <div className="mb-4">
                <h3 className="text-xl font-black text-gray-900 mb-1">Standard Deed Transfer</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-black text-gray-900">$249</span>
                  <span className="text-lg text-gray-600">+ state filing fees</span>
                </div>
              </div>
              <Link href="/order/step2" className="block w-full py-3 rounded-xl font-bold mb-6 transition shadow-md bg-gray-900 text-white hover:bg-gray-800 text-center">
                Start My Transfer
              </Link>
              <p className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">Includes:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Comprehensive title research to confirm ownership and identify liens or restrictions
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Custom-prepared property deed, reviewed and sent for your signature
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Filing with the Harris County Clerk&apos;s Office (or applicable USA county)
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Brendat&apos;s Peace of Mind Review™ to ensure accuracy and compliance
                </li>
              </ul>
            </div>

            {/* Expedited */}
            <div className="relative bg-white p-8 rounded-3xl border-2 border-accent shadow-2xl hover:-translate-y-1 transition-transform scale-105">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                Fast Track
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-black text-gray-900 mb-1">Expedited Deed Transfer</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-black text-gray-900">$289</span>
                  <span className="text-lg text-gray-600">+ state filing fees</span>
                </div>
              </div>
              <Link href="/order/step2" className="block w-full py-3 rounded-xl font-bold mb-6 transition shadow-md bg-accent text-white hover:bg-accent/90 shadow-accent/20 text-center">
                Start My Transfer
              </Link>
              <p className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">Includes Standard package, plus:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Fast-track preparation, getting your deed ready for signature within 2 business days
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Priority filing via e-filing or courier for the quickest possible recording
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Extra assurance for clients on tight timelines, such as real estate closings or estate transfers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* When Do You Need */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              When Do You Need Deed Transfers in USA
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {whenNeeded.map((item, i) => (
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

      {/* Why Hire */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Hire Our Property Deed Attorney in USA?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              DIY deed transfers often lead to costly mistakes—like invalid deeds, title disputes, or probate complications. With Brendat, you&apos;ll have:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyHire.map((item, i) => (
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

      {/* What You Should Know */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              What You Should Know About Property Deeds in USA
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">
                Why Property Deed Transfers Matter
              </h3>
              <p className="text-lg text-gray-600">
                A property deed is more than just paperwork; it&apos;s the legal document that proves ownership. Without a properly executed deed, you risk title disputes, probate issues, or delays in selling or refinancing. Our attorneys guide you through every step, including USA property deed search, deed drafting, and filing with the Harris County Clerk.
              </p>
            </div>
            <div className="hidden md:block">
              <Image
                src="/llc-registration.svg"
                alt="LLC Registration"
                width={500}
                height={400}
                className="w-full h-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Types of Deeds */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Types of Property Deeds in USA
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding the different USA property deeds is crucial for protecting your ownership rights:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deedTypes.map((type, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{type.title}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              USA Property Deed Requirements
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {requirements.map((req, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black text-accent">{req.number}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{req.title}</h3>
                <p className="text-gray-600 text-sm">{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Title vs Deed */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Property Title vs. Deed: What&apos;s the Difference?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-8 rounded-3xl border border-accent/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Property Title</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                A property title represents your legal ownership rights over real estate. It isn&apos;t a physical piece of paper but rather a legal status showing who owns the property. A title can carry mortgages, liens, or deed restrictions, which may affect how or when ownership can be transferred.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Property Deed</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                A property deed is the official, physical document used to transfer title ownership. Once the deed is signed, notarized, and filed with the Harris County Clerk&apos;s Office (or the relevant county office in USA), it updates the public record and establishes the new owner&apos;s title.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent/5 border-y border-accent/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Ready to Start Your Property Deed Transfer in USA?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact our USA property deed attorneys today for a confidential consultation and take the first step toward securing a legal transfer.
          </p>
          <Link href="/order/step2" className="inline-block bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
            Start My Property Deed Transfer
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Frequently Asked Questions About Property Deed Transfer in USA
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
