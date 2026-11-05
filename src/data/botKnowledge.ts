export type Topic = {
  id: string;
  title: string;
  keywords: string[];
  short: string; // one-line bubble when the bot rushes to a section
  answer: string; // fuller chat answer
  follow: string[]; // follow-up topic ids
  door?: "websites" | "ecommerce" | "software" | "crm-erp";
  link?: { href: string; label: string };
};

export const topics: Topic[] = [
  {
    id: "websites",
    title: "Websites & portfolios",
    keywords: ["website", "site", "portfolio", "landing", "brand", "marketing", "web design", "redesign", "blog"],
    short: "Websites that load fast, read well on a phone and are built to be found.",
    answer:
      "We build marketing sites, brand sites and portfolios in Next.js: fast, mobile-first, and structured for search. Strategy, design, build, SEO and launch are all in one process, and you can edit the content yourself afterwards. Most sites take four to six weeks.",
    follow: ["seo", "pricing", "process"],
    door: "websites",
    link: { href: "/services/websites", label: "Open the Websites door" },
  },
  {
    id: "ecommerce",
    title: "Online stores",
    keywords: ["shop", "store", "ecommerce", "e-commerce", "sell online", "products", "cart", "checkout", "orders", "inventory", "delivery"],
    short: "Stores built for how Kenya buys: M-Pesa, cards, delivery zones, stock that stays in sync.",
    answer:
      "Our stores take M-Pesa STK Push and cards, handle delivery zones and couriers, and give your team a clean admin for orders, stock and receipts. We connect it to your shop or POS if you have one, so one stock count serves every channel.",
    follow: ["mpesa", "pricing", "timeline"],
    door: "ecommerce",
    link: { href: "/services/ecommerce", label: "Open the E-commerce door" },
  },
  {
    id: "software",
    title: "Custom software",
    keywords: ["software", "app", "application", "platform", "portal", "dashboard", "api", "automation", "saas", "mobile app", "system", "build"],
    short: "Bespoke tools shaped around how your business really works, shipped in small increments.",
    answer:
      "We build web apps, internal portals, APIs and automations. We scope in phases so you commit one step at a time, ship in two-week sprints with a demo each time, and you own the code and documentation at the end.",
    follow: ["process", "ownership", "support"],
    door: "software",
    link: { href: "/services/software", label: "Open the Software door" },
  },
  {
    id: "crm-erp",
    title: "CRM & ERP",
    keywords: ["crm", "erp", "zoho", "sales pipeline", "invoicing", "inventory system", "operations", "migration", "customers", "leads", "accounting"],
    short: "One system for customers, stock and money, with your team trained to actually use it.",
    answer:
      "We implement and extend CRM and ERP systems, often on Zoho, sometimes custom. We map your process first, migrate and clean your data, connect accounting, M-Pesa and messaging, and train people by role. Adoption is the real project.",
    follow: ["timeline", "support", "pricing"],
    door: "crm-erp",
    link: { href: "/services/crm-erp", label: "Open the CRM & ERP door" },
  },
  {
    id: "process",
    title: "How we work",
    keywords: ["process", "how do you work", "steps", "sdlc", "life cycle", "lifecycle", "stages", "methodology", "phases", "agile"],
    short: "Six stages in the order they happen: Discover, Define, Design, Develop, Deliver, Develop further.",
    answer:
      "Every project moves through six stages: Discover, Define, Design, Develop, Deliver and Develop further. At each one you know what we are doing, what you get, and what you need to decide. Nothing is built before you have signed off the design.",
    follow: ["timeline", "pricing", "ownership"],
    link: { href: "/process", label: "See the full process" },
  },
  {
    id: "pricing",
    title: "Pricing",
    keywords: ["price", "pricing", "cost", "how much", "quote", "budget", "rates", "fee", "expensive", "cheap", "afford", "payment plan"],
    short: "Fixed quotes in shillings, written before work starts. Shape your project to see the scale.",
    answer:
      "We give a fixed quote in Kenya Shillings after a short discovery call, in writing, before work starts. A deposit starts the work and the balance follows milestones. Try the project shaper on the pricing page to see the scale and timeline for your idea.",
    follow: ["timeline", "start", "ownership"],
    link: { href: "/pricing", label: "Shape your project" },
  },
  {
    id: "timeline",
    title: "How long it takes",
    keywords: ["how long", "timeline", "deadline", "weeks", "duration", "when", "urgent", "asap", "fast", "turnaround", "delivery time"],
    short: "A typical site takes 4 to 6 weeks. Stores, software and ERP run 8 to 12 weeks, fixed in your proposal.",
    answer:
      "A typical website takes four to six weeks. An online store takes eight to ten, software and CRM/ERP builds run eight to sixteen depending on scope. Your written proposal fixes the real dates, and fortnightly demos show progress.",
    follow: ["process", "pricing", "start"],
  },
  {
    id: "mpesa",
    title: "M-Pesa & payments",
    keywords: ["mpesa", "m-pesa", "stk", "daraja", "mobile money", "pay", "paybill", "till", "card", "payments"],
    short: "M-Pesa STK Push, so customers approve with their PIN and orders confirm automatically.",
    answer:
      "We integrate Safaricom Daraja STK Push: the customer enters their number, approves on their phone, and the order confirms and reconciles automatically. Card payments run through a licensed gateway alongside it.",
    follow: ["ecommerce", "pricing", "support"],
    door: "ecommerce",
  },
  {
    id: "seo",
    title: "SEO & performance",
    keywords: ["seo", "google", "ranking", "search", "found", "traffic", "speed", "performance", "lighthouse", "core web vitals"],
    short: "Technical SEO and speed are built in, not bolted on.",
    answer:
      "Every build includes technical SEO: semantic structure, structured data, sitemaps, previews, redirects and Core Web Vitals tuning. We target a Lighthouse score of 90 or more. Ongoing content and link-building can be added as a retainer.",
    follow: ["websites", "pricing", "support"],
    door: "websites",
  },
  {
    id: "ownership",
    title: "Who owns it",
    keywords: ["own", "ownership", "copyright", "source code", "lock-in", "lock in", "hosting", "access", "credentials", "handover"],
    short: "You own it. Code, design and content are yours on final payment, with a recorded handover.",
    answer:
      "You do. Bespoke design, code and content are assigned to you on final payment, and we hand over source code, credentials, documentation and a recorded walkthrough. We list the open-source tools we used so nothing is hidden.",
    follow: ["support", "pricing", "process"],
    link: { href: "/engagement", label: "Read the Engagement Terms" },
  },
  {
    id: "support",
    title: "Support & maintenance",
    keywords: ["support", "maintenance", "after launch", "bugs", "fix", "update", "monitor", "retainer", "warranty", "hosting"],
    short: "30 days of defect cover are included, then maintenance plans sized to what you need.",
    answer:
      "Thirty days of defect cover are included after launch. After that, a maintenance plan covers monitoring, security updates, backups and a rolling roadmap, with response targets agreed in writing.",
    follow: ["ownership", "pricing", "start"],
  },
  {
    id: "team",
    title: "Who you will work with",
    keywords: ["who", "team", "founder", "aineah", "ian", "about", "staff", "developers", "people"],
    short: "Two brothers: Aineah Marabi (Founder, Lead Software Developer) and Ian Otollo (Co-Founder, Developer).",
    answer:
      "Aineah Marabi founded the studio and leads the software engineering. Ian Otollo is Co-Founder and Developer. The people you meet at the start are the people who build and support your work.",
    follow: ["process", "start", "location"],
    link: { href: "/about", label: "Meet the brothers" },
  },
  {
    id: "location",
    title: "Where we are",
    keywords: ["where", "location", "nairobi", "office", "meet", "visit", "address", "remote", "call", "phone", "whatsapp", "email", "contact"],
    short: "Based in Nairobi. We work with clients across Kenya and beyond, by call, WhatsApp or in person.",
    answer:
      "We are based in Nairobi and work with clients across Kenya and beyond, by call, WhatsApp, email or in person. We reply within one business day.",
    follow: ["start", "timeline", "team"],
    link: { href: "/contact", label: "Contact us" },
  },
  {
    id: "work",
    title: "Past work",
    keywords: ["portfolio", "past work", "case study", "case studies", "examples", "projects", "references", "clients", "worked with"],
    short: "Our case files are organised by door and year.",
    answer:
      "Our case files are being organised by door and year on the Work page. If you want references for something similar to your project, ask and we will connect you with a past client.",
    follow: ["start", "team", "pricing"],
    link: { href: "/work", label: "See our work" },
  },
  {
    id: "security",
    title: "Security & privacy",
    keywords: ["security", "secure", "privacy", "data", "gdpr", "dpa", "protection", "hacked", "safe", "confidential", "nda"],
    short: "Encryption, least-privilege access and the Data Protection Act 2019, in writing.",
    answer:
      "We use encryption in transit and at rest, role-based access, MFA on admin accounts, backups and patching. We handle personal data under the Data Protection Act, 2019 and will sign an NDA before you share anything sensitive.",
    follow: ["ownership", "support", "start"],
    link: { href: "/privacy", label: "Read the Privacy Policy" },
  },
  {
    id: "start",
    title: "Starting a project",
    keywords: ["start", "begin", "hire", "get started", "kickoff", "proposal", "work with you", "contact", "enquire", "enquiry"],
    short: "Five quick taps and I will package your brief for the team.",
    answer:
      "The easiest way is with me: five quick taps, one or two typed lines, and I will package your brief and hand it to the team by WhatsApp or email. You get a reply within one business day and a written proposal after a free call.",
    follow: ["pricing", "timeline", "process"],
  },
];

