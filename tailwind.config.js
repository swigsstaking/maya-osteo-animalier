/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Palette « Pink Flamingo » + neutres repris de l'identité actuelle de Maya
      colors: {
        cream: '#FDF7F3',   // fond de page
        sand: '#F7EFE8',    // fond de section alterné
        blush: '#FCE3D8',   // surfaces, cartes
        petal: '#F8DBD9',   // surfaces secondaires
        powder: '#F1C8BD',  // bordures, séparateurs
        clay: '#DB9B8A',    // accents doux, icônes
        rose: '#C77D77',    // accent fort, survols
        brick: '#AE4721',   // couleur du logo — CTA principal
        ink: '#27211E',     // texte
        muted: '#6B5F58',   // texte secondaire
      },
      fontFamily: {
        sans: ['Jost', 'system-ui', 'sans-serif'],
        display: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        overline: '0.24em',
        title: '0.01em',
      },
      borderRadius: {
        panel: '28px',
        card: '18px',
        // Niche : les coins hauts s'arrondissent largement, les coins bas
        // restent presque nets. Réservée aux visuels verticaux ou carrés —
        // sur une image large, la courbe s'écrase et l'effet tombe à plat.
        //
        // Les rayons hauts sont en pourcentage, pas en pixels : une valeur
        // fixe donnerait deux formes différentes selon la taille de l'image —
        // à peine visible sur la photo d'accroche, très marquée sur une
        // vignette. Le pourcentage garde la même courbe partout.
        niche: '40% 40% 20px 20px / 32% 32% 20px 20px',
      },
      maxWidth: {
        site: '1180px',
        prose: '68ch',
      },
      spacing: {
        18: '4.5rem',
        30: '7.5rem',
      },
      boxShadow: {
        soft: '0 18px 48px -28px rgba(39, 33, 30, 0.28)',
      },
    },
  },
  plugins: [],
}
