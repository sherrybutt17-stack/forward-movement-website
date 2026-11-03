import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=true builds a static copy for GitHub Pages (see .github/workflows/pages.yml).
 * Static hosting has no server, so: images are served unoptimized, and the contact form's server
 * action is swapped for a client stand-in that validates and reports "not connected yet".
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Cache Components / Partial Prerendering need a server; the static export turns them off.
  cacheComponents: !isStaticExport,
  ...(isStaticExport ? {} : { partialPrefetching: true }),
  poweredByHeader: false,
  // Copyright year, stamped at build time (no clock reads during prerender).
  env: { BUILD_YEAR: String(new Date().getFullYear()) },
  ...(isStaticExport ? { output: "export", basePath, trailingSlash: true } : {}),
  images: isStaticExport
    ? { unoptimized: true }
    : {
        // Serve AVIF first, then WebP; next/image falls back automatically.
        formats: ["image/avif", "image/webp"],
        qualities: [50, 75],
      },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
    ...(isStaticExport ? { resolveAlias: { "@/app/(site)/contact/actions": "./src/lib/contact-action-static.ts" } } : {}),
  },
};

export default nextConfig;
