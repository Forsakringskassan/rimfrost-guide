import { ref, watch } from "vue";

export type Theme = "system" | "light" | "dark";

const STORAGE_KEY = "rf-theme";

function readSaved(): Theme {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

// Module scope: one theme for the whole page. index.html applies the saved
// value before first paint; this keeps it in sync afterwards.
const theme = ref<Theme>(readSaved());

watch(theme, (t) => {
  const root = document.documentElement;
  if (t === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", t);
  try {
    localStorage.setItem(STORAGE_KEY, t);
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this visit.
  }
});

export function useTheme() {
  return { theme };
}
