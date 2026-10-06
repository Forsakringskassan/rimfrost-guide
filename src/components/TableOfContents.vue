<script setup lang="ts">
import { useActiveSection } from "@/composables/useActiveSection";
import { sections } from "@/data/sections";

const { active } = useActiveSection(sections.map((s) => s.id));
</script>

<template>
  <nav class="toc" aria-label="Innehåll">
    <ol>
      <li v-for="s in sections" :key="s.id">
        <a :href="`#${s.id}`" :class="{ on: active === s.id }" :aria-current="active === s.id ? 'location' : undefined">{{ s.title }}</a>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.toc { position: sticky; top: 5rem; align-self: start; padding-block: 3.5rem; font-size: 0.9rem; }
ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.15rem; counter-reset: t; }
a { display: flex; gap: 0.6rem; padding: 0.35rem 0.6rem; border-radius: 8px; color: var(--muted); text-decoration: none; line-height: 1.35; }
a::before { counter-increment: t; content: counter(t, decimal-leading-zero); font: 500 0.7rem/1.9 var(--f-mono); color: var(--faint); }
a:hover { background: var(--sunk); color: var(--ink); }
a.on { color: var(--accent); background: var(--accent-soft); }
a.on::before { color: var(--accent); }
@media (max-width: 960px) { .toc { display: none; } }
</style>
