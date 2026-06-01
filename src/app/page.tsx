import { getAllArticlesMeta } from "@/lib/articles";
import { getAllThreats } from "@/data/threats";
import HomeClient from "./HomeClient";

export default function Home() {
  const latestArticles = getAllArticlesMeta().slice(0, 6);
  const featuredThreats = getAllThreats().slice(0, 4);

  return (
    <HomeClient
      latestArticles={latestArticles}
      featuredThreats={featuredThreats}
    />
  );
}
