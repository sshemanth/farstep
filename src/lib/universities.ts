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

// Optional logos. ONLY add a logo when the university has given you permission
// (usually as part of an agent agreement). Put the file in /public/logos and map it here:
//   "University of Example": "/logos/example.svg",
export const universityLogos: Record<string, string> = {};

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
