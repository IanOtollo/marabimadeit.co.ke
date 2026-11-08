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
      "We build marketing sites, brand sites and portfolios in Next.js: fast, mobile-first, and structured for search. Strategy, design, build, SEO and launch are all in one process, and you can edit the content yourself afterwards.",
    follow: ["seo", "process"],
    door: "websites",
    link: { href: "/services/websites", label: "See Websites" },
  },
  {
    id: "ecommerce",
    title: "Online stores",
    keywords: ["shop", "store", "ecommerce", "e-commerce", "sell online", "products", "cart", "checkout", "orders", "inventory", "delivery"],
    short: "Stores built for how Kenya buys: M-Pesa, cards, delivery zones, stock that stays in sync.",
    answer:
      "Our stores take M-Pesa STK Push and cards, handle delivery zones and couriers, and give your team a clean admin for orders, stock and receipts. We connect it to your shop or POS if you have one, so one stock count serves every channel.",
    follow: ["mpesa", "timeline"],
    door: "ecommerce",
    link: { href: "/services/ecommerce", label: "See E-commerce" },
  },
  {
    id: "software",
    title: "Custom software",
    keywords: ["software", "app", "application", "platform", "portal", "dashboard", "api", "automation", "saas", "mobile app", "system", "build"],
    short: "Bespoke tools shaped around how your business really works, shipped in small increments.",
    answer:
      "We build web apps, internal portals, APIs and automations. We scope in phases so you commit one step at a time, ship in short sprints with a demo each time, and you own the code and documentation at the end.",
    follow: ["process", "ownership", "support"],
    door: "software",
    link: { href: "/services/software", label: "See Custom software" },
  },
  {
    id: "crm-erp",
    title: "CRM & ERP",
    keywords: ["crm", "erp", "zoho", "sales pipeline", "invoicing", "inventory system", "operations", "migration", "customers", "leads", "accounting"],
    short: "One system for customers, stock and money, with your team trained to actually use it.",
    answer:
      "We implement and extend CRM and ERP systems, often on Zoho, sometimes custom. We map your process first, migrate and clean your data, connect accounting, M-Pesa and messaging, and train people by role. Adoption is the real project.",
    follow: ["timeline", "support"],
    door: "crm-erp",
    link: { href: "/services/crm-erp", label: "See CRM & ERP" },
  },
  {
    id: "process",
    title: "How we work",
    keywords: ["process", "how do you work", "steps", "sdlc", "life cycle", "lifecycle", "stages", "methodology", "phases", "agile"],
    short: "Six stages in the order they happen: Discover, Define, Design, Develop, Deliver, Develop further.",
    answer:
      "Every project moves through six stages: Discover, Define, Design, Develop, Deliver and Develop further. At each one you know what we are doing, what you get, and what you need to decide. Nothing is built before you have signed off the design.",
    follow: ["timeline", "ownership"],
    link: { href: "/process", label: "See the full process" },
  },
  {
    id: "timeline",
    title: "How long it takes",
    keywords: ["how long", "timeline", "deadline", "weeks", "duration", "when", "urgent", "asap", "fast", "turnaround", "delivery time"],
    short: "Flexible. It depends on scope and our task load, and it can stretch. We agree it in writing.",
    answer:
      "There is no fixed number, and I would rather be honest than promise one. Timelines are flexible and depend on the scope of the work, how quickly content and feedback arrive, and what is already on our plate. They can stretch if the workload does. Your written proposal sets a realistic plan, and we tell you early if anything shifts.",
    follow: ["process", "start"],
  },
  {
    id: "mpesa",
    title: "M-Pesa & payments",
    keywords: ["mpesa", "m-pesa", "stk", "daraja", "mobile money", "pay", "paybill", "till", "card", "payments"],
    short: "M-Pesa STK Push, so customers approve with their PIN and orders confirm automatically.",
    answer:
      "We integrate Safaricom Daraja STK Push: the customer enters their number, approves on their phone, and the order confirms and reconciles automatically. Card payments run through a licensed gateway alongside it.",
    follow: ["ecommerce", "support"],
    door: "ecommerce",
  },
  {
    id: "seo",
    title: "SEO & performance",
    keywords: ["seo", "google", "ranking", "search", "found", "traffic", "speed", "performance", "lighthouse", "core web vitals"],
    short: "Technical SEO and speed are built in, not bolted on.",
    answer:
      "Every build includes technical SEO: semantic structure, structured data, sitemaps, previews, redirects and Core Web Vitals tuning. We target a Lighthouse score of 90 or more. Ongoing content and link-building can be added as a retainer.",
    follow: ["websites", "support"],
    door: "websites",
  },
  {
    id: "ownership",
    title: "Who owns it",
    keywords: ["own", "ownership", "copyright", "source code", "lock-in", "lock in", "hosting", "access", "credentials", "handover"],
    short: "You own it. Code, design and content are yours on final payment, with a recorded handover.",
    answer:
      "You do. Bespoke design, code and content are assigned to you on final payment, and we hand over source code, credentials, documentation and a recorded walkthrough. We list the open-source tools we used so nothing is hidden.",
    follow: ["support", "process"],
    link: { href: "/engagement", label: "Read the Engagement Terms" },
  },
  {
    id: "support",
    title: "Support & maintenance",
    keywords: ["support", "maintenance", "after launch", "bugs", "fix", "update", "monitor", "retainer", "warranty", "hosting"],
    short: "30 days of defect cover are included, then maintenance plans sized to what you need.",
    answer:
      "Thirty days of defect cover are included after launch. After that, a maintenance plan covers monitoring, security updates, backups and a rolling roadmap, with response targets agreed in writing.",
    follow: ["ownership", "start"],
  },
  {
    id: "team",
    title: "Who you will work with",
    keywords: ["who", "team", "founder", "aineah", "ian", "about", "staff", "developers", "people"],
    short: "Aineah Marabi, Founder and Lead Software Developer, and Ian Otollo, Co-Founder and Developer.",
    answer:
      "Aineah Marabi founded the studio and leads the software engineering. Ian Otollo is Co-Founder and Developer. The people you meet at the start are the people who build and support your work.",
    follow: ["process", "start", "location"],
    link: { href: "/about", label: "Meet the brothers" },
  },
  {
    id: "aineah",
    title: "Aineah Marabi",
    keywords: ["aineah", "marabi", "founder", "lead developer"],
    short: "Aineah Marabi, Founder and Lead Software Developer.",
    answer:
      "Aineah Marabi founded the studio and is its Lead Software Developer. He leads the engineering and architecture of every project, from the first technical decision to launch, and is the person most clients speak to first.",
    follow: ["ian", "process", "start"],
    link: { href: "/about", label: "Meet Aineah" },
  },
  {
    id: "ian",
    title: "Ian Otollo",
    keywords: ["ian", "otollo", "co-founder", "cofounder", "developer"],
    short: "Ian Otollo, Co-Founder and Developer.",
    answer:
      "Ian Otollo is the studio's Co-Founder and Developer. He builds alongside Aineah: front-end craft, integrations and the finishing details that make a build feel complete.",
    follow: ["aineah", "process", "start"],
    link: { href: "/about", label: "Meet Ian" },
  },
  {
    id: "location",
    title: "Where we are",
    keywords: ["where", "location", "nairobi", "office", "meet", "visit", "address", "remote", "call", "phone", "whatsapp", "email", "contact"],
    short: "Based in Nairobi. We work with clients across Kenya and beyond, by call, WhatsApp or in person.",
    answer:
      "We are based in Nairobi and work with clients across Kenya and beyond, by call, WhatsApp, email or in person. We'll get back to you.",
    follow: ["start", "timeline", "team"],
    link: { href: "/contact", label: "Contact us" },
  },
  {
    id: "work",
    title: "Our portfolio",
    keywords: ["portfolio", "past work", "case study", "case studies", "examples", "projects", "references", "clients", "worked with"],
    short: "Real projects across all four services, live where we can show them.",
    answer:
      "The Portfolio page shows real work: websites such as Ficus & Figs and Jewel in the Mines, stores such as Scents by Naire and Mutende Pharmacare, and private systems like point-of-sale and guest management, which we describe but never show to protect those businesses. Ask and we will connect you with a past client.",
    follow: ["start", "team"],
    link: { href: "/portfolio", label: "See our portfolio" },
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
    short: "I can package your project brief for the team in under a minute.",
    answer:
      "The easiest way is the project brief: it takes about three minutes and only five details are required. It reaches both founders directly. You get a quick personal reply and a written proposal after a first call.",
    follow: ["timeline", "process"],
  },
  {
    id: "overview",
    title: "About Marabi Made It",
    keywords: ["marabi made it", "what do you do", "what is this", "studio", "company", "services", "offer"],
    short: "A small modern studio that builds the digital side of your business.",
    answer:
      "We design and build websites, e-commerce stores, custom software and CRM/ERP systems, and we stay on after launch to support them. The four services share one process, so you get the same standard whichever you choose.",
    follow: ["websites", "ecommerce", "software", "crm-erp"],
    link: { href: "/services", label: "See our services" },
  },
  {
    id: "quote",
    title: "Quotes and cost",
    keywords: ["price", "pricing", "cost", "how much", "quote", "rates", "budget", "fee", "expensive", "cheap", "afford"],
    short: "We do not publish rates. Every project is quoted on its own, after a short call.",
    answer:
      "We do not publish a price list, because a five-page site and a full ERP are very different jobs and a single number would mislead you. Instead we have a short call, learn what you need, and send a written quote that fits your scope. Tell me a little about your project and I will package it for the team.",
    follow: ["start", "timeline", "process"],
  },
  {
    id: "partners",
    title: "Partners and clients",
    keywords: ["partner", "partners", "ika360", "ika", "who trusts you", "clients"],
    short: "The brands we have worked with, from clients we built for to technology we build on.",
    answer:
      "Every logo on the wall belongs to a brand we have worked with: clients we built for, and technology we build on, like Zoho. Want a reference for something similar to your project? Ask, and we will connect you with a past client.",
    follow: ["work", "start", "team"],
  },
  {
    id: "story",
    title: "Our story",
    keywords: ["story", "history", "how did you start", "founded", "beginning", "origin"],
    short: "Building things was always the career plan. It began as how two brothers spent their evenings.",
    answer:
      "Building things was always the career plan for us. It began as how we spent our evenings, one writing code and one asking whether anyone would use it, grew into small client projects, and became a studio with a repeatable process.",
    follow: ["team", "process", "start"],
    link: { href: "/about", label: "Read our story" },
  },
  {
    id: "legal",
    title: "Terms and privacy",
    keywords: ["terms", "legal", "policy", "policies", "privacy policy", "cookies", "contract", "agreement", "data protection", "gdpr", "dpa"],
    short: "Our legal pages are written to be read, not skimmed past.",
    answer:
      "There are seven: Terms of Service, Privacy Policy, Cookie Policy, Engagement and Payment Terms, Acceptable Use, Security and Disclosure, and an Accessibility Statement. If you only read one before working with us, make it Engagement and Payment.",
    follow: ["security", "ownership", "start"],
    link: { href: "/terms", label: "Open the Terms" },
  },
  {
    id: "formwrite",
    title: "What to write",
    keywords: ["what should i write", "what do i write", "description", "describe", "example", "how to fill", "fill in", "what to put"],
    short: "One or two plain sentences about what you want to achieve is enough.",
    answer:
      "Write it the way you would explain it to a friend: who it is for, what it should do, and what is wrong with how things work now. You do not need technical words. For example: \"I sell handmade bags on Instagram and want a store where customers pay with M-Pesa.\" The more concrete the goal, the more useful our first call will be.",
    follow: ["formservice", "formnext", "formdata"],
  },
  {
    id: "formservice",
    title: "Choosing a service",
    keywords: ["which service", "what service", "which one", "not sure", "unsure", "which do i need", "what do i need", "choose"],
    short: "Pick the closest one. If you are unsure, choose Not sure yet.",
    answer:
      "Need people to find and trust you online: Websites. Selling products and taking payments: E-commerce. A process that off-the-shelf tools cannot handle: Custom software. Customers, stock and invoices scattered across tools: CRM and ERP. If it is a mix, or you are not sure, choose Not sure yet and describe the goal. We will suggest the right approach on the first call.",
    follow: ["formwrite", "formnext", "websites"],
  },
  {
    id: "formrequired",
    title: "Required details",
    keywords: ["required", "why phone", "why do you need", "phone number", "mandatory", "why my number"],
    short: "Five details are required. The rest is optional.",
    answer:
      "Name, phone or WhatsApp, email, the service, and a sentence about the project. The phone number is required because most replies start with a quick call or WhatsApp message, which is far faster than back-and-forth emails. Everything else is optional and only helps us prepare.",
    follow: ["formdata", "formnext", "formwrite"],
  },
  {
    id: "formscope",
    title: "Scope and timing",
    keywords: ["scope", "budget range", "timing", "when to start", "why budget", "why timing", "optional"],
    short: "Optional, and only to help us prepare for the first call.",
    answer:
      "The scope chips show what projects like yours usually involve, so tick what sounds right and skip the rest. Timing is flexible and agreed with you. The budget range is optional and never shown publicly: it only helps us suggest the right shape for your project.",
    follow: ["formnext", "formdata", "formwrite"],
  },
  {
    id: "formnext",
    title: "After you send",
    keywords: ["after i send", "what happens next", "after sending", "reply", "response time", "how soon will you reply"],
    short: "We'll get back to you, then a first call and a written proposal.",
    answer:
      "You get a reference number straight away. We'll get back to you by phone, WhatsApp or email, then arrange a first call. After that you receive a written proposal with scope, plan and quote, with no obligation to proceed.",
    follow: ["formdata", "timeline", "process"],
  },
  {
    id: "formdata",
    title: "Your data",
    keywords: ["is my data safe", "my data", "privacy", "who sees this", "is it safe", "stored", "confidential"],
    short: "Seen only by the founders, never sold.",
    answer:
      "Your brief goes only to the two founders, by WhatsApp or email, and is used only to reply to you and prepare a proposal. It is never sold or shared for marketing. While you type, a draft is saved on your own device only, and is deleted when you send. You can ask us to delete your details at any time. The Privacy Policy has the full detail.",
    follow: ["formnext", "security", "formrequired"],
    link: { href: "/privacy", label: "Read the Privacy Policy" },
  },
];

