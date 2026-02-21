"use client";

import { motion } from "motion/react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";
import FloatingEmoji from "@/components/ui/FloatingEmoji";
import { SCREENSHOTS } from "@/lib/constants";
import {
  fadeInLeft,
  fadeInRight,
  popIn,
  staggerContainer,
  staggerContainerSlow,
} from "@/lib/animations";

const tags = ["달력 뷰", "소비 분석", "카테고리 분류", "가족 공유"];

export default function FamilyExpenseSection() {
  return (
    <AnimatedSection id="family-expense" bgColor="#FFF8F0">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
      >
        <motion.div variants={fadeInLeft} className="flex-1 space-y-6">
          <SectionHeading
            emoji="📅"
            title={'한눈에 "뭉"쳐서 보는 반려견 가족 가계부'}
            description={[
              '"우리 뭉뭉이 수술비는 누가 결제했지?"',
              '"우리 뭉뭉이 의료비, 어디에 가장 많이 쓰였을까?"',
              "흩어진 가족들의 소비내역을 모아, 간편하게 관리하세요.",
            ]}
          />

          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 pt-2"
          >
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                variants={popIn}
                custom={i}
                whileHover={{ scale: 1.08, y: -2 }}
                className="text-sm bg-orange-100 text-orange-700 rounded-full px-4 py-1.5 font-medium cursor-default border border-orange-200/50 shadow-sm"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInRight}
          className="flex-1 flex flex-col gap-6 justify-center"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ScreenshotFrame
              src={SCREENSHOTS.calendar}
              alt="달력 뷰"
              label="달력 뷰"
              themeColor="#FF9F43"
            />
          </motion.div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <ScreenshotFrame
              src={SCREENSHOTS.analysis}
              alt="소비 분석"
              label="소비 분석"
              themeColor="#FF9F43"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #FFB347, transparent 70%)" }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingEmoji emoji="📊" className="top-[10%] right-[5%]" delay={0.3} />
      <FloatingEmoji emoji="👨‍👩‍👧" className="bottom-[15%] left-[5%]" delay={0.8} />
      <FloatingEmoji emoji="💳" className="top-[35%] left-[3%]" delay={1.2} size="text-lg" />
    </AnimatedSection>
  );
}
