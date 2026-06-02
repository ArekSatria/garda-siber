import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/constants/site";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0F52BA", // Warna brand Anda untuk address bar HP
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gardasiber.id"), // Ganti dengan domain asli
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
  authors: [{ name: SITE.author, url: "https://gardasiber.id" }],
  creator: SITE.institution,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "https://gardasiber.id",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      { url: "/images/social.png", width: 1200, height: 630, alt: SITE.name },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/images/social.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${inter.className} bg-[#F8FAFC] text-slate-800 antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
