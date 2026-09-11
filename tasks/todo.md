# Refonte du site de Maya Arnould — suivi

## Fait

- [x] Audit du site Wix actuel : contenu extrait page par page, défauts relevés
- [x] Fiche Google exploitée (adresse, horaires, note 5,0/12 avis, 3 témoignages, Instagram)
- [x] Récupération et optimisation des photos (WebP, logo détouré, marque isolée)
- [x] Design system : palette « Pink Flamingo » + Jost, tokens Tailwind nommés métier
- [x] Scaffold depuis le template SWIGS, hooks CMS retirés (incompatibles Swigs Cloud)
- [x] react-helmet-async remplacé par les métadonnées natives de React 19
- [x] Contenu migré et corrigé (fautes, interface en français)
- [x] 10 pages : accueil, à propos, déroulement, motifs, tarifs, blog + 2 articles,
      rendez-vous, contact, mentions légales
- [x] SEO : titres/descriptions par page, OG, canoniques, JSON-LD VeterinaryCare,
      robots.txt, sitemap.xml
- [x] Prérendu statique des 11 routes (SEO + liens profonds sans fallback SPA)
- [x] Revue visuelle 1440 px et 390 px, aucune erreur console, pas de scroll horizontal
- [x] README de passation

## Reste à faire

- [ ] Déploiement Swigs Cloud
- [ ] Validation par Maya
- [ ] Brancher l'agenda de réservation (`booking.url`)
- [ ] Compléter les informations manquantes (voir README, section « À obtenir de Maya »)
- [ ] Bascule du domaine `maya-osteo-animalier.ch` depuis Wix

## Revue

**Ce qui a guidé les choix.** La cliente voulait l'organisation de la page d'accueil de
`marineosteoanimal.fr` sans son menu par espèce, dans des tons doux. La page d'accueil
reprend donc le même enchaînement (hero + double CTA → qu'est-ce que l'ostéopathie →
qui suis-je → pour quel animal → déroulement → motifs → valeurs → avis → zone →
citation → CTA), mais la bande « pour quel animal » est purement illustrative : elle ne
crée pas de pages par espèce. Le menu est celui de son site actuel, à l'identique.

**Continuité de marque.** Son logo et sa Futura sont son seul capital visuel : le logo
est conservé (détouré sur fond transparent) et Jost reprend exactement l'esprit de la
Futura. La palette Pink Flamingo remplace le corail, sur un crème légèrement rosé.

**Deux écarts au plan initial, assumés.**

1. `react-helmet-async` n'est pas compatible React 19 (peer dependency bloquante).
   Plutôt que de forcer `--legacy-peer-deps`, on utilise le hoisting natif des balises
   `<title>`/`<meta>`/`<link>` de React 19 : une dépendance en moins et aucun conflit.
   Contrepartie : `index.html` ne doit porter aucun `<title>` (sinon doublon).
2. La tuile « NAC » de l'accueil est illustrée et non photographiée : la seule image
   disponible était une patte de chien, qu'il aurait été malhonnête d'étiqueter « NAC ».

**Piège rencontré.** `.overline` est déjà un utilitaire Tailwind
(`text-decoration: overline`) : la classe de surtitre soulignait tous les surtitres d'un
trait. Renommée `.eyebrow`.
