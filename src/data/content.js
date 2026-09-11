// Tout le contenu rédactionnel du site.
// Repris du site actuel de Maya, à l'identique sur le fond : seules les fautes
// d'orthographe et de syntaxe ont été corrigées.

// `image` absente = tuile illustrée (voir PourQuelAnimal dans Home.jsx).
// ⚠️ À REMPLACER dès que Maya fournit une photo de consultation sur un NAC.
export const animaux = [
  { id: 'cheval', label: 'Chevaux', image: '/images/animal-cheval.webp', alt: 'Tête d’un cheval noir en licol' },
  { id: 'chien', label: 'Chiens', image: '/images/animal-chien.webp', alt: 'Maya en consultation avec un caniche' },
  { id: 'chat', label: 'Chats', image: '/images/animal-chat.webp', alt: 'Chat tigré détendu dans les bras' },
  { id: 'bovin', label: 'Bovins', image: '/images/animal-bovins.webp', alt: 'Maya au milieu d’un troupeau de vaches' },
  { id: 'nac', label: 'NAC', note: 'lapins, rongeurs, furets…' },
]

export const etapes = [
  {
    num: '01',
    titre: "L'anamnèse",
    texte:
      "C'est un dialogue entre le praticien et le propriétaire de l'animal. L'ostéopathe va pouvoir récolter le plus d'informations possible pour mieux comprendre l'animal et son mode de vie.",
  },
  {
    num: '02',
    titre: "L'examen palpatoire",
    texte:
      "Lors de cette étape, le praticien palpe le corps entier de l'animal. Il cherche à recueillir un maximum d'informations : réactions de l'animal, zones de froid, zones de chaud, sensibilités…",
  },
  {
    num: '03',
    titre: "L'examen dynamique",
    texte:
      "L'examen dynamique est très utile pour comprendre la locomotion de l'animal, sa posture et ses compensations.",
  },
  {
    num: '04',
    titre: 'Les testings',
    texte:
      "Les testings consistent à tester les articulations dans des plans bien définis, mais également les organes viscéraux et le crâne de l'animal. Grâce à cette étape, l'ostéopathe détecte les dysfonctions spécifiques à chaque animal et commence à établir une chaîne lésionnelle.",
  },
  {
    num: '05',
    titre: 'Le traitement',
    texte:
      "Grâce à de multiples techniques, le praticien traite l'animal dans le respect et dans l'écoute. Il doit s'adapter à chacun pour ne pas le stresser.",
  },
  {
    num: '06',
    titre: 'Rééducation et conseils',
    texte:
      "Pour un bon résultat de la séance et pour que le corps de l'animal prenne le temps d'assimiler les changements (possibilités de mouvements, absence de douleur…), un repos non strict de 48 heures minimum est conseillé. La rééducation est adaptée à chaque animal, à son mode de vie et à ses propres spécificités.",
  },
]

export const motifs = [
  {
    titre: 'Bilan',
    resume: 'Deux rendez-vous par an pour prévenir plutôt que guérir.',
    texte:
      "Surveillance et gestion des divers systèmes du corps pour assurer leur bon fonctionnement. Deux rendez-vous par an permettent une prévention efficace et une prise en charge précoce en cas de souci de santé.",
  },
  {
    titre: 'Troubles locomoteurs',
    resume: 'Boiterie, raideurs, difficulté à se lever, arthrose.',
    texte:
      "Gestion des troubles de la locomotion : boiterie, raideurs, difficulté à se lever ou à descendre les escaliers, arthrose. Par le biais de techniques manuelles douces, le praticien vise à rétablir l'équilibre musculo-squelettique, améliore la mobilité et atténue les gênes.",
    liste: ['Boiterie, raideurs', 'Difficulté à se lever, à descendre les escaliers', 'Arthrose'],
  },
  {
    titre: 'Troubles fonctionnels',
    resume: 'Digestifs, respiratoires, neurologiques, uro-génitaux.',
    texte:
      "L'ostéopathe peut cibler plusieurs troubles, afin de rétablir l'équilibre physiologique et d'améliorer la santé globale de l'animal.",
    liste: [
      'Digestifs (vomissements, douleurs abdominales)',
      "Respiratoires (respiration difficile ou irrégulière, gêne à l'effort)",
      "Neurologiques (troubles de l'équilibre et de la coordination)",
      'Uro-génitaux (troubles de la miction)',
    ],
  },
  {
    titre: 'Suivi sportif',
    resume: 'Prévention, suivi et récupération en compétition.',
    texte:
      'Pour des compétitions sportives : prévention, suivi, récupération, et gestion des baisses de performance.',
    liste: ['Prévention', 'Suivi', 'Récupération', 'Gestion des baisses de performance'],
  },
  {
    titre: 'Suivi de croissance',
    resume: 'Accompagner les déséquilibres de la croissance.',
    texte:
      "Pendant la croissance, les animaux subissent des changements physiques qui peuvent causer des déséquilibres (traumatismes, malformations). L'ostéopathe peut corriger ces déséquilibres, favorisant une croissance harmonieuse.",
  },
  {
    titre: 'Rééducation',
    resume: 'Après une opération, relancer la circulation.',
    texte:
      "Rééducation post-opératoire, favorisant la bonne circulation. L'ostéopathe traite les adhérences cicatricielles et relance la circulation sanguine.",
  },
]

