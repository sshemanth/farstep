// Universities shown on /universities.
// The list comes from src/data/universities.json (regenerate with: node scripts/make-universities.mjs).

import data from "@/data/universities.json";
import { countryPages } from "./countries";

export type University = {
  /** name */ n: string;
  /** country code, e.g. "UK" */ c: string;
  /** state or province */ s: string;
  /** website */ w: string;
};

export const universities = data as University[];

// Logos: by default each card shows the university's own website icon (loaded live).
// To use a better logo file for a university, put it in /public/logos and map it here:
//   "University of Example": "/logos/example.svg",
// If a university asks you not to show its logo, add it to `hideLogo` below.
export const universityLogos: Record<string, string> = {};
export const hideLogo = new Set<string>([
  // "University of Example",
]);

export const countryByCode = Object.fromEntries(countryPages.map((c) => [c.code, c]));

export function countFor(code: string) {
  return universities.filter((u) => u.c === code).length;
}

const SKIP = new Set(["of", "the", "and", "at", "for", "in", "de", "&", "-"]);

/** Two-letter badge text, e.g. "University of Melbourne" -> "UM". */
export function initials(name: string) {
  const words = name
    .replace(/[(),.]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !SKIP.has(w.toLowerCase()));
  return words
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}
