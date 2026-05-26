import { getLatestArticles } from "@/lib/articles";
import HomeClient from "./HomeClient";

export default function Home() {
  const articles = getLatestArticles();
  return <HomeClient latestArticles={articles} />;
}
