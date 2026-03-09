import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.brendat.com";

const publicRoutes = [
  "",
  "/about",
  "/annual-report",
  "/business-attorney-plans",
  "/business-compliance-coverage",
  "/business-formation",
  "/business-licenses",
  "/comprehensive-trademark-search",
  "/contact",
  "/copyright",
  "/corporation-c-corp-s-corp",
  "/dissolution",
  "/doing-business-as-dba",
  "/estate-plans",
  "/healthcare-directive",
  "/limited-liability-company-llc",
  "/nonprofit",
  "/operating-agreement",
  "/power-of-attorney",
  "/property-deed-transfer",
  "/provisional-patent",
  "/real-estate",
  "/registered-agent",
  "/residential-lease",
  "/sole-proprietorship",
  "/trademark-monitoring",
  "/trademark-registration",
  "/trust",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return publicRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
