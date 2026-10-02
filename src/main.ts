import { createApp } from "vue";
import App from "./App.vue";
import "./styles/base.css";

createApp(App).mount("#app");

// The page renders after the browser has tried to jump to a #section link,
// so jump again once the content exists and the web fonts have settled the layout.
if (location.hash) {
  const jump = () =>
    document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: "instant" });
  document.fonts.ready.then(jump, jump);
}
