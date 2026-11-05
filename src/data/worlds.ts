// Content for the four door worlds. Demo businesses and figures are illustrative and labelled as such on the page.

/* ───────────────────────── Websites ───────────────────────── */

export const websitesReceive: Record<string, { receive: string[]; note: string }> = {
  "Strategy & content map": {
    receive: ["Sitemap built around real search demand", "Page-by-page messaging brief", "Conversion goals and the one action per page"],
    note: "We write down what each page must achieve before anyone opens a design tool.",
  },
  "UI/UX design": {
    receive: ["Low-fidelity wireframes, then hi-fi design", "A design system: type, colour, spacing, components", "Mobile layouts designed first, tested on real phones"],
    note: "Two review rounds, signed off before a line of code is written.",
  },
  Engineering: {
    receive: ["Next.js + TypeScript, server-rendered", "Accessible, keyboard-friendly components", "An editing workflow your team can actually use"],
    note: "Built on a private staging URL you can open at any time.",
  },
  "Technical SEO": {
    receive: ["Semantic markup and structured data", "Sitemap, robots, redirects, canonical tags", "Social previews and Core Web Vitals tuning"],
    note: "Search visibility is built into the structure, not bolted on after launch.",
  },
  "Analytics & conversion": {
    receive: ["Consent-first analytics set up properly", "Events on calls, forms and WhatsApp taps", "A simple dashboard of what is working"],
    note: "You will know which pages earn enquiries, not just which get traffic.",
  },
  "Launch & handover": {
    receive: ["DNS, SSL, email, backups, monitoring", "A recorded walkthrough of the admin", "Documentation and every credential in your name"],
    note: "You hold the keys. Nothing is left in our accounts.",
  },
};

export const lighthouseTargets = [
  { label: "Performance", value: 95 },
  { label: "Accessibility", value: 100 },
  { label: "Best practices", value: 100 },
  { label: "SEO", value: 100 },
];

export const serpExamples = [
  {
    id: "restaurant",
    chip: "Restaurant",
    name: "Mama Rosa's Kitchen",
    host: "mamarosas.co.ke",
    crumbs: "menu",
    title: "Mama Rosa's Kitchen | Home-style Meals in Westlands, Nairobi",
    desc: "Fresh, home-style Kenyan meals cooked daily. See the menu, book a table or order delivery across Westlands and Kilimani.",
    ogTag: "Order online",
  },
  {
    id: "law",
    chip: "Law firm",
    name: "Kamau & Associates",
    host: "kamauadvocates.co.ke",
    crumbs: "practice-areas",
    title: "Kamau & Associates | Commercial and Property Law, Nairobi",
    desc: "Advocates advising Kenyan businesses on contracts, land and disputes. Clear fees, direct access to a partner, free first consultation.",
    ogTag: "Book a consultation",
  },
  {
    id: "boutique",
    chip: "Boutique",
    name: "Zuri Threads",
    host: "zurithreads.co.ke",
    crumbs: "shop",
    title: "Zuri Threads | Handmade African Fashion Delivered in Kenya",
    desc: "Handmade dresses, kitenge and accessories by Kenyan makers. Pay with M-Pesa, free delivery within Nairobi on orders over KES 5,000.",
    ogTag: "Shop the collection",
  },
  {
    id: "clinic",
    chip: "Clinic",
    name: "Afya Bora Dental",
    host: "afyaboradental.co.ke",
    crumbs: "services",
    title: "Afya Bora Dental Clinic | Family Dentist in Nairobi West",
    desc: "Check-ups, braces and emergency dental care for the whole family. Book online in two minutes and get a WhatsApp reminder.",
    ogTag: "Book an appointment",
  },
  {
    id: "startup",
    chip: "Startup",
    name: "Ledgerly",
    host: "ledgerly.co.ke",
    crumbs: "product",
    title: "Ledgerly | Invoicing and M-Pesa Reconciliation for SMEs",
    desc: "Send invoices, collect with M-Pesa and reconcile automatically. Built for Kenyan small businesses, with KRA-ready exports.",
    ogTag: "Start free",
  },
];

/* ───────────────────────── E-commerce ───────────────────────── */

export const stkSteps = ["Browse", "Cart", "STK push", "Confirmed", "Receipt"];

export const zones = [
  { id: "inner", name: "Inner ring", eta: "Same day", detail: "Courier or rider, 2-hour slots chosen at checkout.", fee: "Flat fee, set by you" },
  { id: "metro", name: "Metro ring", eta: "Next day", detail: "Consolidated routes keep the cost per parcel low.", fee: "Tiered by distance" },
  { id: "upcountry", name: "Upcountry", eta: "2 to 3 days", detail: "Handed to your courier with tracking sent by SMS.", fee: "Weight-based" },
  { id: "pickup", name: "Pickup points", eta: "When ready", detail: "Customers collect from partner shops. You pay once, in bulk.", fee: "Per-parcel or free" },
];

export const pipelineStages = [
  { id: "paid", label: "Paid", log: "STK confirmed · KES 3,700 · stock reserved" },
  { id: "packed", label: "Packed", log: "Pick list printed · packed by Wanjiru" },
  { id: "dispatched", label: "Dispatched", log: "Rider assigned · tracking SMS sent" },
  { id: "delivered", label: "Delivered", log: "Proof of delivery captured · receipt emailed" },
];

/* ───────────────────────── Software ───────────────────────── */

