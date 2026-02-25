"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import type { Variants } from "motion/react";

interface ScreenshotFrameProps {
  src: string;
  alt: string;
  label: string;
  themeColor?: string;
  variants?: Variants;
  priority?: boolean;
  className?: string;
}

export default function ScreenshotFrame({
  src,
  alt,
  label,
  themeColor = "#FFB347",
  variants,
  priority = false,
  className = "",
}: ScreenshotFrameProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className={`relative rounded-2xl bg-white shadow-xl overflow-hidden border border-gray-100 transition-shadow hover:shadow-2xl ${className}`}
    >
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-auto rounded-2xl"
          sizes="(max-width: 768px) 90vw, 800px"
          priority={priority}
          onError={() => setHasError(true)}
        />
      ) : (
        <div
          className="flex flex-col items-center justify-center rounded-2xl gap-3 py-24 px-8"
          style={{ backgroundColor: `${themeColor}15` }}
        >
          <motion.span
            className="text-5xl block"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            📱
          </motion.span>
          <span
            className="text-sm font-medium px-3 text-center"
            style={{ color: themeColor }}
          >
            {label}
          </span>
        </div>
      )}
    </motion.div>
  );
}
