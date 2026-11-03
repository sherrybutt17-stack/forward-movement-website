import { MonitorPlay, Presentation, Sparkles } from "lucide-react";
import type { FormatId } from "@/content/services";
import { cn } from "@/lib/cn";

const icons = { "instructor-led": Presentation, virtual: MonitorPlay, dynamic: Sparkles } as const;

/** Decorative — always paired with the format name in text. */
export function FormatIcon({ id, className }: { id: FormatId; className?: string }) {
  const Icon = icons[id];
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex size-12 items-center justify-center rounded-md bg-gold-100 text-navy-900", className)}
    >
      <Icon className="size-6" strokeWidth={1.75} />
    </span>
  );
}
