import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top-Rated Business Attorneys in USA, USA | Consult Now",
  description: "Work with top-rated business attorneys in USA, USA. From formation to litigation, bankruptcy, and disputes, we provide trusted support.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
