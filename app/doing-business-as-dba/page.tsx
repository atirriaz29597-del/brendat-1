"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Check, Phone, MessageCircle, Shield, FileText, Scale, ChevronRight, ChevronDown, ArrowRight, Star, Clock, HelpCircle, Briefcase, Building, CreditCard, UserCheck, Zap, Globe } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

const STATE_FEES: Record<string, number> = {
  Alabama: 236, Alaska: 250, Arizona: 85, Arkansas: 45, California: 70,
  Colorado: 25, Connecticut: 80, Delaware: 90, Florida: 125, Georgia: 100,
  Hawaii: 51, Idaho: 100, Illinois: 75, Indiana: 50, Iowa: 45,
  Kansas: 55, Kentucky: 40, Louisiana: 75, Maine: 85, Maryland: 300,
  Massachusetts: 500, Michigan: 25, Minnesota: 155, Mississippi: 50, Missouri: 50,
  Montana: 35, Nebraska: 10, Nevada: 425, "New Hampshire": 100, "New Jersey": 125,
  "New Mexico": 50, "New York": 200, "North Carolina": 125, "North Dakota": 135, Ohio: 99,
  Oklahoma: 100, Oregon: 100, Pennsylvania: 70, "Rhode Island": 150, "South Carolina": 110,
  "South Dakota": 150, Tennessee: 300, Texas: 300, Utah: 59, Vermont: 125,
  Virginia: 100, Washington: 180, "West Virginia": 25, Wisconsin: 130, Wyoming: 100,
};

/* ── Data Arrays ────────────────────────────────────────── */
const whyRegister = [
  { icon: Building, title: "Operate Under a Business Name", description: "Use a brand name on marketing materials, websites, and invoices without forming a new entity." },
  { icon: Shield, title: "Meet Legal Requirements", description: "USA law requires a DBA filing if you’re doing business under any name other than your personal name or your registered business name." },
  { icon: UserCheck, title: "Flexible for Sole Proprietors", description: "DBAs are ideal for freelancers, solo founders, LLCs testing new brands, or companies with multiple product lines." },
  { icon: Briefcase, title: "Boost Your Professional Image", description: "A DBA gives you credibility with customers, banks, and suppliers—even if you don’t incorporate." },
];

const whyChoose = [
  { icon: Globe, title: "Local Expertise, Statewide Reach", description: "We know the ins and outs of new business registration in USA and the legal requirements across USA." },
  { icon: Scale, title: "Attorney-Supported Services", description: "Our USA doing business as attorneys ensure your registration complies with state laws, avoiding costly mistakes and delays." },
  { icon: Briefcase, title: "All-in-One Solutions", description: "From USA business license registration to securing your DBA name, we handle everything in one place, saving you time, money, and unnecessary hassle." },
  { icon: Zap, title: "Fast Turnaround & Ongoing Support", description: "We don’t just file your paperwork; we provide continuous support so your business stays compliant long after your DBA is approved." },
];

const pricingPlans = [
  {
    name: "Standard",
    price: "99",
    tagline: "Do it yourself",
    description: "With Brendat’s DIY option, you stay in control while still getting professional legal guidance at every step. Our attorneys will help you with:",
    priceSubtext: "+state filing fees",
    features: [
      "Preliminary Name Search – Ensure your desired DBA name is available before you apply.",
      "DBA Application Filing* – We guide you through completing and submitting your USA DBA paperwork correctly.",
      "Publication of Your DBA Name* – Meet legal requirements by publishing your DBA in an approved newspaper.",
      "Proof of Publication Filing* – File the necessary proof with the appropriate county or state office.",
      "Customizable Website – Launch your brand online with a professional site powered by Wix or WordPress."
    ],
    note: "*Where applicable by USA law and local regulations.",
    href: "/order/step2",
    buttonText: "Register My DBA",
    color: "gray",
  },
  {
    name: "Premium",
    price: "119",
    tagline: "ASSIST",
    description: "For business owners who want hands-on support every step of the way, our Premium package goes beyond the basics. You’ll get priority service and legal guidance to make the process seamless.",
    priceSubtext: "+state filing fees",
    features: [
      "Unlimited 30-Minute Attorney Consultations – For the first 30 days, enjoy unlimited half-hour consultations on new legal matters, giving you direct access to legal advice when you need it most.†",
      "Preliminary Name Search – Ensure your desired DBA name is available before you apply.",
      "DBA Application Filing* – We guide you through completing and submitting your USA DBA paperwork correctly.",
      "Publication of Your DBA Name* – Meet legal requirements by publishing your DBA in an approved newspaper.",
      "Proof of Publication Filing* – File the necessary proof with the appropriate county or state office.",
      "Customizable Website – Launch your brand online with a professional site powered by Wix or WordPress."
    ],
    note: "*Where applicable by USA law and local regulations.\n†Unlimited consultations apply to new matters only and are available within the first 30 days of subscription.",
    href: "/order/step2",
    buttonText: "Register My DBA",
    color: "accent",
  }
];

