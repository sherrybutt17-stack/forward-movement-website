import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { siteConfig } from "@/config/site";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { prefsScript } from "@/components/ui/prefsScript";
import { publicSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.brandName} | Professional Development Training`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.brandName,
  openGraph: {
    type: "website",
    siteName: siteConfig.brandName,
    locale: "en_US",
    url: "/",
  },
  robots: siteConfig.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1E2D3B",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.brandName,
  url: siteConfig.url,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={publicSans.variable} suppressHydrationWarning>
      <head>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-sm bg-navy-900 px-4 py-3 font-semibold text-ivory-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <MotionProvider>{children}</MotionProvider>
        {/* Restores saved preferences before paint. Injected by Next outside React's tree
            (a raw <script> in <head> caused intermittent hydration mismatches). */}
        <Script id="prefs" strategy="beforeInteractive">
          {prefsScript(siteConfig.reviewMode)}
        </Script>
        <script
          type="application/ld+json"
          // Organization basics only; address and phone are added once the client approves them.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
