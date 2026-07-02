"use client";

import { motion } from "framer-motion";
import { IkigaiDiagram } from "@/components/ikigai-diagram";

interface BioTabProps {
  isDark: boolean;
}

interface SkillGroup {
  category: string;
  descriptor: string;
  items: string[];
 
}

const techStack: SkillGroup[] = [
  {
    category: "Programming Languages",
    descriptor: "Strong: TypeScript, JavaScript, Swift, Dart. Working knowledge across enterprise, mobile, and scripting contexts.",
    items: ["TypeScript", "JavaScript", "Swift", "Dart", "Python", "C#", "Java", "Kotlin", "SQL"],
  },
  {
    category: "App & Web Frameworks",
    descriptor: "Strong: React, Node.js, SwiftUI, Flutter, React Native. Comfortable across the full stack.",
    items: ["React", "Node.js", "SwiftUI", "Flutter", "React Native", "Flask", "Jetpack Compose", "KMP", "Vite", "Vue", "Bootstrap", "HTML", "CSS"],
  },
  {
    category: "AI & Automation",
    descriptor: "Ships products with LLM APIs and agentic AI — from evaluation and prompt engineering to production health-tech workflows.",
    items: ["LLM API Integration", "Agentic AI Workflows", "Prompt Engineering", "AI-Assisted Development", "Claude Code", "GitHub Copilot", "AI Evaluation", "Workflow Automation"],
  },
  {
    category: "Data & Infrastructure",
    descriptor: "SQL, Firebase, and cloud services — production-tested at Netcompany with Azure and CI/CD.",
    items: ["SQL", "Firebase", "Firestore", "Core Data", "MariaDB", "REST APIs", "CI/CD", "Azure DevOps", "Docker"],
  },
  {
    category: "Microsoft & Cloud",
    descriptor: "1.5 years of enterprise backend at Netcompany with .NET, Dynamics 365, and Azure.",
    items: [".NET", "C#", "Microsoft Dynamics 365", "Azure", "Ocelot API Gateway"],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.45,
    delay,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  },
});

export function BioTab({ isDark }: BioTabProps) {
  const bg = isDark ? "rgba(10,10,15,0.80)" : "rgba(248,248,252,0.80)";
  const cardBg = isDark ? "#111118" : "#FFFFFF";
  const text = isDark ? "#F0F0F5" : "#0D0D18";
  const muted = isDark ? "#A0A0B0" : "#52526A";
  const tertiary = isDark ? "#5A5A70" : "#9090A8";
  const accent = isDark ? "#8B7EFF" : "#5E50E8";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const shadow = isDark ? "0 2px 20px rgba(0,0,0,0.40)" : "0 2px 20px rgba(0,0,0,0.06)";
  const pillBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const pillBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const pillText = isDark ? "#A0A0B0" : "#52526A";
  const primaryPillBg = isDark ? "rgba(139,126,255,0.15)" : "rgba(94,80,232,0.10)";
  const primaryPillText = isDark ? "#8B7EFF" : "#5E50E8";
  const primaryPillBorder = isDark ? "rgba(139,126,255,0.30)" : "rgba(94,80,232,0.25)";
  const pillHoverBg = isDark ? "rgba(139,126,255,0.20)" : "rgba(94,80,232,0.12)";

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: bg,
        fontFamily: "'Raleway', sans-serif",
        transition: "background 0.3s ease",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">

        {/* ── Professional Summary ── */}
        <motion.section {...fadeUp(0)}>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: tertiary, fontFamily: "'Raleway', sans-serif" }}
          >
            Professional Summary
          </p>
          <div
            style={{
              background: cardBg,
              borderRadius: "16px",
              border: `1px solid ${border}`,
              boxShadow: shadow,
              padding: "28px 32px",
              display: "flex",
              gap: "20px",
            }}
          >
            {/* Left accent bar */}
            <div
              style={{
                width: "3px",
                borderRadius: "2px",
                background: "linear-gradient(to bottom, #5E50E8, #38BDF8)",
                flexShrink: 0,
                alignSelf: "stretch",
              }}
            />
            <div
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 400,
                fontSize: "15px",
                lineHeight: "1.8",
                color: text,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <p style={{ margin: 0 }}>
                Software engineer with experience across mobile apps, full-stack platforms,
                enterprise systems, and AI-assisted workflows.
              </p>
              <p style={{ margin: 0 }}>
                Currently building a digital health platform at Mycelia Health using React,
                Node.js, and LLM APIs. Also building StoryLingo — an AI-powered iOS language
                learning app with SwiftUI and the OpenAI API.
              </p>
              <p style={{ margin: 0 }}>
                Previously spent 1.5 years at Netcompany working on enterprise CRM and case
                management systems with .NET, Microsoft Dynamics 365, and Azure.
              </p>
              <p style={{ margin: 0 }}>
                Worked as a freelance AI Prompt Engineer &amp; Reviewer at Outlier, evaluating
                AI-generated code and designing technical prompts. Three years as a Teaching
                Assistant at DTU across Java, Python, and mobile app development courses.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Tech Stack ── */}
        <motion.section {...fadeUp(0.05)}>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: tertiary, fontFamily: "'Raleway', sans-serif" }}
          >
            Tech Stack
          </p>
          <div className="space-y-4">
            {techStack.map((group) => (
              <div
                key={group.category}
                style={{
                  background: cardBg,
                  borderRadius: "16px",
                  border: `1px solid ${border}`,
                  boxShadow: shadow,
                  padding: "20px 24px",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <p
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontWeight: 600,
                      fontSize: "15px",
                      color: text,
                      marginBottom: "3px",
                    }}
                  >
                    {group.category}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontWeight: 400,
                      fontSize: "13px",
                      color: muted,
                    }}
                  >
                    {group.descriptor}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => {
                    
                    return (
                      <SkillPill
                        key={`${group.category}-${item}`}
                        label={item}
                       
                        pillBg={pillBg}
                        pillBorder={pillBorder}
                        pillText={pillText}
                        accent={accent}
                        pillHoverBg={pillHoverBg}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Education ── */}
        <motion.section {...fadeUp(0.1)}>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: tertiary, fontFamily: "'Raleway', sans-serif" }}
          >
            Education
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <EduCard
              degree="B.Eng. Software Technology"
              school="Technical University of Denmark"
              period="Aug 2022 – Jan 2026"
              location="Kongens Lyngby, Denmark"
              badge="Graduated Jan 2026"
              cardBg={cardBg}
              border={border}
              shadow={shadow}
              text={text}
              muted={muted}
              accent={accent}
            />
            <EduCard
              degree="International Exchange Semester"
              school="University of Florida"
              period="Aug 2023 – Dec 2023"
              location="Gainesville, FL, USA"
              cardBg={cardBg}
              border={border}
              shadow={shadow}
              text={text}
              muted={muted}
              accent={accent}
            />
          </div>
        </motion.section>


      </div>

      {/* ── Ikigai — wider container ── */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <motion.section {...fadeUp(0.15)}>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: tertiary, fontFamily: "'Raleway', sans-serif" }}
          >
            Ikigai
          </p>
          <IkigaiDiagram isDark={isDark} />
        </motion.section>
      </div>
    </div>
  );
}

