// ============================================================
// src/constants/threats.ts
// Style untuk threat level — sebelumnya diduplikasi di HomeClient
// dan ancaman/page.tsx.
// ============================================================

import type { ThreatLevel, ThreatColor } from "@/types";

interface ThreatLevelStyle {
  label: string;
  badgeClass: string;
  iconBg: string;
}

export const THREAT_LEVEL_STYLES: Record<ThreatLevel, ThreatLevelStyle> = {
  Critical: {
    label: "Kritis",
    badgeClass: "text-red-700 bg-red-50 ring-1 ring-red-200",
    iconBg: "bg-red-50 text-red-600",
  },
  High: {
    label: "Tinggi",
    badgeClass: "text-red-600 bg-red-50 ring-1 ring-red-100",
    iconBg: "bg-orange-50 text-orange-600",
  },
  Medium: {
    label: "Sedang",
    badgeClass: "text-orange-600 bg-orange-50 ring-1 ring-orange-100",
    iconBg: "bg-blue-50 text-blue-600",
  },
  Low: {
    label: "Rendah",
    badgeClass: "text-green-700 bg-green-50 ring-1 ring-green-100",
    iconBg: "bg-green-50 text-green-600",
  },
};

interface ThreatColorStyle {
  cardBg: string;
  badgeClass: string;
}

export const THREAT_COLOR_STYLES: Record<ThreatColor, ThreatColorStyle> = {
  danger: {
    cardBg: "bg-red-50",
    badgeClass: "bg-red-500 text-white",
  },
  warning: {
    cardBg: "bg-orange-50",
    badgeClass: "bg-orange-500 text-white",
  },
  success: {
    cardBg: "bg-green-50",
    badgeClass: "bg-green-500 text-white",
  },
};

export function getThreatLevelStyle(level: ThreatLevel): ThreatLevelStyle {
  return THREAT_LEVEL_STYLES[level] ?? THREAT_LEVEL_STYLES["Medium"];
}

export function getThreatColorStyle(color: ThreatColor): ThreatColorStyle {
  return THREAT_COLOR_STYLES[color] ?? THREAT_COLOR_STYLES["warning"];
}
