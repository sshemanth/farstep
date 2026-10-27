"use client";

import { useState, useSyncExternalStore } from "react";
import { hideLogo, initials, universityLogos, type University } from "@/lib/universities";

// University logo, loaded live from the university's own website.
// Tries several sources in order and falls back to an initials badge if none work:
//   1. a logo file you added in src/lib/universities.ts (universityLogos)
//   2. Google's site-icon service (www and plain address)
//   3. the site's app icon (apple-touch-icon)
//   4. DuckDuckGo's site-icon service
//   5. the site's own favicon.ico
type LogoSource = { src: string; minWidth: number };

function logoSources(u: University): LogoSource[] {
  if (hideLogo.has(u.n)) return [];
  const manual = universityLogos[u.n];
  if (manual) return [{ src: manual, minWidth: 1 }];
  let host = "";
  try {
    host = u.w ? new URL(u.w).hostname : "";
  } catch {
    return [];
  }
  if (!host) return [];
  const bare = host.replace(/^www\./, "");
  const www = host.startsWith("www.") ? host : `www.${host}`;
  // Google returns a 16px generic globe when it has nothing, so require more than 16px from it.
  const google = (d: string) => ({ src: `https://www.google.com/s2/favicons?domain=${d}&sz=128`, minWidth: 17 });
  const list: LogoSource[] = [
    google(www),
    google(bare),
    { src: `https://${host}/apple-touch-icon.png`, minWidth: 48 },
    { src: `https://icons.duckduckgo.com/ip3/${host}.ico`, minWidth: 17 },
    { src: `https://${host}/favicon.ico`, minWidth: 16 },
  ];
  // Drop exact duplicates (e.g. when the address already has no "www")
  return list.filter((x, i) => list.findIndex((y) => y.src === x.src) === i);
}

const noop = () => () => {};

export function UniLogo({ u, tone }: { u: University; tone: string }) {
  // Only load images in the browser, so load/error events are never missed during page start-up.
  const inBrowser = useSyncExternalStore(noop, () => true, () => false);
  const sources = logoSources(u);
  const [index, setIndex] = useState(0);
  const [small, setSmall] = useState(false);
  const current = sources[index];
  // Move to the next source once per failed source (an image can report an error more than once).
  const next = () => setIndex((i) => (i === index ? i + 1 : i));

  if (!inBrowser) {
    return <span aria-hidden="true" className="size-14 shrink-0 rounded-2xl bg-white ring-1 ring-ink/10" />;
  }
  if (!current) {
    return (
      <span
        aria-hidden="true"
        className={`grid size-14 shrink-0 place-items-center rounded-2xl font-display text-lg font-black ${tone}`}
      >
        {initials(u.n)}
      </span>
    );
  }
  return (
    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white p-2 ring-1 ring-ink/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={current.src}
        src={current.src}
        alt=""
        width={40}
        height={40}
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`object-contain ${small ? "size-7" : "size-10"}`}
        onError={next}
        onLoad={(e) => {
          const w = e.currentTarget.naturalWidth;
          if (w < current.minWidth) next();
          else setSmall(w < 40);
        }}
      />
    </span>
  );
}
