import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";
import { getAllThreats } from "@/data/threats";
import { getThreatColorStyle } from "@/constants/threats";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Katalog Ancaman",
  description:
    "Pelajari 6 jenis ancaman siber utama: Phishing, Ransomware, Social Engineering, Spyware, SQL Injection, dan Mobile Malware.",
};

const ICON_MAP: Record<string, React.ElementType> = {
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
    <PageLayout>
      <div className="p-6 md:p-10 flex-1">
        <header className="mb-10">
          <div className="flex items-center gap-3 text-[#0F52BA] font-bold mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ShieldAlert size={24} aria-hidden="true" />
            </div>
            <span className="tracking-widest uppercase text-xs">
              Security Database v1.3
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase mt-2">
            Katalog Ancaman
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            {allThreats.length} jenis ancaman siber teridentifikasi
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {allThreats.map((threat) => {
            const Icon = ICON_MAP[threat.iconName] ?? ShieldAlert;
         
            const colorStyle = getThreatColorStyle(threat.color);

            return (
              <Link
                href={`/ancaman/${threat.id}`}
                key={threat.id}
                className="group"
              >
                <article className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <Image
                      src={threat.image}
                      alt={`Ilustrasi ancaman: ${threat.title}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <span
                        className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${colorStyle.badgeClass}`}
                      >
                        {threat.level} Severity
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${colorStyle.cardBg}`}>
                        <Icon size={20} aria-hidden="true" />
                      </div>
                      <h2 className="font-extrabold text-xl text-slate-800">
                        {threat.title}
                      </h2>
                    </div>
                    <p className="text-slate-500 text-sm mb-8 flex-1">
                      {threat.shortDesc}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Detail Analisis
                      </span>
                      <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-[#0F52BA] group-hover:text-white transition-all duration-300">
                        <ChevronRight size={18} aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </PageLayout>
  );
}
