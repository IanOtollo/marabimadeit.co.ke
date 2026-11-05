import type { Metadata, Viewport } from "next";
import { Fraunces, Jost } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";
import { site } from "@/data/site";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Jost({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: { default: `${site.name} | Websites, E-commerce, Software, CRM & ERP`, template: `%s | ${site.name}` },
  description:
    "Marabi Made It is a Nairobi studio building websites, e-commerce stores, custom software and CRM/ERP systems.",
  openGraph: { title: site.name, description: "Websites, e-commerce, software and CRM/ERP from Nairobi.", type: "website", locale: "en_KE" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0b0d10" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
