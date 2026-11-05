import Link from "next/link";
import { doors, site } from "@/data/site";
import { LocalClock } from "./LocalClock";
import { CookieSettingsButton } from "./CookieSettingsButton";

const studio = [
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/faq", label: "Questions" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/engagement", label: "Engagement & Payment" },
  { href: "/acceptable-use", label: "Acceptable Use" },
  { href: "/security", label: "Security & Disclosure" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/licenses", label: "Open-source credits" },
];

const h = "mb-4 text-sm uppercase tracking-widest text-muted-foreground";

export function Footer() {
  return (
    <footer className="border-t border-border/50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-5xl tracking-tighter sm:text-7xl">
          {site.tagline.replace(".", "")}
          <span className="text-primary">.</span>
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <h3 className={h}>Services</h3>
            <ul className="space-y-2">
              {doors.map((d) => (
                <li key={d.id}>
                  <Link href={`/services/${d.id}`} className="hover:text-primary">
                    {d.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary">
                  All services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={h}>Studio</h3>
            <ul className="space-y-2">
              {studio.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div data-marabi-info="legal">
            <h3 className={h}>Legal</h3>
            <ul className="space-y-2 text-sm">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
          <div>
            <h3 className={h}>Contact</h3>
            <p>{site.email}</p>
            <p className="mt-1 text-muted-foreground">{site.phone}</p>
            <p className="text-muted-foreground">{site.location}</p>
          </div>
          <div>
            <h3 className={h}>Status</h3>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary" /> Taking new projects
            </p>
            <LocalClock className="text-muted-foreground" />
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border/50 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}
