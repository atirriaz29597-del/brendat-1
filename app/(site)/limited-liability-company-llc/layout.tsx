import type { Metadata } from "next";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Best LLC Formation Services in USA | Top USA Attorneys",
  description: "Start Your Business with Best LLC Formation Services in USA. Our USA lawyers offer compliance support and ongoing legal guidance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={outfit.className}>{children}</div>;
}
