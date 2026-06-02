"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";

type Option = {
  label: string;
  value: string;
};

type Question = {
  id: number;
  category: string;
  scenario: boolean;
  question: string;
  options: Option[];
  answer: string;
  explanation: string;
};

const BASE_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Phishing",
    scenario: true,
    question:
      "Skenario: Anda menerima email dari layanan yang biasa Anda gunakan. Isi pesannya menyebut akun Anda akan dibatasi dalam 30 menit jika tidak segera login melalui tautan yang tertera. Apa tindakan paling tepat?",
    options: [
      {
        label: "Masuk lewat tautan tersebut agar akun tidak dibatasi",
        value: "a",
      },
      {
        label:
          "Memeriksa domain situs dan mengakses layanan lewat kanal resmi secara terpisah",
        value: "b",
      },
      {
        label: "Membalas email itu untuk meminta penjelasan lebih rinci",
        value: "c",
      },
      {
        label: "Meneruskan email ke rekan agar mereka juga waspada",
        value: "d",
      },
    ],
    answer: "b",
    explanation:
      "Pesan mendesak sering dipakai dalam phishing. Verifikasi harus dilakukan dengan membuka layanan dari kanal resmi, bukan dari tautan pada email.",
  },
  {
    id: 2,
    category: "Keamanan Akun",
    scenario: false,
    question:
      "Mengapa penggunaan password yang unik untuk setiap akun penting dianggap lebih aman dibanding memakai satu password yang kuat untuk semua akun?",
    options: [
      { label: "Karena mempercepat proses login di semua layanan", value: "a" },
      {
        label:
          "Karena mengurangi dampak jika salah satu layanan mengalami kebocoran",
        value: "b",
      },
      {
        label: "Karena membuat verifikasi dua langkah tidak lagi diperlukan",
        value: "c",
      },
      {
        label: "Karena password unik selalu lebih pendek dan mudah diingat",
        value: "d",
      },
    ],
    answer: "b",
    explanation:
      "Jika satu layanan mengalami kebocoran, password yang sama bisa dicoba di akun lain. Password unik membatasi efek domino dari satu insiden.",
  },
  {
    id: 3,
    category: "OTP & Verifikasi",
    scenario: true,
    question:
      "Skenario: Anda menerima telepon dari seseorang yang mengaku petugas layanan resmi. Ia sudah mengetahui sebagian data Anda dan meminta kode OTP untuk 'memastikan akun tetap aman'. Apa respons paling tepat?",
    options: [
      {
        label: "Memberikan OTP karena penelepon mengetahui data Anda",
        value: "a",
      },
      {
        label:
          "Menutup telepon dan menghubungi layanan resmi melalui kanal yang Anda cari sendiri",
        value: "b",
      },
      {
        label: "Memberikan OTP jika penelepon terdengar meyakinkan",
        value: "c",
      },
      {
        label: "Mengirim tangkapan layar SMS OTP agar proses lebih cepat",
        value: "d",
      },
    ],
    answer: "b",
    explanation:
      "OTP tidak boleh dibagikan kepada siapa pun. Pengetahuan sebagian data pribadi tidak membuktikan bahwa penelepon benar-benar pihak resmi.",
  },
  {
    id: 4,
    category: "WiFi Publik",
    scenario: true,
    question:
      "Skenario: Di bandara, Anda perlu membuka email kerja dan mobile banking. Hanya tersedia WiFi gratis dengan nama yang mirip jaringan resmi. Apa keputusan paling aman?",
    options: [
      {
        label: "Tetap login ke semua layanan karena jaringan tampak resmi",
        value: "a",
      },
      {
        label: "Memakai WiFi itu hanya untuk layanan yang paling penting",
        value: "b",
      },
      {
        label:
          "Menghindari login akun sensitif dan memakai jaringan pribadi jika memungkinkan",
        value: "c",
      },
      {
        label: "Meminta orang sekitar memastikan jaringan tersebut aman",
        value: "d",
      },
    ],
    answer: "c",
    explanation:
      "WiFi publik, apalagi yang tidak jelas validitasnya, tidak ideal untuk mengakses akun sensitif. Pilihan lebih aman adalah memakai jaringan pribadi atau menunda akses.",
  },
  {
    id: 5,
    category: "Aplikasi",
    scenario: false,
    question:
      "Sebelum menginstal aplikasi baru, kombinasi pemeriksaan mana yang paling relevan untuk menilai tingkat risikonya?",
    options: [
      {
        label:
          "Ukuran file, warna ikon, dan posisi aplikasi di hasil pencarian",
        value: "a",
      },
      {
        label: "Jumlah unduhan saja, karena itu sudah cukup mewakili kualitas",
        value: "b",
      },
      {
        label:
          "Izin akses, sumber unduhan, reputasi pengembang, dan relevansi fungsi",
        value: "c",
      },
      {
        label: "Kecepatan instalasi dan banyaknya notifikasi setelah dibuka",
        value: "d",
      },
    ],
    answer: "c",
    explanation:
      "Aplikasi perlu dinilai dari sumber, izin akses, reputasi, dan kesesuaian dengan fungsi. Tidak cukup hanya melihat tampilan atau popularitas semata.",
  },
  {
    id: 6,
    category: "Scam APK",
    scenario: true,
    question:
      "Skenario: Anda menerima file APK berjudul 'Undangan Digital' dari nomor tak dikenal. Pengirim menulis bahwa file harus segera diinstal agar informasi bisa dibuka. Apa langkah paling tepat?",
    options: [
      {
        label: "Menginstal karena file tampak relevan dan mendesak",
        value: "a",
      },
      {
        label: "Membuka file di perangkat cadangan tanpa koneksi internet",
        value: "b",
      },
      {
        label:
          "Menghapus pesan dan tidak menginstal file dari sumber tidak resmi",
        value: "c",
      },
      { label: "Meneruskan file ke teman untuk memastikan isinya", value: "d" },
    ],
    answer: "c",
    explanation:
      "File APK dari sumber tidak resmi berisiko tinggi menjadi malware. Rasa penasaran dan urgensi palsu adalah pola yang sering dipakai pelaku.",
  },
  {
    id: 7,
    category: "SIM Swap",
    scenario: false,
    question:
      "Manakah kombinasi tanda yang paling patut dicurigai sebagai indikasi awal SIM swap?",
    options: [
      {
        label: "Ponsel panas, baterai cepat turun, dan jaringan WiFi lambat",
        value: "a",
      },
      {
        label:
          "Sinyal seluler hilang mendadak, SMS tidak masuk, dan muncul notifikasi login asing",
        value: "b",
      },
      {
        label:
          "Aplikasi media sosial sering logout sendiri, tetapi SMS tetap normal",
        value: "c",
      },
      { label: "Ponsel restart otomatis setelah pembaruan sistem", value: "d" },
    ],
    answer: "b",
    explanation:
      "SIM swap biasanya berkaitan dengan gangguan pada nomor seluler, seperti sinyal hilang, SMS tak masuk, dan aktivitas akun yang mencurigakan.",
  },
  {
    id: 8,
    category: "Ransomware",
    scenario: false,
    question:
      "Jika sebuah perangkat diduga terkena ransomware, langkah awal mana yang paling tepat diprioritaskan?",
    options: [
      { label: "Segera membayar tebusan agar sistem cepat pulih", value: "a" },
      {
        label:
          "Membiarkan perangkat tetap tersambung agar bisa dipantau dari jauh",
        value: "b",
      },
      {
        label:
          "Memutus koneksi perangkat dari jaringan dan membatasi penyebaran",
        value: "c",
      },
      {
        label: "Menghapus semua file secara manual tanpa analisis apa pun",
        value: "d",
      },
    ],
    answer: "c",
    explanation:
      "Memutus koneksi adalah prioritas awal untuk membatasi dampak. Langkah ini membantu mencegah penyebaran ke sistem atau perangkat lain.",
  },
  {
    id: 9,
    category: "Deepfake",
    scenario: true,
    question:
      "Skenario: Anda menerima pesan suara dari seseorang yang terdengar seperti atasan Anda, meminta transfer dana segera dan melarang Anda melakukan konfirmasi ke pihak lain. Apa tindakan paling aman?",
    options: [
      {
        label: "Menjalankan instruksi karena suara terdengar sangat meyakinkan",
        value: "a",
      },
      {
        label:
          "Menunda tindakan dan melakukan verifikasi lewat kanal komunikasi lain yang terpercaya",
        value: "b",
      },
      {
        label: "Meminta nomor rekening alternatif agar transaksi lebih cepat",
        value: "c",
      },
      {
        label: "Meneruskan audio itu ke grup kerja untuk meminta pendapat",
        value: "d",
      },
    ],
    answer: "b",
    explanation:
      "Permintaan mendesak dan larangan verifikasi adalah tanda bahaya. Pada kasus deepfake, verifikasi lintas kanal adalah langkah yang paling aman.",
  },
  {
    id: 10,
    category: "Data Pribadi",
    scenario: false,
    question:
      "Mengapa pembatasan penyebaran data pribadi di ruang digital sangat penting, bahkan jika data tersebut terlihat 'biasa saja'?",
    options: [
      {
        label:
          "Karena data yang tampak biasa bisa digabungkan untuk manipulasi atau penipuan",
        value: "a",
      },
      {
        label: "Karena semua data pribadi otomatis bersifat rahasia negara",
        value: "b",
      },
      {
        label:
          "Karena data pribadi hanya berbahaya jika dibagikan di media sosial",
        value: "c",
      },
      {
        label:
          "Karena data biasa tidak pernah dipakai dalam social engineering",
        value: "d",
      },
    ],
    answer: "a",
    explanation:
      "Data yang tampak sepele dapat digabungkan menjadi profil yang cukup untuk melakukan manipulasi, impersonasi, atau penyalahgunaan lain.",
  },
  {
    id: 11,
    category: "Skimming",
    scenario: false,
    question:
      "Apa kebiasaan yang paling tepat saat menggunakan ATM atau alat pembayaran kartu untuk mengurangi risiko skimming?",
    options: [
      { label: "Fokus hanya pada saldo akhir setelah transaksi", value: "a" },
      {
        label:
          "Memeriksa kondisi fisik mesin dan menutup keypad saat memasukkan PIN",
        value: "b",
      },
      { label: "Memakai mesin mana pun selama lokasinya ramai", value: "c" },
      {
        label: "Menekan tombol dengan cepat agar PIN tidak terbaca",
        value: "d",
      },
    ],
    answer: "b",
    explanation:
      "Skimming sering memanfaatkan alat tambahan pada mesin. Pemeriksaan fisik dan menutup keypad adalah kebiasaan penting untuk mengurangi risiko.",
  },
  {
    id: 12,
    category: "Perangkat Bersama",
    scenario: true,
    question:
      "Skenario: Anda harus membuka email di komputer bersama. Setelah selesai, browser menawarkan menyimpan password. Apa tindakan yang paling tepat?",
    options: [
      {
        label:
          "Menyimpan password karena perangkat hanya dipakai sesekali oleh orang lain",
        value: "a",
      },
      {
        label:
          "Menolak penyimpanan password, logout, dan pastikan sesi selesai sepenuhnya",
        value: "b",
      },
      {
        label: "Menyimpan password lalu menghapus riwayat pencarian saja",
        value: "c",
      },
      {
        label: "Tetap login agar lebih cepat jika nanti digunakan kembali",
        value: "d",
      },
    ],
    answer: "b",
    explanation:
      "Pada perangkat bersama, menyimpan password atau membiarkan sesi tetap aktif meningkatkan risiko akses tidak sah oleh pengguna berikutnya.",
  },
  {
    id: 13,
    category: "Backup Data",
    scenario: false,
    question:
      "Mengapa backup data yang disimpan terpisah dari perangkat utama penting dalam strategi perlindungan digital?",
    options: [
      {
        label: "Karena backup membuat semua ancaman otomatis tidak berbahaya",
        value: "a",
      },
      {
        label:
          "Karena backup terpisah membantu pemulihan jika perangkat rusak, hilang, atau terenkripsi",
        value: "b",
      },
      {
        label: "Karena backup menggantikan kebutuhan pembaruan sistem",
        value: "c",
      },
      {
        label: "Karena backup hanya berguna untuk file foto dan video",
        value: "d",
      },
    ],
    answer: "b",
    explanation:
      "Backup yang terpisah berfungsi sebagai cadangan pemulihan. Ini penting ketika perangkat utama tidak lagi dapat diakses atau datanya bermasalah.",
  },
  {
    id: 14,
    category: "Social Engineering",
    scenario: false,
    question:
      "Manakah pernyataan yang paling tepat menggambarkan risiko social engineering?",
    options: [
      { label: "Social engineering hanya terjadi melalui email", value: "a" },
      {
        label:
          "Social engineering memanfaatkan celah teknis pada perangkat keras",
        value: "b",
      },
      {
        label:
          "Social engineering memanipulasi kepercayaan, emosi, atau kepanikan korban agar memberi akses atau informasi",
        value: "c",
      },
      {
        label:
          "Social engineering selalu melibatkan malware yang terlihat jelas",
        value: "d",
      },
    ],
    answer: "c",
    explanation:
      "Social engineering berfokus pada manipulasi psikologis, bukan semata pada kelemahan teknis. Karena itu, kewaspadaan perilaku sangat penting.",
  },
  {
    id: 15,
    category: "Respons Akun",
    scenario: false,
    question:
      "Anda menerima notifikasi login asing pada akun, tetapi masih bisa mengaksesnya. Langkah mana yang paling tepat dilakukan terlebih dahulu?",
    options: [
      { label: "Mengabaikannya selama akun masih bisa dibuka", value: "a" },
      {
        label:
          "Segera mengubah password dan meninjau sesi atau perangkat yang masih aktif",
        value: "b",
      },
      { label: "Menunggu apakah notifikasi serupa muncul lagi", value: "c" },
      {
        label: "Membuat akun baru dan meninggalkan akun lama tetap aktif",
        value: "d",
      },
    ],
    answer: "b",
    explanation:
      "Jika ada indikasi login asing, prioritas awal adalah mengamankan akun dengan mengganti password dan mengecek sesi aktif sebelum dampaknya meluas.",
  },
];

