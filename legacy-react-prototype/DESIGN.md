---
name: SkillBridge Academic Hub
colors:
  surface: '#ffffff'
  surface-dim: '#f1f5f9'
  surface-bright: '#ffffff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8fafc'
  surface-container: '#f1f5f9'
  surface-container-high: '#e2e8f0'
  surface-container-highest: '#cbd5e1'
  on-surface: '#0f172a'
  on-surface-variant: '#64748b'
  inverse-surface: '#1e293b'
  inverse-on-surface: '#f8fafc'
  outline: '#e2e8f0'
  outline-variant: '#cbd5e1'
  surface-tint: '#2563eb'
  primary: '#2563eb'
  on-primary: '#ffffff'
  primary-container: '#dbeafe'
  on-primary-container: '#1e40af'
  inverse-primary: '#93c5fd'
  secondary: '#0f172a'
  on-secondary: '#ffffff'
  secondary-container: '#f1f5f9'
  on-secondary-container: '#334155'
  tertiary: '#10b981'
  on-tertiary: '#ffffff'
  tertiary-container: '#d1fae5'
  on-tertiary-container: '#065f46'
  error: '#ef4444'
  on-error: '#ffffff'
  error-container: '#fee2e2'
  on-error-container: '#991b1b'
  background: '#f8f9ff'
  on-background: '#0f172a'
  accent-indigo: '#6366f1'
  accent-amber: '#f59e0b'
  accent-purple: '#8b5cf6'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.375rem
  DEFAULT: 0.75rem
  md: 1rem
  lg: 1.25rem
  xl: 1.5rem
  full: 9999px
spacing:
  section-gap-desktop: 80px
  section-gap-mobile: 48px
  grid-gutter: 24px
  container-max: 1280px
  base-unit: 8px
---

## Brand & Style

SkillBridge connects verified university students with local MSMEs (UMKM) for real-world project collaborations, verified digital credentials, and micro-stipends.

The visual style is **Modern Academic Bento**, blending high-trust enterprise clarity with vibrant, engaging interactivity. 

**Core Design Principles:**
- **High-Trust Cleanliness:** Crisp white container surfaces (`#ffffff`) over a soft cool background (`#f8f9ff`) with subtle borders (`#e2e8f0`).
- **Data-Dense Bento Grids:** Modular information cards with stat pills, progress bars, and high-contrast badges.
- **Vibrant Functional Accents:** Royal Blue (`#2563eb`) for primary actions, Emerald Green (`#10b981`) for completed states & verified badges, Amber (`#f59e0b`) for active milestones, and Indigo (`#6366f1`) for AI talent matcher scores.

## Colors

- **Primary (`#2563eb`):** SkillBridge Blue. Used for primary CTAs, active tab indicators, and key branding.
- **Secondary (`#0f172a`):** Deep Slate Navy. Used for bold headlines, strong structural elements, and high-contrast badges.
- **Background (`#f8f9ff`):** Soft luminous lavender-gray that gives depth to crisp white bento tiles.
- **Accents:**
  - Emerald (`#10b981`): Verification checkmarks, approved application badges, and 100% completion indicators.
  - Amber (`#f59e0b`): High-priority deadlines, review stars, and stipend highlights.
  - Indigo (`#6366f1`): Gemini AI Match compatibility score pills.

## Typography

The interface uses **Inter** throughout for ultra-clean readability at all scales:
- **Headlines (`display-hero`, `headline-lg`):** Bold, tightly tracked titles for page headers and dashboard summaries.
- **Card Titles & Sections (`title-lg`, `headline-md`):** Clear 16–20px bold headings.
- **Body (`body-lg`, `body-md`):** High legibility text for project briefs, student bios, and messages.
- **Micro-labels (`label-caps`):** 11px uppercase bold labels for metric categories (e.g. `PORTFOLIO SCORE`, `PROJECTS COMPLETED`).

## Layout & Components

- **Bento Grid Cards:** Rounded corners (`24px` / `rounded-3xl`), border `1px solid #e2e8f0`, soft hover elevation.
- **Stat Badges:** Dual-line chips with a bold numerical score on top and a micro-label underneath.
- **Project Cards:** Card header with UMKM logo, category tag, duration, title, description preview, and bottom action bar with stipend and "Apply" or "View" button.
- **Candidate Cards:** Circular avatar, name, verified university badge, 2-column stats (Portfolio Score & Completed Projects), skill chips, and "Invite" / "AI Match" buttons.
- **Workspace Chat:** Two-pane split with conversation sidebar and active project message stream with author avatars and status timestamps.
