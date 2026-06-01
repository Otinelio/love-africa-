export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  soldOut?: boolean;
};

export const MENU_CATEGORIES = [
  { id: "plats", label: "Plats Africains", icon: "Utensils" },
  { id: "fastfood", label: "Fast-Food", icon: "Sandwich" },
  { id: "grillades", label: "Grillades", icon: "Flame" },
  { id: "cocktails", label: "Cocktails", icon: "Martini" },
  { id: "softs", label: "Softs", icon: "GlassWater" },
  { id: "bieres", label: "Bières", icon: "Beer" },
  { id: "champagne", label: "Champagne", icon: "Wine" },
];

const img = (q: string) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=900&q=70`;

export const SEED_MENU: MenuItem[] = [
  // PLATS
  { id: "p1", category: "plats", name: "Fufu + sauce pistache", description: "Spécialité maison, sauce onctueuse aux graines de pistache.", price: 3500, image: img("photo-1604329760661-e71dc83f8f26"), available: true },
  { id: "p2", category: "plats", name: "Riz sauce arachide", description: "Riz parfumé, sauce arachide traditionnelle.", price: 2500, image: img("photo-1604908176997-125f25cc6f3d"), available: true },
  { id: "p3", category: "plats", name: "Poulet DG", description: "Poulet sauté, plantains mûrs, légumes croquants.", price: 4000, image: img("photo-1532550907401-a500c9a57435"), available: true },
  { id: "p4", category: "plats", name: "Attiéké poisson braisé", description: "Semoule de manioc, poisson braisé au feu de bois.", price: 3000, image: img("photo-1565299624946-b28f40a0ae38"), available: true },
  { id: "p5", category: "plats", name: "Aloko poulet", description: "Bananes plantains frites, poulet épicé.", price: 2500, image: img("photo-1606755962773-d324e0a13086"), available: true },
  { id: "p6", category: "plats", name: "Jollof rice", description: "Le riz signature de l'Afrique de l'Ouest.", price: 2500, image: img("photo-1604329760661-e71dc83f8f26"), available: true },
  { id: "p7", category: "plats", name: "Brochettes de bœuf", description: "Marinade maison aux épices africaines.", price: 3000, image: img("photo-1529193591184-b1d58069ecdd"), available: true },
  // FAST FOOD
  { id: "f1", category: "fastfood", name: "Burger Love Africa", description: "Notre burger signature, sauce maison.", price: 3500, image: img("photo-1568901346375-23c9450c58cd"), available: true },
  { id: "f2", category: "fastfood", name: "Shawarma", description: "Pain libanais, viande grillée, sauce yaourt.", price: 2500, image: img("photo-1561651823-34feb02250e4"), available: true },
  { id: "f3", category: "fastfood", name: "Pizza 4 fromages", description: "Mozzarella, gorgonzola, parmesan, chèvre.", price: 5000, image: img("photo-1574071318508-1cdbab80d002"), available: true },
  { id: "f4", category: "fastfood", name: "Frites maison", description: "Pommes de terre fraîches, double cuisson.", price: 1500, image: img("photo-1573080496219-bb080dd4f877"), available: true },
  { id: "f5", category: "fastfood", name: "Hot dog", description: "Saucisse premium, sauce maison.", price: 2000, image: img("photo-1612392062798-2b4708dc73a8"), available: true },
  // GRILLADES
  { id: "g1", category: "grillades", name: "Poulet braisé entier", description: "Mariné 24h, cuit au feu de bois.", price: 7000, image: img("photo-1598103442097-8b74394b95c6"), available: true },
  { id: "g2", category: "grillades", name: "Côtes de porc grillées", description: "Marinade épicée, accompagnement au choix.", price: 5000, image: img("photo-1544025162-d76694265947"), available: true },
  { id: "g3", category: "grillades", name: "Poisson braisé entier", description: "Pêche du jour, grillé aux herbes africaines.", price: 6000, image: img("photo-1535140728325-a4d3707eee94"), available: true },
  { id: "g4", category: "grillades", name: "Brochettes mixtes", description: "Bœuf, poulet, agneau marinés.", price: 4500, image: img("photo-1555939594-58d7cb561ad1"), available: true },
  // COCKTAILS
  { id: "c1", category: "cocktails", name: "Cocktail Love Africa", description: "Notre signature — fruits exotiques, rhum, épices.", price: 3500, image: img("photo-1551024601-bec78aea704b"), available: true },
  { id: "c2", category: "cocktails", name: "Mojito", description: "Rhum, menthe fraîche, citron vert.", price: 3000, image: img("photo-1551538827-9c037cb4f32a"), available: true },
  { id: "c3", category: "cocktails", name: "Piña Colada", description: "Rhum, ananas, lait de coco.", price: 3000, image: img("photo-1587223962930-cb7f31384c19"), available: true },
  { id: "c4", category: "cocktails", name: "Sex on the Beach", description: "Vodka, pêche, jus de fruits.", price: 3500, image: img("photo-1536935338788-846bb9981813"), available: true },
  { id: "c5", category: "cocktails", name: "Daiquiri Fraise", description: "Rhum, fraises fraîches, sucre.", price: 3000, image: img("photo-1514362545857-3bc16c4c7d1b"), available: true },
  { id: "c6", category: "cocktails", name: "Long Island", description: "Le cocktail puissant des connaisseurs.", price: 4000, image: img("photo-1470337458703-46ad1756a187"), available: true },
  // SOFTS
  { id: "s1", category: "softs", name: "Eau minérale", description: "50cl bien fraîche.", price: 500, image: img("photo-1559839734-2b71ea197ec2"), available: true },
  { id: "s2", category: "softs", name: "Jus de gingembre", description: "Préparation maison piquante.", price: 1000, image: img("photo-1546171753-97d7676e4602"), available: true },
  { id: "s3", category: "softs", name: "Bissap", description: "Infusion de fleurs d'hibiscus, sucre, menthe.", price: 1000, image: img("photo-1556679343-c7306c1976bc"), available: true },
  { id: "s4", category: "softs", name: "Sodas (Coca, Fanta, Sprite)", description: "Au choix, bien frais.", price: 800, image: img("photo-1554866585-cd94860890b7"), available: true },
  { id: "s5", category: "softs", name: "Jus de fruits", description: "Frais pressés du jour.", price: 1200, image: img("photo-1600271886742-f049cd451bba"), available: true },
  // BIERES
  { id: "b1", category: "bieres", name: "Flag", description: "La bière classique du Togo.", price: 1000, image: img("photo-1608270586620-248524c67de9"), available: true },
  { id: "b2", category: "bieres", name: "Bock", description: "Bière forte locale.", price: 1200, image: img("photo-1535958636474-b021ee887b13"), available: true },
  { id: "b3", category: "bieres", name: "Castel", description: "Bière premium d'Afrique.", price: 1000, image: img("photo-1566633806327-68e152aaf26d"), available: true },
  { id: "b4", category: "bieres", name: "Bière importée", description: "Sélection internationale.", price: 2000, image: img("photo-1618183479302-1e0aa382c36b"), available: true },
  // CHAMPAGNE
  { id: "ch1", category: "champagne", name: "Champagne (bouteille)", description: "Pour célébrer comme il se doit.", price: 35000, image: img("photo-1592861956120-e524fc739696"), available: true },
  { id: "ch2", category: "champagne", name: "Whisky verre", description: "Sélection premium au verre.", price: 3500, image: img("photo-1527281400683-1aae777175f8"), available: true },
  { id: "ch3", category: "champagne", name: "Rhum verre", description: "Rhum vieilli, dégustation.", price: 2500, image: img("photo-1514218953589-2d7d37efd2dc"), available: true },
];

export type EventItem = {
  id: string;
  title: string;
  date: string; // ISO
  artist: string;
  description: string;
  image: string;
  capacity: number;
  rsvpActive: boolean;
  past?: boolean;
};

export const SEED_EVENTS: EventItem[] = [
  { id: "e1", title: "Afro Night DJ Session", date: "2026-06-12T22:00:00", artist: "DJ Kwamé", description: "Une nuit afrobeat & amapiano non-stop.", image: img("photo-1571266028243-d220bc562b1a"), capacity: 200, rsvpActive: true },
  { id: "e2", title: "Open Mic Special", date: "2026-06-18T20:30:00", artist: "Talents Lomé", description: "Slam, rap, chant — la scène est à vous.", image: img("photo-1493225457124-a3eb161ffa5f"), capacity: 120, rsvpActive: true },
  { id: "e3", title: "Super Chef RCA — Finale", date: "2026-06-25T19:00:00", artist: "Chefs invités", description: "La grande finale de notre compétition culinaire.", image: img("photo-1556910103-1c02745aae4d"), capacity: 150, rsvpActive: true },
  { id: "e4", title: "Soirée Coupé-Décalé", date: "2026-05-15T22:00:00", artist: "DJ Mix", description: "Retour en images sur une nuit légendaire.", image: img("photo-1429962714451-bb934ecdc4ec"), capacity: 200, rsvpActive: false, past: true },
  { id: "e5", title: "Live Band Africa", date: "2026-05-01T21:00:00", artist: "Afro Roots", description: "Concert acoustique inoubliable.", image: img("photo-1459749411175-04bf5292ceea"), capacity: 180, rsvpActive: false, past: true },
];

export type GalleryItem = { id: string; url: string; category: string; alt: string };

export const SEED_GALLERY: GalleryItem[] = [
  { id: "ga1", category: "ambiance", url: img("photo-1517248135467-4c7edcad34c4"), alt: "Ambiance lounge" },
  { id: "ga2", category: "cocktails", url: img("photo-1551024601-bec78aea704b"), alt: "Cocktail signature" },
  { id: "ga3", category: "cuisine", url: img("photo-1604329760661-e71dc83f8f26"), alt: "Plat africain" },
  { id: "ga4", category: "nuit", url: img("photo-1571266028243-d220bc562b1a"), alt: "Soirée DJ" },
  { id: "ga5", category: "evenements", url: img("photo-1493225457124-a3eb161ffa5f"), alt: "Concert live" },
  { id: "ga6", category: "ambiance", url: img("photo-1414235077428-338989a2e8c0"), alt: "Lounge lights" },
  { id: "ga7", category: "cocktails", url: img("photo-1470337458703-46ad1756a187"), alt: "Long Island" },
  { id: "ga8", category: "cuisine", url: img("photo-1565299624946-b28f40a0ae38"), alt: "Attiéké" },
  { id: "ga9", category: "nuit", url: img("photo-1429962714451-bb934ecdc4ec"), alt: "Crowd nightclub" },
  { id: "ga10", category: "evenements", url: img("photo-1556910103-1c02745aae4d"), alt: "Chef compétition" },
  { id: "ga11", category: "ambiance", url: img("photo-1525268323446-0505b6fe7778"), alt: "Bar lights" },
  { id: "ga12", category: "cocktails", url: img("photo-1551538827-9c037cb4f32a"), alt: "Mojito" },
];

export const GALLERY_FILTERS = [
  { id: "all", label: "Tous" },
  { id: "ambiance", label: "Ambiance" },
  { id: "cuisine", label: "Cuisine" },
  { id: "cocktails", label: "Cocktails" },
  { id: "evenements", label: "Événements" },
  { id: "nuit", label: "Nuit" },
];

export const WHATSAPP = "22893231173";
export const WA_LINK = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export const fmtFCFA = (n: number) => `${n.toLocaleString("fr-FR")} FCFA`;
