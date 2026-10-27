// Tiny RSS reader for Google News search feeds (no extra packages needed).

export type NewsItem = {
  title: string;
  link: string;
  source: string;
  /** ISO date string */
  date: string;
};

function decode(text: string) {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

function tag(block: string, name: string) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]) : "";
}

export function parseRss(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const seen = new Set<string>();
  for (const [, block] of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
    const source = tag(block, "source");
    let title = tag(block, "title");
    // Google News titles end with " - Source name"; remove it, we show the source separately.
    if (source && title.endsWith(` - ${source}`)) title = title.slice(0, -(source.length + 3));
    const link = tag(block, "link");
    const time = Date.parse(tag(block, "pubDate"));
    if (!title || !/^https:\/\//.test(link) || Number.isNaN(time)) continue;
    const key = title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({ title, link, source: source || "News", date: new Date(time).toISOString() });
  }
  return items.sort((a, b) => b.date.localeCompare(a.date));
}