function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildQuizSet(): Question[] {
  return shuffleArray(BASE_QUESTIONS).map((question) => ({
    ...question,
    options: shuffleArray(question.options),
  }));
}

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>(() =>
    buildQuizSet(),
  );

  const quizCardRef = useRef<HTMLDivElement | null>(null);

  const currentQuestion = quizQuestions[currentIndex];
  const selectedValue = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;

  const answeredCount = useMemo(() => {
    return quizQuestions.filter((q) => answers[q.id]).length;
  }, [answers, quizQuestions]);

  const progress = started
    ? ((currentIndex + 1) / quizQuestions.length) * 100
    : 0;

  const score = useMemo(() => {
    return quizQuestions.reduce((total, item) => {
      return total + (answers[item.id] === item.answer ? 1 : 0);
    }, 0);
  }, [answers, quizQuestions]);

  const percentage = useMemo(() => {
    return quizQuestions.length === 0
      ? 0
      : Math.round((score / quizQuestions.length) * 100);
  }, [score, quizQuestions.length]);

  const resultLabel = useMemo(() => {
    if (percentage >= 87) return "Sangat Baik";
    if (percentage >= 73) return "Baik";
    if (percentage >= 60) return "Cukup";
    return "Perlu Ditingkatkan";
  }, [percentage]);

  const missedQuestions = useMemo(() => {
    return quizQuestions.filter(
      (question) => answers[question.id] !== question.answer,
    );
  }, [answers, quizQuestions]);

  const weakestCategories = useMemo(() => {
    const counts = new Map<string, number>();
    missedQuestions.forEach((question) => {
      counts.set(question.category, (counts.get(question.category) ?? 0) + 1);
    });
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([category]) => category);
  }, [missedQuestions]);

  const recommendation = useMemo(() => {
    if (!submitted) return "";
    if (percentage >= 87)
      return "Pemahaman Anda sudah sangat baik. Langkah berikutnya adalah menjaga konsistensi kebiasaan aman dan memperdalam topik yang lebih spesifik.";
    if (percentage >= 73)
      return "Pemahaman Anda sudah cukup kuat, tetapi masih ada beberapa bagian yang perlu diperkuat agar lebih siap menghadapi risiko digital sehari-hari.";
    if (percentage >= 60)
      return "Dasar pemahaman Anda sudah mulai terbentuk, tetapi masih ada beberapa pola ancaman dan kebiasaan aman yang perlu ditinjau kembali.";
    return "Anda sebaiknya mengulang materi dasar terlebih dahulu, terutama yang berkaitan dengan keamanan akun, penipuan digital, aplikasi, dan perilaku aman saat memakai perangkat.";
  }, [percentage, submitted]);

  useEffect(() => {
    if (!started) return;
    const id = window.requestAnimationFrame(() => {
      quizCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [started]);

  const handleStart = () => {
    setQuizQuestions(buildQuizSet());
    setAnswers({});
    setSubmitted(false);
    setCurrentIndex(0);
    setStarted(true);
  };

  const handleSelect = (value: string) => {
    if (submitted || !currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (!selectedValue) return;
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (!selectedValue) return;
    setSubmitted(true);
    window.requestAnimationFrame(() => {
      quizCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleReset = () => {
    setQuizQuestions(buildQuizSet());
    setStarted(false);
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageLayout>
      <section className="border-b border-slate-200 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00a9d8]/5 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00a9d8]/20 bg-[#00a9d8]/10 backdrop-blur-sm px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#00a9d8]">
            <ShieldCheck size={16} strokeWidth={2.5} /> Evaluasi Pemahaman
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-black leading-[1.15] text-slate-900 sm:text-5xl lg:text-[3.5rem] tracking-tight">
            Uji pemahaman Anda setelah membaca materi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a9d8] to-[#259b9a]">
              secara menyeluruh
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-slate-600">
            Evaluasi interaktif ini dirancang untuk membantu Anda melihat sejauh
            mana pemahaman terhadap praktik keamanan digital di dunia nyata.
          </p>

          {!started && (
            <div className="mt-10 flex justify-center animate-fade-in-up">
              <button
                onClick={handleStart}
                className="group inline-flex items-center justify-center gap-2 rounded-[1rem] bg-[#00a9d8] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#00a9d8]/25 transition-all hover:-translate-y-1 hover:bg-[#0d9edf]"
              >
                Mulai Evaluasi Sekarang{" "}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Render Aturan Sebelum Mulai */}
      {!started ? (
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 animate-fade-in-up delay-100">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Skenario Nyata",
                desc: "Sebagian soal berbentuk simulasi situasi yang sangat dekat dengan kondisi Anda sehari-hari di dunia digital.",
              },
              {
                title: "Topik Ekstensif",
                desc: "Mencakup keamanan akun, phishing, jaringan publik, hingga respons taktis saat ada indikasi risiko keamanan.",
              },
              {
                title: "Penilaian Mendalam",
                desc: "Pertanyaan dirancang agar Anda menimbang konteks, bukan sekadar menebak jawaban yang paling terlihat benar.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-[#00a9d8]/30"
              >
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : !submitted && currentQuestion ? (
        /* SEDANG MENGERJAKAN KUIS */
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 min-h-[70vh] flex flex-col justify-center">
          <div
            ref={quizCardRef}
            className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white p-8 shadow-[0_20px_60px_-15px_rgba(0,169,216,0.08)] sm:p-12 animate-fade-in-up"
          >
            {/* Progress Bar Top */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-slate-100">
              <div
                className="h-full bg-gradient-to-r from-[#0d9edf] to-[#00a9d8] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#00a9d8]/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#00a9d8]">
                  {currentQuestion.category}
                </span>
                {currentQuestion.scenario && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-amber-600 ring-1 ring-amber-200/50">
                    Skenario Nyata
                  </span>
                )}
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-slate-500">
                Soal {currentIndex + 1}{" "}
                <span className="opacity-50">/ {quizQuestions.length}</span>
              </div>
            </div>

            <div key={currentQuestion.id} className="animate-fade-in-up">
              <h2 className="text-2xl font-black leading-[1.4] text-slate-900 sm:text-3xl mb-8 tracking-tight">
                {currentQuestion.question}
              </h2>
              <div className="space-y-4">
                {currentQuestion.options.map((option) => {
                  const active = selectedValue === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className={`group relative w-full rounded-[1.25rem] border-2 px-6 py-5 text-left transition-all duration-200 ease-out flex items-center gap-5 ${
                        active
                          ? "border-[#00a9d8] bg-[#00a9d8]/5 shadow-md shadow-[#00a9d8]/10 scale-[1.01]"
                          : "border-slate-200 bg-white hover:border-[#0d9edf]/50 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          active
                            ? "border-[#00a9d8] bg-[#00a9d8]"
                            : "border-slate-300 group-hover:border-[#0d9edf]"
                        }`}
                      >
                        {active && (
                          <div className="h-2.5 w-2.5 rounded-full bg-white animate-fade-in-up" />
                        )}
                      </div>
                      <span
                        className={`text-base font-semibold leading-relaxed transition-colors ${active ? "text-[#00a9d8]" : "text-slate-700"}`}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-4 border-t border-slate-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-medium text-slate-400">
                Pilih satu jawaban yang paling tepat.
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="rounded-2xl px-6 py-3.5 text-sm font-bold text-slate-500 transition hover:bg-slate-100 disabled:opacity-30"
                >
                  Kembali
                </button>
                {currentIndex === quizQuestions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedValue}
                    className="inline-flex items-center gap-2 rounded-[1rem] bg-[#00a9d8] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#00a9d8]/20 transition-all hover:-translate-y-0.5 hover:bg-[#0d9edf] disabled:translate-y-0 disabled:opacity-50"
                  >
                    Lihat Hasil Akhir <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!selectedValue}
                    className="inline-flex items-center gap-2 rounded-[1rem] bg-[#00a9d8] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#00a9d8]/20 transition-all hover:-translate-y-0.5 hover:bg-[#0d9edf] disabled:translate-y-0 disabled:opacity-50"
                  >
                    Lanjut <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* HASIL EVALUASI */
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div
            ref={quizCardRef}
            className="rounded-[2.5rem] border border-slate-200/80 bg-white p-8 shadow-[0_20px_60px_-15px_rgba(0,169,216,0.08)] sm:p-12 animate-fade-in-up"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-emerald-700">
              <BadgeCheck size={14} /> Hasil Evaluasi
            </div>
            <h2 className="mt-6 text-4xl font-black text-slate-900 sm:text-5xl tracking-tight">
              Skor: {score}{" "}
              <span className="text-slate-300">/ {quizQuestions.length}</span>
            </h2>
            <p className="mt-4 text-xl font-bold text-[#00a9d8]">
              {resultLabel} · Akurasi {percentage}%
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 font-medium">
              {recommendation}
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Jawaban Tepat
                </p>
                <p className="mt-2 text-3xl font-black text-[#259b9a]">
                  {score}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Perlu Ditinjau
                </p>
                <p className="mt-2 text-3xl font-black text-rose-500">
                  {quizQuestions.length - score}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Akurasi Anda
                </p>
                <p className="mt-2 text-3xl font-black text-[#00a9d8]">
                  {percentage}%
                </p>
              </div>
            </div>

            {weakestCategories.length > 0 && (
              <div className="mt-10 rounded-[1.5rem] border border-amber-100 bg-amber-50/50 p-6 sm:p-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Topik yang sebaiknya diulang
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {weakestCategories.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white border border-amber-200 px-4 py-2 text-sm font-bold text-amber-700 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {missedQuestions.length > 0 ? (
              <div className="mt-12 border-t border-slate-100 pt-10">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Tinjauan & Pembahasan
                </h3>
                <div className="mt-6 space-y-6">
                  {missedQuestions.map((q) => (
                    <div
                      key={q.id}
                      className="rounded-[1.5rem] border border-rose-100 bg-rose-50/30 p-6 sm:p-8"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-600">
                          {q.category}
                        </span>
                        <span className="rounded-full bg-red-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-red-600 ring-1 ring-red-200">
                          Jawaban Belum Tepat
                        </span>
                      </div>
                      <h4 className="mt-5 text-lg font-black leading-relaxed text-slate-900">
                        {q.question}
                      </h4>
                      <div className="mt-5 rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
                        <span className="font-extrabold text-[#00a9d8] uppercase text-[10px] tracking-widest block mb-2">
                          Mengapa demikian?
                        </span>
                        <p className="text-sm font-medium leading-relaxed text-slate-700">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-12 rounded-[1.5rem] border border-[#259b9a]/30 bg-[#259b9a]/5 p-8 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#259b9a]/20 text-[#259b9a]">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      Sempurna! Semua jawaban tepat.
                    </h3>
                    <p className="mt-2 text-base font-medium leading-relaxed text-slate-700">
                      Pemahaman literasi siber Anda luar biasa. Pertahankan
                      kebiasaan digital yang aman ini di kehidupan sehari-hari.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/artikel"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00a9d8] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#00a9d8]/25 transition-all hover:-translate-y-1 hover:bg-[#0d9edf]"
              >
                Eksplorasi Materi{" "}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 transition hover:-translate-y-1 hover:bg-slate-50 hover:border-[#00a9d8]/30 hover:text-[#00a9d8]"
              >
                <RotateCcw size={16} /> Ulangi Evaluasi
              </button>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </PageLayout>
  );
}