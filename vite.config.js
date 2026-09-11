import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Noms d'assets stables, sans empreinte de contenu.
        // Le HTML prérendu est engendré en local et versionné dans prerendered/ :
        // il doit continuer de référencer les mêmes fichiers après un build
        // distant, ce qu'une empreinte recalculée casserait.
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
})
