"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  FileText,
  CheckCircle,
  HelpCircle,
  Globe,
  Briefcase,
  Zap,
  Scale,
  DollarSign,
  PenTool,
  Book,
  Monitor,
  Award,
  ChevronDown,
  MessageCircle,
  Phone,
  User,
  Star,
  Users,
  ArrowRight,
  Clock,
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

export default function CopyrightPage() {
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

  const packageIncludes = [
    "Easy online questionnaire to quickly provide the details we need to start your copyright registration.",
    "Our team checks your submission to ensure it complies with U.S. copyright rules.",
    "We submit your application directly to the U.S. Copyright Office for faster processing.",
    "Receive proof that your application has been received by the Copyright Office.",
  ];

  const whyChoose = [
    {
      title: "Local Expertise, National Reach",
      description: "Based in USA, we understand both USA business needs and U.S. Copyright Office requirements.",
      icon: <Globe className="w-6 h-6 text-accent" />,
    },
    {
      title: "End-to-End Guidance",
      description: "From completing your copyright registration form to securing your certificate, our team walks you through the process step by step.",
      icon: <FileText className="w-6 h-6 text-accent" />,
    },
    {
      title: "Fast & Reliable Filing",
      description: "We electronically file your application for quicker processing and provide confirmation as soon as it’s received.",
      icon: <Zap className="w-6 h-6 text-accent" />,
    },
    {
      title: "Trusted Legal Support",
      description: "Unsure if you should copyright a name, book, or creative work? Our copyright registration lawyers help you make the right choice.",
      icon: <Scale className="w-6 h-6 text-accent" />,
    },
    {
      title: "Transparent, Affordable Package",
      description: "No hidden fees—just clear pricing and reliable service tailored to individuals, businesses, and creators.",
      icon: <DollarSign className="w-6 h-6 text-accent" />,
    },
  ];

  const whyMatters = [
    {
      title: "Public Record of Ownership",
      description: "Your work is recorded with the U.S. Copyright Office, creating a clear legal trail.",
      icon: <FileText className="w-8 h-8 text-accent" />,
    },
    {
      title: "Right to Sue for Infringement",
      description: "Without registration, you cannot pursue damages in federal court.",
      icon: <Scale className="w-8 h-8 text-accent" />,
    },
    {
      title: "Conduct A Needs Assessment",
      description: "A valid certificate of copyright registration may allow for greater compensation if infringement occurs.",
      icon: <CheckCircle className="w-8 h-8 text-accent" />,
    },
    {
      title: "Peace of Mind",
      description: "Confidently publish, sell, or license your work knowing your rights are protected.",
      icon: <Shield className="w-8 h-8 text-accent" />,
    },
  ];

  const serviceFeatures = [
    {
      title: "Name/Brand Copyright Registration",
      description: "Protect slogans, taglines, and creative business identifiers.",
      icon: <PenTool className="w-6 h-6 text-white" />,
    },
    {
      title: "Book Copyright Registration",
      description: "Secure legal ownership of your manuscript, eBook, or published work.",
      icon: <Book className="w-6 h-6 text-white" />,
    },
    {
      title: "Online & Digital Content Copyright",
      description: "Safeguard blogs, software, websites, and multimedia assets.",
      icon: <Monitor className="w-6 h-6 text-white" />,
    },
    {
      title: "Full Application Support",
      description: "We handle the entire registration process, ensuring accuracy and compliance.",
      icon: <CheckCircle className="w-6 h-6 text-white" />,
    },
    {
      title: "Copyright Certificate Delivery",
      description: "Receive official confirmation from the government once your filing is complete.",
      icon: <Award className="w-6 h-6 text-white" />,
    },
  ];

  const faqs = [
    {
      question: "Can anyone register a copyright?",
      answer: "Only the owner of the work can rightfully copyright it.",
    },
    {
      question: "When will my copyright registration take effect?",
      answer: "Copyright protection technically exists from the moment the work is created in a tangible form. However, registration provides a public record and is necessary for filing infringement lawsuits.",
    },
    {
      question: "What are the rights of a copyright owner?",
      answer: "A copyright owner has the exclusive right to reproduce, distribute, perform, display, and create derivative works based on the original.",
    },
    {
      question: "Is U.S. copyright registration required?",
      answer: "While protection is automatic upon creation, registration is required to sue for infringement in federal court and provides significant legal benefits.",
    },
    {
      question: "Is registering a copyright free?",
      answer: "No, the U.S. Copyright Office charges a filing fee, which varies depending on the type of application submitted.",
    },
    {
      question: "How long does a copyright registration last?",
      answer: "For works created after 1978, copyright protection typically lasts for the life of the author plus 70 years.",
    },
    {
      question: "What is group registration of unpublished works?",
      answer: "Group registration allows you to register up to 10 unpublished works (like photographs or songs) with a single application and filing fee.",
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
                Protect Your Creative Work with Copyright Registration Services in USA
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Whether you’re an author, artist, or business owner, our USA copyright registration services make it simple to secure your rights, prevent unauthorized use, and receive an official certificate of copyright registration. From online filing to full legal support, we’ll guide you through every step so your work stays yours.
              </p>
              <div className="flex items-center gap-4 mb-8">
                 <p className="font-bold text-gray-900 text-lg">Get started with copyright registration today.</p>
              </div>
              <Link href="/order/step2" className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                Register My Copyright
              </Link>
            </div>

            <div>
               <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -mr-8 -mt-8" />
                   <h3 className="text-2xl font-black text-gray-900 mb-4">What&apos;s Included</h3>
                   <div className="space-y-4">
                      <ul className="space-y-3">
                        {packageIncludes.map((item, i) => (
                           <li key={i} className="flex gap-3 text-sm text-gray-600">
                              <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                              {item}
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

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why Choose Brendat for Copyright Registration in USA?</h2>
             <p className="text-lg text-gray-600 max-w-4xl mx-auto">
               When it comes to protecting your creative work, you need more than just a form filed with the U.S. Copyright Office; you need a partner who ensures every detail is done right. At Brendat, we combine legal know-how with practical support so that your copyright registration in USA is fast, accurate, and stress-free.
             </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
             {whyChoose.map((item, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all flex flex-col items-center text-center">
                   <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                      {item.icon}
                   </div>
                   <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                   <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-6">Why Copyright Registration Matters in USA</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
               Even though your work is automatically protected the moment it’s created, official U.S. copyright registration offers critical advantages, including:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               {whyMatters.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl border-l-4 border-accent shadow-sm flex gap-4 items-start">
                     <div className="shrink-0 pt-1">{item.icon}</div>
                     <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="mt-12 text-center">
               <Link href="/contact" className="inline-block bg-transparent border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
                  Talk To Copyright Registration Attorney
               </Link>
            </div>
        </div>
      </section>
      
      {/* Online or Legal Support */}
      <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-accent/5 rounded-3xl p-8 md:p-12 text-center border border-accent/10">
               <h2 className="text-3xl font-black text-gray-900 mb-6">Copyright Registration Online or With Legal Support</h2>
               <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                  Need quick and convenient filing? Our online copyright registration services in USA let you submit your application with ease. Prefer hands-on legal guidance? Our USA-based copyright registration lawyers can manage the full process for copyright registration, offering personalized support every step of the way.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/order/step2" className="text-center bg-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                     Start My Copyright Registration
                  </Link>
                  <Link href="/order/step2" className="text-center bg-white border-2 border-accent text-accent px-6 py-3 rounded-xl font-bold hover:bg-accent/5 transition">
                     Online Copyright Registration
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6">Our Copyright Registration Services in USA</h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              We provide tailored support for creators, entrepreneurs, and businesses across industries. Our copyright registration lawyers in USA guide you through every step, from completing the correct copyright registration form to filing with the U.S. Copyright Office.
              <br/><br/>
              Our services include:
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {serviceFeatures.map((feature, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:bg-gray-700 transition flex flex-col items-center text-center group">
                 <div className="bg-accent p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                 </div>
                 <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                 <p className="text-sm text-gray-400">{feature.description}</p>
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
      
      {/* Before It's Too Late CTA */}
      <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
               <h2 className="text-3xl font-black text-gray-900 mb-6">Secure Your Rights Before It’s Too Late.</h2>
               <Link href="/order/step2" className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-accent/90 transition shadow-lg shadow-accent/20">
                  Register My Copyright Now
               </Link>
          </div>
      </section>

      {/* Bottom CTA / Contact */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Questions?</h2>
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
