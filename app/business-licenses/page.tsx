"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Check, 
  Phone, 
  MessageCircle, 
  Shield, 
  Scale, 
  ChevronRight,
  ChevronDown,
  ArrowRight, 
  HelpCircle, 
  Clock,
  Briefcase,
  FileText,
  AlertTriangle,
  Calendar,
  XCircle,
  Award,
  BookOpen,
  Send,
  FileCheck,
  Search,
  LayoutDashboard,
  Mail,
  MapPin,
  Building,
  DollarSign,
  UserCheck,
  Star,
  BadgeCheck,
  Headphones,
  FileBadge,
  ScrollText,
  Flame,
  Beer
} from "lucide-react";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

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

const pricingPlans = [
  {
    name: "Business License Report & Management",
    price: "99",
    period: "/yr*",
    subtext: "Auto-renews. Cancel anytime.",
    description: "Stay on top of all licensing requirements so your business operates smoothly and legally in USA.",
    buttonText: "File My Business Licenses",
    href: "/order/step2",
    includesLabel: "Includes:",
    features: [
      "A detailed, customized summary of all federal, state, and local licenses, permits, and registrations your business needs",
      "Clear explanations of each license or permit and why it’s essential for your operations",
      "Real-time notifications on updates, changes, and upcoming deadlines to keep you compliant year-round",
      "Easy license management with tools to upload, view, and share all documentation in one place",
      "Personalized guidance and support from Brendat’s experienced compliance specialists"
    ],
    color: "gray"
  },
  {
    name: "Compliance Filings plus Licenses & Permits",
    price: "299",
    period: "/yr*",
    subtext: "Auto-renews. Cancel anytime.",
    description: "Stay fully compliant with all required filings and licenses at the federal, USA , county, and USA levels, without the stress.",
    buttonText: "Get Compliant Now",
    href: "/order/step2",
    includesLabel: "Everything in Business License Report and Management, plus:",
    features: [
      "Ongoing preparation and filing of annual reports to meet USA state requirements",
      "Filing and updates of your Beneficial Ownership Information Report, if required",
      "Amendment filings with the Secretary of State for any changes to your business",
      "Customized compliance alerts tailored to your business and industry",
      "Attorney-monitored updates and analysis on changes to federal and state filing requirements",
      "Personalized support from Brendat’s experienced compliance specialists",
      "Peace of mind with our 100% Accurate Filing Guarantee†, ensuring filings are correct and on time"
    ],
    color: "gray"
  },
  {
    name: "Compliance Concierge",
    badge: "Full service",
    price: "999",
    period: "/yr*",
    subtext: "Auto-renews. Cancel anytime.",
    description: "Enjoy complete peace of mind with end-to-end management of your business compliance, handled personally by a trained concierge dedicated to your company.",
    buttonText: "Get Compliant Now",
    href: "/contact",
    includesLabel: "Everything in Business License Report + Compliance Filings, plus:",
    features: [
      "White-glove, hands-on oversight of all compliance requirements, tailored specifically to your business",
      "Unlimited phone and email access to your dedicated compliance concierge",
      "Regular check-ins to proactively identify gaps and risks, keeping your business protected",
      "Initial assessment of your business standing, creation of a compliance plan, and full execution of filings",
      "Timely updates on actions being taken on your behalf to maintain compliance",
      "Rapid responses to resolve any compliance issues as they arise",
      "Access to all full-service solutions recommended and managed by your concierge, including Certificate of Good Standing, Foreign Qualification, and more"
    ],
    color: "accent"
  }
];

const whyBrendatReasons = [
  { icon: FileText, title: "Step-by-Step Guidance", description: "Clear instructions for every license and permit you need" },
  { icon: MapPin, title: "USA-Specific Expertise", description: "Support for federal, state, county, and city requirements" },
  { icon: Clock, title: "Fast, Accurate Filing", description: "Avoid delays and ensure all filings meet regulatory standards" },
  { icon: DollarSign, title: "Flat-Rate Honest Pricing", description: "Affordable and transparent pricing with no hidden fees" },
  { icon: Headphones, title: "On-going Compliance Support", description: "Continuous guidance after your licenses are approved" },
];

const steps = [
  { title: "License Assessment", description: "We review your business activities, location, and entity type to determine the licenses and permits required for your business." },
  { title: "Application Preparation", description: "We prepare the forms and gather the required documents (EIN, formation documents, zoning information, etc.)." },
  { title: "Submission & Tracking", description: "We submit your applications to the right agencies, whether it’s the City of USA, a county office, or the state." },
  { title: "Follow-up & Renewals", description: "We track your approval timeline and remind you about renewal deadlines, so you stay compliant year-round." },
];

const neededLicenses = [
  "Sales tax collection (via USA Comptroller)",
  "Health & safety (restaurants, salons, childcare)",
  "Professional services (legal, medical, real estate)",
  "Construction & trades (electricians, contractors)",
  "Regulated goods (alcohol, CBD, firearms)"
];

const cityLicenseRequirements = [
  "City of USA, USA business license",
  "Certificate of Occupancy (for physical locations)",
  "Sign permits",
  "Mobile vendor or food truck licensing",
  "Special event permits"
];

