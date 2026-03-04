import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Formation Services in USA Powered By Trusted Attorneys",
  description: "Register an LLC, Corporation, or Partnership in USA with Our Business Formation Services. Talk to a Trusted Local Lawyer in Your State Now!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
