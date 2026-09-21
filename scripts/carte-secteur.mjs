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

// ── Projection ───────────────────────────────────────────────────────────────
// Le cadre est déduit de la zone elle-même : la fixer à la main revenait à
// rogner le contour dès qu'on touchait au secteur.
const LARGEUR = 760
const LAT0 = 46.96 // centre approximatif de la région, pour l'aplatissement
const COS = Math.cos((LAT0 * Math.PI) / 180)
// Place pour les étiquettes, qui débordent des points qu'elles nomment.
const MARGE_PX = { gauche: 168, droite: 128, haut: 30, bas: 34 }

let VUE = null
let ECHELLE = 1
let HAUTEUR = 0

const cadrer = (zoneLonLat) => {
  const lons = zoneLonLat.map((p) => p[0])
  const lats = zoneLonLat.map((p) => p[1])
  const ouest = Math.min(...lons), est = Math.max(...lons)
  const sud = Math.min(...lats), nord = Math.max(...lats)
  ECHELLE = (LARGEUR - MARGE_PX.gauche - MARGE_PX.droite) / ((est - ouest) * COS)
  HAUTEUR = Math.round((nord - sud) * ECHELLE + MARGE_PX.haut + MARGE_PX.bas)
  VUE = { ouest, nord }
}

const projeter = ([lon, lat]) => [
  (lon - VUE.ouest) * COS * ECHELLE + MARGE_PX.gauche,
  (VUE.nord - lat) * ECHELLE + MARGE_PX.haut,
]

// ── Villes repères ───────────────────────────────────────────────────────────
// `ancre` place l'étiquette du bon côté du point pour éviter les collisions.
const VILLES = [
  { nom: 'Bienne', lon: 7.2466, lat: 47.1368, ancre: 'start', dx: 9, dy: 4 },
  { nom: 'Neuchâtel', lon: 6.9311, lat: 46.9925, ancre: 'end', dx: -9, dy: 4 },
  { nom: 'Yverdon-les-Bains', lon: 6.6413, lat: 46.7785, ancre: 'end', dx: -9, dy: 4 },
  { nom: 'Fribourg', lon: 7.1620, lat: 46.8065, ancre: 'start', dx: 9, dy: 4 },
  { nom: 'La Chaux-de-Fonds', lon: 6.8281, lat: 47.1039, ancre: 'end', dx: -9, dy: 4 },
]

const BASE = { nom: 'Chambrelien', lon: 6.8281, lat: 46.9436 }

// Le secteur annoncé par Maya : « à peu près Yverdon – Bienne – Fribourg ».
// On enveloppe ces villes, sa base et La Chaux-de-Fonds, puis on élargit :
// une zone de déplacement n'a pas de frontière nette, et prétendre le contraire
// serait plus faux qu'utile.
const SOMMETS = [
  [6.6413, 46.7785], // Yverdon-les-Bains
  [7.2466, 47.1368], // Bienne
  [7.1620, 46.8065], // Fribourg
  [6.8281, 47.1039], // La Chaux-de-Fonds
  [6.9311, 46.9925], // Neuchâtel
  [BASE.lon, BASE.lat],
]
const MARGE_KM = 9

// ── Géométrie ────────────────────────────────────────────────────────────────
const enveloppe = (pts) => {
  const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const croix = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
  const moitie = (liste) => {
    const out = []
    for (const pt of liste) {
      while (out.length >= 2 && croix(out.at(-2), out.at(-1), pt) <= 0) out.pop()
      out.push(pt)
    }
    out.pop()
    return out
  }
  return [...moitie(p), ...moitie([...p].reverse())]
}

/**
 * Ajoute des points le long de chaque côté. Sans cela, lisser un contour de
 * cinq sommets produit de gros bulbes entre les villes et la zone déborde
 * très au-delà du secteur réel.
 */
const densifier = (pts, pasKm) => {
  const out = []
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length]
    const km = Math.hypot((b[0] - a[0]) * COS * 111, (b[1] - a[1]) * 111)
    const n = Math.max(1, Math.round(km / pasKm))
    for (let k = 0; k < n; k++) {
      const t = k / n
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t])
    }
  }
  return out
}

/** Élargit un polygone en poussant chaque sommet depuis le centre. */
const elargir = (pts, km) => {
  const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length
  const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length
  return pts.map(([x, y]) => {
    const dx = (x - cx) * COS * 111, dy = (y - cy) * 111 // degrés -> km
    const d = Math.hypot(dx, dy) || 1
    return [x + ((dx / d) * km) / (111 * COS), y + ((dy / d) * km) / 111]
  })
}

