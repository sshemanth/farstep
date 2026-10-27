import { getCountryNews, newsSearchUrl } from "@/lib/news";
import { placeName, type CountryPage } from "@/lib/countries";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export async function CountryNews({ c }: { c: CountryPage }) {
  const items = await getCountryNews(c.slug);
  const more = newsSearchUrl(c.slug);

  return (
    <>
      {items.length > 0 ? (
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => (
            <li key={n.link}>
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group flex h-full flex-col justify-between rounded-[1.25rem] bg-white p-6 ring-2 ring-ink/10 hover:ring-ink"
              >
                <div>
                  <p className="flex flex-wrap gap-x-3 text-sm">
                    <span className="font-bold text-ink/80">{n.source}</span>
                    <time dateTime={n.date} className="text-ink/60">
                      {dateFormat.format(new Date(n.date))}
                    </time>
                  </p>
                  <h3 className="mt-3 line-clamp-3 font-display text-lg leading-snug font-bold group-hover:underline">
                    {n.title}
                  </h3>
                </div>
                <span className="mt-5 text-sm font-bold text-cobalt">
                  Read on {n.source}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-[1.25rem] bg-haze p-8">
          <p className="font-bold">The latest news couldn’t load just now.</p>
          <p className="mt-1 text-ink/75">It refreshes automatically. In the meantime, you can see it on Google News.</p>
        </div>
      )}
      <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink/60">
        <a
          href={more}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-ink underline underline-offset-4"
        >
          More news about studying in {placeName(c.name)}
          <span className="sr-only"> on Google News (opens in a new tab)</span>
        </a>
        <span>
          Headlines from Google News, updated every few hours. We don’t write these articles, so always check visa
          and fee details with official sources or ask us.
        </span>
      </p>
    </>
  );
}

export function CountryNewsSkeleton() {
  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading news">
      {[0, 1, 2].map((i) => (
        <li key={i} className="h-44 animate-pulse rounded-[1.25rem] bg-haze motion-reduce:animate-none" />
      ))}
    </ul>
  );
}
