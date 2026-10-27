// Builds src/data/universities.json for the Universities page.
//
// Source: Hipo "university-domains-list" (MIT licence)
// https://github.com/Hipo/university-domains-list
//
// Run:   node scripts/make-universities.mjs
// (or pass a downloaded copy: node scripts/make-universities.mjs ./world_universities_and_domains.json)

import { readFileSync, writeFileSync } from "node:fs";

const SOURCE =
  "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json";

// Hipo country name -> our country code (matches src/lib/countries.ts)
const COUNTRIES = {
  "United Kingdom": "UK",
  "United States": "USA",
  Canada: "CAN",
  Australia: "AUS",
  Ireland: "IRL",
  Germany: "GER",
  "New Zealand": "NZ",
};

const local = process.argv[2];
const raw = local ? JSON.parse(readFileSync(local, "utf8")) : await (await fetch(SOURCE)).json();

const seen = new Set();
const out = [];
for (const u of raw) {
  const code = COUNTRIES[u.country];
  if (!code) continue;
  const name = String(u.name ?? "").replace(/\s+/g, " ").trim();
  const key = `${code}|${name.toLowerCase()}`;
  if (!name || seen.has(key)) continue;
  seen.add(key);
  const web = (u.web_pages ?? []).find((w) => /^https?:\/\//i.test(w)) ?? "";
  out.push({ n: name, c: code, s: u["state-province"] ?? "", w: web });
}

// Names starting with a letter first, then the rest (e.g. "42 US")
const startsWithLetter = (n) => /^\p{L}/u.test(n);
out.sort((a, b) => Number(startsWithLetter(b.n)) - Number(startsWithLetter(a.n)) || a.n.localeCompare(b.n));
writeFileSync("src/data/universities.json", JSON.stringify(out));
console.log(`Wrote ${out.length} universities to src/data/universities.json`);
