"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSection = {
  title: string;
  subsections?: { title: string; items: FaqItem[] }[];
  items?: FaqItem[];
};

const faqSections: FaqSection[] = [
  {
    title: "General FAQs",
    items: [
      {
        question: "What is Brendat?",
        answer:
          "Brendat is a business formation and compliance service provider that helps entrepreneurs register and manage businesses in the United States.",
      },
      {
        question: "Which business services does Brendat offer?",
        answer:
          "Brendat offers LLC formation, corporation registration, DBA filing, trademark registration, annual reports, registered agent services, business licenses, and more.",
      },
      {
        question: "Can non-US residents register a business through Brendat?",
        answer:
          "Yes, non-US residents can form a US business entity with Brendat's assistance.",
      },
      {
        question: "In which states can I register my business?",
        answer: "Brendat provides business registration services across all 50 US states.",
      },
      {
        question: "How long does the business formation process take?",
        answer:
          "Processing time depends on the selected state and service package, but many filings are completed within a few business days.",
      },
      {
        question: "Why should I choose an LLC for my business?",
        answer:
          "An LLC provides liability protection, flexible taxation options, and a professional business structure.",
      },
      {
        question: "Do I need a physical US address to form a company?",
        answer:
          "No, you can use a registered agent service if you don't have a US address.",
      },
      {
        question: "Does Brendat provide legal or attorney-backed services?",
        answer:
          "Yes, selected services such as trademark filing and compliance support may include attorney-backed assistance.",
      },
      {
        question: "Can I open a US business bank account after forming my LLC?",
        answer: "Yes, most registered LLCs can apply for a US business bank account.",
      },
      {
        question: "Can I run my US LLC from another country?",
        answer:
          "Yes, many international entrepreneurs successfully operate US LLCs remotely.",
      },
      {
        question: "What is the best state to form an LLC?",
        answer:
          "The best state depends on your business goals, taxes, and operational needs.",
      },
      {
        question: "How do I protect my business legally?",
        answer:
          "Registering your business entity and trademarking your brand are important first steps toward legal protection.",
      },
    ],
  },
  {
    title: "Services FAQs",
    subsections: [
      {
        title: "Business Formation",
        items: [
          {
            question: "What documents are required to form an LLC?",
            answer:
              "Typically, basic personal information and your desired business name are required.",
          },
          {
            question: "Can you help me register a Corporation (C-Corp or S-Corp)?",
            answer: "Yes, Brendat assists with both C-Corporation and S-Corporation registrations.",
          },
          {
            question: "What is a DBA and why do I need it?",
            answer:
              'A DBA ("Doing Business As") allows you to operate your business under a different name than the legal entity name.',
          },
          {
            question: "Can I change my business name later?",
            answer:
              "Yes, business names can usually be changed by filing an amendment with the state.",
          },
          {
            question: "Do I need an EIN for my business?",
            answer:
              "Yes, an EIN is generally required for taxes, banking, and hiring employees.",
          },
        ],
      },
      {
        title: "Compliance Services",
        items: [
          {
            question: "What is an Annual Report?",
            answer:
              "An Annual Report is a required filing that keeps your business information updated with the state.",
          },
          {
            question: "What happens if I miss my annual filing?",
            answer:
              "Missing deadlines may result in penalties, late fees, or business suspension.",
          },
          {
            question: "What is a Registered Agent?",
            answer:
              "A Registered Agent is a designated person or company that receives legal and government documents on behalf of your business.",
          },
          {
            question: "Do you help with business licenses?",
            answer:
              "Yes, Brendat helps businesses identify and obtain required licenses and permits.",
          },
        ],
      },
    ],
  },
  {
    title: "Payment FAQs",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "Brendat accepts major debit cards, credit cards, and other secure online payment methods.",
      },
      {
        question: "Are there any hidden charges?",
        answer:
          "No, pricing is transparent and depends on the selected service package and state filing fees.",
      },
      {
        question: "Do state filing fees include your service charges?",
        answer: "State fees are usually separate unless mentioned in the selected package.",
      },
      {
        question: "Can I get a refund after filing?",
        answer: "Refund eligibility depends on the service stage and filing status.",
      },
      {
        question: "Do you offer custom business packages?",
        answer:
          "Yes, customized solutions may be available depending on your business requirements.",
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, payments are processed through secure and encrypted payment systems.",
      },
      {
        question: "How much does it cost to start an LLC in the USA?",
        answer: "The cost depends on the state filing fee and the service package selected.",
      },
    ],
  },
];

function FaqAccordion({ items, idPrefix }: { items: FaqItem[]; idPrefix: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={`${idPrefix}-${i}`}
            className="border border-gray-200 rounded-2xl overflow-hidden"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-primary pr-2">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="p-5 sm:p-6 bg-white border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function FaqsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-surface-alt border-b border-gray-100 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Brendat FAQs
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Answers to common questions about our services, formation process, and payments.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {faqSections.map((section) => (
            <section key={section.title} className="mb-14 last:mb-0">
              <h2 className="text-2xl font-bold text-primary mb-6">{section.title}</h2>

              {section.subsections ? (
                <div className="space-y-10">
                  {section.subsections.map((subsection) => (
                    <div key={subsection.title}>
                      <h3 className="text-lg font-semibold text-primary mb-4">
                        {subsection.title}
                      </h3>
                      <FaqAccordion
                        items={subsection.items}
                        idPrefix={`${section.title}-${subsection.title}`}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                section.items && (
                  <FaqAccordion items={section.items} idPrefix={section.title} />
                )
              )}
            </section>
          ))}

          <p className="text-sm text-gray-500 border-t border-gray-100 pt-8 mt-14">
            Still have questions?{" "}
            <Link href="/contact" className="text-accent hover:text-accent-dark transition-colors">
              Contact our support team
            </Link>{" "}
            or read our{" "}
            <Link
              href="/refund-policy"
              className="text-accent hover:text-accent-dark transition-colors"
            >
              Refund Policy
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
