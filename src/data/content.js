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
    titre: 'Les informations',
    texte:
      "C'est un dialogue entre le praticien et le propriétaire de l'animal. L'ostéopathe va pouvoir récolter le plus d'informations possible pour mieux comprendre l'animal et son mode de vie.",
  },
  {
    num: '02',
    titre: "L'examen dynamique",
    texte:
      "L'examen dynamique est très utile pour comprendre la locomotion de l'animal, sa posture et ses compensations.",
  },
  {
    num: '03',
    titre: "L'examen palpatoire",
    texte:
      "Lors de cette étape, le praticien palpe le corps entier de l'animal. Il cherche à recueillir un maximum d'informations : réactions de l'animal, zones de froid, zones de chaud, sensibilités…",
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

// Maya a remplacé ses six catégories par une liste de situations concrètes :
// c'est ce qu'un propriétaire inquiet reconnaît, plutôt qu'une classification.
export const motifs = {
  intro:
    "Les animaux, comme les humains, peuvent bénéficier des soins ostéopathiques pour une multitude de raisons, toutes visant à améliorer leur bien-être et leur qualité de vie.",
  titre: 'Dans quels cas je peux vous aider',
  cas: [
    'En prévention',
    'Boiterie',
    'Douleurs et inconfort digestifs',
    'Raideur au réveil',
    'Difficultés à se déplacer',
    'Difficultés à monter les escaliers, à sauter dans la voiture ou sur le canapé, à se coucher',
    "Baisse de performance ou d'endurance",
    "Récupération après l'effort ou une compétition",
    'Après une blessure ou une opération',
    'Changements de comportement inexpliqués',
    'Animal vieillissant qui perd en mobilité',
  ],
}

export const tarifPreferentiel =
  'À partir de trois animaux de la même famille, au même lieu.'

export const associations =
  'Associations et centres équestres : contactez-moi, nous verrons ensemble.'

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

export const apropos = {
  intro:
    "Je suis Maya, ostéopathe pour les animaux, diplômée de l'ESAO après cinq années d'études.",
  paragraphes: [
    "Ce qui me plaît dans mon métier, c'est d'aider à créer un dialogue entre l'animal et son propriétaire. J'observe ce que son corps me montre, et j'aide le propriétaire à mieux comprendre certains signaux.",
    "Avec une approche ostéopathique douce et globale — musculo-squelettique, viscérale et crânienne — je cherche à redonner à votre compagnon du confort, et à renforcer cette relation qui vous unit.",
  ],
  parcours: [
    "Les animaux font partie de mon quotidien depuis toujours : cavalière depuis mes plus jeunes années, j'ai évolué en compétition. Je partage également ma vie avec mes deux chats.",
    "Mon parcours et ma formation en ostéopathie animale m'ont appris à observer chaque animal dans son ensemble : un mouvement, une attitude, une petite différence… autant d'indices qui permettent de le comprendre.",
    "J'interviens à domicile dans le canton de Neuchâtel et ses environs, auprès des chevaux, chiens, chats, bovins et NAC, grâce à une approche douce et adaptée à chaque animal.",
    'Au plaisir de vous rencontrer !',
  ],
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
