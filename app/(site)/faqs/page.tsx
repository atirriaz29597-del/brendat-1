import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { faqSections, getFaqPageJsonLd, type FaqItem } from "./faqs-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brendat.com";

function FaqList({ items, idPrefix }: { items: FaqItem[]; idPrefix: string }) {
  return (
    <div className="space-y-3">
      {items.map((faq, i) => (
        <details
          key={`${idPrefix}-${i}`}
          className="group border border-gray-200 rounded-2xl overflow-hidden"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-gray-50 p-5 text-left transition-colors hover:bg-gray-100 sm:p-6 [&::-webkit-details-marker]:hidden">
            <span className="pr-2 font-semibold text-primary">{faq.question}</span>
            <ChevronDown className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
          </summary>
          <div className="border-t border-gray-200 bg-white p-5 sm:p-6">
            <p className="leading-relaxed text-gray-600">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export default function FaqsPage() {
  const faqJsonLd = getFaqPageJsonLd(siteUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white">
        <section className="border-b border-gray-100 bg-surface-alt py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              Brendat FAQs
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Answers to common questions about our services, formation process, and payments.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {faqSections.map((section) => (
            <section key={section.title} className="mb-14 last:mb-0">
              <h2 className="mb-6 text-2xl font-bold text-primary">{section.title}</h2>

              {section.subsections ? (
                <div className="space-y-10">
                  {section.subsections.map((subsection) => (
                    <div key={subsection.title}>
                      <h3 className="mb-4 text-lg font-semibold text-primary">
                        {subsection.title}
                      </h3>
                      <FaqList
                        items={subsection.items}
                        idPrefix={`${section.title}-${subsection.title}`}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                section.items && (
                  <FaqList items={section.items} idPrefix={section.title} />
                )
              )}
            </section>
          ))}

          <p className="mt-14 border-t border-gray-100 pt-8 text-sm text-gray-500">
            Still have questions?{" "}
            <Link href="/contact" className="text-accent transition-colors hover:text-accent-dark">
              Contact our support team
            </Link>{" "}
            or read our{" "}
            <Link
              href="/refund-policy"
              className="text-accent transition-colors hover:text-accent-dark"
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
