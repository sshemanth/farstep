"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { countries, courses, levels, subjects, type Country } from "@/lib/courses";
import { site } from "@/lib/site";

const countryCode: Record<Country, string> = {
  "United Kingdom": "UK",
  "United States": "USA",
  Canada: "CAN",
  Australia: "AUS",
  Ireland: "IRL",
  Germany: "GER",
  "New Zealand": "NZ",
};
const countryTone: Record<Country, string> = {
  "United Kingdom": "text-cobalt",
  "United States": "text-flamingo",
  Canada: "text-ink",
  Australia: "text-cobalt",
  Ireland: "text-flamingo",
  Germany: "text-ink",
  "New Zealand": "text-cobalt",
};

function pick<T extends readonly string[]>(list: T, value: string | null): T[number] | "" {
  return value && (list as readonly string[]).includes(value) ? (value as T[number]) : "";
}

const selectClass =
  "w-full appearance-none rounded-full bg-white px-5 py-3 pr-10 font-semibold ring-2 ring-ink focus:outline-none focus-visible:ring-4 focus-visible:ring-cobalt";

export function CourseFinder() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [country, setCountry] = useState(pick(countries, params.get("country")));
  const [level, setLevel] = useState(pick(levels, params.get("level")));
  const [subject, setSubject] = useState(pick(subjects, params.get("subject")));

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return courses.filter((c) => {
      if (country && c.country !== country) return false;
      if (level && c.level !== level) return false;
      if (subject && c.subject !== subject) return false;
      const hay = `${c.title} ${c.university} ${c.city} ${c.country} ${c.subject}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [q, country, level, subject]);

  // Keep the URL in sync so searches can be shared.
  function sync(next: Record<string, string>) {
    const sp = new URLSearchParams({ q, country, level, subject, ...next });
    for (const [k, v] of [...sp.entries()]) if (!v) sp.delete(k);
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }

  const hasFilters = Boolean(q || country || level || subject);
  function clear() {
    setQ("");
    setCountry("");
    setLevel("");
    setSubject("");
    window.history.replaceState(null, "", window.location.pathname);
  }

  return (
    <section aria-label="Course search" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <form role="search" onSubmit={(e) => e.preventDefault()} className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <label htmlFor="cf-q" className="mb-2 block text-sm font-bold">
            Search
          </label>
          <input
            id="cf-q"
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              sync({ q: e.target.value });
            }}
            placeholder="Subject, university or city"
            className="w-full rounded-full bg-white px-5 py-3 font-semibold ring-2 ring-ink placeholder:font-normal placeholder:text-ink/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-cobalt"
          />
        </div>
        {(
          [
            ["cf-country", "Country", countries, country, setCountry, "country"],
            ["cf-level", "Level", levels, level, setLevel, "level"],
            ["cf-subject", "Subject", subjects, subject, setSubject, "subject"],
          ] as const
        ).map(([id, label, options, value, set, key]) => (
          <div key={id}>
            <label htmlFor={id} className="mb-2 block text-sm font-bold">
              {label}
            </label>
            <div className="relative">
              <select
                id={id}
                value={value}
                onChange={(e) => {
                  (set as (v: string) => void)(e.target.value);
                  sync({ [key]: e.target.value });
                }}
                className={selectClass}
              >
                <option value="">Any {label.toLowerCase()}</option>
                {options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 20 20"
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
                aria-hidden="true"
              >
                <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        ))}
      </form>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <p aria-live="polite" className="font-display text-xl font-bold">
          {results.length} {results.length === 1 ? "course" : "courses"}
        </p>
        {hasFilters && (
          <button type="button" onClick={clear} className="font-bold underline decoration-2 underline-offset-4">
            Clear search
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-ink/70">
        Ask us about entry requirements, fees and intakes for any course.
        {site.courseFinderUrl && (
          <>
            {" "}
            <a href={site.courseFinderUrl} className="font-bold underline">
              Open our full course search
            </a>
          </>
        )}
      </p>

      {results.length > 0 ? (
        <ul className="mt-8 divide-y-2 divide-ink/10 border-y-2 border-ink/10">
          {results.map((c) => (
            <li key={c.id} className="grid items-center gap-4 py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
              <span
                className={`stamp hidden size-16 place-items-center font-display text-sm font-black sm:grid ${countryTone[c.country]}`}
                aria-hidden="true"
              >
                {countryCode[c.country]}
              </span>
              <div>
                <h2 className="font-display text-xl font-bold">{c.title}</h2>
                <p className="mt-1 text-ink/80">
                  {c.university}, {c.city}, {c.country}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2 text-sm font-bold" aria-label="Details">
                  <li className="rounded-full bg-haze px-3 py-1">{c.level}</li>
                  <li className="rounded-full bg-haze px-3 py-1">{c.subject}</li>
                </ul>
              </div>
              <Link
                href={`/contact?course=${c.id}`}
                className="btn btn-sun w-fit !px-5 !py-2.5 text-sm"
                aria-label={`Ask about ${c.title} at ${c.university}`}
              >
                Ask about this course
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-[1.75rem] bg-haze p-10 text-center">
          <h2 className="text-title">No courses match that search.</h2>
          <p className="mx-auto mt-3 max-w-md text-ink/80">
            Try fewer words or clear a filter. Or tell a counsellor what you’re looking for, and we’ll find options for
            you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={clear} className="btn btn-sun">
              Clear search
            </button>
            <Link href="/contact" className="btn btn-ink">
              Ask a counsellor
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
