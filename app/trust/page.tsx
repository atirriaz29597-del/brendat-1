"use client";

import React, { useState } from "react";
import {
  Shield,
  CheckCircle,
  Scale,
  Heart,
  FileText,
  HelpCircle,
  MessageCircle,
  Phone,
  Users,
  DollarSign,
  Lock,
  Eye,
  Clock,
  Zap,
  ChevronDown,
} from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";

type Plan = "individual" | "couple";

export default function TrustPage() {
  const [activePlan, setActivePlan] = useState<Plan>("individual");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const whyHire = [
    {
      title: "Deep USA Trust Knowledge",
      description: "Expertise in the USA Trust Code and probate system.",
      icon: <Scale className="w-6 h-6 text-accent" />,
    },
    {
      title: "Tailored Planning Strategies",
      description: "Solutions for blended families, business owners, and unique circumstances.",
      icon: <Users className="w-6 h-6 text-accent" />,
    },
    {
      title: "Integrated Estate Planning",
      description: "Coordination with wills, powers of attorney, and tax planning.",
      icon: <FileText className="w-6 h-6 text-accent" />,
    },
    {
      title: "Local USA Support",
      description: "Attorneys experienced with Harris County probate practice.",
      icon: <Heart className="w-6 h-6 text-accent" />,
    },
    {
      title: "Clear, Flat-Fee Pricing",
      description: "Transparent fees with no billing surprises.",
      icon: <DollarSign className="w-6 h-6 text-accent" />,
    },
  ];

  const trustPlans = [
    {
      name: "Basic Trust",
      price: "$399",
      originalPrice: "$359",
      discount: "10% OFF",
      cta: "Start A Trust",
      features: [
        "Living Trust: Transfer assets smoothly and avoid probate.",
        "Pour-Over Will: Ensures any overlooked assets still move into your trust.",
        "Healthcare Directive: Document your medical care preferences.",
        "Durable Financial Power of Attorney: Let someone you trust handle finances if you cannot.",
        "HIPAA Authorization: Grant access to essential medical information.",
        "Certificate of Trust: A simplified proof of trust for banks and institutions.",
        "Schedule of Assets: Organize what belongs in your trust.",
        "Bill of Transfer: Move personal property into your trust easily.",
        "30 Days of Free Revisions",
        "Receive one professionally prepared set delivered to you.",
      ],
      popular: false,
    },
    {
      name: "Premium Trust",
      price: "$549",
      originalPrice: "$439",
      discount: "20% OFF",
      cta: "Start A Trust",
      preamble: "Includes everything in the Basic Trust Package, plus:",
      features: [
        "Attorney Review of Documents: Ensure your trust is fully aligned with USA law.",
        "Unlimited 30-Minute Calls with a Brendat Attorney for 1 Year: Get your questions answered anytime.",
        "Attorney Guidance for Your Family: Ongoing support for loved ones when they need it.",
        "1 Year of Free Revisions: Update your trust as your life and assets evolve.",
      ],
      popular: true,
    },
  ];

  const whyCreate = [
    {
      title: "Avoid Probate",
      description: "Transfer assets directly to beneficiaries without going through the Harris County Probate Court.",
      icon: <Scale className="w-6 h-6 text-accent" />,
    },
    {
      title: "Maintain Privacy",
      description: "Keep your estate matters out of the public record.",
      icon: <Eye className="w-6 h-6 text-accent" />,
    },
    {
      title: "Provide Asset Protection",
      description: "Shield property from creditors and reduce risks for your heirs.",
      icon: <Shield className="w-6 h-6 text-accent" />,
    },
    {
      title: "Plan for Incapacity",
      description: "Ensure a trustee can manage your affairs if you become unable.",
      icon: <Clock className="w-6 h-6 text-accent" />,
    },
    {
      title: "Control Distributions",
      description: "Decide how and when beneficiaries receive assets (for example, staggered distributions for young adults).",
      icon: <Lock className="w-6 h-6 text-accent" />,
    },
  ];

  const trustTypes = [
    {
      name: "Revocable Living Trust",
      bestFor: "Families who want flexibility and control during their lifetime.",
      benefits: "Can be changed or revoked at any time; avoids probate.",
      requirement: "Must be signed and properly funded by transferring assets into the trust.",
    },
    {
      name: "Irrevocable Trust",
      bestFor: "Asset protection and tax planning.",
      benefits: "Removes assets from your estate, may reduce estate USA, and shields property from creditors.",
      requirement: "Once created, cannot be modified without beneficiary consent.",
    },
    {
      name: "Testamentary Trust",
      bestFor: "Parents of minor children or loved ones needing long-term management.",
      benefits: "Created through a last will, funded only after death.",
      requirement: "Must be clearly outlined in your will and approved by the probate court.",
    },
    {
      name: "Special Needs Trust",
      bestFor: "Families caring for a disabled child or adult.",
      benefits: "Preserves eligibility for Medicaid and SSI benefits while providing financial support.",
      requirement: "Must comply with federal and USA law to maintain benefit eligibility.",
    },
  ];

  const requirements = [
    {
      title: "Written Trust Document",
      description: "The trust must be in writing and properly drafted to comply with USA law. Verbal trusts are not legally recognized for most assets.",
      icon: <FileText className="w-6 h-6 text-accent" />,
    },
    {
      title: "Competent Grantor",
      description: "The person creating the trust (the \"grantor\" or \"settlor\") must be of sound mind and acting voluntarily.",
      icon: <Users className="w-6 h-6 text-accent" />,
    },
    {
      title: "Clear Beneficiaries or Purpose",
      description: "Every trust must have identifiable beneficiaries, such as family members, or a recognized charitable purpose.",
      icon: <Heart className="w-6 h-6 text-accent" />,
    },
    {
      title: "Named Trustee",
      description: "A trustee must be appointed to oversee and manage the assets. This can be you, a family member, or even a professional fiduciary.",
      icon: <Scale className="w-6 h-6 text-accent" />,
    },
    {
      title: "Proper Funding",
      description: "A trust has no power unless assets are actually transferred into it. This may include deeds for real estate, bank accounts, investments, or personal property.",
      icon: <DollarSign className="w-6 h-6 text-accent" />,
    },
  ];

  const howItWorks = [
    {
      step: "Consultation",
      description: "We discuss your goals, family, and assets.",
    },
    {
      step: "Design Session",
      description: "Choose the right trust structure and trustees.",
    },
    {
      step: "Drafting",
      description: "Attorney-prepared trust tailored to USA law.",
    },
    {
      step: "Funding the Trust",
      description: "Assistance transferring property and accounts.",
    },
    {
      step: "Ongoing Support",
      description: "Updates available as your life or laws change.",
    },
  ];

  const faqs = [
    {
      question: "Do I still need a will if I have a trust?",
      answer: "Yes. A will is used to transfer any assets not properly titled in your trust. This is often called a \"pour-over will\" because it ensures leftover assets are moved into the trust after death.",
    },
    {
      question: "How much does it cost to set up a trust in USA?",
      answer: "Trust costs vary depending on complexity. Our Basic Trust starts at $399 and our Premium Trust with attorney review starts at $549.",
    },
    {
      question: "Does a trust help avoid USA probate?",
      answer: "Yes, a properly funded living trust avoids probate entirely, allowing assets to transfer directly to beneficiaries without court involvement.",
    },
    {
      question: "What's the difference between a living will and a living trust?",
      answer: "A living will is a healthcare directive that specifies your medical care preferences. A living trust is an estate planning tool that holds and transfers assets.",
    },
    {
      question: "Can I serve as my own trustee?",
      answer: "Yes, you can serve as your own trustee during your lifetime. You'll also name a successor trustee to take over if you become incapacitated or pass away.",
    },
    {
      question: "What happens if I don't fund my trust?",
      answer: "An unfunded trust has no power. Assets that aren't transferred into the trust will go through probate as if the trust didn't exist.",
    },
    {
      question: "Are trusts public in USA?",
      answer: "No, trusts remain private documents. Unlike wills, which become public record through probate, trusts do not have to be filed with the court.",
    },
    {
      question: "Can a trust reduce estate USA?",
      answer: "Certain types of irrevocable trusts can help reduce estate taxes by removing assets from your taxable estate. Consult with an attorney for personalized advice.",
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

  const PricingCard = ({ plan }: { plan: (typeof trustPlans)[0] }) => (
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
          <span className="text-lg text-gray-400 line-through">{plan.originalPrice}</span>
        </div>
        <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
          {plan.discount}
        </span>
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
      {!plan.preamble && (
        <p className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">Includes:</p>
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                Trusted Living Trust Lawyers in USA to Protect Your Legacy
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                A living trust is one of the most effective tools for Texans who want to protect assets, avoid probate, and make sure their family is taken care of without unnecessary court delays. At Brendat, our USA-based estate planning attorneys prepare customized trusts that comply with the USA Trust Code and reflect your unique goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/order/step2" className="bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20 text-center">
                  Create My USA Trust
                </Link>
                <Link href="/contact" className="bg-transparent border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition text-center">
                  Speak with a Trust Attorney
                </Link>
              </div>
              <p className="text-sm text-gray-500 italic">
                Have questions? Call <span className="text-accent font-bold">(303) 246-8693</span> for a free discovery call.
              </p>
            </div>
            <div className="hidden md:block">
              <Image
                src="/business-reg.svg"
                alt="Business Registration"
                width={500}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Hire Brendat */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Hire Brendat&apos;s USA-Based Living Trust Attorney?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Creating trust isn&apos;t just about filling out forms; it&apos;s about making sure your plan works when your family needs it most. At Brendat, our attorneys guide you through every step, ensuring your trust is legally sound, fully funded, and tailored to your life in USA, USA.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
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

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Work with a Brendat Trust Lawyer Today
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Living trusts at an affordable price
            </p>
          </div>

          {/* Individual / Couple toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl p-1.5 shadow-sm border border-gray-100 flex gap-1">
              <button
                onClick={() => setActivePlan("individual")}
                className={`px-8 py-3 rounded-lg font-bold text-sm transition ${
                  activePlan === "individual"
                    ? "bg-accent text-white shadow"
                    : "text-gray-600 hover:text-accent"
                }`}
              >
                Individual
              </button>
              <button
                onClick={() => setActivePlan("couple")}
                className={`px-8 py-3 rounded-lg font-bold text-sm transition ${
                  activePlan === "couple"
                    ? "bg-accent text-white shadow"
                    : "text-gray-600 hover:text-accent"
                }`}
              >
                Couple
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {trustPlans.map((plan, i) => (
              <PricingCard key={i} plan={plan} />
            ))}
          </div>

          <div className="text-center mt-8 space-y-2">
            <p className="text-gray-700 font-semibold">
              Have questions?{" "}
              <span className="text-accent font-bold">Call (303) 246-8693</span>{" "}
              for a free discovery call.
            </p>
            <p className="text-xs text-gray-500 max-w-xl mx-auto">
              If one of our network attorneys recommends a last will instead of a living trust, just give us a call and we&apos;ll update your order. For complete details, please review the Brendat Guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Why Create a Trust */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Why Create a Trust in USA?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                A living trust offers benefits that a last will alone cannot. With a trust, you can:
              </p>
              <div className="space-y-4">
                {whyCreate.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="bg-accent/10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/order/step2" className="mt-8 inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                Start My Trust Now
              </Link>
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
        </div>
      </section>

      {/* Types of Trusts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Types of Trusts We Prepare in USA
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {trustTypes.map((trust, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-black text-accent mb-4">{trust.name}</h3>
                <div className="space-y-3 text-sm">
                  <p><span className="font-bold text-gray-900">Best For:</span> <span className="text-gray-600">{trust.bestFor}</span></p>
                  <p><span className="font-bold text-gray-900">Benefits:</span> <span className="text-gray-600">{trust.benefits}</span></p>
                  <p><span className="font-bold text-gray-900">USA Requirement:</span> <span className="text-gray-600">{trust.requirement}</span></p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-4">Not Sure Which Trust is Right For You?</p>
            <Link href="/contact" className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
              Speak to a USA Trust Attorney
            </Link>
          </div>
        </div>
      </section>

      {/* USA Trust Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              USA Trust Requirements
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Creating a trust in USA isn&apos;t just about filling out forms; it must meet specific legal standards under the USA Trust Code. Here&apos;s what&apos;s required:
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {requirements.map((item, i) => (
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
              Start My Trust Now
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              How It Works with Brendat
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {howItWorks.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.step}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent/5 border-y border-accent/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Ready to start your Trust Estate Plan?</h2>
          <Link href="/order/step2" className="inline-block bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
            Start A Trust
          </Link>
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
