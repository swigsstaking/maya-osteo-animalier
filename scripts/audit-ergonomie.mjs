// Audit d'ergonomie : cherche tout ce qui déborde horizontalement, sur toutes
// les pages et à plusieurs largeurs.
//
//   npm run audit                 police normale
//   ZOOM_POLICE=125 npm run audit  comme un visiteur qui a grossi le texte
//
// Le site doit tourner en local (npm run build && node server.js) sur le port
// 5265. Un conteneur à défilement horizontal assumé — la carte du secteur —
// n'est pas compté comme un débordement.
import puppeteer from 'puppeteer'

const PAGES = ['/', '/a-propos.html', '/deroulement.html', '/motifs.html', '/tarifs.html',
  '/blog.html', '/blog/osteopathie-suivi-du-sportif.html', '/rendez-vous.html',
  '/contact.html', '/mentions-legales.html']
const LARGEURS = [320, 375, 414, 768, 1024, 1440]
const ZOOM_POLICE = Number(process.env.ZOOM_POLICE || 100)

const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
const p = await b.newPage()
const problemes = []

for (const largeur of LARGEURS) {
  await p.setViewport({ width: largeur, height: 900, deviceScaleFactor: 1 })
  for (const route of PAGES) {
    await p.goto('http://127.0.0.1:5265' + route, { waitUntil: 'networkidle0' })
    await p.evaluate((z) => { document.documentElement.style.fontSize = z + '%' }, ZOOM_POLICE)
    await p.evaluate(async () => {
      document.documentElement.style.scrollBehavior = 'auto'
      for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
        window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 25))
      }
      window.scrollTo(0, 0)
    })
    await new Promise((r) => setTimeout(r, 250))
    const r = await p.evaluate(() => {
      const de = document.documentElement
      const dedans = de.clientWidth
      const coupables = []
      // Un conteneur à défilement horizontal assumé n'est pas un débordement.
      const assume = (el) => {
        for (let n = el; n && n !== document.body; n = n.parentElement) {
          const o = getComputedStyle(n).overflowX
          if (o === 'auto' || o === 'scroll') return true
        }
        return false
      }
      for (const el of document.querySelectorAll('body *')) {
        const b = el.getBoundingClientRect()
        if (b.width === 0) continue
        if ((b.right > dedans + 1 || b.left < -1) && !assume(el)) {
          coupables.push({
            balise: el.tagName.toLowerCase(),
            classe: String(el.className).slice(0, 52),
            gauche: Math.round(b.left), droite: Math.round(b.right),
            texte: (el.textContent || '').trim().slice(0, 34),
          })
        }
      }
      // On ne garde que les plus extérieurs : un parent qui déborde entraîne
      // tous ses enfants, inutile de les lister aussi.
      return {
        pageDeborde: de.scrollWidth > dedans + 1,
        scrollW: de.scrollWidth, clientW: dedans,
        coupables: coupables.slice(0, 4),
      }
    })
    if (r.pageDeborde || r.coupables.length) problemes.push({ largeur, route, ...r })
  }
}
await b.close()

if (!problemes.length) console.log('Aucun débordement sur 10 pages × 6 largeurs.')
else for (const pb of problemes) {
  console.log(`\n${pb.largeur}px  ${pb.route}  (page ${pb.scrollW} > ${pb.clientW})`)
  for (const c of pb.coupables) console.log(`   ${c.balise} [${c.gauche}→${c.droite}] .${c.classe} « ${c.texte} »`)
}
