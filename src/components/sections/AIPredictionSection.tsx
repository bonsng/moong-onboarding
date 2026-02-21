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
  slideUp,
} from "@/lib/animations";

const features = [
  { label: "연간 질병 위험도", desc: "발병 확률 그래프", icon: "📊" },
  { label: "AI 의료비 예측", desc: "20살까지 예상 비용", icon: "🤖" },
  { label: "4,000건 데이터", desc: "서울시 동물병원 실제 진료", icon: "🏥" },
];

export default function AIPredictionSection() {
  return (
    <AnimatedSection id="ai-prediction" bgColor="#F0F7FF">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16"
      >
        <motion.div variants={fadeInRight} className="flex-1 space-y-6">
          <SectionHeading
            emoji="🤖"
            title="뭉뭉이를 위한 미래 병원비, AI로 먼저 만나보세요!"
            description={[
              "예측하고 대비하는 반려견 의료비 솔루션",
              "서울특별시 동물병원 4,000건 실제 진료 데이터를 학습한 AI가 노견의 질병 발병 확률과 예상 의료비를 똑똑하게 예측해드립니다.",
            ]}
          />

          <motion.div variants={fadeInUp} className="space-y-3 pt-2">
            {features.map((item, i) => (
              <motion.div
                key={item.label}
                variants={slideUp}
                custom={i}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-3.5 shadow-sm border border-blue-50 cursor-default"
              >
                <motion.div
                  className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-lg shrink-0"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <motion.div
                  className="ml-auto w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.2, type: "spring", stiffness: 300 }}
                >
                  <span className="text-blue-400 text-xs">✓</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInLeft} className="flex-1 relative">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ScreenshotFrame
              src={SCREENSHOTS.medicalAI}
              alt="AI 의료비 예측 대시보드"
              label="AI 예측 대시보드"
              themeColor="#5B9FE3"
            />
          </motion.div>

          <motion.svg
            className="absolute -bottom-4 -left-4 w-32 h-16 opacity-20"
            viewBox="0 0 128 64"
            fill="none"
          >
            <motion.path
              d="M0 48 C32 48, 32 16, 64 16 C96 16, 96 32, 128 8"
              stroke="#5B9FE3"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
          </motion.svg>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute -left-40 -top-40 w-80 h-80 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #5B9FE3, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingEmoji emoji="🏥" className="top-[12%] left-[8%]" delay={0.2} />
      <FloatingEmoji emoji="📈" className="bottom-[18%] right-[6%]" delay={0.7} />
      <FloatingEmoji emoji="🧬" className="bottom-[30%] left-[3%]" delay={1.3} size="text-lg" />
    </AnimatedSection>
  );
}
