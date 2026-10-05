<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import HighlightedText from "./HighlightedText.vue";
import { useGuideFilters } from "@/composables/useGuideFilters";
import { glossary } from "@/data/glossary";
import { categoryLabels, repos } from "@/data/repos";
import { flashElement } from "@/lib/flash";
import { highlight, score, tokenize } from "@/lib/search";

type Group = "Begrepp" | "I guiden" | "Repon";

interface Entry {
  group: Group;
  title: string;
  text: string;
  context?: string;
  go: () => void;
}

const GROUP_ORDER: Group[] = ["Begrepp", "I guiden", "Repon"];
const GROUP_LIMIT: Record<Group, number> = { Begrepp: 4, "I guiden": 6, Repon: 4 };
/** Elements inside the guide's sections that are worth jumping to. */
const DOM_TARGETS = ".card, .layer, tbody tr, .steps li, .prose p, .callout, .mock";

const { repoQuery, repoCategory, glossaryQuery } = useGuideFilters();
const input = ref<HTMLInputElement>();
const query = ref("");
const open = ref(false);
const selected = ref(0);
let index: Entry[] | undefined;

const clean = (s: string | null | undefined) => (s ?? "").replace(/\s+/g, " ").trim();

/** Text of an element with its text nodes joined by spaces, so adjacent tags don't run together. */
function textOf(el: Element): string {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const parts: string[] = [];
  while (walker.nextNode()) parts.push(walker.currentNode.textContent ?? "");
  return clean(parts.join(" "));
}

// Built on first use, so it indexes the rendered page as the reader sees it.
function buildIndex(): Entry[] {
  const entries: Entry[] = glossary.map((g) => ({
    group: "Begrepp",
    title: g.term,
    text: g.definition,
    go: async () => {
      glossaryQuery.value = g.term;
      await nextTick();
      flashElement(document.querySelector("#ordlista .term"));
    },
  }));

  document.querySelectorAll<HTMLElement>("main section").forEach((sec) => {
    const sectionTitle = clean(sec.querySelector("h2")?.textContent) || "Rimfrost";
    entries.push({
      group: "I guiden",
      title: sectionTitle,
      text: clean(sec.querySelector(".lede")?.textContent),
      context: "Avsnitt",
      go: () => flashElement(sec.querySelector(".head") ?? sec),
    });
    // The repo map and the glossary are indexed from their data instead.
    if (sec.id === "repon" || sec.id === "ordlista") return;
    sec.querySelectorAll<HTMLElement>(DOM_TARGETS).forEach((el) => {
      if (el.matches(".steps li") && el.closest(".card")) return; // already covered by its card
      const title = clean(el.querySelector("h3, .nm b, td b, b, code")?.textContent) || sectionTitle;
      let text = textOf(el);
      if (text.startsWith(title)) text = clean(text.slice(title.length));
      entries.push({ group: "I guiden", title, text, context: sectionTitle, go: () => flashElement(el) });
    });
  });

  for (const r of repos) {
    entries.push({
      group: "Repon",
      title: `rimfrost-${r.name}`,
      text: r.description,
      context: categoryLabels[r.category],
      go: async () => {
        repoCategory.value = "alla";
        repoQuery.value = r.name;
        await nextTick();
        flashElement(document.querySelector("#repon .repo"));
      },
    });
  }
  return entries;
}

const words = computed(() => tokenize(query.value));

const hits = computed<Entry[]>(() => {
  if (!words.value.length) return [];
  index ??= buildIndex();
  const ranked = index
    .map((e) => ({ e, s: score(e.title, e.text, words.value) }))
    .filter((r): r is { e: Entry; s: number } => r.s !== null)
    .sort((a, b) => b.s - a.s);
  return GROUP_ORDER.flatMap((g) => ranked.filter((r) => r.e.group === g).slice(0, GROUP_LIMIT[g]).map((r) => r.e));
});

watch(query, () => {
  selected.value = 0;
  open.value = words.value.length > 0;
});

function move(step: number) {
  if (!hits.value.length) return;
  selected.value = (selected.value + step + hits.value.length) % hits.value.length;
  nextTick(() => document.getElementById(`gso${selected.value}`)?.scrollIntoView({ block: "nearest" }));
}

function choose(i: number) {
  const hit = hits.value[i];
  if (!hit) return;
  open.value = false;
  input.value?.blur();
  hit.go();
}

