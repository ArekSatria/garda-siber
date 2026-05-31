"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  ShieldAlert,
  FileText,
  Lightbulb,
  Brain,
  Info,
  LogIn,
  LogOut,
  User,
  LayoutGrid,
  Crown,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  }

  useEffect(() => {
    const supabase = createClient();

    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      if (user) await fetchProfile(user.id);
      setLoading(false);
    }

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const menuItems = [
    { name: "Beranda", icon: LayoutDashboard, path: "/" },
    { name: "Jenis Ancaman", icon: ShieldAlert, path: "/ancaman" },
    { name: "Artikel", icon: FileText, path: "/artikel" },
    { name: "Tips Aman", icon: Lightbulb, path: "/tips" },
    { name: "Quiz Siber", icon: Brain, path: "/quiz" },
    { name: "Tentang Kami", icon: Info, path: "/tentang" },
  ];

  const isAdmin = profile?.role === "admin";

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 p-6 z-50 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0F52BA] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldAlert className="text-white" size={22} />
          </div>
          <div>
            <h1 className="font-black text-slate-900 text-lg leading-none">
              GARDA
            </h1>
            <p className="text-[#0F52BA] font-black tracking-widest uppercase text-xs">
              SIBER
            </p>
          </div>
        </Link>
      </div>

      {/* Menu utama */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== "/" && pathname.startsWith(item.path));
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${
                isActive
                  ? "bg-[#0F52BA] text-white shadow-lg shadow-blue-500/20 scale-[1.02]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-[#0F52BA]"
              }`}
            >
              <item.icon size={19} />
              <span>{item.name}</span>
              {item.name === "Quiz Siber" && !isActive && (
                <span className="ml-auto bg-[#0F52BA] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Baru
                </span>
              )}
            </Link>
          );
        })}

        {/* Menu Admin — hanya muncul jika role = admin */}
        {!loading && isAdmin && (
          <>
            <div className="pt-2 pb-1 px-4">
              <div className="border-t border-slate-100" />
            </div>
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${
                pathname.startsWith("/dashboard")
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20 scale-[1.02]"
                  : "text-violet-600 hover:bg-violet-50 border border-violet-200"
              }`}
            >
              <LayoutGrid size={19} />
              <span>Dashboard Admin</span>
              <Crown size={13} className="ml-auto opacity-70" />
            </Link>
          </>
        )}
      </nav>

      {/* User section */}
      <div className="border-t border-slate-100 pt-4 mt-4">
        {loading ? (
          <div className="space-y-2">
            <div className="h-12 bg-slate-50 rounded-2xl animate-pulse" />
            <div className="h-10 bg-slate-50 rounded-2xl animate-pulse" />
          </div>
        ) : user ? (
          <div className="space-y-2">
            {/* Info user */}
            <Link
              href="/profil"
              className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-slate-50 transition-all group"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isAdmin ? "bg-violet-600" : "bg-[#0F52BA]"
                }`}
              >
                {isAdmin ? (
                  <Crown size={15} className="text-white" />
                ) : (
                  <User size={16} className="text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-xs truncate">
                  {profile?.full_name || "Pengguna"}
                </p>
                <p
                  className={`text-[10px] font-bold truncate ${
                    isAdmin ? "text-violet-500" : "text-slate-400"
                  }`}
                >
                  {isAdmin ? "⚡ Administrator" : "Member"}
                </p>
              </div>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
            >
              <LogOut size={16} />
              <span>Keluar</span>
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0F52BA] text-white font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <LogIn size={18} />
            <span>Masuk / Daftar</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
