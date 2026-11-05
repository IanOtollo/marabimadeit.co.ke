import type { MetadataRoute } from "next";
import { doors, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  const pages = [
    "",
    "/services",
    ...doors.map((d) => `/services/${d.id}`),
    "/process",
    "/portfolio",
    "/about",
    "/faq",
    "/contact",
    "/terms",
    "/privacy",
    "/cookies",
    "/engagement",
    "/acceptable-use",
    "/security",
    "/accessibility",
    "/licenses",
  ];
  return pages.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    priority: p === "" ? 1 : p.startsWith("/services") ? 0.8 : 0.5,
  }));
}
