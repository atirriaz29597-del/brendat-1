import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Brendat",
  description:
    "Learn about Brendat's 60-day satisfaction guarantee, refundable fees, and how to request a refund for business formation and related services.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
