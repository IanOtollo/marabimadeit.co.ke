import { doors } from "./site";

export type ServiceId = (typeof doors)[number]["id"] | "unsure";

export const serviceOptions: { id: ServiceId; label: string }[] = [...doors.map((d) => ({ id: d.id as ServiceId, label: d.title })), { id: "unsure", label: "Not sure yet" }];

/** What each service typically needs. Optional chips: they help us prepare, they never gate sending. */
export const scopeOptions: Record<ServiceId, string[]> = {
  websites: ["Up to 10 pages", "More than 10 pages", "Edit content myself", "Bookings or forms", "More than one language", "SEO", "Brand identity and design"],
  ecommerce: ["M-Pesa payments", "Card payments", "Delivery zones", "Stock sync with a shop or POS", "A small range", "A large range"],
  software: ["Different user roles", "Dashboards and reports", "Integrations", "Mobile app", "Workflow automation", "Moving data from an old system"],
  "crm-erp": ["Sales and CRM", "Inventory and purchasing", "Finance and invoicing", "Data migration", "Staff training", "A custom module"],
  unsure: [],
};

export const timingOptions = ["Flexible, no fixed date", "Within 2 months", "As soon as possible"];

export const budgetOptions = ["Prefer to discuss", "Under KES 30,000", "KES 30,000 to 80,000", "KES 80,000 to 150,000", "KES 150,000 to 300,000", "KES 300,000 and above"];

/** A realistic example for the description field, so nobody stares at a blank box. */
export const examples: Record<ServiceId, string> = {
  websites: "We are a law firm in Westlands. We need a site that explains our practice areas and lets clients book a consultation.",
  ecommerce: "I sell handmade leather bags on Instagram and want a store where customers pay with M-Pesa and choose delivery to their area.",
  software: "Our team tracks field visits on spreadsheets. We need a simple app where staff log visits and managers see a weekly report.",
  "crm-erp": "Our sales, stock and invoices live in three different places. We want them in one system and our data cleaned and moved across.",
  unsure: "Tell us the problem or the goal in your own words. We will suggest the right approach on our first call.",
};

export type BriefData = {
  name: string;
  phone: string;
  email: string;
  org: string;
  service: ServiceId | "";
  description: string;
  site: string;
  scope: string[];
  timing: string;
  budget: string;
  notes: string;
};

export const emptyBrief: BriefData = { name: "", phone: "", email: "", org: "", service: "", description: "", site: "", scope: [], timing: "", budget: "", notes: "" };

export const serviceLabel = (id: string) => serviceOptions.find((s) => s.id === id)?.label ?? "Not sure yet";

/** The brief as readable text: used for the WhatsApp/email hand-over and the confirmation. */
export function composeBrief(d: BriefData, ref?: string): string {
  const lines = [
    ref && `Reference: ${ref}`,
    `Name: ${d.name}`,
    `Phone / WhatsApp: ${d.phone}`,
    `Email: ${d.email}`,
    d.org && `Organisation: ${d.org}`,
    `Service: ${serviceLabel(d.service)}`,
    "",
    "What they want to achieve:",
    d.description,
    d.site && `\nExisting site or page: ${d.site}`,
    d.scope.length ? `\nNeeds: ${d.scope.join(", ")}` : "",
    d.timing && `Timing: ${d.timing}`,
    d.budget && `Budget: ${d.budget}`,
    d.notes && `\nNotes:\n${d.notes}`,
    "\nSource: marabimadeit.co.ke project brief",
  ];
  return lines.filter((l): l is string => typeof l === "string").join("\n");
}

export const phoneDigits = (s: string) => s.replace(/\D/g, "");
export const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());

/** Shared by the form (instant feedback) and the server (never trusts the browser). */
export function validate(d: BriefData): Record<string, string> {
  const e: Record<string, string> = {};
  if (d.name.trim().length < 2) e.name = "Please enter your full name.";
  if (phoneDigits(d.phone).length < 9) e.phone = "Enter a phone or WhatsApp number we can reach you on (at least 9 digits).";
  if (!emailOk(d.email)) e.email = "Enter a valid email address.";
  if (!d.service) e.service = "Choose the service that is closest. \"Not sure yet\" is fine.";
  if (d.description.trim().length < 1) e.description = "Tell us briefly what you want to achieve, in as few or as many words as you like.";
  return e;
}

const GUESS: [ServiceId, RegExp][] = [
  ["ecommerce", /\b(shop|store|e-?commerce|sell|selling|checkout|cart|products?|orders?)\b/i],
  ["crm-erp", /\b(crm|erp|zoho|invoice|invoicing|inventory|customers?|leads?|pipeline|accounting)\b/i],
  ["software", /\b(app|software|portal|dashboard|platform|automation|automate|system|api)\b/i],
  ["websites", /\b(website|site|portfolio|landing|blog|web ?page|online presence)\b/i],
];
/** A light suggestion from what the visitor wrote. Never selects anything for them. */
export function guessService(text: string): ServiceId | null {
  for (const [id, re] of GUESS) if (re.test(text)) return id;
  return null;
}
