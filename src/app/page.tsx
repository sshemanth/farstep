import { Hero } from "@/components/home/hero";
import { Destinations } from "@/components/home/destinations";
import { ServicesBento } from "@/components/home/services-bento";
import { Journey } from "@/components/home/journey";
import { Stats, Partners, Reviews } from "@/components/home/proof";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { showProof } from "@/lib/proof";

export default function Home() {
  return (
    <>
      <Hero />
      {showProof && <Stats />}
      <Destinations />
      <ServicesBento />
      <Journey />
      {showProof && (
        <>
          <Partners />
          <Reviews />
        </>
      )}
      <Faq />
      <CtaBand />
    </>
  );
}
