"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Check, 
  Phone, 
  MessageCircle, 
  Shield, 
  Scale, 
  ChevronRight, 
  HelpCircle, 
  FileText,
  Clock,
  Briefcase,
  User,
  Users,
  Building,
  Award,
  PenTool,
  Zap,
  Globe,
  Layout,
  FileCheck,
  Search,
  Mail,
  Bell,
  Activity,
  MapPin,
  Lock,
  RefreshCw,
  Star,
  Trash2,
  XCircle
} from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

// ─────────────────────────────────────────────────────────────────────────────
// Content & Data
// ─────────────────────────────────────────────────────────────────────────────

const pricingPlans = [
  {
    name: "Standard Dissolution",
    price: "129",
    description: "With Brendat’s Standard Business Dissolution in USA, we simplify the process by preparing and filing all the required paperwork on your behalf.",
    features: [
      "Preparation of dissolution documents",
      "Submit your dissolution paperwork to the USA Secretary of State"
    ],
    buttonText: "Start My Dissolution",
    href: "/order/step2",
    color: "gray"
  },
  {
    name: "Express Dissolution",
    price: "239",
    description: "Ensures your business is closed quickly and without unnecessary delays. You’ll get expedited processing to help achieve legal closure faster.",
    features: [
      "Fast-tracked dissolution paperwork, reducing wait times and giving you peace of mind",
      "Delivery of official dissolution documents within 2–3 business days of approval"
    ],
    buttonText: "Start My Dissolution",
    includesLabel: "Everything from Standard, plus:",
    href: "/order/step2",
    color: "accent",
  },
  {
    name: "Dissolution Concierge",
    price: "799",
    description: "This premium service ensures every step is managed seamlessly, so you can focus on moving forward while we handle the details.",
    features: [
      "Experience peace of mind with white-glove, start-to-finish dissolution management handled by a dedicated Brendat concierge.",
      "A trained professional dedicated to managing your dissolution process, ensuring nothing slips through the cracks.",
      "Direct phone and email access to your concierge with prompt, priority responses to all your questions and concerns.",
      "Full evaluation of your Secretary of State status to identify any prerequisites, missing filings, or potential issues before final closure.",
      "Access to full-service compliance support, including handling Annual Reports, Beneficial Ownership Information Reports (BOI), and any other outstanding obligations required for legal closure."
    ],
    buttonText: "Get Dissolution Support",
    includesLabel: "Everything in Rush, plus:",
    href: "/contact",
    color: "gray",
    badge: "Full service"
  }
];

const whyBrendat = [
  { icon: Scale, title: "Attorney-Led Guidance", description: "Your dissolution is handled and reviewed by experienced USA business dissolution attorneys." },
  { icon: Zap, title: "Speed & Compliance", description: "We ensure your paperwork is filed quickly and in full compliance with state laws." },
  { icon: Users, title: "Peace of Mind for All Parties", description: "Clear communication and professional handling to support partners, investors, and stakeholders." },
  { icon: Globe, title: "Trusted by USA Businesses", description: "From startups to partnerships, businesses across USA and USA count on us to dissolve the right way." },
  { icon: Lock, title: "Confidential & Secure", description: "Your business and personal information are always protected with the highest privacy standards." },
  { icon: FileCheck, title: "Transparent & Affordable", description: "Straightforward pricing with no hidden costs or surprise fees." },
];

const whenToDissolve = [
  { icon: XCircle, title: "Permanent Closure of Operations", description: "When you’ve decided to stop business activities entirely and no longer plan to reopen." },
  { icon: TrendingDown, title: "Financial Unsustainability", description: "If the business is no longer profitable or lacks the resources to continue operating." },
  { icon: Users, title: "Partnership Changes", description: "In cases of partner disputes, retirement, or a buyout, dissolution may be necessary to legally end the business relationship." },
  { icon: Briefcase, title: "Mergers or Acquisitions", description: "If your company is joining with another or being purchased, dissolution of the original entity may be required." },
  { icon: AlertOctagon, title: "Avoiding Future Costs", description: "To prevent ongoing taxes, fees, or penalties on an inactive or abandoned business entity." },
];

