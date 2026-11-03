import type { Stat } from "@/content/proof";
import { visible } from "@/lib/visible";
import { cn } from "@/lib/cn";
import { ReviewFlag } from "./ReviewFlag";

/** Static figures — deliberately no count-up animation. */
export function StatList({ stats, className }: { stats: Stat[]; className?: string }) {
  const items = visible(stats);
  if (items.length === 0) return null;
  return (
    <dl className={cn("grid gap-8 sm:grid-cols-3 sm:gap-8", className)}>
      {items.map((stat) => (
        <div key={stat.id} className="flex flex-col gap-1 border-t-2 border-gold-400 pt-5">
          <dt className="order-2 text-base text-navy-100">{stat.label}</dt>
          <dd className="order-1 font-display text-[clamp(2.25rem,1.9rem+1.4vw,3rem)] font-semibold leading-none tracking-tight text-ivory-50">
            {stat.value}
          </dd>
          <dd className="order-3 mt-2">
            <ReviewFlag review={stat.review} tone="dark" />
          </dd>
        </div>
      ))}
    </dl>
  );
}
