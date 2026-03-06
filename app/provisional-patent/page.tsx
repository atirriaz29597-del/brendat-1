"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Clock,
  FileText,
  Lock,
  Globe,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  MessageCircle,
  Phone,
  ChevronDown,
  ChevronRight,
  Star,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

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

export default function ProvisionalPatentPage() {
  const router = useRouter();
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  const handleStartBusiness = () => {
    const params = new URLSearchParams();
    if (selectedEntity) params.set("entity", selectedEntity);
    if (selectedState) params.set("state", selectedState);
    router.push(`/order/step2?${params.toString()}`);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const services = [
    "Submit your application online with our support",
    "We ensure it meets federal requirements and deadlines",
    "Get legal review and drafting support from a USA provisional patent attorney",
    "Assistance with technical sketches and visual documentation",
    "Know how and when to use the “Patent Pending” label legally",
    "Help transitioning to a full patent before the 12-month deadline",
  ];

  const whyFile = [
    {
      title: "Lock in Your Priority Date",
      description: "The first inventor to file often wins patent rights. Filing a provisional application ensures you secure an official USPTO filing date, strengthening your claim against competitors who might try to file later.",
      icon: <Clock className="w-6 h-6 text-accent" />,
    },
    {
      title: "Market with Confidence",
      description: "Once filed, you can legally mark your invention as “Patent Pending,” signaling to potential competitors that your idea is protected while you pitch, market, or seek funding.",
      icon: <Shield className="w-6 h-6 text-accent" />,
    },
    {
      title: "Shield Your Idea from Copycats",
      description: "Public disclosure without protection can leave your invention exposed. A provisional patent application acts as a barrier, deterring others from copying or claiming your work.",
      icon: <Lock className="w-6 h-6 text-accent" />,
    },
    {
      title: "Avoid Unintended Loss of Rights",
      description: "U.S. patent law is strict about disclosure before filing. By securing a provisional patent early, you prevent accidental forfeiture of your rights while still exploring partnerships, sales, or demonstrations.",
      icon: <AlertTriangle className="w-6 h-6 text-accent" />,
    },
    {
      title: "Buy Maturing Time for Your Idea",
      description: "Developing a prototype, gathering resources, or securing investors takes time. A provisional application grants you up to 12 months of breathing room to prepare a strong utility patent filing.",
      icon: <Zap className="w-6 h-6 text-accent" />,
    },
  ];

  const whenToRegister = [
    {
      id: "01",
      title: "Before Going Public",
      description: "File first to protect your rights before sharing with investors or partners.",
    },
    {
      id: "02",
      title: "When It’s Almost Ready",
      description: "Lock in your filing date even if your invention isn’t fully complete.",
    },
    {
      id: "03",
      title: "For Low-Cost Protection",
      description: "Secure early rights without the high cost of a utility patent.",
    },
    {
      id: "04",
      title: "To Claim \u201CPatent Pending\u201D",
      description: "Add instant credibility and deter competitors with pending status.",
    },
    {
      id: "05",
      title: "While Testing the Market",
      description: "Get 12 months of protection while gauging demand and viability.",
    },
  ];

  const comparisonData = [
    {
      point: "Purpose",
      provisional: "Secure a filing date and claim \u201CPatent Pending\u201D status.",
      utility: "Obtain full legal protection for your invention",
    },
    {
      point: "Filing Cost",
      provisional: "Lower",
      utility: "Higher",
    },
    {
      point: "Examination By USPTO",
      provisional: "Not examined",
      utility: "Fully examined",
    },
    {
      point: "Legal Protection",
      provisional: "Temporary (12 months only)",
      utility: "Full patent rights if granted",
    },
    {
      point: "Time to Prepare",
      provisional: "Faster and can be filed with a rough concept",
      utility: "Requires a fully developed invention",
    },
    {
      point: "Duration of Protection",
      provisional: "12 months (non-renewable)",
      utility: "20 years from the filing date if granted",
    },
    {
      point: "Public Disclosure",
      provisional: "Not published unless later converted",
      utility: "Published by USPTO after 18 months",
    },
    {
      point: "Best For",
      provisional: "Early-stage inventors, product development phase, securing priority date",
      utility: "Final version of invention, ready to commercialize or license",
    },
    {
      point: "Includes Claims",
      provisional: "Optional or minimal",
      utility: "Detailed, formal claims required",
    },
    {
      point: "Legal Enforcement",
      provisional: "Cannot enforce rights in court",
      utility: "Enforceable patent rights if approved",
    },
  ];

  const faqs = [
    {
      question: "What is the difference between a provisional and a non-provisional (utility) patent?",
      answer: "A provisional patent is a temporary application that holds your filing date for one year. It\u2019s not examined or granted as a complete patent. Within that year, you must file a non-provisional patent in USA to continue protection.",
    },
    {
      question: "Can I file a provisional patent online?",
      answer: "Yes, the provisional patent application can be filed entirely online through the USPTO's electronic filing system. Our service streamlines this process for you.",
    },
    {
      question: "Do I need a lawyer to file a provisional patent?",
      answer: "While not legally required, having a patent attorney review or draft your application ensures it adequately describes your invention to support a later utility patent filing.",
    },
    {
      question: "Can I sell or license my invention with just a provisional patent?",
      answer: "Yes, having a provisional patent filed allows you to mark your invention as 'Patent Pending', which can make it more attractive to potential buyers or licensees as the priority date is secured.",
    },
    {
      question: "What happens after I file a provisional patent?",
      answer: "After filing, you have 12 months to further develop your invention, test the market, or seek funding. Before the 12-month period expires, you must file a non-provisional utility patent application to maintain your priority date.",
    },
  ];

  const reviews = [
    {
      name: "Samantha P.",
      role: "LLC Customer",
      text: "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!",
    },
    {
      name: "Carlos M.",
      role: "Trademark Customer",
      text: "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way.",
    },
    {
      name: "Nell C.",
      role: "Last Will Customer",
      text: "We used Brendat for our estate planning documents, and I can\u2019t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 overflow-hidden">
        <HeroAvatars />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,0,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                  Secure Your Idea with Provisional Patent Registration in USA
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Are you an inventor or startup with a great idea, but not ready for a complete utility patent? Secure your invention quickly and affordably with a provisional patent registration application online or with attorney support in USA.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/order/step2" className="text-center bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                    File My Provisional Patent
                  </Link>
                  <Link href="/contact" className="text-center bg-transparent border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transition">
                    Talk to a Patent Attorney
                  </Link>
                </div>
             </div>
             <div>
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -mr-8 -mt-8" />
                   <h3 className="text-2xl font-black text-gray-900 mb-4">What&apos;s Included</h3>
                   <div className="space-y-4">
                      <ul className="space-y-3">
                        {services.map((service, i) => (
                           <li key={i} className="flex gap-3 text-sm text-gray-600">
                              <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                              {service}
                           </li>
                        ))}
                      </ul>
                   </div>
                </div>
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

      {/* Why File Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why File a Provisional Patent Application in USA?</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Bringing an invention to life takes time, resources, and the right legal protection. A provisional patent application serves as your first line of defense, giving you the ability to claim “Patent Pending” while securing an early filing date with the USPTO. This temporary safeguard buys you up to 12 months to refine your idea, seek investors, or prepare a full utility patent application.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyFile.map((item, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When Should You Register */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-black mb-6">When Should You Register a Provisional Patent in USA?</h2>
             <p className="text-lg text-gray-300 max-w-3xl mx-auto">
               Timing can make or break your intellectual property strategy. File too early, and you may waste resources on an unfinished idea. Wait too long, and you risk losing rights to public disclosures, competitor filings, or investor conversations. Provisional patent registration in USA, USA , strikes the perfect balance, giving you fast, affordable protection and a critical head start with the USPTO while you refine, test, and fund your invention.
             </p>
           </div>
           
           <div className="grid md:grid-cols-5 gap-6">
              {whenToRegister.map((step, index) => (
                 <div key={index} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:bg-gray-700 transition">
                    <span className="text-5xl font-black text-gray-700 mb-4 block opacity-50">{step.id}</span>
                    <h3 className="font-bold text-lg text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-12">
               Understanding the Difference Between Provisional vs Utility Patent: Which One Do You Need?
            </h2>
            
            <div className="overflow-x-auto mb-12">
                <table className="w-full border-collapse bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 min-w-[800px]">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="p-6 text-left font-bold text-lg w-1/4">Point of Comparison</th>
                            <th className="p-6 text-left font-bold text-lg w-1/3 text-accent">Provisional Patent Application</th>
                            <th className="p-6 text-left font-bold text-lg w-1/3">Utility Patent Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonData.map((row, i) => (
                            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                <td className="p-6 font-bold text-gray-900">{row.point}</td>
                                <td className="p-6 text-gray-700 font-medium">{row.provisional}</td>
                                <td className="p-6 text-gray-600">{row.utility}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-accent/5 rounded-3xl p-8 md:p-12 text-center border border-accent/10">
               <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">Need Help Deciding Which One Fits Your Invention?</h3>
               <Link href="/contact" className="inline-block bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                  Get Help From A USA Patent Lawyer
               </Link>
            </div>
         </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-12">
            What our customers
            <br />
            are saying?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="flex gap-1 text-accent mb-6">
                  {[...Array(5)].map((_, starI) => (
                    <Star key={starI} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{review.text}"</p>
                <div className="mt-auto">
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md"
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left bg-gray-50 hover:bg-gray-100 transition"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-bold text-gray-900 flex gap-3 text-lg items-center">
                    <HelpCircle className="w-6 h-6 text-accent shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      openFaqIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6 pt-4 text-gray-600 pl-16 bg-white border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA / Contact */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Questions?</h2>
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
