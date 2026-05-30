"use client";

import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useState } from "react";
import { quizQuestions, getScoreLabel } from "@/data/quizData";
import { createClient } from "@/lib/supabase/client";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Trophy,
  RotateCcw,
  BookOpen,
  Brain,
  Clock,
  Target,
} from "lucide-react";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

type QuizState = "intro" | "playing" | "result";

export default function QuizPage() {
  const [state, setState] = useState<QuizState>("intro");
  const [questions, setQuestions] = useState(quizQuestions);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(quizQuestions.length).fill(null),
  );
  const [showExplanation, setShowExplanation] = useState(false);

  const question = questions[current];
  const totalQ = questions.length;
  const progress = (current / totalQ) * 100;
  const score = answers.filter(
    (a, i) => a === questions[i].correctIndex,
  ).length;
  const scoreInfo = getScoreLabel(score, totalQ);

  function handleSelect(idx: number) {
    if (confirmed) return;
    setSelected(idx);
  }

  function handleConfirm() {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setConfirmed(true);
    setShowExplanation(true);
  }

  // ─── FIX: pisahkan save ke Supabase ke fungsi async sendiri ───────────────
  async function saveResultToSupabase(
    finalAnswers: (number | null)[],
    finalScore: number,
  ) {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const info = getScoreLabel(finalScore, totalQ);
      await supabase.from("quiz_results").insert({
        user_id: user.id,
        score: finalScore,
        total: totalQ,
        label: info.label,
        answers: finalAnswers,
      });
    } catch (err) {
      // Gagal simpan tidak boleh block user lihat hasil
      console.error("Gagal menyimpan hasil quiz:", err);
    }
  }

  // ─── FIX: handleNext sekarang murni sync, simpan hasil via fungsi terpisah ─
  function handleNext() {
    if (current < totalQ - 1) {
      // Bukan soal terakhir — lanjut ke soal berikutnya
      setCurrent(current + 1);
      setSelected(null);
      setConfirmed(false);
      setShowExplanation(false);
    } else {
      // Soal terakhir — hitung skor final dari state answers terkini
      // FIX: answers state sudah di-update di handleConfirm sebelum handleNext dipanggil
      const finalScore = answers.filter(
        (a, i) => a === questions[i].correctIndex,
      ).length;

      // Simpan ke Supabase secara async (fire-and-forget, tidak block UI)
      saveResultToSupabase(answers, finalScore);

      // Langsung tampilkan halaman hasil
      setState("result");
    }
  }

  function handleReset() {
    setQuestions(shuffleArray(quizQuestions));
    setState("intro");
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setAnswers(Array(quizQuestions.length).fill(null));
    setShowExplanation(false);
  }

  const categoryColor: Record<string, string> = {
    Phishing: "bg-red-50 text-red-600 border-red-100",
    Password: "bg-blue-50 text-blue-600 border-blue-100",
    "Social Engineering": "bg-purple-50 text-purple-600 border-purple-100",
    "Keamanan WiFi": "bg-green-50 text-green-600 border-green-100",
    Ransomware: "bg-orange-50 text-orange-600 border-orange-100",
    "Scam APK": "bg-rose-50 text-rose-600 border-rose-100",
    "Privasi Digital": "bg-indigo-50 text-indigo-600 border-indigo-100",
    Investasi: "bg-yellow-50 text-yellow-700 border-yellow-100",
    "Identity Theft": "bg-slate-50 text-slate-600 border-slate-200",
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        {/* ── INTRO ── */}
        {state === "intro" && (
          <main className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-2xl w-full">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-[#0F52BA] to-blue-700 p-10 text-white text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Brain size={40} className="text-white" />
                  </div>
                  <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
                    Quiz Literasi Siber
                  </h1>
                  <p className="text-blue-200 font-medium">
                    Uji kemampuan Anda mengenali ancaman digital
                  </p>
                </div>

                <div className="p-10">
                  <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="text-center p-4 bg-slate-50 rounded-2xl">
                      <Target
                        size={22}
                        className="text-[#0F52BA] mx-auto mb-2"
                      />
                      <p className="font-black text-slate-900 text-lg">10</p>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                        Soal
                      </p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-2xl">
                      <Clock
                        size={22}
                        className="text-[#0F52BA] mx-auto mb-2"
                      />
                      <p className="font-black text-slate-900 text-lg">
                        ~5 mnt
                      </p>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                        Durasi
                      </p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-2xl">
                      <BookOpen
                        size={22}
                        className="text-[#0F52BA] mx-auto mb-2"
                      />
                      <p className="font-black text-slate-900 text-lg">
                        3 tipe
                      </p>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                        Format
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-10">
                    {[
                      "Pilihan ganda, benar/salah, dan skenario nyata",
                      "1 soal per halaman dengan progress bar",
                      "Penjelasan jawaban setelah setiap soal",
                      "Hasil akhir dan rekomendasi artikel",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2
                          size={18}
                          className="text-green-500 shrink-0"
                        />
                        <p className="text-slate-600 text-sm font-medium">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setQuestions(shuffleArray(quizQuestions));
                      setAnswers(Array(quizQuestions.length).fill(null));
                      setState("playing");
                    }}
                    className="w-full bg-[#0F52BA] hover:bg-blue-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                  >
                    Mulai Quiz <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ── PLAYING ── */}
        {state === "playing" && (
          <main
            className="flex-1 flex flex-col overflow-hidden"
            style={{ height: "calc(100vh - 0px)" }}
          >
            <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-4 overflow-hidden">
              {/* Progress */}
              <div className="mb-3 space-y-1.5 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Soal {current + 1} dari {totalQ}
                  </span>
                  <span className="text-xs font-black text-[#0F52BA]">
                    {Math.round(progress)}% selesai
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0F52BA] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded-full transition-all ${
                        i < current
                          ? answers[i] === questions[i].correctIndex
                            ? "bg-green-400"
                            : "bg-red-400"
                          : i === current
                            ? "bg-[#0F52BA]"
                            : "bg-slate-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Card Soal */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <div className="px-6 pt-4 pb-3 border-b border-slate-50 shrink-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border uppercase tracking-widest ${categoryColor[question.category] ?? "bg-slate-50 text-slate-600 border-slate-100"}`}
                    >
                      {question.category}
                    </span>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      {question.type === "truefalse"
                        ? "Benar / Salah"
                        : question.type === "scenario"
                          ? "Skenario"
                          : "Pilihan Ganda"}
                    </span>
                  </div>

                  {question.scenario && (
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-2.5 mb-2 flex gap-2">
                      <ShieldAlert
                        size={14}
                        className="text-amber-500 shrink-0 mt-0.5"
                      />
                      <p className="text-amber-700 text-xs font-semibold leading-relaxed">
                        {question.scenario}
                      </p>
                    </div>
                  )}

                  <h2 className="text-sm font-black text-slate-900 leading-snug">
                    {question.question}
                  </h2>
                </div>

                {/* Pilihan */}
                <div className="px-6 py-3 space-y-2 flex-1 overflow-hidden">
                  {question.options.map((opt, idx) => {
                    let style =
                      "border-slate-100 bg-white hover:border-[#0F52BA] hover:bg-blue-50/30";
                    if (confirmed) {
                      if (idx === question.correctIndex)
                        style = "border-green-400 bg-green-50";
                      else if (idx === selected)
                        style = "border-red-400 bg-red-50";
                      else style = "border-slate-100 bg-white opacity-40";
                    } else if (selected === idx) {
                      style = "border-[#0F52BA] bg-blue-50";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={confirmed}
                        className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all duration-200 ${style}`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                            confirmed
                              ? idx === question.correctIndex
                                ? "bg-green-500 text-white"
                                : idx === selected
                                  ? "bg-red-500 text-white"
                                  : "bg-slate-100 text-slate-400"
                              : selected === idx
                                ? "bg-[#0F52BA] text-white"
                                : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {confirmed ? (
                            idx === question.correctIndex ? (
                              <CheckCircle2 size={14} />
                            ) : idx === selected ? (
                              <XCircle size={14} />
                            ) : (
                              String.fromCharCode(65 + idx)
                            )
                          ) : (
                            String.fromCharCode(65 + idx)
                          )}
                        </div>
                        <span className="text-xs font-semibold text-slate-700 leading-snug">
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Penjelasan */}
                {showExplanation && (
                  <div
                    className={`mx-6 mb-2 p-3 rounded-xl border-l-4 shrink-0 ${
                      selected === question.correctIndex
                        ? "bg-green-50 border-green-400"
                        : "bg-red-50 border-red-400"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {selected === question.correctIndex ? (
                        <CheckCircle2 size={13} className="text-green-600" />
                      ) : (
                        <XCircle size={13} className="text-red-600" />
                      )}
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${
                          selected === question.correctIndex
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {selected === question.correctIndex
                          ? "Jawaban Benar!"
                          : "Jawaban Salah"}
                      </span>
                    </div>
                    <p className="text-slate-700 text-xs font-medium leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                )}

                {/* Tombol */}
                <div className="px-6 pb-4 pt-2 shrink-0">
                  {!confirmed ? (
                    <button
                      onClick={handleConfirm}
                      disabled={selected === null}
                      className="w-full bg-[#0F52BA] disabled:bg-slate-200 disabled:text-slate-400 hover:bg-blue-700 text-white py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all"
                    >
                      Konfirmasi Jawaban
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="w-full bg-[#0F52BA] hover:bg-blue-700 text-white py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
                    >
                      {current < totalQ - 1 ? "Soal Berikutnya" : "Lihat Hasil"}{" "}
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ── RESULT ── */}
        {state === "result" && (
          <main className="flex-1 p-8">
            <div className="max-w-2xl mx-auto w-full space-y-6">
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-[#0F52BA] to-blue-700 p-10 text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy size={44} className="text-yellow-300" />
                  </div>
                  <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-1">
                    Skor Anda
                  </p>
                  <p className="text-6xl font-black mb-1">
                    {score}
                    <span className="text-3xl text-blue-300">/{totalQ}</span>
                  </p>
                  <p className="text-xl font-black bg-white/10 px-4 py-1 rounded-full inline-block mt-2">
                    {scoreInfo.label}
                  </p>
                </div>

                <div className="p-8">
                  <p className="text-slate-600 text-sm font-medium leading-relaxed text-center mb-8">
                    {scoreInfo.desc}
                  </p>

                  {/* Rekap jawaban */}
                  <div className="space-y-3 mb-8">
                    <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-4">
                      Rekap Jawaban
                    </h3>
                    {questions.map((q, i) => {
                      const isCorrect = answers[i] === q.correctIndex;
                      return (
                        <div
                          key={i}
                          className={`flex items-start gap-3 p-4 rounded-2xl border ${isCorrect ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}
                        >
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-black text-xs ${isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                          >
                            {isCorrect ? (
                              <CheckCircle2 size={14} />
                            ) : (
                              <XCircle size={14} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-700 text-xs font-bold leading-snug truncate">
                              {q.question.substring(0, 70)}...
                            </p>
                            <p
                              className={`text-[11px] font-bold mt-1 ${isCorrect ? "text-green-600" : "text-red-600"}`}
                            >
                              {isCorrect
                                ? "Benar"
                                : `Salah — Jawaban: ${q.options[q.correctIndex]}`}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleReset}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all"
                    >
                      <RotateCcw size={16} /> Ulangi Quiz
                    </button>
                    <Link
                      href="/artikel"
                      className="flex-1 flex items-center justify-center gap-2 bg-[#0F52BA] hover:bg-blue-700 text-white py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all"
                    >
                      <BookOpen size={16} /> Pelajari Materi
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}