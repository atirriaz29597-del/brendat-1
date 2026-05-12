import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Brendat | Expert Support for Your US Business",
  description:
    "Questions about starting your LLC or managing compliance? Contact the Brendat support team today via phone, email, or chat. We are here to help you grow.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
