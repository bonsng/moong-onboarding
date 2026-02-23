"use client";

import { motion, useScroll, useTransform } from "motion/react";

const PAW_COUNT = 14;

function PawPrint({ flip }: { flip: boolean }) {
  return (
    <svg
      width="28"
      height="32"
      viewBox="0 0 28 32"
      fill="currentColor"
      className={flip ? "scale-x-[-1]" : ""}
    >
      {/* Main pad */}
      <ellipse cx="14" cy="22" rx="7" ry="8" opacity="0.9" />
      {/* Toe pads */}
      <ellipse cx="7" cy="10" rx="3.5" ry="4.5" opacity="0.85" />
      <ellipse cx="14" cy="7" rx="3.2" ry="4" opacity="0.85" />
      <ellipse cx="21" cy="10" rx="3.5" ry="4.5" opacity="0.85" />
    </svg>
  );
}

export default function PawTrail() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed left-4 md:left-8 top-0 bottom-0 z-40 pointer-events-none">
      <div className="relative h-full w-10">
        {Array.from({ length: PAW_COUNT }).map((_, i) => {
          const start = i / PAW_COUNT;
          const revealEnd = start + 0.02;

          return (
            <PawStep
              key={i}
              index={i}
              scrollYProgress={scrollYProgress}
              start={start}
              revealEnd={revealEnd}
            />
          );
        })}
      </div>
    </div>
  );
}

function PawStep({
  index,
  scrollYProgress,
  start,
  revealEnd,
}: {
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  revealEnd: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.01), revealEnd],
    [0, 0.25]
  );
  const y = useTransform(scrollYProgress, [start, revealEnd], [8, 0]);

  const isFlipped = index % 2 === 1;
  const topPercent = ((index + 0.5) / PAW_COUNT) * 100;

  return (
    <motion.div
      className="absolute text-amber-800"
      style={{
        top: `${topPercent}%`,
        left: isFlipped ? "16px" : "0px",
        opacity,
        y,
        rotate: isFlipped ? 12 : -12,
      }}
    >
      <PawPrint flip={isFlipped} />
    </motion.div>
  );
}
