import { useSEO } from '../hooks/useSEO'
import seoData from '../data/seo.json'

/**
 * Métadonnées de page + données structurées.
 *
 * Pas de react-helmet : React 19 remonte lui-même <title>, <meta> et <link>
 * dans le <head>, et les retire au démontage du composant. C'est pour cela que
 * index.html ne porte aucune balise <title> ni <meta name="description"> —
 * elles feraient doublon, et le navigateur ne retiendrait que la première.
 *
 * Le JSON-LD reste dans le corps du document : Google le lit indifféremment
 * dans <head> ou dans <body>.
 */
const SEOHead = ({ page = 'home', title, description, path, image, jsonLd }) => {
  const seo = useSEO(page)
  const { url, name, ogImage } = seoData.site

  const finalTitle = title || seo.title
  const finalDesc = description || seo.description
  const canonical = url + (path || seo.path || '/')
  const finalImage = image ? url + image : ogImage

  return (
    <>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      {seo.keywords?.length > 0 && <meta name="keywords" content={seo.keywords.join(', ')} />}
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={name} />
      <meta property="og:locale" content="fr_CH" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={finalImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalImage} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  )
}

export default SEOHead
