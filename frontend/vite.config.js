import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
      },
    },
  },
  server: {
    host: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://backend:3000/",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
