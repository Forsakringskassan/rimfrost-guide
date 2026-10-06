<script setup lang="ts">
import { computed } from "vue";
import { useGuideFilters } from "@/composables/useGuideFilters";
import { glossary } from "@/data/glossary";
import { fold } from "@/lib/search";

const { glossaryQuery } = useGuideFilters();

const visible = computed(() => {
  const q = fold(glossaryQuery.value.trim());
  return q ? glossary.filter((g) => fold(`${g.term} ${g.definition}`).includes(q)) : glossary;
});
</script>

<template>
  <section id="ordlista">
    <div class="head">
      <p class="eyebrow">Begrepp</p>
      <h2>Ordlista</h2>
    </div>
    <div class="tools">
      <label for="gq" class="visually-hidden">Sök begrepp</label>
      <input id="gq" v-model="glossaryQuery" class="search" type="search" placeholder="Sök begrepp" autocomplete="off" />
      <span class="count">{{ visible.length }} begrepp</span>
    </div>
    <div v-if="visible.length" class="gloss">
      <div v-for="g in visible" :key="g.term" class="term" :data-term="g.term">
        <b>{{ g.term }}</b>
        <span>{{ g.definition }}</span>
      </div>
    </div>
    <p v-else class="empty">Inget begrepp matchar.</p>
  </section>
</template>

<style scoped>
.gloss { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr)); gap: 0 2rem; }
.term { padding: 0.9rem 0; border-bottom: 1px solid var(--line); display: grid; gap: 0.2rem; }
.term b { font: 600 1rem var(--f-display); }
.term span { font-size: 0.9rem; color: var(--muted); line-height: 1.5; }
</style>
