import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: true, linkify: true, typography: true });
const contentDirectory = path.join(process.cwd(), "src/content");

export function getLatestArticles() {
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);

  const allArticles = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "Tanpa Judul",
        category: data.category || "Umum",
        iconName: data.iconName || "FileText",
        iconBg: data.iconBg || "bg-slate-50 text-slate-600",
        date: data.date || "2000-01-01", // Default tanggal lama jika lupa isi
      };
    });

  // --- LOGIKA PENGURUTAN (SORTING) ---
  // Mengurutkan dari tanggal terbaru ke terlama
  return allArticles.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

export function getArticleData(slug: string) {
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
    };
  } catch (error) {
    return null;
  }
}
