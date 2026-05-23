export type QuestionType = "multiple" | "truefalse" | "scenario";

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  scenario?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "multiple",
    category: "Phishing",
    question:
      "Anda menerima email dari 'Bank BCA' dengan alamat pengirim 'security@bca-update-alert.com'. Email meminta Anda klik link untuk verifikasi akun dalam 24 jam. Apa yang harus dilakukan?",
    options: [
      "Klik link tersebut dan masukkan data login untuk keamanan akun",
      "Abaikan dan hapus email, lalu cek langsung di aplikasi BCA resmi",
      "Forward email ke teman untuk minta pendapat",
      "Balas email dan tanyakan apakah ini asli",
    ],
    correctIndex: 1,
    explanation:
      "Domain 'bca-update-alert.com' bukan domain resmi BCA. Bank tidak pernah meminta verifikasi lewat email dengan tenggat waktu. Selalu akses langsung melalui aplikasi atau website resmi bank Anda.",
  },
  {
    id: 2,
    type: "truefalse",
    category: "Password",
    question:
      "Menggunakan satu password yang kuat untuk semua akun lebih aman daripada menggunakan password berbeda untuk setiap akun.",
    options: ["Benar", "Salah"],
    correctIndex: 1,
    explanation:
      "SALAH. Jika satu akun bocor, seluruh akun Anda langsung terancam. Gunakan password unik di setiap akun dan manfaatkan Password Manager seperti Bitwarden atau 1Password.",
  },
  {
    id: 3,
    type: "scenario",
    category: "Social Engineering",
    question:
      "Skenario: Seseorang menelepon mengaku pegawai Telkomsel, menyebut nama dan nomor HP Anda dengan tepat. Ia bilang SIM Anda akan diblokir dan minta kode OTP yang baru masuk ke HP Anda. Apa respons yang benar?",
    scenario:
      "Telepon masuk dari nomor tidak dikenal. Suaranya profesional dan menyebut data pribadi Anda.",
    options: [
      "Berikan kode OTP karena ia tahu data pribadi kita, berarti ia asli",
      "Minta nomor karyawan lalu telepon balik ke call center resmi Telkomsel 188",
      "Berikan setengah kode OTP saja untuk memastikan",
      "Diam dan tunggu sampai ia memberikan penjelasan lebih lanjut",
    ],
    correctIndex: 1,
    explanation:
      "Data pribadi bisa diperoleh dari kebocoran data. Kode OTP adalah kunci akun Anda — tidak boleh diberikan kepada SIAPAPUN termasuk yang mengaku pegawai resmi. Selalu verifikasi dengan menelepon nomor resmi operator.",
  },
  {
    id: 4,
    type: "multiple",
    category: "Keamanan WiFi",
    question:
      "Mana dari aktivitas berikut yang AMAN dilakukan saat menggunakan WiFi publik di kafe?",
    options: [
      "Login ke aplikasi mobile banking untuk cek saldo",
      "Membuka media sosial dan membaca artikel berita",
      "Mengisi formulir online dengan data KTP dan nomor rekening",
      "Melakukan transaksi belanja online dengan kartu kredit",
    ],
    correctIndex: 1,
    explanation:
      "Hanya browsing ringan seperti baca berita yang relatif aman di WiFi publik. Transaksi keuangan, login perbankan, dan pengisian data sensitif harus menggunakan koneksi data seluler pribadi atau VPN.",
  },
  {
    id: 5,
    type: "truefalse",
    category: "Ransomware",
    question:
      "Jika terkena ransomware, membayar tebusan kepada hacker adalah cara terbaik untuk mendapatkan kembali data Anda.",
    options: ["Benar", "Salah"],
    correctIndex: 1,
    explanation:
      "SALAH. Membayar tebusan tidak menjamin data dikembalikan, bahkan membiayai kejahatan selanjutnya. Solusi terbaik adalah backup data rutin secara offline (strategi 3-2-1) dan laporkan ke BSSN.",
  },
  {
    id: 6,
    type: "scenario",
    category: "Scam APK",
    question:
      "Skenario: Anda mendapat pesan WhatsApp dari nomor tak dikenal berisi file bernama 'Undangan_Pernikahan_Rizky.apk' (ukuran 6.5 MB). Pengirim meminta Anda install untuk lihat undangan digital.",
    scenario:
      "File dikirim via WhatsApp dengan ikon berbentuk amplop undangan pernikahan.",
    options: [
      "Install karena penasaran dengan isi undangannya",
      "Tanya dulu kepada pengirim siapa nama pengantennya",
      "Jangan klik atau install — langsung hapus pesan tersebut",
      "Install di HP lama yang tidak dipakai untuk keamanan",
    ],
    correctIndex: 2,
    explanation:
      "File .APK adalah file instalasi aplikasi Android, bukan dokumen undangan. Menginstall APK dari sumber tidak dikenal bisa memberikan akses penuh ke SMS, kontak, dan rekening bank Anda kepada pelaku.",
  },
  {
    id: 7,
    type: "multiple",
    category: "Password",
    question: "Password mana yang paling kuat dan sulit ditembus?",
    options: [
      "Password123!",
      "p@ssw0rd",
      "KucingMakanNasi_2026!",
      "Qwerty#1234",
    ],
    correctIndex: 2,
    explanation:
      "'KucingMakanNasi_2026!' adalah passphrase — kombinasi kata acak yang panjang dan mudah diingat namun sangat sulit ditebak mesin. Panjang password jauh lebih penting dari kerumitan karakter.",
  },
  {
    id: 8,
    type: "truefalse",
    category: "Privasi Digital",
    question:
      "Mengaktifkan autentikasi dua faktor (2FA) membuat akun Anda 100% tidak bisa diretas meskipun password bocor.",
    options: ["Benar", "Salah"],
    correctIndex: 1,
    explanation:
      "SALAH. 2FA sangat meningkatkan keamanan, namun bukan jaminan mutlak. Serangan SIM Swap atau social engineering tetap bisa melewati 2FA berbasis SMS. Gunakan aplikasi authenticator (Google Authenticator) daripada SMS OTP.",
  },
  {
    id: 9,
    type: "scenario",
    category: "Investasi",
    question:
      "Skenario: Teman lama menghubungi via WhatsApp, menawarkan investasi kripto dengan jaminan profit 30% per bulan. Ia menunjukkan screenshot bukti transfer dari 'member yang sudah untung'.",
    scenario:
      "Tawaran datang dari orang yang dikenal, disertai bukti transfer yang terlihat nyata.",
    options: [
      "Ikut invest sedikit dulu untuk coba-coba",
      "Minta referral lebih banyak sebelum memutuskan",
      "Tolak — profit tetap 30%/bulan adalah ciri khas investasi bodong",
      "Konsultasi ke teman lain yang lebih paham kripto",
    ],
    correctIndex: 2,
    explanation:
      "Tidak ada investasi legal yang menjamin profit tetap setiap bulan. Skema Ponzi membayar member lama dari uang member baru. Screenshot bukti transfer mudah dipalsukan. Cek legalitas di situs resmi OJK sebelum berinvestasi.",
  },
  {
    id: 10,
    type: "multiple",
    category: "Identity Theft",
    question:
      "Data apa yang TIDAK boleh dikirimkan melalui aplikasi pinjaman online yang belum terverifikasi OJK?",
    options: [
      "Nama lengkap dan alamat email",
      "Foto selfie memegang KTP dan nomor rekening bank",
      "Nomor telepon aktif",
      "Kota domisili saat ini",
    ],
    correctIndex: 1,
    explanation:
      "Foto selfie + KTP + rekening adalah kombinasi data yang cukup untuk menyalahgunakan identitas Anda di pinjol ilegal lain. Selalu verifikasi legalitas aplikasi pinjaman di situs resmi OJK sebelum memberikan data apapun.",
  },
];

export function getScoreLabel(
  score: number,
  total: number,
): {
  label: string;
  color: string;
  desc: string;
} {
  const pct = (score / total) * 100;
  if (pct === 100)
    return {
      label: "Pakar Siber",
      color: "text-green-600",
      desc: "Luar biasa! Anda memiliki pemahaman keamanan siber yang sangat tinggi.",
    };
  if (pct >= 80)
    return {
      label: "Penjaga Digital",
      color: "text-blue-600",
      desc: "Bagus! Anda sudah memahami sebagian besar ancaman siber dengan baik.",
    };
  if (pct >= 60)
    return {
      label: "Warga Siber Waspada",
      color: "text-yellow-600",
      desc: "Cukup baik. Masih ada beberapa area yang perlu ditingkatkan.",
    };
  if (pct >= 40)
    return {
      label: "Pemula Digital",
      color: "text-orange-600",
      desc: "Perlu belajar lebih. Pelajari artikel edukasi kami untuk meningkatkan literasi siber.",
    };
  return {
    label: "Rentan Ancaman",
    color: "text-red-600",
    desc: "Tingkat risiko tinggi. Segera pelajari seluruh konten edukasi Garda Siber.",
  };
}
