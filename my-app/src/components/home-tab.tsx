"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

interface HomeTabProps {
  isDark: boolean;
}

// ── Work experience data ───────────────────────────────────────────────────────
interface WorkCard {
  id: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  gradient: string;
}

interface ProjectCard {
  id: string;
  title: string;
  period?: string;
  description: string;
  tags: string[];
  gradient: string;
  status?: "live" | "in-development" | "grade";
  statusLabel?: string;
  github?: string;
  appStore?: string;
  googlePlay?: string;
}

const WORK_CARDS: WorkCard[] = [
  {
    id: "netcompany",
    title: "Enterprise Systems at Scale",
    period: "Jan 2024 – Aug 2025",
    description:
      "Built enterprise CRM and case management for public-sector clients — .NET, Microsoft Dynamics 365, Azure. Delivered custom workflows for bulk letter distribution including mail merge, e-Boks delivery, and WorkZone journaling, plus a full modernization of a business-critical system for the Danish Health Data Authority.",
    tags: [".NET", "Microsoft Dynamics 365", "Azure", "C#", "CI/CD", "REST APIs"],
    gradient: "linear-gradient(135deg, #38BDF8 0%, #5E50E8 100%)",
  },
  {
    id: "outlier",
    title: "Shaping AI Behavior from the Inside",
    period: "May 2024 – Jan 2025",
    description:
      "Designed and iterated technical prompts for AI evaluation across code generation, debugging, and reasoning — OpenAI models, prompt engineering, AI evaluation. Reviewed AI-generated code for correctness, edge cases, and alignment with task requirements.",
    tags: ["Prompt Engineering", "AI Evaluation", "Python", "Code Review", "OpenAI"],
    gradient: "linear-gradient(135deg, #38BDF8 0%, #5E50E8 100%)",
  },
  {
    id: "pok",
    title: "NFT Platform Launch — ~100 BSV Week One",
    period: "Mar 2022 – Dec 2022",
    description:
      "Built a responsive React web app for NFT showcase and sales with Panda Wallet integration and Bitcoin SV purchase flows — React, Python Flask. Launch generated ~100 BSV in the first week.",
    tags: ["React", "Python", "Flask", "JavaScript", "REST APIs"],
    gradient: "linear-gradient(135deg, #38BDF8 0%, #5E50E8 100%)",
  },
];

