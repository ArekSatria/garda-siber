import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // %s akan diganti judul tiap halaman, contoh: "Phishing | Garda Siber"
  title: {
    default: "Garda Siber — Pusat Literasi Keamanan Digital Indonesia",
    template: "%s | Garda Siber",
  },
  description:
    "Pelajari cara mengenali, mencegah, dan menghadapi ancaman kejahatan digital. Edukasi siber terpercaya untuk masyarakat Indonesia.",
  keywords: [
    "keamanan siber",
    "literasi digital",
    "phishing",
    "ransomware",
    "keamanan internet",
    "edukasi siber indonesia",
  ],
  authors: [{ name: "Tim Garda Siber" }],
  openGraph: {
    siteName: "Garda Siber",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body
        className={`${inter.className} bg-[#F8FAFC] text-slate-800 antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
