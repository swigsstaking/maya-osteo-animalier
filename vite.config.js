import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Noms d'assets avec empreinte de contenu (le défaut de Vite). Ils avaient
  // été figés pour que le HTML prérendu versionné reste valide après un build
  // distant ; c'était une erreur : à nom constant, le navigateur d'un visiteur
  // déjà venu resservait l'ancien bundle, qui réaffichait l'ancienne version
  // par-dessus un HTML pourtant à jour.
  //
  // scripts/apply-prerender.mjs réécrit désormais les références du HTML
  // versionné vers les fichiers réellement produits : l'empreinte peut changer
  // à chaque build sans rien casser.
})
