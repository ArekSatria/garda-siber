import { MetadataRoute } from "next";
import { getAllThreats } from "@/data/threats";
import { getLatestArticles } from "@/lib/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gardasiber.id";

  // Halaman statis
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/ancaman`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tips`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Halaman dinamis ancaman
  const threatPages: MetadataRoute.Sitemap = getAllThreats().map((threat) => ({
    url: `${baseUrl}/ancaman/${threat.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Halaman dinamis artikel
  const articlePages: MetadataRoute.Sitemap = getLatestArticles().map(
    (article) => ({
      url: `${baseUrl}/artikel/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...staticPages, ...threatPages, ...articlePages];
}
