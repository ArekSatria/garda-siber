"use client";

import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import {
  Search,
  Lock,
  Mail,
  Globe,
  Shield,
  ShieldAlert,
  ChevronRight,
  Smartphone,
  UserX,
  Database,
  Radio,
  Key,
  Fingerprint,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ArtikelHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("Semua");

  const kategoriTabs = [
    "Semua",
    "Password",
    "Phishing",
    "Jaringan",
    "Penipuan",
    "Perangkat",
    "Hukum Siber",
  ];

  // Database 12 artikel lengkap dengan link gambar Unsplash yang relevan spesifik per topik
  const allArticles = [
    {
      slug: "password-kuat",
      title: "Cara membuat password yang kuat dan aman",
      tag: "Password",
      icon: Lock,
      imageUrl: "/images/password.jpg",
      desc: "Panduan menyusun kombinasi kata sandi yang sulit ditembus oleh metode brute force dan credential stuffing.",
    },
    {
      slug: "ciri-phishing",
      title: "Kenali ciri-ciri email phishing sebelum terlambat",
      tag: "Phishing",
      icon: Mail,
      imageUrl: "/images/email.jpg",
      desc: "Waspadai pesan palsu yang mengatasnamakan instansi resmi atau perbankan untuk mencuri data kredensial Anda.",
    },
    {
      slug: "bahaya-wifi",
      title: "Bahaya WiFi publik dan cara melindungi diri",
      tag: "Jaringan",
      icon: Globe,
      imageUrl: "/images/wifi.jpg",
      desc: "Tips aman berselancar di jaringan internet umum tanpa takut lalu lintas data Anda diendus oleh penyusup (Man-in-the-Middle).",
    },
    {
      slug: "investasi-bodong",
      title: "Modus investasi bodong yang marak di media sosial",
      tag: "Penipuan",
      icon: Shield,
      imageUrl: "/images/investasi.jpg",
      desc: "Pahami skema ponzi dan penipuan keuangan digital agar tidak terjebak rayuan keuntungan instan yang manipulatif.",
    },
    {
      slug: "keamanan-hp",
      title: "Keamanan aplikasi di smartphone: apa yang perlu dicek?",
      tag: "Perangkat",
      icon: Smartphone,
      imageUrl: "/images/hp.jpg",
      desc: "Langkah taktis memeriksa izin akses (permission) aplikasi di HP untuk mencegah kebocoran data rahasia.",
    },
    {
      slug: "scam-apk-undangan",
      title: "Waspada Scam APK berkedok undangan pernikahan dan kurir",
      tag: "Penipuan",
      icon: ShieldAlert,
      imageUrl: "/images/scam.jpg",
      desc: "Cara mendeteksi dan menangani HP yang terlanjur menginstal file APK berbahaya yang bisa menguras isi rekening.",
    },
    {
      slug: "kejahatan-sim-swap",
      title: "Mengenal kejahatan SIM Swap dan cara mengantisipasinya",
      tag: "Perangkat",
      icon: Fingerprint,
      imageUrl: "/images/sim.jpg",
      desc: "Modus pengambilalihan nomor HP korban oleh pelaku untuk membobol kode OTP perbankan dan akun media sosial.",
    },
    {
      slug: "bahaya-deepfake-scam",
      title: "Ancaman teknologi Deepfake dalam modus penipuan video",
      tag: "Phishing",
      icon: UserX,
      imageUrl: "/images/deepfake.jpg",
      desc: "Bagaimana pelaku kejahatan memanipulasi wajah dan suara tokoh publik atau kerabat dekat menggunakan AI untuk memeras korban.",
    },
    {
      slug: "serangan-ransomware-korporat",
      title: "Strategi menghadapi serangan ransomware pada sistem data",
      tag: "Jaringan",
      icon: Database,
      imageUrl: "/images/ransomware.jpg",
      desc: "Langkah-langkah preventif perusahaan dalam mengamankan server agar tidak dikunci oleh enkripsi kelompok peretas global.",
    },
    {
      slug: "pencurian-data-identity-theft",
      title: "Identity Theft: Dampak kebocoran NIK dan KTP di internet",
      tag: "Hukum Siber",
      icon: Key,
      imageUrl: "/images/identity.jpg",
      desc: "Bahaya penyalahgunaan data pribadi untuk pinjaman online ilegal dan cara mengecek apakah data Anda bocor.",
    },
    {
      slug: "skimming-atm-digital",
      title: "Cara mendeteksi alat skimming pada mesin ATM dan EDC",
      tag: "Penipuan",
      icon: Radio,
      imageUrl: "/images/atm.jpg",
      desc: "Masyarakat harus tahu cara membedakan slot kartu ATM yang asli dengan yang sudah dipasang alat perekam data magnetik.",
    },
    {
      slug: "uu-ite-dan-perlindungan-data",
      title: "Pahami pasal penting UU ITE dan UU Perlindungan Data Pribadi",
      tag: "Hukum Siber",
      icon: Shield,
      imageUrl: "/images/hukum.jpg",
      desc: "Aspek hukum yang melindungi korban kejahatan siber di Indonesia serta sanksi bagi para pelaku penyebar data.",
    },
  ];

  const filteredArticles = allArticles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesKategori =
      selectedKategori === "Semua" || art.tag === selectedKategori;
    return matchesSearch && matchesKategori;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col min-w-0">
        {/* HEADER SEARCH BAR */}
        <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="relative w-full max-w-xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari artikel atau modus kejahatan siber..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0F52BA] font-medium"
            />
          </div>
        </header>

        {/* HUB AREA */}
        <main className="p-12 max-w-5xl mx-auto w-full space-y-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
              Pusat Literasi Artikel
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              Daftar komprehensif analisis modus operandi kejahatan digital dan
              regulasi hukum siber nasional.
            </p>
          </div>

          {/* FILTER TABS */}
          <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-6">
            {kategoriTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedKategori(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  selectedKategori === tab
                    ? "bg-[#0F52BA] text-white border-[#0F52BA] shadow-lg shadow-blue-700/20"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ARTIKEL GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art) => (
                <Link
                  href={`/artikel/${art.slug}`}
                  key={art.slug}
                  className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all flex flex-col justify-between group cursor-pointer overflow-hidden"
                >
                  {/* BAGIAN SAMPUL FOTO (UNSPLASH INTEGRATED) */}
                  <div className="h-52 w-full overflow-hidden relative bg-slate-100">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-black text-[#0F52BA] bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-sm">
                        {art.tag}
                      </span>
                    </div>
                  </div>

                  {/* KONTEN ARTIKEL */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-[#EBF3FF] group-hover:text-[#0F52BA] transition-colors mb-4">
                        <art.icon size={20} />
                      </div>
                      <h3 className="font-black text-slate-800 text-xl group-hover:text-[#0F52BA] transition-colors leading-tight">
                        {art.title}
                      </h3>
                      <p className="text-slate-500 text-sm font-medium mt-3 leading-relaxed">
                        {art.desc}
                      </p>
                    </div>

                    {/* FOOTER CARD */}
                    <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-50">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-[#0F52BA] transition-colors">
                        Mulai Membaca
                      </span>
                      <div className="w-9 h-9 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-[#0F52BA] group-hover:text-white transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-slate-400 font-bold text-sm">
                Tidak ada artikel kejahatan siber yang cocok dengan pencarian
                Anda.
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
