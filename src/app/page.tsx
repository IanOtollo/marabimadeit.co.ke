import { doors, site } from "@/data/site";
import { Hero } from "@/components/sections/Hero";
import { CharacterIntro } from "@/components/sections/CharacterIntro";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Process } from "@/components/sections/Process";
import { Partners } from "@/components/sections/Partners";
import { ClosingCta } from "@/components/sections/ClosingCta";

/** Home is a short, calm journey: meet us, see what we do, see how we work, who trusts us, begin. The deeper material lives on its own pages. */
export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: `https://${site.domain}`,
    email: site.email,
    slogan: site.tagline.replace(".", ""),
    areaServed: "KE",
    address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
    makesOffer: doors.map((d) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: d.title } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <CharacterIntro />
      <ServicesGrid />
      <Process />
      <Partners />
      <ClosingCta />
    </>
  );
}
