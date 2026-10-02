<script setup lang="ts">
import { type Theme, useTheme } from "@/composables/useTheme";

const { theme } = useTheme();
const options: { value: Theme; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Ljust" },
  { value: "dark", label: "Mörkt" },
];
</script>

<template>
  <div class="theme" role="group" aria-label="Färgtema">
    <button
      v-for="o in options"
      :key="o.value"
      type="button"
      :aria-pressed="theme === o.value"
      @click="theme = o.value"
    >
      {{ o.label }}
    </button>
  </div>
</template>

<style scoped>
.theme { display: inline-flex; background: var(--sunk); border-radius: 999px; padding: 3px; gap: 2px; }
button { border: 0; background: transparent; color: var(--muted); font: 500 0.8rem var(--f-body); padding: 0.35rem 0.75rem; border-radius: 999px; cursor: pointer; }
button[aria-pressed="true"] { background: var(--surface); color: var(--ink); box-shadow: var(--shadow); }
</style>
