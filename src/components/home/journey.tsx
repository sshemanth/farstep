"use client";

import { useRef } from "react";
import { journey } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

const toneClass = {
  sun: "bg-sun",
  flamingo: "bg-flamingo",
  mint: "bg-mint",
  white: "bg-white",
} as const;

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.5 11.2 14 9.6 10.3 2.8a1 1 0 0 0-.9-.5H8.2l1.9 7L5.3 8.6 3.9 6.7a.8.8 0 0 0-.6-.3H2.2l.9 5.6-.9 5.6h1.1a.8.8 0 0 0 .6-.3l1.4-1.9 4.8-1.3-1.9 7h1.2a1 1 0 0 0 .9-.5L14 14.4l7.5-1.6a.8.8 0 0 0 0-1.6Z"
      />
    </svg>
  );
}

export function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector<HTMLElement>(".journey-track");
        if (!track) return;
        const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })
          .to(track, { x: () => -distance(), ease: "none" }, 0)
          .fromTo(".journey-progress", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0)
          .fromTo(".journey-plane", { left: "0%" }, { left: "100%", ease: "none" }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="journey-title" className="on-dark overflow-hidden bg-ink text-white">
      <div className="flex flex-col justify-center py-20 md:min-h-svh md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="journey-title" className="max-w-[16ch] text-display">
              Five steps from here to there.
            </h2>
            <p className="max-w-sm text-white/80">
              Every student gets one counsellor who stays with them, from the first shortlist to the flight.
            </p>
          </div>

          <div className="relative mt-10 hidden h-8 md:block" aria-hidden="true">
            <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-white/30" />
            <div className="journey-progress absolute inset-x-0 top-1/2 h-0.5 origin-left -translate-y-px bg-sun" />
            <div className="journey-plane absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-sun">
              <PlaneIcon />
            </div>
          </div>
        </div>

        <ol className="journey-track mt-10 flex flex-col gap-6 px-4 sm:px-6 md:mt-12 md:w-max md:flex-row md:pr-[8vw] md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {journey.map((j) => (
            <li key={j.step} className="md:w-[min(560px,70vw)]">
              <article className={`relative flex h-full rounded-[1.25rem] text-ink ${toneClass[j.tone]}`}>
                <div className="flex-1 p-6 sm:p-8">
                  <p className="text-sm font-bold text-ink/70">
                    Step {j.step} of {journey.length}
                  </p>
                  <h3 className="mt-4 text-title">{j.title}</h3>
                  <p className="mt-3 text-ink/85">{j.body}</p>
                  <div className="mt-6 border-t-2 border-dashed border-ink/25 pt-4">
                    <p className="text-sm font-semibold text-ink/70">You get</p>
                    <p className="font-display text-lg font-bold">{j.result}</p>
                  </div>
                </div>
                <div className="relative flex w-24 shrink-0 flex-col items-center justify-between border-l-2 border-dashed border-ink/30 py-6 sm:w-28">
                  <span className="font-display text-5xl font-black" aria-hidden="true">
                    {j.step}
                  </span>
                  <span className="barcode h-28 w-9 rotate-90 opacity-80 sm:w-10" aria-hidden="true" />
                  {/* ticket notches */}
                  <span className="absolute -top-3 -left-3 size-6 rounded-full bg-ink" aria-hidden="true" />
                  <span className="absolute -bottom-3 -left-3 size-6 rounded-full bg-ink" aria-hidden="true" />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
