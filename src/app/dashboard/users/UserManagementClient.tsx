"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Users,
  Search,
  Shield,
  UserCheck,
  UserX,
  Crown,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Mail,
} from "lucide-react";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
}

interface Props {
  users: User[];
}

export default function UserManagementClient({ users: initialUsers }: Props) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "user">("all");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [, startTransition] = useTransition();

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  }

  async function changeRole(userId: string, newRole: "admin" | "user") {
    if (loadingId) return;
    setLoadingId(userId);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;

      startTransition(() => {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
        );
      });

      showToast(
        "success",
        `Role berhasil diubah menjadi ${newRole === "admin" ? "Administrator" : "Member"}`,
      );
    } catch {
      showToast("error", "Gagal mengubah role. Coba lagi.");
    } finally {
      setLoadingId(null);
    }
  }

  const filtered = users.filter((u) => {
    const matchSearch =
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole =
      filterRole === "all" ||
      (filterRole === "admin" && u.role === "admin") ||
      (filterRole === "user" && u.role !== "admin");
    return matchSearch && matchRole;
  });

  const adminCount = users.filter((u) => u.role === "admin").length;
  const memberCount = users.filter((u) => u.role !== "admin").length;

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold transition-all ${
            toast.type === "success"
              ? "bg-emerald-500 text-white"
              : "bg-rose-500 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={16} />
          ) : (
            <AlertTriangle size={16} />
          )}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Manajemen User</h1>
        <p className="text-slate-400 text-sm mt-1">
          Kelola akun, role, dan akses pengguna Garda Siber
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <Users size={18} className="text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-white">{users.length}</p>
            <p className="text-slate-400 text-xs font-semibold">
              Total Pengguna
            </p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center">
            <Crown size={18} className="text-violet-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-white">{adminCount}</p>
            <p className="text-slate-400 text-xs font-semibold">
              Administrator
            </p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
            <UserCheck size={18} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-white">{memberCount}</p>
            <p className="text-slate-400 text-xs font-semibold">Member</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Cari nama atau email pengguna..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          {/* Role Filter */}
          <div className="flex bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            {(["all", "admin", "user"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFilterRole(r)}
                className={`px-4 py-2.5 text-xs font-bold transition-all ${
                  filterRole === r
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {r === "all" ? "Semua" : r === "admin" ? "Admin" : "Member"}
              </button>
            ))}
          </div>

          <p className="text-slate-500 text-sm ml-auto">
            {filtered.length} pengguna
          </p>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/50">
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-6 py-4">
                  Pengguna
                </th>
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-6 py-4">
                  Email
                </th>
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-6 py-4">
                  Role
                </th>
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-6 py-4">
                  Bergabung
                </th>
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-6 py-4">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-800/30 transition-all"
                >
                  {/* Avatar + Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          user.role === "admin"
                            ? "bg-violet-500/20"
                            : "bg-slate-700"
                        }`}
                      >
                        {user.role === "admin" ? (
                          <Crown size={15} className="text-violet-400" />
                        ) : (
                          <span className="text-slate-300 text-xs font-black">
                            {(user.full_name ||
                              user.email ||
                              "?")[0].toUpperCase()}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-200 text-sm font-semibold">
                        {user.full_name || "—"}
                      </p>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Mail size={12} className="text-slate-500 shrink-0" />
                      <span className="text-slate-400 text-sm">
                        {user.email}
                      </span>
                    </div>
                  </td>

                  {/* Role Badge */}
                  <td className="px-6 py-4">
                    {user.role === "admin" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-500/15 text-violet-400 text-xs font-bold rounded-full border border-violet-500/25">
                        <Crown size={11} />
                        Administrator
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-700 text-slate-300 text-xs font-bold rounded-full">
                        <Shield size={11} />
                        Member
                      </span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Clock size={11} />
                      {formatDate(user.created_at)}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    {loadingId === user.id ? (
                      <div className="flex items-center gap-2 text-slate-400 text-xs">
                        <Loader2 size={14} className="animate-spin" />
                        <span>Memproses...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {user.role !== "admin" ? (
                          <button
                            onClick={() => changeRole(user.id, "admin")}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg transition-all"
                          >
                            <Crown size={12} />
                            Jadikan Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => changeRole(user.id, "user")}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-bold rounded-lg transition-all"
                          >
                            <UserX size={12} />
                            Turunkan ke Member
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-600"
                  >
                    <Users size={32} className="mx-auto mb-3 text-slate-700" />
                    <p className="text-sm">Tidak ada pengguna ditemukan</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