const PROJECT_CARDS: ProjectCard[] = [
  {
    id: "storylingo",
    title: "AI Language Learning, Driven by Your Voice",
    period: "Jan 2026 – Present",
    description:
      "iOS app that teaches languages through AI-generated stories with live voice input and adaptive vocabulary — SwiftUI, OpenAI API, Core Data. Prompt-engineered context-aware narratives that adjust difficulty in real time based on user proficiency.",
    tags: ["SwiftUI", "OpenAI API", "Core Data", "MVVM", "Prompt Engineering", "Speech Recognition"],
    gradient: "linear-gradient(135deg, #5E50E8 0%, #38BDF8 100%)",
    status: "in-development",
    statusLabel: "In development",
  },
  {
    id: "diploma",
    title: "12/12 — Cross-Platform Scheduling App",
    period: "Sep 2025 – Dec 2025",
    description:
      "Cross-platform Flutter app built for a professional makeup artist — scheduling, client management, and financial tracking — Flutter, Firebase, MVVM. Awarded 12/12 (Danish top grade) for architecture, code quality, and feature depth.",
    tags: ["Flutter", "Dart", "Firebase", "Firestore", "MVVM", "Cross-Platform"],
    gradient: "linear-gradient(135deg, #38BDF8 0%, #5E50E8 100%)",
    status: "grade",
    statusLabel: "12/12",
    github: "https://github.com/Sezio27/aftaler_og_regnskab",
  },
  {
    id: "vendee",
    title: "Live on App Store and Google Play",
    description:
      "React Native app for inventory and payment management inside shared dormitory fridges — React Native, phone-based auth. Ships with role-based user and admin flows; available on both iOS and Android.",
    tags: ["React Native", "JavaScript", "Firebase", "iOS", "Android"],
    gradient: "linear-gradient(135deg, #38BDF8 0%, #5E50E8 100%)",
    status: "live",
    statusLabel: "Live",
    appStore: "https://apps.apple.com/dk/app/vendee-virtual-vending-kiosk/id6446119022?l=da",
    googlePlay: "https://play.google.com/store/apps/details?id=com.vendeeLLC.vendee",
  },
  {
    id: "webshop",
    title: "Fullstack Grocery Webshop",
    description:
      "React + TypeScript + Vue.js frontend paired with a Node.js and MariaDB backend, served through Apache HTTP Server reverse proxy — built as a DTU fullstack project. Covered the full stack from UI to database schema.",
    tags: ["React", "TypeScript", "Vue.js", "Node.js", "MariaDB", "Apache"],
    gradient: "linear-gradient(135deg, #38BDF8 0%, #5E50E8 100%)",
    github: "https://github.com/Sezio27/Backend-62597",
  },
  {
    id: "kind",
    title: "Subscription Charity on Android",
    description:
      "Android app that lets users set up recurring donations to charities — Kotlin, Jetpack Compose, Firebase Realtime Database. Built with MVVM and clean architecture from day one.",
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "MVVM", "Android"],
    gradient: "linear-gradient(135deg, #38BDF8 0%, #5E50E8 100%)",
    github: "https://github.com/sngp32/Kind",
  },
  {
    id: "memorizer",
    title: "Memory Games for Android",
    description:
      "Kotlin Android app with a suite of memory training games — built as a DTU Software Project in a team environment. Covers standard Android patterns with activities, fragments, and local state management.",
    tags: ["Kotlin", "Android", "Java", "DTU", "Team Project"],
    gradient: "linear-gradient(135deg, #38BDF8 0%, #5E50E8 100%)",
    github: "https://github.com/moorekevin/DTU-SoftProj-Memorizer",
  },
];

const STATS = [
  { value: "1.5 yrs", label: "at Netcompany" },
  { value: "2", label: "Apps on Store" },
  { value: "12/12", label: "Diploma Grade" },
];