const typesOfClosures = [
  { title: "LLC Dissolution (Single- or Multi-Member)", description: "From drafting dissolution agreements to filing with the USA Secretary of State, we handle every step to legally and cleanly close your LLC.", icon: FileText },
  { title: "Corporation Dissolution", description: "Whether you run a C-Corp or S-Corp, our USA dissolution attorneys guide you through shareholder approvals, compliance filings, and final tax obligations.", icon: Building },
  { title: "Partnership Dissolution", description: "We help resolve disputes, retirement exits, and buyouts by drafting legally binding agreements that protect each partner’s rights and obligations.", icon: Users },
  { title: "Sole Proprietorship Termination", description: "Even small businesses need proper closure to avoid future tax liabilities and fees. Our team ensures your business is legally terminated.", icon: User },
  { title: "Business Partner Buyouts", description: "Our lawyers help negotiate, draft, and file the right agreements to ensure buyouts are handled fairly and with full compliance.", icon: Scale },
  { title: "Owner Retirement or Exit Planning", description: "If you’re stepping away from your business, we provide legal and strategic guidance to ensure your exit is smooth and liability-free.", icon: Clock },
  { title: "Dissolution Due to Lawsuit or Dispute", description: "In cases of litigation, deadlock, or court-ordered dissolution, our USA attorneys protect your legal rights while managing the closure.", icon: Shield },
  { title: "Business Company Evaluation and Valuation", description: "Before dissolving, we help you assess your company’s financial standing and explore exit alternatives to maximize your return.", icon: Activity },
];

const faqs = [
  { question: "What is a business dissolution?", answer: "It’s the legal process of formally ending a business entity’s existence. It involves filing the proper forms with the USA Secretary of State and wrapping up business affairs." },
  { question: "What are the business dissolution documents in USA?", answer: "The primary document is the Articles of Dissolution (or Certificate of Termination). You may also need tax clearance certificates and a formal dissolution agreement between owners." },
  { question: "Do I need a business dissolution lawyer?", answer: "While simpler dissolutions can be filed directly, a lawyer ensures that debts are properly handled, assets are distributed correctly, and you are protected from future liability." },
  { question: "What happens in a business partnership dissolution?", answer: "Partners must agree on how to split assets and debts. A dissolution agreement is critical here to prevent disputes and clarify terms." },
  { question: "Can I dissolve a business without the other partner?", answer: "It depends on your operating agreement. Usually, a vote is required. If deadlocked, you may need legal intervention or court-ordered dissolution." },
  { question: "What’s the difference between voluntary and involuntary dissolution?", answer: "Voluntary is when owners choose to close. Involuntary is forced by the state (due to unpaid taxes) or a court order (due to lawsuits or deadlock)." },
];

const reviews = [
  { name: "Samantha P.", role: "LLC Customer", text: "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!" },
  { name: "Carlos M.", role: "Trademark Customer", text: "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way." },
  { name: "Nell C.", role: "Last Will Customer", text: "We used Brendat for our estate planning documents, and I can’t thank them enough. Everything was explained thoroughly, and now I know my family is taken care of." },
];

