// ============================================================
// src/types/index.ts
// Satu sumber kebenaran untuk semua tipe data di Garda Siber.
// Import dari "@/types" — jangan buat tipe duplikat di tempat lain.
// ============================================================

// ---------- Auth & User ----------

export interface UserProfile {
  id: string;
  full_name: string | null;
  role: "admin" | "user";
  avatar_url?: string | null;
  created_at?: string;
}

// ---------- Article ----------

export interface ArticleMeta {
  slug: string;
  title: string;
  category: ArticleCategory;
  iconName: string;
  iconBg: string;
  date: string;
  summary: string;
  author: string;
  readTime: string;
  bannerImg: string;
}

export interface ArticleData extends ArticleMeta {
  contentHtml: string;
}

// ---------- Threat ----------

export type ThreatLevel = "Critical" | "High" | "Medium" | "Low";
export type ThreatColor = "danger" | "warning" | "success";

export interface Threat {
  id: string;
  title: string;
  shortDesc: string;
  level: ThreatLevel;
  color: ThreatColor;
  image: string;
  iconName: string;
  analysisTitle: string;
  fullDesc: string;
  impact: string;
  characteristics: string[];
  steps: string[];
  stats: string;
}

// ---------- Category ----------

export type ArticleCategory =
  | "Password"
  | "Phishing"
  | "Jaringan"
  | "Penipuan"
  | "Perangkat"
  | "Hukum Siber"
  | "Umum";

// ---------- Notification ----------

export interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string;
  read?: boolean;
}

// ---------- Quiz ----------

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category?: string;
}

export interface QuizResult {
  score: number;
  total: number;
  label: string;
  description: string;
}