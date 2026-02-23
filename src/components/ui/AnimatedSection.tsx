"use client";

import { type ReactNode } from "react";

interface AnimatedSectionProps {
  id: string;
  bgColor: string;
  children: ReactNode;
}

export default function AnimatedSection({
  id,
  bgColor,
  children,
}: AnimatedSectionProps) {
  return (
    <section
      id={id}
      className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 md:px-12 md:py-24">
        {children}
      </div>
    </section>
  );
}
