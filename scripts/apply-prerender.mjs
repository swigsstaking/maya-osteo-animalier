// Recopie dans dist/ le HTML prérendu versionné dans prerendered/.
//
// Pourquoi ce détour : le prérendu réel (scripts/prerender.mjs) a besoin de
// Chromium, trop lourd pour un builder distant — un premier déploiement s'est
// enlisé plus de quinze minutes sur le téléchargement de Puppeteer. Le prérendu
// tourne donc en local (`npm run prerender`, qui écrit dans prerendered/), et le
// build distant se contente de cette copie, en Node pur.
//
// La correspondance entre ce HTML et les assets fraîchement construits tient aux
// noms de fichiers stables fixés dans vite.config.js.
import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'prerendered')
const DIST = join(ROOT, 'dist')

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(p)
    else if (entry.name.endsWith('.html')) yield p
  }
}

try {
  await stat(SRC)
} catch {
  console.warn('  apply-prerender : prerendered/ absent, build livré sans prérendu.')
  console.warn('  Lancer `npm run prerender` en local puis versionner le dossier.')
  process.exit(0)
}

// Les noms d'assets portent une empreinte de contenu, qui change à chaque
// build. Le HTML versionné cite ceux du build local : on les remplace par les
// fichiers réellement présents, sinon la page chargerait des URL inexistantes.
const assets = await readdir(join(DIST, 'assets'))
const entree = (ext) => {
  const trouves = assets.filter((f) => f.endsWith(ext))
  if (trouves.length !== 1) {
    throw new Error(`apply-prerender : ${trouves.length} fichier(s) ${ext} dans dist/assets, un seul attendu (${trouves.join(', ')})`)
  }
  return 'assets/' + trouves[0]
}
const js = entree('.js')
const css = entree('.css')

let n = 0
for await (const file of walk(SRC)) {
  const rel = relative(SRC, file)
  const out = join(DIST, rel)
  await mkdir(dirname(out), { recursive: true })
  const html = (await readFile(file, 'utf8'))
    .replace(/assets\/[^"']+\.js/g, js)
    .replace(/assets\/[^"']+\.css/g, css)
  await writeFile(out, html)
  n++
}
console.log(`  apply-prerender : ${n} pages copiées, assets pointés sur ${js} et ${css}.`)
