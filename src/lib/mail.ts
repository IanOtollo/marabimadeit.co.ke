import nodemailer from "nodemailer";

/**
 * Sends enquiries to the studio inbox through Gmail.
 * Needs GMAIL_USER and GMAIL_APP_PASSWORD (a Google "app password", not the account password).
 */
export const mailConfigured = () => !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

export type MailRow = [label: string, value: string];
export type MailSection = { heading: string; body: string };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const nl2br = (s: string) => esc(s).replace(/\r?\n/g, "<br>");

type Opts = {
  subject: string;
  kind: string; // e.g. "New project brief"
  ref?: string;
  rows: MailRow[];
  sections: MailSection[];
  replyTo: string;
  replyName: string;
  whatsapp?: string; // the client's number, for a one-tap WhatsApp button
};

function render(o: Opts) {
  const rows = o.rows.filter(([, v]) => v && v.trim());
  const sections = o.sections.filter((s) => s.body && s.body.trim());
  const wa = o.whatsapp ? o.whatsapp.replace(/\D/g, "").replace(/^0/, "254") : "";

  const text = [
    `${o.kind.toUpperCase()}${o.ref ? `  |  Ref ${o.ref}` : ""}`,
    "",
    ...rows.map(([l, v]) => `${l}: ${v}`),
    ...sections.flatMap((s) => ["", s.heading.toUpperCase(), s.body]),
    "",
    `Reply to this email to answer ${o.replyName} directly.`,
    "Sent from marabimadeit.co.ke",
  ].join("\n");

  const rowHtml = rows
    .map(
      ([l, v]) =>
        `<tr><td style="padding:10px 16px 10px 0;width:34%;vertical-align:top;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#7a7f87;border-top:1px solid #eceef1">${esc(l)}</td><td style="padding:10px 0;vertical-align:top;font-size:15px;color:#14171c;border-top:1px solid #eceef1">${nl2br(v)}</td></tr>`,
    )
    .join("");
  const sectionHtml = sections
    .map(
      (s) =>
        `<p style="margin:28px 0 8px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#7a7f87">${esc(s.heading)}</p><div style="padding:16px 18px;background:#f6f7f9;border-left:3px solid #ffc233;border-radius:6px;font-size:15px;line-height:1.6;color:#14171c">${nl2br(s.body)}</div>`,
    )
    .join("");
  const btn = (href: string, label: string, primary: boolean) =>
    `<a href="${esc(href)}" style="display:inline-block;margin:0 10px 10px 0;padding:12px 22px;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;${primary ? "background:#14171c;color:#ffc233" : "background:#ffffff;color:#14171c;border:1px solid #cfd3d9"}">${esc(label)}</a>`;

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#eef0f3">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(o.kind)} from ${esc(o.replyName)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef0f3;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;font-family:Segoe UI,Helvetica,Arial,sans-serif">
<tr><td style="background:#0d0f12;padding:22px 28px">
<span style="display:inline-block;width:34px;height:34px;line-height:34px;text-align:center;border-radius:9px;background:#161a1f;color:#ffc233;font-weight:700;font-size:18px;vertical-align:middle">M</span>
<span style="vertical-align:middle;margin-left:10px;font-size:17px;font-weight:600;color:#ffffff">Marabi Made It</span>
</td></tr>
<tr><td style="padding:30px 28px 8px">
<p style="margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#7a7f87">${esc(o.kind)}</p>
<h1 style="margin:6px 0 0;font-size:26px;line-height:1.25;color:#14171c;font-weight:600">${esc(o.replyName)}</h1>
${o.ref ? `<p style="margin:8px 0 0;font-size:13px;color:#7a7f87">Reference <strong style="color:#14171c">${esc(o.ref)}</strong></p>` : ""}
</td></tr>
<tr><td style="padding:18px 28px 6px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowHtml}</table>${sectionHtml}</td></tr>
<tr><td style="padding:26px 28px 30px">
${btn(`mailto:${o.replyTo}?subject=${encodeURIComponent(`Re: ${o.subject}`)}`, "Reply by email", true)}${wa ? btn(`https://wa.me/${wa}`, "Open WhatsApp", false) : ""}
</td></tr>
<tr><td style="padding:16px 28px;background:#f6f7f9;font-size:12px;color:#7a7f87">Sent from the marabimadeit.co.ke website. You can also just reply to this email to answer ${esc(o.replyName)} directly.</td></tr>
</table></td></tr></table></body></html>`;

  return { text, html };
}

export async function sendMail(o: Opts) {
  const user = process.env.GMAIL_USER!;
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass: process.env.GMAIL_APP_PASSWORD!.replace(/\s/g, "") },
  });
  const { text, html } = render(o);
  await transport.sendMail({
    from: `"Marabi Made It website" <${user}>`,
    to: process.env.MAIL_TO || user,
    replyTo: `"${o.replyName.replace(/["\r\n]/g, "")}" <${o.replyTo}>`, // pressing Reply answers the client
    subject: o.subject,
    text,
    html,
  });
}

