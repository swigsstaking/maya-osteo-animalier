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
  // L'agenda est servi par Swigs Studio. Il suffit du slug du profil de
  // réservation de Maya pour l'activer :
  //   https://calendar.swigs.online/book/<slug>
  // Tant qu'il est vide, la page /rendez-vous.html affiche les canaux de
  // contact direct — le site reste donc parfaitement utilisable.
  //
  // ⚠️ Le profil n'existe pas encore : au 29.09.2026, l'API publique
  // (calendar.swigs.online/api/widget/<slug>) répond 404 sur tous les slugs
  // essayés pour Maya.
  booking: {
    slug: '',
    couleur: '#AE4721', // la brique du logo, reprise par le widget
  },
}

export const zones = {
  cantons: ['Neuchâtel', 'Berne', 'Fribourg', 'Vaud'],
  // Le secteur tel que Maya le décrit : « à peu près Yverdon – Bienne –
  // Fribourg ». Ces localités servent de repères sur la carte et de liste
  // lisible en dessous.
  // Rayon annoncé sur la carte (scripts/carte-secteur.mjs utilise la même valeur).
  rayonKm: 40,
  reperes: [
    'Neuchâtel',
    'La Chaux-de-Fonds',
    'Bienne',
    'Yverdon-les-Bains',
    'Fribourg',
    'Val-de-Travers',
    'Le Landeron',
    'Morat',
    'Payerne',
    'Le Locle',
  ],
  // ⚠️ À COMPLÉTER AVEC MAYA : frais de déplacement au-delà du secteur.
  fraisDeplacement: null,
}
