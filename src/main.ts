import { createApp } from "vue";
import App from "./App.vue";
// Fonts are bundled from npm instead of loaded from Google, so visitors' browsers never contact a third party.
import "@fontsource/familjen-grotesk/500.css";
import "@fontsource/familjen-grotesk/600.css";
import "@fontsource/familjen-grotesk/700.css";
import "@fontsource/atkinson-hyperlegible/400.css";
import "@fontsource/atkinson-hyperlegible/400-italic.css";
import "@fontsource/atkinson-hyperlegible/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./styles/base.css";

createApp(App).mount("#app");

// The page renders after the browser has tried to jump to a #section link,
// so jump again once the content exists and the web fonts have settled the layout.
if (location.hash) {
  const jump = () =>
    document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: "instant" });
  document.fonts.ready.then(jump, jump);
}
