# Marabi Made It

Studio site for Marabi Made It, Nairobi. Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, three.js, Lenis.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Deploy

Import the repository into Vercel. No environment variables or configuration are required; the framework is detected automatically.

## Where things live

- `src/data/site.ts` – names, roles, contact details, services, copy used in several places
- `src/data/projects.ts` – past projects (empty by design; add entries and they appear on `/work` and each service page)
- `src/data/legal.ts` – the seven legal documents
- `public/partners` – drop partner SVG logos here and set `logo` on the partner in `site.ts`
