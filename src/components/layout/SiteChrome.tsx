import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Header, main landmark and footer for the current-site pages. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
