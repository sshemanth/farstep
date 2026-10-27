import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/course-finder", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
  }));
}
