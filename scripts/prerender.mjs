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
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const PORT = 5188

const ROUTES = [
  '/',
  '/a-propos',
  '/deroulement',
  '/motifs',
  '/tarifs',
  '/blog',
  '/blog/osteopathie-suivi-du-sportif',
  '/blog/le-craquement-est-il-signe-d-un-bon-traitement',
  '/rendez-vous',
  '/contact',
  '/mentions-legales',
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

await new Promise((r) => server.listen(PORT, r))

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
let ok = 0
for (const route of ROUTES) {
  const page = await browser.newPage()
  if (FORCE_LANG) {
    await page.evaluateOnNewDocument((fl) => { try { localStorage.setItem(fl.key, fl.value) } catch (e) {} }, FORCE_LANG)
  }
  try {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 60000 })
    await new Promise((r) => setTimeout(r, 2500))
    const html = '<!DOCTYPE html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))
    const outDir = route === '/' ? DIST : join(DIST, route)
    await mkdir(outDir, { recursive: true })
    await writeFile(join(outDir, 'index.html'), html)
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
