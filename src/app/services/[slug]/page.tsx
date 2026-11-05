import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { doors, services } from "@/data/site";
import { WorldFrame } from "@/components/worlds/WorldFrame";
import { WebsitesWorld } from "@/components/worlds/WebsitesWorld";
import { EcommerceWorld } from "@/components/worlds/EcommerceWorld";
import { SoftwareWorld } from "@/components/worlds/SoftwareWorld";
import { CrmErpWorld } from "@/components/worlds/CrmErpWorld";

const worlds: Record<string, () => JSX.Element> = {
  websites: WebsitesWorld,
  ecommerce: EcommerceWorld,
  software: SoftwareWorld,
  "crm-erp": CrmErpWorld,
};

export function generateStaticParams() {
  return doors.map((d) => ({ slug: d.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = doors.find((x) => x.id === params.slug);
  const s = services[params.slug];
  if (!d || !s) return {};
  return { title: d.title, description: s.intro.slice(0, 155), alternates: { canonical: `/services/${d.id}` } };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const door = doors.find((x) => x.id === params.slug);
  const service = services[params.slug];
  const World = worlds[params.slug];
  if (!door || !service || !World) notFound();
  return (
    <WorldFrame door={door} service={service}>
      <World />
    </WorldFrame>
  );
}
