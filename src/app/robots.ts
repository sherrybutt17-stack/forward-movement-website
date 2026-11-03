import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.allowIndexing) {
    // Preview/mockup deployments stay out of search results.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/review" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
