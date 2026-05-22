import type { Metadata } from "next";
import TentangClient from "./TentangClient";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Garda Siber adalah platform edukasi dan literasi keamanan siber untuk masyarakat Indonesia. Kenali visi, misi, dan nilai inti kami.",
};

export default function TentangPage() {
  return <TentangClient />;
}