// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    sanity({
      projectId: '9grbh5qy',
      dataset: 'production',
      apiVersion: '2024-03-10', // today's date or similar
      useCdn: true, // `false` if you want to ensure fresh data
    })
  ]
});