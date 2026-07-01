"use client";

import React from "react";
import { motion } from "framer-motion";
import { University } from "lucide-react";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { GalleryButton } from "@/components/screenshot-gallery";

// ─────────────────────────────────────────────
// Track accent colours
// ─────────────────────────────────────────────

const BLUE = "#0071E3";
const GREEN = "#30D158";
const ORANGE = "#FF9500";
const PURPLE = "#BF5AF2";

// ─────────────────────────────────────────────
// Flat entry — no background card
// ─────────────────────────────────────────────

interface EntryProps {
  isDark: boolean;
  role: string;
  org: string;
  period?: string;
  bullets?: React.ReactNode[];
  tags?: string[];
  links?: { url: string; label: string; type: "github" | "appstore" | "youtube" }[];
  accent?: string;
  gallery?: React.ReactNode;
  images?: { src: string; alt: string }[];
}

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function AppleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function YoutubeIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function Entry({
  isDark,
  role,
  org,
  period,
  bullets = [],
  tags = [],
  links = [],
  accent = "#5E50E8",
  gallery,
  images = [],
}: EntryProps) {
  const textPrimary = isDark ? "#F5F5F7" : "#1D1D1F";
  const textBody = isDark ? "rgba(245,245,247,0.82)" : "#2C2C2E";
  const textMuted = isDark ? "rgba(245,245,247,0.58)" : "#6E6E73";

  const tagBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)";
  const tagBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const tagText = isDark ? "rgba(245,245,247,0.72)" : "#5A5A5F";

  const periodBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
  const periodBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 760,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <h4
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 600,
              fontSize: 16,
              color: textPrimary,
              margin: 0,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
            }}
          >
            {role}
          </h4>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 13,
              color: accent,
              margin: "4px 0 0",
              lineHeight: 1.35,
            }}
          >
            {org}
          </p>
        </div>

        {/* Right: period + links */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 8,
            flexShrink: 0,
            paddingTop: 2,
          }}
        >
          {period && (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                color: textMuted,
                background: periodBg,
                border: `1px solid ${periodBorder}`,
                padding: "4px 10px",
                borderRadius: 999,
                whiteSpace: "nowrap",
              }}
            >
              {period}
            </span>
          )}

          {links.length > 0 && links.map((l) => {
            const icon =
              l.type === "github" ? <GithubIcon size={14} /> :
              l.type === "appstore" ? <AppleIcon size={14} /> :
              <YoutubeIcon size={14} />;

            const btnBg =
              l.type === "github" ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)") :
              l.type === "appstore" ? (isDark ? "rgba(0,113,227,0.20)" : "rgba(0,113,227,0.10)") :
              isDark ? "rgba(255,0,0,0.15)" : "rgba(255,0,0,0.08)";

            const btnBorder =
              l.type === "github" ? (isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)") :
              l.type === "appstore" ? (isDark ? "rgba(0,113,227,0.35)" : "rgba(0,113,227,0.25)") :
              isDark ? "rgba(255,0,0,0.30)" : "rgba(255,0,0,0.20)";

            const btnColor =
              l.type === "github" ? (isDark ? "#E0E0E8" : "#24292f") :
              l.type === "appstore" ? "#0071E3" :
              isDark ? "#FF4444" : "#CC0000";

            const hoverBg =
              l.type === "github" ? (isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.10)") :
              l.type === "appstore" ? (isDark ? "rgba(0,113,227,0.30)" : "rgba(0,113,227,0.18)") :
              isDark ? "rgba(255,0,0,0.25)" : "rgba(255,0,0,0.14)";

            return (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 12px",
                  borderRadius: 999,
                  background: btnBg,
                  border: `1px solid ${btnBorder}`,
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  color: btnColor,
                  textDecoration: "none",
                  transition: "background 0.2s, border-color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = hoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = btnBg;
                }}
              >
                {icon}
                <span>{l.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Bullets */}
      {bullets.length > 0 && (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: 8,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: textBody,
                lineHeight: 1.72,
                letterSpacing: "-0.01em",
              }}
            >
              <span
                style={{
                  color: accent,
                  flexShrink: 0,
                  marginTop: 1,
                  fontSize: 16,
                  lineHeight: 1,
                }}
              >
                •
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Basic images (e.g. UF exchange) */}
      {images.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(images.length, 2)}, 1fr)`,
            gap: 10,
            marginTop: 4,
          }}
        >
          {images.map((img) => (
            <img
              key={img.alt}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              style={{
                width: "100%",
                height: 118,
                objectFit: "cover",
                borderRadius: 12,
                border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}`,
                display: "block",
              }}
            />
          ))}
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                color: tagText,
                background: tagBg,
                border: `1px solid ${tagBorder}`,
                padding: "4px 9px",
                borderRadius: 999,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Gallery */}
      {gallery && <div style={{ marginTop: 8, marginBottom: 12 }}>{gallery}</div>}

    </div>
  );
}
function MilestoneLine({
  isDark,
  text,
}: {
  isDark: boolean;
  text: string;
}) {
  const lineColor = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const textColor = isDark ? "rgba(245,245,247,0.58)" : "#6E6E73";
  const iconColor = isDark ? "rgba(245,245,247,0.78)" : "#4A4A4F";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 960,
        paddingTop: 4,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <University size={28} color={iconColor} strokeWidth={2} />
        </div>

        <div
          style={{
            width: "100%",
            height: 1,
            background: lineColor,
          }}
        />
      </div>

      <p
        style={{
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          lineHeight: 1.5,
          color: textColor,
          textAlign: "center",
        }}
      >
        {text}
      </p>
    </div>
  );
}
// ─────────────────────────────────────────────
// Staggered group
// ─────────────────────────────────────────────