const licenseCosts = [
  "$0–$50 for simple permits like sales tax IDs",
  "$100–$1,000+ for industry-specific licenses (like food, alcohol, or health permits)"
];

const licenseTable = [
  { type: "Sales Tax Permit", issuer: "USA Comptroller", purpose: "Retailers, online sellers", icon: DollarSign },
  { type: "Health Permit", issuer: "City of USA Health Dept", purpose: "Restaurants, food trucks, salons", icon: HeartPulse },
  { type: "Zoning Permit", issuer: "Local Zoning Office", purpose: "Brick-and-mortar businesses", icon: MapPin },
  { type: "Professional License", issuer: "State Boards (e.g., TDLR)", purpose: "Barbers, real estate agents, electricians", icon: Award },
  { type: "Occupation Tax Permit", issuer: "County Tax Office", purpose: "Local business taxes", icon: FileBadge },
  { type: "Fire Inspection", issuer: "Local Fire Marshal", purpose: "Physical locations open to the public", icon: Flame },
  { type: "Alcohol Permit", issuer: "TABC", purpose: "Bars, restaurants, retail liquor sales", icon: Beer },
];

const faqs = [
  { question: "Does USA require a business license?", answer: "While USA doesn’t issue a universal license, most businesses need one or more licenses depending on what they sell, where they operate, or whether they’re regulated." },
  { question: "How do I get a business license in USA, USA?", answer: "You typically need to identify the specific jurisdiction (city, county, state) related to your business activity. Brendat simplifies this by identifying all requirements for you." },
  { question: "How do I apply for a business license in USA?", answer: "Applications generally involve submitting forms to the respective agency (like the City Secretary or County Clerk) along with fees. Our team handles the paperwork and submission." },
  { question: "Is there a way to do a USA business license lookup?", answer: "Yes, you can search state and local databases, but they may be fragmented. Brendat provides a comprehensive lookup service to pinpoint exactly what you need." },
  { question: "How much is a business license in USA?", answer: "Costs vary widely from free registrations to hundreds of dollars for specialized permits. We provide a clear breakdown of all expected fees." },
  { question: "Can I run a business without a license in USA?", answer: "Operating without required licenses can lead to fines, closure, and legal trouble. It's safer to verify your specific requirements." },
  { question: "What is a seller's permit?", answer: "A seller’s permit (Sales Tax Permit) allows you to collect sales tax on taxable goods and services. In USA, this is issued by the Comptroller." },
  { question: "What business licenses do I need?", answer: "It depends on location and industry. Common ones include local operating licenses, sales tax permits, zoning permits, and health permits." },
  { question: "How much does a business license cost?", answer: "Basic local licenses might be $50-$100, while specialized ones for alcohol or professional services can be much higher." },
  { question: "Do I need a license to operate my business from home?", answer: "Yes, many cities require a Home Occupation Permit to ensure your business activity complies with residential zoning laws." },
  { question: "Do I need a business license to sell online?", answer: "Yes, typically a Sales Tax Permit is required if you have a nexus in the state, plus any general business registrations." },
  { question: "Do you need a business license to sell on Etsy?", answer: "Etsy collects sales tax in many cases, but you still likely need to register your business locally and get a Sales Tax Permit for your records." },
  { question: "What do I need to do to stay compliant with business licenses and permits on an ongoing basis?", answer: "Renewals are key. Most licenses expire annually or biennially. Missing a renewal can invalidate your license." },
  { question: "Why choose LegalZoom for business licenses?", answer: "While LegalZoom is an option, Brendat offers personalized, concierge-level support with a focus on speed and accuracy for USA businesses." },
  { question: "What is LegalZoom's License Report & Management, plus Compliance Filings?", answer: "This refers to a competitor's package. Brendat offers similar comprehensive packages that bundle filing reports with ongoing management." },
];