const whoNeeds = [
  "A sole proprietor using any name other than your own",
  "An LLC or corporation operating under a secondary brand",
  "Launching a product line or online store with a unique name",
  "Opening a branch or retail location with a different name",
  "Freelancing or consulting under a business name",
];

const attorneyBenefits = [
  "Choose a name that meets USA regulations",
  "Avoid trademark conflicts",
  "Understand when you need a USA business license registration",
  "Ensure your DBA aligns with your LLC or corporation",
  "Handle filings across multiple counties if needed",
];

const steps = [
  { number: "01", title: "Tell Us Your Desired DBA Name", description: "We’ll check availability and guide you on local vs. state-level registration." },
  { number: "02", title: "We Prepare and File the Forms", description: "We complete the USA Assumed Name Certificate (DBA) and submit it to the proper county or Secretary of State office." },
  { number: "03", title: "You Receive Proof of Registration", description: "Get a certified copy of your DBA to use for banking, licensing, and branding purposes." },
  { number: "04", title: "Stay Compliant Year After Year", description: "We’ll notify you of renewals or legal changes that affect your DBA status." },
];

const faqs = [
  { question: "What is a DBA in USA ?", answer: "A DBA, or Doing Business As name, allows you to operate under a name other than your legal business name. In USA , this is filed as an “Assumed Name Certificate.”" },
  { question: "Is a DBA required in USA?", answer: "" },
  { question: "Where do I file a DBA in USA?", answer: "" },
  { question: "Do I need a business license in addition to a DBA?", answer: "" },
  { question: "How long does a USA DBA last?", answer: "" },
  { question: "Can I use a DBA to open a business bank account?", answer: "" },
  { question: "Can I file more than one DBA?", answer: "" },
];

const reviews = [
  { name: "Samantha P.", type: "LLC Customer", text: "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!" },
  { name: "Carlos M.", type: "Trademark Customer", text: "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way." },
  { name: "Nell C.", type: "Last Will Customer", text: "We used Brendat for our estate planning documents, and I can’t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of." },
];