const STAGGER_STEP = 80;

function StaggeredGroup({
  children,
  isDark,
  variant = "alternate",
}: {
  children: React.ReactNode[];
  isDark: boolean;
  variant?: "alternate" | "stair";
}) {
  const dividerColor = isDark
    ? "rgba(255,255,255,0.06)"
    : "rgba(0,0,0,0.06)";

  function offsetFor(i: number) {
    if (variant === "stair") {
      return { marginLeft: i * STAGGER_STEP, marginRight: 0 };
    }

    return i % 2 === 0
      ? { marginLeft: 0, marginRight: STAGGER_STEP }
      : { marginLeft: STAGGER_STEP, marginRight: 0 };
  }

  function xFromFor(i: number) {
    if (variant === "stair") return -20;
    return i % 2 === 0 ? -20 : 20;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: xFromFor(i) }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.45,
            delay: i * 0.08,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{
            ...offsetFor(i),
            paddingBottom: i < children.length - 1 ? 4 : 0,
            borderBottom:
              i < children.length - 1
                ? `1px solid ${dividerColor}`
                : "none",
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Root export
// ─────────────────────────────────────────────

export function JourneyTab({ isDark }: { isDark: boolean }) {
  const textPrimary = isDark ? "#F5F5F7" : "#1D1D1F";
  const textMuted = isDark ? "rgba(245,245,247,0.58)" : "#6E6E73";
  const bg = isDark ? "rgba(10,10,15,0.96)" : "rgba(248,248,252,0.95)";

  const timelineData: TimelineEntry[] = [
    {
      title: "2026",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <Entry
          isDark={isDark}
          role="Full Stack Developer Intern"
          org="Mycelia Health"
          period="Jun 2026 – present"
          accent={BLUE}
          bullets={[
            <>Building the frontend of a digital health platform using <strong>React</strong> and <strong>Redux</strong>, translating UI/UX designs, user flows, and product requirements into concrete components and functionality.</>,
            <>Designing and iterating <strong>UI/UX</strong> flows for patient journeys, data intake, and platform interactions in close collaboration with the team.</>,
            <>Integrating <strong>LLM APIs</strong> and <strong>agentic AI</strong> concepts to power intelligent workflows for patient data analysis, decision support, and platform automation.</>,
            <>Driving technical planning on <strong>system architecture</strong>, integrations, and secure data handling across platform development phases.</>,
          ]}
          tags={[
            "React",
            "Redux",
            "TypeScript",
            "LLM APIs",
            "UI/UX",
            "Health Tech",
          ]}
        />
        <Entry
          isDark={isDark}
          role="StoryLingo | AI-Powered iOS Language Learning App"
          org="Personal Project"
          period="Jan 2026 – present"
          accent={GREEN}
          bullets={[
            <>Building a <strong>SwiftUI</strong>-based iOS app that turns language learning into interactive story-driven conversations, where the user can speak, type, listen, and respond inside a living narrative instead of completing static exercises.</>,
            <>Designed the app around a full end-to-end learner journey: onboarding, story creation, conversation flow, response suggestions, translation support, <strong>text-to-speech</strong> playback, <strong>speech input</strong>, progress tracking, and persistent story history.</>,
            <>Implemented a structured <strong>Core Data</strong> model with <strong>MVVM</strong> architecture for stories, messages, settings, and learner preferences, with a strong focus on keeping the architecture scalable.</>,
            <>Integrated <strong>OpenAI</strong>-powered generation for story progression, dialogue, image creation, and language assistance. Currently optimising for reducing <strong>token usage</strong> and building a <strong>payment model</strong> for the app.</>,
            <>Working towards <strong>App Store</strong> release while refining the UI in SwiftUI, testing different interaction patterns, shaping message components, and improving the balance between immersion, clarity, and learning value.</>,
          ]}
          gallery={
            <GalleryButton
              isDark={isDark}
              images={[
                { src: "/screenshots/storylingo/1.png", alt: "Home screen", caption: "Home", description: "Browse stories and start new adventures" },
                { src: "/screenshots/storylingo/2.png", alt: "New story", caption: "New Story", description: "Create a story with custom settings" },
                { src: "/screenshots/storylingo/3.png", alt: "New story", caption: "Story Setup", description: "Set title, genre, theme and place" },
                { src: "/screenshots/storylingo/4.png", alt: "Response Suggestions", caption: "Response Suggestions", description: "AI-generated replies in different randomly selected tones / moods." },
                { src: "/screenshots/storylingo/5.png", alt: "Conversation", caption: "Conversation", description: "Interactive story-driven dialogue with translation in your native langauge. AI response with voice and in text for better learning experience." },
                { src: "/screenshots/storylingo/6.png", alt: "Translation", caption: "Translation", description: "Inline translation assistance" },
                { src: "/screenshots/storylingo/7.png", alt: "Story details", caption: "Story details", description: "Review and resume past stories" },
                { src: "/screenshots/storylingo/8.png", alt: "Story list", caption: "Story List", description: "All your story history in one place" },
                { src: "/screenshots/storylingo/9.png", alt: "Stats", caption: "Stats", description: "Learning progress and AI-powered insights" },
                { src: "/screenshots/storylingo/10.png", alt: "Settings", caption: "Settings", description: "Customize your experience" },
                { src: "/screenshots/storylingo/11.png", alt: "Languages", caption: "Languages", description: "Pick your native and target language" },
              ]}
            />
          }
          tags={[
            "SwiftUI",
            "OpenAI API",
            "Core Data",
            "MVVM",
            "Speech Recognition",
            "Text-to-Speech",
            "Prompt Engineering",
          ]}
        />
        </div>
      ),
    },

    {
      title: "2025",
      content: (
         <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
    <MilestoneLine
        key="dtu-beng-end"
        isDark={isDark}
        text="Completed my B.Eng. in Software Technology at the Technical University of Denmark."
      />

     
        <StaggeredGroup isDark={isDark}>
          {[

            <Entry
              key="diploma"
              isDark={isDark}
              role="Aftaler & Regnskab | Full-Stack Flutter App"
              org="Diploma Project · Technical University of Denmark"
              period="Sep – Dec 2025"
              accent={GREEN}
              links={[{ url: "https://github.com/Sezio27/aftaler_og_regnskab", label: "See on GitHub", type: "github" }]}
              bullets={[
                <>Built a mobile app from scratch for a freelance makeup artist who needed a better way to manage appointments, client information, offered services, and basic financial overview in one place instead of scattered notes and manual workflows.</>,
                <>Developed the project as a real client-oriented product rather than a purely academic prototype: gathering needs, shaping the scope, producing interface ideas, and translating those into a maintainable architecture and a focused <strong>MVP</strong>.</>,
                <>Implemented a layered <strong>Flutter</strong> architecture with clear separation between UI, view models, repositories, and data access, using <strong>Firebase Authentication</strong>, <strong>Cloud Firestore</strong>, and Storage as the backend foundation.</>,
                <>Worked extensively with caching, structured data flow, and incremental reads to keep the app responsive and avoid unnecessary backend usage, while still supporting rich features such as appointment handling, service management, images, and financial summaries.</>,
                <>Put strong emphasis on <strong>UI quality</strong> and usability, aiming for an experience that felt professional, clean, and trustworthy for a real self-employed user. Grade: <strong>12/12</strong> (Danish top grade).</>,
              ]}
              gallery={
                <GalleryButton
                  isDark={isDark}
                  images={[
                    { src: "/screenshots/aftaler/1_onboarding.png", alt: "Onboarding flow", caption: "Onboarding", description: "First-time setup with phone authentication and welcome" },
                    { src: "/screenshots/aftaler/2_1_home_and_calendar.png", alt: "Home and calendar views", caption: "Home & Calendar", description: "Dashboard and appointment calendar" },
                    { src: "/screenshots/aftaler/2_2_dark_mode.png", alt: "Dark mode", caption: "Dark Mode", description: "Full dark mode support" },
                    { src: "/screenshots/aftaler/3_finance_and_history.png", alt: "Finance and history", caption: "Finance & History", description: "Financial overview and records" },
                    { src: "/screenshots/aftaler/4_services_and_checklists.png", alt: "Services and checklists", caption: "Services & Checklists", description: "Manage services and task lists" },
                    { src: "/screenshots/aftaler/5_new_appointment.png", alt: "New appointment flow", caption: "New Appointment", description: "Create appointments step by step" },
                    { src: "/screenshots/aftaler/6_view_and_edit_appointment.png", alt: "View and edit appointment", caption: "View & Edit Appointment", description: "Appointment details and editing" },
                    { src: "/screenshots/aftaler/7_settings_and_clients.png", alt: "Settings and clients", caption: "Settings & Clients", description: "App settings and client management" },
                  ]}
                />
              }
              tags={[
                "Flutter",
                "Firebase",
                "Dart",
                "MVVM",
                "Firestore",
                "Mobile Product Design",
              ]}
            />,
            <Entry
              key="ta-ux"
              isDark={isDark}
              role="Teaching Assistant · UX & Mobile App Development"
              org="Technical University of Denmark"
              period="Sep 2025 – Jan 2026"
              accent={PURPLE}
              bullets={[
                <>Sole teaching assistant in a course with <strong>100+ students</strong>, supporting teaching in UX and mobile app development through lab sessions and hands-on guidance, helping students move from abstract ideas to working implementations across different mobile technologies.</>,
                <>Worked with topics spanning <strong>Swift</strong>, <strong>Kotlin</strong>, <strong>Flutter</strong>, and <strong>Kotlin Multiplatform</strong>, and helped students reason about architecture, interaction design, debugging, and the practical trade-offs between native and cross-platform development.</>,
                <>Communicated technical concepts and <strong>software architecture</strong> patterns to students with varying backgrounds, developing strong skills in knowledge sharing and technical communication.</>,
                <>Assisted with grading and <strong>AI detection</strong> in student submissions.</>,
              ]}
              tags={[
                "Swift",
                "Kotlin",
                "Flutter",
                "KMP",
                "UX",
                "Teaching",
              ]}
            />,
          ]}
        </StaggeredGroup>
      
          </div>),
    },

    {
      title: "2024",
      content: (
        <StaggeredGroup isDark={isDark}>
          {[
            <Entry
              key="netco"
              isDark={isDark}
              role="Backend Developer"
              org="Netcompany"
              period="Jan 2024 – Aug 2025"
              accent={BLUE}
              bullets={[
                <>Built and maintained enterprise CRM and case management solutions for public sector clients using <strong>C#</strong>, <strong>.NET</strong>, <strong>Microsoft Dynamics 365</strong>, and <strong>Azure</strong> services.</>,
                <>Independently designed and implemented custom workflows and plugins for bulk letter distribution, enabling template uploads, mail merge, delivery via <em>e-Boks</em> (secure digital post), and automatic journaling in <em>WorkZone</em>.</>,
                <>Modernized a business-critical system for <strong>The Danish Health Data Authority</strong> in a <strong>1,000+ hour</strong> project, replacing a legacy database while preserving compatibility with dependent systems, including schema redesign, data migration, DTOs and data model mapping, and integration of external data sources, saving over <strong>1 million DKK annually</strong>.</>,
                <>Implemented <strong>API endpoints</strong> and <strong>integration components</strong> with certificate-based HTTP clients, data validation, logging, and an API Gateway using Ocelot.</>,
                <>Wrote unit and integration tests and maintained <strong>CI/CD pipelines</strong> in <strong>Azure DevOps</strong> to ensure reliable automated builds, test execution, and deployment workflows.</>,
              ]}
              tags={[
                ".NET",
                "Dynamics 365",
                "Azure",
                "C#",
                "CI/CD",
                "Public Sector",
                "Integration",
              ]}
            />,
            <Entry
              key="outlier"
              isDark={isDark}
              role="AI Prompt Engineer & Reviewer"
              org="Outlier (Freelance)"
              period="May 2024 – Jan 2025"
              accent={ORANGE}
              bullets={[
                <>Worked on technical <strong>AI evaluation</strong> tasks focused on prompting, code-related reasoning, and quality review of <strong>model-generated outputs</strong> across a range of programming and logic-heavy scenarios.</>,
                <>Designed and refined <strong>prompts</strong> intended to expose weaknesses in generated solutions, then reviewed the outputs for correctness, edge cases, clarity, and alignment with the actual task requirements.</>,
                <>Also evaluated model behavior in more sensitive situations, which sharpened my attention to safe behavior, ambiguity, and the difference between something that sounds convincing and something that is actually correct.</>,
              ]}
              tags={[
                "Prompt Engineering",
                "AI Evaluation",
                "Code Review",
                "Reasoning Tasks",
              ]}
            />,
          ]}
        </StaggeredGroup>
      ),
    },

    {
      title: "2023",
      content: (
        <StaggeredGroup isDark={isDark}>
          {[
           <Entry
  key="uf"
  isDark={isDark}
  role="International Exchange Semester"
  org="University of Florida"
  period="Aug – Dec 2023"
  accent={PURPLE}
  bullets={[
    <>Completed an academic exchange semester in Gainesville, Florida, as part of my engineering education at DTU, gaining experience studying and collaborating in an international environment.</>,
    <>Took courses in <strong>Operating Systems</strong>, Engineering Project Management, <strong>Artificial Intelligence Fundamentals</strong>, and Engineering Innovation, which broadened both my technical perspective and understanding of how engineering ideas move from concept to execution.</>,
    <>The exchange strengthened my independence, adaptability, and confidence in working effectively in new academic and social settings far from home.</>,
  ]}
  images={[
    {
      src: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop&auto=format",
      alt: "University campus",
    },
    {
      src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop&auto=format",
      alt: "University lecture",
    },
  ]}
  tags={[
    "University of Florida",
    "Academic Exchange",
    "Operating Systems",
    "AI Fundamentals",
    "Project Management",
  ]}
/>,

<Entry
  key="ta-python"
  isDark={isDark}
  role="Teaching Assistant · Introduction to Programming (Python)"
  org="Technical University of Denmark (Remote)"
  period="Aug – Dec 2023"
  accent={PURPLE}
  bullets={[
    "Continued working as a teaching assistant while on exchange by supporting DTU students remotely in introductory programming in Python.",
    "Balancing teaching responsibilities alongside a full semester abroad required strong structure, reliability, and clear communication across time zones and different day-to-day contexts.",
  ]}
  tags={["Python", "Remote", "Teaching"]}
/>,
             <Entry
              key="ta-java"
              isDark={isDark}
              role="Teaching Assistant · Introductory Programming (Java)"
              org="Technical University of Denmark"
              period="Feb – May 2023"
              accent={PURPLE}
              bullets={[
                "Led and supported weekly lab sessions in introductory programming, helping students build confidence with Java fundamentals, problem solving, and structured thinking.",
                "This was one of my first experiences guiding others technically, and it pushed me to become clearer, more patient, and more precise in the way I explain code.",
              ]}
              tags={["Java", "Teaching", "Programming Fundamentals"]}
            />,
          ]}
        </StaggeredGroup>
      ),
    },

    {
      title: "2022",
      content: (
        <StaggeredGroup isDark={isDark}>
          {[
            <Entry
              key="pok"
              isDark={isDark}
              role="Frontend Developer"
              org="Pok.Business (Freelance)"
              period="Mar – Dec 2022"
              accent={ORANGE}
              bullets={[
                <>Worked on a web solution for showcasing and selling NFTs, using <strong>React</strong> on the frontend and <strong>Flask</strong> on the backend, with Panda Wallet integration for blockchain-related purchase flow.</>,
                <>Contributed to turning an early-stage idea into a functioning product experience and got practical exposure to freelance-style development, where expectations, priorities, and technical decisions all move quickly.</>,
                <>The launch generated roughly <strong>100 BSV</strong> within the first week, giving the project a real commercial dimension beyond being only a technical exercise.</>,
              ]}
              tags={["React", "Flask", "Python", "Web3", "Freelance"]}
            />,
            <Entry
              key="fullstack"
              isDark={isDark}
              role="Full-Stack Grocery Webshop"
              org="Academic Project · Technical University of Denmark"
              period="2022"
              accent={GREEN}
              links={[{ url: "https://github.com/Sezio27/Backend-62597", label: "See on GitHub", type: "github" }]}
              bullets={[
                <>Worked on a full-stack webshop solution combining modern frontend technologies with a backend and database setup, giving me hands-on experience across the full request-to-data flow.</>,
                <>The project involved <strong>React</strong>, <strong>TypeScript</strong>, <strong>Vue.js</strong>, <strong>Node.js</strong>, <strong>MariaDB</strong>, and deployment behind an <strong>Apache</strong> reverse proxy, connecting many moving parts into one working system.</>,
                <>It helped build my understanding of how frontend, backend, database design, and infrastructure choices influence each other in a real application.</>,
              ]}
              tags={[
                "React",
                "TypeScript",
                "Vue.js",
                "Node.js",
                "MariaDB",
                "Full-Stack",
              ]}
            />,
  <MilestoneLine
          key="dtu-beng"
          isDark={isDark}
          text="Switched to the B.Eng. in Software Technology at the Technical University of Denmark."
        />,
          ]}
        </StaggeredGroup>
      ),
    },
    {
      title: "2021",
      content: (
        <StaggeredGroup isDark={isDark}>
          {[

              <Entry
              key="vendee"
              isDark={isDark}
              role="Vendee | Inventory & Payment App"
              org="Personal Project"
              period="2021 – 2022"
              accent={GREEN}
              links={[
                { url: "https://apps.apple.com/dk/app/vendee-virtual-vending-kiosk/id6446119022?l=da", label: "See on App Store", type: "appstore" },
                { url: "https://www.youtube.com/watch?v=pk6S5jtLzec", label: "See video demonstration (old)", type: "youtube" },
              ]}
              bullets={[
                <>Built and launched a <strong>React Native</strong> mobile app focused on shared-fridge inventory and lightweight payment handling, aimed at making everyday item management easier in a communal setting.</>,
                <>Implemented different user roles and flows, authentication, and the practical app logic required to keep track of products, access, and simple transactions.</>,
                <>Most importantly, this project gave me real experience shipping: not just building features locally, but getting an app through release processes and onto both the <strong>App Store</strong> and <strong>Google Play</strong>.</>,
              ]}
              tags={[
                "React Native",
                "iOS",
                "Android",
                "Firebase",
                "App Store Release",
              ]}
            />,
           
            <Entry
  key="memorizer"
  isDark={isDark}
  role="Memorizer | Memory Training App"
  org="Academic Group Project · Technical University of Denmark"
  period="Spring 2021"
  accent={PURPLE}
  links={[{ url: "https://github.com/moorekevin/DTU-SoftProj-Memorizer", label: "See on GitHub", type: "github" }]}
  bullets={[
    <>Built a memory-training mobile app as part of a group software project, developed in <strong>Kotlin</strong> using classic Android Views with XML layouts, Activities, and Fragments.</>,
    <>The app included <strong>4</strong> different memory games, score tracking, personal history, and online leaderboard functionality.</>,
    <>Contributed to the main menu and the visual memory game, where players recall highlighted tiles in a grid that increases in difficulty over time.</>,
  ]}
  tags={[
    "Kotlin",
    "Android Views",
    "XML Layouts",
    "Fragments",
    "Firebase",
    "Academic Project",
  ]}
/>,
            
<MilestoneLine
          key="dtu-bsc-start"
          isDark={isDark}
          text="Started the B.Sc. in Software Technology at the Technical University of Denmark."
        />,
          ]}
        </StaggeredGroup>
      ),
    },
  ];

  const LEGEND = [
    { label: "Full-time", color: BLUE },
    { label: "Personal Projects", color: GREEN },
    { label: "Freelance", color: ORANGE },
    { label: "Part-time / Academic", color: PURPLE },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        transition: "background 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 3,
              height: 28,
              background: "linear-gradient(to bottom, #0071E3, #30D158)",
              borderRadius: 2,
              flexShrink: 0,
            }}
          />
          <h2
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 600,
              fontSize: 28,
              color: textPrimary,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Journey
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            lineHeight: 1.6,
            color: textMuted,
            margin: "0 0 32px 15px",
            maxWidth: 680,
          }}
        >
          A more detailed look at the work, projects, and experiences that
          shaped me as a developer.
        </motion.p>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 56 }}
        >
          {LEGEND.map(({ label, color }) => (
            <span
              key={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                borderRadius: 999,
                background: `${color}18`,
                color,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 11,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: color,
                  flexShrink: 0,
                }}
              />
              {label}
            </span>
          ))}
        </motion.div>

        {/* Timeline */}
        <Timeline data={timelineData} isDark={isDark} />
      </div>
    </div>
  );
}