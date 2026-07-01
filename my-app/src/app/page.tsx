"use client";

import { useState } from "react";
import { Sun, Moon, Mail, Linkedin, Github, MapPin } from "lucide-react";
import { AuroraBackground } from "@/components/aurora-background";
import { BioTab } from "@/components/bio-tab";
import { JourneyTab } from "@/components/journey-tab";
import { HomeTab } from "@/components/home-tab";

// ── Tabs ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "home", label: "Home" },
  { id: "bio", label: "Bio" },
  { id: "journey", label: "Resume / Journey" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ── Contact strip ─────────────────────────────────────────────────────────────
function ContactStrip({ isDark }: { isDark: boolean }) {
  const bg = isDark ? "rgba(10,10,15,0.90)" : "rgba(248,248,252,0.92)";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textPrimary = isDark ? "#F0F0F5" : "#0D0D18";
  const textMuted = isDark ? "#5A5A70" : "#9090A8";
  const linkColor = isDark ? "#A0A0B0" : "#52526A";

  return (
    <footer
      style={{
        background: bg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: `1px solid ${border}`,
        padding: "20px 24px",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* Left: tagline */}
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            color: textPrimary,
            margin: 0,
            flexShrink: 0,
          }}
        >
          Let&apos;s build something.
        </p>

        {/* Center: contact links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {[
            {
              icon: <Mail size={13} />,
              label: "jacobsen.js@hotmail.com",
              href: "mailto:jacobsen.js@hotmail.com",
            },
            {
              icon: <Linkedin size={13} />,
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/jakob-jacobsen-679732b1/",
            },
            {
              icon: <Github size={13} />,
              label: "GitHub",
              href: "https://github.com/Sezio27",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={item.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "999px",
                background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                border: `1px solid ${border}`,
                fontFamily: "'Raleway', sans-serif",
                fontSize: "12px",
                color: linkColor,
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#5E50E8";
                e.currentTarget.style.color = "#5E50E8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = border;
                e.currentTarget.style.color = linkColor;
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Right: location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontFamily: "'Raleway', sans-serif",
            fontSize: "12px",
            color: textMuted,
            flexShrink: 0,
          }}
        >
          <MapPin size={12} />
          <span>Kongens Lyngby, Denmark</span>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const headerBg = isDark ? "rgba(10,10,15,0.85)" : "rgba(248,248,252,0.85)";
  const headerBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const logoTextColor = isDark ? "#F0F0F5" : "#0D0D18";
  const tabInactiveText = isDark ? "#5A5A70" : "#9090A8";
  const pillBarBg = isDark ? "rgba(17,17,24,0.80)" : "rgba(255,255,255,0.80)";
  const pillBarBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const toggleBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const toggleColor = isDark ? "#F0F0F5" : "#0D0D18";

  return (
    <div className={isDark ? "dark" : ""} style={{ minHeight: "100vh" }}>
      {/* Aurora — always rendered behind everything */}
      <AuroraBackground isDark={isDark} />

      {/* ── Fixed header ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: headerBg,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: `1px solid ${headerBorder}`,
          height: "56px",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 24px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* Left: JJ logo + name */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #5E50E8 0%, #38BDF8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                JJ
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: logoTextColor,
                transition: "color 0.3s ease",
              }}
            >
              Jakob Jacobsen
            </span>
            {/* Available dot */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#22C55E",
                  display: "inline-block",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "10px",
                  color: "#22C55E",
                  fontWeight: 500,
                  display: "none",
                }}
                className="sm:inline"
              >
                Open to opportunities
              </span>
            </div>
          </div>

          {/* Center: Pill tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              background: pillBarBg,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: `1px solid ${pillBarBorder}`,
              borderRadius: "999px",
              padding: "3px",
              transition: "background 0.3s ease, border-color 0.3s ease",
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-label={`Switch to ${tab.label} tab`}
                  style={{
                    padding: "5px 16px",
                    borderRadius: "999px",
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: "13px",
                    color: isActive ? "#FFFFFF" : tabInactiveText,
                    background: isActive
                      ? "linear-gradient(135deg, #5E50E8 0%, #38BDF8 100%)"
                      : "transparent",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxShadow: isActive ? "0 1px 8px rgba(94,80,232,0.35)" : "none",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right: dark/light toggle + mail icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <a
              href="mailto:jacobsen.js@hotmail.com"
              aria-label="Send email"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: toggleBg,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: toggleColor,
                textDecoration: "none",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#5E50E8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = toggleColor;
              }}
            >
              <Mail size={14} />
            </a>
            <button
              onClick={() => setIsDark((d) => !d)}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: toggleBg,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: toggleColor,
                transition: "background 0.2s ease, color 0.2s ease",
              }}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Content area ── */}
      <div style={{ paddingTop: "56px", position: "relative", zIndex: 2, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ flex: 1 }}>
          {activeTab === "home" && <HomeTab isDark={isDark} />}
          {activeTab === "bio" && <BioTab isDark={isDark} />}
          {activeTab === "journey" && <JourneyTab isDark={isDark} />}
        </div>

        {/* ── Persistent contact strip (all tabs) ── */}
        <ContactStrip isDark={isDark} />
      </div>
    </div>
  );
}
