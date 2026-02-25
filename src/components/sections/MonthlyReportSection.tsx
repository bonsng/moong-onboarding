"use client";

import { motion } from "motion/react";
import { type LucideIcon, Mail, BarChart3, User, UserRound, UserRoundCheck } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";
import {
  fadeInUp,
  fadeInRight,
  scaleIn,
  staggerContainer,
  popIn,
} from "@/lib/animations";

const members = [
  { name: "아빠", pct: 93.7, color: "#8B6914", icon: User },
  { name: "엄마", pct: 5.3, color: "#FFB347", icon: UserRound },
  { name: "나", pct: 0.5, color: "#FF6B81", icon: UserRoundCheck },
] satisfies { name: string; pct: number; color: string; icon: LucideIcon }[];

export default function MonthlyReportSection() {
  return (
    <AnimatedSection id="monthly-report" bgColor="#F5FFF0">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16"
      >
        <motion.div variants={fadeInRight} className="flex-1 space-y-6">
          <SectionHeading
            emoji={<Mail className="w-10 h-10 text-green-500" />}
            title={["띠링! 뭉뭉이의", "월간 소비 레포트가 도착했습니다"]}
            description={[
              '"이번 달 뭉뭉이에게 누가 가장 많이 썼을까?"',
              '"다음달에 얼마나 쓸까?"',
              "시계열 회귀분석을 포함한 월간 분석 소비레포트를 매월 1일 발송해드려요.",
            ]}
          />

          <motion.div variants={fadeInUp} className="pt-2">
            {/* Notification card */}
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-green-100 space-y-5"
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 150, damping: 20 }}
            >
              {/* Header with notification animation */}
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center relative"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full flex items-center justify-center"
                    variants={popIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 }}
                  >
                    <span className="text-[8px] text-white font-bold">1</span>
                  </motion.div>
                </motion.div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    그룹원별 소비 비율
                  </p>
                  <p className="text-xs text-gray-500">
                    누가 얼마나 썼는지 한눈에
                  </p>
                </div>
              </div>

              {/* Member bars */}
              <div className="space-y-3">
                {members.map((member, i) => (
                  <motion.div
                    key={member.name}
                    className="space-y-1.5"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.2 }}
                  >
                    <div className="flex justify-between text-xs items-center">
                      <span className="text-gray-600 font-medium flex items-center gap-1.5">
                        <member.icon className="w-3.5 h-3.5" />
                        {member.name}
                      </span>
                      <motion.span
                        className="text-gray-400 font-mono"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + i * 0.2 }}
                      >
                        {member.pct}%
                      </motion.span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: member.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.max(member.pct, 2)}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.2,
                          delay: 0.8 + i * 0.15,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Total */}
              <motion.div
                className="pt-2 border-t border-green-50 flex justify-between items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
              >
                <span className="text-xs text-gray-400">그룹 총 지출액</span>
                <span className="text-sm font-bold text-gray-700">
                  23,054,943원
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div variants={scaleIn} className="flex-1 relative">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ScreenshotFrame
              src="/images/screenshots/monthly-report.png"
              alt="월간 소비 레포트"
              label="월간 레포트 미리보기"
              themeColor="#4CAF50"
            />
          </motion.div>

          <div className="absolute -inset-8 -z-10 bg-gradient-to-br from-green-200/20 via-transparent to-emerald-200/10 rounded-3xl blur-2xl" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute -right-32 -top-32 w-72 h-72 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #4CAF50, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

    </AnimatedSection>
  );
}
