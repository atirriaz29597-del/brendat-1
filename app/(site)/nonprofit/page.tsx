"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Check,
  Phone,
  MessageCircle,
  Shield,
  Scale,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Star,
  Clock,
  HelpCircle,
  Building,
  Zap,
  FileCheck,
  Landmark,
  BookOpen,
  HeartHandshake,
  GanttChartSquare,
  FileText,
} from "lucide-react";
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

const bestServiceItems = [
  {
    icon: Landmark,
    title: "USA-Specific Expertise",
    description:
      "We know the ins and outs of USA nonprofit laws, so your formation process is fast, accurate, and hassle-free.",
  },
  {
    icon: Scale,
    title: "Optional Attorney Guidance",
    description:
      "Get expert legal insight from the start, ensuring every step you take is the right one.",
  },
  {
    icon: FileCheck,
    title: "Transparent Pricing, No Hidden Fees",
    description:
      "You’ll know exactly what you’re paying for, no surprises, no fine-print gimmicks.",
  },
  {
    icon: FileText,
    title: "Sample USA Nonprofit Certificate",
    description:
      "We provide ready-to-use, attorney-approved templates tailored for USA regulations.",
  },
  {
    icon: HeartHandshake,
    title: "Comprehensive Coverage",
    description:
      "Whether you’re launching a ministry, charity, or grassroots organization, we’ve got you covered.",
  },
];

const nonprofitChecklist = [
  "Choose an available nonprofit name",
  "Select a registered agent with a USA address",
  "File your Certificate of Formation (Nonprofit)",
  "Create nonprofit bylaws and board resolutions",
  "Apply for an EIN",
  "Apply for 501(c)(3) tax-exempt status",
  "Register for any required local licenses",
  "Stay compliant with annual reports and IRS filings",
];

const whyStartItems = [
  {
    icon: Shield,
    title: "Eligibility for 501(c)(3) Tax Exemption",
    description:
      "Establishing a nonprofit corporation is required to apply for federal and state tax exemptions.",
  },
  {
    icon: Building,
    title: "Liability Protection for Directors and Officers",
    description:
      "A USA nonprofit corporation shields personal assets from legal risks tied to your organization.",
  },
  {
    icon: Landmark,
    title: "Public & Private Grant Eligibility",
    description:
      "Registered nonprofits can apply for local, state, and federal grant funding.",
  },
  {
    icon: BookOpen,
    title: "Credibility with Donors & the Community",
    description:
      "Having formal nonprofit status builds trust with donors, volunteers, and community partners.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Conduct A Needs Assessment",
    description:
      "Outline your nonprofit’s purpose, identify the challenges it can solve, and highlight the opportunities to create change. This helps clarify your mission, leverage your strengths, address weaknesses, and ensure your efforts truly meet a community need.",
  },
  {
    number: "02",
    title: "Choose Your Nonprofit Type",
    description:
      "Religious, educational, charitable, or scientific, we’ll help define your mission and structure.",
  },
  {
    number: "03",
    title: "Prepare & File Your Certificate of Formation",
    description:
      "We file your USA Certificate of Formation for Nonprofit Corporation with the Secretary of State and provide a downloadable copy for your records.",
  },
  {
    number: "04",
    title: "Get Your EIN and Draft Bylaws",
    description:
      "These are required to open a bank account and apply for tax exemption.",
  },
  {
    number: "05",
    title: "Apply for 501(c)(3) Tax-Exempt Status",
    description:
      "Our Legal plan includes step-by-step guidance on IRS applications and document review by a licensed nonprofit formation lawyer in USA.",
  },
];

const nonprofitTypes = [
  {
    title: "Nonprofit corporation",
    description:
      "Most popular nonprofit type, eligible for 501(c)(3) tax-exempt status, liability protection, and grants. Ideal for charities, foundations, and educational groups.",
  },
  {
    title: "Nonprofit LLC",
    description:
      "Can only be recognized as a 501(c)(3) if all members are 501(c)(3) nonprofits. Offers liability protection while enabling collaboration.",
  },
  {
    title: "Nonprofit association",
    description:
      "Two or more people working for public benefit without forming a legal entity. Quick to set up, but limited protection and no direct 501(c)(3) status.",
  },
];

