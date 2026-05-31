// ============================================================
// src/lib/articles.ts
// PERUBAHAN: Import ArticleMeta & ArticleData dari @/types,
// bukan define sendiri. Ini menghilangkan duplikasi tipe.
// ============================================================

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import type { ArticleMeta, ArticleData } from "@/types";

// Re-export agar import path lama tetap berjalan
export type { ArticleMeta, ArticleData };

const md = new MarkdownIt({ html: true, linkify: true, typography: true });
const contentDirectory = path.join(process.cwd(), "src/content");

function getAllFiles(): ArticleMeta[] {
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
    return [];
  }

  return fs
    .readdirSync(contentDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(contentDirectory, fileName);
      const { data } = matter(fs.readFileSync(fullPath, "utf8"));

      return {
        slug,
        title: data.title ?? "Tanpa Judul",
        category: data.category ?? "Umum",
        iconName: data.iconName ?? "FileText",
        iconBg: data.iconBg ?? "bg-slate-50 text-slate-600",
        date: data.date ?? "2000-01-01",
        summary: data.summary ?? "",
        author: data.author ?? "Tim Garda Siber",
        readTime: data.readTime ?? "5 Menit Baca",
        bannerImg: data.bannerImg ?? "/images/password.jpg",
      } satisfies ArticleMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestArticles(): ArticleMeta[] {
  return getAllFiles();
}

export function getArticleData(slug: string): ArticleData | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const contentHtml = md.render(content);

    return {
      slug,
      contentHtml,
      title: data.title ?? "Tanpa Judul",
      category: data.category ?? "Umum",
      iconName: data.iconName ?? "FileText",
      iconBg: data.iconBg ?? "bg-slate-50 text-slate-600",
      date: data.date ?? "2000-01-01",
      summary: data.summary ?? "",
      author: data.author ?? "Tim Garda Siber",
      readTime: data.readTime ?? "5 Menit Baca",
      bannerImg: data.bannerImg ?? "/images/password.jpg",
    } satisfies ArticleData;
  } catch {
    return null;
  }
}

export function formatDate(dateStr: string): string {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return dateStr;
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}