export const byId = (id: string) => topics.find((t) => t.id === id);

/** Mid-depth detail for the double-tap and "?" explanations: what it covers, what you get, what to know. */
export const details: Record<string, string[]> = {
  overview: ["Two brothers lead every project, from the first call to launch and beyond.", "Websites, online stores, custom software and CRM/ERP all come from the same hands.", "Based in Nairobi, working across Kenya and further afield."],
  websites: ["Covers strategy, design, build, SEO and launch in one process.", "You get a fast, mobile-first site, content you can edit, and a recorded handover.", "Timing is flexible and agreed in your proposal."],
  ecommerce: ["Covers the storefront, checkout, delivery rules and an admin for orders and stock.", "You get a store your team can run, with one stock count across channels.", "Payment fees are charged by the providers, not by us."],
  software: ["Covers web apps, portals, APIs and automations, scoped in phases.", "You commit one step at a time and see working demos as we go.", "You own the code and documentation at the end."],
  "crm-erp": ["Covers process mapping, set-up (often Zoho), data migration, integrations and training.", "You get customers, stock and invoicing in one system your team will actually use.", "Adoption is the real project, so training and support are part of the plan."],
  process: ["Each stage ends with something you can see and a decision that is yours.", "Nothing is built before you have signed off the design.", "The process page walks through every stage in order."],
  timeline: ["We will not promise a number of weeks we cannot keep.", "Content and feedback arriving quickly is what speeds a project up most.", "If anything shifts, you hear it from us early."],
  mpesa: ["Built on Safaricom's Daraja API and tested with real transactions before launch.", "Every payment reconciles to its order automatically, with receipts your accountant can use.", "Card payments run alongside through a licensed gateway."],
  seo: ["Semantic structure, structured data, sitemaps and Core Web Vitals are built in.", "We aim for a Lighthouse score of 90 or more.", "Ongoing content and link-building are a separate retainer."],
  ownership: ["Hosting, domains and accounts are set up in your name.", "Credentials, documentation and a recorded walkthrough are handed over.", "We list the open-source tools we used, so nothing is hidden."],
  support: ["Maintenance plans add monitoring, security updates and backups.", "Response targets are agreed in writing, not promised vaguely.", "You can take everything in-house; the handover makes that possible."],
  aineah: ["Founded the studio and leads engineering and architecture.", "Your first technical conversation is usually with him.", "His ability card and story are on the about page."],
  ian: ["Co-founder who builds alongside Aineah.", "Front-end craft, integrations and the details that make a build feel finished.", "His ability card and story are on the about page."],
  team: ["You work directly with them, not with an account manager.", "Aineah leads the engineering and architecture; Ian builds alongside him.", "The about page has their introductions and ability cards."],
  location: ["Reach us on WhatsApp, by call or by email.", "We'll get back to you.", "A first call carries no obligation."],
  work: ["Public sites open live; private systems such as point-of-sale are described in words only, to protect the business.", "Filter by service to see just websites, stores, software or CRM and ERP.", "Ask us for references on anything similar to yours."],
  security: ["MFA on admin accounts, backups and regular patching.", "An NDA is signed before you share anything sensitive.", "Our Security page explains how to report a vulnerability to us."],
  start: ["A short page of four sections: about you, the project, scope and timing, and notes.", "Five details are required; everything else is optional.", "We'll get back to you, then arrange a first call."],
  quote: ["A short call to understand your scope.", "A written quote that fits what you actually need.", "Third-party costs such as domains and SMS are listed separately."],
  partners: ["Jewel in the Mines, Ethereal Dayo, Mutende Pharmacare, Ficus & Figs, Dualpix Communications, Epimax Kenya, IKA360 and Zoho.", "Their work spans publishing, retail, hospitality, healthcare, communications and software.", "A brand joins the wall only after we have worked together."],
  story: ["From evening projects to small client work to a studio with a process.", "The about page walks through it in five moments.", "Our name is our signature: Marabi made it."],
  formwrite: ["One or two plain sentences are enough.", "Say who it is for and what it should do, not how to build it.", "A concrete example appears under the box and changes with the service you pick."],
  formservice: ["Pick the closest one: you can change it any time before sending.", "Not sure yet is a perfectly good answer.", "We will confirm the right approach on the first call."],
  formrequired: ["Five details are required: name, phone, email, service, and a sentence about the project.", "The phone number lets us reply with a call or WhatsApp, which is faster than email.", "Everything else is optional."],
  formscope: ["Tick what sounds right and skip the rest.", "Timing is flexible and agreed with you.", "The budget range is optional and never shown publicly."],
  formnext: ["You receive a reference number straight away.", "We'll get back to you, then arrange a first call.", "A written proposal follows, with no obligation."],
  formdata: ["Seen only by the founders.", "Used only to reply and prepare a proposal, never sold.", "Your draft stays on your own device until you send it."],
  legal: ["Each document opens with an at-a-glance summary.", "Written against Kenyan law and meant to be read.", "Payment terms sit under Engagement and Payment."],
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s']/g, " ").replace(/\s+/g, " ").trim();

/** Greetings, thanks, "who are you": answered like a person, not a database. */
export function smallTalk(input: string, name?: string): { text: string; chips?: string[] } | null {
  const t = norm(input).replace(/'/g, " ").replace(/\s+/g, " ");
  const who = name ? `, ${name}` : "";
  if (/^(hi|hello|hey|habari|sasa|mambo|niaje|hola|good (morning|afternoon|evening))\b/.test(t))
    return { text: `Habari${who}! What can I help you with: a service, how we work, or starting a project?`, chips: ["What can you build?", "How do you work?", "Start a project"] };
  if (/\b(thanks|thank you|asante|cheers|appreciate)\b/.test(t)) return { text: `Karibu${who}. Anything else you would like to know?`, chips: ["Start a project", "How do you work?"] };
  if (/^(bye|goodbye|see you|kwaheri|later)\b/.test(t)) return { text: `Kwaheri${who}. I will be here when you need me.` };
  if (/(who|what) are you|are you (a )?(bot|ai|human|real|robot|person)|your name/.test(t))
    return { text: "I am Marabi 2.0, the studio's built-in assistant. I am not a person and not a general AI: I answer from the studio's own notes, and anything I cannot answer I hand to Aineah and Ian, who reply personally and fast.", chips: ["Send it to the team", "What can you build?"] };
  if (/(speak|talk) to (a |the )?(human|person|someone|team|founder)|call (me|you)|phone number|whatsapp/.test(t))
    return { text: "Of course. The quickest way is to start a brief and send it by WhatsApp, or call and message from the icons on the home page. We reply fast.", chips: ["Start a project"] };
  if (/\b(how are you|how are things|how s it going|how is it going|how do you do|u good|you good|whats up|what s up|wassup)\b/.test(t))
    return { text: `I am doing well${who}, thank you for asking. It is a good day when someone drops by. How can I help?`, chips: ["What can you build?", "Start a project"] };
  if (/\b(good|great|fine|well|okay|ok|not bad|nice)\b/.test(t) && t.split(" ").length <= 4 && /^(i m|im|i am|am|doing|all|pretty|very|quite)\b/.test(t))
    return { text: "Glad to hear it. Is there something about the studio or a project I can help with?", chips: ["What can you build?", "How do you work?"] };
  if (/\b(tired|sad|stressed|bad day|not good|not well|overwhelmed)\b/.test(t) && t.split(" ").length <= 8)
    return { text: `Sorry to hear that${who}. I hope it gets lighter soon. If a project is part of the stress, tell me about it and we will help make it simpler.`, chips: ["Start a project"] };
  if (/\b(good (night)|goodnight|sleep well|have a (good|nice|great))\b/.test(t)) return { text: `You too${who}. Come back any time.` };
  if (/\b(sorry|my bad|apologies)\b/.test(t) && t.split(" ").length <= 5) return { text: "No problem at all. Carry on, I am listening." };
  if (/^(ok|okay|cool|nice|great|awesome|sawa|poa|alright|got it|i see|makes sense|fine)\b/.test(t) && t.split(" ").length <= 3)
    return { text: "Sawa. Anything else I can help with?", chips: ["Start a project", "How do you work?"] };
  if (/^(yes|yeah|yep|yup|ndiyo|sure)\b/.test(t) && t.split(" ").length <= 2) return { text: "Great. What would you like to look at: our services, how we work, or starting a project?", chips: ["What can you build?", "How do you work?", "Start a project"] };
  if (/^(no|nope|nah|hapana)\b/.test(t) && t.split(" ").length <= 2) return { text: "That is fine. I am here if you change your mind.", chips: ["What can you build?"] };
  if (/\b(you re (cool|nice|great|smart|funny|awesome|amazing|helpful)|love you|well done|good bot|nice bot|good job)\b/.test(t))
    return { text: "That is kind of you, thank you. I will tell the team their assistant is doing something right.", chips: ["Start a project"] };
  if (/\b(stupid|useless|dumb|bad bot|hate you|rubbish)\b/.test(t)) return { text: "Fair enough, I am limited to what the studio has taught me. Tell me what you were after and I will either answer or pass it to Aineah and Ian.", chips: ["Send it to the team"] };
  if (/\b(joke|funny|make me laugh)\b/.test(t))
    return { text: "A developer's partner says: go to the shop, buy a loaf of bread, and if they have eggs, buy six. He came back with six loaves. They had eggs.", chips: ["Another one", "What can you build?"] };
  if (/\b(another one|one more)\b/.test(t)) return { text: "Why did the website go to therapy? Too many unresolved issues, and a very slow response time. We fix both.", chips: ["Start a project"] };
  if (/\b(what time|what s the time|what day|what date|today s date)\b/.test(t))
    return { text: `It is ${new Date().toLocaleString("en-KE", { weekday: "long", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Nairobi" })} in Nairobi.` };
  if (/\b(weather|football|politics|news|bitcoin|stock)\b/.test(t))
    return { text: "That is outside my patch, I only know the studio. I can tell you about our services, our process or how to start a project.", chips: ["What can you build?", "Start a project"] };
  if (/\b(where are you|where do you live|where are you based|location|nairobi)\b/.test(t) && t.split(" ").length <= 6)
    return { text: "We are a modern studio based in Nairobi and work with clients across Kenya and beyond, mostly remotely. Calls and WhatsApp work well.", chips: ["Start a project"] };
  if (/\b(what can you do|help me|can you help|what do you know)\b/.test(t))
    return { text: "I can explain our services, how we work and the partners we have built with, help you shape a project brief, or pass a message to the founders.", chips: ["What can you build?", "How do you work?", "Start a project"] };
  if (/\b(do you (sleep|eat|dream)|are you (alive|happy|sad|tired))\b/.test(t))
    return { text: "I nap in the logo after five quiet minutes, which is as close as a studio assistant gets. Mostly I stay curious." };
  return null;
}

/** Follow-ups like "how long would that take?" resolved against the topic we were just discussing. */
export function followUp(input: string, last: Topic | null): { text: string; link?: Topic["link"] } | null {
  if (!last) return null;
  const t = norm(input);
  const short = t.split(" ").length <= 7;
  if (/how long|when|timeline|how soon|deadline/.test(t) && short)
    return { text: `For ${last.title.toLowerCase()}: there is no fixed number. It depends on scope, how quickly content and feedback arrive, and our task load, and it can stretch if the workload does. We agree a realistic plan in your proposal and tell you early if anything shifts.` };
  if (/(how much|cost|price|quote|rates|expensive)/.test(t) && short)
    return { text: `We quote ${last.title.toLowerCase()} individually after a short call, so the number fits your scope. I can package your brief for the team in a few taps.` };
  if (/\b(more|detail|details|explain|elaborate|tell me more|go deeper|what else)\b/.test(t) && short) {
    const d = details[last.id];
    if (d) return { text: d.map((x, i) => `${i + 1}. ${x}`).join("\n"), link: last.link };
  }
  return null;
}

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
  new: "Habari! I'm Marabi 2.0, the studio's assistant. Ask me anything, or let me package your project brief in about a minute. Tip: double-tap any section on the page and I will explain it.",
  back: (name: string) => `Karibu back, ${name}. Want to pick up your project brief, or ask me something?`,
};
