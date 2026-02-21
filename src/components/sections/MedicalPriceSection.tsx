"use client";

import { motion } from "motion/react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";
import FloatingEmoji from "@/components/ui/FloatingEmoji";
import { SCREENSHOTS } from "@/lib/constants";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  bounceIn,
} from "@/lib/animations";

const categories = [
  { name: "심장", avg: "41,000원", color: "#EF4444" },
  { name: "피부", avg: "70,000원", color: "#F59E0B" },
  { name: "소화기", avg: "95,000원", color: "#10B981" },
];

export default function MedicalPriceSection() {
  return (
    <AnimatedSection id="medical-price" bgColor="#EEF2FF">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
      >
        <motion.div variants={fadeInLeft} className="flex-1 space-y-6">
          <SectionHeading
            emoji="💊"
            title="우리 동네 동물병원의 진료비는 얼마일까?"
            description={[
              "약 1,000건의 실제 진료비 크롤링 데이터를 분석해,",
              "우리 동네 진료 비용을 12가지 질병 카테고리별로 한눈에 제공합니다.",
            ]}
          />

          <motion.div variants={fadeInUp} className="space-y-3 pt-2">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                variants={bounceIn}
                custom={i}
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center gap-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-indigo-50 cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.name}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{cat.name} 질환</p>
                  <div className="h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${(parseInt(cat.avg.replace(/[^0-9]/g, "")) / 95000) * 100}%`,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <motion.span
                  className="text-sm font-semibold text-gray-700 shrink-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + i * 0.2 }}
                >
                  평균 {cat.avg}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInRight} className="flex-1 relative">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ScreenshotFrame
              src={SCREENSHOTS.medicalPrice}
              alt="올해 주의 질병과 평균 의료비"
              label="질병별 평균 의료비"
              themeColor="#6366F1"
            />
          </motion.div>

          <div className="absolute -inset-8 -z-10 bg-gradient-to-br from-indigo-200/20 via-transparent to-violet-200/10 rounded-3xl blur-2xl" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute -right-32 -top-32 w-72 h-72 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #6366F1, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingEmoji emoji="💉" className="top-[12%] right-[8%]" delay={0.3} />
      <FloatingEmoji emoji="📋" className="bottom-[15%] left-[6%]" delay={0.8} />
      <FloatingEmoji emoji="🩺" className="top-[40%] left-[4%]" delay={1.2} size="text-lg" />
    </AnimatedSection>
  );
}