export const codeSnippet = [
  "$ git checkout -b feat/mpesa-reconcile",
  "",
  "// reconcile.ts",
  "export async function reconcile(cb: StkCallback) {",
  '  const order = await db.order.byCheckoutId(cb.CheckoutRequestID);',
  '  if (!order) return audit("orphan_callback", cb);',
  "",
  "  await db.transaction(async (tx) => {",
  '    await tx.payment.create({ orderId: order.id, ref: cb.MpesaReceipt });',
  '    await tx.order.update(order.id, { status: "PAID" });',
  "  });",
  "",
  '  await queue.add("send-receipt", { orderId: order.id });',
  "}",
];

export const boardCards = [
  { id: "c1", title: "STK callback handler", tag: "API", pts: 5, col: 0 },
  { id: "c2", title: "Order status page", tag: "UI", pts: 3, col: 0 },
  { id: "c3", title: "Stock reservation job", tag: "Queue", pts: 5, col: 0 },
  { id: "c4", title: "Role-based access", tag: "Auth", pts: 3, col: 1 },
  { id: "c5", title: "Receipt SMS template", tag: "Notify", pts: 2, col: 1 },
  { id: "c6", title: "Admin refund flow", tag: "UI", pts: 5, col: 2 },
  { id: "c7", title: "Audit log", tag: "Infra", pts: 2, col: 3 },
  { id: "c8", title: "Checkout load test", tag: "QA", pts: 3, col: 3 },
];

export const archNodes = [
  { id: "client", label: "Web & mobile", x: 80, y: 200, text: "Responsive web app and installable PWA. Light payloads and offline tolerance where connectivity demands it." },
  { id: "api", label: "API", x: 280, y: 200, text: "One documented API (OpenAPI) that every client uses. Validation, rate limits and audit logging live here." },
  { id: "auth", label: "Auth & roles", x: 280, y: 62, text: "Role-based access, session security and an audit trail of who changed what, and when." },
  { id: "worker", label: "Queue & workers", x: 480, y: 200, text: "Anything slow or fallible runs here: callbacks, receipts, imports. Retries with back-off, never blocking the user." },
  { id: "db", label: "PostgreSQL", x: 480, y: 338, text: "The single source of truth. Transactional writes, encrypted at rest, backed up and restore-tested." },
  { id: "mpesa", label: "M-Pesa", x: 690, y: 80, text: "Daraja STK Push and callbacks, reconciled automatically against orders. Orphan callbacks are flagged, not lost." },
  { id: "sms", label: "SMS", x: 690, y: 200, text: "Receipts, OTPs and delivery updates through your SMS provider, templated and rate-limited." },
  { id: "email", label: "Email", x: 690, y: 320, text: "Invoices and notifications with delivery tracking, sent from your own domain." },
];

export const archEdges: [string, string][] = [
  ["client", "api"],
  ["api", "auth"],
  ["api", "worker"],
  ["api", "db"],
  ["worker", "db"],
  ["worker", "mpesa"],
  ["worker", "sms"],
  ["worker", "email"],
];

export const softwareArtifacts: Record<string, string> = {
  "Product discovery": "Clickable prototype + prioritised backlog",
  "Web & mobile apps": "Staging URL updated every sprint",
  "APIs & integrations": "OpenAPI spec + Postman collection",
  "Workflow automation": "Run log and failure alerts",
  "Quality & security": "CI pipeline + test report",
  "Maintenance & evolution": "Monthly health report + roadmap",
};

/* ───────────────────────── CRM / ERP ───────────────────────── */

export const funnelStages = [
  { label: "Leads", n: 128 },
  { label: "Qualified", n: 74 },
  { label: "Proposal", n: 31 },
  { label: "Won", n: 14 },
];

export const crmModules = [
  { id: "sales", name: "Sales", does: "Pipeline, quotes, follow-up reminders and a full history of every conversation with each customer.", replaces: "WhatsApp threads, notebooks and memory", feeds: "Quotes become invoices in Finance with one click." },
  { id: "inventory", name: "Inventory", does: "Stock by location, reorder points, purchase orders and batch or serial tracking where it matters.", replaces: "The stock spreadsheet that is always a week out of date", feeds: "Sales sees live availability; Finance sees stock value." },
  { id: "finance", name: "Finance", does: "Invoicing, payments, bills, receivables ageing and M-Pesa reconciliation, posted automatically.", replaces: "Re-typing sales into accounting software", feeds: "Reports reads revenue, margin and cash position directly." },
  { id: "ops", name: "People & Ops", does: "Tasks, approvals, leave, assets and service tickets, routed to whoever owns the next step.", replaces: "Approval by whoever you can catch in the corridor", feeds: "Approvals unlock purchases and payments in the other modules." },
  { id: "reports", name: "Reports", does: "Live dashboards for owners, managers and staff, scheduled to land in inboxes before Monday meetings.", replaces: "Month-end scramble to assemble numbers", feeds: "Every figure drills down to the record behind it." },
];

export const crmLedger: Record<string, { before: string; after: string }> = {
  "Process mapping": { before: "How work flows lives in people's heads", after: "Documented flows everyone agrees on" },
  "Implementation & configuration": { before: "Generic tool, bent to fit", after: "Pipelines, roles and approvals shaped to you" },
  "Data migration": { before: "Duplicates and five versions of one customer", after: "One clean, reconciled record per customer" },
  Integrations: { before: "Same data typed into three systems", after: "Entered once, flows everywhere" },
  "Dashboards & reporting": { before: "Numbers assembled by hand at month-end", after: "Live, drill-down views for every role" },
  "Training & adoption": { before: "A system nobody opens after week two", after: "A team that runs the business in it" },
};
