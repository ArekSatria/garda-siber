"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShieldCheck, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Ancaman", href: "/ancaman" },
  { label: "Artikel", href: "/artikel" },
  { label: "Tips", href: "/tips" },
  { label: "Quiz", href: "/quiz" },
  { label: "Tentang", href: "/tentang" },
];

export default function PublicHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-200 ${
          scrolled
            ? "border-b border-slate-200 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            : "bg-white/88 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0F52BA] text-white shadow-sm transition group-hover:scale-[1.02]">
              <ShieldCheck size={22} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-base font-black tracking-tight text-slate-900 sm:text-lg">
                  Garda Siber
                </span>
                <span className="hidden rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F52BA] sm:inline-flex">
                  Edukasi
                </span>
              </div>
              <p className="hidden text-xs text-slate-500 sm:block">
                Media edukasi keamanan digital
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-blue-50 text-[#0F52BA]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex">
            <div className="grid grid-cols-2 items-center gap-2 rounded-[22px] border border-slate-200/80 bg-white/90 p-2 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-md">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#0F52BA]"
              >
                Cek Pengetahuan
              </Link>

              <Link
                href="/artikel"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F52BA] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
              >
                Jelajahi Materi
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <div className="grid gap-2">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        active
                          ? "bg-blue-50 text-[#0F52BA]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 grid gap-3">
                <Link
                  href="/artikel"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-[#0F52BA] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0B3F8C]"
                >
                  Jelajahi Materi
                </Link>

                <Link
                  href="/quiz"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cek Pengetahuan
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
