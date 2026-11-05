/**
 * Case-file archive. Add one object per past project and it appears, serialised and grouped
 * by year, on the matching door page. Nothing else needs to change.
 *
 *   {
 *     id: "mama-rosa",             // unique, kebab-case
 *     slug: "mama-rosa-kitchen",   // reserved for a future /work/[slug] page
 *     door: "websites",            // "websites" | "ecommerce" | "software" | "crm-erp"
 *     title: "Online ordering and menu site",
 *     client: "Mama Rosa's Kitchen",
 *     year: 2025,
 *     summary: "One or two sentences on the problem and what we built.",
 *     role: "Design, build, SEO",
 *     stack: ["Next.js", "Tailwind CSS"],
 *     metrics: [{ label: "Orders in month one", value: "312" }],   // optional
 *     image: "/images/projects/mama-rosa.jpg",                      // optional
 *     url: "https://example.co.ke",                                  // optional
 *     featured: true,                                                // optional: floats to the top of its year
 *     order: 1,                                                      // lower numbers first inside a year
 *   }
 *
 * Serial numbers (001, 002, ...) are assigned automatically: oldest year first, then `order`.
 */

export type DoorId = "websites" | "ecommerce" | "software" | "crm-erp";

export type Project = {
  id: string;
  slug: string;
  door: DoorId;
  title: string;
  client: string;
  year: number;
  summary: string;
  role: string;
  stack: string[];
  metrics?: { label: string; value: string }[];
  image?: string;
  url?: string;
  featured?: boolean;
  order: number;
};

export const projects: Project[] = [];

const byAge = (a: Project, b: Project) => a.year - b.year || a.order - b.order;
const byPriority = (a: Project, b: Project) => Number(!!b.featured) - Number(!!a.featured) || a.order - b.order;

/** Stable serial for a project across the whole archive: 001 is the oldest. */
export function serialOf(p: Project, all: Project[] = projects) {
  const i = [...all].sort(byAge).findIndex((x) => x.id === p.id);
  return String(i + 1).padStart(3, "0");
}

/** Projects for one door (or all), featured first, then by `order`. */
export function projectsFor(door?: DoorId) {
  return projects.filter((p) => !door || p.door === door).sort(byPriority);
}

/** Groups into [{ year, items }], newest year first, featured first inside each year. */
export function groupByYear(list: Project[]) {
  const map = new Map<number, Project[]>();
  for (const p of list) map.set(p.year, [...(map.get(p.year) ?? []), p]);
  return [...map.entries()].sort((a, b) => b[0] - a[0]).map(([year, items]) => ({ year, items: items.sort(byPriority) }));
}
