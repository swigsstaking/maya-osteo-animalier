import { site } from './site'
import seo from './seo.json'

const address = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  postalCode: site.address.postalCode,
  addressLocality: site.address.city,
  addressRegion: site.address.canton,
  addressCountry: site.address.country,
}

// Pas d'`aggregateRating` : Google interdit les avis auto-déclarés sur sa propre
// fiche. Les avis du site renvoient vers la fiche Google via `sameAs`.
export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VeterinaryCare',
  '@id': `${seo.site.url}/#business`,
  name: `${site.name} — ${site.role}`,
  description: seo.pages.home.description,
  url: seo.site.url,
  telephone: site.phone,
  email: site.email,
  image: seo.site.ogImage,
  priceRange: 'CHF 80–140',
  address,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.address.lat,
    longitude: site.address.lng,
  },
  openingHours: site.hoursSchema,
  areaServed: [
    ...['Neuchâtel', 'Berne', 'Fribourg', 'Vaud'].map((c) => ({
      '@type': 'AdministrativeArea',
      name: `Canton de ${c}`,
    })),
    ...['Neuchâtel', 'La Chaux-de-Fonds', 'Bienne', 'Yverdon-les-Bains', 'Fribourg', 'Morat'].map((v) => ({
      '@type': 'City',
      name: v,
    })),
  ],
  sameAs: [site.social.instagram],
  founder: {
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'ESAO — École Supérieure d’Ostéopathie Animale, Lisieux',
    },
  },
  makesOffer: [
    { animal: 'chevaux', prix: 140 },
    { animal: 'bovins', prix: 120 },
    { animal: 'chiens', prix: 110 },
    { animal: 'chats', prix: 110 },
    { animal: 'NAC', prix: 80 },
  ].map(({ animal, prix }) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: `Ostéopathie pour ${animal}` },
    price: String(prix),
    priceCurrency: 'CHF',
  })),
}

export const articleJsonLd = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.titre,
  description: post.resume,
  datePublished: post.date,
  image: seo.site.url + post.image,
  mainEntityOfPage: `${seo.site.url}/blog/${post.slug}`,
  author: { '@type': 'Person', name: site.name },
  publisher: { '@id': `${seo.site.url}/#business` },
})
