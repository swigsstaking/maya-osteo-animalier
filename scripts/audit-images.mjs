// Audit de netteté : compare la taille réelle de chaque image à la taille
// où elle s'affiche. Une image plus petite que son cadre est floue ; une
// image deux fois plus grande est nette sur écran Retina.
//
// ⚠️ Avant de recadrer une photo venue d'un téléphone, appliquer
// `ImageOps.exif_transpose` : le drapeau EXIF d'orientation ne change pas les
// pixels, seulement la façon de les afficher. L'ignorer donne une image
// couchée — c'est arrivé sur la photo du chat, stockée en 750×1334 alors
// qu'elle doit s'afficher en 1334×750.
import puppeteer from 'puppeteer'

const PAGES = ['/', '/a-propos.html', '/deroulement.html', '/motifs.html', '/tarifs.html',
  '/blog.html', '/blog/osteopathie-suivi-du-sportif.html',
  '/blog/le-craquement-est-il-signe-d-un-bon-traitement.html',
  '/rendez-vous.html', '/contact.html', '/mentions-legales.html']
// On mesure à la largeur où chaque image est la plus grande.
const LARGEURS = [390, 768, 1440, 1920]

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
const p = await b.newPage()
const pire = new Map()

for (const largeur of LARGEURS) {
  await p.setViewport({ width: largeur, height: 900, deviceScaleFactor: 1 })
  for (const route of PAGES) {
    await p.goto('http://127.0.0.1:5265' + route, { waitUntil: 'networkidle0' })
    await p.evaluate(async () => {
      document.documentElement.style.scrollBehavior = 'auto'
      for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
        window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30))
      }
    })
    await new Promise((r) => setTimeout(r, 400))
    const imgs = await p.evaluate(() => [...document.querySelectorAll('img')]
      .filter((i) => i.getBoundingClientRect().width > 0)
      .map((i) => ({
        src: i.getAttribute('src'),
        affiche: Math.round(i.getBoundingClientRect().width),
        reelle: i.naturalWidth,
      })))
    for (const i of imgs) {
      const actuel = pire.get(i.src)
      if (!actuel || i.affiche > actuel.affiche) pire.set(i.src, { ...i, largeur, route })
    }
  }
}
await b.close()

const lignes = [...pire.values()].sort((a, b) => a.reelle / a.affiche - b.reelle / b.affiche)
console.log('image'.padEnd(34) + 'affichée  réelle  rapport  verdict')
for (const l of lignes) {
  const r = l.reelle / l.affiche
  const verdict = r < 1 ? 'FLOUE (agrandie)' : r < 1.5 ? 'juste — floue sur Retina' : r < 2 ? 'correcte, un peu courte' : 'nette sur Retina'
  console.log(
    (l.src || '').replace('/images/', '').padEnd(34) +
    String(l.affiche).padStart(6) + String(l.reelle).padStart(8) +
    ('×' + r.toFixed(2)).padStart(9) + '  ' + verdict,
  )
}