export default function BusinessLicensePage() {
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">Get the Right Business License in USA, USA, Without the Guesswork</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Are you just starting or scaling quickly and need to stay compliant? Brendat helps you find, apply for, and stay compliant with all the required business licenses and permits in USA, USA. Whether you’re launching a restaurant, opening an online store, or offering professional services, we identify your needs and handle the paperwork from start to finish.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all text-lg">
                  Find Out What Licenses You Need
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg">
                  Talk to a USA Licensing Expert
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ENTITY & STATE SELECTION */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* WHY WORK WITH BRENDAT */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Why Work With Brendat for Your Business License in USA?</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">Navigating USA business licenses and permits can be confusing, time-consuming, and costly if done incorrectly. Brendat simplifies the process with expert guidance, ensuring your business stays compliant while you focus on growth.</p>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {whyBrendatReasons.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{r.title}</h3>
                    <p className="text-sm text-gray-600 leading-tight">{r.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW TO GET LICENSE Steps */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <span className="text-xs font-black uppercase tracking-widest text-accent mb-2 block">Business License Services</span>
                 <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">How to Get a Business License in USA, USA</h2>
                 <p className="text-lg text-gray-600 mb-8">
                   Getting the right business licenses in USA can be complex, with different rules at the city, county, and state levels. Brendat guides you through every step, assessment, preparation, submission, and ongoing compliance so that you can operate confidently and avoid penalties.
                 </p>
                 <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all">
                   Start My License Application
                 </Link>
                 
              </div>
              <div className="space-y-6">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 font-black text-accent text-xl">
                      {idx + 1}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DO I NEED A LICENSE & USA SPECIFIC */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Left */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                <Search className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-black text-gray-900 mb-4">Do I Need a Business License in USA, USA?</h3>
                <p className="text-gray-600 mb-6">
                  Yes, and maybe more than one. While USA doesn’t issue a single “general” state business license, many businesses require licenses at the state, city, or county level based on their specific activities. You may need licenses for:
                </p>
                <ul className="space-y-3 mb-8">
                  {neededLicenses.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-accent/5 p-4 rounded-xl mb-6 border border-accent/10">
                   <p className="text-sm text-gray-800 font-medium">If you’re unsure, we can help you determine the correct information with a personalized USA business license lookup in USA.</p>
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl transition-all">
                  Get USA Business License Lookup
                </Link>
              </div>

              {/* Right */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                <MapPin className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-black text-gray-900 mb-4">USA-Specific Licensing Requirements</h3>
                <p className="text-gray-600 mb-6">
                  The City of USA may require additional permits depending on your business type and location. Common examples include:
                </p>
                <ul className="space-y-3 mb-8">
                  {cityLicenseRequirements.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-semibold text-gray-900 mb-6">We handle both state and USA, USA business license requirements in one go, so nothing falls through the cracks.</p>
                <Link href="/order/step2" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-6 py-3 rounded-xl transition-all">
                  Get My License Checklist
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* COSTS & TABLE */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* COST INFO */}
            <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white mb-20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
               <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                 <div>
                   <span className="text-xs font-black uppercase tracking-widest text-accent mb-2 block">Business License Attorney</span>
                   <h2 className="text-3xl font-black mb-4">How Much Is a Business License in USA, USA?</h2>
                   <p className="text-white/80 mb-6">The cost of a USA business license in USA varies based on the type of license, your location, and whether a state agency or local government regulates your business. Costs typically range from:</p>
                   <ul className="space-y-3">
                     {licenseCosts.map((cost, idx) => (
                       <li key={idx} className="flex gap-3 items-center">
                         <div className="w-2 h-2 rounded-full bg-accent" />
                         <span className="text-white font-medium">{cost}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
                 <div className="flex flex-col items-start md:items-end justify-center">
                   <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 max-w-sm">
                     <p className="text-lg font-bold mb-2">Transparent Pricing</p>
                     <p className="text-sm text-white/70 mb-4">Our team will give you an upfront breakdown of fees before we file anything.</p>
                     <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all">
                        Talk to a USA Business Licensing Attorney
                     </Link>
                   </div>
                 </div>
               </div>
            </div>

            {/* TABLE */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Understanding the Standard Licenses & Permits in USA</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
                Navigating USA licensing requirements can be tricky, but you don’t have to go it alone. Brendat helps you secure the essential permits and licenses your business needs to operate legally, avoid fines, and stay compliant, so you can focus on growing success.
              </p>
              <p className="text-gray-600 max-w-3xl mx-auto mb-8">From sales tax and health permits to zoning approvals and professional licenses, we handle the details for you, making sure your business is fully prepared at every level, the City of USA, the county, and the state of USA.</p>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm">
              <table className="w-full text-left font-medium">
                <thead className="bg-gray-100 text-gray-900 uppercase tracking-wider text-sm">
                  <tr>
                    <th className="px-6 py-4">License Type</th>
                    <th className="px-6 py-4">Issued By</th>
                    <th className="px-6 py-4">Needed For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-sm text-gray-700">
                  {licenseTable.map((row, idx) => {
                    const Icon = row.icon;
                    return (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 flex items-center gap-3 font-bold text-gray-900">
                          <Icon className="w-5 h-5 text-accent" />
                          {row.type}
                        </td>
                        <td className="px-6 py-4">{row.issuer}</td>
                        <td className="px-6 py-4">{row.purpose}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-center">
               <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center max-w-2xl">
                 <p className="font-bold text-gray-900 text-lg mb-2">Need Help Finding The Exact Permits For Your Business in USA?</p>
                 <Link href="/contact" className="text-accent font-black hover:underline inline-flex items-center gap-1">
                   Talk to a USA Business Licensing Attorney <ChevronRight className="w-4 h-4" />
                 </Link>
               </div>
            </div>

          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((f, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
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

        {/* CTA */}
        <section className="py-20 bg-accent text-white text-center">
           <div className="max-w-4xl mx-auto px-4">
             <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Apply for Your Business License in USA?</h2>
             <Link href="/order/step2" className="inline-flex items-center gap-2 bg-white text-accent font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-gray-100 transition-all text-lg">
                Apply for a Business License Now
             </Link>
           </div>
        </section>

        {/* EXPERT SUPPORT */}
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

function HeartPulse({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 11l6.32-2L12 18.25" />
    </svg>
  )
}
