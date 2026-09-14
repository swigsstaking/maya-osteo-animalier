# Maya Arnould — Ostéopathe animalier

Site vitrine de Maya Arnould, ostéopathe animalier à Chambrelien (NE). Refonte du
site Wix `maya-osteo-animalier.ch`.

| Champ | Valeur |
|---|---|
| Stack | React 19 + Vite + Tailwind 3 + React Router 6 |
| Backend | **aucun** — site statique ; `server.js` ne sert qu'aux tests locaux |
| Hébergement | Swigs Cloud (Suisse) |
| Domaine visé | `maya-osteo-animalier.ch` (encore sur Wix au 11.09.2026) |

## Commandes

```bash
npm install
npm run dev          # serveur local
npm run build        # ce que lance l'hébergeur : vite build + copie du prérendu
npm run prerender    # à relancer EN LOCAL après toute modification de contenu
```

### Le prérendu, et pourquoi il est en deux temps

Chaque route est livrée comme un vrai fichier HTML complet (`dist/tarifs.html`) : c'est ce qui
donne un HTML lisible sans JavaScript (moteurs et IA) **et** ce qui évite le 404 sur
les liens profonds, aucun fallback SPA n'étant configuré côté serveur.

Ce HTML est produit par `npm run prerender`, qui charge chaque page dans Chromium via
Puppeteer et enregistre le DOM final. Chromium est trop lourd pour le builder de
l'hébergeur — un premier déploiement s'y est enlisé plus de quinze minutes. Le prérendu
tourne donc **en local**, son résultat est versionné dans `prerendered/`, et le build
distant se contente de le recopier (`scripts/apply-prerender.mjs`, Node pur).

Conséquence à retenir : **une modification de contenu n'apparaît en ligne que si l'on a
relancé `npm run prerender` et versionné `prerendered/`.** Un simple `npm run build`
recopierait l'ancien HTML.

C'est aussi pourquoi `vite.config.js` fixe des noms d'assets sans empreinte de contenu
(`assets/index.js`) : le HTML versionné doit rester valide après un build distant.

Quand on ajoute une page, cinq endroits à synchroniser — et l'adresse doit se terminer
en `.html` partout : `src/App.jsx` (route + redirection sans extension) ·
`src/components/Layout.jsx` (navigation) · `src/data/seo.json` (métadonnées) ·
`scripts/prerender.mjs` (`ROUTES`) · `public/sitemap.xml`.

### Pourquoi les URL se terminent en `.html`

L'hébergeur sert les fichiers en `try_files $uri /index.html` : seul un chemin
correspondant **exactement** à un fichier lui parvient. Il ne résout ni les index de
répertoire (`/tarifs` → `tarifs/index.html`) ni l'extension implicite
(`/tarifs` → `tarifs.html`). Sans `.html`, les onze URL renvoyaient toutes le HTML de
l'accueil : invisible pour le visiteur, puisque React Router prenait le relais, mais
Google voyait onze fois la même page avec la même balise canonique.

Les routes portent donc l'extension : `/tarifs.html`, `/blog/<slug>.html`. Les adresses
sans extension restent valides — `App.jsx` les redirige côté client.

Une exception à connaître : React Router ne sait pas capturer un segment partiel, donc
la route des articles reste `/blog/:slug` et `Article.jsx` retire l'extension lui-même.

### Pourquoi il y a un `server.js`

L'hébergeur sert les fichiers en `try_files $uri /index.html` : il ne résout pas les
index de répertoire. `/tarifs` renvoyait donc le HTML de l'accueil — 200 pour le
visiteur, mais tous les robots voyaient la page d'accueil sur chacune des onze URL,
avec la même balise canonique. `server.js` (Node pur, aucune dépendance) le fait
correctement en développement et resterait la bonne solution si la plateforme
acceptait un jour de le lancer — **elle ne l'utilise pas aujourd'hui**, elle traite le
projet comme un site statique. Il sert donc à tester le build en local
(`node server.js`) et documente le comportement attendu.

Il gère aussi le cache : `no-cache` sur le HTML, cinq minutes sur les JS/CSS — ils
n'ont plus d'empreinte de contenu dans leur nom — et une semaine sur les images.

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
| Découpe des photos | arche (`rounded-arch`) |

**L'arche est la signature visuelle du site.** `rounded-arch`
(`999px 999px 20px 20px`) s'applique à tous les visuels **verticaux ou carrés** :
accroche, portraits, bande des espèces, images de section. Les visuels **larges**
(vignettes du blog en 8/5, en-tête d'article en 16/9) gardent `rounded-card` ou
`rounded-panel` — sur une image large, le dôme s'écrase et l'effet tombe à plat.

Les cartes de texte (motifs, avis, contact) conservent leurs coins arrondis
classiques : la distinction entre photo et surface d'interface est voulue.

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



Le projet est déployé depuis le dépôt public `swigsstaking/maya-osteo-animalier`.

```
npm run prerender      # si le contenu a changé
git commit && git push
→ mcp swigs-cloud redeploy   (id du projet)
→ mcp swigs-cloud project_status   jusqu'à « running »
```

`redeploy` reprend le dernier commit. **Ne jamais relancer `deploy`** : cela créerait
un deuxième projet et consommerait un slot du quota.

Bascule du domaine : à faire après validation par Maya, le site vit encore sur Wix.
