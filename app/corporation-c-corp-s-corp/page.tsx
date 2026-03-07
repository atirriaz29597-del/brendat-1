"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Phone, MessageCircle, Shield, DollarSign, FileText, Building2, Users, Scale, ChevronRight, ChevronDown, ArrowRight, Star, Clock, HelpCircle, Briefcase, TrendingUp, Zap } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

/* ── State Fees Data ──────────────────────────────────────── */
const STATE_FEES: Record<string, number> = {
  Alabama: 236, Alaska: 250, Arizona: 50, Arkansas: 45, California: 70,
  Colorado: 50, Connecticut: 120, Delaware: 90, Florida: 125, Georgia: 100,
  Hawaii: 50, Idaho: 100, Illinois: 150, Indiana: 95, Iowa: 50, Kansas: 160,
  Louisiana: 75, Maine: 175, Maryland: 100, Massachusetts: 500, Michigan: 50,
  Minnesota: 155, Mississippi: 50, Missouri: 50, Montana: 70, Nebraska: 105,
  Nevada: 75, "New Hampshire": 100, "New Jersey": 125, "New Mexico": 50,
  "New York": 200, "North Carolina": 125, "North Dakota": 135, Ohio: 99,
  Oklahoma: 100, Oregon: 100, Pennsylvania: 125, "Rhode Island": 150,
  "South Carolina": 110, "South Dakota": 150, Tennessee: 300, Texas: 300,
  Utah: 72, Vermont: 125, Virginia: 100, Washington: 200, "Washington DC": 220,
  "West Virginia": 100, Wisconsin: 130, Wyoming: 100,
};

/* ── Why Choose Data ──────────────────────────────────────── */
const whyChoose = [
  {
    icon: Shield,
    title: "USA-Specific Expertise",
    description: "Get your corporation formed right the first time with attorneys who know USA laws inside out.",
  },
  {
    icon: FileText,
    title: "S-Corp Election Assistance",
    description: "Easily set up and file your S-Corp election without confusing IRS paperwork.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Form your corporation quickly, with expedited service when you need it done fast.",
  },
  {
    icon: Briefcase,
    title: "Full Compliance Support",
    description: "We ensure your corporate filings meet all USA Secretary of State requirements.",
  },
];

/* ── Why Form Data ────────────────────────────────────────── */
const whyForm = [
  {
    icon: Shield,
    title: "Separate Legal Entity",
    description: "A corporation is legally distinct from its owners, offering strong liability protection.",
  },
  {
    icon: TrendingUp,
    title: "Attract Investors & Issue Shares",
    description: "Corporations can raise capital by selling shares; an ideal choice for growth-oriented startups.",
  },
  {
    icon: Building2,
    title: "Structure & Scalability",
    description: "With bylaws, shareholder meetings, and clear roles, corporations are built to scale and operate professionally.",
  },
  {
    icon: DollarSign,
    title: "S-Corp & C-Corp Tax Options",
    description: "Choose C-Corp for reinvestment and growth, or elect S-Corp status to enjoy pass-through taxation (if eligible).",
  },
];

/* ── S Corp vs C Corp Comparison ──────────────────────────── */
const comparisonData = {
  sCorp: {
    name: "S Corporation",
    features: [
      { title: "Pass-Through Tax Advantage", description: "Profits and losses go directly to shareholders\u2019 personal tax returns." },
      { title: "Designed for Small Business Agility", description: "Small to mid-sized U.S. businesses that meet shareholder limits." },
      { title: "U.S. Shareholders Only", description: "Limited to U.S. citizens/residents, max 100 shareholders allowed." },
      { title: "Single Stock Class Restriction", description: "Only one class of stock permitted." },
      { title: "Requires S-Corp Election", description: "Must file IRS Form 2553 to elect S-Corp status." },
    ],
  },
  cCorp: {
    name: "C Corporation",
    features: [
      { title: "Double Taxation Model", description: "Corporate profits are taxed at the company level, plus shareholders pay taxes on dividends (double taxation)." },
      { title: "Built for High-Growth Enterprises", description: "High-growth companies, venture-backed startups, or businesses preparing for IPO." },
      { title: "Open to Global Investors", description: "No restrictions on the number, type, or nationality of shareholders." },
      { title: "Multiple Stock Classes Allowed", description: "Can issue multiple classes of stock with varying rights and privileges." },
      { title: "Default Corporate Structure", description: "No special IRS election needed. This is the default corporation type." },
    ],
  },
};

