// Écrit dist/llms.txt : le résumé du site lu par les assistants IA (ChatGPT,
// Perplexity, Claude…), au format https://llmstxt.org.
//
// Engendré à chaque build depuis src/data/, comme le reste du site : un fichier
// écrit à la main aurait divergé au premier changement de tarif ou de texte.
// Node pur, sans dépendance, pour tourner aussi sur le builder distant.
import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { site, zones } from '../src/data/site.js'
import { tarifs, tarifPreferentiel, motifs, faq, osteopathie, apropos } from '../src/data/content.js'
import { posts } from '../src/data/posts.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const seo = JSON.parse(await readFile(join(ROOT, 'src/data/seo.json'), 'utf8'))
const url = seo.site.url
const page = (cle) => `- [${seo.pages[cle].title}](${url}${seo.pages[cle].path}): ${seo.pages[cle].description}`

const lignes = [
  `# ${site.name}, ${site.role.toLowerCase()}`,
  '',
  `> ${seo.pages.home.description}`,
  '',
  `${apropos.intro} ${osteopathie.texte}`,
  '',
  osteopathie.note,
  '',
  '## Informations pratiques',
  '',
  `- Adresse : ${site.address.street}, ${site.address.postalCode} ${site.address.city} (canton de ${site.address.canton}, Suisse)`,
  `- Secteur : je me déplace à domicile, d'Yverdon-les-Bains à Bienne et jusqu'à Fribourg (cantons de ${zones.cantons.join(', ')})`,
  `- Horaires : ${site.hours}`,
  `- Téléphone et WhatsApp : ${site.phone}`,
  `- E-mail : ${site.email}`,
  `- Prise de rendez-vous en ligne : ${site.booking.url}`,
  '',
  '## Tarifs (une consultation)',
  '',
  ...tarifs.map((t) => `- ${t.animal} : ${t.prix} CHF, ${t.lieu.charAt(0).toLowerCase()}${t.lieu.slice(1)}`),
  `- Tarif préférentiel : ${tarifPreferentiel.charAt(0).toLowerCase()}${tarifPreferentiel.slice(1)}`,
  '',
  '## Motifs de consultation',
  '',
  ...motifs.cas.map((c) => `- ${c}`),
  '',
  '## Questions fréquentes',
  '',
  ...faq.flatMap((f) => [`### ${f.question}`, '', f.reponse, '']),
  '## Pages',
  '',
  ...['home', 'apropos', 'deroulement', 'motifs', 'tarifs', 'contact'].map(page),
  `- [Prendre rendez-vous](${site.booking.url}): agenda en ligne, choix de la prestation et du créneau`,
  '',
  '## Articles',
  '',
  ...posts.map((p) => `- [${p.titre}](${url}/blog/${p.slug}.html): ${p.resume}`),
  '',
  '## Optional',
  '',
  page('blog'),
  page('mentions'),
  '',
]

await writeFile(join(ROOT, 'dist', 'llms.txt'), lignes.join('\n'))
console.log('  llms.txt écrit')
