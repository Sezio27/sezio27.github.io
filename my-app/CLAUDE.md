# Jakob Jacobsen — Portfolio CV · CLAUDE.md

This file is automatically read by every Claude Code session and subagent working on this project.

---

## Project Overview

A personal CV/portfolio website for **Jakob Suradhet Jacobsen**, a software engineer based in Kongens Lyngby, Denmark. BEng Software Technology graduate from DTU (graduated January 2026). Built with Next.js + shadcn + Tailwind + TypeScript.

**Live dev server:** `http://localhost:3000`
**Run:** `cd C:/Projects/First/my-app && npm run dev`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, `"use client"`) |
| UI Library | shadcn/ui (Nova preset, Radix UI) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript (strict) |
| Animation | Framer Motion 12 |
| 3D/WebGL | Three.js 0.183 |
| Icons | Lucide React |
| Fonts | Raleway (UI) + Inter (numbers only) |

---

## Design System — Cupertino / Apple-Inspired

### Colors
```
Background:   #F5F5F7  (light) / #000000 (dark)
Primary Blue: #0071E3
Text Primary: #1D1D1F  (light) / #F5F5F7 (dark)
Text Muted:   #6E6E73
White Cards:  #FFFFFF  (light) / #1C1C1E (dark)
Border:       rgba(0,0,0,0.06) (light) / rgba(255,255,255,0.08) (dark)
```

### Track Colors (Journey timeline)
```
Full-time:        #0071E3  (blue)
Personal Project: #30D158  (green)
Freelance:        #FF9500  (orange)
Part-time:        #BF5AF2  (purple)
```

### Typography
- **Raleway** — all UI text. Weights: 100 (thin decorative), 300 (light), 400 (body), 600 (semibold headings), 700 (bold)
- **Inter** — numbers only (dates, stats, durations)
- Border radius: 16px (cards), 12px (pills/badges), 8px (small elements)
- Soft shadows: `0 2px 12px rgba(0,0,0,0.06)` (light), `0 4px 24px rgba(0,0,0,0.4)` (dark)

### CSS Custom Classes (globals.css)
```
.glass-card        → white card, 16px radius, soft shadow
.glass-button      → outlined pill button
.primary-button    → blue filled pill button
.gradient-text     → blue gradient text
.skill-badge       → small tinted pill (per category color)
.divider           → subtle horizontal rule
.float-animation   → gentle vertical float loop
.geist-font        → Raleway font-family
.inter-font        → Inter font-family
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                         ← Main page: 3-tab system (Home/Bio/Journey)
│   └── globals.css                      ← Design tokens, custom classes, dark mode
├── components/
│   ├── aurora-background.tsx            ← Three.js WebGL aurora shader
│   ├── bio-tab.tsx                      ← Bio tab: Summary + Tech Stack + Education
│   ├── journey-tab.tsx                  ← Journey tab: Parallel timeline
│   ├── timeline-demo.tsx                ← Home tab CV timeline (legacy, partially used)
│   └── ui/
│       ├── starfall-portfolio-landing.tsx  ← Home tab hero/projects section
│       └── timeline.tsx                    ← Base timeline component
public/
.claude/
├── agents/                              ← Subagent definitions (YOU ARE HERE)
│   ├── design-specialist.md
│   ├── frontend-builder.md
│   ├── code-reviewer.md
│   ├── content-writer.md
│   └── recruiter-critic.md
└── skills/                             ← ui-ux-pro-max skill
```

---

## Page Architecture (page.tsx)

```tsx
// 3 tabs: "home" | "bio" | "journey"
// Fixed header: JJ logo | pill tabs | dark/light toggle (Moon/Sun)
// AuroraBackground always rendered at z-index 0 (Three.js WebGL)
// Content at z-index 2, pt-[56px]
// isDark state drives: body class="dark", aurora overlay, card styles
```

### Tab Contents
- **Home** → `<PortfolioPage>` (hero + project cards + stats row)
- **Bio** → `<BioTab>` (Professional Summary + Tech Stack grid + Education cards)
- **Journey** → `<JourneyTab>` (Era-based parallel timeline with track colors)

