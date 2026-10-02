import { onBeforeUnmount, onMounted, ref } from "vue";

/** Id of the section currently in the reading zone (30–40 % from the top). */
export function useActiveSection(ids: readonly string[]) {
  const active = ref(ids[0] ?? "");
  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    if (!("IntersectionObserver" in window)) return;
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) active.value = e.target.id;
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  });
  onBeforeUnmount(() => observer?.disconnect());

  return { active };
}
