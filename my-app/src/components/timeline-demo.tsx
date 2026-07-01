"use client";
import React from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import {
  MapPin, Mail, Github, Linkedin, ExternalLink, Globe,
} from "lucide-react";

// ── Cupertino design system ─────────────────────────────────────────────────
// Style  : Minimalism + Soft UI Evolution
// Colors : #F5F5F7 page · #FFFFFF card · #1D1D1F text · #6E6E73 muted
//          #5E50E8 apple-blue accent
// Type   : Inter (SF Pro substitute)
// Radius : 16px cards · 8px tags
// Shadow : 0 2px 8px rgba(0,0,0,0.08)
// Motion : 200–400ms ease · scroll-reveal
// ────────────────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] },
});

// ── Reusable card ────────────────────────────────────────────────────────────
function Card({
  role,
  org,
  period,
  bullets,
  tags,
  link,
  screenshots,
  grade,
}: {
  role: string;
  org: string;
  period?: string;
  bullets?: string[];
  tags?: string[];
  link?: { label: string; href: string };
  screenshots?: { alt: string }[];
  grade?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.11)] transition-shadow duration-300">
      {/* Header */}
      <div className="flex justify-between items-start gap-2 mb-1">
        <div className="min-w-0">
          <h4
            className="text-[#1D1D1F] font-semibold text-sm leading-snug truncate"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            {role}
          </h4>
          <p className="text-[#5E50E8] text-xs font-medium mt-0.5" style={{ fontFamily: "'Raleway', sans-serif" }}>
            {org}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {grade && (
            <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-semibold border border-green-200" style={{ fontFamily: "'Inter', sans-serif" }}>
              {grade}
            </span>
          )}
          {period && (
            <span className="text-[#6E6E73] text-[11px] whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif" }}>
              {period}
            </span>
          )}
          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6E6E73] hover:text-[#5E50E8] transition-colors cursor-pointer"
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Bullets */}
      {bullets && (
        <ul className="mt-3 space-y-1.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-[#3A3A3C] text-xs leading-relaxed" style={{ fontFamily: "'Raleway', sans-serif" }}>
              <span className="text-[#5E50E8] shrink-0 mt-px">·</span>
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Screenshot placeholders */}
      {screenshots && screenshots.length > 0 && (
        <div className={`mt-4 grid gap-2 ${screenshots.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {screenshots.map((s, i) => (
            <div
              key={i}
              className="aspect-video rounded-xl bg-[#F5F5F7] border border-[#E5E5EA] flex flex-col items-center justify-center gap-1.5 group hover:border-[#5E50E8]/30 transition-colors"
            >
              <Globe size={14} className="text-[#C7C7CC] group-hover:text-[#5E50E8] transition-colors" />
              <span className="text-[#C7C7CC] text-[9px] text-center px-2 leading-tight" style={{ fontFamily: "'Raleway', sans-serif" }}>
                {s.alt}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      {tags && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full bg-[#F5F5F7] text-[#3A3A3C] text-[10px] border border-[#E5E5EA]"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Skills pill group ────────────────────────────────────────────────────────
const skills: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["C#", "Python", "TypeScript", "JavaScript", "Swift", "Kotlin", "Dart", "SQL"] },
  { category: "App & Web", items: ["React", "Next.js", "React Native", "Flutter", "SwiftUI", "Node.js", "Vue", "Flask"] },
  { category: "Microsoft & Cloud", items: [".NET", "Dynamics 365", "Azure", "REST APIs", "CI/CD", "Azure DevOps"] },
  { category: "AI & Automation", items: ["Prompt Engineering", "OpenAI API", "GitHub Copilot", "AI Evaluation"] },
  { category: "Data & Tools", items: ["SQL Server", "Firebase", "MariaDB", "Git", "Postman", "SonarQube"] },
];

// ── Timeline data ────────────────────────────────────────────────────────────
const timelineData = [
  {
    title: "Jan 2026 – Present",
    content: (
      <Card
        role="StoryLingo — AI-Powered iOS App"
        org="Personal Project"
        bullets={[
          "SwiftUI app combining voice input, dynamic storytelling, and multilingual assistance.",
          "OpenAI API for story generation, adaptive responses, translation, and image generation.",
          "Core Data, MVVM, speech recognition, and text-to-speech for voice-driven AI interactions.",
        ]}
        tags={["SwiftUI", "OpenAI API", "Core Data", "MVVM", "Prompt Engineering"]}
        screenshots={[
          { alt: "Home screen" },
          { alt: "Story view" },
          { alt: "Language selector" },
        ]}
      />
    ),
  },
  {
    title: "Sep – Dec 2025",
    content: (
      <Card
        role="Diploma Project — Flutter App"
        org="Technical University of Denmark"
        grade="12 / 12"
        link={{ label: "Source", href: "#" }}
        bullets={[
          "Cross-platform app with 4 workflows: scheduling, calendar, client management, and financial tracking.",
          "MVVM architecture with Firebase Auth / Firestore / Storage, caching, and pagination.",
          "AI-assisted development for ideation, prototyping, debugging, and testing.",
        ]}
        tags={["Flutter", "Firebase", "MVVM", "Dart"]}
        screenshots={[
          { alt: "Calendar" },
          { alt: "Clients" },
          { alt: "Finance" },
        ]}
      />
    ),
  },
  {
    // Parallel: Netcompany + Outlier at the same time
    title: "Jan 2024 – Aug 2025",
    content: (
      <Card
        role="Software Developer"
        org="Netcompany"
        period="Jan 2024 – Aug 2025"
        bullets={[
          "Enterprise CRM and case management for public-sector clients using .NET, Dynamics 365, and Azure.",
          "Bulk letter distribution workflows — mail merge, e-Boks delivery, WorkZone journaling.",
          "Modernised a business-critical system for The Danish Health Data Authority: DB migration, DTO mapping, national registry integration.",
          "API endpoints, certificate-based HTTP clients, validation, logging, and API Gateway.",
        ]}
        tags={[".NET", "Dynamics 365", "Azure", "C#", "CI/CD"]}
      />
    ),
    parallel: (
      <Card
        role="AI Prompt Engineer & Reviewer"
        org="Outlier (Freelance)"
        period="May 2024 – Jan 2025"
        bullets={[
          "Designed and iterated prompts to evaluate AI across code generation, debugging, and reasoning tasks.",
          "Reviewed AI-generated code for correctness, edge cases, and alignment with requirements.",
          "Hands-on experience with prompt engineering and AI evaluation across safety-sensitive content.",
        ]}
        tags={["Prompt Engineering", "AI Evaluation", "Code Review"]}
      />
    ),
  },
  {
    title: "Mar – Dec 2022",
    content: (
      <Card
        role="Frontend Developer"
        org="Pok.Business (Freelance)"
        period="Mar – Dec 2022"
        bullets={[
          "React + Flask web app for showcasing and selling NFTs with Panda Wallet and Bitcoin SV purchase flows.",
          "Launch generated ~100 BSV in the first week.",
        ]}
        tags={["React", "Flask", "Python", "Web3"]}
      />
    ),
    parallel: (
      <Card
        role="Vendee — Inventory & Payment App"
        org="Personal Project"
        link={{ label: "App Store", href: "#" }}
        bullets={[
          "React Native app for shared fridge inventory and payment management.",
          "Role-based admin features and secure phone-based authentication.",
          "Shipped to both App Store and Google Play.",
        ]}
        tags={["React Native", "iOS", "Android", "Firebase"]}
        screenshots={[
          { alt: "Inventory" },
          { alt: "Payment" },
        ]}
      />
    ),
  },
  {
    title: "2022 – Present",
    content: (
      <Card
        role="Teaching Assistant"
        org="Technical University of Denmark"
        period="Feb 2023 – Jan 2026"
        bullets={[
          "Introductory Programming (Java), Introduction to Programming (Python).",
          "UX & Mobile App Development — Swift, Kotlin, KMP, Flutter.",
        ]}
        tags={["Java", "Python", "Swift", "Kotlin", "Flutter"]}
      />
    ),
    parallel: (
      <Card
        role="Fullstack Grocery Webshop"
        org="Academic Project"
        link={{ label: "Source", href: "#" }}
        bullets={[
          "Frontend with React, TypeScript, and Vue.js — product listing, stock management, upselling.",
          "Node.js + MariaDB backend behind an Apache reverse proxy.",
        ]}
        tags={["React", "TypeScript", "Vue.js", "Node.js", "MariaDB"]}
        screenshots={[
          { alt: "Product listing" },
          { alt: "Admin panel" },
        ]}
      />
    ),
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export function TimelineDemo() {
  return (
    <div
      className="min-h-screen w-full bg-[#F5F5F7]"
      style={{ fontFamily: "'Raleway', sans-serif" }}
    >
      <div className="max-w-3xl mx-auto px-6 py-20">

        {/* ── Hero ── */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-[11px] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Open to opportunities
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.05)}
          className="text-[42px] md:text-6xl font-bold text-[#1D1D1F] tracking-tight leading-none mb-2"
        >
          Jakob Jacobsen
        </motion.h1>

        <motion.p
          {...fadeUp(0.1)}
          className="text-lg md:text-xl text-[#5E50E8] font-medium mb-5"
        >
          Software Engineer · AI & Full-Stack
        </motion.p>

        <motion.p
          {...fadeUp(0.15)}
          className="text-[#6E6E73] text-base leading-relaxed max-w-xl mb-8"
        >
          Building enterprise systems, digital workflows, and modern software
          applications. Experienced in .NET, Dynamics 365, Azure, and full-stack
          development with a focus on AI tooling and prompt engineering.
        </motion.p>

        {/* Contact row */}
        <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-4 mb-10">
          {[
            { icon: MapPin, label: "Kongens Lyngby, Denmark", href: undefined },
            { icon: Mail, label: "jacobsen.js@hotmail.com", href: "mailto:jacobsen.js@hotmail.com" },
            { icon: Github, label: "GitHub", href: "#" },
            { icon: Linkedin, label: "LinkedIn", href: "#" },
          ].map(({ icon: Icon, label, href }) =>
            href ? (
              <a key={label} href={href}
                className="flex items-center gap-1.5 text-[#6E6E73] hover:text-[#5E50E8] transition-colors text-sm cursor-pointer">
                <Icon size={13} />
                {label}
              </a>
            ) : (
              <span key={label} className="flex items-center gap-1.5 text-[#6E6E73] text-sm">
                <Icon size={13} />
                {label}
              </span>
            )
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div {...fadeUp(0.25)} className="flex gap-3 mb-20">
          <button className="px-5 py-2 rounded-xl bg-[#5E50E8] hover:bg-[#4d40d4] text-white text-sm font-medium transition-colors duration-200 cursor-pointer shadow-sm">
            Download CV
          </button>
          <button className="px-5 py-2 rounded-xl bg-white border border-[#D2D2D7] hover:border-[#5E50E8]/40 text-[#1D1D1F] text-sm font-medium transition-colors duration-200 cursor-pointer shadow-sm">
            View Projects
          </button>
        </motion.div>

        {/* ── Divider ── */}
        <div className="h-px bg-[#D2D2D7] mb-16" />

        {/* ── Tech Stack ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-16"
        >
          <h2 className="text-xs font-semibold text-[#6E6E73] uppercase tracking-widest mb-8">
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {skills.map((group) => (
              <div key={group.category}>
                <p className="text-[11px] font-semibold text-[#1D1D1F] uppercase tracking-wider mb-2.5">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#E5E5EA] text-[#3A3A3C] text-xs shadow-sm hover:border-[#5E50E8]/40 hover:text-[#5E50E8] transition-colors duration-200 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Education ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-16"
        >
          <h2 className="text-xs font-semibold text-[#6E6E73] uppercase tracking-widest mb-6">
            Education
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
              <p className="text-[#1D1D1F] font-semibold text-sm mb-0.5">B.Eng. Software Technology</p>
              <p className="text-[#5E50E8] text-xs font-medium mb-3">Technical University of Denmark</p>
              <p className="text-[#6E6E73] text-xs mb-1">Aug 2022 – Jan 2026 · Copenhagen, Denmark</p>
              <p className="text-[#3A3A3C] text-xs leading-relaxed">
                Software design, implementation, testing, and enterprise systems.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
              <p className="text-[#1D1D1F] font-semibold text-sm mb-0.5">International Exchange Semester</p>
              <p className="text-[#5E50E8] text-xs font-medium mb-3">University of Florida</p>
              <p className="text-[#6E6E73] text-xs mb-1">Aug – Dec 2023 · Gainesville, FL, USA</p>
              <p className="text-[#3A3A3C] text-xs leading-relaxed">
                Academic exchange as part of DTU's international programme.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Divider ── */}
        <div className="h-px bg-[#D2D2D7] mb-16" />

        {/* ── Career Timeline ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-xs font-semibold text-[#6E6E73] uppercase tracking-widest mb-10">
            Career Journey
          </h2>
          <Timeline data={timelineData} />
        </motion.section>

        {/* ── Footer ── */}
        <div className="mt-20 pt-8 border-t border-[#D2D2D7]">
          <p className="text-[#C7C7CC] text-xs text-center">
            Jakob Suradhet Jacobsen · +45 42 17 72 76 · Kongens Lyngby, Denmark
          </p>
        </div>

      </div>
    </div>
  );
}
