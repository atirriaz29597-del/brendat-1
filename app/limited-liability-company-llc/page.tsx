"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, Phone, MessageCircle, Shield, DollarSign, FileText, Building2, Users, Scale, ChevronRight, Star, Clock, Mail, HelpCircle, Briefcase, Home } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

/* ── Pricing Data ─────────────────────────────────────────── */
const pricingPlans = [
  {
    name: "Basic",
    price: "$0",
    priceNote: "+state filing fees",
    description: "Perfect for entrepreneurs who want to get their business officially registered, fast and simple.",
    buttonText: "Form My LLC",
    features: [
      "We handle the articles of organization filing, including official paperwork to legally form your LLC with the state of USA.",
      "Business name availability check to ensure your chosen name is unique and ready to claim.",
      "Get a session with a tax pro from Brendat to help you start on the right financial foot.",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$249",
    priceNote: "+state filing fees",
    description: "Ideal for entrepreneurs ready to launch and actively operate their business or side hustle.",
    buttonText: "Form My LLC",
    badge: "Recommended",
    features: [
      "An operating agreement to set clear rules for running your business and resolving disputes.",
      "EIN (Employer Identification Number), which is essential for taxes, opening a business bank account, and hiring employees.",
      "Unlimited 30-minute consultations to discuss new legal matters with a qualified business attorney in USA during your included 30-day subscription.",
      "Choose your business lawyer based on state, experience, and client ratings.",
      "1-year of access to 150+ customizable legal documents & unlimited eSignatures.",
      "Launch your professional online presence in minutes with WIX-powered tools.",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$299",
    priceNote: "+state filing fees",
    description: "Perfect for LLC owners who want to streamline operations and stay on top of cash flow.",
    buttonText: "Form My LLC",
    features: [
      "Bookkeeping tools to easily track finances, simplify tax prep, and cut accounting costs (6-month subscription included).",
      "Unlimited customizable proposals & invoices to help you get paid faster with professional, branded documents.",
      "Save time while maximizing deductions and refund with auto-categorization.",
      "Record every business mile for effortless expense reporting and tax savings.",
    ],
    highlighted: false,
  },
];

/* ── Top Reasons Data ─────────────────────────────────────── */
const topReasons = [
  {
    icon: Shield,
    title: "Protect Personal Assets",
    description: "An LLC separates your personal finances from your business debts and liabilities.",
  },
  {
    icon: DollarSign,
    title: "Custom Tax Status",
    description: "Subject to pass-through taxation. You can elect S Corporation tax status for added flexibility.",
  },
  {
    icon: FileText,
    title: "Less Paperwork",
    description: "Compared to Corporations, LLCs have fewer formalities and annual requirements.",
  },
  {
    icon: Building2,
    title: "Ideal for Holding Companies",
    description: "An LLC separates your personal finances from your business debts and liabilities.",
  },
];

/* ── Add-On Services Data ─────────────────────────────────── */
const addOnServices = [
  "DBA (Doing Business As) Registration",
  "USA Registered Agent Service",
  "Annual Franchise Tax Filing Support",
  "Operating Agreement Review",
  "Startup Compliance Kit",
  "Conversion Services (Sole Prop → LLC)",
];

/* ── Steps Data ───────────────────────────────────────────── */
const steps = [
  {
    number: "01",
    title: "Tell Us About Your Business",
    description: "We'll help determine if an LLC is the right fit and collect the necessary details.",
  },
  {
    number: "02",
    title: "File Certificate of Formation",
    description: "We submit your LLC Certificate of Formation with the USA Secretary of State.",
  },
  {
    number: "03",
    title: "Receive Official Documents",
    description: "Get your EIN, Operating Agreement, and other key documents via email or mail.",
  },
  {
    number: "04",
    title: "Stay Compliant Year-Round",
    description: "Our Legal plan keeps your LLC on track with alerts for renewals, franchise taxes, and other deadlines.",
  },
];

/* ── Comparison Data ──────────────────────────────────────── */
const comparisonData = {
  llc: {
    name: "LLC",
    features: [
      { title: "Liability Protection", description: "Owners (members) are not personally liable for business debts, protecting personal assets." },
      { title: "Pass-Through Taxation", description: "Profits and losses pass directly to members' personal tax returns, avoiding double taxation." },
      { title: "Optional S Corporation", description: "LLCs can elect S-Corp status to reduce self-employment taxes if eligible." },
      { title: "Minimal Paperwork", description: "Annual reports and a few compliance requirements depending on the state." },
      { title: "Great for Holding Companies", description: "Flexible structure for managing multiple businesses or investments under one entity." },
      { title: "Startup-Friendly", description: "Easy to form, flexible ownership, and minimal ongoing compliance make LLCs attractive to new businesses." },
    ],
  },
  corporation: {
    name: "Corporation",
    features: [
      { title: "Limited Liability", description: "Shareholders have limited liability, separating personal and business assets." },
      { title: "Corporate Tax", description: "(C-Corp) Profits are taxed at the corporate level and again on dividends to shareholders." },
      { title: "S-Corp Status Available", description: "Corporations can file for S-Corp status to enjoy pass-through taxation (subject to IRS rules)." },
      { title: "Hefty Paperwork", description: "Corporations must hold annual meetings, maintain bylaws, and file extensive reports." },
      { title: "Best for Holding Companies", description: "Strong structure for managing subsidiaries and raising investment capital." },
      { title: "Ideal for Startups", description: "C-Corps and S-Corps are ideal for startups seeking venture capital or issuing shares to investors." },
    ],
  },
  soleProprietorship: {
    name: "Sole Proprietorship",
    features: [
      { title: "No Protection", description: "No legal separation; personal assets are at risk if the business incurs debt or lawsuits." },
      { title: "No Corporate Tax", description: "Income is reported on the owner's personal tax return, avoiding corporate tax." },
      { title: "No S-Corp Status", description: "S-Corp status is not available for sole proprietors." },
      { title: "Minimal Paperwork", description: "Few legal requirements beyond basic permits and licenses are required." },
      { title: "Not Suitable for Holding Companies", description: "Sole Proprietorships are not suited for managing multiple businesses under one entity." },
      { title: "Not Startup Friendly", description: "Limited growth potential and harder to secure funding compared to other structures." },
    ],
  },
};

/* ── FAQ Data ─────────────────────────────────────────────── */
const faqs = [
  {
    question: "How do I start a limited liability company in USA?",
    answer: "Choose a name, appoint a Registered Agent in USA, file your Certificate of Formation, and apply for an EIN. We can take care of all of this for you.",
  },
  {
    question: "What is a Certificate of Formation for an LLC in USA?",
    answer: "The Certificate of Formation is the official legal document required to form your LLC in USA. It includes your company name, Registered Agent address, management structure (member-managed or manager-managed), and organizer signature.",
  },
  {
    question: "Can I form a holding company as an LLC?",
    answer: "Yes, LLCs are an excellent choice for holding companies. They provide flexible structure for managing multiple businesses or investments under one entity with liability protection.",
  },
  {
    question: "Do I need a lawyer to start my LLC in USA?",
    answer: "While not legally required, having an attorney can help ensure your LLC is properly structured, especially for complex ownership arrangements, holding companies, or multi-member LLCs.",
  },
  {
    question: "How long does the LLC formation process take?",
    answer: "Processing times vary by state, but typically range from a few days to several weeks. Expedited filing options are available in most states for faster processing.",
  },
  {
    question: "Can I use my home address as my business address?",
    answer: "Yes, you can use your home address, but many business owners prefer to use a Registered Agent service to maintain privacy and ensure important documents are received promptly.",
  },
];

/* ── Reviews Data ─────────────────────────────────────────── */
const reviews = [
  {
    name: "Samantha P.",
    type: "LLC Customer",
    text: "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!",
  },
  {
    name: "Carlos M.",
    type: "Trademark Customer",
    text: "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way.",
  },
  {
    name: "Nell C.",
    type: "Last Will Customer",
    text: "We used Brendat for our estate planning documents, and I can't thank them enough. Everything was explained thoroughly, and now I know my family is taken care of.",
  },
];

export default function LLCPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
      {/* ── Hero Section ───────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 overflow-hidden">
        <HeroAvatars />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,0,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
              Professional LLC Formation Service in USA Done Right
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get best LLC formation services in USA at Brendat. Our attorneys handle everything from paperwork to compliance so that you can launch your business confidently, protect your assets, and focus on growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/order/step2"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all text-lg"
              >
                <Briefcase className="w-5 h-5" />
                Start My LLC
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Talk to LLC Agent
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Phone className="w-5 h-5 text-accent" />
              <span>Have Questions? Call</span>
              <a href="tel:3032468693" className="font-bold text-accent hover:underline">(303) 246-8693</a>
              <span>to Speak with a Business Formation Lawyer.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Section ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-accent/5 to-accent/10 border-2 border-accent shadow-xl shadow-accent/10"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    {plan.badge}
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                    <span className="text-sm text-gray-500">{plan.priceNote}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{plan.description}</p>
                </div>
                <Link
                  href="/order/step2"
                  className={`block w-full text-center font-bold py-3 rounded-xl mb-6 transition-all ${
                    plan.highlighted
                      ? "bg-accent hover:bg-accent-dark text-white shadow-md shadow-accent/20"
                      : "bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent"
                  }`}
                >
                  {plan.buttonText}
                </Link>
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Includes:</p>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.highlighted ? "bg-accent/20" : "bg-gray-200"}`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? "text-accent" : "text-gray-500"}`} />
                      </div>
                      <p className="text-sm text-gray-600">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Top Reasons Section ────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Top Reasons to Form an LLC in USA
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topReasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div key={reason.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-accent/20 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{reason.title}</h3>
                  <p className="text-sm text-gray-600">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 100% Accurate Filing Guarantee ─────────────────────── */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">100% Accurate Filing Guarantee</h3>
                <p className="text-white/80">Whether you&apos;re a first-time founder or a seasoned investor, Brendat&apos;s experienced LLC Formation Lawyers in USA offer a strategic path forward.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Use Brendat Section ────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Why Use Brendat to Set Up Your LLC?
              </h2>
              <h3 className="text-xl font-bold text-accent mb-4">Legal Help When You Need It</h3>
              <p className="text-gray-600 mb-6">
                Some businesses are straightforward. Others need more structure, legal protection, or tax planning, especially if you&apos;re forming a holding company in USA or preparing for outside investment.
              </p>
              <p className="text-gray-700 font-semibold mb-4">Our limited liability company formation attorneys in USA are here to help with:</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Ownership structure and equity planning",
                  "Multi-member LLC agreements",
                  "Holding company setup",
                  "Registered agent requirements",
                  "Local licensing and compliance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <ChevronRight className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 mb-6">
                So whether you&apos;re starting small or building big, we ensure your LLC is set up correctly.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-accent/20 transition-all"
              >
                Talk to a LLC Formation Attorney
              </Link>
            </div>
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-3xl p-8 border border-accent/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">LLC Formation Consultation</h4>
                  <p className="text-sm text-gray-500">LLC Registration Services</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">Add-On LLC Formation Services</h4>
                <p className="text-sm text-gray-600 mb-4">
                  With our add-on LLC formation services in USA, you can easily customize your setup:
                </p>
                <ul className="space-y-3">
                  {addOnServices.map((service) => (
                    <li key={service} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/order/step2"
                  className="block w-full mt-6 text-center bg-accent hover:bg-accent-dark text-white font-bold py-3 rounded-xl transition-all"
                >
                  Customize My Package
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Easy Steps Section ───────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Start Your LLC in 4 Easy Steps with Brendat
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                  <div className="w-14 h-14 rounded-xl bg-accent text-white flex items-center justify-center font-black text-xl mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Section ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              LLC vs. Corporation vs. Sole Proprietorship
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choosing the right business structure is a crucial first step in setting up your company in USA. Whether you&apos;re considering an LLC, a corporation, or a sole proprietorship, understanding the differences can help you protect your assets, reduce tax burdens, and simplify operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* LLC */}
            <div className="bg-gradient-to-b from-accent/5 to-accent/10 rounded-2xl p-6 border-2 border-accent">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">LLC</h3>
              </div>
              <div className="space-y-4">
                {comparisonData.llc.features.map((feature) => (
                  <div key={feature.title} className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" />
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporation */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Corporation</h3>
              </div>
              <div className="space-y-4">
                {comparisonData.corporation.features.map((feature) => (
                  <div key={feature.title} className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sole Proprietorship */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Sole Proprietorship</h3>
              </div>
              <div className="space-y-4">
                {comparisonData.soleProprietorship.features.map((feature) => (
                  <div key={feature.title} className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12 bg-accent/5 rounded-2xl p-8 border border-accent/20">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Still Not 100% Sure?</h3>
            <p className="text-gray-600 mb-6">Our experienced LLC Attorneys in USA will help you weigh your options before filing!</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-accent/20 transition-all"
            >
              Talk to an Attorney
            </Link>
          </div>
        </div>
      </section>

      {/* ── Certificate of Formation Section ───────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">
            What You Should Know About Starting An LLC in USA
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What Is a Certificate of Formation for an LLC?
              </h3>
              <p className="text-gray-600 mb-6">
                The Certificate of Formation is the official legal document required to form your LLC in USA. It includes:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Your company name",
                  "Registered Agent address",
                  "Management structure (member-managed or manager-managed)",
                  "Organizer signature",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600">
                We prepare and file your LLC certificate of formation with the USA Secretary of State, and you&apos;ll receive a stamped copy once approved.
              </p>
            </div>
            {/* Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop"
                  alt="Certificate of Formation - LLC Documents"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Official Documents</p>
                        <p className="text-sm text-gray-500">Stamped & approved by the state</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Frequently Asked Questions About LLC Formation USA
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <span className="font-bold text-gray-900">{faq.question}</span>
                </h3>
                <p className="text-gray-600 mt-3 pl-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews Section ────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Our Reviews
            </h2>
            <p className="text-lg text-gray-600">What our customers are saying?</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-bold">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact/CTA Section ────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Questions card */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-300 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Questions? Ask An Attorney</h3>
                <p className="text-sm text-gray-600 mt-1 mb-3">Get expert support for legal matters with our attorney by your side.</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Mon–Fri 5 am–7 pm PT &nbsp;·&nbsp; Sat–Sun 7 am–4 pm PT</span>
                </div>
              </div>
            </div>
            {/* Call card */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-300 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Call An Agent</h3>
                <a href="tel:3032468693" className="text-2xl font-black text-accent hover:underline block mt-1">(303) 246-8693</a>
                <p className="text-sm text-gray-500 mt-1">Mon–Fri 5 am–7 pm PT &nbsp;·&nbsp; Sat–Sun 7 am–4 pm PT</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-5 py-2.5 rounded-xl mt-4 text-sm shadow-md shadow-accent/20 transition-all"
                >
                  Get legal help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Form Section ───────────────────────────────── */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <span className="inline-block text-xs font-black uppercase tracking-widest text-accent mb-4">Get Started Today</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-6">
                Launch your Business in USA
              </h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                Dreaming to start a business in USA? At Brendat, we believe even entrepreneurs deserve expert assistance and legal backup. Our vetted network of USA-based attorneys is here to guide you.
              </p>
              <ul className="space-y-5">
                {[
                  { icon: FileText, text: "50 State Filing Compliance" },
                  { icon: Shield,   text: "Registered Agent Service Included" },
                  { icon: Check,    text: "Fast Transparent Service" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-semibold text-lg">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-300 p-8 md:p-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your business idea..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3.5 rounded-xl shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/30 transition-all text-sm"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
