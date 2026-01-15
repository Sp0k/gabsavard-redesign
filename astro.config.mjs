import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://gabsavard.com",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), mdx()],
  adapter: netlify(),
});