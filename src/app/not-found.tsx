import Link from "next/link";
import { ShieldAlert, Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Ikon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-blue-50 rounded-[2.5rem] flex items-center justify-center">
              <ShieldAlert size={64} className="text-[#0F52BA]" />
            </div>
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
              !
            </div>
          </div>
        </div>

        {/* Kode Error */}
        <p className="text-[120px] font-black text-slate-100 leading-none select-none -mt-4">
          404
        </p>

        {/* Teks */}
        <div className="-mt-6 mb-8">
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
            Pastikan URL yang dimasukkan sudah benar.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-[#0F52BA] text-white px-6 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-[#0F52BA]/90 transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
          >
            <Home size={16} /> Kembali ke Beranda
          </Link>
          <Link
            href="/artikel"
            className="flex items-center justify-center gap-2 bg-white text-slate-700 px-6 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider border border-slate-200 hover:bg-slate-50 transition-all hover:-translate-y-0.5"
          >
            <Search size={16} /> Baca Artikel
          </Link>
        </div>

        {/* Link cepat */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
            Atau kunjungi halaman lain
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { href: "/ancaman", label: "Katalog Ancaman" },
              { href: "/tips", label: "Tips Keamanan" },
              { href: "/tentang", label: "Tentang Kami" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 text-xs font-bold text-[#0F52BA] bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors"
              >
                <ArrowLeft size={12} /> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
