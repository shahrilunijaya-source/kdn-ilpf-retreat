---
version: "1.0"
name: iLPF v2
description: "Light-mode regulatory SaaS for Malaysia's Pejabat Penapisan Filem (PPF) under KDN. Brand concept: The Clear Frame — Built to decide. Designed to deliver. Authoritative but not bureaucratic. Cinematic in spirit, SaaS in execution. Think Linear or Notion, not government form. Primary language: Bahasa Malaysia. Light-mode first, desktop-first. Single typeface (Poppins) throughout. Electric Teal is the workhorse; Spotlight Orange is the spotlight (10% max of any screen). Signature element: a small colored dot after key brand moments."

colors:
  primary: "#00B8A9"
  primary-deep: "#003D3A"
  primary-hover: "#00A89A"
  primary-muted: "rgba(0,184,169,0.12)"
  accent: "#FF6B35"
  accent-muted: "#FFF0EA"

  ink: "#0A0E13"
  ink-muted: "#374151"
  ink-subtle: "#6B7280"
  ink-inverse: "#FFFFFF"

  canvas: "#FAFAF7"
  surface-1: "#FFFFFF"
  surface-2: "#F3F4F6"
  surface-pine: "#003D3A"
  surface-pine-light: "#004D49"

  hairline: "#E4E7EB"
  hairline-strong: "#D1D5DB"
  hairline-pine: "rgba(255,255,255,0.12)"

  semantic-success: "#059669"
  semantic-warning: "#D97706"
  semantic-error: "#DC2626"
  semantic-info: "#2563EB"

  status-pending: { bg: "#FEF3C7", color: "#92400E" }
  status-review:  { bg: "#DBEAFE", color: "#1E40AF" }
  status-approved: { bg: "#D1FAE5", color: "#065F46" }
  status-rejected: { bg: "#FEE2E2", color: "#991B1B" }
  status-cert: { bg: "#EDE9FE", color: "#5B21B6" }

typography:
  fontFamily: "Poppins, system-ui, sans-serif"
  note: "Poppins exclusively. No other typefaces. Hierarchy via weight contrast only."

  display-xl:
    fontFamily: Poppins
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -2px

  display-lg:
    fontFamily: Poppins
    fontSize: 44px
    fontWeight: 700
    lineHeight: 1.07
    letterSpacing: -1.5px

  display-md:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -1px

  headline:
    fontFamily: Poppins
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.5px

  card-title:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.3px

  label:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2

  body:
    fontFamily: Poppins
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6

  body-sm:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5

  caption:
    fontFamily: Poppins
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    note: "13px minimum — never smaller"

  eyebrow:
    fontFamily: Poppins
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.08em
    textTransform: uppercase

spacing:
  base: 4px
  scale: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128]
  card-padding: 24px
  card-padding-lg: 32px
  section-gap: 64px
  component-gap: 24px
  note: "Generous whitespace is a brand value. More is better."

radius:
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  pill: 999px
  note: "12-20px sweet spot. Soft, not bubbly."

shadows:
  note: "Functional only. No decorative shadows."
  focus: "0 0 0 3px rgba(0,184,169,0.25)"
  card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)"
  elevated: "0 4px 16px rgba(0,0,0,0.08)"

borders:
  default: "1px solid #E4E7EB"
  thin: "0.5px solid #E4E7EB"
  note: "Prefer thin 0.5px. No heavy outlines."