const advantages = [
  "Create Real Impact: Tackle meaningful issues, spark change in your community, and give back in a lasting way.",
  "Enjoy 501(c)(3) Tax-Exempt Benefits: If eligible, your organization can operate free from federal income tax, keeping more resources for your cause.",
  "Access Grants and Funding: Open doors to exclusive government grants, low-interest loans, and other funding opportunities.",
  "Receive Support from Other Nonprofits: Qualify for fiscal sponsorships, allowing you to accept tax-exempt funds from established organizations.",
  "Earn a Fair Salary: As part of your operating expenses, you can pay yourself and your team competitively while still advancing your mission.",
];

const disadvantages = [
  "Detailed Recordkeeping: You’ll need to track every donation, grant, expense, and financial transaction for accountability.",
  "IRS Annual Filing: Maintain your tax-exempt status by filing the required information return each year.",
  "Strict Governance Rules: Operate in compliance with bylaws that define how your nonprofit is managed.",
  "Public Transparency: Salaries and certain financial records must be open for public inspection, ensuring trust but also requiring careful planning.",
];

const faqs = [
  {
    question: "What’s required to start a nonprofit corporation in USA?",
    answer:
      "You need a name, a USA-based registered agent, a completed nonprofit certificate of formation in USA, nonprofit bylaws, an EIN, and IRS tax exemption (if needed).",
  },
  { question: "What is the Certificate of Formation for a USA nonprofit?", answer: "" },
  { question: "Do I need an attorney to form a nonprofit?", answer: "" },
  { question: "How long does it take to form a nonprofit in USA ?", answer: "" },
  { question: "Can I file for 501(c)(3) on my own?", answer: "" },
  { question: "Are there any annual compliance requirements?", answer: "" },
];

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
    text: "We used Brendat for our estate planning documents, and I can’t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of.",
  },
];

