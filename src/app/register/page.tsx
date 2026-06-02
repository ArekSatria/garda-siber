"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

type PasswordRule = {
  id: string;
  label: string;
  test: (pw: string) => boolean;
};

const PASSWORD_RULES: PasswordRule[] = [
  { id: "length", label: "Minimal 8 karakter", test: (pw) => pw.length >= 8 },
  { id: "upper", label: "Huruf besar (A-Z)", test: (pw) => /[A-Z]/.test(pw) },
  { id: "number", label: "Angka (0-9)", test: (pw) => /[0-9]/.test(pw) },
  {
    id: "special",
    label: "Karakter simbol (!@#$)",
    test: (pw) => /[^A-Za-z0-9]/.test(pw),
  },
];

function getStrength(pw: string) {
  const passed = PASSWORD_RULES.filter((r) => r.test(pw)).length;
  if (pw.length === 0)
    return {
      score: 0,
      label: "",
      color: "text-slate-400",
      barColor: "bg-slate-200",
    };
  if (passed <= 1)
    return {
      score: 1,
      label: "Lemah",
      color: "text-red-600",
      barColor: "bg-red-500",
    };
  if (passed === 2)
    return {
      score: 2,
      label: "Cukup",
      color: "text-orange-500",
      barColor: "bg-orange-400",
    };
  if (passed === 3)
    return {
      score: 3,
      label: "Baik",
      color: "text-[#00a9d8]",
      barColor: "bg-[#00a9d8]",
    };
  return {
    score: 4,
    label: "Kuat",
    color: "text-[#259b9a]",
    barColor: "bg-[#259b9a]",
  };
}

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const strength = getStrength(password);
  const passedRules = PASSWORD_RULES.filter((r) => r.test(password));
  const passwordMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const handleRegister = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      if (passedRules.length < 4)
        return setError("Sandi belum memenuhi semua syarat keamanan.");
      if (password !== confirmPassword)
        return setError("Sandi dan konfirmasi sandi tidak cocok.");
      if (!agreeTerms)
        return setError(
          "Anda harus menyetujui Kebijakan Privasi dan Syarat Layanan.",
        );

      setLoading(true);
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error)
        setError(
          error.message.includes("already registered")
            ? "Email ini sudah terdaftar. Silakan login."
            : error.message,
        );
      else setSuccess(true);
      setLoading(false);
    },
    [email, password, confirmPassword, fullName, agreeTerms, passedRules],
  );

  async function handleGoogleRegister() {
    setGoogleLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/`,
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) {
      setError("Gagal terhubung dengan Google.");
      setGoogleLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-200 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#259b9a] to-[#66d47e]" />
          <div className="px-8 py-12 text-center">
            <div className="w-24 h-24 bg-[#259b9a]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#259b9a]/20">
              <CheckCircle2 className="w-12 h-12 text-[#259b9a]" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
              Pendaftaran Berhasil!
            </h2>
            <p className="text-slate-600 font-medium text-sm leading-relaxed mb-8 max-w-xs mx-auto">
              Kami telah mengirimkan tautan verifikasi ke{" "}
              <strong className="text-slate-900">{email}</strong>. Cek inbox
              Anda.
            </p>
            <Link
              href="/login"
              className="w-full flex items-center justify-center gap-2 bg-[#00a9d8] text-white py-4 rounded-xl font-bold text-sm shadow-md hover:bg-[#0d9edf] transition-all"
            >
              Lanjut ke Login <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="hidden lg:flex lg:w-[48%] relative flex-col overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00a9d8] via-[#0d9edf] to-[#259b9a]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 flex flex-col h-full px-12 py-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-black text-white text-lg tracking-tight block">
                Garda Siber
              </span>
            </div>
          </div>
          <div className="mt-16 flex-1">
            <h1 className="text-4xl font-black text-white leading-[1.2] tracking-tight">
              Bergabung & Mulai
              <br />
              <span className="text-cyan-200">Perjalanan Literasi</span>
              <br />
              Digital Anda
            </h1>
            <p className="mt-6 text-cyan-50 text-base font-medium max-w-sm">
              Mulai perjalanan Anda menuju literasi keamanan digital yang lebih
              baik. Akses konten edukasi terpercaya.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[440px]">
          <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-200 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-[#00a9d8] to-[#259b9a]" />
            <div className="px-8 pt-8 pb-8">
              <h2 className="text-2xl font-black text-slate-900 mb-1.5 tracking-tight">
                Daftar Akun Baru
              </h2>
              <p className="text-slate-500 text-sm font-medium mb-6">
                Mulai pengalaman belajar keamanan digital
              </p>

              {error && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-6 animate-fade-in-up">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm font-bold leading-snug">
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nama lengkap"
                      required
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00a9d8] focus:ring-1 focus:ring-[#00a9d8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contoh@email.com"
                      required
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#00a9d8] focus:ring-1 focus:ring-[#00a9d8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Sandi
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Sandi rahasia"
                      required
                      className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#00a9d8] focus:ring-1 focus:ring-[#00a9d8]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div className="mt-2.5 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                          <div
                            className={`h-full rounded-full transition-all ${strength.barColor}`}
                            style={{ width: `${(strength.score / 4) * 100}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs font-black min-w-[40px] text-right ${strength.color}`}
                        >
                          {strength.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {PASSWORD_RULES.map((rule) => {
                          const passed = rule.test(password);
                          return (
                            <div
                              key={rule.id}
                              className="flex items-center gap-1.5"
                            >
                              <div
                                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${passed ? "bg-green-100 text-green-600" : "bg-slate-200 text-slate-400"}`}
                              >
                                {passed ? (
                                  <Check size={10} strokeWidth={4} />
                                ) : (
                                  <X size={10} strokeWidth={3} />
                                )}
                              </div>
                              <span
                                className={`text-[10px] font-bold ${passed ? "text-green-600" : "text-slate-500"}`}
                              >
                                {rule.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Ulangi Sandi
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ulangi sandi"
                      required
                      className={`w-full pl-11 pr-12 py-3 bg-slate-50 border rounded-xl text-sm font-semibold focus:outline-none transition-all ${passwordMismatch ? "border-red-400 focus:ring-red-400 bg-red-50" : passwordMatch ? "border-[#259b9a] focus:ring-[#259b9a] bg-teal-50" : "border-slate-200 focus:border-[#00a9d8] focus:ring-[#00a9d8]"}`}
                    />
                  </div>
                  {passwordMismatch && (
                    <p className="text-xs font-bold text-red-600 mt-1">
                      Sandi tidak cocok
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                    className="mt-1"
                  />
                  <p className="text-xs font-bold text-slate-500">
                    Saya menyetujui{" "}
                    <Link
                      href="/privacy"
                      className="text-[#00a9d8] hover:underline"
                    >
                      Kebijakan Privasi
                    </Link>{" "}
                    dan{" "}
                    <Link
                      href="/terms"
                      className="text-[#00a9d8] hover:underline"
                    >
                      Syarat Layanan
                    </Link>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !agreeTerms ||
                    passedRules.length < 4 ||
                    passwordMismatch
                  }
                  className="w-full bg-[#00a9d8] hover:bg-[#0d9edf] disabled:bg-slate-200 text-white py-3.5 rounded-xl font-black text-sm shadow-md transition-all"
                >
                  {loading ? (
                    <Loader2 className="mx-auto animate-spin" size={18} />
                  ) : (
                    "Daftar Sekarang"
                  )}
                </button>
              </form>

              <button
                onClick={handleGoogleRegister}
                disabled={googleLoading}
                className="w-full mt-4 bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-xl hover:bg-slate-50 shadow-sm transition-all flex justify-center items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Daftar dengan Google
              </button>

              <p className="text-center text-sm font-medium text-slate-500 mt-6">
                Sudah punya akun?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#00a9d8] hover:underline"
                >
                  Masuk
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
