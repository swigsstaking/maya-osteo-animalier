// Serveur statique minimal, sans dépendance.
//
// Pourquoi il existe : l'hébergeur sert les fichiers en `try_files $uri /index.html`.
// Il ne résout pas les index de répertoire, si bien que /tarifs renvoyait le HTML de
// l'accueil — 200 pour le visiteur, mais tous les robots voyaient la page d'accueil
// sur chacune des onze URL, avec la même balise canonique. Ce serveur résout
// `/tarifs` -> `dist/tarifs/index.html` et ne retombe sur l'accueil qu'en dernier
// recours.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, normalize, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = join(dirname(fileURLToPath(import.meta.url)), 'dist')
const PORT = Number(process.env.PORT) || 3000

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

// Les noms d'assets n'ont plus d'empreinte de contenu (voir vite.config.js) :
// ils ne doivent donc jamais être mis en cache longtemps. Les images, elles,
// changent de nom quand elles changent.
const cacheFor = (ext) => {
  if (ext === '.html' || ext === '') return 'no-cache'
  if (ext === '.js' || ext === '.css') return 'public, max-age=300, must-revalidate'
  return 'public, max-age=604800'
}

const readIfFile = async (p) => {
  try {
    if (!(await stat(p)).isFile()) return null
    return await readFile(p)
  } catch {
    return null
  }
}

const server = createServer(async (req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0])

  // `normalize` neutralise les « .. » ; on vérifie ensuite qu'on reste sous dist/.
  const safe = normalize(join(DIST, urlPath))
  if (!safe.startsWith(DIST)) {
    res.writeHead(403).end()
    return
  }

  const candidates = extname(safe)
    ? [safe]
    : [join(safe, 'index.html'), `${safe}.html`]

  for (const candidate of candidates) {
    const data = await readIfFile(candidate)
    if (data) {
      const ext = extname(candidate)
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': cacheFor(ext),
      })
      res.end(req.method === 'HEAD' ? undefined : data)
      return
    }
  }

  // Un asset introuvable est une vraie erreur : ne pas lui renvoyer du HTML.
  if (extname(urlPath) && extname(urlPath) !== '.html') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not found')
    return
  }

  // Route inconnue : l'application se charge d'afficher quelque chose.
  const shell = await readIfFile(join(DIST, 'index.html'))
  res.writeHead(shell ? 404 : 500, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache',
  })
  res.end(shell ?? 'Erreur serveur')
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Site servi sur http://0.0.0.0:${PORT}`)
})