components:
  brand-dot:
    description: "Signature micro-element — small filled circle after key brand moments."
    sizes: [6px, 8px, 10px]
    teal: "#00B8A9"
    orange: "#FF6B35"
    usage: "After iLPF wordmark, after decisive statements (Diluluskan.), as status/bullet markers"

  button-primary:
    background: "#00B8A9"
    color: "#FFFFFF"
    font: "500 14px Poppins"
    padding: "10px 20px"
    borderRadius: 10px
    hover: "#00A89A"
    focus-ring: "0 0 0 3px rgba(0,184,169,0.25)"

  button-secondary:
    background: transparent
    color: "#00B8A9"
    border: "1px solid #00B8A9"
    font: "500 14px Poppins"
    padding: "10px 20px"
    borderRadius: 10px

  button-pine:
    background: "#003D3A"
    color: "#FFFFFF"
    font: "500 14px Poppins"
    padding: "10px 20px"
    borderRadius: 10px

  card:
    background: "#FFFFFF"
    border: "1px solid #E4E7EB"
    borderRadius: 16px
    padding: 24px
    shadow: "0 1px 3px rgba(0,0,0,0.06)"

  input:
    background: "#FFFFFF"
    border: "1px solid #E4E7EB"
    borderRadius: 10px
    padding: "10px 14px"
    font: "400 14px Poppins"
    focus-border: "#00B8A9"
    focus-ring: "0 0 0 3px rgba(0,184,169,0.15)"
    placeholder-color: "#9CA3AF"

  badge:
    borderRadius: 999px
    padding: "3px 10px"
    font: "600 11px Poppins"
    textTransform: uppercase
    letterSpacing: 0.04em

  eyebrow-tag:
    description: "Section label pill — e.g. Untuk Pengedar Filem with dot"
    font: "600 11px Poppins"
    letterSpacing: 0.08em
    textTransform: uppercase

  nav-header:
    background: "#003D3A"
    height: 56px
    logo-color: "#FFFFFF"
    link-color: "rgba(255,255,255,0.8)"
    link-active-color: "#FFFFFF"
    note: "Brand lockup: iLPF wordmark + agency name two-line right of logo"

  split-hero:
    description: "Auth/landing split — dark pine left panel, light right panel"
    left-background: "#003D3A"
    left-padding: 64px
    right-background: "#FAFAF7"
    right-padding: 64px
    grid: "1fr 1fr"
    min-height: 100vh

  stat-card:
    background: "#FFFFFF"
    border: "1px solid #E4E7EB"
    borderRadius: 16px
    value-font: "700 32px Poppins"
    label-font: "500 13px Poppins"
    label-color: "#6B7280"

  feature-icon:
    size: 36px
    borderRadius: 10px
    background: "rgba(0,184,169,0.15)"
    color: "#00B8A9"
    icon-size: 18px

dark-surface:
  background: "#003D3A"
  text: "#FFFFFF"
  text-muted: "rgba(255,255,255,0.7)"
  text-subtle: "rgba(255,255,255,0.45)"
  teal-on-pine: "#00B8A9"
  border: "rgba(255,255,255,0.12)"
  note: "Used for nav, hero left panel, login left, feature highlights"

patterns:
  layout:
    - "Card-based with generous whitespace"
    - "Desktop-first, mobile-responsive"
    - "Top nav for public portal, sidebar for app workspace"
    - "Split-panel (dark pine left / light right) for auth pages"
    - "Frame motif from film aspect ratios in image crops and hero sections"

  forbidden:
    - "NO decorative gradients"
    - "NO film cliches — no clapperboards, reels, popcorn"
    - "NO heavy drop shadows"
    - "NO multiple typefaces"
    - "Orange never exceeds 10% of any screen"
    - "NO dense government-style forms — break into steps"
    - "NO v2 in the logo mark"

  tone:
    language: "Bahasa Malaysia primary, English secondary"
    personality: "Direct, calm, precise, confident"
    style: "Short sentences. Decisive. Never apologetic."
    good:
      - "Hantar permohonan. Kami akan semak."
      - "3 permohonan menunggu. Anggaran 18 minit."
      - "Diluluskan. Klasifikasi P13."
    bad:
      - "Sila lengkapkan borang permohonan anda untuk diproses oleh pegawai."
      - "Terdapat 3 permohonan yang sedang menunggu untuk disemak."

  icons:
    library: Lucide
    style: "Outline, 1.5px stroke"
    sizes: "16px UI / 20px cards / 24px features"

brand:
  logo-variants:
    primary: "iLPF wordmark in Poppins Bold + teal signature dot"
    compact: "Lowercase i in rounded square — favicons and app icons"
    full: "iLPF + Lembaga Penapisan Filem Malaysia descriptor"
  logo-note: "Works white-on-dark and dark-on-white. No v2 in the mark."
  classification-marks: "U, P13, 18 marks are NOT part of this brand — separate visual language"

css-variables:
  "--teal": "#00B8A9"
  "--teal-700": "#00968A"
  "--pine-900": "#003D3A"
  "--paper": "#FAFAF7"
  "--ink": "#0A0E13"
  "--gray-50": "#F9FAFB"
  "--gray-100": "#F3F4F6"
  "--gray-200": "#E5E7EB"
  "--gray-300": "#D1D5DB"
  "--gray-400": "#9CA3AF"
  "--gray-500": "#6B7280"
  "--gray-600": "#4B5563"
  "--gray-700": "#374151"
  "--orange-50": "#FFF7ED"
  "--orange-600": "#EA580C"
  "--font-sans": "Poppins, system-ui, sans-serif"
