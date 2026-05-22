import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: true, linkify: true, typography: true });
const contentDirectory = path.join(process.cwd(), "src/content");

export interface ArticleMeta {
  slug: string;
  title: string;
  category: string;
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
        title: data.title || "Tanpa Judul",
        category: data.category || "Umum",
        iconName: data.iconName || "FileText",
        iconBg: data.iconBg || "bg-slate-50 text-slate-600",
        date: data.date || "2000-01-01",
        summary: data.summary || "",
        author: data.author || "Tim Garda Siber",
        readTime: data.readTime || "5 Menit Baca",
        bannerImg: data.bannerImg || "/images/password.jpg",
      };
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
      title: data.title || "Tanpa Judul",
      category: data.category || "Umum",
      iconName: data.iconName || "FileText",
      iconBg: data.iconBg || "bg-slate-50 text-slate-600",
      date: data.date || "2000-01-01",
      summary: data.summary || "",
      author: data.author || "Tim Garda Siber",
      readTime: data.readTime || "5 Menit Baca",
      bannerImg: data.bannerImg || "/images/password.jpg",
    };
  } catch {
    return null;
  }
}
