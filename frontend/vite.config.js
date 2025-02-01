import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true, // сервер доступен по IP-адресу, а не только по локальному адресу.
    port: 8080,
    proxy: {
      // Все запросы, начинающиеся с `/api`, будут направляться на этот адрес, а благодаря `rewrite` будет удален префикс `/api` из пути.
      "/api": {
        target: "https://pizza.vue.pages.academy/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
