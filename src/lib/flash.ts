/** Scrolls an element into the middle of the view and briefly highlights it. */
export function flashElement(el: Element | null | undefined): void {
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  el.classList.remove("flash");
  void (el as HTMLElement).offsetWidth; // restart the animation
  el.classList.add("flash");
  window.setTimeout(() => el.classList.remove("flash"), 2100);
}
