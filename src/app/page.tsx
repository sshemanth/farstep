import { Hero } from "@/components/home/hero";
import { Destinations } from "@/components/home/destinations";
import { ServicesBento } from "@/components/home/services-bento";
import { Journey } from "@/components/home/journey";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <Destinations />
      <ServicesBento />
      <Journey />
      <Faq />
      <CtaBand />
    </>
  );
}
