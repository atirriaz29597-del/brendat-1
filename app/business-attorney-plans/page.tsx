"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";
import { 
  Scale, 
  FileText, 
  Shield, 
  Building2, 
  Award, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  ChevronDown, 
  MessageCircle,
  Phone,
  Mail,
  TrendingUp,
  Users,
  Briefcase,
  Landmark,
  FileCheck,
  Gavel,
  UserCheck,
  Target,
  Search,
  Star
} from "lucide-react";

export default function BusinessAttorneyPlans() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const features = [
    {
      icon: Clock,
      title: "Unlimited 30-Minute Consultations",
      description: "Speak with a business attorney about new legal matters as they arise."
    },
    {
      icon: DollarSign,
      title: "Exclusive Discounts",
      description: "Save on select Brendat legal services designed to support your business."
    },
    {
      icon: FileText,
      title: "Document Library Access",
      description: "Browse 150+ customizable legal templates to handle routine business needs."
    },
    {
      icon: CheckCircle,
      title: "Annual Legal Check-Up",
      description: "After 6 months, get a one-hour review of your company's contracts, policies, and compliance."
    },
    {
      icon: FileCheck,
      title: "Document Review",
      description: "Attorney review of business contracts and agreements (up to 10 pages)."
    },
    {
      icon: Award,
      title: "Discounted Attorney Services",
      description: "Receive 25% off additional services when your needs go beyond the basics."
    },
    {
      icon: FileText,
      title: "Unlimited eSignature Access",
      description: "Easily sign and manage business documents online."
    },
    {
      icon: Shield,
      title: "Copyright Filing Support",
      description: "One copyright registration per month to protect your creative assets."
    }
  ];

  const services = [
    {
      icon: Building2,
      title: "Business Formation",
      description: "LLCs, corporations, partnerships, and startups."
    },
    {
      icon: FileText,
      title: "Contracts & Agreements",
      description: "Drafting, reviewing, and negotiating clear and enforceable contracts."
    },
    {
      icon: Gavel,
      title: "Business Litigation",
      description: "Representation in disputes, breach of contract, partnership conflicts, or employment issues."
    },
    {
      icon: Scale,
      title: "Regulatory Compliance",
      description: "Guidance on USA business laws, licenses, and industry regulations."
    },
    {
      icon: TrendingUp,
      title: "Small Business Legal Needs",
      description: "Affordable solutions tailored for growing companies."
    }
  ];

  const solutions = [
    {
      icon: Building2,
      title: "Entity Formation & Structuring",
      description: "Choosing the right legal structure is the foundation of your business. We guide you through LLCs, corporations, partnerships, and other entity options, ensuring compliance with USA law while aligning with your goals for taxation, liability, and growth."
    },
    {
      icon: Briefcase,
      title: "Mergers & Acquisitions",
      description: "Buying or selling a business requires careful due diligence and skilled negotiation. Our attorneys handle contract drafting, regulatory review, and risk assessment to make sure your transaction is smooth, efficient, and legally sound."
    },
    {
      icon: Users,
      title: "Employment Law Compliance",
      description: "USA employment laws can be challenging for businesses to navigate. We help you draft clear employee agreements, establish workplace policies, and address compliance issues to reduce disputes and protect both employer and employee rights"
    },
    {
      icon: Shield,
      title: "Intellectual Property Protection",
      description: "Your brand, inventions, and creative works are valuable business assets. We assist with trademarks, copyrights, licensing agreements, and IP enforcement strategies to safeguard your intellectual property from misuse."
    },
    {
      icon: Landmark,
      title: "Business Bankruptcy Guidance",
      description: "Financial setbacks don't have to mean the end of your business. Our attorneys provide options for restructuring, asset protection, and bankruptcy filings, helping you make informed decisions about your company's financial future."
    },
    {
      icon: Gavel,
      title: "Litigation & Dispute Resolution",
      description: "When conflicts arise, whether with partners, employees, or vendors, we're prepared to represent your interests in negotiations, mediation, arbitration, or court. Our goal is always to resolve disputes efficiently while protecting your bottom line."
    }
  ];

  const attorneys = [
    {
      image: "/attorney-1.jpg",
      bio: "With decades of experience in business and estate law, I take the time to truly listen to my clients' needs. Every business challenge has a story behind it, and I focus on practical, results-driven solutions that give peace of mind. My clients value not only my legal guidance but also my availability and commitment to helping them achieve the outcomes they deserve."
    },
    {
      image: "/attorney-2.jpg",
      bio: "Since 2009, I've worked with individuals and businesses to resolve a wide range of legal matters. From business formation to litigation, I strive to make complex issues clear and accessible. My approach is rooted in clear communication, cost-effective strategies, and a dedication to helping clients move forward with confidence."
    },
    {
      image: "/attorney-3.jpg",
      bio: "Licensed since 2004, I've handled everything from contract disputes to real estate closings and estate planning. What I've learned is that behind every case is a person whose future depends on getting it right. Knowing my work has helped businesses and families find better outcomes is the most rewarding part of being an attorney."
    }
  ];

  const whyChoose = [
    {
      number: "01",
      title: "Local USA Knowledge",
      description: "Our experienced business attorneys in USA know USA business laws inside and out."
    },
    {
      number: "02",
      title: "Tailored Legal Strategies",
      description: "From startups to corporations, we adapt to your needs."
    },
    {
      number: "03",
      title: "Proven Litigation Experience",
      description: "Skilled business litigation attorneys to protect your interests in court."
    },
    {
      number: "04",
      title: "Flat-Fee Options",
      description: "Affordable and transparent pricing with no hidden costs."
    },
    {
      number: "05",
      title: "Accessible & Responsive",
      description: "Whether you're searching for a small business attorney near me or a complex business law attorney, our team is available when you need us."
    }
  ];

  const faqs = [
    {
      question: "Do I need a business attorney to start a company in USA?",
      answer: "You are not legally required to hire a business attorney when forming a company in USA, but having one can save you time, money, and potential disputes later. A business formation attorney ensures your LLC, corporation, or partnership complies with USA Business Organizations Code, helps you choose the right structure for liability and tax purposes, and drafts operating agreements or bylaws tailored to your goals. Without this guidance, many entrepreneurs face issues with ownership disputes, liability exposure, or tax inefficiencies."
    },
    {
      question: "How much does it cost to hire a small business attorney in USA?",
      answer: "The cost varies depending on the scope of services. Our attorney plans start at $39.09/month (billed annually) and include unlimited 30-minute consultations, document review, and exclusive discounts. For project-based work outside the plan, we offer flat-fee options and transparent pricing with no hidden costs."
    },
    {
      question: "What's the difference between a business law attorney and a business litigation attorney?",
      answer: "A business law attorney handles proactive legal matters like entity formation, contracts, compliance, and transactions. A business litigation attorney represents you in disputes, lawsuits, and court proceedings. At Brendat, our attorneys handle both transactional work and litigation, providing comprehensive support for all your business legal needs."
    },
    {
      question: "Can a business attorney help with bankruptcy?",
      answer: "Yes. Our business attorneys provide guidance on bankruptcy options, asset protection strategies, and financial restructuring. We help you understand your options under Chapter 7, Chapter 11, or Chapter 13 bankruptcy and work to protect your interests throughout the process."
    },
    {
      question: "What if I just need contract review?",
      answer: "Our attorney plans include document review for contracts and agreements up to 10 pages. If you need a one-time review outside of a plan, we offer flat-fee contract review services tailored to your specific needs."
    },
    {
      question: "Do I need a business attorney near me, or can everything be done online?",
      answer: "Most business legal services can be handled remotely through consultations, document sharing, and e-signatures. However, having a USA-based attorney who understands local business laws and regulations is essential for compliance and effective representation, especially for litigation or regulatory matters."
    },
    {
      question: "Can a small business attorney help with employee issues?",
      answer: "Absolutely. Our attorneys assist with employment agreements, workplace policies, compliance with USA labor laws, wrongful termination claims, and other employee-related legal matters to help protect both your business and your workforce."
    },
    {
      question: "How do I choose the best business attorney in USA?",
      answer: "Look for an attorney with experience in your industry, transparent pricing, strong communication skills, and a track record of successful outcomes. At Brendat, our attorneys combine local USA knowledge with practical, cost-effective strategies designed to support businesses at every stage of growth."
    }
  ];

  const reviews = [
    {
      name: "Samantha P., LLC Customer",
      text: "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!"
    },
    {
      name: "Carlos M., Trademark Customer",
      text: "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way."
    },
    {
      name: "Nell C., Last Will Customer",
      text: "We used Brendat for our estate planning documents, and I can't thank them enough. Everything was explained thoroughly, and now I know my family is taken care of."
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-accent/5 pt-20 pb-24 overflow-hidden">
        <HeroAvatars />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Scale className="w-4 h-4" />
              Business Legal Services
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Trusted Business Attorneys in USA Helping You Build, Protect, and Grow Your Business
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Running a business in USA offers exciting opportunities and serious legal responsibilities. At Brendat, our experienced business attorneys in USA help entrepreneurs, startups, and established companies handle legal matters with confidence. Whether you're just forming your business or facing complex litigation, our team is here to protect your interests at every stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-accent/90 transition-all"
              >
                <Scale className="w-5 h-5" />
                Get Legal Support Now
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-accent border-2 border-accent px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/5 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Talk To An Attorney
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Support Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Comprehensive Support for Your Business
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get everything you need to protect and grow your business with our attorney plans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all hover:border-accent/20"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Select Your Business Attorney Plan
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that works best for your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 12-Month Plan */}
            <div className="relative bg-white border-2 border-accent rounded-2xl shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-sm font-bold rounded-bl-xl">
                Most Popular
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-4">12-Month Plan</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black text-accent">$39.09</span>
                  <span className="text-gray-600 font-medium">/mo</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">billed annually at $469†</p>
                <a
                  href="#contact"
                  className="block w-full bg-accent text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
                >
                  Get Legal Support Now
                </a>
              </div>
            </div>

            {/* 6-Month Plan */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-4">6-Month Plan</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black text-gray-900">$43.17</span>
                  <span className="text-gray-600 font-medium">/mo</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">billed every 6 months at $259†</p>
                <a
                  href="#contact"
                  className="block w-full bg-gray-900 text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all"
                >
                  Talk To Business Attorney
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hire Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Why Hire Our Business Attorneys in USA?
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Whether you're launching a startup, managing contracts, or navigating complex disputes, having an experienced business attorney in USA ensures your company stays protected and positioned for growth. At Brendat, our attorneys don't just solve problems when they arise; they help you prevent them with proactive, USA-specific legal guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 5).map((service, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all hover:border-accent/30"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attorney Profiles Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Experienced Attorneys, Dedicated to Your Business in USA
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {attorneys.map((attorney, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Scale className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-700 leading-relaxed italic">{attorney.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-accent/90 transition-all"
            >
              <Users className="w-5 h-5" />
              View the attorneys in our network for your business legal needs
            </a>
          </div>
        </div>
      </section>

      {/* Comprehensive Business Law Solutions Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Comprehensive Business Law Solutions for USA Companies
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Running a business in USA means navigating not only day-to-day operations but also the complex legal landscape that comes with it. At Brendat, our business attorneys provide proactive legal strategies designed to protect your company's interests, reduce risk, and support long-term growth. Whether you're launching a startup or managing an established enterprise, our team is here to help at every stage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all hover:border-accent/30"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <solution.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600 leading-relaxed">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Why Choose Brendat's Business Attorneys in USA, USA?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              When searching for a business attorney near me, you want more than just legal documents; you want a partner who understands your goals. With Brendat, you'll get:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyChoose.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:border-accent/30"
              >
                <div className="text-5xl font-black text-accent/20 mb-4">{item.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-accent to-accent/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            Work with a Trusted Business Attorney in USA
          </h2>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-white text-accent px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Get Started Today
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden hover:border-accent/30 transition-all"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900 pr-8">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-accent shrink-0 transition-transform ${
                      openFAQ === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFAQ === idx && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Our Reviews
            </h2>
            <p className="text-lg text-gray-600">What our customers are saying?</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 italic">"{review.text}"</p>
                <p className="font-bold text-gray-900">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Questions?</h2>
            <p className="text-lg text-gray-600">
              Get expert support for legal matters with our attorney by your side.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-8 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ask An Attorney</h3>
              <p className="text-gray-600 mb-4">
                Get expert support for legal matters with our attorney by your side.
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Mon–Fri 5 am–7 pm PT<br />
                Sat–Sun 7 am–4 pm PT
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-accent/90 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Attorney
              </a>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call An Agent</h3>
              <p className="text-gray-600 mb-4">At (303) 246-8693</p>
              <p className="text-sm text-gray-600 mb-6">
                Mon–Fri 5 am–7 pm PT<br />
                Sat–Sun 7 am–4 pm PT
              </p>
              <a
                href="tel:3032468693"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:bg-accent/90 transition-all"
            >
              <Scale className="w-5 h-5" />
              Get Legal Help
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
