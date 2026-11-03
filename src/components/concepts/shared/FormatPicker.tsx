import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formats, type FormatId } from "@/content/services";
import { cn } from "@/lib/cn";

const options: { id: FormatId; label: string; hint: string }[] = [
  { id: "instructor-led", label: "Practical skills for real-world challenges", hint: "Facilitated, interactive sessions" },
  { id: "virtual", label: "Learning that fits busy schedules", hint: "Teams spread across locations" },
  { id: "dynamic", label: "A lift in engagement and energy", hint: "A change of pace from routine" },
];

export interface PickerTheme {
  root?: string;
  legend?: string;
  option?: string;
  optionChecked?: string;
  hint?: string;
  result?: string;
  resultTitle?: string;
  resultBody?: string;
  link?: string;
  cta?: string;
}

/**
 * "Find your format" — recommendations follow the current site's own descriptions of each format.
 * Native radios + CSS :has(), so it works without JavaScript and with the keyboard.
 */
export function FormatPicker({ name, theme = {}, legend = "What does your team need most right now?" }: { name: string; theme?: PickerTheme; legend?: string }) {
  return (
    <div className={cn("picker grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12", theme.root)}>
      <fieldset>
        <legend className={cn("mb-5 text-xl font-semibold", theme.legend)}>{legend}</legend>
        <div className="grid gap-3">
          {options.map((option) => (
            <label
              key={option.id}
              className={cn(
                "flex min-h-14 cursor-pointer items-center gap-4 rounded-md border-2 px-5 py-4 transition-all has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2",
                theme.option,
                theme.optionChecked,
              )}
            >
              <input type="radio" name={name} value={option.id} className="peer size-5 shrink-0 accent-current" />
              <span>
                <span className="block font-semibold">{option.label}</span>
                <span className={cn("block text-sm", theme.hint)}>{option.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div aria-live="polite" className="self-center">
        <p data-result="none" className={cn("text-lg", theme.hint)}>
          Choose an option to see where we’d suggest starting.
        </p>
        {formats.map((format) => (
          <div key={format.id} data-result={format.id} className={cn("rounded-md p-7", theme.result)}>
            <p className="text-xs font-bold uppercase tracking-[0.18em]">We’d suggest</p>
            <p className={cn("mt-2 text-3xl font-bold leading-tight", theme.resultTitle)}>{format.name}</p>
            <p className={cn("mt-3 leading-relaxed", theme.resultBody)}>{format.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href={siteConfig.primaryCta.href} className={cn("inline-flex min-h-11 items-center gap-2 rounded-md px-5 font-semibold", theme.cta)}>
                {format.ctaLabel} <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link href={`/services#${format.id}`} className={cn("inline-flex min-h-11 items-center font-semibold underline underline-offset-4", theme.link)}>
                How it works
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
