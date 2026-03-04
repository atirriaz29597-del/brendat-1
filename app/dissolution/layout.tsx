import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Dissolution Services in USA | Top USA Attorneys",
  description: "From LLCs to corporations, our USA business attorneys make dissolution simple. Get reliable business closure services in USA now!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
