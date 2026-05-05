import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estate Planning Services in USA Powered By USA Lawyers",
  description: "Secure family's future with trusted estate planning services in USA. Get legal support for wills, trusts, POA & healthcare directives.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
