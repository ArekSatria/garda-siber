// ============================================================
// src/data/threats.ts
// Sumber data terpusat untuk seluruh ancaman siber Garda Siber.
// Untuk menambah ancaman baru, cukup tambahkan objek baru
// ke array `threats` di bawah ini.
// ============================================================

export type ThreatLevel = "Critical" | "High" | "Medium" | "Low";
export type ThreatColor = "danger" | "warning" | "success";

export interface Threat {
  id: string;
  title: string;
  shortDesc: string;
  level: ThreatLevel;
  color: ThreatColor;
  image: string;
  iconName: string;
  analysisTitle: string;
  fullDesc: string;
  impact: string;
  characteristics: string[];
  steps: string[];
  stats: string;
}

export const threats: Threat[] = [
  {
    id: "phishing",
    title: "Phishing",
    shortDesc: "Penipuan untuk mencuri data sensitif melalui pesan palsu.",
    level: "High",
    color: "danger",
    image: "/images/email.jpg",
    iconName: "Mail",
    analysisTitle: "Phishing Analysis",
    fullDesc:
      "Teknik rekayasa sosial di mana penyerang mengirimkan pesan penipuan untuk mencuri informasi sensitif.",
    impact:
      "Pencurian identitas massal dan pengambilalihan akses akun keuangan tanpa izin.",
    characteristics: [
      "Domain email palsu yang menyerupai institusi resmi",
      "Pesan bersifat mendesak dan memancing kepanikan",
      "Link mengarah ke situs tiruan yang identik",
    ],
    steps: [
      "Cek alamat email pengirim secara teliti",
      "Aktifkan MFA/2FA di semua akun penting",
      "Laporkan pesan mencurigakan ke pihak berwenang",
    ],
    stats: "90% dari semua serangan siber dimulai dengan upaya Phishing.",
  },
  {
    id: "ransomware",
    title: "Ransomware",
    shortDesc: "Malware yang menyandera data komputer untuk tebusan.",
    level: "Critical",
    color: "danger",
    image: "/images/ransomware.jpg",
    iconName: "Lock",
    analysisTitle: "Ransomware Analysis",
    fullDesc:
      "Malware berbahaya yang menyandera data atau sistem korban dengan enkripsi hingga tebusan dibayarkan.",
    impact:
      "Kehilangan data permanen, gangguan operasional total, dan kerugian finansial skala besar.",
    characteristics: [
      "Enkripsi seluruh file penting secara otomatis",
      "Muncul pesan tebusan (Ransom Note) di layar",
      "Penghapusan seluruh data backup lokal",
    ],
    steps: [
      "Lakukan backup data offline secara rutin",
      "Update sistem keamanan dan antivirus berkala",
      "Jangan pernah membayar tebusan kepada penyerang",
    ],
    stats:
      "Rata-rata serangan ransomware terjadi setiap 11 detik di seluruh dunia.",
  },
  {
    id: "social-engineering",
    title: "Social Engineering",
    shortDesc: "Manipulasi psikologis untuk mencuri informasi rahasia.",
    level: "Medium",
    color: "warning",
    image: "/images/social.png",
    iconName: "Globe",
    analysisTitle: "Social Engineering",
    fullDesc:
      "Seni memanipulasi psikologis orang agar mereka membocorkan informasi rahasia atau melakukan tindakan tertentu.",
    impact:
      "Kebocoran rahasia perusahaan dan pengambilalihan akun melalui rekayasa OTP.",
    characteristics: [
      "Memanfaatkan rasa percaya dan otoritas korban",
      "Berpura-pura dalam kondisi darurat yang mendesak",
      "Meminta kode rahasia, OTP, atau data pribadi",
    ],
    steps: [
      "Verifikasi identitas penelpon secara independen",
      "Jangan pernah membagikan kode OTP kepada siapapun",
      "Tetap skeptis dan tenang saat menerima permintaan mendadak",
    ],
    stats:
      "Faktor manusia adalah titik terlemah dalam seluruh rantai keamanan digital.",
  },
  {
    id: "spyware",
    title: "Spyware",
    shortDesc: "Aplikasi pengintai rahasia yang mencuri aktivitas pribadi.",
    level: "Medium",
    color: "warning",
    image: "/images/spyware.webp",
    iconName: "EyeOff",
    analysisTitle: "Spyware Analysis",
    fullDesc:
      "Perangkat lunak pengintai rahasia yang mencuri data aktivitas dan informasi pribadi Anda tanpa izin.",
    impact:
      "Penyadapan kamera/mikrofon, pencurian log pengetikan, dan pelacakan lokasi secara real-time.",
    characteristics: [
      "Baterai ponsel boros secara tiba-tiba tanpa sebab jelas",
      "Muncul iklan atau notifikasi aneh di layar kunci",
      "Suhu perangkat terasa sangat panas saat tidak digunakan",
    ],
    steps: [
      "Gunakan aplikasi antivirus dari vendor resmi dan terpercaya",
      "Periksa dan batasi izin akses setiap aplikasi",
      "Hanya unduh aplikasi dari toko resmi (Play Store/App Store)",
    ],
    stats:
      "Spyware sering disisipkan secara tersembunyi pada aplikasi gratisan tidak resmi.",
  },
  {
    id: "sql-injection",
    title: "SQL Injection",
    shortDesc: "Serangan teknis untuk memanipulasi database aplikasi.",
    level: "High",
    color: "danger",
    image: "/images/database.jpg",
    iconName: "Server",
    analysisTitle: "SQL Injection Analysis",
    fullDesc:
      "Injeksi kode berbahaya ke dalam database melalui formulir input web untuk memanipulasi data.",
    impact:
      "Kebocoran seluruh database pengguna dan modifikasi data server secara ilegal.",
    characteristics: [
      "Celah keamanan pada kolom input login atau pencarian",
      "Pesan error database yang membocorkan struktur sistem",
      "Akses bypass terhadap proteksi halaman admin",
    ],
    steps: [
      "Validasi dan sanitasi semua input dari sisi server",
      "Gunakan Prepared Statements pada setiap query database",
      "Minimalisir hak akses akun database ke level minimum",
    ],
    stats:
      "Salah satu celah keamanan web paling tua namun tetap menjadi ancaman serius.",
  },
  {
    id: "mobile-malware",
    title: "Mobile Malware",
    shortDesc: "Virus yang dirancang khusus menyerang smartphone.",
    level: "Low",
    color: "success",
    image: "/images/hp.jpg",
    iconName: "Smartphone",
    analysisTitle: "Mobile Malware Analysis",
    fullDesc:
      "Virus atau Trojan yang dirancang khusus untuk menyerang sistem operasi smartphone Android dan iOS.",
    impact:
      "Pencurian data mobile banking, penyedotan pulsa, dan pencurian kontak telepon.",
    characteristics: [
      "Instalasi dari sumber di luar toko aplikasi resmi (sideloading)",
      "Meminta izin akses yang berlebihan dan tidak relevan",
      "Aplikasi baru muncul sendiri tanpa sepengetahuan pengguna",
    ],
    steps: [
      "Jangan melakukan Root atau Jailbreak pada perangkat Anda",
      "Update sistem operasi dan aplikasi secara rutin",
      "Aktifkan dan gunakan fitur Google Play Protect",
    ],
    stats:
      "Target utama mobile malware saat ini adalah aplikasi perbankan digital.",
  },
];

export function getThreatById(id: string): Threat | undefined {
  return threats.find((t) => t.id === id.toLowerCase());
}

export function getAllThreats(): Threat[] {
  return threats;
}

export function getThreatsByLevel(level: ThreatLevel): Threat[] {
  return threats.filter((t) => t.level === level);
}
