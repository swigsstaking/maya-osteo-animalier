// Source de vérité unique pour toutes les informations de contact et de réservation.
// Rien n'est appelé côté serveur : le site est 100 % statique.

export const site = {
  name: 'Maya Arnould',
  role: 'Ostéopathe animalier',
  baseline: 'Du confort en douceur, pour chaque animal.',
  url: 'https://www.maya-osteo-animalier.ch',

  phone: '+41 76 530 79 62',
  phoneDisplay: '076 530 79 62',
  phoneHref: 'tel:+41765307962',
  whatsapp: 'https://wa.me/41765307962',
  email: 'maya.osteopathe.animalier@gmail.com',

  address: {
    street: 'Le Burkli 4',
    postalCode: '2019',
    city: 'Chambrelien',
    commune: 'Rochefort',
    canton: 'Neuchâtel',
    country: 'CH',
    // Chambrelien, commune de Rochefort (NE)
    lat: 46.9436,
    lng: 6.8281,
  },

  hours: 'Lundi au vendredi, 8h00 – 18h30',
  hoursSchema: ['Mo-Fr 08:00-18:30'],

  social: {
    // ⚠️ À CONFIRMER AVEC MAYA — compte trouvé via sa fiche Google.
    instagram: 'https://www.instagram.com/maya.osteopathe.animalier/',
    instagramHandle: '@maya.osteopathe.animalier',
  },

  google: {
    // Fiche Google Business
    url: 'https://share.google/ZZR1eLjN8NuEAO9Wb',
    rating: '5,0',
    reviewCount: 12,
  },

  // ── Prise de rendez-vous ────────────────────────────────────────────────
  // Renseigner l'URL publique de l'agenda (Calendly, Reservio…) pour activer
  // le widget. Tant qu'elle est vide, la page affiche les canaux de contact
  // direct — le site reste donc parfaitement utilisable.
  booking: {
    url: '',
    provider: '', // 'calendly' | 'reservio'
  },
}

export const zones = {
  cantons: ['Neuchâtel', 'Berne', 'Fribourg', 'Vaud'],
  // ⚠️ À COMPLÉTER AVEC MAYA : rayon exact et frais de déplacement.
  fraisDeplacement: null,
}
