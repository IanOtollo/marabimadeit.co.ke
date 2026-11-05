export type Option = { id: string; label: string; hint: string; weeks: number; weight: number };

export type EstimatorDoor = {
  id: "websites" | "ecommerce" | "software" | "crm-erp";
  label: string;
  baseWeeks: number;
  baseWeight: number;
  options: Option[];
};

/** Complexity model: weight drives the "scale" band, weeks drive the timeline. No prices are published here. */
export const estimatorDoors: EstimatorDoor[] = [
  {
    id: "websites",
    label: "Website",
    baseWeeks: 3,
    baseWeight: 10,
    options: [
      { id: "pages-10", label: "Up to 10 pages", hint: "A focused marketing or portfolio site", weeks: 1, weight: 6 },
      { id: "pages-25", label: "10 to 25 pages", hint: "Services, team, blog, case studies", weeks: 2, weight: 14 },
      { id: "cms", label: "Content management", hint: "Edit pages yourself, no developer needed", weeks: 1, weight: 10 },
      { id: "multilang", label: "More than one language", hint: "English plus Swahili or others", weeks: 1, weight: 8 },
      { id: "booking", label: "Bookings or forms engine", hint: "Appointments, quotes, lead routing", weeks: 1, weight: 10 },
      { id: "seo", label: "SEO programme", hint: "Content plan and ongoing optimisation", weeks: 1, weight: 8 },
      { id: "brand", label: "Brand identity and design system", hint: "Logo-led visual system, guidelines", weeks: 2, weight: 12 },
    ],
  },
  {
    id: "ecommerce",
    label: "Online store",
    baseWeeks: 6,
    baseWeight: 28,
    options: [
      { id: "skus-100", label: "Up to 100 products", hint: "A tight, curated range", weeks: 0, weight: 0 },
      { id: "skus-1000", label: "Up to 1,000 products", hint: "Bulk import, variants and filters", weeks: 1, weight: 12 },
      { id: "mpesa", label: "M-Pesa STK Push", hint: "Safaricom Daraja integration with reconciliation", weeks: 1, weight: 10 },
      { id: "cards", label: "Card payments", hint: "Licensed gateway, 3-D Secure", weeks: 1, weight: 8 },
      { id: "delivery", label: "Zones and courier integration", hint: "Rates by area, tracking updates", weeks: 1, weight: 10 },
      { id: "inventory", label: "Inventory sync with shop or POS", hint: "One stock count for every channel", weeks: 2, weight: 16 },
      { id: "marketplace", label: "Multi-vendor marketplace", hint: "Sellers, payouts and commissions", weeks: 5, weight: 34 },
    ],
  },
  {
    id: "software",
    label: "Custom software",
    baseWeeks: 8,
    baseWeight: 40,
    options: [
      { id: "roles", label: "Roles and permissions", hint: "Different views for staff, managers, clients", weeks: 1, weight: 8 },
      { id: "dash", label: "Reporting dashboards", hint: "Live charts and exportable reports", weeks: 2, weight: 14 },
      { id: "api", label: "Public or partner API", hint: "Documented, versioned, rate limited", weeks: 2, weight: 14 },
      { id: "integrations", label: "Third-party integrations", hint: "M-Pesa, SMS, email, accounting, maps", weeks: 2, weight: 14 },
      { id: "mobile", label: "Installable mobile app", hint: "PWA or native shell, offline tolerant", weeks: 4, weight: 24 },
      { id: "automation", label: "Workflow automation", hint: "Approvals, documents, notifications", weeks: 2, weight: 12 },
      { id: "migration", label: "Legacy data migration", hint: "From spreadsheets or an old system", weeks: 2, weight: 12 },
    ],
  },
  {
    id: "crm-erp",
    label: "CRM or ERP",
    baseWeeks: 8,
    baseWeight: 38,
    options: [
      { id: "users-10", label: "Up to 10 users", hint: "A small team on one pipeline", weeks: 0, weight: 0 },
      { id: "users-50", label: "10 to 50 users", hint: "Several teams, roles and approvals", weeks: 2, weight: 14 },
      { id: "sales", label: "Sales and CRM", hint: "Leads, pipeline, quotes, follow-ups", weeks: 1, weight: 8 },
      { id: "inventory-m", label: "Inventory and procurement", hint: "Stock, suppliers, purchase orders", weeks: 2, weight: 14 },
      { id: "finance", label: "Finance and invoicing", hint: "Invoices, payments, reconciliation", weeks: 2, weight: 14 },
      { id: "migrate", label: "Data migration and clean-up", hint: "De-duplicate, import, reconcile totals", weeks: 2, weight: 14 },
      { id: "custom-mod", label: "Custom module", hint: "Something specific to your operation", weeks: 3, weight: 18 },
    ],
  },
];

export const urgency = [
  { id: "calm", label: "Flexible", mult: 1, note: "Best value: we plan around our calendar" },
  { id: "soon", label: "Within 2 months", mult: 1.1, note: "We reserve capacity early" },
  { id: "asap", label: "As soon as possible", mult: 1.25, note: "Parallel work, a priority slot" },
] as const;

export const scaleBands = [
  { max: 30, name: "Compact", text: "A tight, well-defined build. Fast to ship and easy to maintain." },
  { max: 55, name: "Standard", text: "A full production system with a few moving parts." },
  { max: 85, name: "Expansive", text: "A substantial build with several integrations and roles." },
  { max: Infinity, name: "Enterprise", text: "A large, multi-team system that we would phase and de-risk." },
] as const;
