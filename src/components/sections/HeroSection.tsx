"use client";

import { motion } from "motion/react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";

import { SCREENSHOTS } from "@/lib/constants";
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  popIn,
} from "@/lib/animations";

export default function HeroSection() {
  const titleChars = "뭉뭉이와 함께한 모든 순간,";
  const subtitleChars = "뭉이 대신 기억해드려요";

  return (
    <AnimatedSection id="hero" bgColor="#FFFDF7">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
      >
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.div variants={popIn}>
            <span className="inline-block text-sm font-semibold tracking-wider text-amber-600 bg-amber-50 rounded-full px-4 py-1.5 mb-4 border border-amber-100">
              반려견 지출 관리 가족 앱
            </span>
          </motion.div>

          <motion.h1
            className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight whitespace-nowrap"
          >
            <motion.span className="inline-block">
              {titleChars.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 1 + i * 0.03,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
            <br />
            <motion.span className="inline-block">
              {subtitleChars.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 1.5 + i * 0.03,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className={`inline-block ${i === 0 ? "text-amber-500" : ""
                    }`}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-gray-500 text-base md:text-lg leading-relaxed"
          >
            &quot;이번 달 뭉뭉이한테 얼마 썼지?&quot;
            <br />
            우리 집 막내의 지출을 챙기는 가장 똑똑한 방법, moong
          </motion.p>
        </div>

        <motion.div
          variants={scaleIn}
          className="flex-[1.6] relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ScreenshotFrame
              src={SCREENSHOTS.dashboard}
              alt="Moong 대시보드"
              label="대시보드 미리보기"
              themeColor="#FFB347"
              priority
            />
          </motion.div>

          <div className="absolute -inset-8 -z-10 bg-gradient-to-br from-amber-200/30 via-transparent to-orange-200/20 rounded-3xl blur-2xl" />
        </motion.div>
      </motion.div>

    </AnimatedSection>
  );
}
