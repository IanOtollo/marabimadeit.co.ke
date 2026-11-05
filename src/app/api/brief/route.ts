import { NextResponse } from "next/server";
import { serviceLabel, validate, type BriefData } from "@/data/brief";
import { mailConfigured, sendMail, sendThanks } from "@/lib/mail";
import { site } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// A small in-memory limiter: 5 briefs per visitor per 10 minutes.
const hits = new Map<string, number[]>();
const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // a hidden field only bots fill in: pretend it worked
  if (raw.hp) return NextResponse.json({ ok: true, ref: "MM-000000-0000" });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many briefs from this connection. Please try again in a few minutes." }, { status: 429 });

  const d: BriefData = {
    name: str(raw.name, 120),
    phone: str(raw.phone, 40),
    email: str(raw.email, 160),
    org: str(raw.org, 160),
    service: str(raw.service, 20) as BriefData["service"],
    description: str(raw.description, 5000),
    site: str(raw.site, 300),
    scope: Array.isArray(raw.scope) ? raw.scope.filter((x): x is string => typeof x === "string").slice(0, 20).map((x) => x.slice(0, 80)) : [],
    timing: str(raw.timing, 80),
    budget: str(raw.budget, 80),
    notes: str(raw.notes, 3000),
  };

  const errors = validate(d);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 400 });

  // Not set up yet: tell the browser to hand the brief over by WhatsApp or email instead.
  if (!mailConfigured()) return NextResponse.json({ ok: false, fallback: true }, { status: 503 });

  const d6 = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const ref = `MM-${d6}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  try {
    await sendMail({
      subject: `New project brief ${ref}: ${serviceLabel(d.service)} (${d.name})`,
      kind: "New project brief",
      ref,
      rows: [
        ["Name", d.name],
        ["Phone / WhatsApp", d.phone],
        ["Email", d.email],
        ["Organisation", d.org],
        ["Service", serviceLabel(d.service)],
        ["Existing site", d.site],
        ["Needs", d.scope.join(", ")],
        ["Timing", d.timing],
        ["Budget", d.budget],
      ],
      sections: [
        { heading: "What they want to achieve", body: d.description },
        { heading: "Notes", body: d.notes },
      ],
      replyTo: d.email.trim(),
      replyName: d.name.trim(),
      whatsapp: d.phone,
    });
  } catch (e) {
    console.error("[brief] mail error:", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false, fallback: true }, { status: 502 });
  }
  // the thank-you to the client: a failure here must never fail their brief
  await sendThanks({ to: d.email.trim(), name: d.name, kind: "brief", ref, phone: site.phone, whatsapp: site.whatsapp }).catch((e) => console.error("[brief] thanks error:", e instanceof Error ? e.message : e));
  return NextResponse.json({ ok: true, ref });
}
