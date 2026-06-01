import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  FileWarning,
  ListTree,
  Lock,
  Mail,
  ShieldAlert,
  Smartphone,
  Wifi,
} from "lucide-react";

import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";
import { getAllThreats } from "@/data/threats";
import { getThreatColorStyle } from "@/constants/threats";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Threat = ReturnType<typeof getAllThreats>[number];

type ThreatGuide = {
  whatIsIt: string;
  howItWorks: string[];
  warningSigns: string[];
  prevention: string[];
  ifAffected: string[];
};

function getThreatById(id: string): Threat | undefined {
  return getAllThreats().find((item) => item.id === id);
}

function getThreatIcon(title: string) {
  const value = title.toLowerCase();

  if (value.includes("phishing")) return Mail;
  if (value.includes("wifi")) return Wifi;
  if (value.includes("sim")) return Smartphone;
  if (value.includes("ransom")) return Lock;
  if (value.includes("apk") || value.includes("undangan")) return FileWarning;

  return ShieldAlert;
}

function getThreatGuide(title: string): ThreatGuide {
  const value = title.toLowerCase();

  if (value.includes("phishing")) {
    return {
      whatIsIt:
        "Phishing adalah penipuan digital yang bertujuan mencuri informasi penting, seperti password, kode OTP, data rekening, atau identitas pribadi. Modus ini biasanya dibuat menyerupai layanan resmi agar korban merasa yakin dan bertindak tanpa verifikasi lebih dulu.",
      howItWorks: [
        "Pelaku mengirim pesan, email, atau tautan yang terlihat meyakinkan dan seolah berasal dari pihak resmi.",
        "Korban diarahkan ke halaman palsu yang tampilannya dibuat mirip dengan situs asli.",
        "Saat data dimasukkan, informasi tersebut langsung dicuri dan dapat dipakai untuk mengambil alih akun atau melakukan penyalahgunaan lain.",
      ],
      warningSigns: [
        "Pesan bernada mendesak, panik, atau menakut-nakuti agar Anda segera bertindak.",
        "Alamat situs terlihat mirip dengan yang asli, tetapi ada perbedaan kecil pada domain atau ejaan.",
        "Ada permintaan OTP, PIN, password, atau data pribadi secara langsung.",
      ],
      prevention: [
        "Periksa kembali alamat situs sebelum login atau mengisi informasi penting.",
        "Hindari mengklik tautan dari pesan yang tidak jelas sumbernya.",
        "Aktifkan verifikasi dua langkah untuk menambah lapisan keamanan akun.",
        "Jika ragu, lakukan konfirmasi melalui kanal resmi layanan terkait.",
      ],
      ifAffected: [
        "Segera ganti password akun yang diduga terdampak.",
        "Keluar dari seluruh sesi login jika fitur tersebut tersedia.",
        "Perbarui pengamanan akun, termasuk verifikasi dua langkah.",
        "Laporkan kejadian ke layanan resmi agar akun dapat diamankan lebih cepat.",
      ],
    };
  }

  if (value.includes("wifi")) {
    return {
      whatIsIt:
        "WiFi publik memang praktis, tetapi tidak selalu aman. Jika digunakan tanpa kehati-hatian, jaringan seperti ini dapat membuka celah bagi pihak lain untuk memantau aktivitas Anda atau bahkan memancing Anda terhubung ke koneksi palsu.",
      howItWorks: [
        "Pelaku dapat membuat hotspot palsu dengan nama yang menyerupai jaringan resmi.",
        "Pengguna yang terhubung ke jaringan tidak aman berisiko mengirim data tanpa perlindungan yang memadai.",
        "Aktivitas seperti login akun, membuka email, atau mengakses layanan keuangan dapat menjadi lebih rentan.",
      ],
      warningSigns: [
        "Nama jaringan terlihat familiar, tetapi tidak jelas siapa penyedianya.",
        "Muncul halaman login yang janggal atau meminta informasi berlebihan.",
        "Koneksi terasa tidak normal, sering terputus, atau menunjukkan perilaku yang mencurigakan.",
      ],
      prevention: [
        "Hindari login ke akun penting saat memakai jaringan publik.",
        "Gunakan jaringan seluler pribadi bila memungkinkan.",
        "Matikan fitur auto-connect agar perangkat tidak tersambung otomatis.",
        "Pastikan Anda hanya terhubung ke jaringan yang benar-benar jelas dan tepercaya.",
      ],
      ifAffected: [
        "Segera ganti password akun yang sempat diakses melalui jaringan tersebut.",
        "Keluar dari akun aktif dan periksa apakah ada sesi asing.",
        "Hapus jaringan mencurigakan dari daftar koneksi tersimpan.",
        "Pantau aktivitas akun untuk memastikan tidak ada penyalahgunaan lanjutan.",
      ],
    };
  }

  if (value.includes("sim")) {
    return {
      whatIsIt:
        "SIM swap adalah pengambilalihan nomor ponsel korban oleh pelaku. Nomor yang berhasil dipindahkan kemudian digunakan untuk menerima SMS, kode OTP, dan notifikasi keamanan yang seharusnya hanya diterima oleh pemilik asli.",
      howItWorks: [
        "Pelaku lebih dulu mengumpulkan data pribadi korban.",
        "Data tersebut dipakai untuk mencoba memindahkan nomor ke kartu SIM yang mereka kuasai.",
        "Setelah berhasil, nomor yang diambil alih dapat digunakan untuk mengakses akun lain yang terhubung dengan OTP berbasis SMS.",
      ],
      warningSigns: [
        "Sinyal ponsel tiba-tiba hilang tanpa sebab yang jelas.",
        "Anda tidak lagi menerima SMS atau panggilan seperti biasa.",
        "Muncul notifikasi login, reset password, atau aktivitas akun yang tidak Anda lakukan.",
      ],
      prevention: [
        "Batasi penyebaran data pribadi, terutama nomor ponsel dan identitas penting.",
        "Gunakan lapisan keamanan tambahan selain OTP berbasis SMS bila memungkinkan.",
        "Waspadai panggilan atau pesan yang mencoba menggali informasi pribadi.",
        "Segera hubungi operator jika nomor Anda mendadak bermasalah tanpa alasan teknis yang jelas.",
      ],
      ifAffected: [
        "Hubungi operator seluler secepat mungkin untuk mengamankan nomor Anda.",
        "Segera ubah password akun yang terhubung dengan nomor tersebut.",
        "Periksa email, mobile banking, dan akun penting lain untuk melihat kemungkinan penyalahgunaan.",
        "Pantau riwayat login dan lakukan pemulihan akun bila diperlukan.",
      ],
    };
  }

  if (value.includes("ransom")) {
    return {
      whatIsIt:
        "Ransomware adalah malware yang mengunci file atau sistem, lalu meminta tebusan agar akses dipulihkan. Serangan ini berbahaya karena dapat menghentikan aktivitas, mengganggu operasional, dan menimbulkan kerugian yang besar.",
      howItWorks: [
        "Infeksi biasanya masuk lewat file berbahaya, lampiran email, tautan palsu, atau sistem yang belum diperbarui.",
        "Setelah aktif, ransomware mengenkripsi data atau membatasi akses ke perangkat.",
        "Korban kemudian menerima pesan tuntutan pembayaran agar file dibuka kembali.",
      ],
      warningSigns: [
        "File mendadak tidak bisa dibuka atau berubah format tanpa alasan jelas.",
        "Muncul pesan tebusan atau peringatan asing di layar perangkat.",
        "Sistem melambat, terkunci, atau tidak berfungsi seperti biasa.",
      ],
      prevention: [
        "Lakukan backup data secara berkala dan simpan salinannya di lokasi terpisah.",
        "Jangan membuka file atau lampiran dari sumber yang tidak tepercaya.",
        "Pastikan sistem operasi dan aplikasi selalu diperbarui.",
        "Gunakan perlindungan keamanan yang memadai di perangkat dan jaringan.",
      ],
      ifAffected: [
        "Segera putuskan perangkat dari jaringan untuk mencegah penyebaran.",
        "Jangan terburu-buru membayar tuntutan tanpa analisis yang tepat.",
        "Lakukan identifikasi dampak dan prioritaskan pemulihan dari backup yang aman.",
        "Laporkan insiden kepada pihak yang berwenang atau tim teknis terkait.",
      ],
    };
  }

  if (value.includes("deepfake")) {
    return {
      whatIsIt:
        "Deepfake adalah manipulasi audio, video, atau gambar dengan bantuan AI sehingga tampak seolah-olah asli. Konten seperti ini dapat digunakan untuk menipu, memfitnah, atau memancing korban mengambil keputusan yang keliru.",
      howItWorks: [
        "Pelaku menggunakan data visual atau suara untuk membuat tiruan digital seseorang.",
        "Hasil manipulasi lalu disebarkan agar terlihat meyakinkan di mata korban.",
        "Korban dapat diarahkan untuk percaya, panik, atau mengikuti instruksi palsu.",
      ],
      warningSigns: [
        "Gerakan bibir, ekspresi, atau suara terasa tidak sepenuhnya natural.",
        "Ada permintaan mendesak yang tidak biasa dari sosok yang tampak dikenal.",
        "Konten beredar sangat cepat tanpa sumber resmi yang jelas.",
      ],
      prevention: [
        "Jangan langsung percaya pada video atau suara hanya karena terlihat meyakinkan.",
        "Lakukan verifikasi melalui kanal resmi atau komunikasi langsung.",
        "Periksa konteks, sumber unggahan, dan konsistensi informasinya.",
        "Biasakan menunda keputusan penting sampai data benar-benar terkonfirmasi.",
      ],
      ifAffected: [
        "Simpan bukti konten yang beredar dan catat sumber penyebarannya.",
        "Segera lakukan klarifikasi melalui kanal resmi.",
        "Laporkan akun atau unggahan yang menyebarkan manipulasi tersebut.",
        "Beritahu pihak terkait agar dampaknya bisa dibatasi lebih cepat.",
      ],
    };
  }

  if (value.includes("apk") || value.includes("undangan")) {
    return {
      whatIsIt:
        "Scam APK adalah penipuan yang memanfaatkan file aplikasi palsu untuk menipu korban agar menginstal malware. Modus ini sering dibungkus dalam bentuk undangan digital, resi paket, surat tilang, atau file penting lain yang memancing rasa penasaran.",
      howItWorks: [
        "Korban menerima file atau tautan yang diklaim penting dan harus segera dibuka.",
        "Saat file diinstal, aplikasi berbahaya sering meminta izin akses yang berlebihan.",
        "Data korban kemudian dapat dicuri, termasuk SMS, kontak, notifikasi, atau akses ke akun tertentu.",
      ],
      warningSigns: [
        "File dikirim di luar toko aplikasi resmi.",
        "Aplikasi meminta izin yang tidak masuk akal untuk fungsi yang sangat sederhana.",
        "Pesan pengirim dibuat mendesak agar Anda segera menginstal file tersebut.",
      ],
      prevention: [
        "Hanya instal aplikasi dari toko resmi seperti Google Play Store atau App Store.",
        "Periksa izin akses aplikasi sebelum menyetujui pemasangan.",
        "Jangan mudah membuka file APK dari pesan pribadi, grup, atau sumber acak.",
        "Jika fungsi aplikasi sederhana tetapi izin yang diminta berlebihan, segera curigai.",
      ],
      ifAffected: [
        "Putuskan koneksi internet sementara bila diperlukan.",
        "Hapus aplikasi mencurigakan dari perangkat.",
        "Periksa izin akses yang sudah terlanjur diberikan.",
        "Ganti password akun penting dan pantau aktivitas yang tidak wajar.",
      ],
    };
  }

  if (value.includes("skimming")) {
    return {
      whatIsIt:
        "Skimming adalah pencurian data kartu yang dilakukan dengan alat tambahan pada mesin pembayaran atau ATM. Data yang berhasil dicuri dapat dipakai untuk transaksi ilegal atau penyalinan kartu.",
      howItWorks: [
        "Pelaku memasang alat tersembunyi pada slot kartu atau area tombol PIN.",
        "Data kartu direkam saat korban melakukan transaksi.",
        "Informasi tersebut kemudian digunakan untuk penyalahgunaan lebih lanjut.",
      ],
      warningSigns: [
        "Ada bagian mesin ATM atau alat pembayaran yang terlihat longgar, aneh, atau tidak rapi.",
        "Terdapat perangkat tambahan yang tidak biasa di dekat slot kartu atau keypad.",
        "Setelah transaksi, muncul aktivitas mencurigakan pada rekening atau kartu Anda.",
      ],
      prevention: [
        "Periksa kondisi mesin sebelum digunakan.",
        "Tutup keypad saat memasukkan PIN.",
        "Gunakan ATM atau mesin pembayaran di lokasi yang lebih aman dan diawasi.",
        "Pantau mutasi rekening atau notifikasi transaksi secara rutin.",
      ],
      ifAffected: [
        "Segera blokir kartu yang diduga terdampak.",
        "Hubungi bank untuk melaporkan transaksi mencurigakan.",
        "Ganti PIN dan periksa seluruh riwayat transaksi.",
        "Ajukan penanganan resmi sesuai prosedur pihak penerbit kartu.",
      ],
    };
  }

  if (value.includes("identitas") || value.includes("identity")) {
    return {
      whatIsIt:
        "Pencurian identitas terjadi ketika data pribadi seseorang digunakan tanpa izin untuk penipuan, pendaftaran akun palsu, pinjaman ilegal, atau tindakan lain yang merugikan korban.",
      howItWorks: [
        "Data pribadi dikumpulkan dari kebocoran, manipulasi, atau kelalaian pengguna.",
        "Pelaku memakai data tersebut untuk menyamar sebagai korban.",
        "Korban sering baru menyadari setelah muncul tagihan, akun asing, atau penyalahgunaan lain.",
      ],
      warningSigns: [
        "Ada akun, layanan, atau transaksi yang tidak pernah Anda buat.",
        "Muncul notifikasi pinjaman, verifikasi, atau registrasi yang terasa asing.",
        "Data pribadi Anda tiba-tiba digunakan di tempat yang tidak pernah Anda setujui.",
      ],
      prevention: [
        "Batasi penyebaran dokumen dan data pribadi di ruang digital.",
        "Jangan mudah membagikan foto identitas, OTP, atau data sensitif.",
        "Gunakan pengamanan tambahan pada email dan akun utama.",
        "Rutin cek apakah ada aktivitas yang tidak sesuai dengan penggunaan normal Anda.",
      ],
      ifAffected: [
        "Segera amankan email dan akun utama yang terkait.",
        "Laporkan penyalahgunaan ke layanan yang relevan.",
        "Simpan bukti aktivitas mencurigakan untuk proses tindak lanjut.",
        "Pantau akun dan data pribadi Anda secara lebih ketat dalam beberapa waktu ke depan.",
      ],
    };
  }

  return {
    whatIsIt:
      "Ancaman digital adalah risiko yang dapat memengaruhi keamanan akun, perangkat, data, maupun aktivitas Anda di ruang digital. Ancaman ini tidak selalu terlihat jelas, tetapi sering memanfaatkan kelengahan dan kurangnya verifikasi.",
    howItWorks: [
      "Pelaku biasanya memanfaatkan rasa panik, rasa percaya, atau kurangnya kewaspadaan pengguna.",
      "Serangan dapat datang melalui pesan, tautan, file, aplikasi, atau akses jaringan.",
      "Jika tidak dikenali sejak awal, dampaknya dapat berupa pencurian data, pengambilalihan akun, atau kerugian lain.",
    ],
    warningSigns: [
      "Ada permintaan data atau tindakan yang terasa tidak biasa.",
      "Muncul tautan, file, aplikasi, atau notifikasi yang mencurigakan.",
      "Terjadi aktivitas akun atau perangkat yang tidak Anda kenali.",
    ],
    prevention: [
      "Biasakan memeriksa ulang informasi sebelum bertindak.",
      "Gunakan password yang kuat dan aktifkan verifikasi dua langkah.",
      "Perbarui perangkat dan aplikasi secara berkala.",
      "Jangan mudah percaya pada pesan mendesak tanpa verifikasi.",
    ],
    ifAffected: [
      "Segera amankan akun dan perangkat yang terdampak.",
      "Ganti password bila diperlukan.",
      "Periksa aktivitas login dan penggunaan akun.",
      "Laporkan kejadian ke pihak resmi atau layanan terkait.",
    ],
  };
}

