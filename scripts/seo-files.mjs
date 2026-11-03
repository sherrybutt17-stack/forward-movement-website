#!/usr/bin/env node
/**
 * Writes public/robots.txt and public/sitemap.xml before every build (npm "prebuild" hooks).
 * Plain files work everywhere, including the static GitHub Pages export, where Next's
 * robots/sitemap route handlers can't be combined with Cache Components.
 *
 * Env: NEXT_PUBLIC_SITE_URL (canonical URL), ALLOW_INDEXING ("true" to allow crawlers).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const url = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.forwardmovementent.com").replace(/\/$/, "");
const allowIndexing = process.env.ALLOW_INDEXING?.trim() === "true";
const routes = ["", "/services", "/team", "/portfolio", "/contact"];
const publicDir = join(process.cwd(), "public");

const robots = allowIndexing
  ? `User-Agent: *\nAllow: /\nDisallow: /review\n\nSitemap: ${url}/sitemap.xml\n`
  : "# Preview/mockup deployment: keep out of search results.\nUser-Agent: *\nDisallow: /\n";

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((path) => `  <url>\n    <loc>${url}${path}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${path === "" ? "1.0" : "0.8"}</priority>\n  </url>`)
  .join("\n")}
</urlset>
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, "robots.txt"), robots);
writeFileSync(join(publicDir, "sitemap.xml"), sitemap);
console.log(`seo-files: robots.txt (${allowIndexing ? "indexing allowed" : "noindex"}) and sitemap.xml for ${url}`);
