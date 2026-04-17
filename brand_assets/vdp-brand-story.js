/**
 * VDP Advies — Brand Story & Content Architecture
 * Versie 2.0 · Voor gebruik met Claude Code
 *
 * Dit bestand bevat:
 * - Merkpositionering en kernverhaal
 * - Copy per sectie / pagina
 * - Doelgroepstrategie
 * - Tone of voice richtlijnen
 * - Paginastructuur en inhoud
 * - Fotografie- en motionrichtingen
 */

// ─────────────────────────────────────────────────────────────────────────────
// MERKIDENTITEIT
// ─────────────────────────────────────────────────────────────────────────────

export const brand = {
  name: "VDP Advies",
  tagline: "Vertrouwd in advies. Modern in samenwerking.",

  taglineVariants: [
    "Vertrouwd in advies. Modern in samenwerking.",
    "De rust van een gevestigd kantoor. De energie van een groeiplatform.",
    "Uw zekerheid, onze ambitie — samen vooruit.",
  ],

  /**
   * De centrale spanning die de hele site draagt:
   * VDP is EERST een gevestigd kantoor, DAARNA een platform.
   * Dit onderscheid moet op het eerste scherm direct zichtbaar zijn.
   */
  coreTension: {
    left: {
      label: "De zekerheid van een gevestigd kantoor",
      description:
        "Al meer dan 10 jaar vertrouwde partner voor ondernemers. Persoonlijk, direct en vakkundig in administratie en belastingadvies.",
      hoverExtra:
        "Wij kennen uw situatie, denken met u mee en zorgen dat u nooit voor verrassingen staat. Van jaarstukken tot strategisch gesprek.",
      cta: "Over VDP",
      link: "/over",
      visual: "Ondernemer en adviseur in persoonlijk gesprek — warm, vertrouwen, direct contact",
      weight: "equal", // beide panelen exact even groot en even prominent
    },
    right: {
      label: "De kracht van een modern platform",
      description:
        "Voor kantoren die willen groeien. Samen sterker — met behoud van eigen identiteit en ondernemersvrijheid.",
      hoverExtra:
        "Kennisdeling, centrale HR-ondersteuning, automatisering en een academy — zonder uw eigenheid te verliezen.",
      cta: "Ontdek het VDP-model",
      link: "/het-vdp-model",
      visual: "Jong team in samenwerking op moderne werkvloer — energie, ambitie, verbondenheid",
      weight: "equal", // beide panelen exact even groot en even prominent
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// DOELGROEPEN
// ─────────────────────────────────────────────────────────────────────────────

export const audiences = [
  {
    id: "clients",
    label: "Ondernemers & cliënten",
    priority: 1,
    need: "Een betrouwbaar, persoonlijk kantoor dat meedenkt",
    message: "Vertrouwen, overzicht en een directe lijn met uw adviseur",
    primaryCTA: "Plan een gesprek",
    tone: "warm, deskundig, helder, betrokken",
  },
  {
    id: "partners",
    label: "Administratiekantoren",
    priority: 2,
    need: "Groeien zonder identiteit te verliezen",
    message: "Behoud uw naam en cliënten — VDP regelt de rest",
    primaryCTA: "Ontdek het VDP-model",
    tone: "zakelijk, transparant, gelijkwaardig, eerlijk",
  },
  {
    id: "talent",
    label: "Potentiële medewerkers",
    priority: 3,
    need: "Een ambitieuze plek met ruimte voor groei",
    message: "Jong team, echte verantwoordelijkheid, zichtbare ontwikkeling",
    primaryCTA: "Bekijk vacatures",
    tone: "energiek, informeel-professioneel, menselijk, concreet",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HOMEPAGE — SECTIES (IN VOLGORDE)
// ─────────────────────────────────────────────────────────────────────────────

export const homepage = {
  /**
   * SECTIE 1 — HERO
   * Eerste scherm: twee panelen direct zichtbaar.
   * Bewegend beeld of subtiele videoloop op de achtergrond.
   */
  hero: {
    layout: "split-panel", // twee volledig gelijke panelen — 50/50, even groot, even prominent
    background: "video-loop of bewegend beeld met blauwe overlay",
    tagline: brand.tagline,
    leftPanel: brand.coreTension.left,
    rightPanel: brand.coreTension.right,
    motion: {
      type: "subtle video loop of CSS animation op achtergrond",
      overlay: "rgba(27, 47, 160, 0.65)",
      panelHover: "scale(1.01) + lichtere achtergrond, extra tekst zichtbaar",
    },
  },

  /**
   * SECTIE 2 — POSITIONERING
   * Kort en krachtig. Twee à drie zinnen max.
   */
  positioning: {
    heading: "Ervaring die u verder brengt. Een aanpak die past bij nu.",
    body: `VDP Advies combineert meer dan 10 jaar vakkennis met een frisse, moderne manier van werken.
Wij zijn er voor ondernemers die een betrouwbare sparringpartner zoeken —
en voor kantoren die samen sterker willen worden.`,
  },

  /**
   * SECTIE 3 — KERNWAARDEN
   * Vier blauwe kaarten (bestaand patroon — behouden en upgraden).
   */
  values: {
    heading: "Waar VDP voor staat",
    cards: [
      {
        title: "Betrouwbare sparringpartner",
        icon: "users",
        description: "Wij kennen uw situatie en denken altijd een stap verder mee.",
      },
      {
        title: "Onderscheidend vermogen",
        icon: "star",
        description: "Niet standaard. Wij zoeken actief naar de beste aanpak voor uw specifieke situatie.",
      },
      {
        title: "Afspraak is afspraak",
        icon: "check-circle",
        description: "Deadlines zijn geen stressfactor maar een vanzelfsprekendheid.",
      },
      {
        title: "Brede dienstverlening",
        icon: "layers",
        description: "Van dagelijkse administratie tot diepgaand belastingadvies — alles onder één dak.",
      },
    ],
  },

  /**
   * SECTIE 4 — AANGESLOTEN KANTOREN
   * BELANGRIJK: vroeg op de homepage, niet verborgen.
   * Toon als kwalitatieve, aantrekkelijke locaties — niet als namenlijst.
   */
  affiliatedFirms: {
    heading: "Kantoren die onderdeel zijn van VDP",
    subheading: "Sterke, onafhankelijke kantoren. Samen groter.",
    description:
      "VDP is meer dan één kantoor. Wij zijn een groep van professionele, kwalitatieve administratie- en adviesbureaus die samen optrekken — elk met eigen naam, eigen karakter en eigen cliënten.",
    displayStyle: "cards met foto van pand/werkruimte + naam + locatie",
    photoGuidance:
      "Mooie gevels, verzorgde entrees, lichte werkruimtes. Geen anonieme bedrijventerreinen. Locaties die vertrouwen en kwaliteit uitstralen.",
    cta: "Bekijk alle kantoren",
  },

  /**
   * SECTIE 5 — DIENSTEN PREVIEW
   * Niet tekstmuurachtig. Visueel, met foto's tussen blokken.
   */
  services: {
    heading: "Onze diensten",
    intro: "Voor elke ondernemer de juiste aanpak.",
    layout: "3-koloms cards met thumbnail",
    items: [
      {
        title: "Belastingadvies",
        icon: "calculator",
        description: "Fiscale kansen benutten en risico's beheersen. Persoonlijk, deskundig en proactief.",
        link: "/diensten/belastingadvies",
      },
      {
        title: "Accountancy & advisering",
        icon: "trending-up",
        description: "U bent druk met ondernemen. Wij zorgen voor overzicht, inzicht en continuïteit.",
        link: "/diensten/accountancy-advisering",
      },
      {
        title: "Estate planning",
        icon: "home",
        description: "Vermogensoverdracht fiscaal zo voordelig mogelijk geregeld — nu en bij overlijden.",
        link: "/diensten/estate-planning",
      },
      {
        title: "Rijksmonumenten",
        icon: "landmark",
        description: "Als eigenaar van een rijksmonument heeft u recht op bijzondere fiscale voordelen.",
        link: "/diensten/rijksmonumenten",
      },
      {
        title: "Vrije beroepen & medisch",
        icon: "briefcase",
        description: "Specialist op het gebied van vrije beroepen en medisch specialisten.",
        link: "/diensten/vrije-beroepen",
      },
      {
        title: "Begeleiding echtscheiding",
        icon: "shield",
        description: "Financieel en fiscaal inzicht in een moeilijke periode — helder en betrokken.",
        link: "/diensten/begeleiding-echtscheiding",
      },
    ],
    cta: "Bekijk alle diensten",
  },

  /**
   * SECTIE 6 — PLATFORM TEASER
   * Voor kantoren. Compact maar overtuigend.
   */
  platform: {
    heading: "Een nieuwe richting voor uw kantoor",
    subheading: "Zonder te verliezen wat het sterk maakt.",
    body: `Wilt u groeien, maar wilt u ook uw eigen naam en cliënten behouden?
Het VDP-model biedt administratiekantoren centrale ondersteuning op HR, recruitment,
kennisdeling, automatisering en vaktechniek — met behoud van uw identiteit en ondernemersvrijheid.`,
    benefits: [
      "Eigen naam & identiteit behouden",
      "Centrale HR & recruitment",
      "Kennisdeling & academy",
      "Automatisering & tooling",
      "Schaalvoordelen, persoonlijke aanpak",
      "Zekerheid voor continuïteit",
    ],
    steps: [
      { number: "01", title: "Samenwerken", body: "U behoudt uw identiteit. VDP ondersteunt op de achtergrond." },
      { number: "02", title: "Groeien", body: "Centrale ondersteuning vergroot uw slagkracht." },
      { number: "03", title: "Zekerheid voor later", body: "Een duurzame toekomst voor uw kantoor en cliënten." },
    ],
    ctas: ["Ontdek het VDP-model", "Ik ben geïnteresseerd"],
  },

  /**
   * SECTIE 7 — WERKEN BIJ (teaser)
   */
  workAt: {
    heading: "Groei mee met een ambitieus team",
    body: `Jong, deskundig en verbonden. Bij VDP werk je in een omgeving waar initiatief wordt beloond,
kennisdeling centraal staat en je zichtbaar groeit — als professional én als persoon.`,
    photosNeeded: [
      "Heel team op teamdag of uitje",
      "Collega's die lachen en samenwerken",
      "Informeel overleg bij koffie",
      "Iemand die presenteert of iets uitlegt",
    ],
    ctas: ["Bekijk vacatures", "Leven bij VDP"],
    tone: "energiek, menselijk, ambitieus, niet overdreven hip",
  },

  /**
   * SECTIE 8 — SOCIAL PROOF
   */
  socialProof: {
    quote:
      "Door aan te sluiten bij VDP hebben we onze eigen identiteit behouden én onze slagkracht verdubbeld. De ondersteuning in HR en tooling maakt het verschil.",
    source: "Directeur, aangesloten administratiekantoor",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGINA: OVER VDP
// ─────────────────────────────────────────────────────────────────────────────

export const pageOver = {
  hero: {
    heading: "Meer dan 10 jaar vertrouwde partner",
    sub: "Betrouwbaar, betrokken en direct — voor ondernemers die het beste willen.",
    visual: "Foto van het VDP-team of kantoor — warm, licht, professioneel",
  },
  sections: [
    {
      id: "who-we-are",
      heading: "Wie wij zijn",
      body: `VDP Advies is al meer dan 10 jaar een advieskantoor op het gebied van belastingadvies en accountancy.
Vanuit onze vestigingen in Bussum, Hilversum en Amsterdam bedienen wij een gevarieerd cliëntenpakket,
voornamelijk gericht op de zakelijke MKB-markt en particulieren.

We zijn een laagdrempelige organisatie die haar cliënten serieus neemt.
Uw belang staat bij ons centraal. Niet als slogan, maar als werkwijze.`,
    },
    {
      id: "values",
      heading: "Waar wij voor staan",
      pillars: [
        { title: "Wederzijds vertrouwen", body: "De basis van elke goede samenwerking." },
        { title: "Direct en bereikbaar", body: "Gewoon bellen. Wij zijn er." },
        { title: "Afspraak is afspraak", body: "Geen verrassingen. Wél duidelijkheid." },
        { title: "Slim georganiseerd", body: "Moderne tooling, efficiënte processen." },
      ],
    },
    {
      id: "cta",
      heading: "Kennismaken?",
      body: "Wij denken graag met u mee. Zonder verplichtingen.",
      cta: "Plan een gesprek",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGINA: HET VDP-MODEL
// ─────────────────────────────────────────────────────────────────────────────

export const pageModel = {
  hero: {
    heading: "Het VDP-model",
    sub: "Voor kantoren die willen groeien zonder te verliezen wat hen sterk maakt.",
  },
  intro: `Aansluiten bij VDP betekent niet opgeven. Het betekent versterken.
U behoudt uw naam, uw cliënten en uw manier van werken.
VDP biedt de ruggengraat: ondersteuning, kennis, tooling en zekerheid voor de lange termijn.`,

  steps: [
    {
      number: "01",
      title: "Samenwerken",
      body: `U behoudt uw identiteit en ondernemerschap volledig.
VDP ondersteunt op de achtergrond — op het moment dat u er behoefte aan heeft.
Geen opgelegde aanpak. Wel een sterke basis.`,
      icon: "handshake",
    },
    {
      number: "02",
      title: "Groeien",
      body: `Door centrale ondersteuning vergroot u uw slagkracht op HR, recruitment,
kennisdeling, automatisering en vaktechnische ontwikkeling.
U kunt doen waar u goed in bent — beter, en met minder ruis.`,
      icon: "trending-up",
    },
    {
      number: "03",
      title: "Zekerheid voor later",
      body: `U bouwt aan iets dat blijft. Voor uw cliënten, uw medewerkers en uzelf.
Het VDP-model biedt een heldere, transparante basis voor continuïteit en overdracht —
op uw eigen tempo en voorwaarden.`,
      icon: "shield-check",
    },
  ],

  foundation: {
    heading: "De basis van onze samenwerking",
    principles: [
      "Vertrouwen en transparantie als vertrekpunt",
      "Duidelijke afspraken — zeggen wat je doet, doen wat je zegt",
      "Professioneel gelijkwaardig partnerschap",
      "Identiteit en eigenheid volledig behouden",
      "Openheid voor ontwikkeling en groei",
    ],
  },

  ctas: ["Plan een gesprek", "Kennismaken met ons model"],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGINA: WERKEN BIJ
// ─────────────────────────────────────────────────────────────────────────────

export const pageWerkenBij = {
  hero: {
    heading: "Werk ergens waar je écht groeit",
    sub: "Jong team. Echte verantwoordelijkheid. Ruimte voor initiatief.",
    visual: "Energieke teamfoto — lachend, informeel professioneel, moderne omgeving",
  },
  intro: `Bij VDP Advies doe je meer dan uitvoeren. Je denkt mee, je bouwt mee en je groeit mee.
In een ambitieus, hecht team dat elkaar kent en waardeert.`,
  pillars: [
    { icon: "zap", title: "Ambitie en groei", body: "Je krijgt ruimte om te ontwikkelen — en we investeren daarin." },
    { icon: "users", title: "Echt een team", body: "Geen anonieme collega's. Mensen die je kent en op kunt bouwen." },
    { icon: "book-open", title: "Continu leren", body: "VDP Academy, collegiale kennisdeling en vakinhoudelijke verdieping." },
    { icon: "smile", title: "Leuke sfeer", body: "Teamdagen, uitjes, samen koken en lachen. Zo hoort het." },
  ],
  photosNeeded: [
    "Team op uitje of activiteit — buiten, actief, lachend",
    "Collega's die samenwerken aan bureau of tafel",
    "Iemand die iets presenteert of uitlegt aan collega's",
    "Informeel moment: koffie, lunch, gang",
    "Portret van individuele medewerker — betrokken, open blik",
  ],
  ctas: ["Bekijk vacatures", "Stuur een open sollicitatie"],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGINA: CONTACT
// ─────────────────────────────────────────────────────────────────────────────

export const pageContact = {
  heading: "Neem contact op",
  subheading: "Wij zijn er voor u. Direct, persoonlijk en zonder omwegen.",
  offices: [
    {
      name: "Kantoor Bussum",
      address: "Meerweg 45",
      postcode: "1405 BD Bussum",
      tel: "035-6956900",
      fax: "035-6956969",
      email: "info@vdpadvies.nl",
    },
    {
      name: "Kantoor Hilversum",
      address: "Melkpad 20a",
      postcode: "1217 KC Hilversum",
      tel: "035-6980414",
      fax: "035-6982154",
      email: "info@vdpadvies.nl",
    },
    {
      name: "Kantoor Amsterdam",
      address: "Keizersgracht 387D",
      postcode: "1016 EJ Amsterdam",
      email: "info@vdpadvies.nl",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// TONE OF VOICE
// ─────────────────────────────────────────────────────────────────────────────

export const toneOfVoice = {
  summary: "Professioneel maar menselijk. Concreet en direct. Nooit stoffig.",
  rules: [
    "Schrijf in duidelijk, correct Nederlands",
    "Gebruik 'u' voor cliënten en zakelijke context",
    "Gebruik 'je/jij' in employer branding en platform-context",
    "Zinnen kort: max 20 woorden in koppen",
    "Actieve schrijfstijl: 'Wij regelen het' niet 'Er wordt gezorgd voor'",
    "Eén vet/italic sleutelwoord per headlineregel (zoals bestaand patroon)",
  ],
  avoid: [
    "ontzorgen",
    "passie",
    "one-stop-shop",
    "proactief (tenzij concreet)",
    "totaaloplossing",
    "maatwerk (te generiek)",
    "wij staan voor u klaar",
  ],
  examples: {
    bad: "Wij ontzorgen u volledig met passie en maatwerk.",
    good: "Wij regelen uw administratie. Zodat u zich kunt richten op ondernemen.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// VISUAL DIRECTION (voor beeldselectie en fotoshoot)
// ─────────────────────────────────────────────────────────────────────────────

export const visualDirection = {
  summary: "Vibrant, motionful, menselijk. Veel lachende jonge gezichten en werkende mensen.",
  photoSubjects: [
    "Ondernemer en adviseur in direct, warm gesprek",
    "Jong team dat samenwerkt — actief, niet poserend",
    "Lachende collega's bij koffie of lunch",
    "Iemand die presenteert of iets uitlegt",
    "Teamdag, uitje, buiten activiteit",
    "Mooie kantoorlocatie — gevel, entree, lichte werkruimte",
    "Portret medewerker — open, betrokken, direct",
  ],
  avoidInPhotos: [
    "Steriele witte studiobeelden",
    "Gestijfde poseerfotos",
    "Anonieme bedrijventerrein-locaties",
    "Stockbeelden die niet van VDP zijn",
    "Beelden buiten de blauwe kleursfeer",
  ],
  colorTreatment: "Blauwe overlay op foto's: rgba(27, 47, 160, 0.65–0.80)",
  motion: {
    hero: "Subtiele videoloop of CSS motion op achtergrond",
    cards: "Hover: translateY(-4px), 200ms ease-out",
    entrance: "Fade + translateY(24px→0), 500ms, stagger 80ms",
    nav: "Transparant → wit bij scrollen > 80px, 300ms",
  },
};

export default {
  brand,
  audiences,
  homepage,
  pageOver,
  pageModel,
  pageWerkenBij,
  pageContact,
  toneOfVoice,
  visualDirection,
};
