export type Stage = {
  id: string;
  n: string;
  name: string;
  window: string; // when it happens, relative to kickoff
  weeks: [number, number]; // relative position on the shared axis. Not calendar weeks: real timing is flexible and agreed per project.
  tagline: string;
  what: string;
  deliver: string[];
  decide: string;
};

/** Our software and web development life cycle, in the order it actually happens. */
export const stages: Stage[] = [
  {
    id: "discover",
    n: "01",
    name: "Discover",
    window: "At the start",
    weeks: [0, 1],
    tagline: "We listen before we draw anything.",
    what: "Interviews with you and your users, a look at competitors and the numbers behind your business, and keyword research for what customers actually search. We write down what success means in a sentence you can check later.",
    deliver: ["Goals and success measures", "User and market notes", "Keyword and content map", "Risks and unknowns list"],
    decide: "You confirm the problem we are solving.",
  },
  {
    id: "define",
    n: "02",
    name: "Define",
    window: "Before design begins",
    weeks: [1, 2],
    tagline: "Scope and plan, agreed in writing.",
    what: "Sitemap or system map, feature list split into must-have and later, technical approach, a flexible plan and a written quote. Anything that is out of scope is named, so nobody is surprised halfway through.",
    deliver: ["Written scope and sitemap", "Technical approach", "Plan with milestones", "Written quote and payment schedule"],
    decide: "You approve scope and the quote before work begins.",
  },
  {
    id: "design",
    n: "03",
    name: "Design",
    window: "Before any code",
    weeks: [2, 4],
    tagline: "Wireframes first, then the real thing.",
    what: "Low-fidelity wireframes to settle structure and flow, then high-fidelity UI/UX with a design system: type, colour, spacing and components, checked at phone width first. Two review rounds are built in.",
    deliver: ["Wireframes and user flows", "High-fidelity UI/UX", "Design system and components", "Interactive prototype"],
    decide: "You sign off the design before any code is written.",
  },
  {
    id: "develop",
    n: "04",
    name: "Develop",
    window: "The main stretch",
    weeks: [4, 8],
    tagline: "Built in short loops you can open any day.",
    what: "Engineering in short iterations on a private staging URL. Accessibility, performance and SEO are built in as we go. Integrations such as M-Pesa, SMS, email and accounting are wired up and tested with real transactions.",
    deliver: ["Working staging site or app", "Integrations tested end to end", "Automated tests on critical paths", "Regular demos"],
    decide: "You review each demo and steer the next iteration.",
  },
  {
    id: "deliver",
    n: "05",
    name: "Deliver",
    window: "Approaching launch",
    weeks: [8, 10],
    tagline: "Tested, tuned, launched, handed over.",
    what: "Cross-device testing, a performance and accessibility audit, a security pass, content load and a planned go-live with DNS, SSL, email and backups ready. You get a recorded walkthrough and documentation.",
    deliver: ["Launch checklist signed off", "Performance and SEO audit", "Recorded handover and docs", "Credentials and source code"],
    decide: "You approve go-live. Final payment, then everything is yours.",
  },
  {
    id: "evolve",
    n: "06",
    name: "Develop further",
    window: "After launch",
    weeks: [10, 12],
    tagline: "Launch is the start of the data, not the end of the work.",
    what: "Thirty days of defect cover are included. After that: monitoring, security updates, analytics reviews and a rolling roadmap, on a maintenance plan sized to what you need.",
    deliver: ["30-day defect cover", "Monitoring and updates", "Monthly analytics review", "Prioritised roadmap"],
    decide: "You choose how much ongoing support you want.",
  },
];

export const AXIS_WEEKS = 12;
