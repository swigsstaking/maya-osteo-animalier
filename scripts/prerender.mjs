// Prérendu statique post-build : sert dist/ localement, charge chaque route
// dans Puppeteer et écrit le HTML complet en dist/<route>/index.html.
// But : livrer un HTML lisible aux robots (IA + moteurs) sans JavaScript.
//
// >>> POUR CHAQUE NOUVEAU SITE : liste ici toutes les routes publiques. <<<
// (Ne pas mettre les routes authentifiées ni les pages à données dynamiques
//  qui n'ont pas de sens en statique.)
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
let puppeteer
try {
  puppeteer = (await import('puppeteer')).default
} catch {
  console.warn('  prerender : puppeteer indisponible, build livré sans prérendu.')
  process.exit(0)
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
// Versionné : c'est ce dossier que le build distant recopie (voir apply-prerender.mjs).
const PRERENDERED = join(__dirname, '..', 'prerendered')
const PORT = 5188

// Les URL se terminent en .html : l'hébergeur sert `try_files $uri /index.html`
// et ne résout pas les index de répertoire, seul un chemin correspondant
// exactement à un fichier lui parvient.
const ROUTES = [
  '/',
  '/a-propos.html',
  '/deroulement.html',
  '/motifs.html',
  '/tarifs.html',
  '/blog.html',
  '/blog/osteopathie-suivi-du-sportif.html',
  '/blog/le-craquement-est-il-signe-d-un-bon-traitement.html',
  '/rendez-vous.html',
  '/contact.html',
  '/mentions-legales.html',
]

// Si le site est multilingue via localStorage (ex. clé 'xxx-language'),
// décommente et adapte pour forcer la langue du HTML prérendu :
// const FORCE_LANG = { key: 'monsite-language', value: 'fr' }
const FORCE_LANG = null

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.eot': 'application/vnd.ms-fontobject', '.txt': 'text/plain', '.xml': 'application/xml',
}

const shell = await readFile(join(DIST, 'index.html'))

const server = createServer(async (req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0])
  let filePath = join(DIST, urlPath)
  try {
    const s = await stat(filePath)
    if (s.isDirectory()) filePath = join(filePath, 'index.html')
    const data = await readFile(filePath)
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
    res.end(data)
    return
  } catch {
    const ext = extname(urlPath)
    if (ext && ext !== '.html') { res.writeHead(404); res.end(); return }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(shell)
  }
})

// Un prérendu interrompu laisse son serveur derrière lui : on cherche un port
// libre plutôt que d'échouer sur EADDRINUSE des heures plus tard.
let port = PORT
await new Promise((resolve, reject) => {
  const essayer = () => {
    server.once('error', (e) => {
      if (e.code === 'EADDRINUSE' && port < PORT + 20) { port += 1; essayer() }
      else reject(e)
    })
    server.listen(port, () => resolve())
  }
  essayer()
})
if (port !== PORT) console.log(`  (port ${PORT} occupé, prérendu sur ${port})`)

let browser
try {
  browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] })
} catch (e) {
  console.warn(`  prerender : Chromium n'a pas démarré (${e.message}). Build livré sans prérendu.`)
  server.close()
  process.exit(0)
}
let ok = 0
for (const route of ROUTES) {
  const page = await browser.newPage()
  if (FORCE_LANG) {
    await page.evaluateOnNewDocument((fl) => { try { localStorage.setItem(fl.key, fl.value) } catch (e) {} }, FORCE_LANG)
  }
  try {
    await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0', timeout: 60000 })
    await new Promise((r) => setTimeout(r, 2500))
    const html = '<!DOCTYPE html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))
    for (const base of [DIST, PRERENDERED]) {
      const out = join(base, route === '/' ? 'index.html' : route)
      await mkdir(dirname(out), { recursive: true })
      await writeFile(out, html)
    }
    const words = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
    console.log(`  prerendu ${route.padEnd(18)} -> ${words} mots`)
    ok++
  } catch (e) {
    console.error(`  ÉCHEC ${route}: ${e.message}`)
  }
  await page.close()
}
await browser.close()
server.close()
console.log(`Prérendu terminé : ${ok}/${ROUTES.length} pages.`)
