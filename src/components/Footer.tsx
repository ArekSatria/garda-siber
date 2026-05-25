"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Shield, Mail, MapPin, Phone, Clock,
  ChevronRight, ExternalLink, Brain, BookOpen, Lock,
} from "lucide-react";

export default function Footer() {
  const tahun = new Date().getFullYear();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navLinks = [
    { href: "/", label: "Beranda", desc: "Dashboard utama" },
    { href: "/ancaman", label: "Katalog Ancaman", desc: "6 jenis ancaman" },
    { href: "/artikel", label: "Pusat Artikel", desc: "12 artikel edukasi" },
    { href: "/tips", label: "Tips Keamanan", desc: "Panduan praktis" },
    { href: "/quiz", label: "Quiz Siber", desc: "Uji kemampuanmu" },
    { href: "/tentang", label: "Tentang Kami", desc: "Profil & visi misi" },
  ];

  const threatLinks = [
    { href: "/ancaman/phishing", label: "Phishing" },
    { href: "/ancaman/ransomware", label: "Ransomware" },
    { href: "/ancaman/social-engineering", label: "Social Engineering" },
    { href: "/ancaman/spyware", label: "Spyware" },
    { href: "/ancaman/sql-injection", label: "SQL Injection" },
    { href: "/ancaman/mobile-malware", label: "Mobile Malware" },
  ];

  const trustedResources = [
    { href: "https://bssn.go.id", label: "BSSN", desc: "Badan Siber & Sandi Negara" },
    { href: "https://kominfo.go.id", label: "Kominfo", desc: "Kementerian Komunikasi" },
    { href: "https://ojk.go.id", label: "OJK", desc: "Otoritas Jasa Keuangan" },
    { href: "https://polri.go.id", label: "Polri", desc: "Kepolisian Negara RI" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-white to-slate-50 border-t border-slate-200/80 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.03]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[120px] bg-blue-50/20 rounded-full blur-3xl" />
        <div className="absolute top-4 right-4 opacity-[0.03] blur-sm">
          <Shield size={140} className="text-[#0F52BA]" />
        </div>
      </div>

      <div className="relative z-10">
        {/* ── CTA ── */}
        <div className="border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="relative bg-gradient-to-r from-[#0F52BA] via-blue-600 to-blue-700 rounded-2xl px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden shadow-md shadow-blue-100">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.03] blur-sm select-none">
                <Shield size={80} className="text-white" />
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-blue-400/10 blur-3xl rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                  </span>
                  <span className="text-blue-200 text-[9px] font-bold uppercase tracking-wider">
                    Platform Aktif
                  </span>
                </div>
                <h3 className="text-sm font-black text-white tracking-tight leading-tight mb-0.5">
                  Siap Tingkatkan Keamanan Digital Anda?
                </h3>
                <p className="text-blue-200 text-xs font-medium max-w-sm leading-relaxed">
                  Pelajari ancaman siber terbaru dan uji kemampuan Anda melalui
                  quiz interaktif Garda Siber.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-2 shrink-0">
                <Link
                  href="/artikel"
                  className="flex items-center gap-1.5 bg-white text-blue-700 px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-blue-50 hover:shadow-md hover:shadow-blue-500/10 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <BookOpen size={12} /> Mulai Belajar
                </Link>
                <Link
                  href="/quiz"
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white/90 px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-widest hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <Brain size={12} /> Ikuti Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 1: MAIN GRID ── */}
        <div className="max-w-7xl mx-auto px-8 py-7">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Brand — tanpa contact */}
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 bg-[#0F52BA] rounded-lg flex items-center justify-center shadow-md shadow-blue-200/50 shrink-0">
                  <Shield size={15} className="text-white" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 border-[1.5px] border-white" />
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm tracking-tight leading-none">
                    Garda Siber
                  </h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    Pusat Literasi Keamanan Digital
                  </p>
                </div>
              </div>

              <p className="text-slate-500 text-xs leading-relaxed font-medium max-w-[200px]">
                Platform edukasi dan literasi keamanan siber untuk membantu
                masyarakat mengenali, mencegah, dan menghadapi ancaman digital.
              </p>

              <div className="inline-flex items-center gap-1 bg-blue-50 border border-blue-100 px-2 py-1 rounded-full">
                <Lock size={8} className="text-[#0F52BA]" />
                <span className="text-[9px] font-black text-[#0F52BA] uppercase tracking-widest">
                  Powered by Cyber Awareness Initiative
                </span>
              </div>
            </div>

            {/* Navigasi */}
            <div className="md:col-span-2">
              <h4 className="font-black text-slate-700 text-[10px] uppercase tracking-widest mb-3 pb-2 border-b border-slate-100">
                Navigasi
              </h4>
              <ul className="space-y-0">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onMouseEnter={() => setHoveredNav(link.href)}
                      onMouseLeave={() => setHoveredNav(null)}
                      className="flex items-start gap-1.5 py-1 group focus:outline-none rounded hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <ChevronRight
                        size={10}
                        className="text-slate-300 group-hover:text-[#0F52BA] transition-all duration-300 mt-0.5 group-hover:translate-x-0.5 shrink-0"
                      />
                      <div>
                        <span className="text-slate-500 group-hover:text-[#0F52BA] text-xs font-semibold transition-colors duration-300 block leading-snug">
                          {link.label}
                        </span>
                        <span
                          className={`text-[10px] text-[#0F52BA]/50 font-medium leading-none transition-all duration-200 block overflow-hidden ${hoveredNav === link.href ? "max-h-4 opacity-100 mt-0.5" : "max-h-0 opacity-0"}`}
                        >
                          {link.desc}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ancaman */}
            <div className="md:col-span-2">
              <h4 className="font-black text-slate-700 text-[10px] uppercase tracking-widest mb-3 pb-2 border-b border-slate-100">
                Ancaman Siber
              </h4>
              <ul className="space-y-0">
                {threatLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1.5 py-1 group focus:outline-none rounded hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <ChevronRight
                        size={10}
                        className="text-slate-300 group-hover:text-[#0F52BA] transition-all duration-300 group-hover:translate-x-0.5 shrink-0"
                      />
                      <span className="text-slate-500 group-hover:text-[#0F52BA] text-xs font-semibold transition-colors duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trusted Resources */}
            <div className="md:col-span-4">
              <h4 className="font-black text-slate-700 text-[10px] uppercase tracking-widest mb-3 pb-2 border-b border-slate-100">
                Trusted Resources
              </h4>
              <div className="grid grid-cols-2 gap-1.5">
                {trustedResources.map((res) => (
                  <a
                    key={res.href}
                    href={res.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${res.label} — ${res.desc}`}
                    className="group flex flex-col gap-1 p-3 bg-white hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-500/10 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:ring-offset-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-700 group-hover:text-[#0F52BA] text-xs transition-colors duration-300">
                        {res.label}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-[7px] font-black text-green-600 bg-green-50 border border-green-100 px-1 py-0.5 rounded-full uppercase tracking-wider leading-none">
                          Official
                        </span>
                        <ExternalLink
                          size={8}
                          className="text-slate-300 group-hover:text-[#0F52BA] transition-colors duration-300"
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium leading-tight">
                      {res.desc}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: CONTACT + SOCIAL + COPYRIGHT ── */}
        <div className="border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Contact — inline compact */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <div className="flex items-center gap-1">
                  <MapPin size={10} className="text-[#0F52BA] shrink-0" />
                  <span className="text-slate-500 text-[11px] font-medium">
                    Palembang, Sumatera Selatan
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail size={10} className="text-[#0F52BA] shrink-0" />
                  <span className="text-slate-500 text-[11px] font-medium">
                    sibersumsel@polri.go.id
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={10} className="text-[#0F52BA] shrink-0" />
                  <span className="text-slate-500 text-[11px] font-medium">
                    (0711) 123-4567
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={10} className="text-[#0F52BA] shrink-0" />
                  <span className="text-slate-500 text-[11px] font-medium">
                    Sen–Jum 08.00–16.00 WIB
                  </span>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href="https://www.instagram.com/sibersumsel"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Siber Sumsel"
                  className="w-7 h-7 bg-white hover:bg-[#0F52BA] border border-slate-200 hover:border-[#0F52BA] rounded-lg flex items-center justify-center transition-all duration-300 group hover:-translate-y-1 hover:shadow-md hover:shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]"
                >
                  <svg
                    className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@sibersumsel"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Siber Sumsel"
                  className="w-7 h-7 bg-white hover:bg-[#0F52BA] border border-slate-200 hover:border-[#0F52BA] rounded-lg flex items-center justify-center transition-all duration-300 group hover:-translate-y-1 hover:shadow-md hover:shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]"
                >
                  <svg
                    className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.03 1.6 4.21 1.15 1.4 2.81 2.3 4.6 2.53v3.8c-1.88-.07-3.7-.76-5.18-1.94-.15-.12-.29-.26-.42-.4v8.1c-.06 3.42-2.18 6.53-5.38 7.77-3.2 1.25-6.86.6-9.37-1.63-2.52-2.24-3.32-5.89-2-8.97 1.3-3.04 4.54-4.87 7.85-4.44v3.85c-.04-.01-.08-.01-.12-.01-1.74-.11-3.35.88-3.92 2.52-.57 1.65.1 3.49 1.6 4.44 1.49.96 3.49.69 4.67-.64.55-.61.84-1.4.82-2.22V0h.04z" />
                  </svg>
                </a>
                <a
                  href="mailto:sibersumsel@polri.go.id"
                  aria-label="Email Garda Siber"
                  className="w-7 h-7 bg-white hover:bg-[#0F52BA] border border-slate-200 hover:border-[#0F52BA] rounded-lg flex items-center justify-center transition-all duration-300 group hover:-translate-y-1 hover:shadow-md hover:shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]"
                >
                  <Mail
                    size={11}
                    className="text-slate-400 group-hover:text-white transition-colors duration-300"
                  />
                </a>
              </div>

              {/* Copyright + legal */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  <span className="text-slate-400 text-[11px] font-medium">
                    Aman <span className="text-slate-300 mx-0.5">•</span> Cerdas{" "}
                    <span className="text-slate-300 mx-0.5">•</span> Terlindungi
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] font-medium">
                  © {tahun} Garda Siber
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Link
                    href="/privacy"
                    className="hover:text-slate-600 transition-colors duration-200"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/terms"
                    className="hover:text-slate-600 transition-colors duration-200"
                  >
                    Terms
                  </Link>
                  <Link
                    href="/disclaimer"
                    className="hover:text-slate-600 transition-colors duration-200"
                  >
                    Disclaimer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
