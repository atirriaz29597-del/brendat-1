
import type { Metadata } from "next";
import React from "react";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Business Registration in USA: Transparent & Trusted Service",
  description: "Trusted Business Registration in USA. Affordable, quick and complete support. Complete legal compliance & anywhere in USA",
};

export default function Home() {
  return <ClientPage />;
}

