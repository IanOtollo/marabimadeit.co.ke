// Single source of truth for copy that appears in more than one place.
export type Founder = {
  slug: "ian" | "aineah";
  name: string;
  first: string;
  role: string;
  tagline: string;
  intro: string;
  accent: "primary" | "secondary";
  hue: string; // hex used for canvas/3D (kept in sync with CSS variables)
  stats: { label: string; value: number }[];
  signature: string;
  order: number; // Founder first
  /** Personal contact points shown under each avatar. Update the numbers/handles here. */
  contact: { whatsapp: string; phone: string; email: string };
};

export const site = {
  name: "Marabi Made It",
  short: "Marabi",
  tagline: "MarabiMadeIt.", // single source: hero, footer, loader, card backs, structured data
  domain: "marabimadeit.co.ke",
  email: "marabimadeit@gmail.com",
  phone: "+254 758 333996", // the main site line (footer, contact page): Aineah's number
  whatsapp: "254758333996", // digits only, international format, no plus. The assistant sends briefs here.
  /** Where emailed enquiries go. The studio inbox. */
  enquiryTo: "marabimadeit@gmail.com",
  location: "Nairobi, Kenya",
  timezone: "Africa/Nairobi",
  legalEntity: "Marabi Made It",
  updated: "5 November 2026",
};

const foundersRaw: Founder[] = [
  {
    slug: "ian",
    order: 2,
    contact: { whatsapp: "254700399641", phone: "+254 112 993859", email: "ianotollo@gmail.com" },
    name: "Ian Otollo",
    first: "Ian",
    role: "Co-Founder · Developer",
    tagline: "Average Intelligence",
    intro: "Builds alongside the founder: front-end craft, integrations and the details that make a build feel finished.",
    accent: "primary",
    hue: "#ffc233",
    signature: "IO",
    stats: [
      { label: "Development", value: 90 },
      { label: "Web & UI", value: 88 },
      { label: "Integrations", value: 86 },
      { label: "Technical SEO", value: 84 },
    ],
  },
  {
    slug: "aineah",
    order: 1,
    contact: { whatsapp: "254758333996", phone: "+254 758 333996", email: "aineahbwire@gmail.com" },
    name: "Aineah Marabi",
    first: "Aineah",
    role: "Founder · Lead Software Developer",
    tagline: "Just Like You But On Steroids",
    intro: "Founded the studio and leads its engineering: architecture, code and delivery, from the first commit to launch day.",
    accent: "secondary",
    hue: "#3fd9cf",
    signature: "AM",
    stats: [
      { label: "Software Engineering", value: 95 },
      { label: "Architecture", value: 92 },
      { label: "Client Delivery", value: 90 },
      { label: "Strategy", value: 88 },
    ],
  },
];

export const founders: Founder[] = [...foundersRaw].sort((a, b) => a.order - b.order);

export type Door = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  blurb: string;
  points: string[];
  accent: "primary" | "secondary";
};

export const doors: Door[] = [
  {
    id: "websites",
    index: "01",
    title: "Websites & Portfolios",
    kicker: "Marketing sites, brand sites, portfolios",
    blurb:
      "Fast, search-ready sites that explain what you do and make the next step obvious. Designed in the open, built to be found.",
    points: ["Discovery & content strategy", "UI/UX and design system", "Next.js build, CMS-ready", "Technical SEO & Core Web Vitals", "Launch, analytics, handover"],
    accent: "primary",
  },
  {
    id: "ecommerce",
    index: "02",
    title: "E-commerce",
    kicker: "Stores that take M-Pesa and cards",
    blurb:
      "Storefronts built for Kenyan buyers: M-Pesa and card checkout, delivery zones, stock sync and order tooling your team can run.",
    points: ["M-Pesa (Daraja) & card payments", "Catalogue, stock & order management", "Delivery and pickup rules", "Conversion-led UX", "Analytics & abandoned-cart recovery"],
    accent: "secondary",
  },
  {
    id: "software",
    index: "03",
    title: "Custom Software",
    kicker: "Web apps, portals, APIs, automation",
    blurb:
      "Bespoke tools for the work your business actually does. Scoped tightly, shipped in increments, documented so you are never locked in.",
    points: ["Product scoping & prototypes", "Web and mobile-first apps", "APIs and integrations", "Automation of manual workflows", "Maintenance & support plans"],
    accent: "primary",
  },
  {
    id: "crm-erp",
    index: "04",
    title: "CRMs & ERPs",
    kicker: "Sales, finance, inventory, operations",
    blurb:
      "Implementations and custom builds that put customers, stock, invoicing and reporting in one system, with your team trained to use it.",
    points: ["Process mapping & requirements", "Zoho and custom implementations", "Data migration & clean-up", "Reporting dashboards", "Training & ongoing support"],
    accent: "secondary",
  },
];

