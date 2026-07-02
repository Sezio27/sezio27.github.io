"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

interface HomeTabProps {
  isDark: boolean;
  onNavigate?: (tab: string) => void;
}

// ── Data ──────────────────────────────────────────────────────────────────────

interface WorkItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  accent: string;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  accent: string;
  status?: "live" | "in-development" | "grade";
  statusLabel?: string;
  github?: string;
  appStore?: string;
  googlePlay?: string;
}

const WORK: WorkItem[] = [
  {
    id: "mycelia",
    company: "Mycelia Health",
    role: "Full Stack Developer Intern",
    period: "Jun 2026 – Present",
    description:
      "Contributing to a digital health platform using React, Node.js, and LLM APIs. Designing UI/UX flows for patient journeys and exploring AI-powered workflows for data analysis and platform automation.",
    tags: ["React", "Node.js", "LLM APIs", "TypeScript"],
    accent: "#0071E3",
  },
  {
    id: "netcompany",
    company: "Netcompany",
    role: "Backend Developer",
    period: "Jan 2024 – Aug 2025",
    description:
      "Enterprise CRM and case management for public-sector clients. Built custom workflows for bulk letter distribution and modernized a business-critical system for the Danish Health Data Authority.",
    tags: [".NET", "Dynamics 365", "Azure", "C#"],
    accent: "#0071E3",
  },
  {
    id: "outlier",
    company: "Outlier",
    role: "Freelance AI Prompt Engineer",
    period: "May 2024 – Jan 2025",
    description:
      "Designed technical prompts for AI evaluation across code generation and reasoning. Reviewed AI-generated code for correctness, edge cases, and alignment with task requirements.",
    tags: ["Prompt Engineering", "AI Evaluation", "Python"],
    accent: "#FF9500",
  },
  {
    id: "pok",
    company: "Pok.Business",
    role: "Freelance Frontend Developer",
    period: "Mar 2022 – Dec 2022",
    description:
      "Built a responsive React web app for NFT showcase and sales with Panda Wallet integration and Bitcoin SV purchase flows. Generated ~100 BSV in the first week.",
    tags: ["React", "Python", "Flask"],
    accent: "#BF5AF2",
  },
];

const PROJECTS: ProjectItem[] = [
  {
    id: "storylingo",
    title: "StoryLingo",
    description:
      "AI iOS app that teaches languages through voice-driven stories with adaptive difficulty.",
    tags: ["SwiftUI", "OpenAI API", "Core Data"],
    accent: "#30D158",
    status: "in-development",
    statusLabel: "In development",
  },
  {
    id: "diploma",
    title: "Aftaler & Regnskab",
    description:
      "Cross-platform Flutter app for a makeup artist — scheduling, clients, financials. Diploma project, grade: 12/12.",
    tags: ["Flutter", "Firebase", "MVVM"],
    accent: "#0071E3",
    status: "grade",
    statusLabel: "12/12",
    github: "https://github.com/Sezio27/aftaler_og_regnskab",
  },
  {
    id: "vendee",
    title: "Vendee",
    description:
      "Inventory and payment app for shared dormitory fridges. Live on App Store and Google Play.",
    tags: ["React Native", "Firebase"],
    accent: "#30D158",
    status: "live",
    statusLabel: "Live",
    appStore:
      "https://apps.apple.com/dk/app/vendee-virtual-vending-kiosk/id6446119022?l=da",
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.vendeeLLC.vendee",
  },
  {
    id: "webshop",
    title: "Grocery Webshop",
    description:
      "Fullstack webshop — React + Vue.js frontend, Node.js + MariaDB backend, Apache reverse proxy.",
    tags: ["React", "Node.js", "MariaDB"],
    accent: "#FF9500",
    github: "https://github.com/Sezio27/Backend-62597",
  },
  {
    id: "kind",
    title: "Kind",
    description:
      "Android app for recurring charity donations built with Kotlin, Jetpack Compose, and Firebase.",
    tags: ["Kotlin", "Jetpack Compose", "Firebase"],
    accent: "#BF5AF2",
    github: "https://github.com/sngp32/Kind",
  },
  {
    id: "memorizer",
    title: "Memorizer",
    description: "Android memory training games built in a team at DTU.",
    tags: ["Kotlin", "Android"],
    accent: "#FF6B6B",
    github: "https://github.com/moorekevin/DTU-SoftProj-Memorizer",
  },
];

