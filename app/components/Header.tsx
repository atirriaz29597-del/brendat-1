"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Building2, FileText, Shield, Landmark, Scale, Home as HomeIcon, ChevronRight } from "lucide-react";

type DropdownKey = "business" | "personal" | "attorneys" | null;

/* ── Business dropdown data ─────────────────────────────────── */
const businessSections = [
  {
    heading: "Register Your Business",
    href: "/business-formation",
    items: [
      { label: "Limited Liability Company (LLC)", href: "/limited-liability-company-llc" },
      { label: "Corporation (C corp, S corp)", href: "/corporation-c-corp-s-corp" },
      { label: "Doing Business As (DBA)", href: "/doing-business-as-dba" },
      { label: "Nonprofit", href: "/nonprofit" },
      { label: "Sole Proprietorship", href: "/sole-proprietorship" },
    ],
  },
  {
    heading: "Business Compliance Coverage",
    href: "/business-compliance-coverage",
    items: [
      { label: "Annual Report", href: "/annual-report" },
      { label: "Business Licenses", href: "/business-licenses" },
      { label: "Operating Agreement", href: "/operating-agreement" },
      { label: "Registered Agent", href: "/registered-agent" },
      { label: "Dissolution", href: "/dissolution" },
    ],
  },
  {
    heading: "Trademark & IP",
    items: [
      { label: "Trademark Registration", href: "/trademark-registration" },
      { label: "Comprehensive Trademark Search", href: "/comprehensive-trademark-search" },
      { label: "Trademark Monitoring", href: "/trademark-monitoring" },
      { label: "Provisional Patent", href: "/provisional-patent" },
      { label: "Copyright", href: "/copyright" },
    ],
  },
];

const businessIcons = [Building2, Shield, FileText];

/* ── Personal dropdown data ─────────────────────────────────── */
const personalSections = [
  {
    heading: "Estate Plans",
    href: "/estate-plans",
    items: [
      { label: "Will", href: "/estate-plans" },
      { label: "Trust", href: "/trust" },
      { label: "Power of Attorney", href: "/power-of-attorney" },
      { label: "Healthcare Directive", href: "/healthcare-directive" },
    ],
  },
  {
    heading: "Real Estate",
    href: "/real-estate",
    items: [
      { label: "Residential Lease", href: "/residential-lease" },
      { label: "Property Deed Transfer", href: "/property-deed-transfer" },
    ],
  },
];

