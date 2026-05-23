import Link from "next/link";
import {
  Shield,
  Mail,
  ArrowUpRight,
  Globe,
  MapPin,
  Phone,
  Clock,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  const tahun = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100">

      {/* CTA BANNER */}
      <div className="bg-[#0F52BA]">
        <div className="max-w-7xl mx-auto px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Tingkatkan Kesadaran Keamanan Digital Anda
            </h3>
            <p className="text-blue-200 text-sm font-medium mt-1">
              Jangan tunggu sampai menjadi korban. Mulai literasi siber Anda sekarang.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/artikel"
              className="flex items-center gap-2 bg-white text-[#0F52BA] px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:bg-blue-50 shadow-lg"
            >
              Mulai Belajar <ChevronRight size={14} />
            </Link>
            <Link
              href="/ancaman"
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 border border-blue-500 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
            >
              Lihat Ancaman <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand */}
          <div className="md:col-span-4 space-y-7">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#0F52BA] rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
                <Shield size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-xl tracking-tight leading-none">Garda Siber</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Pusat Literasi Keamanan Digital</p>
              </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Platform edukasi dan literasi keamanan siber untuk masyarakat Indonesia.
              Hadir membantu Anda mengenali, mencegah, dan menghadapi ancaman kejahatan digital setiap hari.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-[#0F52BA]" />
                </div>
                <span className="text-slate-500 text-xs font-medium">Palembang, Sumatera Selatan, Indonesia</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-[#0F52BA]" />
                </div>
                <span className="text-slate-500 text-xs font-medium">sibersumsel@polri.go.id</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-[#0F52BA]" />
                </div>
                <span className="text-slate-500 text-xs font-medium">(0711) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                  <Clock size={14} className="text-[#0F52BA]" />
                </div>
                <span className="text-slate-500 text-xs font-medium">Senin - Jumat, 08.00 - 16.00 WIB</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Ikuti Kami</p>
              <div className="flex gap-2">
                <a href="https://www.instagram.com/sibersumsel" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 bg-slate-50 hover:bg-[#0F52BA] border border-slate-200 hover:border-[#0F52BA] rounded-xl flex items-center justify-center transition-all duration-200 group">
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@sibersumsel" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-9 h-9 bg-slate-50 hover:bg-[#0F52BA] border border-slate-200 hover:border-[#0F52BA] rounded-xl flex items-center justify-center transition-all duration-200 group">
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.03 1.6 4.21 1.15 1.4 2.81 2.3 4.6 2.53v3.8c-1.88-.07-3.7-.76-5.18-1.94-.15-.12-.29-.26-.42-.4v8.1c-.06 3.42-2.18 6.53-5.38 7.77-3.2 1.25-6.86.6-9.37-1.63-2.52-2.24-3.32-5.89-2-8.97 1.3-3.04 4.54-4.87 7.85-4.44v3.85c-.04-.01-.08-.01-.12-.01-1.74-.11-3.35.88-3.92 2.52-.57 1.65.1 3.49 1.6 4.44 1.49.96 3.49.69 4.67-.64.55-.61.84-1.4.82-2.22V0h.04z" />
                  </svg>
                </a>
                <a href="#" aria-label="Website" className="w-9 h-9 bg-slate-50 hover:bg-[#0F52BA] border border-slate-200 hover:border-[#0F52BA] rounded-xl flex items-center justify-center transition-all duration-200 group">
                  <Globe size={15} className="text-slate-400 group-hover:text-white transition-colors" />
                </a>
                <a href="mailto:sibersumsel@polri.go.id" aria-label="Email" className="w-9 h-9 bg-slate-50 hover:bg-[#0F52BA] border border-slate-200 hover:border-[#0F52BA] rounded-xl flex items-center justify-center transition-all duration-200 group">
                  <Mail size={15} className="text-slate-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigasi */}
          <div className="md:col-span-2">
            <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] mb-6 pb-3 border-b border-slate-100">
              Navigasi
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-500 hover:text-[#0F52BA] text-sm font-medium transition-colors flex items-center gap-2 group">
                  <ChevronRight size={12} className="text-slate-300 group-hover:text-[#0F52BA] transition-colors" />
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/ancaman" className="text-slate-500 hover:text-[#0F52BA] text-sm font-medium transition-colors flex items-center gap-2 group">
                  <ChevronRight size={12} className="text-slate-300 group-hover:text-[#0F52BA] transition-colors" />
                  Katalog Ancaman
                </Link>
              </li>
              <li>
                <Link href="/artikel" className="text-slate-500 hover:text-[#0F52BA] text-sm font-medium transition-colors flex items-center gap-2 group">
                  <ChevronRight size={12} className="text-slate-300 group-hover:text-[#0F52BA] transition-colors" />
                  Pusat Artikel
                </Link>
              </li>
              <li>
                <Link href="/tips" className="text-slate-500 hover:text-[#0F52BA] text-sm font-medium transition-colors flex items-center gap-2 group">
                  <ChevronRight size={12} className="text-slate-300 group-hover:text-[#0F52BA] transition-colors" />
                  Tips Keamanan
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-slate-500 hover:text-[#0F52BA] text-sm font-medium transition-colors flex items-center gap-2 group">
                  <ChevronRight size={12} className="text-slate-300 group-hover:text-[#0F52BA] transition-colors" />
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Kategori Ancaman */}
          <div className="md:col-span-3">
            <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] mb-6 pb-3 border-b border-slate-100">
              Kategori Ancaman
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/ancaman/phishing" className="text-slate-500 hover:text-[#0F52BA] text-sm font-medium transition-colors flex items-center gap-2 group">
                  <ChevronRight size={12} className="text-slate-300 group-hover:text-[#0F52BA] transition-colors" />
                  Phishing
                </Link>
              </li>
              <li>
                <Link href="/ancaman/ransomware" className="text-slate-500 hover:text-[#0F52BA] text-sm font-medium transition-colors flex items-center gap-2 group">
                  <ChevronRight size={12} className="text-slate-300 group-hover:text-[#0F52BA] transition-colors" />
                  Ransomware
                </Link>
              </li>
              <li>
                <Link href="/ancaman/social-engineering" className="text-slate-500 hover:text-[#0F52BA] text-sm font-medium transition-colors flex items-center gap-2 group">
                  <ChevronRight size={12} className="text-slate-300 group-hover:text-[#0F52BA] transition-colors" />
                  Social Engineering
                </Link>
              </li>
              <li>
                <Link href="/ancaman/spyware" className="text-slate-500 hover:text-[#0F52BA] text-sm font-medium transition-colors flex items-center gap-2 group">
                  <ChevronRight size={12} className="text-slate-300 group-hover:text-[#0F52BA] transition-colors" />
                  Spyware
                </Link>
              </li>
              <li>
                <Link href="/ancaman/sql-injection" className="text-slate-500 hover:text-[#0F52BA] text-sm font-medium transition-colors flex items-center gap-2 group">
                  <ChevronRight size={12} className="text-slate-300 group-hover:text-[#0F52BA] transition-colors" />
                  SQL Injection
                </Link>
              </li>
              <li>
                <Link href="/ancaman/mobile-malware" className="text-slate-500 hover:text-[#0F52BA] text-sm font-medium transition-colors flex items-center gap-2 group">
                  <ChevronRight size={12} className="text-slate-300 group-hover:text-[#0F52BA] transition-colors" />
                  Mobile Malware
                </Link>
              </li>
            </ul>
          </div>

          {/* Referensi Resmi */}
          <div className="md:col-span-3">
            <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] mb-6 pb-3 border-b border-slate-100">
              Referensi Resmi
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="https://bssn.go.id" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#0F52BA] group-hover:border-[#0F52BA] transition-all">
                    <ArrowUpRight size={13} className="text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="text-slate-700 group-hover:text-[#0F52BA] text-sm font-bold transition-colors block leading-none">BSSN</span>
                    <span className="text-slate-400 text-[11px] font-medium mt-0.5 block">Badan Siber & Sandi Negara</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://kominfo.go.id" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#0F52BA] group-hover:border-[#0F52BA] transition-all">
                    <ArrowUpRight size={13} className="text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="text-slate-700 group-hover:text-[#0F52BA] text-sm font-bold transition-colors block leading-none">Kominfo</span>
                    <span className="text-slate-400 text-[11px] font-medium mt-0.5 block">Kementerian Komunikasi</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://ojk.go.id" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#0F52BA] group-hover:border-[#0F52BA] transition-all">
                    <ArrowUpRight size={13} className="text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="text-slate-700 group-hover:text-[#0F52BA] text-sm font-bold transition-colors block leading-none">OJK</span>
                    <span className="text-slate-400 text-[11px] font-medium mt-0.5 block">Otoritas Jasa Keuangan</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://polri.go.id" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#0F52BA] group-hover:border-[#0F52BA] transition-all">
                    <ArrowUpRight size={13} className="text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="text-slate-700 group-hover:text-[#0F52BA] text-sm font-bold transition-colors block leading-none">Polri</span>
                    <span className="text-slate-400 text-[11px] font-medium mt-0.5 block">Kepolisian Negara RI</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0F52BA] rounded-lg flex items-center justify-center">
              <Shield size={12} className="text-white" />
            </div>
            <p className="text-slate-400 text-xs font-medium">
              © {tahun} Garda Siber — Platform Edukasi Keamanan Digital Indonesia
            </p>
          </div>
          <p className="text-slate-300 text-xs font-medium">
            Aman · Cerdas · Terlindungi
          </p>
        </div>
      </div>

    </footer>
  );
}
