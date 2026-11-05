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

## Project brief

The `/start` page posts to `/api/brief`, which emails the brief to the studio Gmail inbox (reply goes to the client). Set these in Vercel (Project, Settings, Environment Variables) and redeploy once; locally put them in `.env.local` (see `.env.example`):

| Variable | Value |
|---|---|
| `GMAIL_USER` | marabimadeit@gmail.com |
| `GMAIL_APP_PASSWORD` | A Google app password (needs 2-Step Verification on). Never commit it |
| `MAIL_TO` | Optional: where briefs are delivered, defaults to `GMAIL_USER` |

Until they are set, or if Gmail is down, the page hands the brief over by WhatsApp or email so nothing is lost.
