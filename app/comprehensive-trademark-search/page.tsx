"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  CheckCircle,
  FileText,
  Shield,
  Zap,
  Globe,
  Briefcase,
  AlertTriangle,
  Scale,
  ShoppingBag,
  PenTool,
  Star,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  Phone,
  HelpCircle,
  Check,
  XCircle,
  Users,
  Clock,
} from "lucide-react";
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

export default function ComprehensiveTrademarkSearchPage() {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);
  const [selectedEntity, setSelectedEntity] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const router = useRouter();

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleStartBusiness = () => {
    if (selectedEntity && selectedState) {
      router.push(`/order/step2?entity=${encodeURIComponent(selectedEntity)}&state=${encodeURIComponent(selectedState)}`);
    }
  };

  const pricingPlans = [
    {
      name: "Standard",
      price: "199",
      subtitle: "Federal Trademark Search",
      features: [
        "In-depth search of all existing and pending trademarks filed with the USPTO, covering exact matches, similar spellings, and phonetic variations.",
        "Organized, ranked results so you can easily spot potential conflicts and assess your chances of approval.",
      ],
      buttonText: "Search My Trademark",
      popular: false,
    },
    {
      name: "Federal, State & Common Law",
      price: "299",
      subtitle: "Most Popular",
      features: [
        "In-depth search of all existing and pending trademarks filed with the USPTO, covering exact matches, similar spellings, and phonetic variations.",
        "Organized, ranked results so you can easily spot potential conflicts and assess your chances of approval.",
        "Expanded search of state trademark databases.",
        "Common law search to uncover unregistered trademarks and existing brand use that could pose conflicts.",
      ],
      buttonText: "Search My Trademark",
      popular: true,
    },
    {
      name: "Comprehensive Search & Registration",
      price: "899",
      subtitle: "+ federal fees",
      features: [
        "Full USPTO search of pending and registered trademarks, including exact and phonetic matches.",
        "Ranked results to quickly identify possible conflicts.",
        "Common law trademark search to detect unregistered brand use.",
        "Direct attorney support with guidance and answers throughout the process.",
        "Attorney preparation and filing of your trademark application.",
        "Free second trademark search if your attorney flags an issue with your first choice.",
        "Complimentary new trademark application if the first filing is rejected.†",
      ],
      buttonText: "Start My Trademark Search",
      popular: false,
    },
  ];

  const whyUseBrendat = [
    {
      title: "Attorney-Led Trademark Searches",
      description: "Every search is reviewed and explained by licensed trademark attorneys, not just software.",
      icon: <Scale className="w-6 h-6 text-accent" />,
    },
    {
      title: "Comprehensive Coverage",
      description: "We search federal, state, and common law databases for exact, phonetic, and similar matches.",
      icon: <Globe className="w-6 h-6 text-accent" />,
    },
    {
      title: "Risk Reduction",
      description: "Identify potential conflicts before filing, avoiding cease-and-desist letters and wasted application fees.",
      icon: <Shield className="w-6 h-6 text-accent" />,
    },
    {
      title: "Streamlined Filing Support",
      description: "If your chosen mark is available, we handle the filing for you with professional precision.",
      icon: <Zap className="w-6 h-6 text-accent" />,
    },
  ];

  const whyMatters = [
    {
      title: "Brand Availability Check",
      description: "Confirm with certainty that your chosen business name, logo, or slogan is legally available before you invest in marketing, branding, or product launches.",
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Prevent Costly Legal Issues",
      description: "Reduce the risk of receiving cease-and-desist letters, lawsuits, or infringement claims that can disrupt your business operations and damage your reputation.",
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Protect Your Investment",
      description: "Avoid spending thousands on rebranding, redesigning packaging, or fighting legal battles by catching conflicts early through a professional search.",
      icon: <Shield className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Streamline Registration Process",
      description: "Eliminate unnecessary delays by identifying potential obstacles in advance, ensuring your application moves faster through the USPTO approval process.",
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
    },
    {
      title: "Increase Chances of Approval",
      description: "Boost your likelihood of successfully registering your trademark by addressing conflicts before filing and presenting a stronger application.",
      icon: <CheckCircle className="w-8 h-8 text-purple-500" />,
    },
  ];

  const skipRisks = [
    {
      id: "01",
      title: "USPTO Rejection",
      description: "Your application may be denied for “likelihood of confusion” with an existing mark",
    },
    {
      id: "02",
      title: "Legal Disputes",
      description: "Another business can file an opposition or even take you to court",
    },
    {
      id: "03",
      title: "Forced Rebranding",
      description: "You may need to change your name, domain, logo, and marketing assets",
    },
    {
      id: "04",
      title: "Revenue Loss",
      description: "If you’re removed from marketplaces or social platforms due to infringement",
    },
  ];

  const whoNeedsSearch = [
    {
      title: "Startups",
      description: "Make sure your brand is unique so you can protect your name, logo, or slogan from potential infringement.",
      icon: <Briefcase className="w-6 h-6 text-accent" />,
    },
    {
      title: "Ecommerce Brands",
      description: "Don't waste money building your brand only to find out it belongs to someone else later.",
      icon: <ShoppingBag className="w-6 h-6 text-accent" />,
    },
    {
      title: "Content Creators",
      description: "Start the application process knowing you have the best chance possible of getting USPTO approval.",
      icon: <PenTool className="w-6 h-6 text-accent" />,
    },
    {
      title: "USA Businesses",
      description: "Start the application process knowing you have the best chance possible of getting USPTO approval.",
      icon: <Globe className="w-6 h-6 text-accent" />,
    },
  ];

  const comparisonData = [
    {
      feature: "Approval Rate",
      us: "Up to 4x higher",
      others: "Standard",
    },
    {
      feature: "Firm Type",
      us: "Fully owned law firm in USA",
      others: "Generic filing service",
    },
    {
      feature: "Attorney Support",
      us: "Direct work with experienced attorney",
      others: "Automated / No direct access",
    },
    {
      feature: "Second Search",
      us: "Free if issues found",
      others: "Charged extra",
    },
    {
      feature: "Rejection Protection",
      us: "Second app fee waived",
      others: "Full fee charged again",
    },
    {
      feature: "Volume",
      us: "2x more apps filed than most",
      others: "Lower volume",
    },
  ];

  const usptoVsCommonLaw = [
    {
      type: "USPTO Search",
      covers: "Registered federal trademarks",
      why: "Prevents rejection by the USPTO during registration",
    },
    {
      type: "State-Level Search (USA)",
      covers: "Marks registered in USA only",
      why: "Helps avoid regional conflicts and lawsuits",
    },
    {
      type: "Common Law Search",
      covers: "Unregistered but actively used brand names/logos",
      why: "Helps you identify real-world usage that could lead to legal disputes, even if it’s not officially registered",
    },
  ];

  const faqs = [
    {
      question: "Can I file a trademark without a search?",
      answer: "Technically, yes, but it’s risky. Without a proper search, your trademark could be rejected or challenged, forcing you to rebrand.",
    },
    {
      question: "How long does a trademark search take?",
      answer: "Standard searches take 1–2 business days. Need it sooner? We offer expedited options with same-day results.",
    },
    {
      question: "What’s the difference between federal and state trademark searches?",
      answer: "A federal search checks the USPTO database for nationwide protection. A state search checks individual state databases for local protection. Our comprehensive search covers both along with common law sources.",
    },
    {
      question: "Is this included in your online trademark registration service?",
      answer: "Our basic registration packages include a direct-hit search. However, a comprehensive search (including state and common law) is a separate, more in-depth service recommended for full peace of mind.",
    },
    {
      question: "Can I do a trademark search on my own?",
      answer: "You can search the USPTO database yourself, but it can be difficult to interpret the results accurately. Professional searches use advanced software and attorney analysis to catch conflicts you might miss.",
    },
    {
      question: "How much does a professional trademark search cost in USA?",
      answer: "Our professional trademark searches start at $199 for a federal search and $299 for a comprehensive federal, state, and common law search.",
    },
    {
      question: "What is included in a trademark search report?",
      answer: "The report includes a list of exact and similar marks found in federal and state databases, common law usage, and an attorney's analysis of potential conflicts.",
    },
    {
      question: "Will a trademark search guarantee my trademark gets approved?",
      answer: "No search can guarantee approval, as the USPTO makes the final decision. However, a comprehensive search significantly reduces the risk of rejection by identifying problems early.",
    },
    {
      question: "What is the USPTO TESS system?",
      answer: "TESS (Trademark Electronic Search System) is the USPTO's online database. While publicly available, it requires knowledge of search codes and legal principles to be used effectively.",
    },
    {
      question: "Do I need a trademark search if I’m only doing business in USA?",
      answer: "Yes. Even if you only operate in USA, you could still infringe on a federal trademark or a common law mark used in your area.",
    },
    {
      question: "Can a trademark search help protect my logo design?",
      answer: "Yes, we can perform design searches to check for similar logos that are already registered or in use.",
    },
    {
      question: "How soon can I start the registration process after a search?",
      answer: "Once you receive your clear search report, you can start the registration process immediately. We can often file your application within 24-48 hours.",
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
      text: "We used Brendat for our estate planning documents, and I can’t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 overflow-hidden">
        <HeroAvatars />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,0,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
            Trademark Search in USA Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Before investing in your brand, ensure it’s legally available. Our trademark search services in USA provide clarity and confidence, ensuring it’s legally available and avoiding infringement risks.
          </p>
          <Link href="/contact" className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
            Start My Trademark Search
          </Link>
        </div>
      </section>

      {/* Entity & State Selection */}
      <section className="py-20 bg-white" id="start-order">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-4">
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

      {/* Why Use Brendat */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why Use Brendat for Your Trademark Search in USA?</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              When it comes to protecting your brand, a quick online search isn’t enough. Many business owners in USA rely on Brendat because we go beyond the basics to deliver accurate, attorney-guided trademark searches that save you from costly mistakes down the road. With our expertise, you don’t just get search results, you get a clear understanding of risks, conflicts, and the best path to secure your mark.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {whyUseBrendat.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all">
                <div className="bg-accent/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Matches / Importance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Why a Trademark Search in USA Matters</h2>
             <p className="text-gray-600 max-w-2xl mx-auto">
               Many USA entrepreneurs skip this step only to discover later that their business name or logo infringes on someone else’s registered mark. A proper trademark search in USA helps you:
             </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {whyMatters.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-all">
                      <div className="mb-4">{item.icon}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
              ))}
           </div>
           <div className="text-center mt-12">
              <Link href="/contact" className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                Schedule A Trademark Search
              </Link>
           </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">What Sets Us Apart</h2>
           
           <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
             <div className="grid grid-cols-3 bg-gray-900 text-white p-6 font-bold text-lg">
                <div>Feature</div>
                <div className="text-center">Brendat</div>
                <div className="text-center text-gray-400">Other Online Competitors</div>
             </div>
             {comparisonData.map((row, index) => (
               <div key={index} className={`grid grid-cols-3 p-6 border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} items-center`}>
                 <div className="font-bold text-gray-900 text-sm md:text-base">{row.feature}</div>
                 <div className="text-center font-bold flex flex-col items-center">
                    <CheckCircle className="w-6 h-6 text-accent mb-2 hidden md:block" />
                    <span className="text-sm md:text-base text-gray-800">{row.us}</span>
                 </div>
                 <div className="text-center text-gray-400 flex flex-col items-center">
                    <XCircle className="w-6 h-6 mb-2 hidden md:block" />
                    <span className="text-sm md:text-base">{row.others}</span>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Risks of Skipping */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">What Happens If You Skip a Trademark Search?</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Many entrepreneurs are tempted to file their trademark application right away, thinking it will save time and money. But skipping a proper search is like building your business on shaky ground; everything looks fine until it suddenly collapses. Without knowing whether your name, logo, or slogan is truly available, you expose yourself to costly setbacks, from USPTO rejections to lawsuits.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {skipRisks.map((risk, i) =>(
                        <div key={i} className="bg-gray-50 p-6 rounded-2xl border-l-4 border-accent shadow-sm">
                            <span className="text-4xl font-black text-accent/20 mb-2 block">{risk.id}</span>
                            <h3 className="font-bold text-gray-900 mb-2">{risk.title}</h3>
                            <p className="text-sm text-gray-600">{risk.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Who Needs Search */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-6">Who Needs a Trademark Search in USA?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Even if you’re pursuing cheap trademark registration in USA, skipping the search could cost you much more later on. Our flat-fee USA trademark search is built to reduce risk and give you confidence.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {whoNeedsSearch.map((item, i) => (
              <div key={i} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:bg-gray-700 transition-colors">
                 <div className="bg-gray-900 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-gray-600">
                    {item.icon}
                 </div>
                 <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                 <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
             <Link href="/contact" className="text-center bg-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                Start My Trademark Search
             </Link>
             <Link href="/contact" className="text-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition">
                Talk To USA Trademark Attorney
             </Link>
          </div>
        </div>
      </section>

      {/* USPTO vs Common Law Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-6">Understanding the USPTO Trademark Search vs. Common Law Rights</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
                Trademarks and copyrights are both powerful tools for protecting intellectual property, but they serve very different purposes. A trademark safeguards your brand identity.
            </p>
            
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="p-4 text-left font-bold text-lg w-1/4">Type</th>
                            <th className="p-4 text-left font-bold text-lg w-1/3">What It Covers</th>
                            <th className="p-4 text-left font-bold text-lg w-1/3">Why It Matters</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usptoVsCommonLaw.map((row, i) => (
                            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                <td className="p-4 font-bold text-accent">{row.type}</td>
                                <td className="p-4 text-gray-700">{row.covers}</td>
                                <td className="p-4 text-gray-600">{row.why}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-12">
            What our customers are saying
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
