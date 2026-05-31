// ============================================================
// src/constants/categories.ts
// Satu sumber kebenaran untuk warna, icon, dan style tiap kategori.
//
// SEBELUMNYA: Logic ini diduplikasi di HomeClient.tsx, ArtikelClient.tsx,
// artikel/[slug]/ArticleClient.tsx, dan ancaman/page.tsx.
//
// SEKARANG: Import saja dari sini.
// ============================================================

import type { ArticleCategory } from "@/types";

interface CategoryStyle {
  /** Tailwind class untuk background icon */
  iconBg: string;
  /** Tailwind class untuk warna teks icon */
  iconColor: string;
  /** Tailwind class untuk border kiri kartu */
  borderColor: string;
  /** Tailwind class untuk badge kategori */
  badgeBg: string;
  /** Nama icon Lucide (string) untuk iconMap lookup */
  iconName: string;
}

export const CATEGORY_STYLES: Record<ArticleCategory, CategoryStyle> = {
  Password: {
    iconBg: "bg-blue-50 text-blue-600",
    iconColor: "text-blue-600",
    borderColor: "border-l-blue-600",
    badgeBg: "bg-blue-50 text-blue-700",
    iconName: "Lock",
  },
  Phishing: {
    iconBg: "bg-red-50 text-red-600",
    iconColor: "text-red-600",
    borderColor: "border-l-red-600",
    badgeBg: "bg-red-50 text-red-700",
    iconName: "Mail",
  },
  Jaringan: {
    iconBg: "bg-green-50 text-green-600",
    iconColor: "text-green-600",
    borderColor: "border-l-green-600",
    badgeBg: "bg-green-50 text-green-700",
    iconName: "Wifi",
  },
  Penipuan: {
    iconBg: "bg-orange-50 text-orange-600",
    iconColor: "text-orange-600",
    borderColor: "border-l-orange-500",
    badgeBg: "bg-orange-50 text-orange-700",
    iconName: "Wallet",
  },
  Perangkat: {
    iconBg: "bg-purple-50 text-purple-600",
    iconColor: "text-purple-600",
    borderColor: "border-l-purple-600",
    badgeBg: "bg-purple-50 text-purple-700",
    iconName: "Smartphone",
  },
  "Hukum Siber": {
    iconBg: "bg-slate-100 text-slate-600",
    iconColor: "text-slate-600",
    borderColor: "border-l-slate-400",
    badgeBg: "bg-slate-100 text-slate-700",
    iconName: "Shield",
  },
  Umum: {
    iconBg: "bg-slate-100 text-slate-500",
    iconColor: "text-slate-500",
    borderColor: "border-l-slate-300",
    badgeBg: "bg-slate-100 text-slate-600",
    iconName: "FileText",
  },
};

/** Helper: ambil style kategori dengan fallback ke "Umum" */
export function getCategoryStyle(category: string): CategoryStyle {
  return (
    CATEGORY_STYLES[category as ArticleCategory] ?? CATEGORY_STYLES["Umum"]
  );
}
