"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IkigaiDiagramProps {
  isDark: boolean;
}

interface CircleData {
  id: string;
  label: string;
  cx: number;
  cy: number;
  color: string;
  items: string[];
}

// Center at (425, 280), r=150, offset=110
// With offset=110, pairwise midpoints land outside the other two circles
// (distance from midpoint to non-adjacent center ≈ 174 > r=150)
const CENTER_X = 425;
const CENTER_Y = 280;
const OFFSET = 110;
const RADIUS = 150;

const circles: CircleData[] = [
  {
    id: "love",
    label: "What I Love",
    cx: CENTER_X,
    cy: CENTER_Y - OFFSET,
    color: "#30D158",
    items: [
      "Building real products that people use",
      "Mobile development & native experiences",
      "Clean, thoughtful UI/UX design",
      "Teaching & sharing knowledge",
    ],
  },
  {
    id: "good",
    label: "What I'm Good At",
    cx: CENTER_X + OFFSET,
    cy: CENTER_Y,
    color: "#0071E3",
    items: [
      "Full-stack development (React, Node.js)",
      "Mobile across platforms (SwiftUI, Kotlin, Flutter, React Native)",
      "Enterprise systems & integrations",
      "AI integration & agentic workflows",
    ],
  },
  {
    id: "paid",
    label: "What I Can Be Paid For",
    cx: CENTER_X,
    cy: CENTER_Y + OFFSET,
    color: "#FF9500",
    items: [
      "You, hopefully — yes, the company reading this right now",
      "Software engineering & architecture",
      "Mobile app development",
      "Full-stack web platforms",
      "AI automation & LLM integration",
    ],
  },
  {
    id: "world",
    label: "What the World Needs",
    cx: CENTER_X - OFFSET,
    cy: CENTER_Y,
    color: "#BF5AF2",
    items: [
      "Healthcare systems that save lives",
      "Technology that advances humanity",
      "Companies and tools that reduce suffering",
      "Critical systems for a functioning society",
      "Anti-corruption & fraud prevention",
    ],
  },
];

// Labels pushed outward from diagram center into the 2-way-only crescent zones
const PUSH = 18 / Math.sqrt(2); // ~12.7px outward along each diagonal
const intersections = [
  { label: "Passion",    x: CENTER_X + OFFSET / 2 + PUSH, y: CENTER_Y - OFFSET / 2 - PUSH },   // love + good
  { label: "Profession", x: CENTER_X + OFFSET / 2 + PUSH, y: CENTER_Y + OFFSET / 2 + PUSH },   // good + paid
  { label: "Vocation",   x: CENTER_X - OFFSET / 2 - PUSH, y: CENTER_Y + OFFSET / 2 + PUSH },   // paid + world
  { label: "Mission",    x: CENTER_X - OFFSET / 2 - PUSH, y: CENTER_Y - OFFSET / 2 - PUSH },   // world + love
];

// Labels inside each circle, pushed toward the outer edge away from center
const circleLabels = [
  { lines: ["What I Love"], x: CENTER_X, y: CENTER_Y - OFFSET - 65, anchor: "middle" as const },
  { lines: ["What I'm", "Good At"], x: CENTER_X + OFFSET + 60, y: CENTER_Y, anchor: "middle" as const },
  { lines: ["What I Can", "Be Paid For"], x: CENTER_X, y: CENTER_Y + OFFSET + 55, anchor: "middle" as const },
  { lines: ["What the", "World Needs"], x: CENTER_X - OFFSET - 60, y: CENTER_Y, anchor: "middle" as const },
];

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const overlapLevels = [
  {
    count: 2,
    label: "2 of 4 circles",
    text: "I'd get the job done, but my heart might wander",
    color: "#6E6E73",
  },
  {
    count: 3,
    label: "3 of 4 circles",
    text: "I'd be engaged, dedicated, and loyal",
    color: "#FF9500",
  },
  {
    count: 4,
    label: "4 of 4 circles — Ikigai",
    text: "My #1 in life. Over love and family. I'm not even joking. ...OK, maybe a little",
    color: "#30D158",
  },
];

