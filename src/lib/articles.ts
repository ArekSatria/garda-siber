import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

import type {
  Article,
  ArticleFAQ,
  ArticleMeta,
  ArticleSource,
} from "@/types/article";

const contentDirectory = path.join(process.cwd(), "src/content");

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(contentDirectory)) return [];

  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".md"));
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function toStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const items = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length > 0 ? items : undefined;
}

function toFaqArray(value: unknown): ArticleFAQ[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const items = value
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const record = item as Record<string, unknown>;
      const question = isNonEmptyString(record.question)
        ? record.question.trim()
        : "";
      const answer = isNonEmptyString(record.answer)
        ? record.answer.trim()
        : "";

      if (!question || !answer) return null;

      return { question, answer };
    })
    .filter((item): item is ArticleFAQ => item !== null);

  return items.length > 0 ? items : undefined;
}

function toSourceArray(value: unknown): ArticleSource[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const items = value
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const record = item as Record<string, unknown>;
      const title = isNonEmptyString(record.title) ? record.title.trim() : "";
      const url = isNonEmptyString(record.url) ? record.url.trim() : undefined;

      if (!title) return null;

      return { title, url };
    })
    .filter((item): item is ArticleSource => item !== null);

  return items.length > 0 ? items : undefined;
}

function normalizeFileContents(raw: string): string {
  return raw.replace(/^\uFEFF/, "");
}

function mapFrontmatterToMeta(
  slug: string,
  data: Record<string, unknown>,
): ArticleMeta {
  return {
    slug,
    title: isNonEmptyString(data.title) ? data.title.trim() : "Tanpa Judul",
    summary: isNonEmptyString(data.summary) ? data.summary.trim() : "",
    date: isNonEmptyString(data.date) ? data.date.trim() : "",
    updatedAt: isNonEmptyString(data.updatedAt)
      ? data.updatedAt.trim()
      : undefined,
    author: isNonEmptyString(data.author)
      ? data.author.trim()
      : "Tim Garda Siber",
    reviewedBy: isNonEmptyString(data.reviewedBy)
      ? data.reviewedBy.trim()
      : undefined,
    category: isNonEmptyString(data.category) ? data.category.trim() : "Umum",
    readTime: isNonEmptyString(data.readTime)
      ? data.readTime.trim()
      : "5 menit",
    bannerImg: isNonEmptyString(data.bannerImg)
      ? data.bannerImg.trim()
      : undefined,
    audience: isNonEmptyString(data.audience)
      ? data.audience.trim()
      : undefined,
    level: isNonEmptyString(data.level) ? data.level.trim() : undefined,
    keyTakeaways: toStringArray(data.keyTakeaways),
    faq: toFaqArray(data.faq),
    sources: toSourceArray(data.sources),
    tags: toStringArray(data.tags),
    published: typeof data.published === "boolean" ? data.published : true,
  };
}

export function getAllArticleSlugs(): string[] {
  return getMarkdownFiles().map((file) => file.replace(/\.md$/, ""));
}

export function getAllArticlesMeta(): ArticleMeta[] {
  const files = getMarkdownFiles();

  const articles = files
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(contentDirectory, fileName);
      const rawFileContents = fs.readFileSync(fullPath, "utf8");
      const fileContents = normalizeFileContents(rawFileContents);

      const { data } = matter(fileContents);
      const meta = mapFrontmatterToMeta(slug, data as Record<string, unknown>);

      if (meta.published === false) return null;

      return meta;
    })
    .filter((item): item is ArticleMeta => item !== null);

  return articles.sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.date || 0).getTime();
    const dateB = new Date(b.updatedAt || b.date || 0).getTime();
    return dateB - dateA;
  });
}

export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(contentDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const rawFileContents = fs.readFileSync(fullPath, "utf8");
  const fileContents = normalizeFileContents(rawFileContents);

  const { data, content } = matter(fileContents);
  const meta = mapFrontmatterToMeta(slug, data as Record<string, unknown>);

  if (meta.published === false) return null;

  return {
    ...meta,
    contentHtml: md.render(content),
  };
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticlesMeta().filter(
    (article) => article.category === category,
  );
}

export function getRelatedArticles(
  slug: string,
  category: string,
  limit = 3,
): ArticleMeta[] {
  const allArticles = getAllArticlesMeta();

  const sameCategory = allArticles.filter(
    (article) => article.slug !== slug && article.category === category,
  );

  const fallback = allArticles.filter(
    (article) => article.slug !== slug && article.category !== category,
  );

  return [...sameCategory, ...fallback].slice(0, limit);
}
