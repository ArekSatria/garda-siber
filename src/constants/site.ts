// ============================================================
// src/constants/site.ts
// Konstanta global situs — routing, teks, config.
// Menghilangkan magic string "#0F52BA", "/login", dll yang
// tersebar di puluhan file.
// ============================================================

export const SITE = {
  name: "Garda Siber",
  tagline: "Pusat Literasi Keamanan Digital Indonesia",
  description:
    "Pelajari cara mengenali, mencegah, dan menghadapi ancaman kejahatan digital. Edukasi siber terpercaya untuk masyarakat Indonesia.",
  url: "https://garda-siber.id",
  locale: "id_ID",
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
} as const;

/** Jumlah artikel yang ditampilkan di homepage */
export const HOME_ARTICLE_LIMIT = 5;

/** Jumlah artikel di halaman listing per halaman */
export const ARTICLES_PER_PAGE = 12;