/** Catmull-Rom fermé -> courbes de Bézier cubiques : un contour souple. */
const lisser = (pts) => {
  const n = pts.length
  const at = (i) => projeter(pts[(i + n) % n])
  let d = `M${at(0).map((v) => v.toFixed(1)).join(',')}`
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${c1.map((v) => v.toFixed(1)).join(',')} ${c2.map((v) => v.toFixed(1)).join(',')} ${p2.map((v) => v.toFixed(1)).join(',')}`
  }
  return d + 'Z'
}

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

const chemin = (anneau, tol) =>
  'M' + simplifier(anneau, tol).map((p) => projeter(p).map((v) => v.toFixed(1)).join(',')).join('L') + 'Z'

const anneaux = (geo) =>
  geo.type === 'Polygon' ? [geo.coordinates[0]] : geo.coordinates.map((p) => p[0])

// ── Génération ───────────────────────────────────────────────────────────────
const charger = async (f) => {
  const d = JSON.parse(await readFile(join(DATA, f), 'utf8'))
  return d[0].geojson
}

const anneauxLacs = []
for (const f of ['lac-neuchatel.json', 'lac-bienne.json', 'lac-morat.json']) {
  anneauxLacs.push(...anneaux(await charger(f)))
}
const anneauxCanton = anneaux(await charger('canton-neuchatel.json'))
// Le canton de Neuchâtel entier doit tenir dans la zone : sa pointe ouest
// (Val-de-Travers, La Brévine) débordait, ce qui laissait croire qu'une partie
// du canton n'était pas desservie.
const pointsCanton = anneaux(await charger('canton-neuchatel.json')).flat()
const zoneLonLat = elargir(densifier(enveloppe([...SOMMETS, ...pointsCanton]), 9), MARGE_KM)
cadrer(zoneLonLat)
const zone = lisser(zoneLonLat)

const lacs = anneauxLacs.map((a) => chemin(a, 0.0018))
const canton = anneauxCanton.map((a) => chemin(a, 0.0012))
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
    aria-label="Carte du secteur d'intervention, d'Yverdon-les-Bains à Bienne et Fribourg"
  >
    <title>Secteur d’intervention</title>

    {/* la zone desservie */}
    <path d="${zone}" fill="#FCE3D8" stroke="#DB9B8A" strokeWidth="1.5" strokeDasharray="7 5" />

    {/* canton de Neuchâtel */}
    ${canton.map((d) => `<path d="${d}" fill="none" stroke="#F1C8BD" strokeWidth="1.2" />`).join('\n    ')}

    {/* les trois lacs — le repère le plus lisible de la région */}
    <g fill="#EAE3DC" stroke="#DDD3CA" strokeWidth="0.8">
      ${lacs.map((d) => `<path d="${d}" />`).join('\n      ')}
    </g>

    {/* villes repères */}
    <g fontSize="15" fill="#6B5F58" fontWeight="400">
      ${villes
        .map(
          (v) => `<g>
        <circle cx="${v.p[0].toFixed(1)}" cy="${v.p[1].toFixed(1)}" r="3.5" fill="#C77D77" />
        <text x="${(v.p[0] + v.dx).toFixed(1)}" y="${(v.p[1] + v.dy).toFixed(1)}" textAnchor="${v.ancre}">${v.nom}</text>
      </g>`,
        )
        .join('\n      ')}
    </g>

    {/* le cabinet */}
    <g>
      <circle cx="${base.p[0].toFixed(1)}" cy="${base.p[1].toFixed(1)}" r="8" fill="#AE4721" opacity="0.18" />
      <circle cx="${base.p[0].toFixed(1)}" cy="${base.p[1].toFixed(1)}" r="4.5" fill="#AE4721" />
      <text x="${(base.p[0]).toFixed(1)}" y="${(base.p[1] + 22).toFixed(1)}" textAnchor="middle" fontSize="16" fontWeight="500" fill="#AE4721">${base.nom}</text>
    </g>
  </svg>
)

export default CarteSecteur
`

await mkdir(join(__dirname, '..', 'src', 'components'), { recursive: true })
await writeFile(join(__dirname, '..', 'src', 'components', 'CarteSecteur.jsx'), jsx)
console.log(`Carte générée : ${LARGEUR}×${HAUTEUR}, ${lacs.length} lacs, ${canton.length} contour(s) de canton, ${(jsx.length / 1024).toFixed(1)} Ko`)