export default function NonprofitPage() {
  const [selectedEntity, setSelectedEntity] = useState("Nonprofit");
  const [selectedState, setSelectedState] = useState("");
  const router = useRouter();
  const stateFee = selectedState ? (STATE_FEES[selectedState] ?? 0) : 0;
  const sortedStates = Object.keys(STATE_FEES).sort();

  const handleStartBusiness = () => {
    if (selectedEntity && selectedState) {
      router.push(`/order/step2?entity=${encodeURIComponent(selectedEntity)}&state=${encodeURIComponent(selectedState)}`);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 overflow-hidden">
          <HeroAvatars />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,0,0.08),transparent_50%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                Nonprofit Formation Services in USA to Turn Your Mission into Reality
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Whether you’re ready to start a nonprofit on your own or want guidance from a Nonprofit Corporation Attorney in USA, we’ve got your back. From preparing your Certificate of Formation for a nonprofit corporation in USA to structuring your bylaws and applying for 501(c)(3) status, Brendat guides you through every step of the process.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="#start-order"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("start-order")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all text-lg"
                >
                  Start My USA Nonprofit
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg"
                >
                  Talk to a Nonprofit Formation Attorney
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white relative overflow-hidden" id="start-order">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Start Your Nonprofit Formation Today
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select your entity type and state to see pricing and continue your filing.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Entity Type</label>
                  <div className="relative">
                    <select
                      value={selectedEntity}
                      onChange={(e) => setSelectedEntity(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 pr-12 text-gray-900 font-medium focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all cursor-pointer"
                    >
                      <option value="">Select entity type...</option>
                      <option value="Nonprofit">Nonprofit</option>
                      <option value="LLC">Limited Liability Company (LLC)</option>
                      <option value="C-Corporation">Corporation (C-Corp)</option>
                      <option value="S-Corporation">S-Corporation</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2">State of Formation</label>
                  <div className="relative">
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 pr-12 text-gray-900 font-medium focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all cursor-pointer"
                    >
                      <option value="">Select state...</option>
                      {sortedStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 mb-8">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Estimated state filing fee</span>
                  <span className="font-semibold text-gray-900">{selectedState ? `$${stateFee}` : "Select a state"}</span>
                </div>
                <p className="text-xs text-gray-500">Final pricing may vary based on state-specific filing requirements.</p>
              </div>

              <button
                onClick={handleStartBusiness}
                disabled={!selectedEntity || !selectedState}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                  selectedEntity && selectedState
                    ? "bg-accent hover:bg-accent-dark text-white shadow-accent/25"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue to Step 2
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                What Makes Us the Best Nonprofit Formation Service in USA?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bestServiceItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-accent/20 transition-all"
                  >
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">100% Accurate Filing Guarantee</h3>
                <p className="text-white/80 max-w-3xl">
                  We’re committed to the highest quality and accuracy. If your filing is rejected or incorrect due to our error, we’ll correct it with the government agency at no additional cost to you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-16">
              Things You Should Know Before Hiring Our Nonprofit Formation Services in USA
            </h2>

            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 mb-10">
              <h3 className="text-2xl font-black text-gray-900 mb-4">
                Nonprofit Formation Checklist for USA, USA
              </h3>
              <p className="text-gray-600 mb-6">
                Here’s a simplified version of what you’ll need to form your nonprofit in USA legally:
              </p>
              <ul className="space-y-4 mb-6">
                {nonprofitChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <ChevronRight className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 mb-8">
                We provide templates, checklists, and personalized support for each step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#start-order"
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all text-lg"
                >
                  Start My USA Nonprofit
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg"
                >
                  Nonprofit Corporation Registration Checklist
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg"
                >
                  501 C3 Nonprofit Registration Attorney
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h3 className="text-2xl font-black text-gray-900 mb-4">What qualifies as a 501(c)(3) nonprofit?</h3>
                <p className="text-gray-600">
                  To earn 501(c)(3) status, your organization must operate solely for approved purposes, like religious, charitable, scientific, or educational work. You’ll also need to keep things transparent with annual IRS filings. This status doesn’t just validate your mission, it unlocks powerful tax benefits that help you do more good.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h3 className="text-2xl font-black text-gray-900 mb-4">What a 501(c)(3) Can’t Do?</h3>
                <p className="text-gray-600">
                  Keeping your tax-exempt status means playing by the rules. You can’t share profits with private individuals or shareholders, dive into political campaigns, or make lobbying your main focus. And above all, you must stay true to your declared charitable mission—because that’s the heart of your nonprofit’s legal standing.
                </p>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link
                href="#start-order"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all text-lg"
              >
                Customize My Package
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Why Start a Nonprofit Corporation in USA?
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Forming a nonprofit is the first step in gaining legal recognition and tax-exempt status for your mission-driven organization. Here’s what makes it worthwhile:
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {whyStartItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                How Our USA Nonprofit Formation Services Work
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Whether you’re running a food bank, community center, or arts nonprofit, our USA nonprofit formation services help bring your mission to life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-14">
              {processSteps.map((step) => (
                <div key={step.number} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center font-black text-lg mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop"
                alt="Nonprofit Registration Services Image"
                width={500}
                height={650}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">What are the Types of Nonprofits?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              {nonprofitTypes.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="#start-order"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all text-lg"
              >
                Start My Nonprofit
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-6">
              Advantages and disadvantages of a nonprofit
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-black text-gray-900 mb-4">Advantages of a Nonprofit in USA</h3>
                <p className="text-gray-600 mb-6">
                  Starting a nonprofit isn’t just about paperwork; it’s about building something that truly makes a difference. Here’s why so many people choose this path:
                </p>
                <ul className="space-y-4 mb-8">
                  {advantages.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#start-order"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all"
                >
                  Start My Nonprofit
                </Link>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-black text-gray-900 mb-4">Disadvantages of a Nonprofit in USA</h3>
                <p className="text-gray-600 mb-6">
                  While rewarding, running a nonprofit comes with responsibilities that can’t be overlooked:
                </p>
                <ul className="space-y-4 mb-8">
                  {disadvantages.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-6 py-3 rounded-xl transition-all"
                >
                  Talk to USA Nonprofit Formation Attorney
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Understanding the Difference Between a Nonprofit and a 501(c)(3)
              </h2>
              <p className="text-lg text-gray-600 max-w-5xl mx-auto">
                When it comes to nonprofit formation services in USA, it’s important to understand the distinction between a general nonprofit and a 501(c)(3) nonprofit corporation. At Brendat, we guide you through every step of the nonprofit corporation formation process, from preparing your nonprofit formation documents and certificate of formation nonprofit corporation USA , to ensuring your application meets all IRS requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Nonprofit (without 501(c)(3) status)</h3>
                <div className="space-y-5">
                  <div>
                    <h4 className="font-bold text-gray-900">Paperwork:</h4>
                    <p className="text-sm text-gray-600">
                      Skip the IRS tax-exempt application, saving time and filing fees, though basic state filings are still required.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Donations/grants:</h4>
                    <p className="text-sm text-gray-600">
                      Cannot accept tax-deductible contributions from donors or qualify for certain grants.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Earnings:</h4>
                    <p className="text-sm text-gray-600">
                      Subject to federal income tax on any revenue or earnings generated.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border-2 border-accent shadow-xl">
                <h3 className="text-2xl font-black text-gray-900 mb-6">501(c)(3) organization</h3>
                <div className="space-y-5">
                  <div>
                    <h4 className="font-bold text-gray-900">Paperwork:</h4>
                    <p className="text-sm text-gray-600">
                      Must file annually with the IRS to maintain tax-exempt status and remain in compliance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Donations/grants:</h4>
                    <p className="text-sm text-gray-600">
                      Eligible to receive tax-deductible donations and access grants reserved for 501(c)(3) organizations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Earnings:</h4>
                    <p className="text-sm text-gray-600">
                      Income is generally exempt from federal taxes, allowing more resources to support your mission.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-black text-gray-900 mb-3">Still Not Sure About 501(c)(3) Status Yet?</h3>
              <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
                Start your nonprofit today with Brendat, and choose to apply for 501(c)(3) tax-exempt status whenever you’re ready, no pressure, no delays.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="#start-order"
                  className="bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all text-lg"
                >
                  Start My USA Nonprofit
                </Link>
                <Link
                  href="/contact"
                  className="bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg"
                >
                  Talk to a USA Nonprofit Formation Attorney
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Frequently asked questions</h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((f, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="flex items-start gap-3">
                    <HelpCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                    <span className="font-bold text-gray-900">{f.question}</span>
                  </h3>
                  {f.answer && <p className="text-gray-600 mt-3 pl-9">{f.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Our Reviews</h2>
              <p className="text-lg text-gray-600">What our customers are saying?</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((r) => (
                <div key={r.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 font-medium leading-relaxed">“{r.text}”</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                      {r.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{r.name}</p>
                      <p className="text-sm text-gray-500">{r.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-300 flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Questions?</h3>
                  <p className="text-sm text-gray-600 mt-1 mb-3">Get expert support for legal matters with our attorney by your side.</p>
                  <Link href="/contact" className="text-accent font-bold hover:underline">
                    Ask An Attorney
                  </Link>
                  <p className="text-sm text-gray-500 mt-2">Mon–Fri 5 am–7 pm PT</p>
                  <p className="text-sm text-gray-500">Sat–Sun 7 am–4 pm PT</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-300 flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Call An Agent At</h3>
                  <a href="tel:3032468693" className="text-2xl font-black text-accent hover:underline block mt-1">
                    (303) 246-8693
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Mon–Fri 5 am–7 pm PT</p>
                  <p className="text-sm text-gray-500">Sat–Sun 7 am–4 pm PT</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-5 py-2.5 rounded-xl mt-4 text-sm shadow-md transition-all"
                  >
                    Get legal help
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
