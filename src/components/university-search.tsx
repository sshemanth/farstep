"use client";

import { useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";
import { countryPages, type Tone } from "@/lib/countries";
import { initials, universities, universityLogos } from "@/lib/universities";

const PAGE = 48;

const badgeTone: Record<Tone, string> = {
  sun: "bg-sun text-ink",
  flamingo: "bg-flamingo text-ink",
  mint: "bg-mint text-ink",
  cobalt: "bg-cobalt text-white",
};

const counts = Object.fromEntries(
  countryPages.map((c) => [c.code, universities.filter((u) => u.c === c.code).length]),
);

export function UniversitySearch() {
  const params = useSearchParams();
  const initialCountry = countryPages.find((c) => c.slug === params.get("country"))?.code ?? "";
  const [q, setQ] = useState(params.get("q") ?? "");
  const [country, setCountry] = useState(initialCountry);
  const [limit, setLimit] = useState(PAGE);
  const query = useDeferredValue(q);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return universities.filter((u) => {
      if (country && u.c !== country) return false;
      if (!words.length) return true;
      const hay = `${u.n} ${u.s}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [query, country]);

  function sync(next: { q?: string; country?: string }) {
    const code = next.country ?? country;
    const slug = countryPages.find((c) => c.code === code)?.slug ?? "";
    const sp = new URLSearchParams();
    const text = next.q ?? q;
    if (text) sp.set("q", text);
    if (slug) sp.set("country", slug);
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }

  function pickCountry(code: string) {
    setCountry(code);
    setLimit(PAGE);
    sync({ country: code });
  }

  const shown = results.slice(0, limit);

  return (
    <section aria-label="University search" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="uni-q" className="mb-2 block font-bold">
          Search by name or state
        </label>
        <input
          id="uni-q"
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setLimit(PAGE);
            sync({ q: e.target.value });
          }}
          placeholder="Try “Melbourne” or “Toronto”"
          className="w-full rounded-full bg-white px-6 py-4 text-lg font-semibold ring-2 ring-ink placeholder:font-normal placeholder:text-ink/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-cobalt"
        />
      </form>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by country">
        <button
          type="button"
          onClick={() => pickCountry("")}
          aria-pressed={country === ""}
          className="rounded-full px-4 py-2 font-bold ring-2 ring-ink aria-pressed:bg-ink aria-pressed:text-white"
        >
          All countries
        </button>
        {countryPages.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => pickCountry(c.code)}
            aria-pressed={country === c.code}
            className="rounded-full px-4 py-2 font-bold ring-2 ring-ink aria-pressed:bg-ink aria-pressed:text-white"
          >
            {c.name} <span className="font-semibold opacity-60">{counts[c.code]}</span>
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-10 font-display text-xl font-bold">
        {results.length.toLocaleString("en")} {results.length === 1 ? "university" : "universities and colleges"}
      </p>

      {results.length > 0 ? (
        <>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((u) => {
              const cp = countryPages.find((c) => c.code === u.c);
              const logo = universityLogos[u.n];
              return (
                <li key={`${u.c}-${u.n}`} className="flex gap-4 rounded-[1.25rem] bg-white p-5 ring-2 ring-ink/10">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logo} alt="" className="size-14 shrink-0 rounded-2xl object-contain" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className={`grid size-14 shrink-0 place-items-center rounded-2xl font-display text-lg font-black ${
                        cp ? badgeTone[cp.tone] : "bg-haze"
                      }`}
                    >
                      {initials(u.n)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <h2 className="font-display text-base leading-snug font-bold">{u.n}</h2>
                    <p className="mt-1 text-sm text-ink/70">{[u.s, cp?.name].filter(Boolean).join(", ")}</p>
                    {u.w && (
                      <a
                        href={u.w}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm font-bold underline underline-offset-4"
                      >
                        Visit website<span className="sr-only"> of {u.n} (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          {limit < results.length && (
            <div className="mt-10 text-center">
              <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="btn btn-sun">
                Show more ({(results.length - limit).toLocaleString("en")} left)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 rounded-[1.75rem] bg-haze p-10 text-center">
          <h2 className="text-title">No universities match that search.</h2>
          <p className="mx-auto mt-3 max-w-md text-ink/80">
            Check the spelling, or try a different country. Our counsellors can also suggest options for you.
          </p>
        </div>
      )}

      <p className="mt-14 text-sm text-ink/60">
        University list from the open-source{" "}
        <a href="https://github.com/Hipo/university-domains-list" className="underline" target="_blank" rel="noopener noreferrer">
          university-domains-list
        </a>{" "}
        (MIT licence). Listing a university here does not mean we are partnered with it.
      </p>
    </section>
  );
}
