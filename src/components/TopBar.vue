<script setup lang="ts">
import GlobalSearch from "./GlobalSearch.vue";
import ThemeToggle from "./ThemeToggle.vue";
</script>

<template>
  <header class="bar">
    <div class="bar-in">
      <a class="brand" href="#start">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
          <path d="M12 2v20M3.3 7l17.4 10M20.7 7 3.3 17" />
          <path d="m9.5 3.5 2.5 2 2.5-2M9.5 20.5l2.5-2 2.5 2M4 10.5l2.8-.6-.9-2.7M20 13.5l-2.8.6.9 2.7M4 13.5l2.8.6-.9 2.7M20 10.5l-2.8-.6.9-2.7" />
        </svg>
        Rimfrost
      </a>
      <GlobalSearch />
      <ThemeToggle />
    </div>
  </header>
</template>

<style scoped>
.bar { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 20; background: color-mix(in srgb, var(--bg) 86%, transparent); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); }
.bar-in { max-width: 76rem; margin: 0 auto; padding: 0.7rem 1.25rem; display: flex; align-items: center; gap: 1rem; }
.brand { display: flex; align-items: center; gap: 0.6rem; font: 600 1.05rem var(--f-display); color: var(--ink); text-decoration: none; }
.brand svg { width: 22px; height: 22px; color: var(--accent); }
@media (max-width: 640px) { .bar-in { flex-wrap: wrap; row-gap: 0.6rem; justify-content: space-between; } }
</style>
