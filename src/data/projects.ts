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
  /** What was built, as short factual points. */
  highlights?: string[];
  /** Private systems are described in words only: no screenshot, no link. A client logo may stand in. */
  private?: boolean;
  logo?: { src: string; ratio: number };
  monogram?: string;
};

export const projects: Project[] = [
  {
    id: "faith-kajuju",
    slug: "faith-kajuju",
    door: "websites",
    title: "Personal portfolio for a Zoho solutions expert",
    client: "Faith Kajuju",
    year: 2024,
    summary: "A bold, dark portfolio for a Zoho-certified developer and project manager. It introduces her work, lays out her services and puts a CV download and a contact form one tap away.",
    role: "Design and development",
    stack: ["Next.js", "TypeScript"],
    image: "/projects/faithkajuju-hero.jpg",
    url: "https://www.faithkajuju.com",
    highlights: ["Services laid out clearly: finance data migration, training, demos, consulting and integration", "Downloadable CV and a direct contact section", "Fast, single-page experience that works on any phone"],
    order: 1,
  },
  {
    id: "jewel-in-the-mines",
    slug: "jewel-in-the-mines",
    door: "websites",
    title: "A blog about mining, faith and travel",
    client: "Jewel in the Mines",
    year: 2025,
    summary: "A warm editorial blog by Imelda Nasubo. Stories are sorted into mining, mentorship, faith, travel, relationships and reflections, and presented as a calm card layout that invites reading.",
    role: "Design and development",
    stack: ["Next.js", "TypeScript"],
    image: "/projects/jewelinthemines-hero.jpg",
    url: "https://www.jewelinthemines.com",
    highlights: ["Six story categories with their own pages", "Search across every post", "Card layout that keeps long posts easy to browse"],
    order: 2,
  },
  {
    id: "ficus-and-figs",
    slug: "ficus-and-figs",
    door: "websites",
    title: "A guest-home website with online reservations",
    client: "Ficus & Figs",
    year: 2026,
    summary: "A rustic eight-bedroom home in Kiambu that sleeps sixteen, for family getaways, weddings and gatherings. The site sells the atmosphere first, then makes reserving a date simple.",
    role: "Design and development",
    stack: ["Next.js", "TypeScript"],
    image: "/projects/ficusandfigs-hero.jpg",
    url: "https://www.ficusandfigs.com",
    featured: true,
    highlights: ["Full-screen photography with a reservation call to action throughout", "Rooms, events, gallery and location, each in its own chapter", "WhatsApp contact and a privacy-first cookie choice"],
    order: 1,
  },
  {
    id: "roam-and-rest",
    slug: "roam-and-rest",
    door: "websites",
    title: "A curated-stays website for characterful homes",
    client: "Roam & Rest",
    year: 2026,
    summary: "A hand-picked collection of private homes in Karen, Ngong and near Mount Kenya. Guests browse each stay by sleeps, bedrooms and amenities, then reach the host in a tap on WhatsApp or phone.",
    role: "Design and development",
    stack: ["Next.js", "TypeScript", "JavaScript", "Convex"],
    image: "/projects/roamandrest-hero.png",
    url: "https://www.roamandrest.co.ke",
    highlights: ["Six stays, each with its own page, photo gallery and details", "Filters for pool, kitchen, WiFi, parking and en-suite rooms, plus sorting", "House rules, safety, cancellation and FAQ pages, with WhatsApp contact"],
    order: 2,
  },
  {
    id: "scents-by-naire",
    slug: "scents-by-naire",
    door: "ecommerce",
    title: "A fragrance store built around the catalogue",
    client: "Scents by Naire",
    year: 2026,
    summary: "A storefront for premium Arabian perfumes. Shoppers browse by brand, for him or for her, best sellers and new arrivals, with clear prices in shillings and an add-to-cart on every bottle.",
    role: "Design and development",
    stack: ["Next.js", "TypeScript"],
    image: "/projects/nairescents-hero.jpg",
    url: "https://nairescents.com",
    featured: true,
    highlights: ["Shop by brand, gender, best sellers and new arrivals", "Prices in KES with add to cart on every product", "A fast catalogue that stays easy to scan on a phone"],
    order: 1,
  },
  {
    id: "mutende-pharmacare",
    slug: "mutende-pharmacare",
    door: "ecommerce",
    title: "An online pharmacy with prescription upload",
    client: "Mutende Pharmacare",
    year: 2026,
    summary: "Genuine medicines and wellness products delivered across Kenya. Customers shop by need or condition, upload a prescription photo for a pharmacist to check, and pay by M-PESA or on delivery.",
    role: "Design and development",
    stack: ["Next.js", "TypeScript"],
    image: "/projects/mutendepharmacare-hero.jpg",
    url: "https://www.mutendepharmacare.co.ke",
    highlights: ["Shop by category, condition, brand and offers", "Prescription upload with a pharmacist check before dispatch", "M-PESA or cash on delivery, with order tracking and WhatsApp"],
    order: 2,
  },
  {
    id: "ethereal-dayo-store",
    slug: "ethereal-dayo-store",
    door: "ecommerce",
    title: "A niche perfume maison storefront",
    client: "Ethereal Dayo",
    year: 2026,
    summary: "An elegant storefront for ultra-luxury niche fragrances. A quiet, editorial layout leads shoppers into the houses, the bestsellers and the newest arrivals.",
    role: "Design and development",
    stack: ["Next.js", "TypeScript"],
    image: "/projects/etherealscents-hero.jpg",
    url: "https://etherealscents.vercel.app",
    highlights: ["Collections for her and for him, plus shop by brand", "Quick add on bestsellers, with order tracking and returns pages", "Newsletter sign-up for rare drops"],
    order: 3,
  },
  {
    id: "epimax-kenya",
    slug: "epimax-kenya",
    door: "ecommerce",
    title: "A skincare store on Shopify",
    client: "Epimax Kenya",
    year: 2026,
    summary: "An online store for a Nairobi skincare specialist. Shoppers move from body moisturisers to facial cleansers and sunscreen through bold collection tiles, with new arrivals and best sellers up front.",
    role: "Design and development",
    stack: ["Shopify"],
    image: "/projects/epimaxkenya-hero.jpg",
    url: "https://epimaxkenya.com",
    highlights: ["Collections for body, face and sun care, plus best sellers", "Same-day delivery within Nairobi, announced on every page"],
    order: 4,
  },
  {
    id: "dualpix-gms",
    slug: "dualpix-guest-management",
    door: "software",
    title: "Internal guest management system",
    client: "Dualpix Communications",
    year: 2026,
    summary: "A private web system the team at Dualpix Communications uses to manage guests. Access is by sign-in only, so it is described here in words and not shown.",
    role: "Design and development",
    stack: ["TypeScript"],
    private: true,
    logo: { src: "/partners/dualpix-communications.svg", ratio: 3.858 },
    highlights: ["Staff-only access behind a secure sign-in", "Built around how the team already works", "Kept private to protect the business"],
    order: 1,
  },
  {
    id: "ethereal-dayo-pos",
    slug: "ethereal-dayo-pos",
    door: "software",
    title: "Point-of-sale system for a gift shop",
    client: "Ethereal Dayo",
    year: 2026,
    summary: "A point-of-sale system that runs the till for the Ethereal Dayo gift shop. It is a private system with staff sign-in, so it is described here and not shown.",
    role: "Design and development",
    stack: ["TypeScript"],
    private: true,
    logo: { src: "/partners/ethereal-dayo.svg", ratio: 3.061 },
    highlights: ["Staff sign-in for every user", "Made for a busy shop counter", "Kept private to protect the business"],
    order: 2,
  },
  {
    id: "kam2-us-agrovet-pos",
    slug: "kam2-us-agrovet-pos",
    door: "software",
    title: "Point-of-sale system for an agrovet",
    client: "Kam2-US Agrovet",
    year: 2026,
    summary: "A point-of-sale system built for an agrovet's counter. It is a private working system, so it is described here and not shown.",
    role: "Design and development",
    stack: ["TypeScript"],
    private: true,
    monogram: "K2",
    highlights: ["Built for the daily routine at the counter", "Private access for the shop's own staff", "Kept private to protect the business"],
    order: 3,
  },
];

/** Zoho implementations: shown as a roster of work, with the kind of implementation for each. */
export const zohoProjects: { client: string; work: string }[] = [
  { client: "Zulal Properties", work: "Zoho One implementation" },
  { client: "Azure Riverside", work: "Zoho One implementation" },
  { client: "Azura Residences", work: "Zoho One implementation" },
  { client: "Keith Interiors", work: "Zoho One implementation" },
  { client: "Mabsa Group", work: "Zoho One implementation" },
  { client: "Infinite Cleaners", work: "Zoho FSM implementation" },
  { client: "Mini Group of Companies", work: "Zoho Books implementation" },
];

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