/** A short thank-you sent back to the person who wrote to us. Failing to send it never fails their enquiry. */
export async function sendThanks(o: { to: string; name: string; kind: "brief" | "message"; ref?: string; phone: string; whatsapp: string }) {
  const user = process.env.GMAIL_USER!;
  const transport = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass: process.env.GMAIL_APP_PASSWORD!.replace(/\s/g, "") } });
  const first = o.name.trim().split(" ")[0];
  const what = o.kind === "brief" ? "project brief" : "message";
  const subject = o.kind === "brief" ? `Thank you for your project brief${o.ref ? ` (${o.ref})` : ""}` : "Thank you for your message";
  const text = [
    `Hello ${first},`,
    "",
    `Thank you for your ${what}. We have received it and we'll get back to you.`,
    o.ref ? `Your reference is ${o.ref}. Quote it if you contact us about this project.` : "",
    "",
    `In the meantime you can reach us on WhatsApp or by phone: ${o.phone}.`,
    "",
    "Marabi Made It",
    "Nairobi, Kenya | marabimadeit.co.ke",
  ]
    .filter((l, i, a) => l !== "" || a[i - 1] !== "")
    .join("\n");
  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#eef0f3">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef0f3;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;font-family:Segoe UI,Helvetica,Arial,sans-serif">
<tr><td style="background:#0d0f12;padding:22px 28px"><span style="display:inline-block;width:34px;height:34px;line-height:34px;text-align:center;border-radius:9px;background:#161a1f;color:#ffc233;font-weight:700;font-size:18px;vertical-align:middle">M</span><span style="vertical-align:middle;margin-left:10px;font-size:17px;font-weight:600;color:#ffffff">Marabi Made It</span></td></tr>
<tr><td style="padding:32px 28px 8px">
<h1 style="margin:0;font-size:26px;line-height:1.25;color:#14171c;font-weight:600">Thank you, ${esc(first)}.</h1>
<p style="margin:16px 0 0;font-size:16px;line-height:1.6;color:#2b2f36">We have received your ${what}, and we'll get back to you.</p>
${o.ref ? `<p style="margin:20px 0 0;padding:14px 16px;background:#f6f7f9;border-left:3px solid #ffc233;border-radius:6px;font-size:14px;color:#2b2f36">Your reference: <strong style="color:#14171c">${esc(o.ref)}</strong><br><span style="color:#7a7f87">Quote it if you contact us about this project.</span></p>` : ""}
<p style="margin:20px 0 0;font-size:15px;line-height:1.6;color:#2b2f36">If something is urgent, message us on WhatsApp or give us a call.</p>
</td></tr>
<tr><td style="padding:22px 28px 30px"><a href="https://wa.me/${esc(o.whatsapp)}" style="display:inline-block;padding:12px 22px;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;background:#14171c;color:#ffc233">Message us on WhatsApp</a></td></tr>
<tr><td style="padding:16px 28px;background:#f6f7f9;font-size:12px;line-height:1.6;color:#7a7f87">Marabi Made It, Nairobi, Kenya<br>${esc(o.phone)} | marabimadeit.co.ke</td></tr>
</table></td></tr></table></body></html>`;
  await transport.sendMail({ from: `"Marabi Made It" <${user}>`, to: o.to, replyTo: user, subject, text, html });
}