export const tarifs = [
  { animal: 'Chevaux', prix: 140, lieu: 'Sur place, dans les installations hébergeant l’animal' },
  { animal: 'Bovins', prix: 120, lieu: 'Sur place, dans les installations hébergeant l’animal' },
  { animal: 'Chiens', prix: 110, lieu: 'À domicile' },
  { animal: 'Chats', prix: 110, lieu: 'À domicile' },
  { animal: 'NAC', prix: 80, lieu: 'À domicile' },
]

export const avis = [
  {
    auteur: 'Marianne',
    texte:
      "Un grand merci pour votre douceur et votre professionnalisme avec mon chat Floyd. Il avait des problèmes digestifs et vous avez su le manipuler avec beaucoup de calme et de bienveillance, alors qu'il est habituellement très craintif.",
    animal: 'Chat',
  },
  {
    auteur: 'Nassima Bastien',
    texte:
      "Maya Arnould est une jeune ostéopathe douce, à l'écoute et professionnelle. Mon chien a bénéficié de séances de rééducation qui lui ont été très bénéfiques. Je recommande.",
    animal: 'Chien',
  },
  {
    auteur: "Ostéo Animal'Care",
    texte: 'Très professionnelle !',
    animal: "Centre d'ostéopathie animale",
  },
]

export const citation = {
  texte:
    "Le devoir du praticien n'est pas de guérir le malade mais d'ajuster une partie ou l'ensemble du système afin que les fleuves de la vie puissent s'écouler et irriguer les champs desséchés.",
  auteur: 'A. T. Still',
}

export const apropos = {
  intro:
    "Bonjour ! Moi c'est Maya. Je suis diplômée d'ostéopathie animale de l'ESAO depuis 2023.",
  paragraphes: [
    "Ce qui me plaît dans ce métier, c'est d'aider à créer un dialogue entre l'animal et son propriétaire. J'observe ce que son corps me montre, et j'aide le propriétaire à mieux comprendre certains signaux.",
    "Avec une approche ostéopathique douce et globale — musculo-squelettique, viscérale et crânienne — je cherche à redonner à votre compagnon du confort, et à renforcer cette relation qui vous unit.",
  ],
  parcours: [
    "À l'issue de mes cinq années d'études supérieures à l'école d'ostéopathie animale de Lisieux (ESAO), j'ai réalisé une étude intitulée « L'analyse ostéopathique des dysfonctions liées à la biomécanique spécifique chez les chiens de troupeaux ». Elle a permis de mettre en lumière les dysfonctions spécifiques que l'on retrouve chez l'animal pratiquant la gestion de troupeaux, à des degrés différents.",
    "Suite à cela, j'ai été diplômée en juillet 2023.",
  ],
  etudeUrl: 'https://prezi.com/p/radhdxz6wrgg/analyse-osteopathique/',
}

export const osteopathie = {
  titre: "Qu'est-ce que l'ostéopathie animale ?",
  texte:
    "L'ostéopathie animale est une thérapie manuelle qui considère l'animal dans son ensemble. Plutôt que de traiter un symptôme isolé, elle cherche l'origine de la gêne : une perte de mobilité quelque part dans le corps, que l'animal compense ailleurs. Mon approche est douce et globale — musculo-squelettique, viscérale et crânienne — et s'adapte à chaque animal, à son caractère et à son mode de vie.",
  note:
    "L'ostéopathie ne remplace ni le suivi ni le diagnostic vétérinaire : elle les complète.",
}

export const valeurs = [
  { titre: 'Douceur', texte: "Des techniques manuelles adaptées, jamais forcées, dans le respect du rythme de l'animal." },
  { titre: 'Écoute', texte: "Le temps de comprendre l'animal, son environnement et ce que le propriétaire observe au quotidien." },
  { titre: 'Globalité', texte: 'Une lecture du corps entier — musculo-squelettique, viscérale et crânienne.' },
  { titre: 'Proximité', texte: "Je me déplace chez vous, dans un lieu où l'animal est en confiance." },
]
