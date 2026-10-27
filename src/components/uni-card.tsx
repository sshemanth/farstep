import { UniLogo } from "./uni-logo";
import { countryPages, type Tone } from "@/lib/countries";
import type { University } from "@/lib/universities";

const badgeTone: Record<Tone, string> = {
  sun: "bg-sun text-ink",
  flamingo: "bg-flamingo text-ink",
  mint: "bg-mint text-ink",
  cobalt: "bg-cobalt text-white",
};

export function UniCard({ u }: { u: University }) {
  const cp = countryPages.find((c) => c.code === u.c);
  return (
    <li className="flex gap-4 rounded-[1.25rem] bg-white p-5 ring-2 ring-ink/10">
      <UniLogo u={u} tone={cp ? badgeTone[cp.tone] : "bg-haze"} />
      <div className="min-w-0">
        <h3 className="font-display text-base leading-snug font-bold">{u.n}</h3>
        <p className="mt-1 text-sm text-ink/70">{[u.city, cp?.name].filter(Boolean).join(", ")}</p>
        <a
          href={u.w}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-bold underline underline-offset-4"
        >
          Visit website<span className="sr-only"> of {u.n} (opens in a new tab)</span>
        </a>
      </div>
    </li>
  );
}
