import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Copyright Registration Services in USA | Top USA Lawyers",
  description: "Safeguard your art, writing, or content with USA's best copyright registration services. Consult experienced USA copyright lawyers now!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