/* ── Steps Data ───────────────────────────────────────────── */
const steps = [
  {
    number: "01",
    title: "Tell Us About Your Corporation",
    description: "Choose between C-Corp and S-Corp. Our USA business attorneys guide you through what works best for your business goals.",
  },
  {
    number: "02",
    title: "We File Your Corporate Formation Documents",
    description: "Our expert attorneys prepare and file your Certificate of Corporate Formation with the USA Secretary of State.",
  },
  {
    number: "03",
    title: "Get Your EIN & Corporate Kit",
    description: "Includes your federal tax ID, bylaws, share certificates, and initial resolutions.",
  },
  {
    number: "04",
    title: "Stay Compliant Year After Year",
    description: "Annual reports, franchise tax filings, and ongoing legal compliance are handled for you.",
  },
];

/* ── FAQ Data ─────────────────────────────────────────────── */
const faqs = [
  {
    question: "What are the basic steps for USA corporation formation?",
    answer: "Choose a name, appoint a registered agent, file your Certificate of Formation with the USA Secretary of State, create bylaws, and apply for an EIN.",
  },
  {
    question: "What are corporate formation documents?",
    answer: "Corporate formation documents include the Certificate of Formation (or Articles of Incorporation), bylaws, initial resolutions, stock certificates, and the EIN application.",
  },
  {
    question: "What\u2019s the difference between C-Corp and S-Corp formation?",
    answer: "A C-Corp is the default corporate structure with double taxation, while an S-Corp requires an IRS election (Form 2553) and offers pass-through taxation. S-Corps have restrictions on shareholder count and types.",
  },
  {
    question: "Do I need a lawyer to form a corporation in USA?",
    answer: "While not legally required, a corporate formation attorney can help you navigate complex requirements like bylaws, shareholder agreements, and tax elections to avoid costly mistakes.",
  },
  {
    question: "Can I convert my LLC to a C-Corp later?",
    answer: "Yes, it\u2019s possible to convert your LLC to a corporation. The process involves filing new formation documents and potentially restructuring ownership. Our attorneys can guide you through the conversion.",
  },
  {
    question: "How fast can I get my corporation formed?",
    answer: "Standard processing takes a few business days to a few weeks depending on the state. Expedited options are available for faster turnaround.",
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
    text: "We used Brendat for our estate planning documents, and I can\u2019t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of.",
  },
];

/* ── Legal Plan Items ─────────────────────────────────────── */
const legalPlanItems = [
  "Choose between C-Corp and S-Corp formation",
  "Draft custom bylaws and shareholder agreements",
  "Set up founder equity and investor shares",
  "Prepare your corporate governance documents",
  "Maintain IRS and USA Secretary of State compliance",
];

/* ── Requirements Items ───────────────────────────────────── */
const requirementItems = [
  "Creating corporate bylaws",
  "Conducting annual shareholder meetings",
  "Documenting major decisions through written corporate resolutions",
  "Submitting annual reports to the state",
];

