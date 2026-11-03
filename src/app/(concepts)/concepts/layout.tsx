import type { Metadata } from "next";
import { ConceptSwitcher } from "@/components/concepts/shared/ConceptSwitcher";
import { SmoothScroll } from "@/components/concepts/shared/SmoothScroll";
import "./concepts.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ConceptsLayout({ children }: LayoutProps<"/concepts">) {
  return (
    <>
      <ConceptSwitcher />
      <SmoothScroll />
      {children}
    </>
  );
}
