import nodemailer from "nodemailer";

/**
 * Sends a project brief to the studio inbox through Gmail.
 * Needs GMAIL_USER and GMAIL_APP_PASSWORD (a Google "app password", not the account password).
 */
export const mailConfigured = () => !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

export async function sendBrief(opts: { subject: string; text: string; replyTo: string; replyName: string }) {
  const user = process.env.GMAIL_USER!;
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass: process.env.GMAIL_APP_PASSWORD!.replace(/\s/g, "") },
  });
  await transport.sendMail({
    from: `"Marabi Made It website" <${user}>`,
    to: process.env.MAIL_TO || user,
    replyTo: `"${opts.replyName.replace(/["\r\n]/g, "")}" <${opts.replyTo}>`, // pressing Reply answers the client
    subject: opts.subject,
    text: opts.text,
  });
}