export default function CorporationPage() {
  const [selectedEntity, setSelectedEntity] = useState("C-Corporation");
  const [selectedState, setSelectedState] = useState("");
  const router = useRouter();

  const handleStartBusiness = () => {
    if (selectedEntity && selectedState) {
      router.push(`/order/step2?entity=${encodeURIComponent(selectedEntity)}&state=${encodeURIComponent(selectedState)}`);
    }
  };

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
              Stress Free S &amp; C Corporation Formation Service USA
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Looking for reliable S &amp; C corporation formation services in USA? We make starting your corporation simple, stress-free, and legally sound. From preparing and filing your corporate formation documents to ensuring full US compliance, our corporate formation attorneys in USA handle every detail so you can focus on growing your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="#start-order"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("start-order")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all text-lg"
              >
                <Briefcase className="w-5 h-5" />
                Start My Corporation
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Talk to an Agent
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Phone className="w-5 h-5 text-accent" />
              <span>Have Questions? Call</span>
              <a href="tel:3032468693" className="font-bold text-accent hover:underline">(303) 246-8693</a>
              <span>to Speak with a Corporate Formation Lawyer.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Section (Top Reasons) ────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Choose Brendat&apos;s Corporate Formation Services in US?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChoose.map((reason) => {
              const Icon = reason.icon;
              return (
                <div key={reason.title} className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-accent/20 transition-all">
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
                <p className="text-white/80">We&apos;re committed to the highest quality and accuracy. Whether you&apos;re launching your first venture or expanding your portfolio, we&apos;ll help you start strong and protect your future.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Is a Corporation Section ───────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                What is a Corporation?
              </h2>
              <p className="text-gray-600 mb-6">
                A corporation is a legal entity that exists separately from its owners, providing strong liability protection and a professional business structure. In USA, corporations are a popular choice for entrepreneurs, professional firms, and investment groups looking to operate at scale while safeguarding personal assets.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you&apos;re considering USA corporation formation, an S-Corp, or a C-Corp, this structure allows you to issue shares, attract investors, and establish long-term credibility in the marketplace.
              </p>
              <Link
                href="#start-order"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-accent/20 transition-all"
              >
                Start My Corporation
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                  alt="C Corp Formation in USA"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">C Corp Formation in USA</p>
                        <p className="text-sm text-gray-500">Professional corporate structure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Form a Corporation Section ──────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Form a Corporation in USA?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Corporations offer robust legal protection, strong credibility, and built-in structures for future growth. They&apos;re ideal for startups, investors, and businesses planning to scale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyForm.map((reason) => {
              const Icon = reason.icon;
              return (
                <div key={reason.title} className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-accent/20 transition-all">
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

      {/* ── Work With Attorney Section ──────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Work With a US-Based Corporate Formation Attorney
              </h2>
              <p className="text-gray-600 mb-6">
                Corporations come with more formalities than LLCs, but that&apos;s what makes them powerful. Having a knowledgeable corporate formation attorney in USA can protect you from costly missteps and help structure your business for the long run.
              </p>
              <p className="text-gray-700 font-semibold mb-4">Our Legal plan connects you with a US-based lawyer to help you:</p>
              <ul className="space-y-3 mb-8">
                {legalPlanItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <ChevronRight className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
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
                  <h4 className="font-bold text-gray-900">Corporate Formation Attorney in USA</h4>
                  <p className="text-sm text-gray-500">Corporate Formation Services</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">Corporate Formation Requirements in USA</h4>
                <p className="text-sm text-gray-600 mb-4">
                  When starting a corporation in USA, certain legal and procedural steps are essential to stay compliant. These often include:
                </p>
                <ul className="space-y-3">
                  {requirementItems.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  Our USA corporate formation services make the process smooth and efficient, providing everything you need to set up your corporation correctly.
                </p>
                <Link
                  href="#start-order"
                  className="block w-full mt-6 text-center bg-accent hover:bg-accent-dark text-white font-bold py-3 rounded-xl transition-all"
                >
                  Customize My Package
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S Corp vs C Corp Comparison ─────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              S Corporation vs. C Corporation: What&apos;s the Difference?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choosing between a C-Corp and an S-Corp is one of the most important decisions you&apos;ll make when starting your business. While both offer liability protection and a formal corporate structure, they differ in how they&apos;re taxed, how profits are distributed, and the rules for shareholders.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* S Corporation */}
            <div className="bg-gradient-to-b from-accent/5 to-accent/10 rounded-2xl p-6 border-2 border-accent">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{comparisonData.sCorp.name}</h3>
              </div>
              <div className="space-y-4">
                {comparisonData.sCorp.features.map((feature) => (
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
            {/* C Corporation */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{comparisonData.cCorp.name}</h3>
              </div>
              <div className="space-y-4">
                {comparisonData.cCorp.features.map((feature) => (
                  <div key={feature.title} className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-12 bg-accent/5 rounded-2xl p-8 border border-accent/20">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Not Sure Which Entity to Choose?</h3>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-accent/20 transition-all mt-4"
            >
              Get Help Choosing My Corporation Type
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4 Easy Steps Section ───────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              How It Works?
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

      {/* ── FAQ Section ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Frequently Asked Questions
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Our Reviews</h2>
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
      {/* ── Start Your Business Section ────────────────────── */}
      <section className="py-20 bg-white" id="start-order">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Start Your Corporation Today
            </h2>
            <p className="text-gray-600 text-base max-w-lg leading-relaxed">
              Choose your entity type and state to begin the formation process.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 md:p-10 max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              {/* Pick Entity */}
              <div>
                <div className="flex items-center gap-3 border border-accent rounded-xl px-4 py-3.5 bg-gray-50 focus-within:ring-2 ring-accent/30 transition-all">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-white text-xs font-bold shrink-0">1</span>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">Entity Type</span>
                    <select
                      value={selectedEntity}
                      onChange={(e) => setSelectedEntity(e.target.value)}
                      className="bg-transparent text-black border-none focus:outline-none w-full font-semibold appearance-none cursor-pointer text-sm"
                    >
                      <option value="">Pick Entity</option>
                      <option>LLC</option>
                      <option>S-Corporation</option>
                      <option>C-Corporation</option>
                      <option>Nonprofit</option>
                    </select>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 pointer-events-none" />
                </div>
              </div>

              {/* Select State */}
              <div>
                <div className="flex items-center gap-3 border border-accent rounded-xl px-4 py-3.5 bg-gray-50 focus-within:ring-2 ring-accent/30 transition-all">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent text-white text-xs font-bold shrink-0">2</span>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">State</span>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="bg-transparent text-black border-none focus:outline-none w-full font-semibold appearance-none cursor-pointer text-sm"
                    >
                      <option value="">Select State</option>
                      {Object.keys(STATE_FEES).map((st) => (
                        <option key={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 pointer-events-none" />
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleStartBusiness}
                disabled={!selectedEntity || !selectedState}
                className="bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl px-6 py-3.5 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/25 text-sm whitespace-nowrap"
              >
                Start My Business <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* ── Contact/CTA Section ────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
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
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-300 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Call An Agent</h3>
                <a href="tel:3032468693" className="text-2xl font-black text-accent hover:underline block mt-1">(303) 246-8693</a>
                <p className="text-sm text-gray-500 mt-1">Mon–Fri 5 am–7 pm PT &nbsp;·&nbsp; Sat–Sun 7 am–4 pm PT</p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-5 py-2.5 rounded-xl mt-4 text-sm shadow-md shadow-accent/20 transition-all">
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
            <div>
              <span className="inline-block text-xs font-black uppercase tracking-widest text-accent mb-4">Get Started Today</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-6">Launch your Business in USA</h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">Dreaming to start a business in USA? At Brendat, we believe every entrepreneur deserves expert assistance and legal backup. Our vetted network of USA-based attorneys is here to guide you.</p>
              <ul className="space-y-5">
                {[
                  { icon: FileText, text: "50 State Filing Compliance" },
                  { icon: Shield, text: "Registered Agent Service Included" },
                  { icon: Check, text: "Fast Transparent Service" },
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
            <div className="bg-white rounded-3xl shadow-xl border border-gray-300 p-8 md:p-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push("/thank-you");
                }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                    <input type="text" placeholder="John" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <input type="tel" placeholder="(555) 000-0000" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                  <textarea rows={4} placeholder="Tell us about your business idea..." className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition resize-none" />
                </div>
                <button type="submit" className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3.5 rounded-xl shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/30 transition-all text-sm">Send Message</button>
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