export function IkigaiDiagram({ isDark }: IkigaiDiagramProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const cardBg = isDark ? "rgba(17,17,24,0.85)" : "rgba(255,255,255,0.90)";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const shadow = isDark
    ? "0 2px 20px rgba(0,0,0,0.40)"
    : "0 2px 20px rgba(0,0,0,0.06)";
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const mutedColor = isDark ? "#FFFFFF" : "#000000";
  const subtleColor = isDark ? "rgba(255,255,255,0.7)" : "#5A5A6A";
  const fillOpacity = isDark ? 0.15 : 0.1;
  const dimmedOpacity = isDark ? 0.05 : 0.03;
  const activeOpacity = isDark ? 0.35 : 0.25;
  const strokeOpacity = 0.4;

  const activeCircle = circles.find((c) => c.id === activeId);

  function handleCircleClick(id: string) {
    setActiveId((prev) => (prev === id ? null : id));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      {/* SVG Diagram */}
      <svg
        viewBox="0 0 900 600"
        style={{ width: "100%" }}
        role="img"
        aria-label="Ikigai diagram showing four overlapping circles"
      >
        {/* Circles */}
        {circles.map((circle, index) => {
          const isActive = activeId === circle.id;
          const hasSomeActive = activeId !== null;
          const currentFillOpacity = isActive
            ? activeOpacity
            : hasSomeActive
              ? dimmedOpacity
              : fillOpacity;
          const currentStrokeOpacity = isActive
            ? 1
            : hasSomeActive
              ? 0.12
              : strokeOpacity;

          return (
            <motion.circle
              key={circle.id}
              cx={circle.cx}
              cy={circle.cy}
              fill={circle.color}
              stroke={circle.color}
              strokeWidth={1.5}
              style={{
                fillOpacity: currentFillOpacity,
                strokeOpacity: currentStrokeOpacity,
                transition: "fill-opacity 0.3s ease, stroke-opacity 0.3s ease",
                cursor: "pointer",
              }}
              initial={{ r: 0, opacity: 0 }}
              whileInView={{ r: RADIUS, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12, ease }}
              onMouseEnter={() => setActiveId(circle.id)}
              onMouseLeave={() => setActiveId(null)}
              onClick={() => handleCircleClick(circle.id)}
            />
          );
        })}

        {/* Circle labels (inside each circle) */}
        {circleLabels.map((ol, i) => (
          <motion.text
            key={ol.lines.join(" ")}
            x={ol.x}
            y={ol.y}
            textAnchor={ol.anchor}
            dominantBaseline="middle"
            fill={textColor}
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              pointerEvents: "none",
              userSelect: "none",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.08, ease }}
          >
            {ol.lines.map((line, li) => (
              <tspan key={li} x={ol.x} dy={li === 0 ? 0 : "1.2em"}>
                {line}
              </tspan>
            ))}
          </motion.text>
        ))}

        {/* Intersection labels — now inside the correct 2-way overlap zones */}
        {intersections.map((int, i) => (
          <motion.text
            key={int.label}
            x={int.x}
            y={int.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={mutedColor}
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 500,
              fontSize: "11px",
              opacity: activeId ? 0.25 : 0.7,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
              userSelect: "none",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: activeId ? 0.25 : 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.06, ease }}
          >
            {int.label}
          </motion.text>
        ))}

        {/* Center "Ikigai" label */}
        <motion.text
          x={CENTER_X}
          y={CENTER_Y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={textColor}
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 700,
            fontSize: "18px",
            pointerEvents: "none",
            userSelect: "none",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.0, ease }}
        >
          Ikigai
        </motion.text>
      </svg>

      {/* Detail panel */}
      <div style={{ width: "100%", maxWidth: "640px", minHeight: "40px" }}>
        <AnimatePresence mode="wait">
          {activeCircle ? (
            <motion.div
              key={activeCircle.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease }}
              style={{
                background: cardBg,
                borderRadius: "16px",
                border: `1px solid ${border}`,
                boxShadow: shadow,
                padding: "20px 24px",
                display: "flex",
                gap: "16px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <div
                style={{
                  width: "3px",
                  borderRadius: "2px",
                  background: activeCircle.color,
                  flexShrink: 0,
                  alignSelf: "stretch",
                }}
              />
              <div>
                <p
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: textColor,
                    marginBottom: "10px",
                  }}
                >
                  {activeCircle.label}
                </p>
                <ul style={{ margin: 0, paddingLeft: "16px" }}>
                  {activeCircle.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontWeight: 400,
                        fontSize: "13px",
                        lineHeight: "1.7",
                        color: mutedColor,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                color: mutedColor,
                textAlign: "center",
                opacity: 0.6,
              }}
            >
              Hover or tap a circle to explore
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Overlap compatibility guide */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.3, ease }}
        style={{
          width: "100%",
          maxWidth: "640px",
          background: cardBg,
          borderRadius: "16px",
          border: `1px solid ${border}`,
          boxShadow: shadow,
          padding: "20px 24px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            color: textColor,
            marginBottom: "8px",
          }}
        >
          Compatibility guide
        </p>
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            color: subtleColor,
            margin: "0 0 10px",
            lineHeight: 1.6,
          }}
        >
          Ikigai is a Japanese concept meaning &quot;reason for being&quot; — the sweet spot where
          what you love, what you&apos;re good at, what the world needs, and what you can be
          paid for all intersect.
        </p>
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            color: subtleColor,
            margin: "0 0 16px",
            lineHeight: 1.6,
          }}
        >
          Each circle represents something I care about. The more a role overlaps
          with these circles, the more driven I&apos;ll be. Here&apos;s what that looks like:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {overlapLevels.map((level) => (
            <div
              key={level.count}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              {/* Circle indicators matching the diagram */}
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  paddingTop: "3px",
                  flexShrink: 0,
                }}
              >
                {[1, 2, 3, 4].map((n) => (
                  <span
                    key={n}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: n <= level.count ? level.color : "transparent",
                      border: `1.5px solid ${n <= level.count ? level.color : (isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)")}`,
                      transition: "background 0.2s ease",
                    }}
                  />
                ))}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "13px",
                    color: level.color,
                    margin: "0 0 2px",
                  }}
                >
                  {level.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: mutedColor,
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {level.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
