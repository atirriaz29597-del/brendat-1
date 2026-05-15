import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Brendat",
  description:
    "Learn how Brendat collects, uses, and protects your personal and business information when you use our website and services.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
