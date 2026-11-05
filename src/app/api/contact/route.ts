import { NextResponse } from "next/server";
import { emailOk, phoneDigits } from "@/data/brief";
import { site } from "@/data/site";
import { mailConfigured, sendMail, sendThanks } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const hits = new Map<string, number[]>();
const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};
const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max).trim() : "");

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (raw.hp) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many messages from this connection. Please try again in a few minutes." }, { status: 429 });

  const name = str(raw.name, 120);
  const email = str(raw.email, 160);
  const phone = str(raw.phone, 40);
  const message = str(raw.message, 5000);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!emailOk(email)) errors.email = "Enter a valid email address.";
  if (phoneDigits(phone).length < 9) errors.phone = "Enter a phone or WhatsApp number we can reach you on (at least 9 digits).";
  if (!message) errors.message = "Write us a few words about what you need.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 400 });

  if (!mailConfigured()) return NextResponse.json({ ok: false, fallback: true }, { status: 503 });

  try {
    await sendMail({
      subject: `Website message from ${name}`,
      kind: "New website message",
      rows: [
        ["Name", name],
        ["Email", email],
        ["Phone / WhatsApp", phone],
      ],
      sections: [{ heading: "Message", body: message }],
      replyTo: email,
      replyName: name,
      whatsapp: phone,
    });
  } catch (e) {
    console.error("[contact] mail error:", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false, fallback: true }, { status: 502 });
  }
  await sendThanks({ to: email, name, kind: "message", phone: site.phone, whatsapp: site.whatsapp }).catch((e) => console.error("[contact] thanks error:", e instanceof Error ? e.message : e));
  return NextResponse.json({ ok: true });
}
