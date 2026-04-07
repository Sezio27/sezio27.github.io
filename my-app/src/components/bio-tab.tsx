"use client";

import { motion } from "framer-motion";

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
    category: "Enterprise Backend",
    descriptor: "Production-tested at scale — this is where Jakob spent 1.5 years in the real world.",
    items: ["C#", ".NET", "Microsoft Dynamics 365", "Azure", "REST APIs", "Ocelot API Gateway", "CI/CD", "Azure DevOps"],
   
  },
  {
    category: "AI & Automation",
    descriptor: "Not just a user of AI tools — he evaluated them, engineered prompts for them, and ships products with them.",
    items: ["Prompt Engineering", "OpenAI API", "AI Evaluation", "GitHub Copilot", "Workflow Automation"],
   
  },
  {
    category: "Mobile Platforms",
    descriptor: "iOS, Android, and cross-platform — built and shipped apps on all three.",
    items: ["SwiftUI", "Kotlin", "Jetpack Compose", "Flutter", "React Native", "Dart", "KMP"],
  
  },
  {
    category: "Web Full-Stack",
    descriptor: "Comfortable across the full stack — frontend to database to deployment.",
    items: ["React", "TypeScript", "JavaScript", "Node.js", "Vue", "Flask", "Python", "MariaDB", "SQL Server", "Firebase"],
  
  },
  {
    category: "Languages",
    descriptor: "9 languages across enterprise, mobile, and scripting contexts — picks up new ones fast.",
    items: ["C#", "Python", "JavaScript", "TypeScript", "Swift", "Kotlin", "Dart", "Java", "SQL"],
  
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
  const bg = isDark ? "#0A0A0F" : "#F8F8FC";
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
            <p
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 400,
                fontSize: "15px",
                lineHeight: "1.8",
                color: text,
              }}
            >
              Jakob Jacobsen builds software that ships — from enterprise CRM systems handling
              Danish public-sector data, to AI-powered iOS apps with real-time voice input. At
              Netcompany, he spent 1.5 years deep in .NET, Microsoft Dynamics 365, and Azure:
              building custom workflows, modernising data systems for the Danish Health Data
              Authority, and writing the integrations that connect them. In parallel, he
              prompt-engineered for Outlier&apos;s AI evaluation programme and is now building
              StoryLingo — an adaptive language learning app powered by the OpenAI API. BEng
              Software Technology, DTU, 2026. Fluent across iOS (SwiftUI), Android (Kotlin,
              Jetpack Compose), and cross-platform (Flutter, React Native).
            </p>
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
                      fontSize: "13px",
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
                      fontSize: "11px",
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
              degree="BEng Software Technology"
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
        padding: "3px 10px",
        borderRadius: "999px",
        background: pillBg,
        border: `1px solid ${pillBorder}`,
        fontFamily:"'Raleway', sans-serif",
        fontWeight: 400,
        fontSize: "11px",
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
            fontSize: "13px",
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
              fontSize: "9px",
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
          fontSize: "12px",
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
          fontSize: "11px",
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
          fontSize: "11px",
          color: muted,
        }}
      >
        {location}
      </p>
    </div>
  );
}
