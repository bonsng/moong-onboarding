"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ScrollIndicator from "@/components/ui/ScrollIndicator";


const ShibaModel = dynamic(() => import("@/components/ui/ShibaModel"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export default function LandingHeroSection() {
  return (
    <AnimatedSection id="landing" bgColor="#FFFDF7">
      <div className="flex flex-col md:flex-row items-center min-h-[60vh] gap-8 md:gap-0">
        {/* Left - Text & CTA */}
        <motion.div
          className="flex-1 text-center md:text-left space-y-6 z-10"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="inline-block text-sm font-semibold tracking-wider text-amber-600 bg-amber-50 rounded-full px-4 py-1.5 mb-2 border border-amber-100">
              반려견 지출 관리 가족 앱
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Moong
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            우리 집 막내의 모든 순간을
            <br />
            함께 기억하고 관리해요
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.button
              onClick={() =>
                document
                  .getElementById("hero")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded-full px-10 py-4 text-lg transition-colors shadow-lg shadow-amber-200/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              시작하기
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right - 3D Shiba Inu */}
        <motion.div
          className="flex-1 h-[450px] md:h-[600px] w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <ShibaModel />
        </motion.div>
      </div>

      <ScrollIndicator />
    </AnimatedSection>
  );
}
