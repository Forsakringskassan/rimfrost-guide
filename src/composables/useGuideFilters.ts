import { ref } from "vue";
import type { RepoFilter } from "@/data/repos";

// Shared so the global search can fill in the repo map's and the glossary's
// own filters when it jumps to one of their entries.
const repoQuery = ref("");
const repoCategory = ref<RepoFilter>("alla");
const glossaryQuery = ref("");

export function useGuideFilters() {
  return { repoQuery, repoCategory, glossaryQuery };
}
