"use client";

import { motion } from "motion/react";

interface FloatingEmojiProps {
  emoji: string;
  className?: string;
  delay?: number;
  duration?: number;
  size?: string;
}

export default function FloatingEmoji({
  emoji,
  className = "",
  delay = 0,
  duration = 3,
  size = "text-2xl",
}: FloatingEmojiProps) {
  return (
    <motion.span
      className={`absolute pointer-events-none select-none ${size} ${className}`}
      animate={{
        y: [-10, 10, -10],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {emoji}
    </motion.span>
  );
}
