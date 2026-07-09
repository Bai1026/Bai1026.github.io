import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bai1026.github.io',
  // keep the old /work.html style URLs alive on GitHub Pages
  build: { format: 'file' },
});
