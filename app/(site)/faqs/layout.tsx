import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | Brendat",
  description:
    "Find answers about Brendat business formation, compliance services, payments, LLC registration, and more for entrepreneurs in the United States.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