---

## Jakob's Full CV Data (Source of Truth)

### Personal
- **Full Name:** Jakob Suradhet Jacobsen
- **Email:** jacobsen.js@hotmail.com
- **Mobile:** +45 42 17 72 76
- **Location:** Kongens Lyngby, Denmark
- **LinkedIn:** https://www.linkedin.com/in/jakob-jacobsen-679732b1/
- **GitHub:** https://github.com/Sezio27

### Professional Summary (from CV)
> Software engineer with experience developing enterprise systems, digital workflows, and modern software applications in collaborative team environments. Strong background in software design, implementation, testing, and maintainability, with hands-on experience in .NET, Microsoft Dynamics 365, Azure, APIs, integrations, and reliable software development. Experienced in prompt engineering, AI evaluation, and the use of AI tools in development workflows and user-facing features.

### Education
- **BEng Software Technology** — Technical University of Denmark (DTU), Aug 2022 – Jan 2026 ✅ GRADUATED
- **International Academic Exchange Semester** — University of Florida (UF), Gainesville FL, Aug 2023 – Dec 2023

### Technical Skills (exact from CV)
- **Programming:** C# ★, Python ★, JavaScript ★, TypeScript, Java, Swift, Kotlin, Dart, SQL
- **App & Web:** SwiftUI, React, React Native, Flutter, Flask, Node.js, Jetpack Compose, KMP, Vite, Vue, Bootstrap, HTML, CSS
- **Data:** SQL Server, MariaDB, Firebase/Firestore, Core Data
- **Dev Tools:** Azure DevOps ★, Git, Gradle, JUnit, Postman, Apache2, SonarQube, VS Code, Eclipse, Android Studio, Xcode
- **Microsoft & Cloud:** .NET ★, Microsoft Dynamics 365 ★, Azure ★, REST APIs ★, CI/CD ★, Ocelot API Gateway
- **AI & Automation:** Prompt engineering ★, OpenAI API, AI-assisted development, AI evaluation, workflow automation, GitHub Copilot, ChatGPT

(★ = bolded/primary skill in CV)

### Work Experience (newest first)

#### Netcompany — Software Developer
**Jan 2024 – Aug 2025** | Full-time
- Enterprise CRM and case management for public-sector clients (.NET, Microsoft Dynamics 365, Azure)
- Custom workflows and plugins for bulk letter distribution — template uploads, mail merge, e-Boks delivery, WorkZone journaling
- Modernized business-critical system for Danish Health Data Authority — database schema modernization, data migration, DTO mapping, external registry data integration
- Built API endpoints and integration components with certificate-based HTTP clients, validation, logging, Ocelot API Gateway
- Unit and integration tests, technical documentation, CI/CD in Azure DevOps
- Used internal AI tools for code assistance, technical analysis, documentation

#### Technical University of Denmark — Teaching Assistant
**Feb 2023 – Jan 2026** | Part-time
- Introductory Programming (Java)
- Introduction to Programming (Python)
- User Experience and Mobile Application Development (Swift, Kotlin, KMP, Flutter)

#### Outlier — Freelance AI Prompt Engineer & Reviewer
**May 2024 – Jan 2025** | Freelance
- Designed and iterated technical prompts for AI evaluation across code generation, debugging, reasoning, instruction-following
- Reviewed AI-generated code for correctness, edge cases, logic, and alignment with task requirements
- Built hands-on experience with prompt engineering and AI evaluation, including model behavior with safety-sensitive content

#### Pok.Business — Freelance Frontend Developer
**Mar 2022 – Dec 2022** | Freelance
- Responsive React web app for NFT showcase and sales, Python Flask backend
- Panda Wallet integration, Bitcoin SV purchase flows, animated user flows
- Launch generated ~100 BSV in first week

### Projects (newest first)

