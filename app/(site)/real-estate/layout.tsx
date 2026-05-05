import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Legal Services in USA | Top-rated Attorneys",
  description: "Get expert real estate legal services in USA. Our top-rated attorneys handle property transactions, deed transfers, leases, and more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