export const byId = (id: string) => topics.find((t) => t.id === id);

const STOP = new Set(["the", "a", "an", "is", "are", "do", "you", "your", "i", "we", "my", "to", "for", "of", "and", "can", "me", "it", "in", "on", "with", "what", "how", "about", "need", "want", "please"]);

/** Lightweight intent matcher: phrase hits weigh more than single words. */
export function matchTopic(input: string): Topic | null {
  const text = input.toLowerCase();
  const words = text.split(/[^a-z0-9+-]+/).filter((w) => w && !STOP.has(w));
  let best: { t: Topic; s: number } | null = null;
  for (const t of topics) {
    let s = 0;
    for (const k of t.keywords) {
      if (k.includes(" ") || k.includes("-")) {
        if (text.includes(k)) s += 3;
      } else if (words.includes(k)) s += 2;
      else if (words.some((w) => w.length > 3 && (k.startsWith(w) || w.startsWith(k)))) s += 1;
    }
    if (s > 0 && (!best || s > best.s)) best = { t, s };
  }
  return best ? best.t : null;
}

export const greetings = {
  new: "Habari! I'm Marabi 2.0, the studio's assistant. Ask me anything, or let me package your project brief in about a minute.",
  back: (name: string) => `Karibu back, ${name}. Want to pick up your project brief, or ask me something?`,
};
