// Génère src/components/CarteSecteur.jsx : la carte du secteur d'intervention,
// en SVG, sans aucune dépendance ni appel réseau au chargement.
//
// Pourquoi pas une carte interactive (Leaflet, Google Maps) : ce serait la seule
// ressource externe de tout le site, elle arriverait avec ses propres couleurs,
// et elle serait absente du HTML prérendu que lisent les moteurs. Un SVG dessiné
// une fois coûte quelques kilo-octets, se met aux couleurs de la charte et reste
// net à toutes les tailles.
//
// Les géométries viennent d'OpenStreetMap (Nominatim), récupérées une fois et
// figées dans scripts/data/. Relancer ce script seulement si le secteur change.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA = join(__dirname, 'data')

// ── Le secteur ───────────────────────────────────────────────────────────────
// Maya décrit son secteur comme « à peu près Yverdon – Bienne – Fribourg ».
// Un cercle autour de son cabinet dit la même chose plus honnêtement : une zone
// de déplacement n'a pas de frontière dentelée, elle a un rayon.
const BASE = { nom: 'Chambrelien', lon: 6.8281, lat: 46.9436 }
const RAYON_KM = 40

// ── Projection ───────────────────────────────────────────────────────────────
const LARGEUR = 880
const COS = Math.cos((BASE.lat * Math.PI) / 180)
const KM_PAR_DEGRE = 111
// Place pour les étiquettes, qui débordent des points qu'elles nomment.
const MARGE = { gauche: 132, droite: 116, haut: 26, bas: 30 }

const demiLargeurDeg = RAYON_KM / KM_PAR_DEGRE / COS
const demiHauteurDeg = RAYON_KM / KM_PAR_DEGRE
const VUE = { ouest: BASE.lon - demiLargeurDeg, nord: BASE.lat + demiHauteurDeg }
const ECHELLE = (LARGEUR - MARGE.gauche - MARGE.droite) / (2 * demiLargeurDeg * COS)
const HAUTEUR = Math.round(2 * demiHauteurDeg * ECHELLE + MARGE.haut + MARGE.bas)
const RAYON_PX = (RAYON_KM / KM_PAR_DEGRE) * ECHELLE

const projeter = ([lon, lat]) => [
  (lon - VUE.ouest) * COS * ECHELLE + MARGE.gauche,
  (VUE.nord - lat) * ECHELLE + MARGE.haut,
]

// ── Villes repères ───────────────────────────────────────────────────────────
// `ancre` place l'étiquette du bon côté pour éviter que deux se chevauchent.
const VILLES = [
  { nom: 'Bienne', lon: 7.2466, lat: 47.1368, ancre: 'end', dx: -10, dy: 4 },
  { nom: 'La Chaux-de-Fonds', lon: 6.8281, lat: 47.1039, ancre: 'end', dx: -10, dy: 4 },
  { nom: 'Le Locle', lon: 6.748, lat: 47.0592, ancre: 'end', dx: -10, dy: 4 },
  { nom: 'Neuchâtel', lon: 6.9311, lat: 46.9925, ancre: 'start', dx: 10, dy: 4 },
  { nom: 'Morat', lon: 7.117, lat: 46.928, ancre: 'start', dx: 10, dy: 4 },
  { nom: 'Fribourg', lon: 7.162, lat: 46.8065, ancre: 'start', dx: 10, dy: 4 },
  { nom: 'Payerne', lon: 6.9386, lat: 46.8221, ancre: 'start', dx: 10, dy: 12 },
  { nom: 'Yverdon-les-Bains', lon: 6.6413, lat: 46.7785, ancre: 'end', dx: -10, dy: 4 },
]

// ── Géométrie ────────────────────────────────────────────────────────────────
/** Douglas-Peucker : les côtes d'un lac n'ont pas besoin de 4000 points. */
const simplifier = (pts, tol) => {
  if (pts.length < 3) return pts
  const dist = (p, a, b) => {
    const [x, y] = p, [x1, y1] = a, [x2, y2] = b
    const dx = x2 - x1, dy = y2 - y1
    if (!dx && !dy) return Math.hypot(x - x1, y - y1)
    const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)))
    return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy))
  }
  let maxD = 0, idx = 0
  for (let i = 1; i < pts.length - 1; i++) {
    const d = dist(pts[i], pts[0], pts.at(-1))
    if (d > maxD) { maxD = d; idx = i }
  }
  if (maxD <= tol) return [pts[0], pts.at(-1)]
  return [
    ...simplifier(pts.slice(0, idx + 1), tol).slice(0, -1),
    ...simplifier(pts.slice(idx), tol),
  ]
}

/** Ne garde que ce qui approche le cadre : inutile de dessiner tout le Jura. */
const proche = (pts) => {
  const marge = 0.9
  return pts.some(([lon, lat]) =>
    Math.abs(lon - BASE.lon) < demiLargeurDeg + marge &&
    Math.abs(lat - BASE.lat) < demiHauteurDeg + marge)
}

