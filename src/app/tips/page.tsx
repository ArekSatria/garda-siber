import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import {
  Lightbulb,
  CheckCircle2,
  ShieldCheck,
  KeyRound,
  Smartphone,
  Eye,
  Lock,
  Globe,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tips Keamanan Digital",
  description:
    "Panduan praktis keamanan digital: cara aman mengelola akun, privasi media sosial, keamanan perangkat, dan transaksi digital.",
};

export default function TipsPage() {
  const securityTips = [
    {
      category: "Akun & Password",
      icon: KeyRound,
      color: "text-blue-600 bg-blue-50",
      items: [
        "Gunakan kombinasi minimal 12 karakter (huruf, angka, simbol).",
        "Aktifkan Two-Factor Authentication (2FA) di semua akun.",
        "Jangan gunakan satu password untuk banyak akun berbeda.",
      ],
    },
    {
      category: "Privasi Media Sosial",
      icon: Eye,
      color: "text-purple-600 bg-purple-50",
      items: [
        "Atur profil Anda menjadi 'Private' jika tidak diperlukan.",
        "Berhati-hatilah saat membagikan lokasi secara real-time.",
        "Hapus aplikasi pihak ketiga yang tidak lagi digunakan.",
      ],
    },
    {
      category: "Keamanan Perangkat",
      icon: Smartphone,
      color: "text-green-600 bg-green-50",
      items: [
        "Selalu update sistem operasi (iOS/Android) ke versi terbaru.",
        "Jangan melakukan 'Root' atau 'Jailbreak' pada ponsel Anda.",
        "Pasang aplikasi antivirus atau pemindai malware resmi.",
      ],
    },
    {
      category: "Transaksi Digital",
      icon: ShieldCheck,
      color: "text-orange-600 bg-orange-50",
      items: [
        "Pastikan URL toko online menggunakan 'https://'.",
        "Hindari bertransaksi menggunakan WiFi publik gratisan.",
        "Periksa riwayat mutasi rekening secara berkala.",
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <main className="p-10">
          <header className="mb-12">
            <div className="flex items-center gap-3 text-primary font-bold mb-2">
              <Lightbulb size={24} className="text-yellow-500" />
              <span className="tracking-widest uppercase text-sm">
                Panduan Praktis
              </span>
            </div>
            <br />
            <h1 className="text-3xl font-extrabold text-slate-900">
              Tips Keamanan Digital
            </h1>
            <p className="text-slate-500 mt-2">
              Langkah sederhana yang bisa Anda lakukan sekarang untuk melindungi
              data pribadi.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityTips.map((group, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl ${group.color}`}>
                    <group.icon size={24} />
                  </div>
                  <h3 className="font-bold text-xl text-slate-800">
                    {group.category}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {group.items.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <div className="mt-1">
                        <CheckCircle2 size={18} className="text-primary" />
                      </div>
                      <p className="text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                        {tip}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Banner Ajakan Bawah */}
          <div className="mt-12 bg-primary rounded-3xl p-8 text-center text-white shadow-xl shadow-primary/20">
            <h3 className="text-xl font-bold mb-2">
              Punya pertanyaan tentang keamanan?
            </h3>
            <p className="text-primary-light mb-6 text-sm">
              Tim kami siap membantu mengedukasi Anda lebih dalam mengenai
              proteksi data.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all">
              Hubungi Kami
            </button>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
