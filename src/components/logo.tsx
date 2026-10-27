"use client";

import { useId, useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";

// Orbit geometry (SVG units, viewBox 0 0 48 48)
const C = 24; // centre
const R = 14.5; // globe radius
const A = 21; // orbit half-width
const B = 6.5; // orbit half-height
const TILT = (-18 * Math.PI) / 180;

function orbitPoint(t: number) {
  const x = A * Math.cos(t);
  const y = B * Math.sin(t);
  return {
    x: C + x * Math.cos(TILT) - y * Math.sin(TILT),
    y: C + x * Math.sin(TILT) + y * Math.cos(TILT),
    behind: Math.sin(t) < 0,
  };
}

/**
 * Animated brand mark: a turning globe with a plane on an orbit that passes
 * behind and in front of it. Static when the visitor prefers reduced motion.
 */
export function LogoMark({ className = "", intro = false }: { className?: string; intro?: boolean }) {
  const svg = useRef<SVGSVGElement>(null);
  const clip = `globe-${useId().replace(/:/g, "")}`;
  const start = orbitPoint(Math.PI / 2.4);

  useGSAP(
    () => {
      const el = svg.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const meridians = el.querySelectorAll<SVGEllipseElement>("[data-meridian]");
        const back = el.querySelector<SVGCircleElement>("[data-plane=back]")!;
        const front = el.querySelector<SVGCircleElement>("[data-plane=front]")!;
        const state = { t: Math.PI / 2.4, spin: 0, speed: 1 };

        const tick = (_time: number, delta: number) => {
          const dt = Math.min(delta, 50) / 1000;
          state.t += dt * 1.1 * state.speed;
          state.spin += dt * 0.9 * state.speed;
          const p = orbitPoint(state.t);
          for (const plane of [back, front]) {
            plane.setAttribute("cx", p.x.toFixed(2));
            plane.setAttribute("cy", p.y.toFixed(2));
          }
          back.style.opacity = p.behind ? "1" : "0";
          front.style.opacity = p.behind ? "0" : "1";
          meridians.forEach((m, i) => {
            const rx = Math.abs(Math.cos(state.spin + (i * Math.PI) / 2)) * R;
            m.setAttribute("rx", Math.max(rx, 0.4).toFixed(2));
          });
        };
        gsap.ticker.add(tick);

        // Speed up while hovered
        const host = el.closest("a, [data-logo]") ?? el;
        const fast = () => gsap.to(state, { speed: 3.5, duration: 0.4 });
        const slow = () => gsap.to(state, { speed: 1, duration: 0.8 });
        host.addEventListener("pointerenter", fast);
        host.addEventListener("pointerleave", slow);

        if (intro) {
          const orbit = el.querySelectorAll<SVGPathElement>("[data-orbit]");
          gsap
            .timeline()
            .from(el.querySelector("[data-globe]"), {
              scale: 0,
              transformOrigin: "50% 50%",
              duration: 0.8,
              ease: "back.out(2)",
            })
            .fromTo(
              orbit,
              { strokeDasharray: 70, strokeDashoffset: 70 },
              { strokeDashoffset: 0, duration: 0.7, ease: "power2.out", stagger: 0.15 },
              "-=0.35",
            )
            .from([back, front], { scale: 0, transformOrigin: "50% 50%", duration: 0.4, ease: "back.out(3)" }, "-=0.2");
        }

        return () => {
          gsap.ticker.remove(tick);
          host.removeEventListener("pointerenter", fast);
          host.removeEventListener("pointerleave", slow);
        };
      });
    },
    { scope: svg, dependencies: [intro] },
  );

  const orbitTransform = `translate(${C} ${C}) rotate(${(TILT * 180) / Math.PI})`;

  return (
    <svg ref={svg} viewBox="0 0 48 48" aria-hidden="true" className={`overflow-visible ${className}`}>
      <defs>
        <clipPath id={clip}>
          <circle cx={C} cy={C} r={R} />
        </clipPath>
        <radialGradient id={`${clip}-shine`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#5b6aff" />
          <stop offset="100%" stopColor="#2c3cf4" />
        </radialGradient>
      </defs>

      {/* far side of the orbit */}
      <path
        data-orbit
        d={`M ${-A} 0 A ${A} ${B} 0 0 1 ${A} 0`}
        transform={orbitTransform}
        fill="none"
        stroke="#ffc83d"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle data-plane="back" cx={start.x} cy={start.y} r="2.9" fill="#ff5c9d" opacity="0" />

      {/* globe */}
      <g data-globe>
        <circle cx={C} cy={C} r={R} fill={`url(#${clip}-shine)`} />
        <g clipPath={`url(#${clip})`} fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.2">
          <ellipse cx={C} cy={C} rx={R} ry={R * 0.32} />
          <line x1={C - R} y1={C - R * 0.55} x2={C + R} y2={C - R * 0.55} />
          <line x1={C - R} y1={C + R * 0.55} x2={C + R} y2={C + R * 0.55} />
          <ellipse data-meridian cx={C} cy={C} rx={R} ry={R} />
          <ellipse data-meridian cx={C} cy={C} rx={0.4} ry={R} />
        </g>
        <circle cx={C - 5} cy={C - 6} r="3.2" fill="#fff" opacity="0.22" />
      </g>

      {/* near side of the orbit */}
      <path
        data-orbit
        d={`M ${A} 0 A ${A} ${B} 0 0 1 ${-A} 0`}
        transform={orbitTransform}
        fill="none"
        stroke="#ffc83d"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle data-plane="front" cx={start.x} cy={start.y} r="2.9" fill="#ff5c9d" />
    </svg>
  );
}

export function Logo({ light = false, intro = false }: { light?: boolean; intro?: boolean }) {
  const word = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!intro || !word.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(word.current, { type: "chars", mask: "chars" });
        gsap.from(split.chars, { yPercent: 110, duration: 0.6, ease: "power3.out", stagger: 0.04, delay: 0.5 });
        return () => split.revert();
      });
    },
    { scope: word, dependencies: [intro] },
  );

  return (
    <span className="flex items-center gap-2.5" data-logo>
      <LogoMark className="size-10" intro={intro} />
      <span
        ref={word}
        className={`font-display text-xl font-bold tracking-tight lowercase ${light ? "text-white" : "text-ink"}`}
      >
        {site.name}
      </span>
    </span>
  );
}
