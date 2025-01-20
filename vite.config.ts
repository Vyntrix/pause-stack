import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [UnoCSS(), sveltekit()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
})
