import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://macremotecontrollerwebpage.netlify.app",
  integrations: [svelte(), tailwind(), sitemap()],

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
