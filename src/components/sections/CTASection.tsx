"use client";

import { motion } from "motion/react";
import { useState, useSyncExternalStore } from "react";
import { Dog, PawPrint } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

import { fadeInUp, bounceIn, staggerContainer } from "@/lib/animations";

function Particle({ delay }: { delay: number }) {
  const [style] = useState(() => ({
    left: `${Math.random() * 100}%`,
    animDuration: 3 + Math.random() * 4,
    size: 4 + Math.random() * 8,
    xDrift: (Math.random() - 0.5) * 100,
    hue: 30 + Math.random() * 30,
    lightness: 70 + Math.random() * 20,
  }));

  return (
    <motion.div
      className="absolute bottom-0 rounded-full pointer-events-none"
      style={{
        left: style.left,
        width: style.size,
        height: style.size,
        background: `hsl(${style.hue}, 100%, ${style.lightness}%)`,
      }}
      animate={{
        y: [0, -window.innerHeight * 0.8],
        x: [0, style.xDrift],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.5],
      }}
      transition={{
        duration: style.animDuration,
        repeat: Infinity,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
}

const emptySubscribe = () => () => { };

function Particles() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <Particle key={i} delay={i * 0.4} />
      ))}
    </div>
  );
}

export default function CTASection() {
  return (
    <AnimatedSection id="cta" bgColor="#FFB347">
      <Particles />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 text-center space-y-8"
      >
        <motion.div
          variants={bounceIn}
          className="text-6xl md:text-8xl"
        >
          <motion.span
            className="inline-block"
            animate={{
              rotate: [0, -10, 10, -5, 5, 0],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          >
            <Dog className="w-16 h-16 md:w-20 md:h-20 text-amber-800" />
          </motion.span>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-bold text-white leading-tight whitespace-nowrap"
        >
          지금 바로{" "}
          <motion.span
            className="text-amber-900 inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            moong
          </motion.span>
          과 함께하세요
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-white/90 text-base md:text-lg max-w-md mx-auto"
        >
          뭉뭉이의 모든 순간을 기록하고,
          <br />
          가족과 함께 관리하세요.
        </motion.p>

        <motion.div variants={bounceIn}>
          <motion.a
            href="https://moongmoong.site"
            className="relative inline-flex items-center gap-3 bg-white text-amber-600 font-bold rounded-full px-10 py-4 text-lg shadow-xl overflow-hidden group"
            whileHover={{ scale: 1.07, y: -3 }}
            whileTap={{ scale: 0.96 }}
            animate={{
              boxShadow: [
                "0 10px 25px rgba(0,0,0,0.1)",
                "0 20px 40px rgba(0,0,0,0.15)",
                "0 10px 25px rgba(0,0,0,0.1)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Shimmer overlay */}
            <motion.div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-100/60 to-transparent skew-x-12"
              animate={{ translateX: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
            />
            <span className="relative z-10">시작하기</span>
            <motion.span
              className="relative z-10 text-xl"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <PawPrint className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </motion.div>

        <motion.div variants={fadeInUp} className="pt-4">
          <motion.p
            className="text-white/60 text-sm"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            무료로 시작 · 가족과 함께 · 뭉뭉이를 위해
          </motion.p>
        </motion.div>
      </motion.div>

    </AnimatedSection>
  );
}
