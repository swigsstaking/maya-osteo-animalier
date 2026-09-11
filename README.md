# Maya Arnould — Ostéopathe animalier

Site vitrine de Maya Arnould, ostéopathe animalier à Chambrelien (NE). Refonte du
site Wix `maya-osteo-animalier.ch`.

| Champ | Valeur |
|---|---|
| Stack | React 19 + Vite + Tailwind 3 + React Router 6 |
| Backend | **aucun** — le site est 100 % statique |
| Hébergement | Swigs Cloud (Suisse) |
| Domaine visé | `maya-osteo-animalier.ch` (encore sur Wix au 11.09.2026) |

## Commandes

```bash
npm install
npm run dev          # serveur local
npm run build        # build simple
npm run build:ssg    # build + prérendu statique -> à utiliser pour déployer
```

`build:ssg` lance Puppeteer et écrit un `dist/<route>/index.html` complet par page.
C'est ce qui donne un HTML lisible sans JavaScript (moteurs et IA) **et** ce qui évite
le 404 sur les liens profonds, puisqu'aucun fallback SPA n'est configuré côté serveur.
À faire tourner **en local** : le prérendu est trop lourd pour un builder distant.

Quand on ajoute une page, quatre endroits à synchroniser :
`src/App.jsx` (route) · `src/components/Layout.jsx` (navigation) ·
`src/data/seo.json` (métadonnées) · `scripts/prerender.mjs` (`ROUTES`) ·
et `public/sitemap.xml`.

## Où se trouve quoi

```
src/data/site.js       coordonnées, horaires, réseaux, URL de l'agenda de réservation
src/data/content.js    tout le texte du site (motifs, étapes, tarifs, avis, bio)
src/data/posts.js      les articles du blog
src/data/seo.json      titres et descriptions par page
src/data/jsonld.js     données structurées Schema.org
src/components/        Layout (header/footer), SEOHead, ui.jsx (Section, CtaBand…), BookingEmbed
src/pages/             une page par fichier, sections en sous-composants
public/images/         photos en WebP + logo
```

Modifier un texte = éditer `src/data/content.js`. Aucun texte n'est écrit en dur dans
les pages, sauf les titres de section.

## Design

| | |
|---|---|
| Police | **Jost** (équivalent Google Fonts de la Futura du site d'origine) |
| Fond | `#FDF7F3` crème rosé · `#F7EFE8` sable |
| Palette « Pink Flamingo » | `#FCE3D8` · `#F8DBD9` · `#F1C8BD` · `#DB9B8A` · `#C77D77` |
| Couleur de marque | `#AE4721` brique — celle du logo, utilisée pour les CTA |
| Texte | `#27211E` |

Les tokens Tailwind sont nommés métier (`bg-cream`, `text-brick`, `border-powder`),
pas `primary-600`. Voir `tailwind.config.js`.

⚠️ `overline` est un utilitaire Tailwind (`text-decoration: overline`) : la classe de
surtitre s'appelle donc `.eyebrow`, pas `.overline`.

## Prise de rendez-vous

`src/data/site.js` → `booking.url`. Tant qu'elle est vide, la page `/rendez-vous`
affiche les canaux de contact direct (téléphone, WhatsApp, e-mail) et reste
parfaitement utilisable. Renseigner l'URL publique de l'agenda suffit à activer le
widget :

```js
booking: { url: 'https://calendly.com/…', provider: 'calendly' }
```

`provider: 'calendly'` charge le widget officiel ; toute autre valeur affiche l'URL
dans une iframe (Reservio et la plupart des outils fonctionnent ainsi).

## Ce qui a été corrigé par rapport au site Wix

- Suppression des deux pages de démo Wix indexées (`/inquiry-services-page`,
  `/pricing-plans/plans-pricing` avec des forfaits « Energy Healing » en euros).
- Suppression des liens réseaux sociaux de démo (`instagram.com/wix`…) et des
  `mailto:info@mysite.com` résiduels.
- Ajout d'un footer, des horaires, des mentions légales — tous absents.
- Ajout d'un bloc « zone de déplacement », promis sur l'accueil mais nulle part présent.
- Interface entièrement en français (« All Posts » → « Blog »).
- Correction des fautes : *diplomée, animale a l'ESAO, qui les units, on peux retrouver,
  préférenciel, atténue les gènes, chaine lésionnelle*.
- `<meta keywords>` corrompue (mentionnait « Reiki Master ») remplacée.

Le fond du contenu n'a pas été modifié : les textes des motifs, des étapes et des
articles sont ceux de Maya, mot pour mot.

## ⚠️ À obtenir de Maya

Ces informations manquaient sur l'ancien site. Le site fonctionne sans elles, mais
elles sont à compléter :

1. **Frais de déplacement et zone exacte** — la page Tarifs dit aujourd'hui que le
   montant est confirmé à la prise de rendez-vous (`src/pages/Tarifs.jsx`).
2. **Montant du tarif préférentiel** dès 3 animaux d'une même famille — jamais chiffré.
3. **URL de l'agenda en ligne** (Calendly / Reservio) → `src/data/site.js`.
4. **Adresse à harmoniser** : « Le Burkli 4, 2019 Chambrelien » sur le site,
   « Le Burkli, 2019 Rochefort » sur Google. Chambrelien est un village de la commune
   de Rochefort — il faut la même écriture partout (site, Google, local.ch, search.ch).
5. **Instagram** : `@maya.osteopathe.animalier` trouvé via sa fiche Google, à confirmer.
   Pas de page Facebook connue.
6. **Photo de consultation sur un NAC** — la tuile « NAC » de l'accueil est illustrée
   faute de photo (`src/data/content.js`, tableau `animaux`).
7. **Ancien site** : les avis affichés viennent de sa fiche Google. Si elle en obtient
   d'autres, mettre à jour `avis` dans `src/data/content.js`.

## Déploiement

Build local puis envoi de `dist/` sur Swigs Cloud via le MCP `swigs-cloud`.

```
npm run build:ssg
→ mcp swigs-cloud deploy   (première fois seulement)
→ mcp swigs-cloud project_status   jusqu'à « running »
```

Pour toute mise à jour ultérieure : **`update_site`**, jamais `deploy` — un second
`deploy` créerait un deuxième projet et consommerait un slot du quota.

Bascule du domaine : à faire après validation par Maya, le site vit encore sur Wix.
