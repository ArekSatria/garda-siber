"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const passwordStrength = () => {
    if (password.length === 0) return null;
    if (password.length < 6)
      return { label: "Lemah", color: "bg-red-400", width: "w-1/4" };
    if (password.length < 8)
      return { label: "Cukup", color: "bg-orange-400", width: "w-2/4" };
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password))
      return { label: "Baik", color: "bg-yellow-400", width: "w-3/4" };
    return { label: "Kuat", color: "bg-green-500", width: "w-full" };
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

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

    if (error) {
      if (error.message.includes("already registered")) {
        setError("Email ini sudah terdaftar. Silakan login.");
      } else {
        setError(error.message);
      }
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0A1E3F] to-slate-900 flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">
              Pendaftaran Berhasil!
            </h2>
            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
              Kami telah mengirimkan email verifikasi ke{" "}
              <strong className="text-slate-700">{email}</strong>. Silakan cek
              inbox atau folder spam Anda.
            </p>
            <Link
              href="/login"
              className="w-full flex items-center justify-center bg-[#0F52BA] text-white py-3.5 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all"
            >
              Masuk ke Akun
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0A1E3F] to-slate-900 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-[#0F52BA] rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/50">
              <Shield size={32} className="text-white" />
            </div>
            <div>
              <h1 className="font-black text-white text-2xl tracking-tight">
                Garda Siber
              </h1>
              <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mt-0.5">
                Pusat Literasi Keamanan Digital
              </p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 overflow-hidden">
          <div className="bg-gradient-to-r from-[#0F52BA] to-blue-600 px-8 py-6">
            <h2 className="text-xl font-black text-white">Buat Akun Baru</h2>
            <p className="text-blue-200 text-sm font-medium mt-1">
              Bergabung dengan komunitas literasi siber Indonesia
            </p>
          </div>

          <div className="px-8 py-8 space-y-5">
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
                <AlertCircle size={16} className="text-red-500 shrink-0" />
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">
                Nama Lengkap
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA] transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Email</label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@email.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  required
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* Password strength */}
              {strength && (
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${strength.color} ${strength.width}`}
                    />
                  </div>
                  <p className="text-xs font-bold text-slate-400">
                    Kekuatan password:{" "}
                    <span className="text-slate-600">{strength.label}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Konfirmasi Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  required
                  className={`w-full pl-11 pr-12 py-3 bg-slate-50 border rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F52BA]/20 focus:border-[#0F52BA] transition-all ${
                    confirmPassword && password !== confirmPassword
                      ? "border-red-300 bg-red-50"
                      : confirmPassword && password === confirmPassword
                        ? "border-green-300 bg-green-50"
                        : "border-slate-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs font-bold text-red-500">
                  Password tidak cocok
                </p>
              )}
              {confirmPassword && password === confirmPassword && (
                <p className="text-xs font-bold text-green-500">
                  Password cocok ✓
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={handleRegister}
              disabled={
                loading || !fullName || !email || !password || !confirmPassword
              }
              className="w-full bg-[#0F52BA] hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white py-3.5 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Mendaftarkan...
                </>
              ) : (
                "Daftar Sekarang"
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Sudah punya akun?
                </span>
              </div>
            </div>

            <Link
              href="/login"
              className="w-full flex items-center justify-center py-3.5 rounded-xl border-2 border-slate-200 hover:border-[#0F52BA] hover:bg-blue-50 text-slate-700 hover:text-[#0F52BA] font-black uppercase tracking-widest text-sm transition-all"
            >
              Masuk ke Akun
            </Link>
          </div>
        </div>

        <p className="text-center mt-6 text-slate-400 text-xs font-medium">
          <Link href="/" className="hover:text-white transition-colors">
            ← Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}