const personalIcons = [Landmark, HomeIcon];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = (key: DropdownKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  };
  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const navLinkClass = (key?: DropdownKey) =>
    `flex items-center gap-1 text-sm font-semibold transition-colors ${
      activeDropdown === key ? "text-accent" : "text-gray-700 hover:text-accent"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-28 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/WhatsApp_Image_2026-03-01_at_12.13.31_PM-removebg-preview.png"
              alt="Brendat"
              width={360}
              height={130}
              className="h-38 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {/* Home */}
            <Link href="/" className={navLinkClass()}>Home</Link>

            {/* Business */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown("business")}
              onMouseLeave={closeDropdown}
            >
              <button className={navLinkClass("business")}>
                Business <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === "business" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "business" && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[820px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-3 gap-8"
                  onMouseEnter={() => openDropdown("business")}
                  onMouseLeave={closeDropdown}
                >
                  {/* Top accent bar */}
                  <div className="col-span-3 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent rounded-full -mt-1 mb-2" />
                  {businessSections.map((section, si) => {
                    const Icon = businessIcons[si];
                    return (
                      <div key={section.heading}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-accent" />
                          </div>
                          {section.href ? (
                            <Link href={section.href} className="text-[11px] font-black uppercase tracking-widest text-accent hover:underline">
                              {section.heading}
                            </Link>
                          ) : (
                            <span className="text-[11px] font-black uppercase tracking-widest text-accent">{section.heading}</span>
                          )}
                        </div>
                        <ul className="space-y-1">
                          {section.items.map((item) => (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                className="flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-accent hover:bg-accent/5 rounded-lg px-2 py-1.5 transition-all group"
                              >
                                <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-accent transition-colors shrink-0" />
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Personnel */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown("personal")}
              onMouseLeave={closeDropdown}
            >
              <button className={navLinkClass("personal")}>
                Personal <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === "personal" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "personal" && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-2 gap-6"
                  onMouseEnter={() => openDropdown("personal")}
                  onMouseLeave={closeDropdown}
                >
                  <div className="col-span-2 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent rounded-full -mt-1 mb-2" />
                  {personalSections.map((section, si) => {
                    const Icon = personalIcons[si];
                    return (
                      <div key={section.heading}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-accent" />
                          </div>
                          {section.href ? (
                            <Link href={section.href} className="text-[11px] font-black uppercase tracking-widest text-accent hover:underline">
                              {section.heading}
                            </Link>
                          ) : (
                            <span className="text-[11px] font-black uppercase tracking-widest text-accent">{section.heading}</span>
                          )}
                        </div>
                        <ul className="space-y-1">
                          {section.items.map((item) => (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                className="flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-accent hover:bg-accent/5 rounded-lg px-2 py-1.5 transition-all group"
                              >
                                <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-accent transition-colors shrink-0" />
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Attorneys */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown("attorneys")}
              onMouseLeave={closeDropdown}
            >
              <button className={navLinkClass("attorneys")}>
                Attorneys <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === "attorneys" ? "rotate-180" : ""}`} />
              </button>
              {activeDropdown === "attorneys" && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4"
                  onMouseEnter={() => openDropdown("attorneys")}
                  onMouseLeave={closeDropdown}
                >
                  <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent rounded-full mb-3" />
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Scale className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-accent">Legal Services</span>
                  </div>
                  <Link
                    href="/business-attorney-plans"
                    className="flex items-center gap-2 text-sm text-gray-600 font-medium hover:text-accent hover:bg-accent/5 rounded-lg px-2 py-2 transition-all group"
                  >
                    <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-accent transition-colors shrink-0" />
                    Business Attorney Plans
                  </Link>
                </div>
              )}
            </div>


            <Link href="/about" className="text-sm font-semibold rounded-lg text-gray-600 hover:text-accent transition-all">
              About Us
            </Link>
            {/* Blogs */}
            {/* <Link href="#" className={navLinkClass()}>Blogs</Link> */}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
          <a href="tel:3032468693" className="font-bold bg-accent/10 text-secondary rounded-md px-3 py-1 hover:underline">
                  (303) 246-8693
                </a>
            {/* <Link href="/about" className="text-sm font-semibold px-4 py-2 rounded-lg text-gray-600 hover:text-accent hover:bg-gray-50 transition-all">
              (303) 246-8693
            </Link> */}
            <Link href="/contact" className="bg-accent hover:bg-accent-dark text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30 transition-all">
              Contact Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-6 pt-4">
          <Link href="/" className="block text-sm font-semibold text-gray-700 py-3 border-b border-gray-100" onClick={() => setMobileOpen(false)}>Home</Link>

          {/* Business accordion */}
          <div className="border-b border-gray-100">
            <button
              className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 py-3"
              onClick={() => setMobileExpanded(mobileExpanded === "business" ? null : "business")}
            >
              Business <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === "business" ? "rotate-180" : ""}`} />
            </button>
            {mobileExpanded === "business" && (
              <div className="pb-3 space-y-4 pl-2">
                {businessSections.map((section) => (
                  <div key={section.heading}>
                    {section.href ? (
                      <Link href={section.href} className="block text-[11px] font-black uppercase tracking-wider text-accent mb-1.5 hover:underline" onClick={() => setMobileOpen(false)}>{section.heading}</Link>
                    ) : (
                      <p className="text-[11px] font-black uppercase tracking-wider text-accent mb-1.5">{section.heading}</p>
                    )}
                    {section.items.map((item) => (
                      <Link key={item.label} href={item.href} className="block text-sm text-gray-600 py-1.5 hover:text-accent" onClick={() => setMobileOpen(false)}>{item.label}</Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Personal accordion */}
          <div className="border-b border-gray-100">
            <button
              className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 py-3"
              onClick={() => setMobileExpanded(mobileExpanded === "personal" ? null : "personal")}
            >
              Personal <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === "personal" ? "rotate-180" : ""}`} />
            </button>
            {mobileExpanded === "personal" && (
              <div className="pb-3 space-y-4 pl-2">
                {personalSections.map((section) => (
                  <div key={section.heading}>
                    <p className="text-[11px] font-black uppercase tracking-wider text-accent mb-1.5">{section.heading}</p>
                    {section.items.map((item) => (
                      <Link key={item.label} href={item.href} className="block text-sm text-gray-600 py-1.5 hover:text-accent" onClick={() => setMobileOpen(false)}>{item.label}</Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Attorneys accordion */}
          <div className="border-b border-gray-100">
            <button
              className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 py-3"
              onClick={() => setMobileExpanded(mobileExpanded === "attorneys" ? null : "attorneys")}
            >
              Attorneys <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === "attorneys" ? "rotate-180" : ""}`} />
            </button>
            {mobileExpanded === "attorneys" && (
              <div className="pb-3 pl-2">
                <Link href="/business-attorney-plans" className="block text-sm text-gray-600 py-1.5 hover:text-accent" onClick={() => setMobileOpen(false)}>Business Attorney Plans</Link>
              </div>
            )}
          </div>

          <Link href="#" className="block text-sm font-semibold text-gray-700 py-3 border-b border-gray-100" onClick={() => setMobileOpen(false)}>Blogs</Link>

          <div className="pt-4 flex flex-col gap-3">
            <Link href="/about" className="text-sm font-semibold py-2.5 rounded-lg border border-gray-200 text-gray-700 text-center" onClick={() => setMobileOpen(false)}>About Us</Link>
            <Link href="/contact" className="bg-accent text-white text-sm font-bold py-2.5 rounded-xl shadow-md text-center" onClick={() => setMobileOpen(false)}>Contact Us</Link>
          </div>
        </div>
      )}
    </header>
  );
}
