import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { engagement as doc } from "@/data/legal";

export const metadata: Metadata = { title: doc.title, description: doc.summary };

export default function Page() {
  return <LegalPage doc={doc} />;
}