// ── Terminal typewriter panel ─────────────────────────────────────────────────
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

  const panelBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const panelBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
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
          <span
            style={{
              opacity: cursorVisible ? 1 : 0,
              color: "#5E50E8",
              transition: "opacity 0.1s",
            }}
          >
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
          <span
            style={{
              opacity: cursorVisible ? 1 : 0,
              color: "#5E50E8",
              transition: "opacity 0.1s",
            }}
          >
            ▋
          </span>
        </motion.p>
      )}
    </motion.div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({
  status,
  label,
  isDark,
}: {
  status: "live" | "in-development" | "grade";
  label: string;
  isDark: boolean;
}) {
  let bg: string;
  let border: string;
  let color: string;

  if (status === "live" || status === "grade") {
    bg = "rgba(34,197,94,0.18)";
    border = "rgba(34,197,94,0.30)";
    color = isDark ? "#4ADE80" : "#22C55E";
  } else {
    bg = "rgba(94,80,232,0.20)";
    border = "rgba(94,80,232,0.35)";
    color = isDark ? "#8B7EFF" : "#5E50E8";
  }

  return (
    <span
      style={{
        position: "absolute",
        top: "12px",
        right: "12px",
        padding: "3px 9px",
        borderRadius: "999px",
        background: bg,
        border: `1px solid ${border}`,
        color,
        fontFamily: "'Inter', sans-serif",
        fontSize: "10px",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ── Work experience card ───────────────────────────────────────────────────────
function WorkExperienceCard({
  card,
  isDark,
  index,
}: {
  card: WorkCard;
  isDark: boolean;
  index: number;
}) {
  const cardBg = isDark ? "#101018" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textPrimary = isDark ? "#F0F0F5" : "#0D0D18";
  const textMuted = isDark ? "#A0A0B0" : "#52526A";
  const tagBg = isDark ? "rgba(139,126,255,0.12)" : "rgba(94,80,232,0.08)";
  const tagColor = isDark ? "#8B7EFF" : "#5E50E8";
  const linkHoverColor = isDark ? "#8B7EFF" : "#5E50E8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.05 * index,
      }}
      whileHover={{ y: -4 }}
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        cursor: "default",
        transition: "box-shadow 0.2s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = isDark
          ? "0 16px 40px rgba(139,126,255,0.20)"
          : "0 16px 40px rgba(94,80,232,0.14)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
      }}
    >
      {/* Gradient header */}
      <div
        style={{
          height: "112px",
          background: card.gradient,
          flexShrink: 0,
          position: "relative",
        }}
      />

      {/* Content */}
      <div
        style={{
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            color: textPrimary,
            margin: "0 0 2px",
            lineHeight: 1.3,
          }}
        >
          {card.title}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            color: textMuted,
            margin: "0 0 8px",
          }}
        >
          {card.period}
        </p>
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            color: textMuted,
            margin: "0 0 12px",
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {card.description}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            marginTop: "auto",
          }}
        >
          {card.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                padding: "2px 8px",
                borderRadius: "8px",
                background: tagBg,
                color: tagColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
function SelectedProjectCard({
  card,
  isDark,
  index,
}: {
  card: ProjectCard;
  isDark: boolean;
  index: number;
}) {
  const cardBg = isDark ? "#101018" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textPrimary = isDark ? "#F0F0F5" : "#0D0D18";
  const textMuted = isDark ? "#A0A0B0" : "#52526A";
  const tagBg = isDark ? "rgba(139,126,255,0.12)" : "rgba(94,80,232,0.08)";
  const tagColor = isDark ? "#8B7EFF" : "#5E50E8";
  const linkColor = isDark ? "#A0A0B0" : "#52526A";
  const linkHoverColor = isDark ? "#8B7EFF" : "#5E50E8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.05 * index,
      }}
      whileHover={{ y: -4 }}
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        cursor: "default",
        transition: "box-shadow 0.2s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = isDark
          ? "0 16px 40px rgba(139,126,255,0.20)"
          : "0 16px 40px rgba(94,80,232,0.14)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
      }}
    >
      {/* Gradient header with optional status badge */}
      <div
        style={{
          height: "112px",
          background: card.gradient,
          flexShrink: 0,
          position: "relative",
        }}
      >
        {card.status && card.statusLabel && (
          <StatusBadge status={card.status} label={card.statusLabel} isDark={isDark} />
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            color: textPrimary,
            margin: "0 0 2px",
            lineHeight: 1.3,
          }}
        >
          {card.title}
        </p>
        {card.period && (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: textMuted,
              margin: "0 0 8px",
            }}
          >
            {card.period}
          </p>
        )}
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            color: textMuted,
            margin: card.period ? "0 0 12px" : "8px 0 12px",
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {card.description}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            marginTop: "auto",
          }}
        >
          {card.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                padding: "2px 8px",
                borderRadius: "8px",
                background: tagBg,
                color: tagColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(card.github || card.appStore || card.googlePlay) && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {card.github && (
              <a
                href={card.github}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = linkHoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = linkColor;
                }}
              >
                <ExternalLink size={10} />
                GitHub
              </a>
            )}
            {card.appStore && (
              <a
                href={card.appStore}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = linkHoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = linkColor;
                }}
              >
                <ExternalLink size={10} />
                App Store
              </a>
            )}
            {card.googlePlay && (
              <a
                href={card.googlePlay}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = linkHoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = linkColor;
                }}
              >
                <ExternalLink size={10} />
                Google Play
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({
  title,
  isDark,
}: {
  title: string;
  isDark: boolean;
}) {
  const textPrimary = isDark ? "#F0F0F5" : "#0D0D18";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          width: "3px",
          height: "28px",
          background: "linear-gradient(to bottom, #5E50E8, #38BDF8)",
          borderRadius: "2px",
          flexShrink: 0,
        }}
      />
      <h2
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 600,
          fontSize: "26px",
          color: textPrimary,
          margin: 0,
        }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