export type ServiceDetail = {
  slug: string;
  headline: string;
  intro: string;
  who: string;
  deliverables: { title: string; text: string }[];
  stack: string[];
  outcomes: { stat: string; label: string }[];
  phases: { name: string; duration: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Record<string, ServiceDetail> = {
  websites: {
    slug: "websites",
    headline: "A website that works as hard as you do.",
    intro:
      "Your site is the first meeting most customers will ever have with you. We design and build marketing sites, brand sites and portfolios that load instantly, read clearly on a phone, and are structured so search engines understand exactly what you offer.",
    who: "Businesses, consultants, agencies, schools, NGOs and creatives who need a credible, fast, findable online presence.",
    deliverables: [
      { title: "Strategy & content map", text: "Audience, goals, page-by-page messaging and a sitemap built around what people search for and what you want them to do." },
      { title: "UI/UX design", text: "Wireframes first, then a high-fidelity design system: type, colour, spacing and components, tested at mobile width before desktop." },
      { title: "Engineering", text: "Next.js and TypeScript with server rendering, image optimisation and accessibility built in. Content you can edit without calling us." },
      { title: "Technical SEO", text: "Semantic markup, structured data, sitemaps, meta and social previews, redirects, and Core Web Vitals tuned before launch." },
      { title: "Analytics & conversion", text: "Consent-first analytics, event tracking on your key actions, and a dashboard that tells you what is working." },
      { title: "Launch & handover", text: "DNS, SSL, email, backups and monitoring set up. A recorded walkthrough and documentation so you are never dependent on us." },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "MDX / Headless CMS", "Vercel or self-hosted"],
    outcomes: [
      { stat: "90+", label: "Lighthouse performance target" },
      { stat: "<2s", label: "Largest contentful paint target on 4G" },
      { stat: "100%", label: "Source code and content handed over" },
    ],
    phases: [
      { name: "Discover & plan", duration: "Phase 1", text: "Interviews, competitor review, keyword research, sitemap and written scope." },
      { name: "Design", duration: "Phase 2", text: "Wireframes, then UI design with two review rounds, approved before any code." },
      { name: "Build", duration: "Phase 3", text: "Iterative development on a private staging URL you can open at any time." },
      { name: "Optimise & launch", duration: "Phase 4", text: "SEO, performance and accessibility audit, content load, go-live and handover." },
    ],
    faqs: [
      { q: "How long does a website take?", a: "It depends on scope, how ready your content is, and our task load at the time. The timeline is flexible: we agree a realistic plan in your proposal, and if the project or our workload stretches it, you hear from us early." },
      { q: "Will I be able to edit it myself?", a: "Yes. We connect a content system suited to your team, from simple file-based editing to a full headless CMS, and train you to use it." },
      { q: "Do you handle SEO?", a: "Technical SEO is part of every build: structure, speed, markup and indexing. Ongoing content and link-building campaigns can be added as a separate retainer." },
      { q: "Who owns the site?", a: "You do, on final payment: design files, code and content. We list every open-source component we used so nothing is hidden." },
      { q: "Do you provide hosting?", a: "We can host it for you, or set it up in your own account so you hold the keys. We recommend whichever suits your traffic and budget." },
    ],
  },
  ecommerce: {
    slug: "ecommerce",
    headline: "Stores that sell the way Kenya buys.",
    intro:
      "Great e-commerce is not a catalogue with a cart. It is trust, speed, the right payment options and an operation behind it that does not collapse on a busy Saturday. We build storefronts around M-Pesa and cards, with the admin tools your team needs to fulfil orders confidently.",
    who: "Retailers, brands, wholesalers and makers moving from WhatsApp and Instagram orders to a proper store, or replacing a store that has outgrown its setup.",
    deliverables: [
      { title: "Storefront UX", text: "Product pages and a checkout flow designed for thumbs on small screens and slow connections, with fewer steps and clearer prices." },
      { title: "M-Pesa & card payments", text: "Safaricom Daraja STK Push, plus card payments through a licensed gateway, with automatic reconciliation of every order." },
      { title: "Catalogue & inventory", text: "Variants, bundles, stock levels and low-stock alerts. Bulk import from your spreadsheet so you do not re-type your range." },
      { title: "Delivery logic", text: "Zones, rates, pickup points and courier integration, with customers notified by SMS or email at each stage." },
      { title: "Order management", text: "A clean admin for processing orders, refunds, receipts and invoices, with exports your accountant can use." },
      { title: "Growth tooling", text: "Product SEO, abandoned-cart recovery, discount codes and analytics that show revenue by channel." },
    ],
    stack: ["Next.js", "Medusa / Saleor / Shopify (as suited)", "PostgreSQL", "Safaricom Daraja API", "Card gateway of your choice", "Redis"],
    outcomes: [
      { stat: "STK", label: "M-Pesa push checkout, no paybill typing" },
      { stat: "24/7", label: "Order and payment monitoring" },
      { stat: "1", label: "Source of truth for stock across channels" },
    ],
    phases: [
      { name: "Plan the operation", duration: "Phase 1", text: "Catalogue, payments, delivery and fulfilment flow mapped before design." },
      { name: "Design the journey", duration: "Phase 2", text: "Product, cart and checkout designed and prototyped for mobile first." },
      { name: "Build & integrate", duration: "Phase 3", text: "Storefront, admin, payments and delivery integrations, tested with real transactions." },
      { name: "Test, train, launch", duration: "Phase 4", text: "Load and payment testing, staff training, soft launch, then full launch." },
    ],
    faqs: [
      { q: "Which platform do you use?", a: "We pick the platform to fit the business: an open-source headless stack for flexibility and no per-sale fees, or Shopify where speed to market matters more. We explain the trade-offs before you commit." },
      { q: "How does M-Pesa work in the store?", a: "The customer enters their number, receives an STK Push prompt on their phone, approves with their PIN, and the order confirms automatically. Everything reconciles in your admin." },
      { q: "Can it manage stock across my shop and online?", a: "Yes. We build or integrate inventory so one stock count serves both, and can connect your existing POS or accounting system." },
      { q: "What are the running costs?", a: "Hosting, domain, SMS, and payment fees charged by the providers. We list them in your proposal so there are no surprises." },
      { q: "Who is responsible for customer data?", a: "You are the controller of your customers' data and we act as your processor, handling it under the Data Protection Act, 2019 as set out in our Privacy Policy." },
    ],
  },
  software: {
    slug: "software",
    headline: "Software shaped to the way you work.",
    intro:
      "Off-the-shelf tools make you bend your process to fit them. When that costs more than it saves, we build software around your actual workflow: web apps, internal portals, customer dashboards, APIs and automations, delivered in small increments so you see progress regularly.",
    who: "Operations-heavy businesses, startups building a first product, and teams drowning in spreadsheets, WhatsApp threads and manual copy-paste.",
    deliverables: [
      { title: "Product discovery", text: "Workshops to find the real problem, a prioritised backlog, and a clickable prototype validated with your users before heavy build." },
      { title: "Web & mobile apps", text: "Responsive web apps and installable progressive apps, with offline tolerance where connectivity demands it." },
      { title: "APIs & integrations", text: "Clean, documented APIs, and connectors to M-Pesa, accounting, SMS, email, maps and the tools you already pay for." },
      { title: "Workflow automation", text: "Approvals, notifications, document generation and reporting that remove hours of repeated manual work." },
      { title: "Quality & security", text: "Automated tests, role-based access, audit trails, encrypted data and regular dependency updates." },
      { title: "Maintenance & evolution", text: "Monitoring, bug-fix cover and a rolling roadmap so the software keeps pace with the business." },
    ],
    stack: ["TypeScript", "React / Next.js", "Node.js", "PostgreSQL", "Python (automation)", "Docker"],
    outcomes: [
      { stat: "2 wk", label: "Sprint cadence with a working demo each time" },
      { stat: "0", label: "Vendor lock-in, you own the code" },
      { stat: "Docs", label: "Handover documentation on every system" },
    ],
    phases: [
      { name: "Discover", duration: "Phase 1", text: "Problem framing, user interviews, scope and a prioritised backlog." },
      { name: "Prototype", duration: "Phase 2", text: "Clickable prototype tested with real users, estimates tightened." },
      { name: "Build in sprints", duration: "Phase 3", text: "Short sprints with demos, staged releases and automated testing." },
      { name: "Launch & evolve", duration: "Ongoing", text: "Rollout, training, monitoring, and a roadmap informed by real usage." },
    ],
    faqs: [
      { q: "How much will it cost?", a: "We scope in phases so you can commit one step at a time. Discovery gives a fixed estimate for the build, and anything that changes is priced and agreed in writing first." },
      { q: "Do I own the code?", a: "Yes, bespoke code is assigned to you on final payment, along with the repository, infrastructure setup and documentation." },
      { q: "Can you take over a system someone else built?", a: "Often, yes. We start with a short code and architecture review, then tell you honestly whether to repair, refactor or rebuild." },
      { q: "How do you keep it secure?", a: "Role-based access, encrypted data in transit and at rest, regular dependency updates, audit logging and backups, with a documented incident process." },
      { q: "Will it work on poor connections?", a: "We design for it: light payloads, caching and offline-tolerant behaviour where it matters to your users." },
    ],
  },
  "crm-erp": {
    slug: "crm-erp",
    headline: "One system for customers, stock and money.",
    intro:
      "When sales lives in one tool, invoices in another and stock in a spreadsheet, nobody sees the whole business. We implement and extend CRM and ERP systems, from Zoho to custom builds, so that leads, orders, inventory, billing and reporting finally talk to each other.",
    who: "Growing companies, distributors, service firms and institutions that have outgrown spreadsheets and disconnected apps.",
    deliverables: [
      { title: "Process mapping", text: "We map how work really flows between sales, operations and finance, and design the system around it, not the other way round." },
      { title: "Implementation & configuration", text: "Modules, pipelines, roles, approvals and automations configured on Zoho or another suitable platform, or built custom." },
      { title: "Data migration", text: "Clean-up, de-duplication and import of customers, products and history from spreadsheets and legacy systems, with verification." },
      { title: "Integrations", text: "Accounting, M-Pesa, e-commerce, email, WhatsApp and SMS connected so data is entered once." },
      { title: "Dashboards & reporting", text: "Live views of pipeline, stock, receivables and performance for owners, managers and staff." },
      { title: "Training & adoption", text: "Role-based training and documentation, plus post-launch support so the team actually uses the system." },
    ],
    stack: ["Zoho CRM / Books / Inventory", "Custom Node.js & PostgreSQL builds", "Zoho Deluge & APIs", "Power-user dashboards", "M-Pesa & SMS integrations"],
    outcomes: [
      { stat: "1", label: "Version of the truth across departments" },
      { stat: "-70%", label: "Typical drop in manual re-entry after automation" },
      { stat: "Real-time", label: "Stock, sales and receivables visibility" },
    ],
    phases: [
      { name: "Map & requirements", duration: "Phase 1", text: "Workshops with each department, process maps and a written requirements document." },
      { name: "Configure & build", duration: "Phase 2", text: "Platform set-up, custom modules and automations, built and reviewed in stages." },
      { name: "Migrate & integrate", duration: "Phase 3", text: "Data cleaned and imported, integrations connected, everything reconciled." },
      { name: "Train & go live", duration: "Phase 4", text: "Role-based training, a parallel-run period and supported go-live." },
    ],
    faqs: [
      { q: "Do we need Zoho, or a custom system?", a: "Many businesses are best served by configuring an established platform. We recommend custom only when your process is genuinely unusual. We will tell you plainly which is cheaper in the long run." },
      { q: "What happens to our existing data?", a: "We audit it, clean it, migrate it, and reconcile the totals with you so you can trust the new system from day one." },
      { q: "Will staff resist the change?", a: "Adoption is the real project. We involve users early, train by role, and stay close through the first weeks after launch." },
      { q: "Can it connect to our accounting?", a: "Yes. We integrate with Zoho Books and other accounting tools so invoices, payments and stock movements post automatically." },
      { q: "Who supports it afterwards?", a: "We offer support plans with defined response targets, plus a roadmap of improvements as your processes evolve." },
    ],
  },
};

export const lifecycle = [
  { step: "Discover", text: "We learn your business, users and goals, then write down what success means." },
  { step: "Define", text: "Scope, sitemap or system map, timeline and a fixed quote. No surprises later." },
  { step: "Design", text: "Wireframes, then high-fidelity UI/UX. You review and sign off before code." },
  { step: "Develop", text: "Built in short iterations on a staging URL you can open at any time." },
  { step: "Deliver", text: "Testing, SEO and performance checks, launch, and a recorded handover." },
  { step: "Develop further", text: "Support plans, analytics reviews and roadmap work after launch." },
];

// Edit these dates and events to your real history.
export const timeline = [
  { date: "The spark", title: "Two brothers, one habit", text: "Building things was always the career plan. It began as how we spent our evenings: one writing code, one asking whether anyone would use it." },
  { date: "First builds", title: "Learning in public", text: "Small sites and tools for people we knew, each one teaching us what clients actually need versus what they ask for." },
  { date: "The shift", title: "From projects to a practice", text: "We stopped treating work as one-offs and started building repeatable process: discovery, design, delivery, support." },
  { date: "The studio", title: "Marabi Made It", text: "Under one name, with one standard. Websites, e-commerce, software and CRM/ERP, each as its own service." },
  { date: "2026", title: "Today", text: "Every project we ship carries our name as its signature, and we stand behind it." },
];

/** Logos are shown only as silhouettes (no links). Each SVG is a traced single-colour mark in /public/partners; ratio is its width / height. */
/** `scale` enlarges marks that hold fine detail (rings with small lettering) so they stay readable. */
export type Partner = { name: string; logo: string; ratio: number; scale?: number };
export const partners: Partner[] = [
  { name: "IKA360", logo: "/partners/ika360.svg", ratio: 1.41 },
  { name: "Jewel in the Mines", logo: "/partners/jewel-in-the-mines.svg", ratio: 8.897 },
  { name: "Ethereal Dayo", logo: "/partners/ethereal-dayo.svg", ratio: 3.061 },
  { name: "Mutende Pharmacare", logo: "/partners/mutende-pharmacare.svg", ratio: 4.63 },
  { name: "Ficus & Figs", logo: "/partners/ficus-and-figs.svg", ratio: 1, scale: 1.45 },
  { name: "Dualpix Communications", logo: "/partners/dualpix-communications.svg", ratio: 3.858 },
  { name: "Epimax Kenya", logo: "/partners/epimax-kenya.svg", ratio: 1.003, scale: 1.6 },
  { name: "Zoho", logo: "/partners/zoho.svg", ratio: 2.288 },
];
