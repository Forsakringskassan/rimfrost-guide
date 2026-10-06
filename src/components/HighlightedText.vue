<script setup lang="ts">
import type { Segment } from "@/lib/search";

defineProps<{ segments: Segment[] }>();
</script>

<template>
  <template v-for="(s, i) in segments" :key="i"><mark v-if="s.hit">{{ s.text }}</mark><template v-else>{{ s.text }}</template></template>
</template>
