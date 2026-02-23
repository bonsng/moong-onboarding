"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";

interface SectionHeadingProps {
  emoji?: string;
  title: string | string[];
  description: string | string[];
  variants?: Variants;
  light?: boolean;
}

export default function SectionHeading({
  emoji,
  title,
  description,
  variants,
  light = false,
}: SectionHeadingProps) {
  const descriptions = Array.isArray(description) ? description : [description];

  return (
    <motion.div variants={variants} className="space-y-4">
      {emoji && <span className="text-4xl md:text-5xl block">{emoji}</span>}
      <h2
        className={`text-2xl md:text-4xl font-bold leading-tight tracking-tight whitespace-nowrap ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {Array.isArray(title)
          ? title.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))
          : title}
      </h2>
      <div className="space-y-2">
        {descriptions.map((desc, i) => (
          <p
            key={i}
            className={`text-base md:text-lg leading-relaxed ${
              light ? "text-white/80" : "text-gray-600"
            }`}
          >
            {desc}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