export async function generateStaticParams() {
  return getAllThreats().map((threat) => ({
    id: threat.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const threat = getThreatById(id);

  if (!threat) {
    return {
      title: "Ancaman Tidak Ditemukan",
    };
  }

  return {
    title: `${threat.title} | Garda Siber`,
    description: threat.shortDesc,
  };
}

function renderList(
  items: string[],
  tone: "blue" | "amber" | "emerald" | "red",
) {
  const colorMap = {
    blue: "text-[#0F52BA]",
    amber: "text-amber-700",
    emerald: "text-emerald-700",
    red: "text-red-700",
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
        >
          <CheckCircle2
            size={18}
            className={`mt-0.5 shrink-0 ${colorMap[tone]}`}
          />
          <p className="text-sm leading-7 text-slate-600">{item}</p>
        </div>
      ))}
    </div>
  );
}

export default async function ThreatDetailPage({ params }: PageProps) {
  const { id } = await params;
  const allThreats = getAllThreats();
  const threat = allThreats.find((item) => item.id === id);

  if (!threat) {
    notFound();
  }

  const currentIndex = allThreats.findIndex((item) => item.id === id);
  const previousThreat = currentIndex > 0 ? allThreats[currentIndex - 1] : null;
  const nextThreat =
    currentIndex >= 0 && currentIndex < allThreats.length - 1
      ? allThreats[currentIndex + 1]
      : null;

  const relatedThreats = allThreats
    .filter((item) => item.id !== id)
    .filter(
      (item) => item.level === threat.level || item.color === threat.color,
    )
    .slice(0, 3);

  const Icon = getThreatIcon(threat.title);
  const guide = getThreatGuide(threat.title);
  const colorStyle = getThreatColorStyle(threat.color);

  return (
    <PageLayout>
      <article className="min-h-screen bg-[#F8FAFC]">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="transition hover:text-[#0F52BA]">
                Beranda
              </Link>
              <span>/</span>
              <Link href="/ancaman" className="transition hover:text-[#0F52BA]">
                Ancaman
              </Link>
              <span>/</span>
              <span className="font-medium text-slate-700">{threat.title}</span>
            </nav>

            <Link
              href="/ancaman"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F52BA] transition hover:gap-3"
            >
              <ArrowLeft size={16} />
              Kembali ke daftar ancaman
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${colorStyle.badgeClass}`}
              >
                {threat.level}
              </span>

              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0F52BA]">
                Materi Edukasi
              </span>
            </div>

            <div className="mt-5 max-w-5xl">
              <h1 className="text-balance text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-[3.2rem] lg:leading-[1.05]">
                {threat.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {threat.shortDesc}
              </p>
            </div>

            <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <Icon size={16} />
                  Materi ancaman digital
                </span>

                <span className="inline-flex items-center gap-2">
                  <BadgeCheck size={16} />
                  Fokus pada pencegahan dan respons awal
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/artikel"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Jelajahi Materi
                </Link>

                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cek Pengetahuan
                </Link>
              </div>
            </div>
          </div>
        </section>

        {threat.image ? (
          <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 shadow-sm">
              <div className="aspect-[16/8] w-full">
                <img
                  src={threat.image}
                  alt={threat.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-8">
              <section
                id="ringkasan"
                className="scroll-mt-28 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                    <BadgeCheck size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0F52BA]">
                      Ringkasan
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-900">
                      Apa ancaman ini?
                    </h2>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
                  {guide.whatIsIt}
                </p>
              </section>

              <section
                id="cara-kerja"
                className="scroll-mt-28 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                    <ShieldAlert size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0F52BA]">
                      Mekanisme
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-900">
                      Bagaimana ancaman ini bekerja
                    </h2>
                  </div>
                </div>

                <div className="mt-6">
                  {renderList(guide.howItWorks, "blue")}
                </div>
              </section>

              <section
                id="tanda"
                className="scroll-mt-28 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                    <AlertTriangle size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">
                      Waspada
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-900">
                      Tanda yang perlu diperhatikan
                    </h2>
                  </div>
                </div>

                <div className="mt-6">
                  {renderList(guide.warningSigns, "amber")}
                </div>
              </section>

              <section
                id="pencegahan"
                className="scroll-mt-28 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <BadgeCheck size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">
                      Pencegahan
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-900">
                      Langkah yang dapat dilakukan sejak awal
                    </h2>
                  </div>
                </div>

                <div className="mt-6">
                  {renderList(guide.prevention, "emerald")}
                </div>
              </section>

              <section
                id="jika-terdampak"
                className="scroll-mt-28 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                    <AlertTriangle size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700">
                      Respons Awal
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-900">
                      Apa yang sebaiknya dilakukan jika sudah terdampak
                    </h2>
                  </div>
                </div>

                <div className="mt-6">
                  {renderList(guide.ifAffected, "red")}
                </div>
              </section>

              {(previousThreat || nextThreat) && (
                <div className="grid gap-4 md:grid-cols-2">
                  {previousThreat ? (
                    <Link
                      href={`/ancaman/${previousThreat.id}`}
                      className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        Ancaman sebelumnya
                      </p>
                      <h3 className="mt-3 text-lg font-black leading-snug text-slate-900">
                        {previousThreat.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {previousThreat.shortDesc}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA] transition group-hover:gap-3">
                        Lihat ancaman
                        <ChevronRight size={16} />
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextThreat ? (
                    <Link
                      href={`/ancaman/${nextThreat.id}`}
                      className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        Ancaman berikutnya
                      </p>
                      <h3 className="mt-3 text-lg font-black leading-snug text-slate-900">
                        {nextThreat.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {nextThreat.shortDesc}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA] transition group-hover:gap-3">
                        Lihat ancaman
                        <ChevronRight size={16} />
                      </span>
                    </Link>
                  ) : null}
                </div>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-[112px] lg:self-start">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#0F52BA]">
                    <ListTree size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0F52BA]">
                      Daftar Isi
                    </p>
                    <h3 className="mt-1 text-lg font-black text-slate-900">
                      Navigasi cepat
                    </h3>
                  </div>
                </div>

                <nav className="mt-5 space-y-2">
                  <a
                    href="#ringkasan"
                    className="block rounded-2xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    Ringkasan ancaman
                  </a>
                  <a
                    href="#cara-kerja"
                    className="block rounded-2xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    Cara kerja
                  </a>
                  <a
                    href="#tanda"
                    className="block rounded-2xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    Tanda yang perlu diwaspadai
                  </a>
                  <a
                    href="#pencegahan"
                    className="block rounded-2xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    Langkah pencegahan
                  </a>
                  <a
                    href="#jika-terdampak"
                    className="block rounded-2xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    Jika sudah terdampak
                  </a>
                </nav>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${colorStyle.cardBg}`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0F52BA]">
                      Info Ancaman
                    </p>
                    <h3 className="mt-1 text-lg font-black text-slate-900">
                      Detail singkat
                    </h3>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Tingkat
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {threat.level}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Fokus materi
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      Pencegahan dan respons awal
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Jenis konten
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      Edukasi ancaman digital
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(135deg,#FFF9ED_0%,#FFFFFF_55%,#F8FAFC_100%)] p-6 shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">
                  Langkah berikutnya
                </p>
                <h3 className="mt-2 text-xl font-black text-slate-900">
                  Lanjutkan pemahaman Anda
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Setelah memahami ancaman ini, lanjutkan ke materi lain atau
                  cek pemahaman Anda melalui quiz singkat.
                </p>

                <div className="mt-5 grid gap-3">
                  <Link
                    href="/artikel"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#0F52BA] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
                  >
                    Jelajahi Materi
                  </Link>

                  <Link
                    href="/quiz"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cek Pengetahuan
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {relatedThreats.length > 0 ? (
          <section className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-700">
                    <AlertTriangle size={14} />
                    Rekomendasi
                  </div>

                  <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                    Ancaman lain yang juga penting untuk dikenali
                  </h2>
                  <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
                    Mempelajari lebih dari satu pola ancaman akan membantu Anda
                    membangun kewaspadaan yang lebih menyeluruh.
                  </p>
                </div>

                <Link
                  href="/ancaman"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA]"
                >
                  Lihat semua ancaman
                  <ChevronRight size={16} />
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {relatedThreats.map((item) => (
                  <Link
                    key={item.id}
                    href={`/ancaman/${item.id}`}
                    className="group rounded-[30px] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700">
                        {item.level}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-black leading-tight text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.shortDesc}
                    </p>

                    <div className="mt-5 border-t border-slate-200 pt-4">
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0F52BA] transition group-hover:gap-3">
                        Lihat ancaman
                        <ChevronRight size={16} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[34px] border border-slate-200 bg-[linear-gradient(135deg,#FFF9ED_0%,#FFFFFF_55%,#F8FAFC_100%)] p-8 shadow-sm sm:p-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-700">
                  <AlertTriangle size={14} />
                  Lanjut Belajar
                </div>

                <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                  Pahami ancaman lain dan perkuat kebiasaan digital yang aman
                </h2>

                <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                  Semakin banyak pola ancaman yang Anda kenali, semakin baik
                  kemampuan Anda untuk mencegah kerugian dan mengambil langkah
                  yang tepat saat menghadapi risiko digital.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/ancaman"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F52BA] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
                  >
                    Kembali ke Ancaman
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/artikel"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Jelajahi Materi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </article>
    </PageLayout>
  );
}
