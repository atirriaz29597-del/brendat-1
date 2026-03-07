"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Check, 
  Phone, 
  MessageCircle, 
  Shield, 
  FileText, 
  Scale, 
  ChevronRight, 
  HelpCircle, 
  Briefcase, 
  UserCheck, 
  Wallet, 
  Clock,
  ArrowRight,
  Calculator,
  Building2,
  FileCheck2,
  AlertTriangle
} from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroAvatars from "@/app/components/HeroAvatars";

// ─────────────────────────────────────────────────────────────────────────────
// Data Arrays
// ─────────────────────────────────────────────────────────────────────────────

const characteristics = [
  { 
    icon: Scale, 
    title: "Legal Simplicity", 
    description: "The owner and the business are considered the same entity, keeping things simple and straightforward." 
  },
  { 
    icon: Wallet, 
    title: "Tax Benefits", 
    description: "Report all profits and losses on your personal tax return; no separate corporate taxes required." 
  },
  { 
    icon: FileText, 
    title: "Minimal Paperwork", 
    description: "No corporate formalities or complex filings. Focus on running your business, not administrative tasks." 
  },
  { 
    icon: Clock, 
    title: "Easy Setup & Management", 
    description: "Quick to start and simple to maintain, perfect for freelancers, consultants, and small business owners." 
  },
];

const steps = [
  { 
    number: "01", 
    title: "Pick a Business Name", 
    description: "You can use your full legal name or file a DBA (Doing Business As) in USA if you prefer a different brand name.",
    linkText: "Learn About DBAs",
    href: "/doing-business-as-dba"
  },
  { 
    number: "02", 
    title: "File DBA (Assumed Name Certificate)", 
    description: "Most USA counties require this if you’re not operating under your full legal name. We handle the filing for you.",
    linkText: "Learn About Licenses",
    href: "/business-licenses"
  },
  { 
    number: "03", 
    title: "Apply for a Business License", 
    description: "Depending on your industry and location, sole proprietorship business license in USA is required.",
    linkText: "Learn About LLCs",
    href: "/limited-liability-company-llc"
  },
  { 
    number: "04", 
    title: "Get Your EIN (Optional)", 
    description: "You can use your SSN, but obtaining an EIN is advisable to hire employees & maintain separate finances.",
    linkText: "Talk To Attorney",
    href: "/contact"
  },
  { 
    number: "05", 
    title: "Pay Local Taxes and Fees", 
    description: "Even if you don’t owe federal business taxes, you may need to register for sales tax or pay franchise/local fees.",
    linkText: "Learn About LLCs",
    href: "/limited-liability-company-llc"
  },
];

const onlineFeatures = [
  { 
    title: "DBA Name Search and Filing", 
    description: "As a sole proprietor, you're personally liable if the business gets sued or incurs debts." 
  },
  { 
    title: "EIN Application (if needed)", 
    description: "Sole proprietors must report business profits as personal income, and pay self-employment tax." 
  },
  { 
    title: "Business license lookup", 
    description: "It's harder to attract investors because you have no partners, shares, or membership interests." 
  },
  { 
    title: "Printable Documents", 
    description: "Sole proprietors must report business profits as personal income, and pay self-employment tax." 
  },
  { 
    title: "Ongoing Compliance Support", 
    description: "Sole proprietors must report business profits as personal income, and pay self-employment tax." 
  },
];

const faqs = [
  { 
    question: "Is a sole proprietorship a legal entity in USA?", 
    answer: "No. A sole proprietorship is not a separate legal entity. You and your business are considered the same for legal and tax purposes." 
  },
  { 
    question: "How do I register a sole proprietorship in USA?", 
    answer: "We can help get you started today." 
  },
  { 
    question: "Can I run a sole proprietorship from home?", 
    answer: "" 
  },
  { 
    question: "Can I switch from a sole proprietorship to an LLC later?", 
    answer: "" 
  },
  { 
    question: "Do I need an EIN for my sole proprietorship in USA?", 
    answer: "" 
  },
  { 
    question: "What’s the difference between an LLC and a sole proprietorship in USA, USA?", 
    answer: "" 
  },
];