// ── Main HomeTab export ───────────────────────────────────────────────────────
export function HomeTab({ isDark }: HomeTabProps) {
  const bg = isDark ? "#09090E" : "#F7F7FB";
  const textPrimary = isDark ? "#F0F0F5" : "#0D0D18";
  const textSecondary = isDark ? "#A0A0B0" : "#52526A";
  const textTertiary = isDark ? "#5A5A70" : "#9090A8";
  const statBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const statBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const ctaGhostBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const ctaAccent = isDark ? "#8B7EFF" : "#5E50E8";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        fontFamily: "'Raleway', sans-serif",
        transition: "background 0.3s ease",
      }}
    >
      {/* ── Hero ── */}
      <section
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "72px 24px 56px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
        }}
      >
        <TerminalPanel isDark={isDark} />

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.8,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
          }}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <h1
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 5vw, 58px)",
              lineHeight: 1.1,
              color: textPrimary,
              margin: 0,
            }}
          >
            Enterprise engineer.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #5E50E8 0%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI builder.
            </span>
            <br />
            Ships on every platform.
          </h1>
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: 1.7,
              color: textSecondary,
              maxWidth: "540px",
              margin: "0 auto",
            }}
          >
            DTU-trained software engineer with 1.5 years building production systems at
            Netcompany — .NET, Dynamics 365, Azure. Also ships iOS apps, cross-platform
            mobile, and AI-powered features from scratch.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <button
            onClick={() =>
              document.getElementById("work-experience")?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              padding: "12px 28px",
              borderRadius: "10px",
              background: isDark ? "#8B7EFF" : "#5E50E8",
              color: "#FFFFFF",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = isDark
                ? "0 6px 20px rgba(139,126,255,0.35)"
                : "0 6px 20px rgba(94,80,232,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            See the work
          </button>
          <a
            href="mailto:jacobsen.js@hotmail.com"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              padding: "12px 28px",
              borderRadius: "10px",
              background: "transparent",
              color: textSecondary,
              border: `1px solid ${ctaGhostBorder}`,
              cursor: "pointer",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = ctaAccent;
              e.currentTarget.style.color = ctaAccent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = ctaGhostBorder;
              e.currentTarget.style.color = textSecondary;
            }}
          >
            Let&apos;s talk
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.5 }}
          style={{
            display: "flex",
            background: statBg,
            border: `1px solid ${statBorder}`,
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "14px 24px",
                textAlign: "center",
                borderRight: i < STATS.length - 1 ? `1px solid ${statBorder}` : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: textPrimary,
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 400,
                  fontSize: "10px",
                  color: textTertiary,
                  marginTop: "2px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Work Experience ── */}
      <section
        id="work-experience"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 64px",
        }}
      >
        <SectionHeading title="Work Experience" isDark={isDark} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "16px",
          }}
          className="work-grid"
        >
          {WORK_CARDS.map((card, index) => (
            <WorkExperienceCard key={card.id} card={card} isDark={isDark} index={index} />
          ))}
        </div>
      </section>

      {/* ── Selected Projects ── */}
      <section
        id="selected-projects"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <SectionHeading title="Selected Projects" isDark={isDark} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "16px",
          }}
          className="projects-grid"
        >
          {PROJECT_CARDS.map((card, index) => (
            <SelectedProjectCard key={card.id} card={card} isDark={isDark} index={index} />
          ))}
        </div>
      </section>

      {/* Responsive grid styles */}
      <style>{`
        @media (min-width: 768px) {
          .work-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1280px) {
          .work-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .projects-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
