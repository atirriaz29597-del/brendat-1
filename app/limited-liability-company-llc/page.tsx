"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { ArrowRight, Check, ChevronDown, ChevronRight } from "lucide-react";

const STATE_FEES: Record<string, number> = {
  Alabama: 236,
  Alaska: 250,
  Arizona: 50,
  Arkansas: 45,
  California: 70,
  Colorado: 50,
  Connecticut: 120,
  Delaware: 90,
  Florida: 125,
  Georgia: 100,
  Hawaii: 50,
  Idaho: 100,
  Illinois: 150,
  Indiana: 95,
  Iowa: 50,
  Kansas: 160,
  Louisiana: 75,
  Maine: 175,
  Maryland: 100,
  Massachusetts: 500,
  Michigan: 50,
  Minnesota: 155,
  Mississippi: 50,
  Missouri: 50,
  Montana: 70,
  Nebraska: 105,
  Nevada: 75,
  "New Hampshire": 100,
  "New Jersey": 125,
  "New Mexico": 50,
  "New York": 200,
  "North Carolina": 125,
  "North Dakota": 135,
  Ohio: 99,
  Oklahoma: 100,
  Oregon: 100,
  Pennsylvania: 125,
  "Rhode Island": 150,
  "South Carolina": 110,
  "South Dakota": 150,
  Tennessee: 300,
  Texas: 300,
  Utah: 72,
  Vermont: 125,
  Virginia: 100,
  Washington: 200,
  "Washington DC": 220,
  "West Virginia": 100,
  Wisconsin: 130,
  Wyoming: 100,
};

