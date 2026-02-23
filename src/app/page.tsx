"use client";

import LandingHeroSection from "@/components/sections/LandingHeroSection";
import HeroSection from "@/components/sections/HeroSection";
import FamilyExpenseSection from "@/components/sections/FamilyExpenseSection";
import AIPredictionSection from "@/components/sections/AIPredictionSection";
import MedicalPriceSection from "@/components/sections/MedicalPriceSection";
import PiggyBankSection from "@/components/sections/PiggyBankSection";
import MonthlyReportSection from "@/components/sections/MonthlyReportSection";
import CTASection from "@/components/sections/CTASection";
import DotNavigation from "@/components/ui/DotNavigation";
import PawTrail from "@/components/ui/PawTrail";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Home() {
  const activeIndex = useActiveSection();

  return (
    <>
      <DotNavigation activeIndex={activeIndex} />
      <PawTrail />
      <main>
        <LandingHeroSection />
        <HeroSection />
        <FamilyExpenseSection />
        <AIPredictionSection />
        <MedicalPriceSection />
        <PiggyBankSection />
        <MonthlyReportSection />
        <CTASection />
      </main>
    </>
  );
}