export default function DissolutionPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent/5 py-20 overflow-hidden">
          <HeroAvatars />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,74,0,0.08),transparent_50%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">End Your Business the Right Way with Professional Dissolution Services in USA</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Whether you’re closing a chapter or dissolving a partnership, Brendat will help you make a clean legal exit with expert business dissolution services in USA, USA. We assist LLCs, corporations, and partnerships through every step of the USA business dissolution process.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/order/step2" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all text-lg">
                  Start My Business Dissolution
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg">
                  Talk to a Dissolution Attorney
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-4">What’s Included in Our USA Business Dissolution Services</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, i) => (
                <div key={i} className={`relative bg-white rounded-3xl p-8 border-2 ${plan.color === "accent" ? "border-accent shadow-2xl shadow-accent/10 scale-105 z-10" : "border-gray-200 shadow-xl"} flex flex-col h-full`}>
                  {plan.badge && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest">{plan.badge}</span>}
                  
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-6 min-h-[60px]">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-black text-gray-900">${plan.price}</span>
                    <span className="text-sm font-bold text-gray-500 ml-1">+state filing fees</span>
                  </div>

                  <Link href={plan.href} className={`w-full text-center py-4 rounded-xl font-bold mb-8 transition-all ${plan.color === "accent" ? "bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/25" : "bg-gray-900 hover:bg-gray-800 text-white"}`}>
                    {plan.buttonText}
                  </Link>

                  <div className="pt-6 border-t border-gray-100 flex-1">
                    {plan.includesLabel && <p className="font-bold text-gray-900 mb-4">{plan.includesLabel}</p>}
                    <ul className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-3">
                          <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center bg-gray-50 rounded-2xl p-6 border border-gray-100 max-w-2xl mx-auto">
               <div className="flex justify-center mb-3">
                  <Shield className="w-8 h-8 text-accent" />
               </div>
               <h3 className="text-lg font-bold text-gray-900 mb-2">100% Accurate Filing Guarantee</h3>
               <p className="text-gray-600 text-sm">We’re committed to the highest quality and accuracy. If your filing is rejected or incorrect due to our error, we’ll correct it with the government agency at no additional cost to you.</p>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE BRENDAT */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why Choose Brendat to Dissolve Your Business in USA?</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Looking for the best business dissolution lawyer in USA or reliable services near you? Our local, trusted team understands the complexities of closing a business and provides the expertise, care, and efficiency you need to move forward with confidence.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyBrendat.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHEN TO DISSOLVE */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">When Should You Dissolve a Business in USA?</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Deciding to dissolve a business is never easy, but there are times when closing your company the right way is the best step forward. Whether you’re shutting down due to financial challenges, internal changes, or strategic growth through a merger, filing for business dissolution in USA allows you to close the chapter with clarity and compliance, ensuring you’re protected from ongoing legal, financial, and tax obligations.
                  </p>
                  <Link href="/order/step2" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-xl transition-all">
                    Start My Dissolution
                  </Link>
               </div>
               <div className="space-y-6">
                 {whenToDissolve.map((item, i) => {
                   const Icon = item.icon;
                   return (
                     <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex gap-4">
                       <div className="shrink-0 mt-1">
                         <Icon className="w-6 h-6 text-accent" />
                       </div>
                       <div>
                         <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                         <p className="text-sm text-gray-600">{item.description}</p>
                       </div>
                     </div>
                   );
                 })}
               </div>
             </div>
          </div>
        </section>

        {/* WHAT IS DISSOLUTION & AGREEMENT */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Left */}
              <div>
                <h2 className="text-3xl font-black mb-6">What Is Business Dissolution?</h2>
                <p className="text-white/80 mb-6 text-lg">
                  Business dissolution is the formal process of ending a business entity’s legal existence. Whether you’re closing voluntarily or due to internal disputes, dissolving your business correctly is essential to:
                </p>
                <ul className="space-y-3 mb-8">
                  {["Prevent future tax or legal liabilities", "Terminate ongoing business obligations", "Distribute remaining assets fairly", "Protect your personal liability"].map((item, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-white/60 text-sm">We handle all aspects of business dissolution in USA, from evaluating your company’s situation to preparing and filing your business dissolution documents.</p>
              </div>

              {/* Right */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <FileText className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-black mb-4">Do I Need a Business Dissolution Agreement in USA?</h3>
                <p className="text-white/80 mb-6">
                  Yes, especially in the case of partnerships, corporations, or multi-member LLCs. A business dissolution agreement in USA outlines:
                </p>
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-accent mt-0.5" /> Which members or partners agree to dissolve the business</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-accent mt-0.5" /> How will the remaining assets and liabilities be distributed</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-accent mt-0.5" /> Who is responsible for filing the final documents</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-accent mt-0.5" /> What happens to contracts, clients, and intellectual property</li>
                </ul>
                <div className="bg-accent/10 p-4 rounded-xl border border-accent/20 mb-6">
                   <p className="text-sm font-medium text-white">If you’re managing a business partnership dissolution, this document is crucial for preventing disputes and protecting each party’s rights.</p>
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-3 rounded-xl transition-all">
                  Talk to a Dissolution Attorney
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* TYPES OF CLOSURES */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-accent font-black uppercase tracking-widest text-sm mb-2 block">Business License Attorney</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">We Help With All Types of Business Closures in USA</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Closing a business is a big decision, and it requires more than just paperwork; it takes careful planning, legal compliance, and the right guidance. At Brendat, our team, led by the best business dissolution lawyers in USA, helps business owners navigate every step of the process with clarity and confidence.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {typesOfClosures.map((type, i) => {
                const Icon = type.icon;
                return (
                  <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all group h-full">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-12 text-center">
               <p className="text-gray-600 mb-4 font-medium">We’ll also guide you in comparing the right business dissolution options so you can make the best decision before committing to closure.</p>
               <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all">
                 Get Help with My Business Exit
               </Link>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2 flex gap-3 text-left">
                    <HelpCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 pl-8 text-left">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
                <p className="uppercase text-accent font-black tracking-widest text-sm mb-2">Our Reviews</p>
                <h2 className="text-3xl font-black text-gray-900">What our customers are saying?</h2>
             </div>
             <div className="grid md:grid-cols-3 gap-8">
               {reviews.map((review, i) => (
                 <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center flex flex-col items-center">
                    <div className="mb-4 text-accent flex gap-1 justify-center">
                      {[1,2,3,4,5].map(star => <StarIcon key={star} className="w-5 h-5 fill-current" />)}
                    </div>
                    <p className="text-gray-600 italic mb-6">"{review.text}"</p>
                    <div className="mt-auto">
                      <p className="font-bold text-gray-900">{review.name}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{review.role}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* CONTACT CTA FOOTER */}
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

function StarIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TrendingDown({ className }: { className?: string }) {
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
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  )
}

function AlertOctagon({ className }: { className?: string }) {
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
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}
