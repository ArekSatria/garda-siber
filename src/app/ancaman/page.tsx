"use client";

import Sidebar from "@/components/Sidebar";
import {
  ShieldAlert,
  Mail,
  Lock,
  Globe,
  EyeOff,
  Server,
  Smartphone,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function ThreatListPage() {
  const allThreats = [
    {
      id: "phishing",
      title: "Phishing",
      desc: "Penipuan untuk mencuri data sensitif melalui pesan palsu.",
      level: "High",
      color: "danger",
      icon: Mail,
      image: "/images/email.jpg",
    },
    {
      id: "ransomware",
      title: "Ransomware",
      desc: "Malware yang menyandera data komputer untuk tebusan.",
      level: "Critical",
      color: "danger",
      icon: Lock,
      image: "/images/ransomware.jpg",
    },
    {
      id: "social-engineering",
      title: "Social Engineering",
      desc: "Manipulasi psikologis untuk mencuri informasi rahasia.",
      level: "Medium",
      color: "warning",
      icon: Globe,
      image: "/images/social.png",
    },
    {
      id: "spyware",
      title: "Spyware",
      desc: "Aplikasi pengintai rahasia yang mencuri aktivitas pribadi.",
      level: "Medium",
      color: "warning",
      icon: EyeOff,
      image: "/images/spyware.jpg",
    },
    {
      id: "sql-injection",
      title: "SQL Injection",
      desc: "Serangan teknis untuk memanipulasi database aplikasi.",
      level: "High",
      color: "danger",
      icon: Server,
      image: "/images/database.jpg",
    },
    {
      id: "mobile-malware",
      title: "Mobile Malware",
      desc: "Virus yang dirancang khusus menyerang smartphone.",
      level: "Low",
      color: "success",
      icon: Smartphone,
      image:
        "/images/hp.jpg",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 ml-64 p-10">
        <header className="mb-12">
          <div className="flex items-center gap-3 text-primary font-bold mb-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <ShieldAlert size={24} />
            </div>
            <span className="tracking-widest uppercase text-xs">
              Security Database v1.3
            </span>
          </div>
          <br />
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">
            Katalog Ancaman
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {allThreats.map((threat) => (
            <Link
              href={`/ancaman/${threat.id}`}
              key={threat.id}
              className="group"
            >
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img
                    src={threat.image}
                    alt={threat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider ${
                        threat.color === "danger"
                          ? "bg-red-500"
                          : threat.color === "warning"
                            ? "bg-orange-500"
                            : "bg-green-500"
                      }`}
                    >
                      {threat.level} Severity
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 rounded-lg ${
                        threat.color === "danger"
                          ? "bg-red-50 text-red-600"
                          : threat.color === "warning"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-green-50 text-green-600"
                      }`}
                    >
                      <threat.icon size={20} />
                    </div>
                    <h3 className="font-extrabold text-xl text-slate-800">
                      {threat.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-sm mb-8 flex-1">
                    {threat.desc}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Detail Analisis
                    </span>
                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
