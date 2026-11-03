/**
 * Restores saved preferences before paint (no flash): review-notes visibility (review mode only)
 * and the Executive concept's light/dark theme. Injected via next/script `beforeInteractive`.
 */
export function prefsScript(reviewMode: boolean): string {
  return [
    "try{",
    reviewMode ? 'if(localStorage.getItem("fm-review-notes")==="on")document.documentElement.dataset.reviewNotes="on";' : "",
    'if(localStorage.getItem("fm-exec-theme")==="dark")document.documentElement.dataset.execTheme="dark";',
    "}catch(e){}",
  ].join("");
}
