// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      configFile: './tailwind.config.cjs',
    }),
  ],
  output: 'server', // Kita kembali ke mode server karena kita membutuhkan SSR
  adapter: vercel({
    runtime: 'nodejs18.x', // Menentukan runtime secara eksplisit
  }),
});