const chemin = (anneau, tol) =>
  'M' + simplifier(anneau, tol).map((p) => projeter(p).map((v) => v.toFixed(1)).join(',')).join('L') + 'Z'

const anneaux = (geo) =>
  geo.type === 'Polygon' ? [geo.coordinates[0]] : geo.coordinates.map((p) => p[0])

const charger = async (f) => JSON.parse(await readFile(join(DATA, f), 'utf8'))[0].geojson

// ── Génération ───────────────────────────────────────────────────────────────
const lacs = []
for (const f of ['lac-neuchatel.json', 'lac-bienne.json', 'lac-morat.json']) {
  for (const a of anneaux(await charger(f))) if (proche(a)) lacs.push(chemin(a, 0.0016))
}

const voisins = []
for (const f of ['canton-vaud.json', 'canton-fribourg.json', 'canton-berne.json', 'canton-jura.json']) {
  for (const a of anneaux(await charger(f))) if (proche(a)) voisins.push(chemin(a, 0.004))
}

const neuchatel = anneaux(await charger('canton-neuchatel.json'))
  .filter(proche)
  .map((a) => chemin(a, 0.0016))

const villes = VILLES.map((v) => ({ ...v, p: projeter([v.lon, v.lat]) }))
const base = { ...BASE, p: projeter([BASE.lon, BASE.lat]) }

const jsx = `// GÉNÉRÉ par scripts/carte-secteur.mjs — ne pas modifier à la main.
// Relancer \`node scripts/carte-secteur.mjs\` après avoir changé le secteur.
//
// Contours : OpenStreetMap (ODbL), simplifiés puis figés ici.

const CarteSecteur = ({ className = '' }) => (
  <svg
    viewBox="0 0 ${LARGEUR} ${HAUTEUR}"
    className={className}
    role="img"
    aria-label="Carte du secteur d'intervention : environ ${RAYON_KM} kilomètres autour de Chambrelien, d'Yverdon-les-Bains à Bienne et Fribourg"
  >
    <title>Secteur d’intervention</title>

    {/* le fond : cantons voisins, puis Neuchâtel, puis les lacs */}
    <g fill="#F7EFE8" stroke="#EBDDD2" strokeWidth="1">
      ${voisins.map((d) => `<path d="${d}" />`).join('\n      ')}
    </g>
    <g fill="#F3E7DE" stroke="#E2CFC2" strokeWidth="1.2">
      ${neuchatel.map((d) => `<path d="${d}" />`).join('\n      ')}
    </g>
    <g fill="#DDE5E6" stroke="#CBD6D8" strokeWidth="0.8">
      ${lacs.map((d) => `<path d="${d}" />`).join('\n      ')}
    </g>

    {/* le secteur : un rayon, pas une frontière dentelée */}
    <circle
      cx="${base.p[0].toFixed(1)}" cy="${base.p[1].toFixed(1)}" r="${RAYON_PX.toFixed(1)}"
      fill="#C77D77" fillOpacity="0.16" stroke="#C77D77" strokeWidth="1.6" strokeDasharray="8 6"
    />

    {/* villes repères */}
    <g fontSize="15" fill="#6B5F58" fontWeight="400">
      ${villes
        .map(
          (v) => `<g>
        <circle cx="${v.p[0].toFixed(1)}" cy="${v.p[1].toFixed(1)}" r="3.5" fill="#AE4721" fillOpacity="0.55" />
        <text x="${(v.p[0] + v.dx).toFixed(1)}" y="${(v.p[1] + v.dy).toFixed(1)}" textAnchor="${v.ancre}">${v.nom}</text>
      </g>`,
        )
        .join('\n      ')}
    </g>

    {/* le cabinet */}
    <g>
      <circle cx="${base.p[0].toFixed(1)}" cy="${base.p[1].toFixed(1)}" r="9" fill="#AE4721" opacity="0.2" />
      <circle cx="${base.p[0].toFixed(1)}" cy="${base.p[1].toFixed(1)}" r="5" fill="#AE4721" />
      <text x="${base.p[0].toFixed(1)}" y="${(base.p[1] - 14).toFixed(1)}" textAnchor="middle" fontSize="16" fontWeight="500" fill="#AE4721">${base.nom}</text>
    </g>
  </svg>
)

export default CarteSecteur
`

await mkdir(join(__dirname, '..', 'src', 'components'), { recursive: true })
await writeFile(join(__dirname, '..', 'src', 'components', 'CarteSecteur.jsx'), jsx)
console.log(
  `Carte générée : ${LARGEUR}×${HAUTEUR}, rayon ${RAYON_KM} km, ` +
  `${voisins.length} canton(s) voisin(s), ${lacs.length} lac(s), ${(jsx.length / 1024).toFixed(1)} Ko`,
)
