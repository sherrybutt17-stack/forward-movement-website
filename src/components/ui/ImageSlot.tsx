import Image, { type StaticImageData } from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

interface ImageSlotProps {
  image: { src: StaticImageData; alt: string } | null;
  /** Shown in review mode when no image is supplied, e.g. "Updated headshot pending". */
  pendingLabel: string;
  /** Neutral monogram for people placeholders — never a stand-in portrait. */
  monogram?: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/5]". */
  aspect: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}

export function ImageSlot({ image, pendingLabel, monogram, aspect, sizes, preload = false, className }: ImageSlotProps) {
  if (image) {
    return (
      <div className={cn("relative overflow-hidden rounded-md bg-navy-100", aspect, className)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder="blur"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-navy-900 text-ivory-50",
        aspect,
        className,
      )}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full text-navy-800"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M-20 40 L60 100 L-20 160" fill="none" stroke="currentColor" strokeWidth="18" />
        <path d="M60 40 L140 100 L60 160" fill="none" stroke="currentColor" strokeWidth="18" />
        <path d="M140 40 L220 100 L140 160" fill="none" stroke="currentColor" strokeWidth="18" />
      </svg>
      {monogram ? (
        <span aria-hidden="true" className="relative font-display text-[clamp(3rem,10vw,5.5rem)] font-semibold text-gold-300">
          {monogram}
        </span>
      ) : null}
      {siteConfig.reviewMode ? (
        <span className="relative mt-3 rounded-full border border-dashed border-gold-300 bg-navy-950 px-3 py-1 text-xs font-semibold text-gold-100">
          {pendingLabel}
        </span>
      ) : null}
    </div>
  );
}