export default function SoleProprietorshipPage() {
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">Start Your Sole Proprietorship in USA with Confidence</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Whether you want to set up your sole proprietorship online in USA or need step-by-step legal support, we’ve got your back. We help you register your sole proprietorship in USA, USA, file your DBA (Doing Business As), and understand your local licensing and tax obligations so that you can launch your business with confidence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all text-lg">
                  Register My Sole Proprietorship
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-accent text-gray-700 hover:text-accent font-bold px-8 py-4 rounded-xl transition-all text-lg">
                  Sole Proprietorship Owner
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IS A SOLE PROPRIETORSHIP */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">What Is a Sole Proprietorship in USA?</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12">
                A sole proprietorship is an unincorporated business owned and operated by one person. In USA, formal registration with the state is not required to begin operating; however, local filings may still be applicable, especially if you’re using a business name, opening a bank account, or applying for licenses.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {characteristics.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all text-left">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-12 bg-accent/5 rounded-2xl p-8 border border-accent/10">
                <p className="text-gray-700 max-w-3xl mx-auto">
                  While it’s the most common business structure in USA, it’s not always the best fit, especially if you’re looking for liability protection. That’s why we help you explore the pros and cons of sole proprietorship vs LLC in USA before you commit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO REGISTER */}
        <section className="py-20 bg-gray-50" id="start-order">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">How to Register a Sole Proprietorship in USA with Brendat</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {steps.map((step) => (
                <div key={step.number} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center font-black text-lg mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-6 flex-grow">{step.description}</p>
                  <Link href={step.href} className="text-accent font-bold hover:underline inline-flex items-center gap-1 mt-auto">
                    {step.linkText} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Understanding the Difference Between a Sole Proprietorship and an LLC in USA, USA</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Choosing the right business structure in USA can make a big difference for liability, taxes, and growth. Whether you’re a freelancer, consultant, or small business owner, understanding the pros and cons of a sole proprietorship versus an LLC in USA will help you start with confidence and protect your personal assets.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-xl mb-16">
              <table className="w-full min-w-[700px] bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-6 px-8 text-left text-gray-500 font-bold uppercase tracking-wider w-1/4">Feature</th>
                    <th className="py-6 px-8 text-left text-gray-900 font-black text-xl w-1/3">Sole Proprietorship</th>
                    <th className="py-6 px-8 text-left text-accent font-black text-xl w-1/3 bg-accent/5">LLC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-6 px-8 font-bold text-gray-900">Liability Protection</td>
                    <td className="py-6 px-8 text-gray-600">Personal and business assets are legally the same, so you’re fully exposed to business debts and liabilities.</td>
                    <td className="py-6 px-8 text-gray-600 bg-accent/5 font-medium">Your personal assets are separated from your business, giving you protection from most business liabilities.</td>
                  </tr>
                  <tr>
                    <td className="py-6 px-8 font-bold text-gray-900">Business Taxes</td>
                    <td className="py-6 px-8 text-gray-600">Pass-through taxation: profits and losses are reported on your personal tax return, keeping taxes simple.</td>
                    <td className="py-6 px-8 text-gray-600 bg-accent/5 font-medium">Offers pass-through taxation or the option to elect S-Corp status, giving flexibility to optimize taxes.</td>
                  </tr>
                  <tr>
                    <td className="py-6 px-8 font-bold text-gray-900">Legal Formation</td>
                    <td className="py-6 px-8 text-gray-600">Minimal setup is required. Just register a DBA if using a business name other than your own.</td>
                    <td className="py-6 px-8 text-gray-600 bg-accent/5 font-medium">Requires formal state filing, including Articles of Organization, and compliance with ongoing requirements.</td>
                  </tr>
                  <tr>
                    <td className="py-6 px-8 font-bold text-gray-900">Business Name Flexibility</td>
                    <td className="py-6 px-8 text-gray-600">Must register a DBA to operate under a business name, limiting flexibility in some situations.</td>
                    <td className="py-6 px-8 text-gray-600 bg-accent/5 font-medium">Registered with the USA Secretary of State, offering stronger name protection and branding opportunities.</td>
                  </tr>
                  <tr>
                    <td className="py-6 px-8 font-bold text-gray-900">Cost to Start</td>
                    <td className="py-6 px-8 text-gray-600">Low, affordable and easy to get started.</td>
                    <td className="py-6 px-8 text-gray-600 bg-accent/5 font-medium">Some filing fees and ongoing compliance costs apply.</td>
                  </tr>
                  <tr>
                    <td className="py-6 px-8 font-bold text-gray-900">Credibility</td>
                    <td className="py-6 px-8 text-gray-600">Good for solo ventures or low-risk businesses.</td>
                    <td className="py-6 px-8 text-gray-600 bg-accent/5 font-medium">Adds professionalism and can increase trust with clients, partners, and investors.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-900 rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 relative z-10">Still Confused Between a Sole Proprietorship or LLC?</h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8 relative z-10">
                Start your business in USA today with Brendat, and get expert guidance to choose the right structure when you’re ready. Simple, Flexible, and Stress-free.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Link href="/contact" className="bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/25 transition-all text-lg">
                  Start My Sole Proprietorship
                </Link>
                <Link href="/contact" className="bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-all text-lg">
                  Talk to a USA Sole Proprietorship Formation Attorney
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* APPLY ONLINE FEATURES */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Apply for Sole Proprietorship Online in USA</h2>
                <p className="text-lg text-gray-600 mb-8">
                  With Brendat, setting up your sole proprietorship in USA, USA , has never been easier. Our platform guides you step by step so you can launch your business quickly and confidently. We handle everything from DBA name search and filing to EIN application if required, and provide tools for business license lookup and printable formation documents.
                </p>
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Start Your USA Sole Proprietorship Formation Today!</h3>
                  <Link href="/contact" className="text-accent font-bold hover:underline inline-flex items-center gap-1">
                    Register Online Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                {onlineFeatures.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                      <AlertTriangle className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQS */}
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

        {/* EXPERT SUPPORT */}
        <section className="py-16 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-300 flex gap-5 items-start">
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
              <div className="bg-white rounded-2xl p-8 border border-gray-300 flex gap-5 items-start">
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
