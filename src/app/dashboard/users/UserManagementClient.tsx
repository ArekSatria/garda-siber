"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Search,
  Crown,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Mail,
  Users,
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
        `Otoritas akun diubah menjadi ${newRole.toUpperCase()}`,
      );
    } catch {
      showToast("error", "Gagal memperbarui otoritas.");
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

  return (
    <div className="p-6 lg:p-10 space-y-6 min-h-screen bg-[#F8FAFC]">
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-sm shadow-xl bg-white border ${
            toast.type === "success"
              ? "border-[#66d47e] text-[#66d47e]"
              : "border-rose-500 text-rose-500"
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

      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Manajemen Pengguna
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Kelola hak akses dan peran sistem akun Garda Siber.
        </p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#f4af1b] focus:ring-1 focus:ring-[#f4af1b]"
          />
        </div>
        <div className="flex bg-slate-100 border border-slate-200 rounded-xl p-1 shrink-0">
          {(["all", "admin", "user"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setFilterRole(r)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                filterRole === r
                  ? "bg-white text-[#f4af1b] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Identitas Pengguna</th>
                <th className="px-6 py-4">Kontak</th>
                <th className="px-6 py-4">Peran Sistem</th>
                <th className="px-6 py-4">Bergabung</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {user.full_name || "—"}
                  </td>
                  <td className="px-6 py-4 text-slate-500 flex items-center gap-2">
                    <Mail size={14} className="text-slate-400" /> {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 border text-[10px] font-black uppercase rounded-lg ${
                        user.role === "admin"
                          ? "bg-orange-50 border-orange-200 text-[#f4af1b]"
                          : "bg-slate-100 border-slate-200 text-slate-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs font-semibold">
                    {new Date(user.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    {loadingId === user.id ? (
                      <Loader2
                        size={16}
                        className="animate-spin text-[#f4af1b]"
                      />
                    ) : (
                      <button
                        onClick={() =>
                          changeRole(
                            user.id,
                            user.role === "admin" ? "user" : "admin",
                          )
                        }
                        className={`px-4 py-2 rounded-lg font-bold text-xs transition-all border ${
                          user.role === "admin"
                            ? "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                            : "bg-white border-[#f4af1b]/30 text-[#f4af1b] hover:bg-orange-50"
                        }`}
                      >
                        {user.role === "admin"
                          ? "Jadikan Member"
                          : "Jadikan Admin"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
