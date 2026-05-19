"use client";

import Sidebar from "@/components/Sidebar";
import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";

// 1. DATABASE KONTEN LENGKAP 12 ARTIKEL
const artikelContent: Record<string, any> = {
  "password-kuat": {
    title: "Cara Membuat Password yang Kuat dan Aman",
    category: "Password",
    date: "15 Mei 2026",
    readTime: "5 Menit Baca",
    author: "Tim Siber Sumsel",
    bannerImg: "/images/password.jpg",
    summary:
      "Banyak pengguna internet meremehkan pembuatan kata sandi. Menggunakan tanggal lahir atau nama hewan peliharaan adalah sasaran empuk bagi peretas menggunakan metode Automated Brute Force.",
    content: [
      "Metode Brute Force adalah teknik di mana peretas mencoba jutaan kombinasi kata sandi per detik menggunakan perangkat lunak khusus. Jika kata sandi Anda pendek atau mudah ditebak, akun Anda bisa dibobol dalam hitungan menit.",
      "Kunci utama dari kata sandi yang aman bukanlah kerumitannya yang membuat Anda lupa, melainkan panjang dan variasi karakternya. Menggabungkan beberapa kata acak (Passphrase) jauh lebih aman daripada satu kata yang rumit.",
    ],
    pointsTitle: "Langkah Menyusun Kata Sandi Standar Keamanan Tinggi:",
    points: [
      "Minimal menggunakan 12 karakter atau lebih tinggi.",
      "Kombinasikan Huruf Besar, Huruf Kecil, Angka, dan Simbol Unik (contoh: @, #, $).",
      "Hindari informasi pribadi seperti nomor HP, tanggal lahir, atau nama lengkap.",
      "Gunakan Passphrase (kalimat acak), contoh: 'KucingMakanKopi_2026!' lebih kuat daripada 'P@ssw0rd!'.",
      "Jangan pernah menggunakan satu kata sandi yang sama untuk beberapa akun penting.",
    ],
    footerTip:
      "Aktifkan selalu Multi-Factor Authentication (MFA) atau 2FA sebagai lapisan pertahanan kedua jika kata sandi Anda terlanjur bocor.",
  },
  "ciri-phishing": {
    title: "Kenali Ciri-Ciri Email Phishing Sebelum Terlambat",
    category: "Phishing",
    date: "12 Mei 2026",
    readTime: "6 Menit Baca",
    author: "Tim Siber Sumsel",
    bannerImg: "/images/email.jpg",
    summary:
      "Phishing adalah salah satu kejahatan siber tertua namun paling sering memakan korban. Pelaku memanipulasi psikologis korban agar menyerahkan data rahasia seperti PIN, Password, atau kode OTP.",
    content: [
      "Serangan phishing modern sering kali mengatasnamakan bank besar, instansi pemerintah, atau aplikasi dompet digital terkenal. Mereka mengirimkan pesan darurat yang meminta Anda melakukan tindakan cepat.",
      "Tujuan utama mereka adalah mengarahkan Anda ke situs web tiruan yang dibuat sangat mirip dengan aslinya. Begitu Anda memasukkan data login di situs palsu tersebut, pelaku langsung merekam dan menguras akun Anda.",
    ],
    pointsTitle: "Tanda-Tanda Utama Pesan Phishing yang Wajib Diwaspadai:",
    points: [
      "Alamat email pengirim mencurigakan (misal: admin@bankbni-palsu.com, bukan domain resmi bank).",
      "Gaya bahasa bernada ancaman atau mendesak (contoh: 'Akun Anda akan diblokir dalam 2 jam jika tidak verifikasi').",
      "Menyertakan tautan/link pendek yang aneh atau tidak dikenal.",
      "Meminta data sensitif seperti nomor kartu ATM, PIN, atau kode OTP yang seharusnya rahasia.",
      "Sering kali terdapat salah ketik atau tata bahasa yang tidak profesional.",
    ],
    footerTip:
      "Pihak bank atau instansi resmi tidak akan pernah meminta kode OTP atau PIN Anda melalui pesan teks atau telepon. Jaga kerahasiaan data Anda.",
  },
  "bahaya-wifi": {
    title: "Bahaya WiFi Publik dan Cara Melindungi Diri",
    category: "Jaringan",
    date: "18 Mei 2026",
    readTime: "5 Menit Baca",
    author: "Tim Siber Sumsel",
    bannerImg: "/images/wifi.jpg",
    summary:
      "Menghubungkan perangkat ke WiFi gratis di kafe, bandara, atau tempat umum tanpa pengamanan sangat berisiko. Peretas bisa dengan mudah mencegat data sensitif Anda melalui teknik penyadapan jaringan.",
    content: [
      "Melalui serangan Man-in-the-Middle (MitM), peretas memposisikan diri mereka di antara perangkat Anda dan router WiFi asli. Semua lalu lintas data yang Anda kirim, termasuk password dan data perbankan, bisa dibaca pelaku.",
      "Modus lain yang sering digunakan adalah 'Evil Twin WiFi', di mana pelaku membuat jaringan WiFi palsu dengan nama yang mirip dengan tempat umum tersebut (misal: 'Kafe_Gratis_Asli') untuk memancing korban terhubung.",
    ],
    pointsTitle: "Cara Aman Menggunakan Internet di Tempat Umum:",
    points: [
      "Jangan pernah melakukan transaksi perbankan atau login ke akun sensitif saat menggunakan WiFi publik.",
      "Selalu gunakan VPN (Virtual Private Network) tepercaya untuk mengenkripsi jalur koneksi internet Anda.",
      "Matikan fitur 'Auto-Connect WiFi' pada pengaturan smartphone atau laptop Anda.",
      "Pastikan situs web yang Anda akses menggunakan protokol aman 'HTTPS', bukan 'HTTP'.",
      "Lupakan jaringan (Forget Network) setelah Anda selesai menggunakan WiFi umum tersebut.",
    ],
    footerTip:
      "Lebih baik menggunakan kuota data seluler pribadi atau tethering mandiri saat harus mengakses hal-hal sensitif seperti Mobile Banking.",
  },
  "investasi-bodong": {
    title: "Modus Investasi Bodong yang Marak di Media Sosial",
    category: "Penipuan",
    date: "17 Mei 2026",
    readTime: "6 Menit Baca",
    author: "Tim Siber Sumsel",
    bannerImg: "/images/investasi.jpg",
    summary:
      "Ratusan milyar rupiah amblas setiap tahun akibat investasi ilegal yang menawarkan untung besar tanpa risiko. Pelaku memanfaatkan influencer atau iklan media sosial untuk menjaring korbannya.",
    content: [
      "Sebagian besar investasi bodong menggunakan Skema Ponzi. Keuntungan yang dibayarkan kepada anggota lama sebenarnya berasal dari uang pendaftaran anggota baru, bukan dari hasil bisnis nyata.",
      "Ketika aliran dana dari anggota baru mulai macet, sistem ini akan runtuh secara mendadak. Pelaku atau aplikasinya kemudian menghilang membawa kabur seluruh uang deposit milik para korban.",
    ],
    pointsTitle: "Ciri-Ciri Skema Investasi Palsu / Ilegal:",
    points: [
      "Menjanjikan keuntungan yang tidak masuk akal dalam waktu singkat (misal: profit 20% tiap minggu).",
      "Klaim bisnis tanpa risiko kehilangan uang (Zero Risk).",
      "Sangat bergantung pada perekrutan orang baru (sistem member get member/downline).",
      "Legalitas tidak jelas atau mencatut logo OJK (Otoritas Jasa Keuangan) secara palsu tanpa izin resmi.",
      "Proses penarikan dana (withdrawal) yang mendadak dipersulit dengan berbagai alasan teknis.",
    ],
    footerTip:
      "Ingat rumus 2L sebelum berinvestasi: Legal (cek izin operasinya di situs resmi OJK) dan Logis (rasional tidaknya profit yang dijanjikan).",
  },
  "keamanan-hp": {
    title: "Keamanan Aplikasi di Smartphone: Apa yang Perlu Dicek?",
    category: "Perangkat",
    date: "16 Mei 2026",
    readTime: "5 Menit Baca",
    author: "Tim Siber Sumsel",
    bannerImg: "/images/hp.jpg",
    summary:
      "Smartphone adalah gudang data pribadi Anda. Banyak aplikasi yang tampaknya tidak berbahaya di permukaan, namun diam-diam merekam aktivitas atau menyedot data di latar belakang.",
    content: [
      "Sering kali saat menginstal aplikasi baru, kita langsung menekan tombol 'Allow' pada semua pop-up tanpa membaca detailnya. Hal inilah yang dimanfaatkan pengembang nakal untuk mengambil keuntungan.",
      "Sebagai contoh, aplikasi senter atau kalkulator sederhana sama sekali tidak membutuhkan izin akses ke kontak telepon, SMS, lokasi, atau galeri foto Anda untuk dapat berfungsi.",
    ],
    pointsTitle: "Komponen yang Wajib Diperiksa pada HP Anda:",
    points: [
      "Izin Akses (App Permissions): Tinjau ulang aplikasi apa saja yang memegang izin akses Kamera, Mikrofon, dan Kontak.",
      "Sumber Unduhan: Hanya instal aplikasi dari store resmi seperti Google Play Store atau Apple App Store.",
      "Konsumsi Baterai & Data: Waspadai jika ada aplikasi asing yang menyedot baterai dan kuota internet sangat besar di latar belakang.",
      "Aplikasi Pelacak Tambahan: Hapus aplikasi pihak ketiga yang menjanjikan fitur modifikasi (seperti WA Mod) karena rentan disusupi malware.",
      "Pembaruan Berkala: Pastikan sistem operasi (Android/iOS) selalu diperbarui ke versi patch keamanan terbaru.",
    ],
    footerTip:
      "Rutin lakukan audit aplikasi minimal sebulan sekali. Hapus aplikasi yang sudah jarang digunakan untuk memperkecil risiko eksploitasi celah keamanan.",
  },
  "scam-apk-undangan": {
    title: "Waspada Scam APK Berkedok Undangan Pernikahan dan Kurir",
    category: "Penipuan",
    date: "10 Mei 2026",
    readTime: "7 Menit Baca",
    author: "Tim Siber Sumsel",
    bannerImg: "/images/scam.jpg",
    summary:
      "Modus penipuan berbasis file APK (Android Package Kit) terus berkembang di Indonesia. Korban terkecoh mengunduh file karena pelaku menyamarkannya sebagai dokumen penting.",
    content: [
      "Ketika file APK tersebut diinstal, aplikasi jahat itu akan meminta izin akses tingkat tinggi pada perangkat Anda, termasuk izin membaca SMS (Receive SMS).",
      "Izin inilah yang berbahaya, karena pelaku bisa mencegat dan membaca semua SMS masuk di HP Anda, termasuk kode OTP Mobile Banking. Tanpa Anda sandari, saldo rekening bisa terkuras habis dalam waktu singkat.",
    ],
    pointsTitle: "Cara Mendeteksi dan Mencegah Serangan Scam APK:",
    points: [
      "Perhatikan ekstensi file yang dikirim di WhatsApp. Jika ujungnya tertulis '.apk', jangan pernah diklik atau diunduh.",
      "Kurir paket atau pihak wedding organizer asli mengirimkan foto (.jpg/.png) atau link website resmi, bukan file aplikasi.",
      "Matikan fitur 'Install dari Sumber Tidak Dikenal' pada pengaturan keamanan smartphone Anda.",
      "Jangan asal memberikan izin akses SMS atau notifikasi pada aplikasi baru yang tidak jelas.",
      "Jika terlanjur mengklik, segera matikan koneksi internet (mode pesawat) dan uninstall aplikasi mencurigakan tersebut.",
    ],
    footerTip:
      "Jika Anda terlanjur menginstal file APK tersebut dan mendapati ada transaksi misterius, segera hubungi call center bank Anda untuk memblokir rekening.",
  },
  "kejahatan-sim-swap": {
    title: "Mengenal Kejahatan SIM Swap dan Cara Mengantisipasinya",
    category: "Perangkat",
    date: "14 Mei 2026",
    readTime: "6 Menit Baca",
    author: "Tim Siber Sumsel",
    bannerImg: "/images/sim.jpg",
    summary:
      "SIM Swap adalah modus pengambilalihan nomor kartu SIM milik korban oleh peretas. Ketika kartu SIM Anda berhasil dikloning, pelaku bisa menguasai akses seluruh akun digital yang terhubung.",
    content: [
      "Pelaku biasanya mengumpulkan data pribadi korban terlebih dahulu lewat phising, lalu mendatangi gerai operator seluler dengan membawa dokumen identitas palsu untuk meminta penggantian kartu SIM baru.",
      "Begitu kartu SIM baru di tangan pelaku aktif, kartu SIM asli di HP korban otomatis akan kehilangan sinyal total (No Service). Pelaku kemudian melakukan reset password bank menggunakan kode OTP yang masuk ke nomor tersebut.",
    ],
    pointsTitle: "Langkah Pencegahan dari Ancaman SIM Swap:",
    points: [
      "Segera curiga jika HP Anda mendadak kehilangan sinyal total secara permanen tanpa alasan teknis.",
      "Jangan pernah mengumbar data pribadi seperti nama ibu kandung, tanggal lahir, atau nomor KTP di media sosial.",
      "Gunakan email untuk verifikasi keamanan tambahan, jangan hanya mengandalkan SMS OTP.",
      "Pasang PIN tambahan (SIM Lock) langsung di pengaturan kartu internal smartphone Anda.",
      "Aktifkan notifikasi email untuk memantau aktivitas transaksi perbankan Anda secara real-time.",
    ],
    footerTip:
      "Jika HP kehilangan sinyal tiba-tiba dan Anda mendapat email transaksi mencurigakan, segera hubungi provider seluler dan pihak bank secepat mungkin untuk pembekuan akses.",
  },
  "bahaya-deepfake-scam": {
    title: "Ancaman Teknologi Deepfake dalam Modus Penipuan Video",
    category: "Phishing",
    date: "13 Mei 2026",
    readTime: "5 Menit Baca",
    author: "Tim Siber Sumsel",
    bannerImg: "/images/deepfake.jpg",
    summary:
      "Perkembangan Artificial Intelligence (AI) melahirkan ancaman baru bernama Deepfake. Pelaku merekayasa wajah dan suara seseorang agar sangat mirip aslinya untuk menipu kerabat korban.",
    content: [
      "Modus ini biasanya diawali dengan pelaku yang melakukan panggilan video (video call) singkat. Korban mengira yang menelpon adalah keluarga atau pimpinannya karena wajah dan suaranya identik.",
      "Setelah membuat korban percaya melalui manipulasi visual tersebut, pelaku akan mengarang skenario darurat (seperti kecelakaan atau masalah hukum) dan meminta transfer uang segera.",
    ],
    pointsTitle: "Cara Membedakan Video Asli dengan Rekayasa Deepfake:",
    points: [
      "Perhatikan gerakan mata. Karakter wajah deepfake seringkali memiliki pola kedipan mata yang tidak natural atau kaku.",
      "Amati distorsi visual di sekitar tepian wajah, rambut, atau saat objek berpaling ke samping.",
      "Perhatikan sinkronisasi antara gerakan bibir dengan audio suara yang keluar.",
      "Mintalah penelpon untuk melakukan gerakan acak, seperti melambaikan tangan di depan wajah atau menggelengkan kepala.",
      "Lakukan konfirmasi ulang melalui jalur komunikasi lain yang terpisah sebelum mengirimkan uang.",
    ],
    footerTip:
      "Selalu skeptis terhadap panggilan darurat yang meminta uang, sekalipun visual wajahnya terlihat seperti orang yang Anda kenal.",
  },
  "serangan-ransomware-korporat": {
    title: "Strategi Menghadapi Serangan Ransomware pada Sistem Data",
    category: "Jaringan",
    date: "11 Mei 2026",
    readTime: "7 Menit Baca",
    author: "Tim Siber Sumsel",
    bannerImg: "/images/ransomware.jpg",
    summary:
      "Ransomware adalah jenis malware yang mengenkripsi seluruh file penting di server komputer. Korban dipaksa membayar tebusan dalam bentuk crypto jika ingin mendapatkan kunci dekripsi data.",
    content: [
      "Serangan ini bisa melumpuhkan operasional instansi atau perusahaan dalam semalam. Pelaku menyusup melalui celah keamanan sistem jaringan, port remote desktop yang lemah, atau email phising karyawan.",
      "Pemerintah dan pakar keamanan siber sangat melarang keras pembayaran tebusan, karena tidak ada jaminan pelaku akan memberikan kunci dekripsi, dan justru membiayai aksi kriminal mereka selanjutnya.",
    ],
    pointsTitle: "Arsitektur Pertahanan Sistem Menghadapi Ransomware:",
    points: [
      "Terapkan strategi 3-2-1 Backup: Buat 3 salinan data, simpan di 2 media berbeda, dan letakkan 1 salinan secara offline terpisah.",
      "Gunakan prinsip Least Privilege: Jangan berikan hak akses administrator kepada akun pengguna biasa.",
      "Rutin melakukan vulnerability scanning dan menutup port koneksi jaringan yang tidak terpakai.",
      "Edukasi seluruh staf operasional agar tidak sembarangan membuka file lampiran email asing.",
      "Gunakan teknologi Endpoint Detection and Response (EDR) untuk memantau aktivitas mencurigakan secara otomatis.",
    ],
    footerTip:
      "Sistem backup data yang terisolasi secara offline adalah satu-satunya pelindung paling mutakhir saat infrastruktur server Anda lumpuh total.",
  },
  "pencurian-data-identity-theft": {
    title: "Identity Theft: Dampak Kebocoran NIK dan KTP di Internet",
    category: "Hukum Siber",
    date: "09 Mei 2026",
    readTime: "6 Menit Baca",
    author: "Tim Siber Sumsel",
    bannerImg: "/images/identity.jpg",
    summary:
      "Kebocoran data massal membuat jutaan data NIK dan foto KTP beredar bebas di pasar gelap internet. Data ini dieksploitasi pelaku untuk melakukan kejahatan atas nama diri Anda.",
    content: [
      "Dampak paling instan dari Identity Theft (Pencurian Identitas) adalah penyalahgunaan KTP korban untuk mendaftar di aplikasi Pinjaman Online (Pinjol) ilegal atau pembukaan rekening bank penampung dana judi online.",
      "Korban baru menyadari namanya dicuri saat mendadak ditagih oleh debt collector, atau ketika skor kredit perbankan mereka rusak (BI Checking hitam) akibat tunggakan ilegal yang tidak pernah mereka lakukan.",
    ],
    pointsTitle: "Langkah Memitigasi Risiko Penyalahgunaan Identitas:",
    points: [
      "Jangan pernah mengirimkan foto KTP atau selfie memegang KTP ke platform atau perorangan yang tidak terverifikasi.",
      "Rutin memeriksa riwayat kredit Anda melalui sistem SLIK OJK secara berkala.",
      "Berikan watermark digital (tulisan transparan) pada foto KTP saat terpaksa mengirimkannya untuk keperluan verifikasi tertentu.",
      "Waspadai formulir lowongan kerja palsu atau survei online gratisan yang meminta data identitas lengkap.",
      "Segera buat laporan kepolisian jika Anda mendapati identitas Anda telah disalahgunakan pihak lain.",
    ],
    footerTip:
      "Watermark tulisan di foto KTP Anda dengan keterangan spesifik (misal: 'Verifikasi Aplikasi X - Mei 2026') agar data gambarnya tidak bisa dipakai ulang untuk platform lain.",
  },
  "skimming-atm-digital": {
    title: "Cara Mendeteksi Alat Skimming pada Mesin ATM dan EDC",
    category: "Penipuan",
    date: "08 Mei 2026",
    readTime: "5 Menit Baca",
    author: "Tim Siber Sumsel",
    bannerImg: "/images/atm.jpg",
    summary:
      "Skimming adalah pencurian data pita magnetik kartu ATM menggunakan alat perekam khusus yang dipasang secara ilegal pada mulut slot mesin kartu. Pelaku bisa menduplikasi kartu Anda secara instan.",
    content: [
      "Selain memasang perekam data kartu, pelaku skimming juga menempelkan kamera lubang jarum (pinhole camera) tersembunyi di atas kanopi tombol keypad untuk merekam gerakan jari Anda saat memasukkan nomor PIN.",
      "Modus ini juga marak terjadi di mesin EDC kasir toko belanja, di mana mesin EDC telah dimodifikasi atau dipasang alat pembaca ganda (double swipe) yang bisa menyalin data nasabah.",
    ],
    pointsTitle: "Tindakan Cek Fisik Sebelum Memasukkan Kartu ATM:",
    points: [
      "Pegang dan goyang mulut lubang tempat memasukkan kartu ATM. Jika terasa longgar, tebal, atau janggal, urungkan niat bertransaksi.",
      "Selalu tutup tangan Anda menggunakan telapak tangan satunya saat menekan tombol nomor PIN di keypad mesin.",
      "Perhatikan kondisi kanopi penutup keypad. Periksa apakah ada benda asing menempel yang dicurigai sebagai kamera pengintai.",
      "Gunakan fitur Cardless Withdrawal (tarik tunai tanpa kartu via aplikasi mobile banking) untuk keamanan 100% dari skimming.",
      "Periksa mutasi saldo rekening secara berkala untuk memantau sisa dana Anda.",
    ],
    footerTip:
      "Menutup gerakan jari saat menekan PIN adalah pertahanan terbaik. Tanpa nomor PIN, peretas tidak akan bisa menguras uang Anda meskipun data kartu berhasil disalin.",
  },
  "uu-ite-dan-perlindungan-data": {
    title: "Pahami Pasal Penting UU ITE dan UU Perlindungan Data Pribadi",
    category: "Hukum Siber",
    date: "07 Mei 2026",
    readTime: "6 Menit Baca",
    author: "Tim Siber Sumsel",
    bannerImg: "/images/hukum.jpg",
    summary:
      "Negara memberikan payung hukum yang tegas untuk melindungi masyarakat di ruang siber. Memahami regulasi ini penting agar kita tahu hak-hak hukum kita saat menjadi korban kejahatan.",
    content: [
      "Undang-Undang Informasi dan Transaksi Elektronik (UU ITE) dan UU Perlindungan Data Pribadi (UU PDP) mengatur batasan-batasan hukum serta sanksi pidana berat bagi para pelaku kejahatan digital.",
      "Setiap tindakan ilegal seperti meretas sistem orang lain, menyebarkan data pribadi tanpa izin (doxing), hingga melakukan penipuan online memiliki konsekuensi hukuman penjara dan denda milyaran rupiah.",
    ],
    pointsTitle: "Pasal-Pasal Kunci Perlindungan Hukum Digital:",
    points: [
      "Pasal 30 UU ITE: Sanksi pidana bagi setiap orang yang mengakses komputer atau sistem elektronik milik orang lain secara ilegal.",
      "Pasal 32 UU ITE: Larangan keras mengubah, merusak, memindahkan, atau menyembunyikan informasi/dokumen elektronik milik orang lain.",
      "UU PDP Pasal 65: Larangan bagi siapapun untuk memperoleh, mengumpulkan, atau mengungkapkan data pribadi yang bukan miliknya secara melawan hukum.",
      "Sanksi Denda UU PDP: Perusahaan atau penyedia sistem yang membocorkan data konsumen bisa dikenakan sanksi denda administratif hingga miliaran rupiah.",
      "Hak Korban: Korban kejahatan digital berhak mendapatkan perlindungan, penghapusan data ilegal, serta menuntut ganti rugi materiil.",
    ],
    footerTip:
      "Jika Anda menjadi korban kejahatan siber, kumpulkan seluruh bukti digital (seperti tangkapan layar, bukti transfer, dan log chat) secara utuh sebagai alat bukti sah di mata hukum.",
  },
};

