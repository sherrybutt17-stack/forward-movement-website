import type { Metadata } from "next";
import { WorkshopHome } from "@/components/concepts/workshop/WorkshopHome";

export const metadata: Metadata = { title: "Concept 3 · Workshop" };

export default function ConceptThreePage() {
  return <WorkshopHome />;
}
