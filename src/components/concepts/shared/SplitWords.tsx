import { Fragment, type ReactNode } from "react";

interface SplitWordsProps {
  text: string;
  /** Words (exact match, punctuation included) to wrap with `emphasisClassName`. */
  emphasis?: string[];
  emphasisClassName?: string;
  /** Decoration drawn around emphasized words (e.g., a hand-drawn circle), outside the clipping mask. */
  emphasisDecoration?: ReactNode;
  className?: string;
  /** Delay before the first word, in ms. */
  delay?: number;
  stagger?: number;
}

/**
 * Word-by-word mask reveal driven purely by CSS (no JavaScript), so headings paint on the first
 * frame of the animation rather than after hydration. Screen readers get the sentence once, intact.
 */
export function SplitWords({
  text,
  emphasis = [],
  emphasisClassName,
  emphasisDecoration,
  className,
  delay = 80,
  stagger = 55,
}: SplitWordsProps) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={className}>
        {words.map((word, i) => {
          const emphasized = emphasis.includes(word);
          const mask = (
            <span className="split-mask">
              <span className="split-word" style={{ animationDelay: `${delay + i * stagger}ms` }}>
                {emphasized ? <span className={emphasisClassName}>{word}</span> : word}
              </span>
            </span>
          );
          return (
            <Fragment key={`${word}-${i}`}>
              {emphasized && emphasisDecoration ? (
                <span className="relative inline-block">
                  {mask}
                  {emphasisDecoration}
                </span>
              ) : (
                mask
              )}
              {i < words.length - 1 ? " " : null}
            </Fragment>
          );
        })}
      </span>
    </>
  );
}
