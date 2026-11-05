import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { themes, ACTIVE_THEME, themesToCss } from './src/theme/colors.js'

// Inyecta los colores antes del primer pintado para evitar parpadeos de color.
const injectTheme = () => ({
  name: 'inject-theme',
  transformIndexHtml: () => [
    { tag: 'style', injectTo: 'head-prepend', children: themesToCss() },
    {
      tag: 'meta',
      injectTo: 'head',
      attrs: { name: 'theme-color', content: themes[ACTIVE_THEME].ink },
    },
  ],
})

export default defineConfig({
  plugins: [injectTheme(), react(), tailwindcss()],
})
