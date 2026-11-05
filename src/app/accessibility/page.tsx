import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { accessibility as doc } from "@/data/legal";

export const metadata: Metadata = { title: doc.title, description: doc.summary, alternates: { canonical: `/${doc.slug}` } };

export default function Page() {
  return <LegalPage doc={doc} />;
}
