export interface MenuItem {
  id: string;
  name: string;
  category: "bakery" | "coffee" | "cold-drinks" | "brunch" | "salads";
  description: string;
  priceNgn?: number;
  priceNote?: string;
  isVerifiedPrice: boolean;
  isSignature?: boolean;
  dietary?: string[];
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "space" | "coffee" | "bakery" | "brunch" | "moments" | "kinderhome";
  categoryLabel: string;
  aspect: "portrait" | "landscape" | "square";
  image: string;
  caption: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

import { MEDIA_ASSETS } from "./media-assets";
export { MEDIA_ASSETS };

export { SITE_CONFIG } from "./site-config";

import {
  MASTER_MENU_ITEMS,
  MENU_CATEGORIES,
  MENU_MACRO_GROUPS,
  formatNaira,
  getFeaturedMenuItems,
  MenuItemRecord,
  MenuMacroGroup,
  MenuCategoryId,
} from "./menu-data";

export {
  MASTER_MENU_ITEMS,
  MENU_CATEGORIES,
  MENU_MACRO_GROUPS,
  formatNaira,
  getFeaturedMenuItems,
};
export type { MenuItemRecord, MenuMacroGroup, MenuCategoryId };

// Backwards-compatible legacy bridge mapped directly from the single source of truth MASTER_MENU_ITEMS
export const MENU_ITEMS: MenuItem[] = MASTER_MENU_ITEMS.map((item) => {
  let legacyCat: "bakery" | "coffee" | "cold-drinks" | "brunch" | "salads" = "bakery";
  if (item.macroGroup === "coffee-drinks") {
    legacyCat = item.categoryId === "hot-drinks" ? "coffee" : "cold-drinks";
  } else if (item.macroGroup === "food-savoury") {
    legacyCat = item.categoryId === "salads" ? "salads" : "brunch";
  } else {
    legacyCat = "bakery";
  }

  return {
    id: item.id,
    name: item.name,
    category: legacyCat,
    description: item.description || "",
    priceNgn: item.priceNgn !== null ? item.priceNgn : undefined,
    priceNote: item.priceNote || (item.priceConfirmed ? undefined : "Price upon confirmation"),
    isVerifiedPrice: item.priceConfirmed,
    isSignature: item.isSignature,
    dietary: item.dietary,
    image: item.image || MEDIA_ASSETS.heroSecondary,
  };
});

export const GALLERY_ITEMS: GalleryItem[] = [
  // ── INTERIOR & SPACE ──────────────────────────────────────────────
  {
    id: "gal-1",
    title: "The Main Dining Room & Morning Daylight",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/interior/684346143_18008455493854706_747260011986287000_n.webp",
    caption:
      "Natural ash timber tables, textured upholstery, and morning light flooding through Sasegbon Street windows.",
  },
  {
    id: "gal-2",
    title: "The Quiet Banquette Corners",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/interior/681051026_18008455484854706_3920163127654499683_n.webp",
    caption:
      "Curved booths and soft lighting engineered for unhurried conversations and long, working mornings.",
  },
  {
    id: "gal-3",
    title: "The Travertine Espresso Bar",
    category: "space",
    categoryLabel: "The Space",
    aspect: "landscape",
    image: "/images/interior/681292662_18008455514854706_4910375475797540830_n.webp",
    caption:
      "Precision extraction and single-origin beans pulled on our custom travertine counter.",
  },
  {
    id: "gal-4",
    title: "Warm Interior Light & Timber",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/interior/681376423_18008455652854706_386778048630634911_n.webp",
    caption:
      "Warm pendant lamps cast amber pools across raw timber joinery — the quiet soul of BRÜN.",
  },
  {
    id: "gal-5",
    title: "Details in the Architecture",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/interior/681979334_18008455661854706_7082734117540359769_n.webp",
    caption:
      "Carefully chosen ceramics, unpolished stone surfaces, and considered light throughout the café.",
  },
  {
    id: "gal-6",
    title: "The Dining Room in Full",
    category: "space",
    categoryLabel: "The Space",
    aspect: "landscape",
    image: "/images/interior/682142006_18008455643854706_2181143260086995717_n.webp",
    caption:
      "Open-plan layout framed by arched windows and muted tones — a space built for lingering.",
  },
  {
    id: "gal-7",
    title: "The Shaded Outdoor Patio",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/interior/682446864_18008455688854706_4294520458666325932_n.webp",
    caption:
      "Al fresco dining under classic canvas awnings in the peaceful, gated Ikeja GRA compound.",
  },
  {
    id: "gal-8",
    title: "The Storefront & Greenery",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/interior/680879817_18008455670854706_76867873847723268_n.webp",
    caption:
      "Arriving at 9 Sasegbon Street — architectural façade, lush garden, and shaded entrance.",
  },
  {
    id: "gal-9",
    title: "Evening Light in the Dining Room",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/interior/684677260_18008455631854706_1264403882099556184_n.webp",
    caption:
      "As the afternoon fades, BRÜN transforms into a warm amber glow, perfect for dinner and slow evenings.",
  },

  // ── GALLERY COLLECTION ────────────────────────────────────────────
  {
    id: "gal-10",
    title: "Gallery — Study in Light",
    category: "moments",
    categoryLabel: "Atmosphere & Moments",
    aspect: "portrait",
    image: "/images/gallery/682142006_18008455643854706_2181143260086995717_n.webp",
    caption:
      "Light and shadow playing across the dining room — a visual study in the textures of BRÜN.",
  },
  {
    id: "gal-11",
    title: "The Counter Edit",
    category: "bakery",
    categoryLabel: "Bakery & Viennoiserie",
    aspect: "portrait",
    image: "/images/gallery/849773003_18468025666189549_8486634345422892628_n.webp",
    caption:
      "An editorial portrait of the bakery counter — golden, abundant, and freshly arranged.",
  },
  {
    id: "gal-12",
    title: "Morning Rituals",
    category: "moments",
    categoryLabel: "Atmosphere & Moments",
    aspect: "portrait",
    image: "/images/gallery/849891037_18468025729189549_4936899911133302784_n.webp",
    caption:
      "The quiet ritual of an early BRÜN morning before the café fills — still, warm, unhurried.",
  },
  {
    id: "gal-13",
    title: "Pastry & Afternoon Light",
    category: "bakery",
    categoryLabel: "Bakery & Viennoiserie",
    aspect: "portrait",
    image: "/images/gallery/850319361_18468025564189549_6377873158067062259_n.webp",
    caption:
      "An afternoon arrangement of pastries in natural light — buttery, burnished, unhurried.",
  },
  {
    id: "gal-14",
    title: "The Full Spread",
    category: "brunch",
    categoryLabel: "All-Day Brunch",
    aspect: "portrait",
    image: "/images/gallery/850906896_18468025690189549_8613575650236309014_n.webp",
    caption:
      "Sharing plates, fresh pours, and house-made accompaniments across the BRÜN brunch table.",
  },
  {
    id: "gal-15",
    title: "Delicate Plating",
    category: "brunch",
    categoryLabel: "All-Day Brunch",
    aspect: "portrait",
    image: "/images/gallery/851100124_18468025768189549_3824252105681539468_n.webp",
    caption:
      "Every plate at BRÜN is considered — balanced, beautiful, and built for the dining experience.",
  },
  {
    id: "gal-16",
    title: "Warm Colour & Texture",
    category: "moments",
    categoryLabel: "Atmosphere & Moments",
    aspect: "portrait",
    image: "/images/gallery/851718512_18468025807189549_5529113632295871077_n.webp",
    caption:
      "Warm terracotta, deep espresso tones, and linen textures — the material palette of BRÜN.",
  },
  {
    id: "gal-17",
    title: "Coffee Culture",
    category: "coffee",
    categoryLabel: "Specialty Espresso",
    aspect: "portrait",
    image: "/images/gallery/851800372_18468025606189549_9027766863970987283_n.webp",
    caption:
      "The craft of specialty coffee — single-origin, carefully dosed, and made to slow you down.",
  },
  {
    id: "gal-18",
    title: "Sweet Details",
    category: "bakery",
    categoryLabel: "Bakery & Viennoiserie",
    aspect: "portrait",
    image: "/images/gallery/854479433_18468025852189549_6071035644063102622_n.webp",
    caption:
      "A close study of pastry craft — glazed layers, dusted finishes, and careful decoration.",
  },
  {
    id: "gal-19",
    title: "The Artisan Larder",
    category: "bakery",
    categoryLabel: "Bakery & Viennoiserie",
    aspect: "portrait",
    image: "/images/gallery/854735087_18468025756189549_6498898986577196550_n.webp",
    caption:
      "Generous loaves, cakes, and confectionery — the full BRÜN bakery larder on display.",
  },
  {
    id: "gal-20",
    title: "Evening Atmosphere",
    category: "moments",
    categoryLabel: "Atmosphere & Moments",
    aspect: "portrait",
    image: "/images/gallery/855484958_18468025714189549_3997649829273713253_n.webp",
    caption:
      "BRÜN after hours — the warm amber of evening light across empty chairs and candlelight.",
  },
  {
    id: "gal-21",
    title: "Alfresco Moments",
    category: "moments",
    categoryLabel: "Atmosphere & Moments",
    aspect: "portrait",
    image: "/images/gallery/857070476_18468025837189549_7745344324560558695_n.webp",
    caption:
      "Patio life in Ikeja GRA — the garden terrace alive with conversation and afternoon coffee.",
  },

  // ── MENU & FOOD ───────────────────────────────────────────────────
  {
    id: "gal-22",
    title: "Morning Pastry Showcase",
    category: "bakery",
    categoryLabel: "Bakery & Viennoiserie",
    aspect: "portrait",
    image: "/images/menu/SaveClip.App_860020752_18113829017104627_9015376755320668436_n.webp",
    caption:
      "Golden French butter croissants, glazed fruit tarts, and daily bakes in our counter display.",
  },
  {
    id: "gal-23",
    title: "Flaky Golden Croissants",
    category: "bakery",
    categoryLabel: "Bakery & Viennoiserie",
    aspect: "square",
    image: "/images/menu/SaveClip.App_888778414_18113829008104627_6332187433577426134_n.webp",
    caption:
      "Fresh from the oven — golden honeycomb layers of classic French viennoiserie.",
  },
  {
    id: "gal-24",
    title: "Brunch & Table Service",
    category: "brunch",
    categoryLabel: "All-Day Brunch",
    aspect: "portrait",
    image: "/images/menu/SaveClip.App_888505293_18113829035104627_7268554007353652308_n.webp",
    caption:
      "Full table service featuring signature breakfasts, poached eggs, and fresh artisanal toast.",
  },
  {
    id: "gal-25",
    title: "Korintje Cinnamon Rolls",
    category: "bakery",
    categoryLabel: "Bakery & Viennoiserie",
    aspect: "square",
    image: "/images/menu/SaveClip.App_888740528_18113829083104627_4556047435483886719_n.webp",
    caption:
      "Our signature cinnamon brioche swirled with Korintje spice and house-made vanilla glaze.",
  },
  {
    id: "gal-26",
    title: "Cake & Confectionery Display",
    category: "bakery",
    categoryLabel: "Bakery & Viennoiserie",
    aspect: "portrait",
    image: "/images/menu/SaveClip.App_890020227_18113829080104627_1744395925879195052_n.webp",
    caption:
      "Layered cakes, cheesecakes, and seasonal confectionery prepared daily by our pastry chef.",
  },
  {
    id: "gal-27",
    title: "Savoury Brunch Plate",
    category: "brunch",
    categoryLabel: "All-Day Brunch",
    aspect: "portrait",
    image: "/images/menu/SaveClip.App_888032776_18113829044104627_1300145488063310653_n.webp",
    caption:
      "Beautifully plated all-day brunch — fresh, seasonal, and made to be savoured slowly.",
  },

  // ── KINDERHOME & MOMENTS ──────────────────────────────────────────
  {
    id: "gal-28",
    title: "Kinderhome Soft Play Sanctuary",
    category: "moments",
    categoryLabel: "Atmosphere & Moments",
    aspect: "portrait",
    image: "/images/kinderhome/849891037_18468025729189549_4936899911133302784_n.webp",
    caption:
      "The dedicated indoor Kinderhome play space — where children explore, slide, and belong.",
  },
  {
    id: "gal-29",
    title: "The BRÜN Brand in Colour",
    category: "moments",
    categoryLabel: "Atmosphere & Moments",
    aspect: "square",
    image: "/images/gallery/850319361_18468025564189549_6377873158067062259_n.webp",
    caption:
      "BRÜN's warm espresso palette expressed through brand, light, and the texture of the space.",
  },

  // ── NEW IMAGES ────────────────────────────────────────────────────

  // Exterior & Façade
  {
    id: "gal-30",
    title: "The BRÜN Façade at Golden Hour",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/gallery/SaveClip.App_869828931_18111814496104627_5985364454892204092_n.webp",
    caption:
      "The full BRÜN frontage at dusk — terracotta render, cream awnings, and outdoor seating lit by the last of the day.",
  },
  {
    id: "gal-31",
    title: "Wide View — The Full Building",
    category: "space",
    categoryLabel: "The Space",
    aspect: "landscape",
    image: "/images/gallery/SaveClip.App_874881060_18111814517104627_2254249800278409551_n.webp",
    caption:
      "BRÜN from across the forecourt — five arched bays of glass, awnings rolling out to the street, tables set and waiting.",
  },
  {
    id: "gal-32",
    title: "Outdoor Patio — Close Study",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/gallery/SaveClip.App_868901234_18111814562104627_3300694066227047454_n.webp",
    caption:
      "Rattan-weave armchairs and teak tables on the terrace — an invitation to slow down before you even step inside.",
  },
  {
    id: "gal-33",
    title: "Street Façade — Opening Day",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/brand/outdoor-view.webp",
    caption:
      "The BRÜN signage seen from the street — classic cream awnings and floor-to-ceiling glass that keeps the café light and open.",
  },
  {
    id: "gal-34",
    title: "Instagram QR at the Window",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/gallery/SaveClip.App_863242756_18111814544104627_6571545532034870799_n.webp",
    caption:
      "The storefront at dusk, the BRÜN Instagram QR card propped in the window — a sky of cloud and amber behind it.",
  },

  // Coffee & Takeaway
  {
    id: "gal-35",
    title: "BRÜN Your Day — Takeaway Cup",
    category: "coffee",
    categoryLabel: "Specialty Espresso",
    aspect: "portrait",
    image: "/images/gallery/SaveClip.App_847679783_18109013699104627_2444784658529106943_n.webp",
    caption:
      "A guest holds the signature BRÜN takeaway cup — \"BRÜN your day\" — in front of the warm golden counter.",
  },
  {
    id: "gal-36",
    title: "Cup in Hand — Counter Light",
    category: "coffee",
    categoryLabel: "Specialty Espresso",
    aspect: "portrait",
    image: "/images/gallery/SaveClip.App_847847776_18109013729104627_9039585079149482745_n.webp",
    caption:
      "The branded takeaway cup held at the espresso bar — warm backlit shelves and the hum of the café behind.",
  },

  // Brunch & Food Moments
  {
    id: "gal-37",
    title: "The First Bite",
    category: "brunch",
    categoryLabel: "All-Day Brunch",
    aspect: "portrait",
    image: "/images/gallery/SaveClip.App_856714946_18110163371104627_8707496508969892611_n.webp",
    caption:
      "A guest savours the first bite of a BRÜN sandwich — fresh salad greens and cherry tomatoes on the board beside her.",
  },
  {
    id: "gal-38",
    title: "Sandwich & Greek Salad",
    category: "brunch",
    categoryLabel: "All-Day Brunch",
    aspect: "portrait",
    image: "/images/gallery/SaveClip.App_858050112_18110163308104627_1091454354273596728_n.webp",
    caption:
      "The brunch combination — artisan sandwich on a wooden board with a generous Greek salad, in the airy BRÜN dining room.",
  },

  // The Team
  {
    id: "gal-39",
    title: "The Front-of-House Team",
    category: "moments",
    categoryLabel: "Atmosphere & Moments",
    aspect: "landscape",
    image: "/images/gallery/SaveClip.App_876028100_18112999658104627_2033871046466919228_n.webp",
    caption:
      "BRÜN's front-of-house family — tan aprons, warm smiles, and a pride in the hospitality they deliver every morning.",
  },
  {
    id: "gal-40",
    title: "The Pastry Kitchen Team",
    category: "moments",
    categoryLabel: "Atmosphere & Moments",
    aspect: "portrait",
    image: "/images/gallery/SaveClip.App_883300116_18112999676104627_6209083543123439225_n.webp",
    caption:
      "The chefs behind the counter — BRÜN kitchen brigade in slate-grey uniforms, arms crossed, ready for the morning rush.",
  },
  {
    id: "gal-41",
    title: "The Full BRÜN Family",
    category: "moments",
    categoryLabel: "Atmosphere & Moments",
    aspect: "landscape",
    image: "/images/gallery/SaveClip.App_885389114_18112999640104627_1357588293101362409_n.webp",
    caption:
      "The complete BRÜN team — front-of-house, pastry kitchen, and management — gathered in the dining room, one family.",
  },

  // ── NEW GALLERY SLIDES (snaptik series — interior) ────────────────
  {
    id: "gal-42",
    title: "The Shelving Wall & Bar Mise en Place",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/gallery/snaptik-app-7695756747134225671-slide-1.jpg",
    caption:
      "Backlit oak shelves lined with BRÜN mugs, spice jars, and botanical prints — the bar mise en place ready for the morning rush.",
  },
  {
    id: "gal-43",
    title: "The Bakery Counter in Full",
    category: "bakery",
    categoryLabel: "Bakery & Viennoiserie",
    aspect: "portrait",
    image: "/images/gallery/snaptik-app-7695756747134225671-slide-2.webp",
    caption:
      "The full glass pastry counter — éclairs, tarts, croissants, and cakes, beneath the signature woven rattan pendants.",
  },
  {
    id: "gal-44",
    title: "Pantry Jars & BRÜN Ceramics",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/gallery/snaptik-app-7695756747134225671-slide-3.jpg",
    caption:
      "A close study of the bar shelf — glass jars of whole spices, dried botanicals, and rows of branded BRÜN ceramic cups.",
  },
  {
    id: "gal-45",
    title: "The Olive Tree & Dining Room",
    category: "space",
    categoryLabel: "The Space",
    aspect: "portrait",
    image: "/images/gallery/snaptik-app-7695756747134225671-slide-4.webp",
    caption:
      "A tall olive tree at the heart of the dining room, flanked by the glass pastry counter and rattan pendants — BRÜN's signature centrepiece.",
  },

  // ── KINDERHOME INTERIOR (new slides) ─────────────────────────────
  {
    id: "gal-46",
    title: "Kinderhome — Ball Pit & Slides",
    category: "kinderhome",
    categoryLabel: "Kinderhome",
    aspect: "portrait",
    image: "/images/kinderhome/snaptik-app-7693862920089865479-slide-1.webp",
    caption:
      "The main Kinderhome play arena — twin slides, cloud ceiling lights, and a vast green-and-white ball pit stretching the full width of the room.",
  },
  {
    id: "gal-47",
    title: "Kinderhome — The Tube Slide & Sign",
    category: "kinderhome",
    categoryLabel: "Kinderhome",
    aspect: "portrait",
    image: "/images/kinderhome/snaptik-app-7693862920089865479-slide-2.webp",
    caption:
      "The Kinderhome spiral tube slide dropping into the ball pit, with the illuminated KINDERHOME sign above — adventure at every corner.",
  },
  {
    id: "gal-48",
    title: "Kinderhome — The Play Tower",
    category: "kinderhome",
    categoryLabel: "Kinderhome",
    aspect: "portrait",
    image: "/images/kinderhome/snaptik-app-7693862920089865479-slide-3.webp",
    caption:
      "The branded Kinderhome play tower — net tunnels, peekaboo windows, and a rope climbing frame, all set in the ball pit below.",
  },
  {
    id: "gal-49",
    title: "Kinderhome — The Obstacle Tunnel",
    category: "kinderhome",
    categoryLabel: "Kinderhome",
    aspect: "portrait",
    image: "/images/kinderhome/snaptik-app-7693862920089865479-slide-4.webp",
    caption:
      "Looking down Kinderhome's padded obstacle corridor — a foam ring target suspended mid-air, inviting young explorers through.",
  },
];

export const KINDERHOME_FAQS: FAQItem[] = [
  {
    question: "What age group is Kinderhome designed for?",
    answer:
      "Kinderhome is thoughtfully designed for children aged 2 years and above. The soft-play structures, padded steps, low slides, and enclosed ball pit are optimized for toddler and child-safe physical exploration.",
  },
  {
    question: "Are socks mandatory for children in Kinderhome?",
    answer:
      "Yes, socks are strictly mandatory for all children entering the soft-play and ball-pit areas to uphold the highest standards of hygiene and safety. Bare feet and outdoor footwear are not permitted.",
  },
  {
    question: "Can we bring our own socks, or buy them at the café?",
    answer:
      "Guests are welcome to bring clean socks from home. Alternatively, specially gripped children's socks are available for purchase directly at BRÜN for ₦2,250 (subject to daily stock confirmation).",
  },
  {
    question: "Can parents enter the soft-play structure?",
    answer:
      "For safety and structural guidelines, parents and guardians are not permitted inside the play equipment itself. However, comfortable café dining tables are situated right alongside Kinderhome so you can keep full visual contact with your child while enjoying your food and coffee.",
  },
  {
    question: "Is Kinderhome supervised by dedicated café attendants?",
    answer:
      "While our team maintains a clean and safe environment, Kinderhome is not a childcare facility. Parents or accompanying guardians remain responsible for supervising their children at all times from the adjacent seating area.",
  },
];

export const VISIT_FAQS: FAQItem[] = [
  {
    question: "Where exactly is BRÜN located in Ikeja GRA?",
    answer:
      "BRÜN is located at 9 Sasegbon Street, Ikeja GRA, Lagos. We are situated within the lush green compound shared with Fiora Garden, offering a tranquil, secure oasis just off the main GRA corridors.",
  },
  {
    question: "Is there on-site parking available?",
    answer:
      "Yes. We provide complimentary secure on-site parking within the gated compound at 9 Sasegbon Street with on-duty security attendants to guide you upon arrival.",
  },
  {
    question: "What are your operating hours?",
    answer:
      "BRÜN is open seven days a week, from 8:00 AM to 9:00 PM Monday through Sunday. Breakfast and fresh bakes are ready first thing in the morning.",
  },
  {
    question: "Do I need a reservation to visit?",
    answer:
      "We operate primarily on a welcoming walk-in basis. Tables are seated as guests arrive. During peak weekend brunch hours (11:00 AM – 2:00 PM), there may be a brief wait, during which you are welcome to browse our bakery counter or relax in our outdoor patio.",
  },
  {
    question: "Can I order takeout or pastries to go?",
    answer:
      "Absolutely. Our entire bakery selection, artisan bread loaves, bottled juices, and beverage menu can be packaged to take away. Simply place your order at the front bakery counter.",
  },
  {
    question: "What is your photography and content creation policy?",
    answer:
      "Casual photos and videos taken on mobile phones are warmly welcomed! We ask all guests to keep filming contained to their immediate table and avoid recording other guests or children playing in Kinderhome to respect privacy.",
  },
];