// ── Skill pill ────────────────────────────────────────────────────────────────
function SkillPill({
  label,
 
  pillBg,
  pillBorder,
  pillText,
  accent,
  pillHoverBg,
}: {
  label: string;
  
  pillBg: string;
  pillBorder: string;
  pillText: string;
  accent: string;
  pillHoverBg: string;
}) {
  return (
    <span
      className="cursor-default transition-all duration-200"
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "999px",
        background: pillBg,
        border: `1px solid ${pillBorder}`,
        fontFamily:"'Raleway', sans-serif",
        fontWeight: 400,
        fontSize: "13px",
        color: pillText,
        transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = pillHoverBg;
        el.style.color = accent;
        el.style.borderColor = accent + "55";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = pillBg;
        el.style.color = pillText;
        el.style.borderColor = pillBorder;
      }}
    >
      {label}
    </span>
  );
}

// ── Education card ────────────────────────────────────────────────────────────
function EduCard({
  degree,
  school,
  period,
  location,
  badge,
  cardBg,
  border,
  shadow,
  text,
  muted,
  accent,
}: {
  degree: string;
  school: string;
  period: string;
  location: string;
  badge?: string;
  cardBg: string;
  border: string;
  shadow: string;
  text: string;
  muted: string;
  accent: string;
}) {
  return (
    <div
      style={{
        background: cardBg,
        borderRadius: "16px",
        border: `1px solid ${border}`,
        boxShadow: shadow,
        padding: "20px 22px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "4px" }}>
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            color: text,
            margin: 0,
          }}
        >
          {degree}
        </p>
        {badge && (
          <span
            style={{
              fontFamily: "'Inter', monospace",
              fontSize: "11px",
              fontWeight: 500,
              padding: "2px 8px",
              borderRadius: "999px",
              background: "rgba(34,197,94,0.12)",
              color: "#22C55E",
              border: "1px solid rgba(34,197,94,0.25)",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <p
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 500,
          fontSize: "14px",
          color: accent,
          marginBottom: "10px",
        }}
      >
        {school}
      </p>
      <p
        style={{
          fontFamily: "'Inter', monospace",
          fontWeight: 400,
          fontSize: "13px",
          color: muted,
          marginBottom: "2px",
        }}
      >
        {period}
      </p>
      <p
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 400,
          fontSize: "13px",
          color: muted,
        }}
      >
        {location}
      </p>
    </div>
  );
}
