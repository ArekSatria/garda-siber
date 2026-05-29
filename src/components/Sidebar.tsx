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
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", session.user.id)
          .single();
        setProfile(data);
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

        {/* Menu admin */}
        {profile?.role === "admin" && (
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${
              pathname.startsWith("/dashboard")
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                : "text-purple-600 hover:bg-purple-50"
            }`}
          >
            <LayoutGrid size={19} />
            <span>Dashboard Admin</span>
          </Link>
        )}
      </nav>

      {/* User section */}
      <div className="border-t border-slate-100 pt-4 mt-4">
        {loading ? (
          <div className="h-12 bg-slate-50 rounded-2xl animate-pulse" />
        ) : user ? (
          <div className="space-y-2">
            {/* Info user */}
            <Link
              href="/profil"
              className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-slate-50 transition-all group"
            >
              <div className="w-9 h-9 bg-[#0F52BA] rounded-xl flex items-center justify-center shrink-0">
                <User size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-xs truncate">
                  {profile?.full_name || "Pengguna"}
                </p>
                <p className="text-[10px] text-slate-400 font-medium truncate">
                  {profile?.role === "admin" ? "Administrator" : "Member"}
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
