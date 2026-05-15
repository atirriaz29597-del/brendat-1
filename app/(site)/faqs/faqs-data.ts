export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSection = {
  title: string;
  subsections?: { title: string; items: FaqItem[] }[];
  items?: FaqItem[];
};

export const faqSections: FaqSection[] = [
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

export function getAllFaqItems(): FaqItem[] {
  return faqSections.flatMap((section) => {
    if (section.items) return section.items;
    return section.subsections?.flatMap((sub) => sub.items) ?? [];
  });
}

export function getFaqPageJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getAllFaqItems().map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
    url: `${siteUrl}/faqs`,
  };
}
