import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  // Relative base so the build works at https://<org>.github.io/rimfrost-guide/
  // as well as from a custom domain or a local preview.
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    include: ["src/**/*.spec.ts"],
  },
});
