import { Project, SiteSettings } from '@/types';

export const mockSiteSettings: SiteSettings = {
  photographerName: 'Nicla Cristiano',
  tagline: 'Fotografa & Visual Storyteller',
  heroText: 'La fotografia come racconto intimo, estetica editoriale e pura ricerca della luce naturale.',
  contactEmail: 'niclacristiano.foto@gmail.com',
  profileImage: {
    url: '/001.jpg',
    alt: 'Nicla Cristiano',
  },
  socialLinks: [
    { platform: 'Instagram', url: 'https://www.instagram.com/niclacristiano_foto_' },
    { platform: 'Behance', url: 'https://www.behance.net' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com' },
  ],
  bio: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Sono Nicla Cristiano, fotografa con base in Italia e disponibilità in tutto il mondo. Il mio lavoro nasce dall\'incontro tra sensibilità documentaria e rigore editoriale, ispirato dalla luce autentica, dai silenzi carichi di significato e dalle geometrie imperfette del quotidiano.',
        },
      ],
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Attraverso progetti personali, ritratti intimi, moda e reportage, cerco di catturare momenti sospesi in cui l\'estetica visiva incontra l\'emozione spontanea. Ogni scatto è pensato come la pagina di una rivista d\'arte: curato nell\'equilibrio cromatico, nella composizione e nella narrazione complessiva.',
        },
      ],
    },
  ],
};

export const mockProjects: Project[] = [
  {
    _id: 'mock-1',
    title: 'Frammenti di Luce',
    slug: { current: 'frammenti-di-luce' },
    category: 'Ritratti',
    year: 2024,
    featured: true,
    order: 1,
    coverImage: {
      url: '/001.jpg',
      alt: 'Ritratto in luce naturale - Frammenti di Luce',
    },
    excerpt: 'Una serie di ritratti intimi incentrati sullo studio del chiaroscuro e sull\'intensità espressiva dello sguardo contemporaneo.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Frammenti di Luce è un\'indagine sulla vulnerabilità e la forza del ritratto contemporaneo. Lavorando esclusivamente con luce naturale e riflessi radenti, la serie esplora l\'intimità tra soggetto e obiettivo, trasformando il volto in una mappa emotiva di ombre morbide e contrasti scultorei.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Ogni scatto è stato realizzato in ambienti essenziali, spogliando la scena da qualsiasi elemento superfluo per lasciare spazio unicamente al respiro, alla texture della pelle e alla densità dello sguardo.',
          },
        ],
      },
    ],
    gallery: [
      {
        url: '/001.jpg',
        caption: 'Studio sulla morbidezza della luce pomeridiana',
        alt: 'Ritratto femminile in luce morbida',
      },
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=1600',
        caption: 'Profili e ombre taglienti',
        alt: 'Ritratto artistico in bianco e nero e toni caldi',
      },
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=85&w=1600',
        caption: 'L\'attesa: tensione e naturalezza',
        alt: 'Ritratto maschile introspettivo',
      },
      {
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=85&w=1600',
        caption: 'Sguardo diretto, composizione asimmetrica',
        alt: 'Ritratto ravvicinato con messa a fuoco selettiva',
      },
    ],
  },
  {
    _id: 'mock-2',
    title: 'Echi Urbani & Materia',
    slug: { current: 'echi-urbani-e-materia' },
    category: 'Architettura & Spazi',
    year: 2024,
    featured: true,
    order: 2,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=85&w=1600',
      alt: 'Architettura minimalista ed elementi materici',
    },
    excerpt: 'Linee rigorose, superfici materiche e tagli di luce radente nei volumi del brutalismo contemporaneo.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Un reportage visivo dedicato al dialogo tra la severità del cemento armato e la transitorietà della luce solare. Attraverso inquadrature pulite e una palette desaturata, gli spazi urbani si trasformano in sculture monumentali prive di tempo.',
          },
        ],
      },
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=85&w=1600',
        caption: 'Volumi geometrici e prospettive ortogonali',
      },
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=85&w=1600',
        caption: 'Riflessi di vetro e acciaio all\'ora dorata',
      },
      {
        url: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=85&w=1600',
        caption: 'Spazi sospesi nel silenzio mattutino',
      },
    ],
  },
  {
    _id: 'mock-3',
    title: 'Silenzio & Forma',
    slug: { current: 'silenzio-e-forma' },
    category: 'Moda & Editoriale',
    year: 2023,
    featured: true,
    order: 3,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=1600',
      alt: 'Moda editoriale in silhouette',
    },
    excerpt: 'Editoriale di moda minimalista ispirato al design scandinavo e ai movimenti organici del corpo.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Un editoriale concepito come una sequenza di scatti da rivista patinata. La purezza dei tessuti naturali, le cadute ampie degli abiti e i gesti misurati della modella creano un ritmo visivo scandito da grazia e rigore formale.',
          },
        ],
      },
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=1600',
        caption: 'Tessuti in movimento e linee pulite',
      },
      {
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=85&w=1600',
        caption: 'Dettaglio drappeggio e contrasto tattile',
      },
      {
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=1600',
        caption: 'Composizione frontale da copertina',
      },
    ],
  },
  {
    _id: 'mock-4',
    title: 'Amore sul Tirreno',
    slug: { current: 'amore-sul-tirreno' },
    category: 'Matrimoni',
    year: 2023,
    featured: false,
    order: 4,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1600',
      alt: 'Matrimonio editoriale in costiera',
    },
    excerpt: 'Un matrimonio intimo tra le scogliere e il mare, narrato con l\'eleganza spontanea del reportage cinematografico.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Lontano dai cliché della fotografia di matrimonio tradizionale, questo servizio racconta una promessa d\'amore attraverso sguardi rubati, il vento salmastro della costa e la magia della luce del tramonto sul mare.',
          },
        ],
      },
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1600',
        caption: 'La promessa al calar del sole',
      },
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=85&w=1600',
        caption: 'Dettagli botanici e atmosfera della tavola',
      },
      {
        url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=85&w=1600',
        caption: 'Passi complici lungo la costa',
      },
    ],
  },
  {
    _id: 'mock-5',
    title: 'Visioni Mediterranee',
    slug: { current: 'visioni-mediterranee' },
    category: 'Reportage',
    year: 2024,
    featured: false,
    order: 5,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=85&w=1600',
      alt: 'Atmosfere mediterranee e orizzonti marini',
    },
    excerpt: 'Un viaggio visivo tra calette isolate, borghi baciati dal sole e il tempo sospeso dell\'estate italiana.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Un omaggio alle radici mediterranee. La salsedine, i muri a calce bianca, le persiane sbiadite dal sole e il ritmo lento del Sud: un reportage lirico e nostalgico che cattura l\'anima più autentica del nostro territorio.',
          },
        ],
      },
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=85&w=1600',
        caption: 'La vastità dell\'orizzonte',
      },
      {
        url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=85&w=1600',
        caption: 'Texture di rocce e acque cristalline',
      },
    ],
  },
];
