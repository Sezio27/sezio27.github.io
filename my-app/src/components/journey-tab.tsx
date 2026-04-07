"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, University } from "lucide-react";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";

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
  bullets?: string[];
  tags?: string[];
  link?: string;
  grade?: string;
  accent?: string;
  images?: { src: string; alt: string }[];
}

function Entry({
  isDark,
  role,
  org,
  period,
  bullets = [],
  tags = [],
  link,
  grade,
  accent = "#5E50E8",
  images = [],
}: EntryProps) {
  const textPrimary = isDark ? "#F5F5F7" : "#1D1D1F";
  const textBody = isDark ? "rgba(245,245,247,0.82)" : "#2C2C2E";
  const textMuted = isDark ? "rgba(245,245,247,0.58)" : "#6E6E73";

  const tagBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)";
  const tagBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const tagText = isDark ? "rgba(245,245,247,0.72)" : "#5A5A5F";

  const imgBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
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

        {/* Right badges: period, grade, link */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
            paddingTop: 2,
            flexWrap: "wrap",
            justifyContent: "flex-end",
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

          {grade && (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 11,
                color: "#30D158",
                background: "rgba(48,209,88,0.12)",
                border: "1px solid rgba(48,209,88,0.22)",
                padding: "4px 10px",
                borderRadius: 999,
              }}
            >
              {grade}
            </span>
          )}

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: textMuted, lineHeight: 0 }}
            >
              <ExternalLink size={13} />
            </a>
          )}
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

      {/* Images */}
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
              style={{
                width: "100%",
                height: 118,
                objectFit: "cover",
                borderRadius: 12,
                border: `1px solid ${imgBorder}`,
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
        <Entry
          isDark={isDark}
          role="StoryLingo | AI-Powered iOS Language Learning App"
          org="Personal Project"
          period="Jan 2026 – present"
          accent={GREEN}
          bullets={[
            "Building a SwiftUI-based iOS app that turns language learning into interactive story-driven conversations, where the user can speak, type, listen, and respond inside a living narrative instead of completing static exercises.",
            "Designed the app around a full end-to-end learner journey: onboarding, story creation, conversation flow, response suggestions, translation support, text-to-speech playback, speech input, progress tracking, and persistent story history.",
            "Implemented a structured Core Data model for stories, messages, settings, and learner preferences, with a strong focus on keeping the architecture scalable as features such as narration, reply categories, and adaptive learning mechanics evolve.",
            "Integrated OpenAI-powered generation for story progression, dialogue, image creation, and language assistance, while actively experimenting with prompt design, tone control, and low-cost strategies for handling translation and feedback intelligently.",
            "Working deeply with mobile product design as well as engineering: refining the UI in SwiftUI, testing different interaction patterns, shaping message components, and improving the balance between immersion, clarity, and learning value.",
          ]}
          images={[
            {
              src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&auto=format",
              alt: "iPhone app development",
            },
            {
              src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&auto=format",
              alt: "Mobile app UI",
            },
          ]}
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
              grade="12 / 12"
              accent={GREEN}
              link="https://github.com/Sezio27/aftaler_og_regnskab"
              bullets={[
                "Built a mobile app from scratch for a freelance makeup artist who needed a better way to manage appointments, client information, offered services, and basic financial overview in one place instead of scattered notes and manual workflows.",
                "Developed the project as a real client-oriented product rather than a purely academic prototype: gathering needs, shaping the scope, producing interface ideas, and translating those into a maintainable architecture and a focused MVP.",
                "Implemented a layered Flutter architecture with clear separation between UI, view models, repositories, and data access, using Firebase Authentication, Cloud Firestore, and Storage as the backend foundation.",
                "Worked extensively with caching, structured data flow, and incremental reads to keep the app responsive and avoid unnecessary backend usage, while still supporting rich features such as appointment handling, service management, images, and financial summaries.",
                "Put strong emphasis on UI quality and usability, aiming for an experience that felt professional, clean, and trustworthy for a real self-employed user whose business depends on speed and overview during daily work.",
              ]}
              images={[
                {
                  src: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=600&h=400&fit=crop&auto=format",
                  alt: "Flutter mobile app",
                },
                {
                  src: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&h=400&fit=crop&auto=format",
                  alt: "App screens",
                },
              ]}
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
                "Supported teaching in UX and mobile app development through lab sessions and hands-on guidance, helping students move from abstract ideas to working implementations across different mobile technologies.",
                "Worked with topics spanning Swift, Kotlin, Flutter, and Kotlin Multiplatform, and helped students reason about architecture, interaction design, debugging, and the practical trade-offs between native and cross-platform development.",
                "This role strengthened my ability to explain technical concepts clearly, review student solutions critically, and translate good engineering habits into concrete guidance others could use immediately.",
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
              role="Software Developer"
              org="Netcompany"
              period="Jan 2024 – Aug 2025"
              accent={BLUE}
              bullets={[
              "Worked full-time on enterprise and public-sector software, contributing to the maintenance and further development of CRM-based solutions built with C#, .NET, Microsoft Dynamics 365, and Azure. ",
    "Developed features and integrations for administrative workflows where reliability, traceability, and secure handling of data were central requirements rather than purely user-facing functionality.",
    "Contributed to both ongoing application maintenance and larger modernization work, including migrating and improving existing code, introducing new data models and mappings, and building API endpoints and integration components.",
    "Worked with testing and software quality in practice through bug fixing, code improvements, detailed test cases, unit and integration testing, validation, logging, and technical documentation.",
    "Gained strong experience working in a professional delivery environment with Git, pull requests, code reviews, team coordination, estimations, and CI/CD, while also learning how security requirements and external dependencies shape real-world development."
              ]}
              images={[
                {
                  src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&auto=format",
                  alt: "Code on screen",
                },
                {
                  src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&auto=format",
                  alt: "Enterprise office",
                },
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
                "Worked on technical AI evaluation tasks focused on prompting, code-related reasoning, and quality review of model-generated outputs across a range of programming and logic-heavy scenarios.",
                "Designed and refined prompts intended to expose weaknesses in generated solutions, then reviewed the outputs for correctness, edge cases, clarity, and alignment with the actual task requirements.",
                "Also evaluated model behavior in more sensitive situations, which sharpened my attention to safe behavior, ambiguity, and the difference between something that sounds convincing and something that is actually correct.",
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
    "Completed an academic exchange semester in Gainesville, Florida, as part of my engineering education at DTU, gaining experience studying and collaborating in an international environment.",
    "Took courses in Operating Systems, Fundamentals of Engineering Project Management, Artificial Intelligence Fundamentals, and Engineering Innovation, which broadened both my technical perspective and understanding of how engineering ideas move from concept to execution.",
    "The exchange strengthened my independence, adaptability, and confidence in working effectively in new academic and social settings far from home.",
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
                "Worked on a web solution for showcasing and selling NFTs, using React on the frontend and Flask on the backend, with Panda Wallet integration for blockchain-related purchase flow.",
                "Contributed to turning an early-stage idea into a functioning product experience and got practical exposure to freelance-style development, where expectations, priorities, and technical decisions all move quickly.",
                "The launch generated roughly 100 BSV within the first week, giving the project a real commercial dimension beyond being only a technical exercise.",
              ]}
              tags={["React", "Flask", "Python", "Web3", "Freelance"]}
            />,
            <Entry
              key="fullstack"
              isDark={isDark}
              role="Full-Stack Grocery Webshop"
              org="Academic Project · Technical University of Denmark"
              accent={GREEN}
              link="https://github.com/Sezio27/Backend-62597"
              bullets={[
                "Worked on a full-stack webshop solution combining modern frontend technologies with a backend and database setup, giving me hands-on experience across the full request-to-data flow.",
                "The project involved React, TypeScript, Vue.js, Node.js, MariaDB, and deployment-oriented setup behind an Apache reverse proxy, which made it a strong exercise in connecting many moving parts into one working system.",
                "It helped build my understanding of how frontend, backend, database design, and infrastructure choices influence each other in a real application.",
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
              accent={GREEN}
              link="https://apps.apple.com/dk/app/vendee-virtual-vending-kiosk/id6446119022?l=da"
              bullets={[
                "Built and launched a React Native mobile app focused on shared-fridge inventory and lightweight payment handling, aimed at making everyday item management easier in a communal setting.",
                "Implemented different user roles and flows, authentication, and the practical app logic required to keep track of products, access, and simple transactions.",
                "Most importantly, this project gave me real experience shipping: not just building features locally, but getting an app through release processes and onto both the App Store and Google Play.",
              ]}
              images={[
                {
                  src: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&h=400&fit=crop&auto=format",
                  alt: "App store mobile",
                },
                {
                  src: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&h=400&fit=crop&auto=format",
                  alt: "React Native app",
                },
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
  link="https://github.com/moorekevin/DTU-SoftProj-Memorizer"
  bullets={[
    "Built a memory-training mobile app as part of a group software project, developed in Kotlin using classic Android Views with XML layouts, Activities, and Fragments.",
    "The app included four different memory games, score tracking, personal history, and online leaderboard functionality.",
    "Contributed to the main menu and the visual memory game, where players recall highlighted tiles in a grid that increases in difficulty over time.",
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