// ── Terminal typewriter panel (unchanged) ─────────────────────────────────────
function TerminalPanel({ isDark }: { isDark: boolean }) {
  const fullName = "Jakob Suradhet Jacobsen";
  const [displayedName, setDisplayedName] = useState("");
  const [showRole, setShowRole] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const typeTimer = setInterval(() => {
      if (i < fullName.length) {
        i++;
        setDisplayedName(fullName.slice(0, i));
      } else {
        clearInterval(typeTimer);
        setTyping(false);
        setTimeout(() => setShowRole(true), 400);
      }
    }, 45);
    return () => clearInterval(typeTimer);
  }, []);

  useEffect(() => {
    const blinkTimer = setInterval(() => setCursorVisible((v) => !v), 800);
    return () => clearInterval(blinkTimer);
  }, []);

  const panelBg = isDark ? "rgba(17,17,24,0.80)" : "rgba(0,0,0,0.03)";
  const panelBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
  const commentColor = isDark ? "#5A5A70" : "#9090A8";
  const promptColor = isDark ? "#A0A0B0" : "#52526A";
  const textColor = isDark ? "#F0F0F5" : "#0D0D18";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      style={{
        background: panelBg,
        border: `1px solid ${panelBorder}`,
        borderRadius: "12px",
        padding: "16px 20px",
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        lineHeight: "1.9",
        maxWidth: "480px",
        margin: "0 auto",
        textAlign: "left",
      }}
    >
      <p style={{ color: commentColor, fontSize: "11px", margin: "0 0 2px" }}>
        // portfolio.init()
      </p>
      <p style={{ color: promptColor, margin: "0 0 2px" }}>
        <span style={{ color: "#5E50E8" }}>$ </span>identify engineer
      </p>
      <p style={{ color: promptColor, margin: "0 0 2px" }}>
        <span style={{ color: "#38BDF8" }}>&gt; </span>
        <span style={{ color: textColor }}>{displayedName}</span>
        {(typing || !showRole) && (
          <span style={{ opacity: cursorVisible ? 1 : 0, color: "#5E50E8", transition: "opacity 0.1s" }}>
            ▋
          </span>
        )}
      </p>
      {showRole && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ color: promptColor, margin: 0 }}
        >
          <span style={{ color: "#38BDF8" }}>&gt; </span>
          <span style={{ color: textColor }}>Role: </span>
          <span style={{ color: "#5E50E8" }}>Software Engineer</span>
          <span style={{ opacity: cursorVisible ? 1 : 0, color: "#5E50E8", transition: "opacity 0.1s" }}>
            ▋
          </span>
        </motion.p>
      )}
    </motion.div>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ text, isDark }: { text: string; isDark: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: isDark ? "#5A5A70" : "#9090A8",
        margin: "0 0 16px",
      }}
    >
      {text}
    </motion.p>
  );
}