export default function CampaignLandingPage() {
  const [selectedEntity, setSelectedEntity] = useState("LLC");
  const [selectedState, setSelectedState] = useState("");
  const [expandedPackages, setExpandedPackages] = useState<string[]>([]);
  const router = useRouter();

  const handleStartBusiness = () => {
    if (selectedEntity && selectedState) {
      router.push(`/order/step2?entity=${encodeURIComponent(selectedEntity)}&state=${encodeURIComponent(selectedState)}`);
    }
  };
  const scrollToStartOrder = () => {
    document.getElementById("start-order")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const togglePackageExpanded = (packageName: string) => {
    setExpandedPackages((current) =>
      current.includes(packageName) ? current.filter((name) => name !== packageName) : [...current, packageName]
    );
  };

  const serviceHighlights = [
    {
      label: "Formation & Compliance",
      icon: "/icons/llc-landing/formation-compliance.svg",
      alt: "Formation and compliance icon",
    },
    {
      label: "Banking & Bookkeeping",
      icon: "/icons/llc-landing/banking-bookeeping.svg",
      alt: "Banking and bookkeeping icon",
    },
    {
      label: "Tax Advice and Filing",
      icon: "/icons/llc-landing/tax-advice-filing.svg",
      alt: "Tax advice and filing icon",
    },
    {
      label: "Expert Customer Support",
      icon: "/icons/llc-landing/expert-customer-support.svg",
      alt: "Expert customer support icon",
    },
  ];
  const packageOptions = [
    {
      name: "Basic",
      price: "$0",
      subtitle: "Perfect to get started",
      cta: "Get Started Free",
      featured: false,
      features: [
        "Preparing & Filing Articles of Organization",
        "Name Availability Check",
        "Business Tax Consultation",
      ],
    },
    {
      name: "Standard",
      price: "$149",
      subtitle: "Best Value for New Businesses",
      cta: "Form My LLC",
      featured: true,
      features: [
        "Preparing & Filing Articles of Organization",
        "Name Availability Check",
        "Registered Agent (1st year)",
        "EIN Business Tax Number",
        "Banking Resolutions",
        "Operating Agreement",
        "Business Banking Account Offer",
        "Phone & Email Support",
        "Business Tax Consultation",
        "Lifetime Compliance Alerts",
      ],
    },
    {
      name: "Premium",
      price: "$249",
      subtitle: "Launch Your Business Faster & Smarter",
      cta: "Launch My Business Fast",
      featured: false,
      features: [
        "Preparing & Filing Articles of Organization",
        "Name Availability Check",
        "Registered Agent (1st year)",
        "EIN Business Tax Number",
        "Banking Resolutions",
        "Operating Agreement",
        "Fintech Bank Account Setup",
        "Domain Name + Business Email",
        "Expedited Filing (3 to 5 Business Days)",
        "Google My Business (GMB) Setup",
        "Unlimited Phone & Email Support",
        "Business Tax Consultation",
        "Lifetime Compliance Alerts",
        "IRS Form 2553",
        "Basic multi-page website (Home, About, Services, Contact)",
      ],
    },
  ];
  const howItWorksSteps = [
    {
      icon: "/icons/llc-landing/how-it-works/1.svg",
      text: "Tell Us About Your Business.\nEnter your details in minutes.",
    },
    {
      icon: "/icons/llc-landing/how-it-works/2.svg",
      text: "We Handle the Paperwork.\nWe file everything with the state.",
    },
    {
      icon: "/icons/llc-landing/how-it-works/3.svg",
      text: "Get Your LLC + EIN.\nReceive official documents quickly.",
    },
    {
      icon: "/icons/llc-landing/how-it-works/4.svg",
      text: "Stay Compliant Year-Round.\nWe remind you of deadlines and filings.",
    },
  ];
  const whyChooseCards = [
    {
      image: "/icons/llc-landing/why-choose/1.png",
      title: "USA-Specific Expertise",
      description:
        "Get your corporation formed right the first time with attorneys who know USA laws inside out.",
    },
    {
      image: "/icons/llc-landing/why-choose/2.png",
      title: "S-Corp Election Assistance",
      description: "Easily set up and file your S-Corp election without confusing IRS paperwork.",
    },
    {
      image: "/icons/llc-landing/why-choose/3.png",
      title: "Fast Turnaround",
      description: "Form your corporation quickly, with expedited service when you need it done fast.",
    },
    {
      image: "/icons/llc-landing/why-choose/4.png",
      title: "Full Compliance Support",
      description: "We ensure your corporate filings meet all USA Secretary of State requirements.",
    },
  ];
  const reviewTestimonials = [
    {
      name: "Samantha P.",
      role: "LLC Customer",
      quote:
        "I was nervous about filing my LLC, but Brendat walked me through everything step-by-step. I had my paperwork done in days, and the flat fee meant no surprises. Highly recommend!",
    },
    {
      name: "Carlos M.",
      role: "Trademark Customer",
      quote:
        "I needed help registering a trademark for my business logo. Their team handled the search, paperwork, and filing seamlessly. I felt protected every step of the way.",
    },
    {
      name: "Nell C.",
      role: "Last Will Customer",
      quote:
        "We used Brendat for our estate planning documents, and I can't thank them enough. Everything was explained clearly, and now I know my family is taken care of.",
    },
  ];

  return (
    <>
      <Header />
    <main className="bg-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="grid min-h-[680px] w-full bg-cover bg-center grid-cols-1 lg:grid-cols-2"
          style={{ backgroundImage: "url('/campaign-hero-bg.png')", backgroundSize: "cover", backgroundPosition: "right" }}
        >
          <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-end px-4 py-16 lg:max-w-none lg:px-0">
            <div className="w-full max-w-xl">
              <h1 className="text-3xl font-bold leading-tight tracking-tight  sm:text-5xl">
                Start Your <span className="text-secondary">US LLC</span> in 5 Minutes | $0 + State Fee
              </h1>

              <p className="mt-6 text-base leading-[1.4]  text-black sm:text-lg">
                Launch your business with expert support. We handle everything
                formation, EIN, and compliance - so you can focus on growth.
              </p>

              <p className="mt-5 inline-flex rounded-md bg-accent/15 px-4 py-0.5 text-lg font-bold text-black">
                Trusted by 10,000+ Entrepreneurs.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-lg font-bold text-black">
                <span>50-State Compliance</span>
                <span className="text-black/30">|</span>
                <span>Fast &amp; Secure Filing</span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-5">
                <span className="font-bold text-black text-lg">Excellent</span>
                <Image
                  src="/trustpilot-ratings.svg"
                  alt="Trustpilot rating"
                  width={180}
                  height={34}
                  className="h-auto w-[110px]"
                />
                <Image
                  src="/Trustpilot_Logo.svg"
                  alt="Trustpilot logo"
                  width={170}
                  height={40}
                  className="h-auto w-[100px] mt-[-2]"
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={scrollToStartOrder}
                  className="cursor-pointer rounded-lg bg-secondary px-8 py-2.5 text-base font-medium text-white shadow-lg shadow-accent/25 transition hover:bg-accent-dark sm:text-lg"
                >
                  Start My LLC Now
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/contact")}
                  className="cursor-pointer rounded-lg border border-secondary bg-secondary/5 px-8 py-2.5 text-base font-medium text-black transition hover:bg-transparent sm:text-lg"
                >
                  Talk to an Expert
                </button>
              </div>

              <p className="mt-8 flex flex-wrap items-center gap-3 text-lg">
                <span className="font-bold text-black">Speak to a Business Specialist:</span>
                <a href="tel:3032468693" className="font-bold bg-accent/10 text-secondary rounded-md px-3 py-1 hover:underline">
                  (303) 246-8693
                </a>
              </p>
            </div>
          </div>

          <div className="relative hidden items-center justify-start px-6 py-16 lg:flex sm:px-10 lg:px-14">
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 w-full max-w-[620px]">
              <Image src="/campaign-hero-llc.png" alt="Business Formation" width={620} height={620} priority />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FF7828]">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <ul className="flex flex-col md:flex-row">
            {serviceHighlights.map((item, index) => (
              <li key={item.label} className="relative flex flex-1 items-center justify-center py-6 sm:py-7">
                <div className="flex items-center gap-3 text-white">
                  <Image src={item.icon} alt={item.alt} width={40} height={40} />
                  <p className="text-sm">{item.label}</p>
                </div>
                {index < serviceHighlights.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-1/2 hidden h-12 w-[2px] -translate-y-1/2 bg-white/40 md:block"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-4 pb-20 pt-20 md:pb-28 md:pt-24" id="start-order">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-left">
            <h2 className="animate-fade-in-up mb-6 text-4xl leading-[1.08] font-black tracking-tight text-black md:text-[48px]">
              Start Your Business
              <br />
              With <span className="text-accent">Confidence</span>
            </h2>
            <p className="animate-fade-in-up-delay max-w-lg text-base leading-relaxed text-gray-600">
              Join over 1,000,000 happy business owners. Get started by choosing your entity type and state of
              formation.
            </p>
          </div>

          <div className="animate-fade-in-up-delay-2 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg md:p-10">
            <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-3">
              <div>
                <div className="ring-accent/30 flex items-center gap-3 rounded-xl border border-accent bg-gray-50 px-4 py-3.5 transition-all focus-within:ring-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                    1
                  </span>
                  <div className="flex flex-1 flex-col">
                    <span className="mb-0.5 text-[10px] font-bold uppercase leading-none tracking-wider text-gray-400">
                      Entity Type
                    </span>
                    <select
                      value={selectedEntity}
                      onChange={(e) => setSelectedEntity(e.target.value)}
                      className="w-full cursor-pointer appearance-none border-none bg-transparent text-sm font-semibold text-black focus:outline-none"
                    >
                      <option value="">Pick Entity</option>
                      <option>LLC</option>
                      <option>S-Corporation</option>
                      <option>C-Corporation</option>
                      <option>Nonprofit</option>
                    </select>
                  </div>
                  <ChevronDown className="pointer-events-none h-4 w-4 shrink-0 text-gray-400" />
                </div>
              </div>

              <div>
                <div className="ring-accent/30 flex items-center gap-3 rounded-xl border border-accent bg-gray-50 px-4 py-3.5 transition-all focus-within:ring-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                    2
                  </span>
                  <div className="flex flex-1 flex-col">
                    <span className="mb-0.5 text-[10px] font-bold uppercase leading-none tracking-wider text-gray-400">
                      State
                    </span>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full cursor-pointer appearance-none border-none bg-transparent text-sm font-semibold text-black focus:outline-none"
                    >
                      <option value="">Select State</option>
                      {Object.keys(STATE_FEES).map((stateName) => (
                        <option key={stateName}>{stateName}</option>
                      ))}
                    </select>
                  </div>
                  <ChevronDown className="pointer-events-none h-4 w-4 shrink-0 text-gray-400" />
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartBusiness}
                disabled={!selectedEntity || !selectedState}
                className="cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                Start My Business <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3F3F3] px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">Choose Your Package</h2>
            <p className="mt-4 text-lg leading-relaxed text-black/80">
              Launch your business with expert support. We handle everything formation, EIN, and compliance - so you
              can focus on growth.
            </p>
          </div>

          <div className="mt-10 py-10 grid grid-cols-1 items-start gap-4 md:grid-cols-3 md:gap-5">
            {packageOptions.map((option) => (
              <div key={option.name} className="w-full">
                <article
                  className={`relative rounded-t-xl p-8 text-center ${
                    option.featured ? "bg-[rgba(255,120,40,0.2)]" : "bg-[rgba(255,120,40,0.08)]"
                  } ${expandedPackages.includes(option.name) ? "" : "rounded-b-xl"}`}
                >
                  {option.featured && (
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded bg-[#FF7828] px-7 py-2 text-xs font-medium text-white">
                      Recommended
                    </span>
                  )}

                  <h3 className="mt-5 text-4xl font-medium text-black">{option.name}</h3>
                  <p className="my-6 text-5xl font-bold text-[#FF7828]">
                    {option.price} <span className="text-2xl font-medium text-black">+ State Fee</span>
                  </p>
                  <p className="mt-4 text-md font-medium text-black/85">{option.subtitle}</p>

                  <button
                    type="button"
                    onClick={scrollToStartOrder}
                    className="mt-8 w-full cursor-pointer rounded-md bg-[#FF7828] py-3 text-md font-medium text-white transition hover:bg-[#E96C20]"
                  >
                    {option.cta}
                  </button>

                  <button
                    type="button"
                    onClick={() => togglePackageExpanded(option.name)}
                    className="mt-5 inline-flex cursor-pointer items-center gap-1 text-md font-bold text-black underline underline-offset-2"
                  >
                    Learn More
                    {expandedPackages.includes(option.name) ? (
                      <ChevronDown className="h-3.5 w-3.5 text-[#FF7828]" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-[#FF7828]" />
                    )}
                  </button>
                </article>

                {expandedPackages.includes(option.name) && (
                  <div className={`rounded-b-xl px-6 pb-6 pt-5 text-left ${
                    option.featured ? "bg-[#FF7828]/10" : "bg-[#FF7828]/15"
                  }`}>
                    <p className="mb-3 text-2xl font-extrabold text-black">Includes</p>
                    <ul className="space-y-2.5">
                      {option.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-base font-medium text-black/85">
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] bg-[rgba(255,120,40,0.2)]">
                            <Check className="h-3 w-3 text-[#FF7828]" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className=" px-4 py-25">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-15">
            <h2 className="text-4xl mb-5 font-bold uppercase tracking-tight text-secondary sm:text-5xl">How It Works?</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">Start Your LLC in 4 Easy Steps:</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step, index) => (
              <article
                key={step.icon}
                className={`rounded-xl py-12 p-7 ${
                  index % 2 === 0 ? "bg-[rgba(255,120,40,0.08)]" : "bg-[rgba(255,120,40,0.15)]"
                }`}
              >
                <Image className="mb-8" src={step.icon} alt="" width={60} height={60} />
                <p className="mt-6 whitespace-pre-line  leading-tight text-black/85">{step.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-center text-xl font-bold text-black sm:text-left">
              50-State Compliance&nbsp; | &nbsp;Fast &amp; Secure Filing&nbsp; | &nbsp;Trusted by 10,000+ Entrepreneurs.
            </p>
            <button
              type="button"
              onClick={scrollToStartOrder}
              className="mx-auto w-full max-w-[220px] cursor-pointer rounded-md bg-secondary px-8 py-3 text-md font-medium text-white transition hover:bg-secondary-light sm:mx-0 sm:w-auto"
            >
              Start my LLC
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#F3F3F3] px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h3 className="mb-15 text-center font-bold tracking-tight text-black md:text-left text-[36px]">
            <span className="inline-block rounded-xl bg-[rgba(255,120,40,0.18)] px-4 py-2">Why Choose Brendat&apos;s</span>{" "}
            Corporate Formation Services in <span className="text-secondary">US?</span>
          </h3>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseCards.map((card) => (
              <article key={card.title} className="pb-8 overflow-hidden rounded-xl bg-[#E6E6E6]">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={290}
                  height={175}
                  className="h-[175px] w-full object-cover"
                />
                <div className="p-7">
                  <h3 className="mt-3 font-bold leading-tight text-black">{card.title}</h3>
                  <p className="mt-2 leading-snug text-black/85">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="relative isolate overflow-hidden">
        <section className="our-reviews-bg hidden md:block">
          <div className="py-20">
            <div className="grid min-h-[680px] w-full grid-cols-1 bg-cover bg-center lg:grid-cols-2">
              <div className="relative z-10 flex items-center px-6 py-16 sm:px-10 lg:px-20"></div>

              <div
                className="relative flex items-center justify-center px-6 py-16"
                style={{
                  backgroundImage: "url('/icons/llc-landing/our-reviews.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "right",
                }}
              ></div>
            </div>
          </div>
        </section>
        <section className="our-reviews-content z-10 bg-white/0 px-4 py-12 md:absolute md:inset-0 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-start gap-6 md:grid-cols-12">
              <div className="md:col-span-6">
                <p className="text-2xl font-bold text-secondary">Our Reviews</p>
                <h2 className="mt-4 text-5xl leading-tight text-black">
                  What{" "}
                  <span className="rounded-xl bg-[rgba(255,120,40,0.18)] px-3 py-1 font-bold text-secondary">
                    Our Customers
                  </span> <br />
                  are saying?
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-12 mt-8">
              <div className="col-span-11">
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-2">
                  {reviewTestimonials.map((review) => (
                    <article key={review.name} className="rounded-md bg-[#F3F3F3] p-6 md:p-7">
                      <p className="text-xl font-bold text-black">
                        <span className="text-secondary">{review.name}</span>,{" "}
                        <span className="font-medium">{review.role}</span>
                      </p>
                      <p className="mt-4 text-8xl font-black leading-none text-white">“</p>
                      <p className="-mt-2 text-lg leading-relaxed text-black/90">{review.quote}</p>
                      <p className="mt-6 text-3xl tracking-wide text-secondary">★★★★★</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-secondary px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white/8 px-6 py-10 sm:px-12 sm:py-14">
          <div className="max-w-4xl">
            <h2 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">Not Ready Yet?</h2>
            <p className="mt-5 text-3xl font-bold text-white underline underline-offset-4 sm:text-3xl">
              Download our FREE LLC Starter Guide.
            </p>
            <p className="mt-4 text-xl text-white/95 sm:text-xl">Enter your email to get instant access.</p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-md border-none bg-white/85 px-4 text-base text-black placeholder:text-black/30 focus:outline-none sm:max-w-[460px]"
              />
              <button
                type="button"
                className="h-12 cursor-pointer rounded-md bg-white px-8 font-medium text-secondary transition hover:bg-white/90"
              >
                Send Email
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
              {["Choose the right state.", "Avoid costly mistakes.", "Set up your business properly."].map((item, idx) => (
                <div key={item} className="flex items-center gap-3 rounded-md bg-white p-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs text-white/90">
                    {idx + 1}
                  </span>
                  <span className=" text-black/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
