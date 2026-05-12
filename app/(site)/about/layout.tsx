import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Brendat | Empowering Entrepreneurs to Launch & Grow",
  description:
    "Learn how Brendat simplifies US business formation. From LLC registration to compliance, we provide the tools entrepreneurs need to succeed in all 50 states.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
