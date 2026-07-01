"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  isDark?: boolean;
}

export const Timeline = ({ data, isDark = false }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const updateHeight = () => {
      setHeight(el.getBoundingClientRect().height);
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(el);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Theme tokens
  const dotRingBg = isDark ? "#0a0a0f" : "#ffffff";
  const dotInnerBg = isDark ? "rgba(255,255,255,0.12)" : "#E5E5EA";
  const dotBorder = isDark ? "rgba(255,255,255,0.18)" : "#D1D1D6";
  const yearColor = isDark ? "rgba(245,245,247,0.12)" : "rgba(0,0,0,0.09)";
  const trackBg = isDark ? "rgba(255,255,255,0.08)" : "#E5E5EA";

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-start justify-start gap-6 pt-20 md:gap-40 md:pt-32"
          >
            {/* Left: sticky year rail */}
            <div className="sticky top-28 z-40 self-start w-[110px] shrink-0 md:w-[170px] lg:w-[210px]">
              {/* Dot */}
              <div
                className="absolute left-3 top-1 flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: dotRingBg }}
              >
                <div
                  className="h-4 w-4 rounded-full"
                  style={{
                    background: dotInnerBg,
                    border: `1px solid ${dotBorder}`,
                  }}
                />
              </div>

              {/* Desktop year */}
              <div className="hidden md:block pl-16">
                <h3
                  className="select-none font-bold leading-none"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: yearColor,
                    fontSize: "4rem",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {item.title}
                </h3>
              </div>

              {/* Mobile year */}
              <h3
                className="absolute left-12 top-1 block select-none font-bold leading-none md:hidden"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: yearColor,
                  fontSize: "2rem",
                  letterSpacing: "-0.03em",
                }}
              >
                {item.title}
              </h3>
            </div>

            {/* Right: content */}
            <div className="relative w-full min-w-0 pl-2 pr-2 md:pl-0 md:pr-4">
              {item.content}
            </div>
          </div>
        ))}

        {/* Scroll-animated vertical line */}
        <div
          className="absolute left-8 top-0 w-[2px] overflow-hidden"
          style={{
            height: `${height}px`,
            background: trackBg,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 via-blue-500 to-transparent"
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
          />
        </div>
      </div>
    </div>
  );
};