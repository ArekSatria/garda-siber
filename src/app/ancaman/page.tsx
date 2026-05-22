import Sidebar from "@/components/Sidebar";
import { getAllThreats } from "@/data/threats";
import Image from "next/image";
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

const iconMap: Record<string, React.ElementType> = {
  Mail,
  Lock,
  Globe,
  EyeOff,
  Server,
  Smartphone,
};

export default function ThreatListPage() {
  const allThreats = getAllThreats();

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
          <p className="text-slate-500 mt-2 font-medium">
            {allThreats.length} jenis ancaman siber teridentifikasi
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {allThreats.map((threat) => {
            const Icon = iconMap[threat.iconName] ?? ShieldAlert;
            return (
              <Link
                href={`/ancaman/${threat.id}`}
                key={threat.id}
                className="group"
              >
                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <Image
                      src={threat.image}
                      alt={threat.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
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
                        <Icon size={20} />
                      </div>
                      <h3 className="font-extrabold text-xl text-slate-800">
                        {threat.title}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-sm mb-8 flex-1">
                      {threat.shortDesc}
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
