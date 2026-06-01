export const SITE = {
  name: "Garda Siber",
  tagline: "Media Edukasi Keamanan Digital",
  description:
    "Media edukasi keamanan digital untuk membantu masyarakat memahami ancaman siber, membangun kebiasaan aman, dan menerapkan langkah pencegahan yang praktis.",
  institution: "Subdit 5 Siber Polda Sumsel",
  projectContext:
    "Dikembangkan sebagai project magang untuk kebutuhan edukasi dan literasi keamanan digital.",
  locale: "id_ID",
  email: "subdit5siber@sumsel.polri.go.id",
  phone: "(0711) 000000",
  address: "Palembang, Sumatera Selatan",
  author: "Tim Garda Siber",
  disclaimerShort:
    "Konten pada website ini bersifat edukatif dan preventif. Informasi tidak menggantikan pelaporan resmi atau penanganan hukum.",
  social: {
    instagram: "#",
    tiktok: "#",
    youtube: "#",
  },
} as const;

export const ROUTES = {
  home: "/",
  threats: "/ancaman",
  articles: "/artikel",
  tips: "/tips",
  quiz: "/quiz",
  about: "/tentang",
  login: "/login",
  register: "/register",
  profile: "/profil",
  dashboard: "/dashboard",
  forgotPassword: "/lupa-password",
  privacy: "/privacy",
  terms: "/terms",
  disclaimer: "/disclaimer",
} as const;

/** Brand color — gunakan ini, bukan hardcode #0F52BA */
export const BRAND = {
  primary: "#0F52BA",
  primaryHover: "#0842A0",
  primaryLight: "#EBF3FF",
  surface: "#F8FAFC",
} as const;

/** Jumlah artikel yang ditampilkan di homepage */
export const HOME_ARTICLE_LIMIT = 5;

/** Jumlah artikel di halaman listing per halaman */
export const ARTICLES_PER_PAGE = 12;
