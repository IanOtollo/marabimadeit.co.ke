import { Mail, Phone } from "lucide-react";
import type { Founder } from "@/data/site";
import { cn } from "@/lib/utils";

function WhatsApp({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.82.83-3.02-.2-.31A8.2 8.2 0 1 1 12.04 20.1Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.69c-.14-.25 0-.38.1-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.65.31c-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.17 1.71 2.6 4.14 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.46-.6 1.66-1.17.2-.57.2-1.07.14-1.17-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

export function SocialRow({ person, className }: { person: Founder; className?: string }) {
  const c = person.contact;
  const items = [
    { label: `WhatsApp ${person.first}`, href: `https://wa.me/${c.whatsapp}`, icon: <WhatsApp />, ext: true, action: "whatsapp" },
    { label: `Email ${person.first}`, href: `mailto:${c.email}`, icon: <Mail size={18} />, ext: false, action: "email" },
    { label: `Call ${person.first} on ${c.phone}`, href: `tel:${c.phone.replace(/\s/g, "")}`, icon: <Phone size={18} />, ext: false, action: "call" },
  ];
  const hover = person.accent === "primary" ? "hover:border-primary hover:text-primary" : "hover:border-secondary hover:text-secondary";
  return (
    <ul className={cn("flex justify-center gap-2", className)}>
      {items.map((i) => (
        <li key={i.label}>
          <a
            href={i.href}
            data-marabi-action={i.action}
            aria-label={i.label}
            title={i.label}
            {...(i.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn("flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground backdrop-blur transition hover:-translate-y-0.5 active:scale-90", hover)}
          >
            {i.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