// ── Work row card ─────────────────────────────────────────────────────────────
function WorkRow({ item, isDark, index }: { item: WorkItem; isDark: boolean; index: number }) {
  const cardBg = isDark ? "rgba(17,17,24,0.85)" : "rgba(255,255,255,0.85)";
  const cardBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.07)";
  const textPrimary = isDark ? "#F0F0F5" : "#0D0D18";
  const textMuted = isDark ? "#8A8A9A" : "#6E6E7A";
  const tagBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const tagColor = isDark ? "#A0A0B8" : "#52526A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      style={{
        background: cardBg,
        borderTop: `1px solid ${cardBorder}`,
        borderRight: `1px solid ${cardBorder}`,
        borderBottom: `1px solid ${cardBorder}`,
        borderLeft: `3px solid ${item.accent}`,
        borderRadius: "12px",
        padding: "20px 24px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${item.accent}28`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "2px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            color: textPrimary,
          }}
        >
          {item.company}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            color: textMuted,
            flexShrink: 0,
          }}
        >
          {item.period}
        </span>
      </div>

      <p
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "12px",
          color: item.accent,
          fontWeight: 500,
          margin: "0 0 10px",
        }}
      >
        {item.role}
      </p>

      <p
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "13px",
          color: textMuted,
          lineHeight: 1.65,
          margin: "0 0 14px",
        }}
      >
        {item.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {item.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              padding: "3px 9px",
              borderRadius: "6px",
              background: tagBg,
              color: tagColor,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({
  item,
  isDark,
  index,
}: {
  item: ProjectItem;
  isDark: boolean;
  index: number;
}) {
  const cardBg = isDark ? "rgba(17,17,24,0.85)" : "rgba(255,255,255,0.85)";
  const cardBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.07)";
  const textPrimary = isDark ? "#F0F0F5" : "#0D0D18";
  const textMuted = isDark ? "#8A8A9A" : "#6E6E7A";
  const tagBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const tagColor = isDark ? "#A0A0B8" : "#52526A";
  const linkColor = isDark ? "#6A6A80" : "#9090A8";

  const isGreen =
    item.status === "live" || item.status === "grade";
  const statusStyle = isGreen
    ? {
        bg: "rgba(48,209,88,0.14)",
        border: "rgba(48,209,88,0.28)",
        text: isDark ? "#34D058" : "#1A9A40",
      }
    : {
        bg: "rgba(94,80,232,0.14)",
        border: "rgba(94,80,232,0.28)",
        text: isDark ? "#8B7EFF" : "#5E50E8",
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: "12px",
        padding: "18px 20px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${item.accent}28`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: item.accent,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            color: textPrimary,
            flex: 1,
          }}
        >
          {item.title}
        </span>
        {item.status && item.statusLabel && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              padding: "2px 8px",
              borderRadius: "999px",
              background: statusStyle.bg,
              border: `1px solid ${statusStyle.border}`,
              color: statusStyle.text,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {item.statusLabel}
          </span>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "12px",
          color: textMuted,
          lineHeight: 1.65,
          margin: "0 0 12px",
          flex: 1,
        }}
      >
        {item.description}
      </p>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          marginBottom:
            item.github || item.appStore || item.googlePlay ? "10px" : "0",
        }}
      >
        {item.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              padding: "2px 8px",
              borderRadius: "6px",
              background: tagBg,
              color: tagColor,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      {(item.github || item.appStore || item.googlePlay) && (
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                color: linkColor,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = item.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
            >
              <ExternalLink size={10} />
              GitHub
            </a>
          )}
          {item.appStore && (
            <a
              href={item.appStore}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                color: linkColor,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = item.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
            >
              <ExternalLink size={10} />
              App Store
            </a>
          )}
          {item.googlePlay && (
            <a
              href={item.googlePlay}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                color: linkColor,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = item.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
            >
              <ExternalLink size={10} />
              Google Play
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function HomeTab({ isDark, onNavigate }: HomeTabProps) {
  const bg = isDark ? "rgba(10,10,15,0.80)" : "rgba(248,248,252,0.80)";
  const textPrimary = isDark ? "#F0F0F5" : "#0D0D18";
  const textSecondary = isDark ? "#A0A0B0" : "#3A3A52";
  const ctaGhostBorder = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)";
  const ctaAccent = isDark ? "#8B7EFF" : "#5E50E8";

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Raleway', sans-serif", background: bg, transition: "background 0.3s ease" }}>

      {/* ── Hero ── */}
      <section
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "64px 24px 72px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <TerminalPanel isDark={isDark} />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.8,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
          }}
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 5vw, 52px)",
            lineHeight: 1.15,
            color: textPrimary,
            margin: 0,
          }}
        >
          Software engineer.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #5E50E8 0%, #38BDF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI builder.
          </span>{" "}
          Builds for mobile and web.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 400,
            fontSize: "15px",
            lineHeight: 1.75,
            color: textSecondary,
            maxWidth: "460px",
            margin: 0,
          }}
        >
          B.Eng. Software Technology from DTU. 1.5 years at Netcompany
          building enterprise systems. Currently building a digital health
          platform at Mycelia Health with React, Node.js, and AI. Uses
          AI daily in development with Claude and Copilot. Passionate
          about mobile development — shipped apps on both the App Store and
          Google Play, and fluent across iOS (SwiftUI), Android (Kotlin),
          and cross-platform (Flutter, React Native).
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.3 }}
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { label: "See my bio", tab: "bio" },
            { label: "See my resume", tab: "journey" },
          ].map((btn) => (
            <button
              key={btn.tab}
              onClick={() => onNavigate?.(btn.tab)}
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                padding: "10px 26px",
                borderRadius: "10px",
                background: isDark
                  ? "linear-gradient(135deg, rgba(94,80,232,0.18) 0%, rgba(56,189,248,0.12) 100%)"
                  : "linear-gradient(135deg, rgba(94,80,232,0.10) 0%, rgba(56,189,248,0.06) 100%)",
                color: isDark ? "#C4BDFF" : "#5E50E8",
                border: `1px solid ${isDark ? "rgba(139,126,255,0.20)" : "rgba(94,80,232,0.15)"}`,
                cursor: "pointer",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(94,80,232,0.25)";
                e.currentTarget.style.background = isDark
                  ? "linear-gradient(135deg, rgba(94,80,232,0.28) 0%, rgba(56,189,248,0.20) 100%)"
                  : "linear-gradient(135deg, rgba(94,80,232,0.16) 0%, rgba(56,189,248,0.10) 100%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.background = isDark
                  ? "linear-gradient(135deg, rgba(94,80,232,0.18) 0%, rgba(56,189,248,0.12) 100%)"
                  : "linear-gradient(135deg, rgba(94,80,232,0.10) 0%, rgba(56,189,248,0.06) 100%)";
              }}
            >
              {btn.label}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ── Work Experience ── */}
      <section
        id="work"
        style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 64px" }}
      >
        <SectionLabel text="Work Experience" isDark={isDark} />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {WORK.map((item, i) => (
            <WorkRow key={item.id} item={item} isDark={isDark} index={i} />
          ))}
        </div>
      </section>

      {/* ── Selected Projects ── */}
      <section
        id="projects"
        style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 80px" }}
      >
        <SectionLabel text="Selected Projects" isDark={isDark} />
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "10px" }}
          className="proj-grid"
        >
          {PROJECTS.map((item, i) => (
            <ProjectCard key={item.id} item={item} isDark={isDark} index={i} />
          ))}
        </div>
      </section>

      <style>{`
        @media (min-width: 600px) {
          .proj-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 960px) {
          .proj-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