export default function DBAPage() {
  const [selectedEntity, setSelectedEntity] = useState("");
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
        
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 overflow-hidden">
          <HeroAvatars />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,0,0.08),transparent_50%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">Make Your Business Official With DBA Registration in USA</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Whether you’re ready to file your DBA on your own or want legal support along the way, our DBA registration Attorneys in USA have got your back. We handle every step of Doing Business As registration process, from name search and paperwork to local filing and renewals, so you can focus on running your business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all text-lg">
                  Register My DBA
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg">
                  Speak to DBA Attorney
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* WHY REGISTER A DBA */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Why Register a DBA in USA?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Filing a DBA is a fast, low-cost way to operate under a name that’s different from your legal name, especially if you’re a sole proprietor or LLC wanting to expand.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {whyRegister.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={i} className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-accent/20 transition-all flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{r.title}</h3>
                      <p className="text-sm text-gray-600">{r.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* GUARANTEE BAR */}
        <section className="py-16 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">100% Accurate Filing Guarantee</h3>
                <p className="text-white/80 max-w-3xl">We’re committed to the highest quality and accuracy. If your filing is rejected or incorrect due to our error, we’ll correct it with the government agency at no additional cost to you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE BRENDAT */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Why Choose Brendat for Doing Business As Registration?</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">When it comes to DBA registration in USA, you need more than just paperwork; you need a partner who understands the process inside out. At Brendat, we specialize in guiding entrepreneurs, small business owners, and growing companies through every step of USA Doing Business As registration, making the journey simple, stress-free, and compliant.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChoose.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{r.title}</h3>
                    <p className="text-sm text-gray-600">{r.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-12 text-center">
              <p className="font-bold text-gray-900 mb-4">Ready to Set Your DBA Filing?</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-accent text-accent font-bold px-6 py-3 rounded-xl hover:bg-accent hover:text-white transition-all">
                Talk to a DBA Attorney
              </Link>
            </div>
          </div>
        </section>

{/* ENTITY & STATE SELECTION */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Start Your Filing in Minutes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select your business type and state to get started with our expert filing service.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Entity Type Dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Business Entity Type</label>
                    <div className="relative">
                      <select
                        value={selectedEntity}
                        onChange={(e) => setSelectedEntity(e.target.value)}
                        className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-4 pr-10 text-gray-900 font-medium focus:border-accent focus:ring-0 focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="">Select Entity Type</option>
                        <option value="LLC">Limited Liability Company (LLC)</option>
                        <option value="C-Corporation">C-Corporation</option>
                        <option value="S-Corporation">S-Corporation</option>
                        <option value="Nonprofit">Nonprofit</option>
                        <option value="Sole Proprietorship">Sole Proprietorship</option>
                        <option value="Partnership">Partnership</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* State Dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-2">State of Formation</label>
                    <div className="relative">
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-4 pr-10 text-gray-900 font-medium focus:border-accent focus:ring-0 focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="">Select State</option>
                        {Object.keys(STATE_FEES).map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* State Fee Display */}
                {selectedState && (
                  <div className="mb-8 p-4 bg-accent/5 rounded-xl border border-accent/20">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">State Filing Fee for {selectedState}:</span>
                      <span className="text-2xl font-black text-accent">${STATE_FEES[selectedState]}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">This fee is paid directly to the state</p>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={handleStartBusiness}
                  disabled={!selectedEntity || !selectedState}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${
                    selectedEntity && selectedState
                      ? "bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/25 hover:shadow-xl"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continue to Filing
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-accent" />
                      <span>Secure & Confidential</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-accent" />
                      <span>Fast Processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-accent" />
                      <span>100% Accuracy Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
                {/* THINGS YOU SHOULD KNOW & WHO NEEDS */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-16">Things You Should Know Before DBA Registration USA</h2>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="order-2 lg:order-1 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  {/* DBA License Placeholder Image */}
                  <Image src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop" alt="DBA requirements" width={600} height={450} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg">
                      <p className="font-bold text-gray-900">Doing Business As Requirements</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-black text-gray-900 mb-4">Do I Need a Business License Too?</h3>
                <p className="text-gray-600 mb-4">A USA DBA is not the same as a business license. Some businesses operating under a DBA may still be required to register for local or state-level permits, depending on their industry.</p>
                <p className="text-gray-600 mb-8">Our Legal plan includes a review of your USA, USA , business license registration to ensure your business meets all compliance requirements.</p>
                <Link href="/order/step2" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-6 py-3 rounded-xl transition-all">
                  Check My Licensing Requirements
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mt-16">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Who Needs a DBA in USA?</h3>
              <p className="text-gray-600 mb-6">You need a Doing Business As registration in USA, USA, if you’re:</p>
              <ul className="space-y-4 mb-8">
                {whoNeeds.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <ChevronRight className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 mb-8">We help you determine whether your business structure requires county-level, state-level, or both filings.</p>
              <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all text-lg">
                Start My DBA Filing
              </Link>
            </div>
          </div>
        </section>

        {/* HOW TO REGISTER */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">How to Register A DBA with Brendat?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Getting your DBA registered in USA doesn’t have to be complicated. Our streamlined process takes you from idea to official registration without the stress of figuring it out yourself. From verifying your desired name to filing the correct forms and keeping you compliant year after year, we handle every step so you can focus on growing your business.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((s) => (
                <div key={s.number} className="relative">
                  <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-xl bg-accent text-white flex items-center justify-center font-black text-xl mb-4">{s.number}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-600">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
               <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all text-lg">
                 Register My DBA
               </Link>
            </div>
          </div>
        </section>

        {/* WORK WITH ATTORNEY */}
        <section className="py-20 bg-accent text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm font-black uppercase tracking-widest text-white/80 mb-2 block">DBA Registration Requirements</span>
                <h2 className="text-3xl md:text-4xl font-black mb-6">Work With a DBA Attorney</h2>
                <p className="text-white/90 mb-8 text-lg">While the process of filing a DBA may seem simple, mistakes can lead to rejections, delays, or even legal issues. That’s why our Legal plan includes access to a USA Doing Business As attorney who can help you:</p>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-accent font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
                  Talk to a DBA Attorney
                </Link>
              </div>
              <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
                <ul className="space-y-4">
                  {attorneyBenefits.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DBA vs LLC */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">DBA vs. LLC: Understanding the Difference</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">A Doing Business As (DBA) name, also known as a trade name or fictitious business name, lets your business operate under a registered name that’s different from its legal one. Whether you run an LLC, corporation, or sole proprietorship, a DBA is simply an official nickname for your business, not a separate legal entity. Here’s how it compares to an LLC and when you might need each.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 relative pt-12">
                <div className="absolute top-0 right-8 bg-gray-900 text-white text-xs font-black px-4 py-2 rounded-b-xl tracking-widest uppercase">Name Only</div>
                <h3 className="text-2xl font-black text-gray-900 mb-8 pb-4 border-b border-gray-200">Doing Business As (DBA)</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Simple and Budget-Friendly</h4>
                    <p className="text-sm text-gray-600">A DBA lets you register an official business name without forming a separate entity like an LLC, making it quick and cost-effective.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Flexible Branding</h4>
                    <p className="text-sm text-gray-600">Perfect for tailoring your business name to different locations or markets. For example, multiple ice cream shops can each carry a unique, locally inspired name while operating under the same business.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Low Maintenance</h4>
                    <p className="text-sm text-gray-600">Most DBAs only need renewal every few years, offering an easy way to secure a recognized name without the ongoing compliance an LLC requires.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-2 border-accent relative pt-12">
                <div className="absolute top-0 right-8 bg-accent text-white text-xs font-black px-4 py-2 rounded-b-xl tracking-widest uppercase">Legal Entity</div>
                <h3 className="text-2xl font-black text-gray-900 mb-8 pb-4 border-b border-gray-200">Limited Liability Company (LLC)</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Personal Asset Protection</h4>
                    <p className="text-sm text-gray-600">By separating personal and business finances, an LLC shields your personal assets from business debts and legal liabilities.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Flexible Tax Options</h4>
                    <p className="text-sm text-gray-600">Choose how your LLC is taxed, either as a pass-through entity or a corporation, to help optimize savings and reduce tax burdens.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Moderate Upkeep</h4>
                    <p className="text-sm text-gray-600">While easier to manage than corporations, LLCs still require annual reports, filings, and some ongoing compliance, more than a DBA but less than a full corporation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white border-y border-gray-100 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Register Your DBA in USA Today</h2>
            <p className="text-lg text-gray-600 mb-8">Whether you’re starting fresh or expanding your existing business, our USA DBA registration services make it easy to launch under a new name without legal risk or confusion.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/order/step2" className="bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all text-lg">
                Start My DBA Filing
              </Link>
              <Link href="/contact" className="bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg">
                Talk to Consultant
              </Link>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions About DBA Registration in USA</h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((f, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100">
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

        {/* REVIEWS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Our Reviews</h2>
              <p className="text-lg text-gray-600">What our customers are saying?</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((r) => (
                <div key={r.name} className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 font-medium leading-relaxed">“{r.text}</p>
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

        {/* EXPERT SUPPORT */}
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-300 flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Questions? Ask An Attorney</h3>
                  <p className="text-sm text-gray-600 mt-1 mb-3">Get expert support for legal matters with our attorney by your side.</p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Mon–Fri 5 am–7 pm PT · Sat–Sun 7 am–4 pm PT</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-gray-300 flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Call An Agent At</h3>
                  <a href="tel:3032468693" className="text-2xl font-black text-accent hover:underline block mt-1">(303) 246-8693</a>
                  <p className="text-sm text-gray-500 mt-1">Mon–Fri 5 am–7 pm PT · Sat–Sun 7 am–4 pm PT</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-5 py-2.5 rounded-xl mt-4 text-sm shadow-md transition-all">
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