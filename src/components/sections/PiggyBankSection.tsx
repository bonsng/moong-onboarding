"use client";

import { motion } from "motion/react";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

import {
  fadeInLeft,
  bounceIn,
  staggerContainer,
  staggerContainerSlow,
} from "@/lib/animations";

const steps = [
  { step: "1", text: "목표를 세우고", icon: "🎯", color: "bg-pink-100" },
  { step: "2", text: "저금하고", icon: "💰", color: "bg-amber-100" },
  { step: "3", text: "랭킹으로 자극받기", icon: "🏆", color: "bg-yellow-100" },
];

export default function PiggyBankSection() {
  return (
    <AnimatedSection id="piggy-bank" bgColor="#FFF5F5">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
      >
        <motion.div variants={fadeInLeft} className="flex-1 space-y-6">
          <SectionHeading
            emoji="🐽"
            title="함께 채워나가는 뭉뭉이 저금통"
            description={[
              '"누가 뭉뭉이를 가장 사랑할까?"',
              '"이번 달은 내가 조금 더 보탤까?"',
              "작은 저금이 모여 큰 순간에도 흔들리지 않도록",
            ]}
          />

          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 pt-2"
          >
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                variants={bounceIn}
                custom={i}
                whileHover={{ scale: 1.03, x: 6 }}
                className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-pink-50 cursor-default"
              >
                <motion.div
                  className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-xl shrink-0`}
                  whileHover={{
                    rotate: [0, -15, 15, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {item.icon}
                </motion.div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-pink-400 bg-pink-50 rounded-full w-6 h-6 flex items-center justify-center border border-pink-100">
                    {item.step}
                  </span>
                  <span className="font-medium text-gray-700">{item.text}</span>
                </div>
                {i < 2 && (
                  <motion.span
                    className="text-pink-300 ml-auto hidden md:block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  >
                    →
                  </motion.span>
                )}
              </motion.div>
            ))}

            {/* Progress bar */}
            <motion.div className="pt-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>저금 진행률</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                >
                  20% 달성
                </motion.span>
              </div>
              <div className="h-3 bg-pink-100/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-pink-300 to-pink-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: "20%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div variants={bounceIn} className="flex-1 relative">
          <div className="relative w-full aspect-[4/5] max-w-[480px] mx-auto rounded-3xl bg-gradient-to-b from-[#FFE680] to-[#FFD633] overflow-hidden shadow-lg border border-amber-300/50">
            {/* Falling coins */}
            {Array.from({ length: 8 }).map((_, i) => {
              const size = 60 + (i % 3) * 16;
              const leftPct = 10 + (i * 13) % 70;

              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${leftPct}%`,
                    width: size,
                    height: size,
                  }}
                  animate={{
                    y: [-80, 500],
                    opacity: [0, 1, 1, 0],
                    rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
                  }}
                  transition={{
                    duration: 3 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeIn",
                  }}
                >
                  <Image
                    src="/images/screenshots/img_coin_texture.png"
                    alt="coin"
                    width={52}
                    height={52}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              );
            })}
          </div>

          <div className="absolute -inset-8 -z-10 bg-gradient-to-br from-pink-200/20 via-transparent to-rose-200/10 rounded-3xl blur-2xl" />
        </motion.div>
      </motion.div>

    </AnimatedSection>
  );
}
