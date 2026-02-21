export const SECTIONS = [
  { id: "landing", label: "Moong", bg: "#FFFDF7" },
  { id: "hero", label: "홈", bg: "#FFFDF7" },
  { id: "family-expense", label: "가계부", bg: "#FFF8F0" },
  { id: "ai-prediction", label: "AI 예측", bg: "#F0F7FF" },
  { id: "medical-price", label: "의료비", bg: "#EEF2FF" },
  { id: "piggy-bank", label: "저금통", bg: "#FFF5F5" },
  { id: "monthly-report", label: "월간 레포트", bg: "#F5FFF0" },
  { id: "cta", label: "시작하기", bg: "#FFB347" },
] as const;

export const SCREENSHOTS = {
  dashboard: "/images/screenshots/dashboard.png",
  calendar: "/images/screenshots/calendar.png",
  analysis: "/images/screenshots/analysis.png",
  medicalAI: "/images/screenshots/medicalAI.png",
  medicalPrice: "/images/screenshots/medicalPrice.png",
  piggyBank: "/images/screenshots/piggyBank.png",
} as const;

export const COLORS = {
  primary: "#FFB347",
  accent: "#FF6B81",
  brown: "#8B6914",
  darkBrown: "#5C4A1E",
  cream: "#FFFDF7",
  text: "#2D2D2D",
  textLight: "#6B7280",
} as const;
