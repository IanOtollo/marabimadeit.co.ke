import type { MetadataRoute } from "next";
import { doors, site } from "@/data/site";

// Fixed date so crawlers see real change signals, not a new timestamp on every request.
const lastModified = new Date("2026-11-08");

const legal = ["/terms", "/privacy", "/cookies", "/engagement", "/acceptable-use", "/security", "/accessibility", "/licenses"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ) => ({ url: `${base}${path}`, lastModified, changeFrequency, priority });

  return [
    entry("", 1, "weekly"),
    entry("/services", 0.9, "monthly"),
    ...doors.map((d) => entry(`/services/${d.id}`, 0.8, "monthly")),
    entry("/portfolio", 0.8, "monthly"),
    entry("/start", 0.8, "yearly"),
    entry("/contact", 0.7, "yearly"),
    entry("/about", 0.6, "yearly"),
    entry("/process", 0.6, "yearly"),
    entry("/faq", 0.6, "monthly"),
    ...legal.map((p) => entry(p, 0.2, "yearly")),
  ];
}
