import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Compliance Services in USA | Trusted Attorneys",
  description: "Ensure business compliance in USA with experienced attorneys. We handle filings, licenses, and legal requirements for LLCs, Corporations",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
