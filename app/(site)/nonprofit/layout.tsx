import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Nonprofit Formation Services in USA | Top-rated Attorneys",
  description: "Start your nonprofit with ease. Brendat's top-rated attorneys help with formation, bylaws, and tax-exempt status applications in USA.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
