"use client";

import { useRef } from "react";
import { Globe } from "@/components/globe/globe";
import { LeadForm } from "@/components/lead-form";
import { gsap, ScrollTrigger, SplitText, useGSAP, heroScroll } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // One orchestrated entrance: headline lines rise, then the rest settles in.
        SplitText.create(".hero-title", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.set(".hero-title", { visibility: "visible" });
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.09,
            });
          },
        });
        gsap.from(".hero-fade", {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.35,
        });
        gsap.from(".hero-globe", {
          scale: 0.7,
          opacity: 0,
          rotate: -12,
          duration: 1.4,
          ease: "elastic.out(1, 0.7)",
          delay: 0.15,
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-title", { visibility: "visible" });
      });

      // The globe turns and rises as you scroll past the hero.
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          heroScroll.progress = self.progress;
        },
      });

      return () => {
        st.kill();
        heroScroll.progress = 0;
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-2 sm:px-4">
      <div className="on-dark relative overflow-hidden rounded-[2rem] bg-cobalt text-white sm:rounded-[2.75rem]">
        <div className="mx-auto grid max-w-7xl items-center gap-4 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1.1fr_1fr]">
          <div className="relative z-10 px-6 pt-14 sm:px-10 lg:py-16 lg:pl-14">
            <h1 className="hero-title intro-hidden max-w-[14ch] font-display text-[clamp(2.4rem,4.4vw,4.25rem)] leading-[1.04]">
              Study abroad, minus the guesswork.
            </h1>
            <p className="hero-fade mt-5 max-w-[34rem] text-lede text-white/90">
              Courses, applications, test prep, visas and loans. One counsellor guides you the whole way.
            </p>
            <div className="hero-fade mt-8 max-w-xl">
              <LeadForm idPrefix="hero" />
            </div>
          </div>

          <div className="hero-globe relative h-[380px] sm:h-[480px] lg:h-[min(680px,calc(100svh-8rem))]">
            <Globe />
          </div>
        </div>
      </div>
    </section>
  );
}
