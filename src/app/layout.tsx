import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/constants/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "keamanan siber",
    "literasi digital",
    "keamanan akun",
    "phishing",
    "ransomware",
    "edukasi keamanan digital",
    "sumatera selatan",
    "polda sumsel",
  ],
  authors: [{ name: `${SITE.author} · ${SITE.institution}` }],
  openGraph: {
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
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
