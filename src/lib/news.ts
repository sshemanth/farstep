// Latest study-abroad news for each country page, from Google News search feeds.
// Results are cached and refreshed automatically every few hours.
// To change what news shows for a country, edit its search words below.

import { cacheLife } from "next/cache";
import { parseRss, type NewsItem } from "./rss";

const searches: Record<string, string> = {
  uk: '"international students" (UK OR Britain) OR "UK student visa"',
  usa: '"international students" ("United States" OR US) OR "F-1 visa"',
  canada: '"international students" Canada OR "study permit" Canada',
  australia: '"international students" Australia OR "student visa" Australia',
  ireland: '"international students" Ireland',
  germany: '"international students" Germany',
  "new-zealand": '"international students" "New Zealand"',
};

function feedUrl(query: string) {
  const q = encodeURIComponent(`${query} when:30d`);
  return `https://news.google.com/rss/search?q=${q}&hl=en-IN&gl=IN&ceid=IN:en`;
}

/** Link to the same search on Google News, for "See more news". */
export function newsSearchUrl(slug: string) {
  const q = encodeURIComponent(searches[slug] ?? "international students");
  return `https://news.google.com/search?q=${q}&hl=en-IN&gl=IN&ceid=IN:en`;
}

export async function getCountryNews(slug: string): Promise<NewsItem[]> {
  "use cache";
  const query = searches[slug];
  if (!query) {
    cacheLife("days");
    return [];
  }
  try {
    const res = await fetch(feedUrl(query), {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; StudyAbroadNews/1.0)" },
    });
    if (!res.ok) throw new Error(`News feed returned ${res.status}`);
    const items = parseRss(await res.text()).slice(0, 6);
    if (!items.length) throw new Error("News feed was empty");
    cacheLife("hours"); // refresh every few hours
    return items;
  } catch (err) {
    console.error(`News for ${slug} could not load:`, err);
    cacheLife("minutes"); // try again soon
    return [];
  }
}
