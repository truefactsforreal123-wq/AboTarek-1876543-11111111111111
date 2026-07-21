export type LocalizedText = { ar: string; en: string };

const S = "https://wxuqowvcdlbuewqwkulf.supabase.co/storage/v1/object/public/menu-images";

export const siteConfig = {
  name: { ar: "كشري أبو طارك", en: "Abo Tarek Koshari" },
  siteUrl: "https://abotarek-koshari.vercel.app",
  facebook: "https://web.facebook.com/abotarek",
  instagram: "https://www.instagram.com/abotarek",
  stats: {
    branches: 4,
    followers: 85000,
    recommendPercent: 94,
    reviewCount: 120,
    rating: 4.7,
  },
  contact: {
    primaryPhone: "16011",
    primaryWhatsapp: "2016011",
  },
  images: {
    hero: `${S}/koshari/classic.jpg`,
    about: `${S}/koshari/meat.jpg`,
    logo: "/logo.png",
  },
} as const;

export const navItems = [
  { href: "/", label: { ar: "الرئيسية", en: "Home" } },
  { href: "/about", label: { ar: "حكايتنا", en: "Our Story" } },
  { href: "/menu", label: { ar: "المنيو", en: "Menu" } },
  { href: "/branches", label: { ar: "الفروع", en: "Branches" } },
  { href: "/reviews", label: { ar: "التقييمات", en: "Reviews" } },
] as const;

export type PageHeaderData = {
  image: string;
  ar: { eyebrow: string; title: string; text: string };
  en: { eyebrow: string; title: string; text: string };
};

export const pageHeaders: Record<string, PageHeaderData> = {
  about: {
    image: `${S}/koshari/meat.jpg`,
    ar: { eyebrow: "حكايتنا", title: "الطبق اللي بقى علامة", text: "من قلب القاهرة منذ 1950، كشري أبو طارك بيحكي حكاية مصرية في كل طبق." },
    en: { eyebrow: "Our Story", title: "The bowl that became an icon", text: "From the heart of Cairo since 1950, Abo Tarek Koshari tells an Egyptian story in every bowl." },
  },
  menu: {
    image: `${S}/koshari/classic.jpg`,
    ar: { eyebrow: "المنيو", title: "أصناف كشري أبو طارك", text: "من كشري كلاسيك لكشري باللحمة، كل طبق له قصة." },
    en: { eyebrow: "Menu", title: "Abo Tarek Koshari Menu", text: "From classic koshari to meat koshari, every bowl has a story." },
  },
  branches: {
    image: `${S}/sandwiches/category.jpg`,
    ar: { eyebrow: "فروعنا", title: "تعالى لنا", text: "ابدأ من فرع وسط البلد الأشهر، أو اختار الأقرب ليك." },
    en: { eyebrow: "Branches", title: "Come find us", text: "Start at our iconic Downtown home, or choose the location closest to you." },
  },
  reviews: {
    image: `${S}/desserts/omali.jpg`,
    ar: { eyebrow: "التقييمات", title: "رأي الناس", text: "ناس دقت كشري أبو طارك وحبتها." },
    en: { eyebrow: "Reviews", title: "What people say", text: "People who tried Abo Tarek Koshari and loved it." },
  },
};

export type MenuCategory = {
  id: string;
  label: LocalizedText;
  image?: string;
  items: Array<{
    name: LocalizedText;
    description: LocalizedText;
    price?: number;
    sizes?: Array<{ label: LocalizedText; price: number }>;
    badge?: "popular" | "spicy";
    image?: string;
  }>;
};

export type GalleryImage = {
  src: string;
  alt: LocalizedText;
};

export const gallery: GalleryImage[] = [
  { src: `${S}/koshari/classic.jpg`, alt: { ar: "كشري كلاسيك", en: "Classic Koshari" } },
  { src: `${S}/koshari/meat.jpg`, alt: { ar: "كشري اللحمة", en: "Meat Koshari" } },
  { src: `${S}/koshari/kofta.jpg`, alt: { ar: "كشري الكفتة", en: "Kofta Koshari" } },
  { src: `${S}/koshari/chicken.jpg`, alt: { ar: "كشري الفراخ", en: "Chicken Koshari" } },
  { src: `${S}/sandwiches/shawarma.jpg`, alt: { ar: "شاورما فراخ", en: "Chicken Shawarma" } },
  { src: `${S}/sides/hummus.jpg`, alt: { ar: "حمص", en: "Hummus" } },
  { src: `${S}/desserts/omali.jpg`, alt: { ar: "أم علي", en: "Om Ali" } },
];

export type BranchData = {
  number: string;
  name: LocalizedText;
  address: LocalizedText;
  phone: string;
  whatsapp: string;
  maps: string;
};

export const branches: BranchData[] = [
  { number: "01", name: { ar: "فرع وسط البلد", en: "Downtown" }, address: { ar: "شارع مُصطفى النحاس، وسط البلد، القاهرة", en: "Mostafa El-Nahas St, Downtown, Cairo" }, phone: "0227925555", whatsapp: "20227925555", maps: "https://maps.app.goo.gl/downtown" },
  { number: "02", name: { ar: "فرع المعادي", en: "Maadi" }, address: { ar: "شارع 9، المعادي، القاهرة", en: "Street 9, Maadi, Cairo" }, phone: "0225199999", whatsapp: "20225199999", maps: "https://maps.app.goo.gl/maadi" },
  { number: "03", name: { ar: "فرع الشيخ زايد", en: "Sheikh Zayed" }, address: { ar: "محور الشيخ زايد، الشيخ زايد، الجيزة", en: "Sheikh Zayed Axis, Sheikh Zayed, Giza" }, phone: "0225358888", whatsapp: "20225358888", maps: "https://maps.app.goo.gl/zayed" },
  { number: "04", name: { ar: "فرع نيو سيتي", en: "New City" }, address: { ar: "المنطقة الإدارية الجديدة، العاشر من رمضان", en: "New Administrative Capital, 10th of Ramadan" }, phone: "0226887777", whatsapp: "20226887777", maps: "https://maps.app.goo.gl/newcity" },
];
