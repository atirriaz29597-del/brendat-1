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
  Clipboard,
  AlertTriangle,
  Building,
  Car,
  ChevronDown,
  TrendingUp,
  Clock,
  ArrowRight,
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

export default function PowerOfAttorneyPage() {
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
      title: "USA-Specific Experience",
      description: "Our attorneys draft POAs that comply with USA law and Harris County practices.",
      icon: <Scale className="w-6 h-6 text-accent" />,
    },
    {
      title: "Complete Estate Integration",
      description: "We coordinate your POA with your will, trusts, and beneficiary designations for a seamless plan.",
      icon: <FileText className="w-6 h-6 text-accent" />,
    },
    {
      title: "Convenience",
      description: 'Whether you search for "power of attorney lawyer near me" or need remote consultations, Brendat is here to help.',
      icon: <Users className="w-6 h-6 text-accent" />,
    },
    {
      title: "Flat-Fee Pricing",
      description: "Transparent fees with no hidden costs.",
      icon: <DollarSign className="w-6 h-6 text-accent" />,
    },
  ];

  const statistics = [
    {
      number: "800,000",
      label: "power of attorney customers",
      description: "Our financial power of attorney documents empower customers to take charge of their financial affairs, no matter what happens.",
    },
    {
      number: "2 million",
      label: "estate planning customers",
      description: "We provide peace of mind for families with our estate planning documents, all created by attorneys.",
    },
    {
      number: "1 estate plan",
      label: "made every 6 minutes",
      description: "Every 6 minutes our estate planning products help a customer protect what matters most.",
    },
  ];

  const whyNeed = [
    {
      title: "Ensure Healthcare Decisions Are Honored",
      description: "Appoint someone to make medical decisions if you're unable to.",
      icon: <Heart className="w-6 h-6 text-accent" />,
    },
    {
      title: "Protect Your Finances",
      description: "Empower a trusted individual to manage bank accounts, investments, or bills.",
      icon: <DollarSign className="w-6 h-6 text-accent" />,
    },
    {
      title: "Simplify Legal and Property Transactions",
      description: "From signing contracts to handling vehicle power of attorney matters, your agent can act quickly when you cannot.",
      icon: <Building className="w-6 h-6 text-accent" />,
    },
    {
      title: "Plan for Emergencies",
      description: "Avoid unnecessary delays in decision-making during illness, injury, or travel.",
      icon: <AlertTriangle className="w-6 h-6 text-accent" />,
    },
  ];

  const poaTypes = [
    {
      title: "Medical Power of Attorney",
      description: "Designates someone to make healthcare decisions on your behalf.",
      icon: <Heart className="w-6 h-6 text-accent" />,
    },
    {
      title: "Durable Financial Power of Attorney",
      description: "Grants authority over financial matters, continuing even if you become incapacitated.",
      icon: <DollarSign className="w-6 h-6 text-accent" />,
    },
    {
      title: "Limited or Special Power of Attorney",
      description: "For specific transactions, such as selling property or handling a single financial matter.",
      icon: <Clipboard className="w-6 h-6 text-accent" />,
    },
    {
      title: "Springing Power of Attorney",
      description: "Becomes effective only upon a defined condition, such as incapacity.",
      icon: <Clock className="w-6 h-6 text-accent" />,
    },
    {
      title: "Vehicle Power of Attorney",
      description: "Allows an agent to transfer or register a motor vehicle in USA.",
      icon: <Car className="w-6 h-6 text-accent" />,
    },
  ];

  const processSteps = [
    {
      title: "Select the Brendat Power of Attorney service that best fits your needs, whether it's a financial POA, medical POA, or a combined plan.",
    },
    {
      title: "Decide who will act on your behalf. Our power of attorney lawyers explain the responsibilities and limits of this important role.",
    },
    {
      title: "Your POA is prepared by a USA power of attorney lawyer, ensuring compliance with the USA Estates Code and Harris County probate practices.",
    },
    {
      title: "We guide you through the signing process, including power of attorney notary requirements, so your document is immediately enforceable.",
    },
    {
      title: "Life changes, and so should your power of attorney document. Our lawyers help you update or revoke your POA as your needs evolve.",
    },
  ];

  const faqs = [
    {
      question: "Who can serve as my Power of Attorney agent in USA?",
      answer: "After you complete your purchase, we'll prepare your paperwork. It will typically be available for download within two to three business days. Then, you can review and sign your financial power of attorney.",
    },
    {
      question: "What types of Power of Attorney are recognized in USA?",
      answer: "USA recognizes several types including Medical Power of Attorney, Durable Financial Power of Attorney, Limited or Special Power of Attorney, Springing Power of Attorney, and Vehicle Power of Attorney.",
    },
    {
      question: "Does a Power of Attorney need to be notarized in USA?",
      answer: "Yes, in USA, a Power of Attorney must be notarized to be legally valid and enforceable.",
    },
    {
      question: "Can I have more than one Power of Attorney agent?",
      answer: "Yes, you can name multiple agents to act either jointly (together) or severally (independently).",
    },
    {
      question: "Does a Power of Attorney expire?",
      answer: "A durable Power of Attorney remains effective until you revoke it or upon your death. Limited or springing POAs may have specific expiration dates.",
    },
    {
      question: "What is the difference between Power of Attorney vs. Guardianship?",
      answer: "A POA lets you choose who will act for you before a crisis happens, while guardianship is a court process that may be required if no POA is in place. Creating a POA in advance gives you control, avoids court intervention, and reduces costs for your family.",
    },
    {
      question: "Can I revoke or change my Power of Attorney?",
      answer: "Yes, as long as you are mentally competent, you can revoke or amend your Power of Attorney at any time.",
    },
    {
      question: "Does a Power of Attorney cover healthcare decisions?",
      answer: "Only if you specifically create a Medical Power of Attorney. A Financial Power of Attorney does not cover healthcare decisions.",
    },
    {
      question: "Can a Power of Attorney be used to avoid probate?",
      answer: "A POA allows your agent to manage your affairs during your lifetime, but it does not avoid probate. You need a trust or proper beneficiary designations for that.",
    },
    {
      question: "Can my Power of Attorney sell my house or car?",
      answer: "Yes, if the POA specifically grants your agent the authority to handle real estate or vehicle transactions.",
    },
    {
      question: "Do I need a lawyer to create a Power of Attorney?",
      answer: "While not required, having an attorney prepare your POA ensures it complies with USA law and properly reflects your wishes.",
    },
    {
      question: "How much does it cost to get a Power of Attorney in USA?",
      answer: "Our Basic Power of Attorney starts at $39, and our Premium package with attorney review and consultations is $49.",
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
              Power of Attorney in USA – Protect Your Finances and Healthcare Decisions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              When life takes an unexpected turn, having a legally valid Power of Attorney in USA ensures that your affairs are managed by someone you trust. At Brendat, our power of attorney lawyers prepare tailored documents that meet USA law, protect your interests, and provide peace of mind for you and your loved ones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/order/step2" className="bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20 text-center">
                Start My Power of Attorney
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition text-center">
                Talk to Power of Attorney Lawyer
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

      {/* Why Choose Brendat */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Choose Brendat&apos;s Power of Attorney Lawyers in USA?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you need a health power of attorney form, a durable financial POA, or a vehicle power of attorney for title transfers, we guide you through every option so you can make confident decisions.
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

      {/* Statistics */}
      <section className="py-20 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {statistics.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-4xl font-black text-accent">{stat.number}</span>
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <p className="text-lg font-bold text-gray-900 mb-2">{stat.label}</p>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why You Need POA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why You Need a Power of Attorney in USA
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              A Power of Attorney (POA) is a legal document that gives another person (called an &quot;agent&quot;) the authority to act on your behalf. Depending on the type you choose, this authority can be limited or broad, temporary or long-lasting.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              With the right POA in place, you can:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyNeed.map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all flex flex-col items-center text-center">
                <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/contact" className="text-accent font-bold hover:underline">
              See examples of financial power of attorney documents.
            </Link>
          </div>
        </div>
      </section>

      {/* Types of POA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Types of a Power of Attorney in USA
              </h2>
              <p className="text-lg text-gray-600">
                Different circumstances call for different documents. Brendat&apos;s attorneys prepare every type of POA recognized under USA law:
              </p>
            </div>
            <div className="hidden md:block">
              <Image
                src="/power-of-attorney-lawyers.svg"
                alt="Power of Attorney Lawyers"
                width={500}
                height={400}
                className="w-full h-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poaTypes.map((type, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
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
          <div className="text-center mt-8">
            <Link href="/contact" className="text-accent font-bold hover:underline">
              See examples of financial power of attorney documents.
            </Link>
          </div>
        </div>
      </section>

      {/* POA vs Guardianship */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-3xl p-8 md:p-12 border border-accent/20">
            <h2 className="text-3xl font-black text-gray-900 mb-4 text-center">
              Power of Attorney vs. Guardianship
            </h2>
            <p className="text-lg text-gray-700 text-center">
              Many people ask about the difference between power of attorney vs guardianship. A POA lets you choose who will act for you before a crisis happens, while guardianship is a court process that may be required if no POA is in place. Creating a POA in advance gives you control, avoids court intervention, and reduces costs for your family.
            </p>
          </div>
        </div>
      </section>

      {/* What is Financial POA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                What is a Financial Power of Attorney?
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                A Financial Power of Attorney (POA) is a legal document that lets you authorize someone you trust, your agent or attorney-in-fact, to manage your financial affairs. In USA, this can include paying bills, managing bank accounts, handling investments, filing USA, or even buying and selling property.
              </p>
              <p className="text-lg text-gray-600">
                It&apos;s an essential safeguard in case you become ill, incapacitated, or simply need someone to act on your behalf while you&apos;re unavailable. With a properly drafted POA, you stay in control by deciding exactly what powers your agent will have and when those powers begin.
              </p>
            </div>
            <div className="hidden md:block">
              <Image
                src="/financial-power-of-attorney.svg"
                alt="Financial Power of Attorney"
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

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              How the Power of Attorney Process Works with Brendat
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Creating a Power of Attorney in USA doesn&apos;t have to be complicated. Our experienced POA lawyers in USA guide you every step of the way to make sure your document is valid under USA law and reflects your exact wishes:
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black text-white">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent/5 border-y border-accent/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-8">
            Ready to Start Your Power of Attorney in USA?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order/step2" className="bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20 text-center">
              Start My Power of Attorney
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition text-center">
              Talk to USA Power of Attorney Lawyer
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              FAQs About Power of Attorney in USA
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
