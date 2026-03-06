"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, Zap, Users, Globe, Award, TrendingUp, Heart, Star } from "lucide-react";

const stats = [
  { value: "1M+", label: "Businesses Formed", desc: "Entrepreneurs trust Brendat" },
  { value: "50", label: "States Covered", desc: "Register anywhere in the USA" },
  { value: "98%", label: "Satisfaction Rate", desc: "Verified customer reviews" },
  { value: "24/7", label: "Expert Support", desc: "Always here when you need us" },
];

const values = [
  {
    icon: Shield,
    title: "Compliance First",
    desc: "We ensure every filing meets 100% state and federal compliance standards. Your peace of mind is our baseline.",
    color: "bg-orange-50",
    iconColor: "text-accent",
  },
  {
    icon: Zap,
    title: "Speed & Simplicity",
    desc: "From signup to filed documents in as little as 24 hours. We've eliminated the paperwork maze so you don't have to.",
    color: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    icon: Heart,
    title: "Founder Empathy",
    desc: "Built by entrepreneurs, for entrepreneurs. Every feature is designed around the real struggles of starting a business.",
    color: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    icon: Globe,
    title: "Nationwide Reach",
    desc: "Whether you're in Texas, Delaware, or Wyoming — we handle all 50 states with equal depth and expertise.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    icon: Users,
    title: "Dedicated Experts",
    desc: "Real business attorneys and compliance specialists review every order. No bots, no guesswork.",
    color: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Growth Partnership",
    desc: "We're not just a filing service — we're your long-term partner for compliance, taxes, and expansion.",
    color: "bg-amber-50",
    iconColor: "text-amber-500",
  },
];

const timeline = [
  {
    year: "2018",
    title: "Brendat Founded",
    desc: "Started in Georgia by a team of attorneys and entrepreneurs frustrated by how painful and expensive business registration had become.",
  },
  {
    year: "2019",
    title: "50-State Coverage Launched",
    desc: "Expanded from Texas to all 50 states, giving every American entrepreneur equal access to fast, affordable business formation.",
  },
  {
    year: "2021",
    title: "100,000 Customers Milestone",
    desc: "Crossed 100,000 businesses formed — a testament to our obsession with simplicity, speed, and genuine customer care.",
  },
  {
    year: "2023",
    title: "Compliance Dashboard Introduced",
    desc: "Launched our proprietary compliance tracking platform — the first real-time dashboard for business owners to track filings, renewals, and deadlines.",
  },
  {
    year: "2025",
    title: "1 Million+ Businesses Served",
    desc: "Reached the landmark of over 1 million businesses formed and managed through Brendat —  making us one of America's most trusted formation platforms.",
  },
];

