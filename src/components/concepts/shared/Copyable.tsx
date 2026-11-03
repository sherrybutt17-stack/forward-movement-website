"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

/** Copy a code (CAGE, NAICS) to the clipboard, with an announced confirmation. */
export function Copyable({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={copy}
        className={cn("inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-md px-2 text-sm font-medium transition-colors", className)}
      >
        {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
        <span>{copied ? "Copied" : "Copy"}</span>
        <span className="sr-only"> {label}</span>
      </button>
      <span role="status" className="sr-only">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </span>
  );
}
