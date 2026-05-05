import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Annual Business Report in USA with Top USA Attorneys",
  description: "Need to file your annual business report in USA? Get expert guidance from top USA attorneys and keep your business in good standing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
