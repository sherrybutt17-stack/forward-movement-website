import type { Metadata } from "next";
import { ExecutiveHome } from "@/components/concepts/executive/ExecutiveHome";

export const metadata: Metadata = { title: "Concept 1 · Executive" };

export default function ConceptOnePage() {
  return <ExecutiveHome />;
}
