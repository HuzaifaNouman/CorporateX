import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve("/", "index.html"),
        about: resolve("src", "about.html"),
        services: resolve("src", "services.html"),
        contact: resolve("src", "contact.html"),
      },
    },
  },
});
