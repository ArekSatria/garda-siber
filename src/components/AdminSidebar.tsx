"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Users,
  FileText,
  Brain,
  Shield,
  LogOut,
  ChevronRight,
  BarChart3,
  Globe,
} from "lucide-react";

interface Props {
  adminName: string;
}

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard", exact: true },
  { label: "Manajemen User", icon: Users, href: "/dashboard/users" },
  { label: "Artikel & Konten", icon: FileText, href: "/dashboard/artikel" },
  { label: "Hasil Quiz", icon: Brain, href: "/dashboard/quiz" },
  { label: "Statistik", icon: BarChart3, href: "/dashboard/statistik" },
];

export default function AdminSidebar({ adminName }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className="w-[280px] h-screen bg-white border-r border-slate-200 flex flex-col shrink-0 relative z-20">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#f4af1b] to-[#ffd55a] rounded-xl flex items-center justify-center shadow-sm">
            <Shield size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-slate-900 font-black text-base tracking-tight leading-none">
              Garda Siber
            </p>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
              Command Center
            </p>
          </div>
        </Link>
      </div>

      {/* Admin Profile Box */}
      <div className="px-5 pt-6 pb-2">
        <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-2xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-[#66d47e] font-black text-sm">
              {adminName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
              Administrator
            </p>
            <p className="text-sm font-bold text-slate-800 truncate leading-none">
              {adminName}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pb-2 pt-2">
          Sistem Navigasi
        </p>

        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold transition-all duration-200 relative group ${
                active
                  ? "text-[#f4af1b] bg-orange-50/50"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#f4af1b] rounded-r-full" />
              )}
              <item.icon
                size={18}
                className={
                  active
                    ? "text-[#f4af1b]"
                    : "text-slate-400 group-hover:text-slate-600"
                }
              />
              <span className="text-[13px]">{item.label}</span>
              {active && (
                <ChevronRight size={14} className="ml-auto text-orange-300" />
              )}
            </Link>
          );
        })}

        <div className="border-t border-slate-100 my-4 mx-3" />

        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[13px] font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
        >
          <Globe size={18} className="text-slate-400" />
          <span>Lihat Web Publik</span>
        </Link>
      </nav>

      {/* Session Termination */}
      <div className="p-5 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs font-bold text-red-600 bg-white border border-red-100 hover:bg-red-50 transition-all shadow-sm"
        >
          <LogOut size={16} />
          <span>Keluar Sesi Admin</span>
        </button>
      </div>
    </aside>
  );
}