function onEscape() {
  if (open.value) open.value = false;
  else {
    query.value = "";
    input.value?.blur();
  }
}

function showsGroupHeading(i: number) {
  return i === 0 || hits.value[i - 1]?.group !== hits.value[i]?.group;
}

// "/" or ⌘K / Ctrl+K focuses the search from anywhere on the page.
function onGlobalKey(e: KeyboardEvent) {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? "");
  if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
    e.preventDefault();
    input.value?.focus();
    input.value?.select();
  }
}
function onGlobalClick(e: MouseEvent) {
  if (!(e.target as Element).closest(".gs")) open.value = false;
}
onMounted(() => {
  document.addEventListener("keydown", onGlobalKey);
  document.addEventListener("click", onGlobalClick);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onGlobalKey);
  document.removeEventListener("click", onGlobalClick);
});
</script>

<template>
  <div class="gs" role="search">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
    <input
      id="gs"
      ref="input"
      v-model="query"
      type="search"
      placeholder="Sök i guiden"
      aria-label="Sök i guiden"
      autocomplete="off"
      role="combobox"
      aria-autocomplete="list"
      aria-controls="gsr"
      :aria-expanded="open"
      :aria-activedescendant="open && hits.length ? `gso${selected}` : undefined"
      @focus="open = words.length > 0"
      @keydown.down.prevent="move(1)"
      @keydown.up.prevent="move(-1)"
      @keydown.enter.prevent="choose(selected)"
      @keydown.esc="onEscape"
    />
    <kbd>/</kbd>
    <div v-show="open" id="gsr" class="gsr" role="listbox" aria-label="Sökresultat">
      <div v-if="!hits.length" class="none">Inga träffar för ”{{ query }}”.</div>
      <template v-for="(h, i) in hits" :key="`${h.group}-${h.title}-${i}`">
        <div v-if="showsGroupHeading(i)" class="grp">{{ h.group }}</div>
        <div
          :id="`gso${i}`"
          class="it"
          role="option"
          :aria-selected="i === selected"
          @mousedown.prevent="choose(i)"
          @mousemove="selected = i"
        >
          <small v-if="h.context">{{ h.context }}</small>
          <b><HighlightedText :segments="highlight(h.title, words)" /></b>
          <span v-if="h.text"><HighlightedText :segments="highlight(h.text, words, 110)" /></span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.gs { position: relative; flex: 1 1 18rem; max-width: 30rem; margin-inline: auto; min-width: 0; }
input { width: 100%; background: var(--surface); border: 1px solid var(--line); border-radius: 999px; padding: 0.5rem 2.6rem 0.5rem 2.3rem; font: inherit; font-size: 0.9rem; color: var(--ink); }
input::placeholder { color: var(--faint); }
input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.gs > svg { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; color: var(--faint); pointer-events: none; }
kbd { position: absolute; right: 0.7rem; top: 50%; transform: translateY(-50%); font: 500 0.7rem/1.4 var(--f-mono); color: var(--faint); border: 1px solid var(--line); border-radius: 5px; padding: 0 0.4rem; pointer-events: none; }
input:focus ~ kbd, input:not(:placeholder-shown) ~ kbd { display: none; }
.gsr { position: absolute; top: calc(100% + 0.5rem); left: 0; right: 0; background: var(--surface); border: 1px solid var(--line); border-radius: 14px; box-shadow: var(--shadow); max-height: min(70vh, 30rem); overflow: auto; padding: 0.4rem; z-index: 30; }
.grp { font: 500 0.68rem/1 var(--f-mono); letter-spacing: 0.12em; text-transform: uppercase; color: var(--faint); padding: 0.75rem 0.7rem 0.4rem; }
.it { display: grid; gap: 0.15rem; padding: 0.55rem 0.7rem; border-radius: 9px; cursor: pointer; }
.it[aria-selected="true"] { background: var(--accent-soft); }
.it b { font-weight: 700; font-size: 0.9rem; color: var(--ink); }
.it span { font-size: 0.8rem; color: var(--muted); line-height: 1.45; }
.it small { font: 500 0.68rem var(--f-mono); color: var(--faint); letter-spacing: 0.04em; }
.it :deep(mark) { background: transparent; color: var(--accent); font-weight: 700; }
.none { padding: 0.9rem 0.7rem; color: var(--faint); font-size: 0.88rem; }
@media (max-width: 640px) {
  .gs { order: 3; flex-basis: 100%; max-width: none; }
  kbd { display: none; }
}
</style>