// 2. DEFAULT EXPORT REACT COMPONENT (YANG TADI TERLEWATKAN)
export default function ArtikelDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Mengambil data berdasarkan slug (lowercase biar seragam)
  const art = artikelContent[slug?.toLowerCase()];

  // Jika slug tidak terdaftar di database, lempar ke halaman 404
  if (!art) return notFound();

  // Memfilter rekomendasi artikel terkait di bilah kanan
  const artikelTerkait = [
    {
      slug: "password-kuat",
      title: "Cara membuat password kuat",
      cat: "Password",
    },
    {
      slug: "ciri-phishing",
      title: "Kenali ciri email phishing",
      cat: "Phishing",
    },
    {
      slug: "scam-apk-undangan",
      title: "Waspada modus Scam APK",
      cat: "Penipuan",
    },
    { slug: "bahaya-wifi", title: "Bahaya WiFi Publik umum", cat: "Jaringan" },
  ]
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col min-w-0">
        {/* NAVIGATION TOP BAR */}
        <div className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
          <Link
            href="/artikel"
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#0F52BA] transition-colors"
          >
            <ChevronLeft size={16} /> Kembali ke Pusat Artikel
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
              <Bookmark size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* MAIN LAYOUT WRAPPER */}
        <div className="p-8 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* KOLOM KIRI: ISI ARTIKEL LENGKAP */}
          <main className="lg:col-span-8 space-y-6">
            {/* Halaman Banner Gambar */}
            <div className="h-64 md:h-80 w-full rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
              <img
                src={art.bannerImg}
                alt={art.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Konten Utama Container */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
              {/* Metadata */}
              <div className="flex flex-wrap gap-4 items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span className="bg-[#EBF3FF] text-[#0F52BA] px-3 py-1 rounded-md text-[10px] font-black">
                  {art.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar size={14} /> {art.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} /> {art.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} /> {art.author}
                </div>
              </div>

              {/* Judul Utama */}
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight uppercase">
                {art.title}
              </h1>

              {/* Ringkasan Banner */}
              <div className="p-5 bg-slate-50 border-l-4 border-[#0F52BA] rounded-r-2xl">
                <p className="text-slate-700 font-semibold leading-relaxed text-sm">
                  {art.summary}
                </p>
              </div>

              {/* Paragraf Utama */}
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed font-medium">
                {art.content.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Poin-poin Mitigasi */}
              <div className="pt-4 space-y-4">
                <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                  <ShieldAlert className="text-[#0F52BA]" size={20} />{" "}
                  {art.pointsTitle}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {art.points.map((pt: string, i: number) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start p-4 bg-slate-50/50 rounded-2xl border border-slate-100"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-green-500 shrink-0 mt-0.5"
                      />
                      <p className="text-slate-700 font-bold text-sm leading-tight">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tindakan Rekomendasi Box */}
              <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-start gap-4">
                <div className="w-8 h-8 bg-[#0F52BA] text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">
                  !
                </div>
                <p className="text-xs text-[#0F52BA] leading-relaxed font-black uppercase tracking-wider">
                  Rekomendasi Tindakan:{" "}
                  <span className="text-slate-700 font-bold normal-case tracking-normal block mt-1">
                    {art.footerTip}
                  </span>
                </p>
              </div>

              {/* Like Fitur */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-400 font-bold uppercase">
                  Apakah artikel ini membantu Anda?
                </p>
                <button className="flex items-center gap-2 bg-slate-50 hover:bg-[#EBF3FF] hover:text-[#0F52BA] border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 transition-colors">
                  <ThumbsUp size={14} /> Membantu
                </button>
              </div>
            </div>
          </main>

          {/* KOLOM KANAN: SIDEBAR REKOMENDASI ARTIKEL LAIN */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                <BookOpen size={16} className="text-slate-400" /> Edukasi
                Terkait
              </h3>
              <div className="space-y-4">
                {artikelTerkait.map((item, i) => (
                  <Link
                    key={i}
                    href={`/artikel/${item.slug}`}
                    className="block p-4 bg-slate-50/60 hover:bg-[#EBF3FF] border border-transparent hover:border-blue-100 rounded-2xl group transition-all"
                  >
                    <span className="text-[9px] font-black text-[#0F52BA] bg-white px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
                      {item.cat}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm mt-2 group-hover:text-[#0F52BA] transition-colors leading-tight">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-wider">
                      Baca panduan{" "}
                      <ArrowRight
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
