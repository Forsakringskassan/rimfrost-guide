<script setup lang="ts">
import { computed } from "vue";
import { useGuideFilters } from "@/composables/useGuideFilters";
import { type RepoCategory, categoryLabels, repos } from "@/data/repos";
import { fold } from "@/lib/search";

const { repoQuery, repoCategory } = useGuideFilters();
const filters: (RepoCategory | "alla")[] = ["alla", ...(Object.keys(categoryLabels) as RepoCategory[])];

const visible = computed(() => {
  const q = fold(repoQuery.value.trim());
  return repos.filter(
    (r) =>
      (repoCategory.value === "alla" || r.category === repoCategory.value) &&
      (!q || fold(`${r.name} ${r.description}`).includes(q)),
  );
});
</script>

<template>
  <section id="repon">
    <div class="head">
      <p class="eyebrow">Alla repon</p>
      <h2>Repo-kartan</h2>
      <p class="lede">Varje repo med en mening om vad det gör. Filtrera på sort eller sök på ett ord.</p>
    </div>
    <div class="tools">
      <label for="rq" class="visually-hidden">Sök repo</label>
      <input id="rq" v-model="repoQuery" class="search" type="search" placeholder="Sök, t.ex. sid, team eller beslut" autocomplete="off" />
      <div class="filters">
        <button
          v-for="f in filters"
          :key="f"
          type="button"
          class="fbtn"
          :aria-pressed="repoCategory === f"
          @click="repoCategory = f"
        >
          {{ f === "alla" ? "Alla" : categoryLabels[f] }}
        </button>
      </div>
      <span class="count">{{ visible.length }} av {{ repos.length }}</span>
    </div>
    <div v-if="visible.length" class="repos">
      <div v-for="r in visible" :key="r.name" class="repo" :data-c="r.category" :data-name="r.name">
        <div class="top">
          <code>rimfrost-{{ r.name }}</code>
          <span class="dot" :title="categoryLabels[r.category]"></span>
        </div>
        <p>{{ r.description }}</p>
      </div>
    </div>
    <p v-else class="empty">Inget repo matchar.</p>
  </section>
</template>

<style scoped>
.filters { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.fbtn { border: 1px solid var(--line); background: var(--surface); color: var(--muted); font: 500 0.8rem var(--f-body); padding: 0.4rem 0.75rem; border-radius: 999px; cursor: pointer; }
.fbtn[aria-pressed="true"] { background: var(--ink); color: var(--bg); border-color: var(--ink); }
.repos { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 17.5rem), 1fr)); gap: 0.7rem; }
.repo { background: var(--surface); border: 1px solid var(--line); border-radius: 11px; padding: 0.9rem 1rem; display: grid; gap: 0.4rem; align-content: start; }
.top { display: flex; align-items: center; gap: 0.5rem; justify-content: space-between; }
.repo code { font-size: 0.78rem; color: var(--ink); word-break: break-word; }
.repo p { font-size: 0.85rem; color: var(--muted); line-height: 1.45; }
.dot { width: 0.55rem; height: 0.55rem; border-radius: 50%; flex: none; background: var(--lc); }
</style>
