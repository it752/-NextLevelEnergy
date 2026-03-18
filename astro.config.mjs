// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import sanity from '@sanity/astro';

import vercel from '@astrojs/vercel';
import { loadEnv } from 'vite';
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 1000,
    }
  },

  integrations: [
    react(),
    sanity({
      projectId: '9grbh5qy',
      dataset: 'production',
      apiVersion: '2024-03-10', // today's date or similar
      useCdn: false, // `false` if you want to ensure fresh data
      token: env.SANITY_AUTH_TOKEN,
    })
  ]
});