#### StoryLingo — AI-Powered iOS Language Learning App
**Jan 2026 – Present** | Personal Project
- SwiftUI iOS app with voice input, dynamic storytelling, multilingual assistance
- OpenAI API for story generation, adaptive responses, translation, image generation
- Prompt engineering for context-aware interactions across proficiency levels
- Core Data, MVVM, speech recognition, text-to-speech

#### Diploma Project — Flutter App
**Sep 2025 – Dec 2025** | DTU Academic Project | Grade: **12/12** (Danish top grade)
- GitHub: https://github.com/Sezio27/aftaler_og_regnskab
- Cross-platform Flutter app for a professional makeup artist: scheduling, calendar, client/service management, financial tracking
- Layered MVVM architecture, Firebase (Auth/Firestore/Storage), caching and paging

#### Web Application — Fullstack Development
**DTU Academic Project**
- GitHub: https://github.com/Sezio27/Backend-62597
- React + TypeScript + Vue.js frontend for a grocery webshop
- Node.js + MariaDB backend, Apache HTTP Server reverse proxy

#### Vendee — Android/iOS App
**Published on App Store + Google Play**
- YouTube demo: https://www.youtube.com/watch?v=pk6S5jtLzec
- App Store: https://apps.apple.com/dk/app/vendee-virtual-vending-kiosk/id6446119022?l=da
- Google Play: https://play.google.com/store/apps/details?id=com.vendeeLLC.vendee
- React Native app for inventory and payment management for shared fridges (dormitories)
- Role-based user/admin features, secure phone-based authentication

#### Kind — Android App
- GitHub: https://github.com/sngp32/Kind
- Subscription-based charity donation app in Kotlin
- MVVM, Jetpack Compose, Firebase Realtime Database

#### Memorizer — Android App
- GitHub: https://github.com/moorekevin/DTU-SoftProj-Memorizer
- Kotlin Android memory games app (DTU Software Project)

---

## Component Conventions

### New Components
- Always `"use client"` at top
- Accept `isDark: boolean` prop for theme awareness
- Use Framer Motion `initial/whileInView` for scroll animations
- Wrap scroll animations in `<motion.div viewport={{ once: true }}>`
- Use `style={{ fontFamily: "'Raleway', sans-serif" }}` for text
- Use `style={{ fontFamily: "'Inter', sans-serif" }}` for numbers/dates

### Styling Rules
- Never use inline `style={{ background }}` for colors — use Tailwind classes
- Cards: `rounded-2xl shadow-sm border` with conditional dark/light classes
- Prefer `clsx` / `cn()` for conditional class merging
- No `px-` wider than `px-6` on mobile, add `md:px-8` for desktop

### TypeScript
- Always type props with explicit interfaces
- No `any` types — use `unknown` or specific types
- Import types with `import type { ... }`

---

## Key Files Reference

| File | Purpose | Edit Carefully |
|------|---------|----------------|
| `src/app/page.tsx` | Tab system, dark mode state | Yes — central state |
| `src/app/globals.css` | Design tokens, custom classes | Yes — affects everything |
| `src/components/aurora-background.tsx` | WebGL Three.js shader | Yes — complex WebGL |
| `src/components/journey-tab.tsx` | Parallel timeline | Yes — complex layout |
| `src/components/bio-tab.tsx` | Bio content | Safe to edit |
| `src/components/ui/starfall-portfolio-landing.tsx` | Home hero | Safe to edit |

---

## Development Notes

- `npm run dev` starts on port 3000 (or next available if busy)
- `npm run build` to check for TypeScript/lint errors before deploying
- `npm run lint` uses ESLint with Next.js config
- Three.js aurora WebGL must clean up on unmount (already handled)
- Framer Motion animations use `viewport={{ once: true }}` to avoid re-triggering

---

## Backlog

- [ ] Replace screenshot placeholder cards with real project images
- [ ] Add real GitHub / LinkedIn URLs (currently `#` placeholders) — use URLs above
- [ ] Add contact section with email + phone
- [ ] Deploy to Vercel
- [ ] Add og:image meta tags for social sharing
- [ ] Mobile responsive audit (especially Journey parallel timeline)
- [ ] Add Vendee, Kind, Memorizer, Web App to projects section
