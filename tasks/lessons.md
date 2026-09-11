# Leçons

## Vérifier qu'un nom de classe CSS n'est pas déjà un utilitaire Tailwind

`.overline` défini dans `@layer components` a été écrasé par l'utilitaire Tailwind
`overline` (`text-decoration-line: overline`) : tous les surtitres du site sont
apparus soulignés par le haut. La couche `utilities` gagne sur `components`.

**Règle :** avant de nommer une classe personnalisée, vérifier qu'elle n'existe pas
déjà dans Tailwind. Les noms courts et génériques sont les plus exposés :
`overline`, `underline`, `truncate`, `container`, `table`, `grid`, `block`, `hidden`,
`static`, `fixed`, `visible`, `isolate`, `contents`. Préfixer en cas de doute
(`.eyebrow`, `.site-container`).

## Ne pas planifier un envoi de fichiers inline sans en calculer le poids

Le plan prévoyait de déployer `dist/` via `swigs-cloud deploy` avec `files`. Une fois
le site construit, le paquet faisait 1,15 Mo (bundle JS + photos en base64) — au-delà
de ce qu'un seul message peut porter, et `update_site` exige l'ensemble complet à
chaque appel, donc le découpage est impossible. Il a fallu revenir vers l'utilisateur
après coup, alors qu'il avait déjà tranché.

**Règle :** dès qu'une étape consiste à faire transiter des fichiers dans un appel
d'outil, estimer le volume (`du -sh` + ×1,37 pour le base64) **avant** de proposer
l'option, et écarter l'inline au-delà de ~150 Ko.

## Les captures pleine page manquent les images en lazy-loading

Une capture `fullPage` juste après le chargement montre des trous à la place des
images `loading="lazy"`, ce qui fait croire à un bug de mise en page.

**Règle :** faire défiler toute la page avec `scroll-behavior: auto`, attendre, puis
vérifier `[...document.querySelectorAll('img')].filter(i => !i.complete)` avant de
capturer.
