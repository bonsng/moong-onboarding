"use client";

import { motion } from "motion/react";
import { SECTIONS } from "@/lib/constants";

interface DotNavigationProps {
  activeIndex: number;
}

export default function DotNavigation({ activeIndex }: DotNavigationProps) {
  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
      {SECTIONS.map((section, i) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className="group relative flex items-center justify-end gap-2"
          aria-label={section.label}
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-gray-600 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
            {section.label}
          </span>
          <motion.div
            className="rounded-full transition-colors"
            animate={{
              width: activeIndex === i ? 12 : 8,
              height: activeIndex === i ? 12 : 8,
              backgroundColor:
                activeIndex === i ? "#FFB347" : "rgba(0,0,0,0.2)",
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      ))}
    </nav>
  );
}
