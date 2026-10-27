import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { countryPages } from "@/lib/countries";

export default function sitemap(): MetadataRoute.Sitemap {
  const countries = countryPages.map((c) => `/study-abroad/${c.slug}`);
  return ["", "/study-abroad", ...countries, "/services", "/universities", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
  }));
}