const awards = [
  "Best Business Formation Service — Forbes 2024",
  "#1 Most Trusted LLC Filing Platform — Trustpilot",
  "Top 10 LegalTech Startups — TechCrunch 2023",
  "Best Value Business Services — U.S. Chamber of Commerce",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-[#E6EFF0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-accent transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <Link href="/" className="text-xl font-black text-primary tracking-tight">Brendat</Link>
            <Link
              href="/contact"
              className="bg-accent hover:bg-accent-dark text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-accent/20 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative bg-primary overflow-hidden py-24 md:py-32">
        {/* dot pattern */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#FF4A00_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>
        {/* glow */}
        <div className="absolute -top-10 left-1/3 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 mb-8 text-sm font-medium text-orange-200">
            <Award className="w-4 h-4" /> America&apos;s Most Trusted Business Formation Platform
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.06] tracking-tight mb-6 max-w-4xl">
            We Help <span className="text-accent">Founders</span><br />
            Build What Matters
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
            Brendat was born from a simple belief — that starting a business in America should be fast, affordable, and stress-free for everyone. Not just those who can afford expensive attorneys.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#hero"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-accent/30 transition-all"
            >
              Start Your Business <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition-all"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-[#f5f5f5] border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left">
                <p className="text-4xl font-black text-accent mb-1">{s.value}</p>
                <p className="font-bold text-primary text-base mb-1">{s.label}</p>
                <p className="text-gray-500 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] text-accent bg-orange-50 px-3 py-1.5 rounded-full mb-5">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-6">
                Leveling the Playing Field for <span className="text-accent">Every Entrepreneur</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                For too long, forming a business meant navigating a maze of government portals, confusing paperwork, and attorney fees that put dreams out of reach for millions of people.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Brendat changes that. We've taken what used to take weeks and thousands of dollars, and distilled it into a 15-minute process — giving every founder in America the same starting line.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "State-filed documents in as little as 24 hours",
                  "Transparent pricing — no hidden fees, ever",
                  "Real compliance experts reviewing every order",
                  "Lifetime support for the life of your business",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-gray-700 font-medium text-[15px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — visual card */}
            <div className="relative">
              <div className="bg-primary rounded-3xl p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-accent/20 rounded-full blur-[80px] pointer-events-none" />
                <blockquote className="relative z-10">
                  <div className="text-6xl text-accent font-black leading-none mb-4">&ldquo;</div>
                  <p className="text-xl md:text-2xl font-bold leading-relaxed text-white mb-8">
                    We built Brendat because we believe the American dream of business ownership should be accessible to everyone — not just those with connections or capital.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-black text-lg">M</div>
                    <div>
                      <p className="font-bold text-white">Marcus Reid</p>
                      <p className="text-gray-400 text-sm">Co-Founder & CEO, Brendat</p>
                    </div>
                  </div>
                </blockquote>
              </div>

              {/* floating badge */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-4 flex items-center gap-3">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div>
                  <p className="font-black text-sm text-primary">4.8 / 5</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Trustpilot</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY / TIMELINE ── */}
      <section className="py-24 bg-[#f5f5f5] border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] text-accent bg-orange-50 px-3 py-1.5 rounded-full mb-5">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-4 max-w-2xl">
            From a Georgia Garage to 1 Million+ Businesses
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mb-16 leading-relaxed">
            Every great company has an origin story. Ours started with a frustrating experience and a stubborn belief that there had to be a better way.
          </p>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block" />

            <div className="flex flex-col gap-12">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <div className={`bg-white rounded-2xl p-7 shadow-sm border border-gray-100 ${i % 2 !== 0 ? "md:text-left" : ""}`}>
                      <span className="inline-block text-xs font-black uppercase tracking-widest text-accent bg-orange-50 px-3 py-1 rounded-full mb-3">{item.year}</span>
                      <h3 className="text-xl font-black text-primary mb-2">{item.title}</h3>
                      <p className="text-gray-500 leading-relaxed text-[15px]">{item.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-accent text-white font-black text-sm items-center justify-center shrink-0 shadow-lg shadow-accent/30 z-10">
                    {i + 1}
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] text-accent bg-orange-50 px-3 py-1.5 rounded-full mb-5">What We Stand For</span>
          <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-4 max-w-2xl">
            Our Values Drive Every Decision We Make
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mb-14 leading-relaxed">
            These aren't just words on a wall. They're the principles that guide how we build our product, serve our customers, and show up every day.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className={`${v.color} rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow`}>
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-5 shadow-sm">
                  <v.icon className={`w-6 h-6 ${v.iconColor}`} />
                </div>
                <h3 className="text-lg font-black text-primary mb-2">{v.title}</h3>
                <p className="text-gray-600 text-[14px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400 mb-8">Recognized by Industry Leaders</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {awards.map((award, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#f5f5f5] rounded-xl p-4 border border-gray-100">
                <Award className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-gray-700 leading-snug">{award}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#FF4A00_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>
        <div className="absolute left-1/4 top-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] text-orange-300 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full mb-6">Ready to Start?</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Your Business Idea Deserves a<br />
              <span className="text-accent">Real Foundation</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
              Join over 1 million entrepreneurs who chose Brendat to launch and grow their business. Start today — it only takes 15 minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#hero"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-accent/30 transition-all text-base"
              >
                Start Your LLC Today <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all text-base"
              >
                Speak With an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
