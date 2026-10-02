<script setup lang="ts">
import TableOfContents from "./components/TableOfContents.vue";
import TopBar from "./components/TopBar.vue";
import CaseFlowSection from "./sections/CaseFlowSection.vue";
import DataModelSection from "./sections/DataModelSection.vue";
import GlossarySection from "./sections/GlossarySection.vue";
import HeroSection from "./sections/HeroSection.vue";
import IntegrationSection from "./sections/IntegrationSection.vue";
import LayersSection from "./sections/LayersSection.vue";
import PortalSection from "./sections/PortalSection.vue";
import RepoMapSection from "./sections/RepoMapSection.vue";
import RulesSection from "./sections/RulesSection.vue";
import StatusSection from "./sections/StatusSection.vue";
import TaskLifecycleSection from "./sections/TaskLifecycleSection.vue";
import WayOfWorkingSection from "./sections/WayOfWorkingSection.vue";
</script>

<template>
  <TopBar />
  <div class="shell">
    <TableOfContents />
    <main>
      <HeroSection />
      <CaseFlowSection />
      <LayersSection />
      <RulesSection />
      <TaskLifecycleSection />
      <PortalSection />
      <DataModelSection />
      <IntegrationSection />
      <StatusSection />
      <RepoMapSection />
      <GlossarySection />
      <WayOfWorkingSection />
    </main>
  </div>
</template>

<style scoped>
.shell { max-width: 76rem; margin: 0 auto; padding-inline: 1.25rem; display: grid; grid-template-columns: 13rem minmax(0, 1fr); gap: 4rem; }
main { min-width: 0; padding-block: 3.5rem 8rem; }
@media (max-width: 960px) { .shell { grid-template-columns: minmax(0, 1fr); gap: 0; } }
</style>
