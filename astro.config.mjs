import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind()],

  // Performance optimizations
  build: {
    inlineStylesheets: "auto",
  },

  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            svelte: ["svelte"],
          },
        },
      },
    },
  },

  // Compress output
  compressHTML: true,

  // Image optimization
  image: {
    domains: [],
    remotePatterns: [],
  },
});
