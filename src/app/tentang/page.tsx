"use client";

import Sidebar from "@/components/Sidebar";
import {
  ShieldCheck,
  Target,
  Eye,
  Award,
  Users,
  CheckCircle2,
  Shield,
  Globe,
  Laptop,
  Lock,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function TentangKamiPage() {
  const coreValues = [
    {
      title: "Integritas",
      desc: "Berkomitmen pada kebenaran dan transparansi dalam setiap informasi.",
      icon: Award,
    },
    {
      title: "Profesionalisme",
      desc: "Menyajikan analisis dan standar keamanan siber tingkat tinggi.",
      icon: ShieldCheck,
    },
    {
      title: "Inovasi",
      desc: "Terus berkembang mengikuti tren dan taktik kejahatan digital terbaru.",
      icon: Laptop,
    },
    {
      title: "Kolaborasi",
      desc: "Bekerja sama dengan berbagai elemen untuk ekosistem digital yang aman.",
      icon: Users,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        {/* 1. HERO SECTION */}
        <section className="relative h-[500px] w-full overflow-hidden flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Hero Tentang Kami"
          />
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-8 mt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Shield size={14} /> Garda Siber Nasional
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase mb-6">
              Menjaga Ruang Digital <br />{" "}
              <span className="text-blue-500">Nusantara</span>
            </h1>
            <p className="text-lg text-slate-300 font-medium max-w-2xl mx-auto">
              Pusat edukasi, informasi, dan mitigasi ancaman siber untuk
              menciptakan ekosistem digital yang aman, cerdas, dan tangguh bagi
              seluruh masyarakat.
            </p>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-8 lg:px-12 py-20 space-y-32">
          {/* 2. TENTANG KAMI */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-100 rounded-[3rem] transform -rotate-3 z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80"
                alt="Tentang Kami"
                className="relative z-10 rounded-[2.5rem] shadow-2xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 border border-slate-50">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center">
                  <Lock size={32} />
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900">24/7</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Pemantauan Aktif
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
                Siapa Kami?
              </h2>
              <div className="w-20 h-2 bg-blue-600 rounded-full"></div>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Garda Siber lahir dari kesadaran akan meningkatnya eskalasi
                ancaman kejahatan digital di Indonesia. Kami berkolaborasi erat
                dengan otoritas penegak hukum, termasuk tim Siber Polri dan
                Ditreskrimsus, untuk tidak hanya menindak, tetapi juga melakukan
                tindakan preventif.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Fokus utama kami adalah memberikan edukasi yang mudah dipahami
                oleh masyarakat awam, menyajikan analisis ancaman terkini, dan
                membangun kesadaran keamanan informasi di semua lapisan.
              </p>
            </div>
          </section>

          {/* 3. VISI & MISI */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <Target size={48} className="text-blue-600 mb-8" />
              <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase">
                Visi
              </h3>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                Menjadi rujukan utama dan pilar edukasi keamanan siber nasional
                demi mewujudkan masyarakat Indonesia yang kebal terhadap
                manipulasi dan ancaman digital.
              </p>
            </div>
            <div className="bg-slate-900 p-12 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <Eye size={48} className="text-blue-400 mb-8" />
              <h3 className="text-3xl font-black mb-4 uppercase">Misi</h3>
              <ul className="space-y-4">
                {[
                  "Meningkatkan literasi digital publik.",
                  "Memetakan dan menganalisis ancaman siber terkini.",
                  "Menyediakan panduan mitigasi yang aplikatif.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-blue-400 shrink-0 mt-1"
                      size={20}
                    />
                    <span className="font-medium text-slate-300 text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 4. CORE VALUES */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-4">
                Nilai Inti Kami
              </h2>
              <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                Prinsip yang menjadi landasan kami dalam setiap langkah edukasi
                dan perlindungan.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((val, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-[2rem] border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl"
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <val.icon size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {val.title}
                  </h4>
                  <p className="text-slate-500 text-sm font-medium">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 5. TIM KAMI */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-4">
                Tim Komando
              </h2>
              <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                Para profesional di balik layar yang berdedikasi menjaga
                keamanan ruang siber Anda.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-lg group">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                    alt="Irgi"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Direktur / UI&UX Lead
                    </span>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-2xl font-black text-slate-900">Irgi</h4>
                  <p className="text-slate-500 font-medium text-sm mt-2">
                    Cyber Design Specialist & Educator. Aktif mengembangkan
                    platform edukasi publik bersama instansi kepolisian.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                    alt="Sarah"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-6 z-10">
                    <span className="bg-slate-800 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Lead Threat Analyst
                    </span>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold text-slate-900">
                    Dr. Sarah Wijaya
                  </h4>
                  <p className="text-slate-500 font-medium text-sm mt-2">
                    Pakar forensik digital dengan pengalaman 10 tahun membedah
                    arsitektur malware.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80"
                    alt="Budi"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-6 z-10">
                    <span className="bg-slate-800 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Head of Operations
                    </span>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold text-slate-900">
                    Budi Santoso
                  </h4>
                  <p className="text-slate-500 font-medium text-sm mt-2">
                    Spesialis rekayasa sosial dan koordinator penyuluhan
                    keamanan siber nasional.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. GALERI KEGIATAN */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                Galeri Kegiatan
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80"
                alt="G1"
                className="rounded-2xl h-48 w-full object-cover shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
              />
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&q=80"
                alt="G2"
                className="rounded-2xl h-48 w-full object-cover shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
              />
              <img
                src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6?w=500&q=80"
                alt="G3"
                className="rounded-2xl h-48 w-full object-cover shadow-sm md:col-span-2 hover:scale-[1.02] transition-transform cursor-pointer"
              />
            </div>
          </section>

          {/* 7. PETA DI PALING BAWAH TANPA JUDUL */}
          <section className="w-full h-[450px] rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.4371424364493!2d104.73733507604313!3d-2.961004240114003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75e7474d1b8f%3A0xb49ed2abd2c5b2c8!2sMarkas%20Besar%20POLDA%20Sumatera%20Selatan!5e0!3m2!1sid!2sid!4v1715843200000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </section>
        </main>

        {/* 8. CTA FOOTER & SOSMED */}
        <footer className="bg-slate-900 border-t-8 border-blue-600 py-16 mt-auto">
          <div className="max-w-5xl mx-auto px-8 text-center">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-6">
              Tingkatkan Keamanan Anda Hari Ini
            </h2>
            <p className="text-slate-400 font-medium text-lg mb-10 max-w-2xl mx-auto">
              Pelajari berbagai jenis ancaman siber yang mengintai Anda, atau
              segera hubungi kami untuk mendapatkan panduan pencegahan lebih
              lanjut.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/ancaman"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <Shield size={18} /> Mulai Belajar
              </Link>
              <button className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <MessageSquare size={18} /> Hubungi Kami
              </button>
            </div>

            {/* INTEGRASI LOGO SOSIAL MEDIA (CUSTOM SVG) */}
            <div className="mt-12 pt-8 border-t border-slate-800/60">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
                Terhubung Melalui Akun Siber Sumsel
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {/* Instagram SVG */}
                <Link
                  href="https://www.instagram.com/sibersumsel?igsh=MXJ6c3ltM2ttNmd0OQ=="
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-5 py-3 rounded-xl border border-slate-700/50 transition-all font-bold text-xs uppercase tracking-wider"
                >
                  <svg
                    className="w-4 h-4 text-pink-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="2" width="20" h="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  Instagram Siber
                </Link>
                {/* TikTok SVG */}
                <Link
                  href="https://www.tiktok.com/@sibersumsel?_r=1&_t=ZS-96P5gQGJ5vB"
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-5 py-3 rounded-xl border border-slate-700/50 transition-all font-bold text-xs uppercase tracking-wider"
                >
                  <svg
                    className="w-4 h-4 text-cyan-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.03 1.6 4.21 1.15 1.4 2.81 2.3 4.6 2.53v3.8c-1.88-.07-3.7-.76-5.18-1.94-.15-.12-.29-.26-.42-.4v8.1c-.06 3.42-2.18 6.53-5.38 7.77-3.2 1.25-6.86.6-9.37-1.63-2.52-2.24-3.32-5.89-2-8.97 1.3-3.04 4.54-4.87 7.85-4.44v3.85c-.04-.01-.08-.01-.12-.01-1.74-.11-3.35.88-3.92 2.52-.57 1.65.1 3.49 1.6 4.44 1.49.96 3.49.69 4.67-.64.55-.61.84-1.4.82-2.22V0h.04z" />
                  </svg>
                  TikTok Siber
                </Link>
              </div>
            </div>

            <div className="mt-12 text-slate-500 text-xs font-medium">
              © {new Date().getFullYear()} Garda Siber Nasional. All rights
              reserved. <br />
              Aman, Cerdas, Terlindungi.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
