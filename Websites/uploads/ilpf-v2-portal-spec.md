# iLPF v2 Portal — Master Build Specification

**Project.** Public-facing portal for Malaysia's Lembaga Penapisan Filem (Pejabat Penapisan Filem, under KDN) — a complete revolution of the existing `ilpf.moha.gov.my`.

**For.** Claude Design (or any designer/builder) — paste, follow, ship.

**Reference brand.** iLPF v2 — *The Clear Frame* (Built to decide. Designed to deliver.)

**Reference pattern.** `jpph.myappsonline.net`, `jkptg.myappsonline.net` — Malaysian gov portals done right.

**Replaces.** `ilpf.moha.gov.my` — dated, form-heavy, hostile to users.

---

## How to use this document

Three layers, read in order:

1. **PART 1 — Master Prompt.** Paste verbatim into Claude Design as the opening message. Attach the iLPF logo and any photos when you have them.
2. **PART 2 — Structured Specification.** The full brief — site architecture, design tokens, components, content rules, accessibility, the brand system in builder-ready form.
3. **PART 3 — Page-by-Page Briefs.** One section per page with real Bahasa Malaysia copy in iLPF voice, layout structure, and component callouts. Hand these out one page at a time as you build.

**Placeholder convention.** Anywhere real data is needed but unavailable, the spec uses `[BRACKETED CAPS]` — e.g. `[NAMA PENGARAH PPF]`, `[KADAR FI - RUJUK PERATURAN 1984]`. Replace before launch.

---

# PART 1 — MASTER PROMPT

> Copy everything inside the fenced block below into Claude Design as your first message.

```
Build a sleek, modern public portal for iLPF v2 — Malaysia's Pejabat Penapisan Filem (PPF), under the Ministry of Home Affairs (KDN). This is a complete revolution of ilpf.moha.gov.my, which is dated and form-heavy. The new portal must feel like a serious tech product, not a government form.

REFERENCE FOR PATTERN AND FEEL
- Mirror the structure and quality of jpph.myappsonline.net and jkptg.myappsonline.net (Malaysian gov portals done right — clean cards, real dashboards, calm authority).
- Do NOT mirror their colors. Use the iLPF brand system below.

BRAND SYSTEM — "The Clear Frame"
Essence: "Built to decide. Designed to deliver." Authoritative but not bureaucratic. Cinematic in spirit, SaaS in execution. Think Linear or Notion, not government form.

Colors:
- Primary: Electric Teal #00B8A9 — CTAs, hero accents, the signature dot
- Primary Deep: Deep Pine #003D3A — headings, dark surfaces
- Pine Deep: #002624 — utility bar, footer
- Accent: Spotlight Orange #FF6B35 — alerts, status highlights (max 10% of any screen)
- Ink: #0A0E13 — body text
- Paper: Soft White #FAFAF7 — warm background, not sterile
- Pure white #FFFFFF — card surfaces
- Neutrals: #E4E7EB dividers, #6B7280 secondary text, #F4F5F2 muted backgrounds
- Status: Success #10B981, Warning #F59E0B, Danger #EF4444

Typography: Poppins exclusively (300/400/500/600/700/800). Build hierarchy through weight, never through different typefaces. Tight tracking on display sizes (-0.02em to -0.03em). 14px minimum body, 1.6 line-height.

Signature element — the DOT: A small colored dot (teal or orange) appears after the iLPF wordmark and after decisive statements ("Diluluskan.", "Dihantar.", "Selesai."). This is the brand's micro-signature. Use it intentionally — not everywhere.

Visual language:
- Card-based layouts, generous whitespace
- Rounded corners: 10px buttons, 14px small cards, 20px main cards, 28px hero modules
- 1px borders (#E4E7EB), no heavy outlines
- Functional shadows only (focus rings, subtle hover lift)
- NO gradients, NO clapperboards/reels/popcorn clichés, NO film-strip borders
- Subtle "frame" motif from cinema aspect ratios — used sparingly in hero crops and image containers (16:9, 2.35:1 markers)

HERO TREATMENT (the wow factor)
Cinematic film grain + light streaks. Light mode.
- Background: soft white #FAFAF7 fading to pure white
- Three diagonal light beams drifting slowly across the canvas at -8° to -12°: one teal-tinted, one orange-tinted, one neutral. Each is a wide blurred linear-gradient (transparent → tinted → transparent), positioned absolute, animated on an 18-second loop with translateX drift.
- SVG fractal-noise overlay at ~6% opacity for film grain, animated with `steps(8)` for the authentic shimmer
- The hero text sits above this with confident left-alignment, Poppins Bold 64-88px, the signature dot after "iLPF"
- All CSS-only, GPU-accelerated, performant on mobile

TONE OF VOICE
- Primary language: Bahasa Malaysia
- Secondary: English (toggle in utility bar)
- Style: Short. Decisive. Never apologetic, never aggressive.
- Examples:
  ✅ "Hantar permohonan. Kami akan semak."
  ❌ "Sila lengkapkan borang permohonan anda untuk diproses."
  ✅ "3 permohonan menunggu. Anggaran 18 minit."
  ✅ "Diluluskan. Klasifikasi P13."
  ❌ "Permohonan anda telah berjaya diluluskan dengan klasifikasi P13."

SCOPE — DELIVER A FULL MULTI-PAGE PROTOTYPE
Multiple HTML files, fully navigable, sharing one stylesheet. Pages required:
1. Landing (/index.html)
2. Maklumat Korporat — hub + 6 sub-pages
3. Senarai Filem (with search + filters, ~20 sample rows)
4. Klasifikasi Filem (U / P12 / 13 / 16 / 18 explained visually)
5. Piagam Pelanggan (the service charter)
6. Dashboard Statistik (live-ticker style)
7. Kalkulator Yuran Tapisan (fee estimator)
8. FAQ (categorized, searchable)
9. Login — Pengedar Filem (with Daftar Akaun link)
10. Login — PPF / ALPF (with Permohonan ALPF Baru link)
11. Daftar Akaun Pengedar (multi-step registration form)
12. Permohonan ALPF Baru (multi-step application form)
13. Hubungi Kami

CONSTRAINTS
- Light mode first. Desktop-first, mobile-responsive (breakpoints: 1280, 1024, 768, 480).
- WCAG AA contrast. 14px minimum body. Visible focus states (3px teal ring).
- Real Bahasa Malaysia copy will be provided in the detailed brief — use verbatim, do not paraphrase.
- The classification marks (U, P12, 13, 16, 18) are visual chips — NOT part of the iLPF brand palette. Render them as neutral, geometric, official labels (rounded square, single-letter/number, monochrome with one signal color per chip).

START SEQUENCE
1. Confirm understanding of the brand concept and ask clarifying questions.
2. Generate the shared stylesheet first — design tokens, base components, hero animations.
3. Build the landing page — the centerpiece of the prototype.
4. Then proceed page by page, following the page-by-page briefs.
```

---


# PART 2 — STRUCTURED SPECIFICATION

## 2.1 Information Architecture

```
iLPF v2 Portal
│
├── Landing (/)
│   ├── Utility bar (BM/EN, OKU, contact, MyiLPF intranet)
│   ├── Sticky header (brand, nav, login dropdown)
│   ├── Hero (cinematic streaks + grain, primary CTAs)
│   ├── Hebahan strip (tabs: Pengumuman • Pemberitahuan • Peringatan)
│   ├── Live dashboard strip (4 ticking stats)
│   ├── Perkhidmatan Pantas (8 service cards)
│   ├── Klasifikasi teaser (U / P12 / 13 / 16 / 18 chips → link to detail)
│   ├── Piagam Pelanggan strip (5 commitments — STV, Bahan Publisiti, Pawagam, Perakuan A Pita, Iklan)
│   ├── FAQ teaser (top 5 questions → full page)
│   └── Footer
│
├── Maklumat Korporat (/profil)
│   ├── Mesej Pengarah PPF (/profil/mesej-pengarah)
│   ├── Latar Belakang (/profil/latar-belakang)
│   ├── Misi, Visi & Objektif (/profil/misi-visi-objektif)
│   ├── Peranan PPF (/profil/peranan)
│   ├── Carta Organisasi ALPF (/profil/carta-alpf)
│   └── Pengerusi (/profil/pengerusi)
│
├── Perkhidmatan
│   ├── Senarai Filem (/senarai-filem)
│   ├── Klasifikasi Filem (/klasifikasi)
│   ├── Kalkulator Yuran (/kalkulator)
│   └── Piagam Pelanggan (/piagam-pelanggan)
│
├── Statistik (/statistik)
├── FAQ (/faq)
├── Hubungi Kami (/hubungi)
│
└── Log Masuk
    ├── Pengedar Filem (/login/pengedar) → Daftar Akaun (/daftar/pengedar)
    └── PPF + ALPF (/login/pegawai) → Permohonan ALPF Baru (/permohonan-alpf)
```

## 2.2 Design Tokens (CSS variables)

```css
:root {
  /* Brand */
  --teal: #00B8A9;
  --teal-deep: #009A8D;
  --teal-50: #E6F8F6;
  --teal-100: #B8ECE6;
  --pine: #003D3A;
  --pine-deep: #002624;
  --orange: #FF6B35;
  --orange-soft: #FFE4D6;
  --ink: #0A0E13;
  --ink-70: rgba(10,14,19,0.7);
  --ink-50: rgba(10,14,19,0.5);
  --paper: #FAFAF7;
  --paper-pure: #FFFFFF;

  /* Neutrals */
  --gray-100: #F4F5F2;
  --gray-200: #E4E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;

  /* Status */
  --success: #10B981;
  --warning: #F59E0B;
  --danger:  #EF4444;
  --info:    #3B82F6;

  /* Radii */
  --r-xs: 6px;  --r-sm: 10px;  --r-md: 14px;
  --r-lg: 20px; --r-xl: 28px;  --r-full: 999px;

  /* Shadows — functional only */
  --shadow-sm: 0 1px 2px rgba(10,14,19,0.04);
  --shadow-md: 0 4px 12px rgba(10,14,19,0.06);
  --shadow-lg: 0 12px 32px rgba(10,14,19,0.08);
  --shadow-focus: 0 0 0 3px rgba(0,184,169,0.25);

  /* Type scale (clamp() for fluid sizing on display) */
  --fs-xs: 12px; --fs-sm: 13px; --fs-base: 15px;
  --fs-md: 17px; --fs-lg: 20px; --fs-xl: 24px;
  --fs-2xl: 32px; --fs-3xl: 44px; --fs-4xl: 64px; --fs-5xl: 88px;

  /* Spacing (4-base scale) */
  --sp-1: 4px;  --sp-2: 8px;   --sp-3: 12px;
  --sp-4: 16px; --sp-5: 24px;  --sp-6: 32px;
  --sp-7: 48px; --sp-8: 64px;  --sp-9: 96px; --sp-10: 128px;

  /* Layout */
  --container: 1280px;
  --container-narrow: 1080px;
}
```

## 2.3 Typography Roles

| Role | Family / Weight | Size | Tracking | Line-height | Use |
|---|---|---|---|---|---|
| Hero display | Poppins 700 | clamp(44px, 7vw, 88px) | -0.03em | 1.02 | Hero headline only |
| H1 | Poppins 700 | clamp(32px, 4vw, 44px) | -0.025em | 1.08 | Page titles |
| H2 | Poppins 600 | clamp(24px, 3vw, 32px) | -0.02em | 1.15 | Section titles |
| H3 | Poppins 600 | 24px | -0.01em | 1.25 | Card titles |
| H4 | Poppins 600 | 20px | normal | 1.3 | Sub-cards |
| Lede | Poppins 400 | 17px | normal | 1.55 | Hero/section intro |
| Body | Poppins 400 | 15px | normal | 1.6 | Default paragraph |
| Small | Poppins 400 | 13px | normal | 1.5 | Microcopy |
| Eyebrow | Poppins 600 | 12px | 0.12em UPPER | 1 | Section labels (teal) |
| Caption | Poppins 400 | 12px | normal | 1.4 | Footnotes, meta |
| Button | Poppins 500 | 13-15px | normal | 1 | All buttons |

## 2.4 Global Components

### 2.4.1 Utility bar (top-most, dark)
- Background `--pine-deep` (`#002624`), text `rgba(255,255,255,0.85)`, 36px tall.
- **Left:** Jata Negara icon (24px) — use `assets/Jata_MalaysiaV2.svg.png`. + `Portal Rasmi Pejabat Penapisan Filem • Kementerian Dalam Negeri`
- **Right:** `FAQ` `Hubungi` `Maklum Balas` `Peta Laman` `| BM / EN` `| OKU` `| MyiLPF Intranet →`
- Font 12px Poppins Medium. Hover: text turns `--teal`.

### 2.4.2 Header (sticky, glass)
- Background `rgba(250,250,247,0.85)`, `backdrop-filter: blur(20px) saturate(180%)`.
- Border-bottom: 1px `--gray-200`. Height 72px.
- **Brand lockup (left):** Two assets grouped side by side (`.co-brand`, gap 10px): (1) `assets/Jata_MalaysiaV2.svg.png` (42px, flat, no rounding); (2) `assets/logo-mark.svg` (height 36px, width auto, flat — no border-radius). Beside the mark: stacked text — `PEJABAT` line 1, `PENAPISAN FILEM` line 2 (Poppins 700, 10px, `--pine`, tracking 0.08em uppercase, flex-direction: column). No "iLPF." wordmark text — logo-mark.svg provides the wordmark. No brand divider line between Jata and iLPF mark.
- **Nav (center, desktop only):** `Utama` `Profil ▾` `Perkhidmatan ▾` `Statistik` `FAQ`. Active state: 2px teal underline. Nav centered via `margin: 0 auto` in flex container.
- **Right cluster:** `Hubungi` ghost button + `Log Masuk ▾` primary button (dropdown reveals two options: "Pengedar Filem" / "PPF & ALPF").
- **Mobile:** Hamburger toggle replaces nav at < 1024px.

### 2.4.3 Buttons

| Variant | BG | Text | Border | Use |
|---|---|---|---|---|
| `.btn-primary` | `--pine` | white | none | Primary action |
| `.btn-teal` | `--teal` | white | none | Hero CTA, brand moments |
| `.btn-ghost` | transparent | `--pine` | 1px `--gray-300` | Secondary |
| `.btn-orange` | `--orange` | white | none | Urgent/alert action |
| `.btn-icon` | white | inherit | 1px `--gray-200` | Square icon-only |

Padding: 11px 20px (default), 14px 24px (`.btn-lg`). Radius 10px. Hover: subtle 1px lift + darker bg. Focus: `--shadow-focus`.

### 2.4.4 Cards
- Base: white bg, 1px `--gray-200` border, 20px radius, 24px padding.
- Hover (on `.card-link`): border darkens to `--pine`, 2px lift, `--shadow-lg`. Transition 0.25s ease.
- No background gradients. Use subtle border + lift to indicate elevation.

### 2.4.5 Badges & Chips
- Pill shape, `--r-full`. 4×10px padding. 12px Poppins Medium.
- **Neutral:** `--gray-100` bg, `--gray-700` text.
- **Teal:** `--teal-50` bg, `--teal-deep` text — for "Diluluskan", "Aktif".
- **Orange:** `--orange-soft` bg, `--orange` text — for "Memerlukan tindakan".
- **Pulse dot variant:** 6px circle with `animation: pulse 2s ease-in-out infinite` — for "Live", "Dalam tinjauan".

### 2.4.6 Classification chips (the U/P12/13/16/18 marks)
These are NOT brand chips — they are **regulatory marks** rendered in a separate, official visual language:
- Square 56×56px, 12px radius, single-letter or two-character.
- Poppins 700, 22px, white text on a solid block of color:
  - **U** — `#10B981` (green) — "Umum"
  - **P12** — `#3B82F6` (blue) — "Bimbingan ibu bapa, 12+"
  - **13** — `#F59E0B` (amber) — "Bimbingan ibu bapa, 13+"
  - **16** — `#EF4444` (red) — "Belia, 16+"
  - **18** — `#0A0E13` (black) — "Dewasa, 18+"
- These never appear next to brand teal/orange to avoid visual confusion.

### 2.4.7 Form fields
- Label above input. Poppins 500 13px, `--gray-700`.
- Input: 44px tall, 1px `--gray-300` border, 10px radius, 12-16px padding, 15px Poppins Regular.
- Focus: border `--teal`, `--shadow-focus`.
- Error: border `--danger`, error text below in 12px `--danger`.
- Required marker: small `--orange` asterisk after label.

### 2.4.8 Hero (the wow)
Structure:
```html
<section class="pine-hero" id="main">
  <canvas id="ilpf-wave-bg" aria-hidden="true"></canvas>
  <div class="container">
    <!-- text + CTAs -->
  </div>
</section>
```

Background: WebGL wave animation on `<canvas id="ilpf-wave-bg">`. Canvas is `position: absolute; inset: 0; z-index: 1`. Container is `position: relative; z-index: 3`. Pseudo-elements `::before` (teal/orange radial glow overlays) and `::after` (SVG fractal noise, opacity 0.04, mix-blend-mode: screen) sit at `z-index: 2` between canvas and content.

WebGL shader (fragment): plasma wave lines. 9 lines per group (`linesPerGroup = 9`). Background gradient: `bgColor1 = vec4(0.06, 0.09, 0.16)` (dark navy) to `bgColor2 = vec4(0.12, 0.23, 0.37)`. Line color: `vec4(0.04, 0.45, 0.65)` (teal). Animation driven by `iTime` uniform, uses `overallSpeed = 0.2`, `warpAmplitude = 0.4`. Canvas resizes with `ResizeObserver` + `window.resize`. RAF loop with cleanup on unmount. Implemented as `React.useEffect` in `HeroPine` component in `js/landing.jsx`.

Performance: `prefers-reduced-motion` — consider pausing RAF. Canvas DPR capped at 2.

### 2.4.9 Hebahan tabs
- Three tabs side by side: `Pengumuman` (default active), `Pemberitahuan`, `Peringatan`.
- Tab style: 13px Poppins 500, 10px 16px padding, rounded pill. Active state: `background: var(--pine-900)` (#001E1C), `color: #fff`. Inactive: transparent bg, `--gray-600` text.
- Content area: list of 3-5 items per tab. Each item = horizontal card with date chip (e.g. "13 MAY"), title, 2-line snippet, "Baca →" link.

### 2.4.10 Live stat tiles
- Grid of 4 tiles. Each: white card, 20px radius, 24px padding.
- Inside: small eyebrow label (12px uppercase teal), large number (Poppins 700, 40px, `--pine`), pulse dot + "live" badge, delta vs last week below in 12px gray.
- Numbers tick using `Intl.NumberFormat('ms-MY')` and a CSS `tabular-nums` setting for stable width.

### 2.4.11 Footer
- Background `--pine-deep`. Text `rgba(255,255,255,0.7)`. 64px top padding.
- Top row: brand mark + tagline ("Pejabat Penapisan Filem Malaysia. Built to decide. Designed to deliver.")
- 4-column link grid: Profil / Perkhidmatan / Sumber / Pautan Luar.
- Bottom strip: Jata Negara + © 2026 KDN copyright + Dasar Privasi / Dasar Keselamatan / Pematuhan PPPA Bil.1/2025.

## 2.5 Iconography
- **Library:** Lucide icons (open-source, 24×24, 1.5px stroke).
- **Color:** inherits text color (`currentColor`). Default 18px in buttons, 20px in cards, 24px in feature blocks.
- **Banned:** filled icons, multi-color icons, anything with film clichés (clapperboards, reels, popcorn). Use abstract icons: `play-circle`, `shield-check`, `file-check`, `calculator`, `gavel`, `users`, `bar-chart-3`, `clock`, `search`, `chevron-right`, `arrow-up-right`.

## 2.6 Accessibility
- All interactive elements: visible focus ring (`--shadow-focus`).
- Min contrast 4.5:1 for body text, 3:1 for large text.
- Skip link "Langkau ke kandungan utama" at top, visible on focus.
- All images: meaningful `alt` text in Bahasa Malaysia.
- Form fields: `<label>` always present, `aria-required="true"` for required.
- OKU mode toggle in utility bar: switches to high-contrast palette (`--ink` body on `--paper-pure`, larger 16px base, removes grain/streaks).
- Reduce motion: respect `prefers-reduced-motion: reduce`.

## 2.7 Responsive Behavior
- **≥1280px:** Full layout, 4-col grids.
- **1024-1279:** Container shrinks, 3-col grids.
- **768-1023:** Nav collapses to hamburger, 2-col grids, hero text scales down.
- **<768:** Single-column, hero height drops to 70vh, stat tiles become 2×2.
- Forms: always single column on mobile, side-by-side fields stack.

## 2.8 File Structure (for the build)

```
ilpf-v2-portal/
├── index.html                       # Landing
├── profil/
│   ├── index.html                   # Maklumat Korporat hub
│   ├── mesej-pengarah.html
│   ├── latar-belakang.html
│   ├── misi-visi-objektif.html
│   ├── peranan.html
│   ├── carta-alpf.html
│   └── pengerusi.html
├── senarai-filem.html
├── klasifikasi.html
├── piagam-pelanggan.html
├── statistik.html
├── kalkulator.html
├── faq.html
├── hubungi.html
├── login/
│   ├── pengedar.html
│   └── pegawai.html
├── daftar/
│   └── pengedar.html
├── permohonan-alpf.html
└── assets/
    ├── styles.css                   # Single shared stylesheet
    ├── scripts.js                   # Tab switching, ticker, form steps
    ├── images/
    │   ├── logo-ilpf.svg
    │   ├── jata-negara.png
    │   └── pengarah.jpg             # [TO BE PROVIDED]
    └── favicon.svg
```

---


# PART 3 — PAGE-BY-PAGE BRIEFS

Each brief gives: route, purpose, layout in order, real Bahasa Malaysia copy to use verbatim, and component callouts. Hand these out one page at a time.

---

## 3.1 Landing — `/index.html`

**Purpose.** First impression. Communicate authority + modernity in 3 seconds. Route distributors and officers to the right place fast. Surface live activity to prove the system is alive.

**Layout in order.**

### 3.1.1 Utility bar
- Left: `Portal Rasmi Pejabat Penapisan Filem • Kementerian Dalam Negeri`
- Right: `FAQ` `Hubungi` `Maklum Balas` `Peta Laman` `|` `BM / EN` `|` `OKU` `|` `MyiLPF Intranet →`

### 3.1.2 Header
- Brand lockup left, nav center, `Hubungi` ghost + `Log Masuk ▾` primary right.

### 3.1.3 Hero
Full structure with copy:

> **Eyebrow:** PEJABAT PENAPISAN FILEM • SEJAK 1954
>
> **Headline (h-hero):**
> Tapisan filem Malaysia.
> Dibuat dengan jelas`•`
>
> *(The dot after "jelas" is teal, slightly larger — `.dot.dot--lg`)*
>
> **Lede:**
> Platform rasmi untuk semakan, klasifikasi, dan pensijilan filem di Malaysia. Dibangunkan untuk pengedar, stesen TV, dan Ahli Lembaga Penapisan Filem.
>
> **Primary CTA:** `Hantar Permohonan →` *(btn-teal btn-lg)*
> **Secondary CTA:** `Semak Senarai Filem` *(btn-ghost btn-lg)*
>
> **Below CTAs — micro-trust strip:**
> `🛡` Akta Penapisan Filem 2002 (Akta 620) • `⚡` Keputusan 5 hari bekerja • `🔒` Disahkan KDN

Background: cinematic streaks + grain per §2.4.8. Hero is left-aligned on desktop, center on mobile.

### 3.1.4 Hebahan strip (tabs)
Section eyebrow: `HEBAHAN TERKINI` (with teal dot after)
H2: `Pengumuman, pemberitahuan, peringatan.`

Three tabs. Each shows a stack of 4 items.

**Tab 1 — Pengumuman (active by default):**

| Date | Title | Snippet |
|---|---|---|
| 12 MAY 2026 | Pelancaran rasmi iLPF v2 | Sistem baharu kini beroperasi penuh. Akaun pengedar sedia dipindahkan. Log masuk seperti biasa. |
| 8 MAY 2026 | Pindaan Garis Panduan Penapisan Filem 2026 | Versi 2026 berkuat kuasa pada 1 Jun. Muat turun salinan penuh di portal. |
| 30 APR 2026 | Sesi taklimat industri — Mei 2026 | Pengedar filem dan stesen TV dijemput hadir taklimat sistem baharu pada 22 Mei di KDN Putrajaya. |
| 21 APR 2026 | Penyenaraian semula filem klasik untuk arkib negara | 47 filem Melayu klasik telah disenaraikan semula di bawah inisiatif Arkib Filem Negara. |

**Tab 2 — Pemberitahuan:**

| Date | Title | Snippet |
|---|---|---|
| 11 MAY 2026 | Penyelenggaraan sistem 15 Mei 2026, 11 malam – 5 pagi | Modul tapisan TV tidak akan dapat diakses sepanjang tempoh ini. Tiada kesan kepada permohonan sedia ada. |
| 5 MAY 2026 | Yuran tapisan dikemas kini berkuat kuasa 1 Julai 2026 | Rujuk Peraturan-Peraturan Penapisan (Fi) Filem 1984 pindaan 2026. Kalkulator yuran akan dikemas kini sebelum tarikh tersebut. |
| 2 MAY 2026 | Borang Permohonan ALPF kini dalam talian sepenuhnya | Tiada lagi borang kertas. Hantar permohonan dan lampiran terus melalui portal. |
| 24 APR 2026 | Waktu operasi sambutan Aidilfitri 2026 | Kaunter PPF di Putrajaya akan ditutup pada 1 dan 2 Mei. Penghantaran dalam talian beroperasi seperti biasa. |

**Tab 3 — Peringatan:**

| Date | Title | Snippet |
|---|---|---|
| 10 MAY 2026 | Hantar bahan publisiti sekurang-kurangnya 2 hari sebelum tayangan | Mengikut Piagam Pelanggan baharu, tempoh pemprosesan adalah 2 hari bekerja. Jangan tunggu hari terakhir. |
| 7 MAY 2026 | Pastikan filem yang dihantar adalah salinan master | Salinan rendah resolusi atau pratonton tidak akan dilayan. Rujuk panduan teknikal di FAQ. |
| 3 MAY 2026 | Sijil A wajib bagi setiap tayangan pawagam | Tiada Sijil A bermakna tiada tayangan. Semak status sijil sebelum hari tayangan. |
| 25 APR 2026 | Permit Filem Import diperlukan sebelum tapisan | Filem import tanpa permit tidak boleh ditapis. Mohon permit melalui Bahagian Kawalan Filem terlebih dahulu. |

### 3.1.5 Live dashboard strip
Section eyebrow: `STATISTIK HARI INI` (with pulse dot)
H2: `Sistem yang sentiasa hidup.`

4 tiles in a grid. Numbers tick gently every 8-15 seconds (small random increments).

| Eyebrow | Number | Sub-label | Delta |
|---|---|---|---|
| PERMOHONAN HARI INI | 47 | dalam talian | +12% vs semalam |
| SEDANG DISEMAK | 18 | oleh ALPF | Anggaran 22 minit |
| DILULUSKAN MINGGU INI | 312 | klasifikasi dikeluarkan | 96% mencapai SLA |
| FILEM DISENARAIKAN 2026 | 1,847 | sepanjang tahun | +203 bulan ini |

CTA below grid: `Lihat statistik penuh →` (ghost, links to /statistik)

### 3.1.6 Perkhidmatan Pantas
Section eyebrow: `PERKHIDMATAN PANTAS`
H2: `Apa yang anda perlukan?`

8 card grid (4×2 desktop, 2×4 tablet, 1×8 mobile). Each card: icon top-left, h3 title, 1-line desc, "Buka →" link.

| Title | Description | Link |
|---|---|---|
| Semak Senarai Filem | Cari filem yang telah diluluskan dan klasifikasinya. | /senarai-filem |
| Kalkulator Yuran | Anggaran yuran tapisan mengikut tempoh tayangan. | /kalkulator |
| Klasifikasi Filem | Maksud U, P12, 13, 16, dan 18. | /klasifikasi |
| Piagam Pelanggan | Komitmen kami pada anda. | /piagam-pelanggan |
| Statistik Tapisan | Data permohonan dan keputusan secara terbuka. | /statistik |
| Daftar Akaun Pengedar | Untuk pengedar filem dan stesen TV. | /daftar/pengedar |
| Permohonan Ahli Lembaga | Mohon menjadi ALPF. | /permohonan-alpf |
| Soalan Lazim | Jawapan ringkas, terus pada isunya. | /faq |

### 3.1.7 Klasifikasi teaser
Section eyebrow: `KLASIFIKASI FILEM`
H2: `Lima keputusan. Satu sistem.`
Lede: Setiap filem yang ditapis akan diberikan satu daripada klasifikasi berikut. Klik untuk butiran penuh.

Inline row of the 5 classification chips (per §2.4.6), each with a label beneath. Hover reveals a 1-line summary.

| Chip | Label | 1-line summary |
|---|---|---|
| U | Umum | Sesuai untuk semua peringkat umur. |
| P12 | Bimbingan Ibu Bapa 12+ | Bimbingan ibu bapa untuk penonton bawah 12 tahun. |
| 13 | Bimbingan 13+ | Sesuai 13 tahun ke atas dengan bimbingan ibu bapa. |
| 16 | Belia 16+ | Sesuai 16 tahun ke atas. |
| 18 | Dewasa 18+ | Hanya untuk penonton dewasa. |

CTA: `Baca selengkapnya →` (links to /klasifikasi)

### 3.1.8 Piagam Pelanggan strip
Section eyebrow: `PIAGAM PELANGGAN`
H2: `Janji kami. Disukat dalam hari.`

5 cards in a row (or 2-3 per row on smaller screens). Each card: large duration in Poppins 700 (e.g. "5 HARI"), label, 1-line context.

| Duration | Service | Context |
|---|---|---|
| **5 hari** | Sijil Tayangan Video (STV) | Dahulu 10 hari. Dipendekkan separuh. |
| **2 hari** | Bahan Publisiti | Dahulu 3 hari. |
| **5 hari** | Tayangan Pawagam | Dikekalkan. |
| **5 hari** | Perakuan A Pita / DVD | Dahulu 10 hari. Dipendekkan separuh. |
| **5 hari** | Iklan TV | Dikekalkan. |

Footer of section: small text — *Tempoh dikira dari tarikh permohonan lengkap diterima. Rujuk Piagam Pelanggan penuh untuk syarat dan pengecualian.*
CTA: `Baca Piagam Pelanggan penuh →`

### 3.1.9 FAQ teaser
Section eyebrow: `SOALAN LAZIM`
H2: `Jawapan yang anda cari.`

Accordion list of the top 5 questions (each expands to reveal answer). Below: `Lihat semua soalan →` link.

Use the first 5 from §3.8 FAQ page.

### 3.1.10 Footer
Per §2.4.11. Include the brand line: *"iLPF v2 — Pejabat Penapisan Filem Malaysia. Built to decide. Designed to deliver."*

---

## 3.2 Maklumat Korporat hub — `/profil/`

**Purpose.** Landing for the corporate-info section. Visual index of all sub-pages.

**Layout.**

### 3.2.1 Page header
- Breadcrumb: `Utama / Maklumat Korporat`
- H1: `Maklumat Korporat.`
- Lede: Sejarah, peranan, dan kepimpinan Pejabat Penapisan Filem Malaysia.

### 3.2.2 6-card grid
Each card = link to sub-page. Card includes: small icon, h3 title, 2-line description, `Lihat →` link.

| Card | Title | Description | Link |
|---|---|---|---|
| 1 | Mesej Pengarah PPF | Perutusan dan pandangan strategik daripada Pengarah Pejabat Penapisan Filem. | /profil/mesej-pengarah |
| 2 | Latar Belakang | Sejarah LPF sejak 1954 hingga kini. Lebih 70 tahun pengalaman dalam tapisan filem Malaysia. | /profil/latar-belakang |
| 3 | Misi, Visi & Objektif | Apa yang kami perjuangkan, ke mana kami menuju, dan bagaimana kami menyukatnya. | /profil/misi-visi-objektif |
| 4 | Peranan PPF | Fungsi, kuasa, dan tanggungjawab di bawah Akta Penapisan Filem 2002. | /profil/peranan |
| 5 | Carta Organisasi ALPF | Struktur Ahli Lembaga Penapisan Filem dan urus setia. | /profil/carta-alpf |
| 6 | Pengerusi | Latar belakang dan kerjaya Pengerusi LPF. | /profil/pengerusi |

---

## 3.3 Mesej Pengarah PPF — `/profil/mesej-pengarah.html`

**Purpose.** Welcome letter from the Director. Sets the human tone.

**Layout.**

- Breadcrumb: `Utama / Maklumat Korporat / Mesej Pengarah PPF`
- Two-column layout (desktop): left 40% portrait + name card, right 60% message body.
- Mobile: portrait stacks on top.

**Left column.**
- Square portrait (4:5 aspect), 20px radius. Image: `[FOTO PENGARAH PPF]`
- Below portrait:
  - Eyebrow: PENGARAH PPF
  - Name (h3, Poppins 700): `[NAMA PENGARAH PPF]`
  - Designation (Poppins 500, gray): `[GELARAN PENUH, contoh: YBhg. Datuk]`
  - Small badge: `Dilantik [TARIKH PELANTIKAN]`

**Right column.**

> **H1:** Tapisan yang adil.
> Tapisan yang telus.`•`
>
> **Body (write in iLPF voice — short paragraphs, declarative):**
>
> Assalamualaikum dan salam sejahtera.
>
> Pejabat Penapisan Filem telah berkhidmat kepada rakyat Malaysia sejak 1954. Tugas kami mudah dinyatakan, tetapi memerlukan ketelitian: memastikan setiap filem yang ditayangkan di negara ini sesuai dengan masyarakat, undang-undang, dan nilai sejagat.
>
> Dengan iLPF v2, kami memperbaharui janji itu untuk era digital.
>
> Pengedar filem kini boleh menghantar permohonan dalam talian sepenuhnya. Ahli Lembaga Penapisan Filem bekerja dalam ruang digital yang teratur. Pegawai PPF dapat menjejaki setiap permohonan dari hantaran sehingga sijil dikeluarkan. Dan rakyat Malaysia dapat menyemak status filem secara terbuka.
>
> Tiga prinsip yang memandu kami:
>
> **Jelas.** Setiap keputusan boleh dijelaskan. Tiada birokrasi tersembunyi.
> **Pantas.** Piagam Pelanggan kami telah dipendekkan separuh untuk dua perkhidmatan utama.
> **Adil.** Setiap filem dinilai mengikut Garis Panduan Penapisan Filem, tanpa pilih kasih.
>
> Selamat menggunakan iLPF v2. Terima kasih atas kepercayaan anda.
>
> **— [NAMA PENGARAH PPF]**
> *Pengarah, Pejabat Penapisan Filem Malaysia*

Below message: small horizontal card with `Hubungi PPF →` link.

---

## 3.4 Latar Belakang — `/profil/latar-belakang.html`

**Purpose.** Historical narrative. Make 72 years feel substantial without being a textbook.

**Layout.**

- Breadcrumb + H1: `Latar Belakang.`
- Lede: Tujuh dekad tapisan filem Malaysia, dalam satu garis masa.
- Vertical timeline (custom CSS, left rail with dots, right cards). Each entry: year badge, h3 title, 2-3 line description.

**Timeline entries (real history, write in iLPF voice):**

| Year | Title | Body |
|---|---|---|
| 1908 | Tapisan filem mula dilaksanakan | Sebelum penubuhan LPF, tugas tapisan dilakukan oleh pihak Polis di bawah Ordinan Teater 1908. Polis berkuasa menentukan kesesuaian adegan dan merampas filem yang melanggar peraturan. |
| 1924 | Ordinan Filem Sinematograf | Undang-undang pertama khusus untuk kawalan dan tapisan filem, digubal untuk Negeri-Negeri Selat. |
| 1927 | Enakmen Filem Sinematograf (Kawalan) | Dikuat kuasakan di Negeri Melayu Bersekutu dan Johor. |
| 1952 | Ordinan Filem Sinematograf 1952 | Undang-undang seluruh Tanah Melayu. Tapisan dibuat oleh seorang pegawai yang bertanggungjawab kepada Ketua Polis. |
| 1954 | Penubuhan Lembaga Penapis Filem | Dua jawatankuasa diwujudkan — di Singapura untuk Negeri Selat, dan di Kuala Lumpur untuk Tanah Melayu. |
| 1966 | Ibu pejabat berpindah ke Kuala Lumpur | LPF Malaysia berpusat di KL. Akta Filem Sinematograf 1952 (Pindaan 1966) berkuat kuasa. |
| 2002 | Akta Penapisan Filem (Akta 620) | Akta moden yang berkuat kuasa sehingga hari ini. Memperkenalkan sistem panel tiga ALPF dan klasifikasi rasmi. |
| 2010 | Klasifikasi U, P13, 18 diperkenalkan | Sistem klasifikasi formal menggantikan kelulusan binari. |
| 2020 | Klasifikasi P12, 13, 16, 18 disemak | Klasifikasi diperinci untuk mengukur kesesuaian umur dengan lebih tepat. |
| 2024 | iLPF dilancarkan | Sistem dalam talian pertama untuk penghantaran permohonan tapisan filem. |
| 2026 | iLPF v2 | Revolusi penuh — antara muka baharu, aliran kerja digital, dan Piagam Pelanggan dipendekkan separuh. |

Footer of page: small note — *Sumber: Akta Penapisan Filem 2002, Arkib KDN.*

---

## 3.5 Misi, Visi & Objektif — `/profil/misi-visi-objektif.html`

**Purpose.** Strategic clarity. Use the brand voice — short, decisive.

**Layout.**

- Breadcrumb + H1: `Misi, Visi & Objektif.`
- Three large cards stacked (or 3-col on wide desktop). Each card: small label (VISI / MISI / OBJEKTIF), large statement.

**Cards.**

### Visi
> Tapisan filem Malaysia yang paling jelas, paling adil, dan paling pantas di rantau ini.

### Misi
> Memastikan setiap filem yang ditayangkan di Malaysia menepati Akta Penapisan Filem 2002, Garis Panduan Penapisan Filem, dan nilai sejagat — tanpa menghalang kreativiti yang sah.

### Objektif
Numbered list (1-5):
1. **Tapisan tepat pada masa.** Memenuhi Piagam Pelanggan dalam setiap permohonan.
2. **Keputusan boleh dijelaskan.** Setiap kelulusan, suntingan, atau penolakan disertakan dengan rasional bertulis.
3. **Sistem yang telus.** Statistik tapisan diterbitkan secara terbuka.
4. **Industri yang dihormati.** Pengedar dan stesen TV dilayan sebagai rakan kongsi, bukan pemohon.
5. **Pegawai yang dilengkapi.** ALPF dan PPF bekerja dalam ruang digital yang membantu mereka membuat keputusan yang baik.

### Teras nilai
Below objectives, a 4-pill row:
- **Telus** — Tiada keputusan tersembunyi.
- **Pantas** — Setiap hari penting.
- **Adil** — Sama undang-undang untuk semua.
- **Profesional** — Hormat, ketepatan, integriti.

---

## 3.6 Peranan PPF — `/profil/peranan.html`

**Purpose.** Explain what PPF actually does, with legal grounding but plain language.

**Layout.**

- Breadcrumb + H1: `Peranan kami.`
- Lede: Pejabat Penapisan Filem adalah pihak berkuasa rasmi tapisan filem Malaysia di bawah Kementerian Dalam Negeri.

### Section: Asas Perundangan
Card with 3 items, each = act name + brief.
- **Akta Penapisan Filem 2002 (Akta 620)** — Akta utama yang memberi kuasa kepada Lembaga untuk menapis dan mengklasifikasikan filem.
- **Peraturan-Peraturan Penapisan (Fi) Filem 1984** — Menetapkan kadar yuran tapisan mengikut tempoh tayangan.
- **Garis Panduan Penapisan Filem 2026** — Kriteria terperinci untuk menilai kandungan filem.

### Section: Apa yang kami buat
Six function cards, each with icon, h3, 2-line body:

| Function | Description |
|---|---|
| Tapisan filem panggung | Setiap filem yang akan ditayangkan di pawagam Malaysia mesti ditapis dan dikeluarkan Sijil A. |
| Tapisan filem TV | Filem dan rancangan TV ditapis sebelum disiarkan di stesen tempatan. |
| Tapisan bahan publisiti | Poster, treler, iklan filem semuanya memerlukan kelulusan berasingan. |
| Tapisan iklan | Iklan komersial untuk siaran TV dan pawagam ditapis untuk kandungan yang sesuai. |
| Pensijilan Sijil A & Sijil B | Sijil A untuk tayangan; Sijil B untuk salinan jualan (DVD, blu-ray, kandungan digital). |
| Pengeluaran klasifikasi | Setiap filem diberikan klasifikasi U, P12, 13, 16, atau 18. |

### Section: Cara kami bekerja
- Body paragraph: Tugasan tapisan dilaksanakan menggunakan kaedah **panel tiga orang Ahli Lembaga**. Keputusan panel diperakukan untuk pertimbangan Pengerusi atau Naib Pengerusi.
- Sub-card: **Rayuan.** Pemilik filem yang tidak bersetuju dengan keputusan boleh membuat rayuan kepada Jawatankuasa Rayuan Filem dalam tempoh 30 hari, di bawah seksyen 21 Akta 620.

---

## 3.7 Carta Organisasi ALPF — `/profil/carta-alpf.html`

**Purpose.** Show the structure visually.

**Layout.**

- Breadcrumb + H1: `Carta Organisasi.`
- Lede: Struktur kepimpinan Lembaga Penapisan Filem dan Urus Setia Pejabat Penapisan Filem.

### Visual org chart
Three-level tree, SVG or CSS grid:

```
                    ┌───────────────────────────┐
                    │   YB Menteri Dalam Negeri │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │      Pengerusi LPF        │
                    │   [NAMA PENGERUSI ALPF]   │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │      Naib Pengerusi       │
                    │   [NAMA NAIB PENGERUSI]   │
                    └─────────────┬─────────────┘
                                  │
            ┌─────────────────────┼─────────────────────┐
            │                     │                     │
   ┌────────┴───────┐   ┌─────────┴────────┐  ┌────────┴────────┐
   │  Ahli Lembaga  │   │  Setiausaha      │  │  Pengarah PPF   │
   │  Penapisan     │   │  Bahagian        │  │  [NAMA]         │
   │  Filem (ALPF)  │   │  [NAMA]          │  │                 │
   │  [N orang]     │   │                  │  │                 │
   └────────────────┘   └──────────────────┘  └────────┬────────┘
                                                       │
                            ┌──────────────────────────┼──────────────────────────┐
                            │                          │                          │
                  ┌─────────┴────────┐      ┌──────────┴─────────┐    ┌──────────┴─────────┐
                  │ Unit Tapisan     │      │ Unit Pensijilan    │    │ Unit Pentadbiran   │
                  │ Filem & TV       │      │ & Bahan Publisiti  │    │ & Sistem           │
                  └──────────────────┘      └────────────────────┘    └────────────────────┘
```

Each node = white card, 1px gray border, 14px radius. Pengerusi node gets a `pine` background and white text. Connecting lines: 1px solid `--gray-300`.

### Section: ALPF — Senarai Ahli Lembaga
Grid of board member cards. Each card: small portrait (square, 12px radius), name, designation, sector/expertise badge.

`[SENARAI ALPF — NAMA, JAWATAN, KEPAKARAN — TO BE PROVIDED]`

Placeholder: render 12 sample cards with `[Nama Ahli]`, `[Bidang Kepakaran]` (e.g. Penyiaran, Pendidikan, Keagamaan, Penguatkuasaan, Pengurusan, Bahasa).

### Footnote
Small text: *Ahli Lembaga dilantik oleh YB Menteri Dalam Negeri di bawah seksyen 3 Akta Penapisan Filem 2002. Tempoh perkhidmatan: 3 tahun, boleh disambung.*

---

## 3.8 Pengerusi — `/profil/pengerusi.html`

**Purpose.** Profile of the Pengerusi LPF.

**Layout.** Same two-column pattern as §3.3 Mesej Pengarah.

**Left column.**
- Portrait (4:5, 20px radius). Image: `[FOTO PENGERUSI ALPF]`
- Eyebrow: PENGERUSI LEMBAGA PENAPISAN FILEM
- Name: `[NAMA PENGERUSI ALPF]`
- Honorifics: `[GELARAN]`
- Appointment badge: `Dilantik [TARIKH PELANTIKAN]`

**Right column.**

### H1
`[NAMA PENGERUSI ALPF].`

### Sub-section: Kerjaya
Brief: `[2-3 PARAGRAPH BIO — TO BE PROVIDED]`
Placeholder structure to follow:
- Paragraph 1: education, early career.
- Paragraph 2: senior positions held, sectors of expertise.
- Paragraph 3: appointment to LPF, current focus areas.

### Sub-section: Latar Belakang Pendidikan
Bullet list of qualifications. `[SENARAI KELULUSAN]`

### Sub-section: Pengiktirafan
Bullet list of awards/recognition. `[SENARAI ANUGERAH — JIKA ADA]`

### Sub-section: Visi semasa di LPF
Pull-quote in larger Poppins 600 24px italic style:
> `["[PETIKAN VISI/MOTTO PENGERUSI — 1-2 AYAT]"]`

---

## 3.9 Senarai Filem — `/senarai-filem.html`

**Purpose.** Public film registry. Searchable, filterable, browsable.

**Layout.**

### Page header
- Breadcrumb + H1: `Senarai Filem.`
- Lede: Senarai filem yang telah ditapis dan diluluskan oleh Lembaga Penapisan Filem.

### Search & filter bar
Sticky bar below header:
- Large search input (full width on mobile, 50% on desktop) with placeholder: *"Cari tajuk filem, pengedar, atau nombor sijil..."*
- Filter chips row (multi-select):
  - **Klasifikasi:** U / P12 / 13 / 16 / 18
  - **Tahun:** 2026 / 2025 / 2024 / 2023 / Lebih awal
  - **Jenis:** Tayangan Panggung / Pita & DVD / Tayangan TV / Bahan Publisiti / Iklan
  - **Bahasa:** Bahasa Malaysia / Bahasa Inggeris / Bahasa Mandarin / Bahasa Tamil / Lain-lain
- Sort dropdown: Terbaru / Tertua / Tajuk A-Z / Tajuk Z-A

### Results table
Columns: `Tajuk Filem` / `Klasifikasi` / `Jenis` / `Pengedar` / `Tarikh Kelulusan` / `Sijil`

**20 sample rows (real-feeling, mix of Malaysian + international, 2024-2026):**

| Tajuk | Klasifikasi | Jenis | Pengedar | Tarikh | Sijil |
|---|---|---|---|---|---|
| Sheriff: Narko-Integriti 2 | 18 | Pawagam | Astro Shaw Sdn Bhd | 28 Apr 2026 | A2026/04/0892 |
| Dune: Part Three | P13 | Pawagam | Warner Bros Malaysia | 22 Apr 2026 | A2026/04/0871 |
| Mat Kilau: Pendekar Pahang | 13 | Pawagam | Studio Kembara | 18 Apr 2026 | A2026/04/0834 |
| Imaginur 2 | P13 | Pawagam | Layar Sunan | 11 Apr 2026 | A2026/04/0801 |
| Inside Out 3 | U | Pawagam | Walt Disney Malaysia | 4 Apr 2026 | A2026/04/0762 |
| Polis Evo 4 | 16 | Pawagam | Astro Shaw Sdn Bhd | 28 Mac 2026 | A2026/03/0728 |
| The Batman Part II | 18 | Pawagam | Warner Bros Malaysia | 21 Mac 2026 | A2026/03/0699 |
| Upin & Ipin: Lagenda Pulau | U | Pawagam | Les' Copaque Production | 14 Mac 2026 | A2026/03/0661 |
| Mission: Impossible 8 | P13 | Pawagam | UIP Malaysia | 28 Feb 2026 | A2026/02/0594 |
| Drama Pilihan Malaya (Episod 1-12) | 13 | Tayangan TV | RTM | 15 Feb 2026 | TV2026/02/0421 |
| Pendekar Bujang Lapok Remake | P13 | Pita & DVD | Filem Negara Malaysia | 8 Feb 2026 | B2026/02/0387 |
| Iklan Petronas Tahun Baharu Cina 2026 | U | Iklan | Naga DDB Tribal | 2 Feb 2026 | I2026/02/0353 |
| Spider-Man: Beyond the Spider-Verse | P13 | Pawagam | Sony Pictures Malaysia | 24 Jan 2026 | A2026/01/0298 |
| Bercakap Dengan Jin: Episod Akhir | 18 | Pawagam | KRU Studios | 17 Jan 2026 | A2026/01/0264 |
| Bahan Publisiti — Trailer "Sheriff 2" | 18 | Bahan Publisiti | Astro Shaw Sdn Bhd | 10 Jan 2026 | BP2026/01/0182 |
| Avatar: Fire and Ash | P13 | Pawagam | 20th Century Studios Malaysia | 18 Dis 2025 | A2025/12/3847 |
| Mufasa: The Lion King | U | Pawagam | Walt Disney Malaysia | 11 Dis 2025 | A2025/12/3812 |
| Wonka 2 | U | Pawagam | Warner Bros Malaysia | 4 Dis 2025 | A2025/12/3776 |
| Ejen Ali The Movie 3 | U | Pawagam | WAU Animation | 14 Nov 2025 | A2025/11/3681 |
| Pulang: Sang Pelarian | 16 | Pita & DVD | Layar Sunan | 7 Nov 2025 | B2025/11/3643 |

### Row interaction
- Click anywhere on row → modal opens with full detail: full title, original language, duration, classification rationale (1-2 lines), date submitted vs approved, certificate validity.
- Klasifikasi cell uses the chip from §2.4.6.

### Pagination
"Halaman 1 daripada 92" + prev/next buttons + page size selector (20 / 50 / 100).

### Footer of section
Small text: *Data dikemas kini setiap hari pada pukul 6 petang. Senarai ini meliputi filem yang ditapis sejak Januari 2024.*

---

## 3.10 Klasifikasi Filem — `/klasifikasi.html`

**Purpose.** Visual explainer for the 5 classifications.

**Layout.**

### Page header
- H1: `Lima keputusan.`
- Lede: Setiap filem yang ditapis akan diberi salah satu daripada lima klasifikasi berikut. Klasifikasi memberi panduan kepada penonton dan ibu bapa tentang kesesuaian filem mengikut umur.

### 5 large detail cards (full-width, stacked)
Each card:
- Left: massive classification chip (120×120px version of the regulatory mark from §2.4.6)
- Right: name, age description, 3-point "Apa yang anda akan jangkakan", "Contoh filem" with 3 sample titles linking to /senarai-filem.

#### Card 1 — U
- **Label:** Umum
- **Untuk:** Semua peringkat umur.
- **Apa yang anda akan jangkakan:**
  - Kandungan yang sesuai untuk seluruh keluarga.
  - Tiada keganasan yang mengganggu, bahasa kasar, atau tema dewasa.
  - Mesej positif dan nilai sejagat.
- **Contoh:** Upin & Ipin: Lagenda Pulau • Mufasa: The Lion King • Inside Out 3

#### Card 2 — P12
- **Label:** Bimbingan Ibu Bapa 12+
- **Untuk:** Penonton 12 tahun dan ke atas. Bimbingan ibu bapa disarankan untuk penonton bawah 12 tahun.
- **Apa yang anda akan jangkakan:**
  - Tema yang mungkin memerlukan penjelasan ibu bapa.
  - Aksi ringan tanpa keganasan yang panjang lebar.
  - Bahasa yang sopan dengan beberapa pengecualian kecil.
- **Contoh:** Dune: Part Three • Mission: Impossible 8 • Imaginur 2

#### Card 3 — 13
- **Label:** Bimbingan 13+
- **Untuk:** Penonton 13 tahun dan ke atas. Tidak sesuai untuk kanak-kanak.
- **Apa yang anda akan jangkakan:**
  - Aksi dan keganasan yang lebih intens, namun tidak grafik.
  - Tema sosial yang kompleks (politik, persahabatan, identiti).
  - Bahasa kasar yang terhad.
- **Contoh:** Mat Kilau: Pendekar Pahang • Pendekar Bujang Lapok Remake • Drama Pilihan Malaya

#### Card 4 — 16
- **Label:** Belia 16+
- **Untuk:** Penonton 16 tahun dan ke atas. Tidak sesuai untuk bawah 16.
- **Apa yang anda akan jangkakan:**
  - Keganasan yang lebih realistik.
  - Bahasa kasar yang lebih kerap.
  - Tema dewasa seperti jenayah serius, dadah, dan perhubungan kompleks.
- **Contoh:** Polis Evo 4 • Pulang: Sang Pelarian

#### Card 5 — 18
- **Label:** Dewasa 18+
- **Untuk:** Hanya penonton 18 tahun dan ke atas. Pengesahan umur diperlukan di pintu masuk pawagam.
- **Apa yang anda akan jangkakan:**
  - Keganasan grafik, tema gelap, atau seram yang intens.
  - Bahasa kasar tanpa had.
  - Tema dewasa yang eksplisit dalam konteks naratif.
- **Contoh:** Sheriff: Narko-Integriti 2 • The Batman Part II • Bercakap Dengan Jin

### Section: Bagaimana kami membuat keputusan
- Body: Setiap filem dinilai oleh **panel tiga Ahli Lembaga Penapisan Filem (ALPF)** mengikut **Garis Panduan Penapisan Filem 2026**. Klasifikasi diberikan berdasarkan keseluruhan kandungan — bukan satu adegan terpencil.
- CTA: `Baca Garis Panduan penuh →`

### Section: Apa yang berlaku jika filem tidak diluluskan
- Card: Filem yang tidak mencapai sebarang klasifikasi mungkin dipulangkan untuk suntingan, atau ditolak. Pemilik filem boleh membuat rayuan kepada **Jawatankuasa Rayuan Filem** dalam tempoh 30 hari di bawah seksyen 21 Akta Penapisan Filem 2002.
- CTA: `Maklumat rayuan →`

---

## 3.11 Piagam Pelanggan — `/piagam-pelanggan.html`

**Purpose.** The full service charter. The new commitments are the headline.

**Layout.**

### Page header
- H1: `Piagam Pelanggan.`
- Lede: Komitmen kami pada anda, disukat dalam hari.

### Section: Apa yang berubah dalam iLPF v2
Highlighted callout card (orange-soft background, 28px radius, 32px padding):
- Eyebrow: BAHARU TAHUN 2026
- H3: `Empat daripada lima perkhidmatan kini lebih pantas.`
- Body: Susulan pengstrukturan semula proses dalaman, kami telah memendekkan tempoh pemprosesan untuk perkhidmatan utama tanpa menjejaskan ketelitian tapisan.

### Section: Komitmen kami
Table-style cards, one per service:

| Perkhidmatan | Tempoh Baharu | Dahulu | Status |
|---|---|---|---|
| **Sijil Tayangan Video (STV)** | **5 hari bekerja** | 10 hari | ⏬ Dipendekkan 50% |
| **Bahan Publisiti** (poster, trailer, iklan filem) | **2 hari bekerja** | 3 hari | ⏬ Dipendekkan 33% |
| **Tayangan Panggung** (Sijil A pawagam) | **5 hari bekerja** | 5 hari | ✓ Dikekalkan |
| **Perakuan A — Pita & DVD** | **5 hari bekerja** | 10 hari | ⏬ Dipendekkan 50% |
| **Iklan TV & Pawagam** | **5 hari bekerja** | 5 hari | ✓ Dikekalkan |

Each row: large duration in Poppins 700 32px, label + service description, "before" struck through in gray, change badge.

### Section: Syarat
Numbered list:
1. Tempoh dikira dari **tarikh permohonan lengkap diterima**, bukan tarikh hantaran.
2. Permohonan yang tidak lengkap (dokumen kurang, salinan rendah, yuran belum dijelaskan) tidak akan diproses.
3. Tempoh dikira dalam **hari bekerja sahaja** — tidak termasuk hujung minggu dan cuti umum.
4. Permohonan kompleks (filem yang memerlukan rayuan dalaman atau rujukan kepada panel khas) mungkin mengambil masa lebih lama. Anda akan dimaklumkan secara bertulis.
5. Tempoh tidak terpakai semasa tempoh **penyelenggaraan sistem yang diumumkan** atau **gangguan luar jangka**.

### Section: Pencapaian kami
4 stat cards:

| Stat | Value | Label |
|---|---|---|
| 1 | 96.4% | Permohonan dilengkapkan dalam tempoh Piagam (Q1 2026) |
| 2 | 4.2 hari | Purata masa pemprosesan sebenar |
| 3 | 1,847 | Filem disenaraikan tahun ini |
| 4 | 99.1% | Pengedar yang berpuas hati (kaji selidik Mac 2026) |

### Section: Jika kami gagal
- Body: Jika permohonan anda tidak diproses dalam tempoh Piagam tanpa sebab yang sah, sila maklumkan kami melalui borang Maklum Balas. Setiap aduan akan disiasat dan dibalas dalam 7 hari bekerja.
- CTA: `Hantar Maklum Balas →`

---

## 3.12 Dashboard Statistik — `/statistik.html`

**Purpose.** Public-facing statistics dashboard. JPPH-style live ticker feel.

**Layout.**

### Page header
- H1: `Statistik Tapisan.`
- Lede: Data terbuka tentang permohonan, kelulusan, dan klasifikasi filem di Malaysia.
- Pulse badge: `🟢 Live • Dikemas kini setiap minit`
- Below header: filter — Tempoh: **Hari Ini** / Minggu Ini / Bulan Ini / Tahun Ini / Custom

### Hero stat strip (4 large tiles)
Same pattern as landing §3.1.5 but bigger.

| Eyebrow | Number | Sub-label | Trend |
|---|---|---|---|
| PERMOHONAN HARI INI | 47 | dalam talian | +12% vs purata 30 hari |
| SEDANG DISEMAK | 18 | oleh ALPF | Anggaran 22 minit |
| DILULUSKAN HARI INI | 31 | sijil dikeluarkan | 96% mengikut Piagam |
| AKTIVITI LIVE | 6 | pegawai aktif sekarang | 3 panel dalam sesi |

### Section: Permohonan mengikut jenis (Tahun 2026)
Donut chart + legend. Mock data:

| Jenis | Bilangan | % |
|---|---|---|
| Tayangan Panggung | 487 | 26.4% |
| Tayangan TV | 612 | 33.1% |
| Bahan Publisiti | 423 | 22.9% |
| Iklan | 198 | 10.7% |
| Pita & DVD | 127 | 6.9% |

### Section: Klasifikasi yang dikeluarkan (Tahun 2026)
Horizontal stacked bar chart. Each band uses the corresponding chip color from §2.4.6.

| Klasifikasi | Bilangan | % |
|---|---|---|
| U | 612 | 33.1% |
| P12 | 287 | 15.5% |
| 13 | 451 | 24.4% |
| 16 | 312 | 16.9% |
| 18 | 185 | 10.0% |

### Section: Tren bulanan
Line chart, 12 months Jan 2025 – Dis 2025 + Jan-Apr 2026. Two lines: "Permohonan diterima" (teal) and "Permohonan diluluskan" (pine).

### Section: Aktiviti live
Live-feed component (vertical list). Each item: timestamp (e.g. "2 minit lalu"), action verb, neutralized title.

Examples (mock 8 items, scrollable):
- `2 minit lalu` — Permohonan dihantar — "[Tajuk filem disembunyikan]" — Pengedar tempatan — Bahan Publisiti
- `5 minit lalu` — Permohonan diluluskan — Tayangan Panggung — Klasifikasi P13
- `8 minit lalu` — Panel ALPF memulakan sesi tapisan — 3 ahli
- `12 minit lalu` — Permohonan dihantar — Tayangan TV — Drama tempatan
- `18 minit lalu` — Sijil A dikeluarkan — A2026/05/1247
- `24 minit lalu` — Permohonan dihantar — Iklan komersial
- `31 minit lalu` — Permohonan diluluskan — Pita & DVD — Klasifikasi 16
- `38 minit lalu` — Bahan publisiti diluluskan — Treler filem pawagam

### Section: Pencapaian Piagam Pelanggan
Reuse the 4-stat block from §3.11 with same data.

### Section: Muat turun data
Card row: "Muat turun statistik 2026 (CSV)" / "Laporan tahunan 2025 (PDF)" / "Hubungkan ke API terbuka (untuk pembangun)"

### Footnote
*Data terbuka di bawah lesen Creative Commons CC-BY 4.0. Data peribadi telah dianonimkan mengikut Akta Perlindungan Data Peribadi 2010.*

---

## 3.13 Kalkulator Yuran — `/kalkulator.html`

**Purpose.** Estimate fees before submission.

**Layout.**

### Page header
- H1: `Kalkulator Yuran.`
- Lede: Anggaran yuran tapisan filem mengikut **Peraturan-Peraturan Penapisan (Fi) Filem 1984**.

### Calculator form (left 60%) + Live estimate panel (right 40%, sticky)

**Form fields (left):**
1. **Jenis Permohonan** (radio cards, 5 options):
   - Tayangan Panggung (Sijil A)
   - Tayangan TV
   - Bahan Publisiti (poster, trailer, iklan filem)
   - Iklan TV / Pawagam
   - Pita & DVD (Perakuan A — Sijil B)
2. **Tempoh Filem** (input + unit dropdown):
   - Number input
   - Unit: minit / jam / kaki filem (untuk filem reel)
3. **Format** (radio):
   - Digital (DCP, MP4, MOV)
   - Filem reel (35mm, 70mm)
4. **Bilangan Salinan** (number input, default 1) — *terpakai untuk Pita & DVD sahaja*
5. **Bahasa Asal Filem** (select: BM / EN / Mandarin / Tamil / Lain-lain) — *mempengaruhi keperluan sarikata, bukan yuran asas*

**Live estimate panel (right, sticky):**
- Eyebrow: ANGGARAN YURAN
- Massive number in Poppins 700: `RM [KIRAAN]`
- Breakdown:
  - Yuran asas tapisan: `RM [KADAR FI - RUJUK PERATURAN 1984]`
  - Yuran tambahan (jika ada): `RM [KIRAAN]`
  - Yuran pensijilan: `RM [KADAR]`
  - **Jumlah:** `RM [JUMLAH]`
- Small text: *Ini adalah anggaran. Yuran sebenar akan disahkan selepas permohonan dihantar.*
- CTA below: `Mulakan permohonan dengan yuran ini →` (links to /login/pengedar)

### Section: Rujukan kadar yuran
Expandable accordion table showing fee schedule per Peraturan 1984. Use placeholder rates clearly marked:

| Jenis | Tempoh | Kadar |
|---|---|---|
| Tayangan Panggung | Tidak melebihi 30 minit | `RM [KADAR - RUJUK PERATURAN 1984]` |
| Tayangan Panggung | 30 - 60 minit | `RM [KADAR]` |
| Tayangan Panggung | 60 - 90 minit | `RM [KADAR]` |
| Tayangan Panggung | 90 - 120 minit | `RM [KADAR]` |
| Tayangan Panggung | Setiap tambahan 30 minit | `RM [KADAR]` |
| Bahan Publisiti | Per item | `RM [KADAR]` |
| Iklan | Per iklan | `RM [KADAR]` |
| Pita & DVD | Per salinan | `RM [KADAR]` |

Footnote: *Rujuk Peraturan-Peraturan Penapisan (Fi) Filem 1984, Pindaan 2026 untuk kadar penuh dan rasmi. Pertanyaan: 03-8886 3000.*

### Section: Cara bayaran
3 cards:
- **FPX (Online Banking)** — Bayaran terus selepas hantar permohonan.
- **Kad Kredit / Debit** — Visa, Mastercard, MyDebit.
- **eWallet** — Touch 'n Go, GrabPay, Boost.

---

## 3.14 FAQ — `/faq.html`

**Purpose.** Categorized, searchable FAQ.

**Layout.**

### Page header
- H1: `Soalan Lazim.`
- Lede: Jawapan ringkas, terus pada isunya.
- Search input: *"Cari soalan..."*

### Category tabs
`Umum` (default) / `Pengedar Filem` / `Stesen TV` / `Permohonan ALPF` / `Klasifikasi` / `Yuran & Bayaran` / `Sistem`

### FAQ list (accordion)

**Kategori: Umum**

> **Apa itu LPF dan PPF?**
> LPF (Lembaga Penapisan Filem) adalah badan rasmi yang membuat keputusan tapisan filem di Malaysia, ditubuhkan di bawah Akta Penapisan Filem 2002. PPF (Pejabat Penapisan Filem) adalah urus setia yang mengendalikan operasi harian — termasuk menerima permohonan, menjadualkan tapisan, dan mengeluarkan sijil.

> **Kenapa filem perlu ditapis?**
> Tapisan filem mengawal dan menentukan kandungan filem yang ditayangkan dengan mengambil kira aspek keselamatan, keagamaan, sosio-budaya, ketertiban, dan ketatasusilaan — demi kepentingan negara dan masyarakat. Ia juga memberi panduan kesesuaian umur kepada penonton.

> **Filem apa yang perlu ditapis?**
> Semua jenis filem dan bahan publisiti filem seperti yang ditakrifkan dalam Akta Penapisan Filem 2002 — termasuk filem panggung, tayangan TV, pita, DVD, cakera padat, poster, treler, dan iklan filem.

> **Bagaimana saya tahu jika filem tertentu telah diluluskan?**
> Semak senarai filem yang diluluskan di [/senarai-filem](/senarai-filem). Anda boleh cari mengikut tajuk, pengedar, atau nombor sijil.

**Kategori: Pengedar Filem**

> **Bagaimana cara daftar akaun pengedar?**
> Pergi ke [/daftar/pengedar](/daftar/pengedar). Anda perlu sediakan: Sijil Pendaftaran SSM, Permit Filem Import (jika berkenaan), maklumat akaun bank, dan dokumen pengenalan pegawai bertanggungjawab.

> **Berapa lama proses pendaftaran akaun?**
> 3 hari bekerja selepas semua dokumen lengkap diterima.

> **Saya akaun pengedar dalam iLPF lama. Perlu daftar semula?**
> Tidak. Akaun anda telah dipindahkan secara automatik. Log masuk dengan e-mel dan kata laluan lama. Anda akan diminta untuk mengemas kini maklumat pada log masuk pertama.

> **Apakah dokumen yang perlu dihantar bersama permohonan tapisan?**
> Borang Permohonan Penapisan Filem, Permit Filem Import (jika filem import), dan filem asal (salinan master). Untuk butiran teknikal master, rujuk Panduan Teknikal di portal.

**Kategori: Stesen TV**

> **Bagaimana cara mendaftar stesen TV?**
> Pendaftaran adalah melalui pegawai PPF khas. Hubungi 03-8886 3000 atau e-mel `[E-MEL PPF TV]` untuk maklumat lanjut.

> **Adakah setiap episod drama TV perlu ditapis berasingan?**
> Ya. Setiap episod dianggap unit tapisan berasingan, tetapi boleh dihantar sebagai pakej siri untuk pemprosesan kelompok.

**Kategori: Permohonan ALPF**

> **Siapa yang boleh menjadi Ahli Lembaga Penapisan Filem (ALPF)?**
> Berumur 25 hingga 65 tahun. Berkelayakan sekurang-kurangnya peringkat Diploma atau setaraf. Berpengalaman luas dalam bidang seperti pentadbiran, pengurusan, keagamaan, penguatkuasaan, keselamatan, penyiaran, atau bidang yang bersesuaian. Keutamaan kepada calon dengan kemahiran pelbagai bahasa.

> **Bagaimana cara mohon menjadi ALPF?**
> Hantar permohonan dalam talian melalui [/permohonan-alpf](/permohonan-alpf). Permohonan dibuka apabila terdapat kekosongan, dan akan diumumkan di portal serta media rasmi.

> **Berapa tempoh perkhidmatan ALPF?**
> 3 tahun. Boleh disambung tertakluk kepada budi bicara YB Menteri Dalam Negeri.

> **Adakah ALPF dibayar?**
> Ya. ALPF menerima elaun tetap dan elaun setiap sesi tapisan, mengikut kadar yang ditetapkan oleh Kementerian.

**Kategori: Klasifikasi**

> **Apakah klasifikasi yang dikeluarkan oleh LPF?**
> Lima klasifikasi: **U** (Umum), **P12** (Bimbingan Ibu Bapa 12+), **13** (Bimbingan 13+), **16** (Belia 16+), dan **18** (Dewasa 18+). Setiap klasifikasi menunjukkan kesesuaian umur penonton. Rujuk [/klasifikasi](/klasifikasi) untuk butiran penuh.

> **Apa yang berlaku jika filem tidak dapat diluluskan?**
> Filem mungkin dipulangkan untuk suntingan, atau ditolak sepenuhnya. Pemilik filem boleh membuat rayuan kepada **Jawatankuasa Rayuan Filem** dalam tempoh 30 hari di bawah seksyen 21 Akta Penapisan Filem 2002.

> **Adakah klasifikasi boleh berubah selepas keluaran?**
> Tidak. Klasifikasi yang dikeluarkan adalah muktamad kecuali melalui proses rayuan rasmi.

**Kategori: Yuran & Bayaran**

> **Berapa yuran tapisan?**
> Yuran ditetapkan oleh **Peraturan-Peraturan Penapisan (Fi) Filem 1984** dan bergantung pada tempoh tayangan atau panjang filem. Gunakan [Kalkulator Yuran](/kalkulator) untuk anggaran.

> **Bagaimana cara bayaran?**
> FPX (online banking), kad kredit/debit, atau eWallet (Touch 'n Go, GrabPay, Boost). Bayaran perlu dijelaskan sebelum permohonan diproses.

> **Adakah yuran dikembalikan jika filem ditolak?**
> Tidak. Yuran tapisan adalah untuk perkhidmatan tapisan, bukan untuk kelulusan.

**Kategori: Sistem**

> **Adakah iLPF v2 berbeza dengan iLPF lama?**
> Ya. iLPF v2 adalah pembaharuan menyeluruh — antara muka baharu, aliran kerja digital, Piagam Pelanggan dipendekkan, dan akses telus kepada statistik. Data dan akaun anda dipindahkan secara automatik.

> **Bagaimana jika saya lupa kata laluan?**
> Klik "Lupa kata laluan?" pada halaman log masuk. Pautan tetapan semula akan dihantar ke e-mel berdaftar dalam masa 5 minit.

> **Saya menghadapi masalah teknikal. Bagaimana untuk dapatkan bantuan?**
> Hantar e-mel ke `sokongan@ilpf.moha.gov.my` dengan tangkapan skrin masalah, atau hubungi 03-8886 3000 (waktu pejabat). Pasukan kami akan respons dalam 1 hari bekerja.

> **Adakah iLPF v2 mempunyai aplikasi mudah alih?**
> Aplikasi mudah alih untuk pengedar dan stesen TV sedang dibangunkan dan akan dilancarkan pada suku ketiga 2026.

### Bottom CTA card
Eyebrow: TIDAK JUMPA JAWAPAN?
H3: `Hubungi kami terus.`
Two buttons: `Hantar Maklum Balas` (orange) / `Hubungi PPF` (ghost)

---

## 3.15 Login — Pengedar Filem — `/login/pengedar.html`

**Purpose.** Distributor / TV station login. Welcoming, not bureaucratic.

**Layout.** Two-column split:
- Left 50%: warm side panel with brand mark, big headline, value props.
- Right 50%: clean form.

**Left panel (pine background, white text):**
- Brand mark large
- Eyebrow (teal): UNTUK PENGEDAR FILEM & STESEN TV
- H1: `Selamat kembali.`
- Body: Hantar permohonan tapisan. Jejak status. Muat turun sijil. Semua dalam satu portal.
- Bottom 3 mini-stats:
  - **2,847** pengedar berdaftar
  - **5 hari** purata pemprosesan
  - **24/7** akses sistem

**Right panel (white):**
- H2: `Log masuk.`
- Form:
  - E-mel berdaftar
  - Kata laluan
  - "Ingat saya" checkbox + "Lupa kata laluan?" link (right-aligned)
  - `Log Masuk →` (btn-teal, full width)
- Divider with text "atau"
- Secondary card: `Belum ada akaun? Daftar akaun pengedar baharu →` (links to /daftar/pengedar)
- Bottom microcopy: *Dengan log masuk, anda bersetuju dengan Dasar Privasi dan Dasar Keselamatan iLPF.*
- Switch link at bottom: `Anda pegawai PPF atau ALPF? Log masuk di sini →` (links to /login/pegawai)

---

## 3.16 Login — PPF + ALPF — `/login/pegawai.html`

**Purpose.** Officer login. More formal, more secure-feeling.

**Layout.** Same two-column pattern as §3.15.

**Left panel (pine-deep background, even darker):**
- Eyebrow (orange): UNTUK PPF & ALPF SAHAJA
- H1: `Ruang kerja anda.`
- Body: Akses panel tapisan. Lihat tugasan. Buat keputusan dengan cepat dan jelas.
- Security badge row: `🛡 Pengesahan 2 langkah` `🔒 Disahkan KDN` `📊 Aktiviti dilog`

**Right panel:**
- H2: `Log masuk pegawai.`
- Form:
  - ID Pegawai (e.g. format `PPF/XXXXX` or `ALPF/XXXXX`)
  - Kata laluan
  - Kod pengesahan 2FA (6-digit)
  - `Log Masuk →` (btn-primary, full width)
- Below form:
  - Small card: `Bakal Ahli Lembaga? Mohon menjadi ALPF →` (orange ghost, links to /permohonan-alpf)
- Switch link at bottom: `Anda pengedar filem? Log masuk di sini →`

---

## 3.17 Daftar Akaun Pengedar — `/daftar/pengedar.html`

**Purpose.** Multi-step distributor registration. Make it feel like a tech onboarding, not a form.

**Layout.** Top progress bar with 4 steps. Single column content area.

### Steps
1. **Maklumat Syarikat**
2. **Pegawai Bertanggungjawab**
3. **Dokumen Sokongan**
4. **Pengesahan**

### Page header
- Breadcrumb + H1: `Daftar akaun pengedar.`
- Lede: 4 langkah. Anggaran 8 minit.

### Step 1 — Maklumat Syarikat
Fields:
- Nama syarikat (seperti dalam SSM)
- No. pendaftaran SSM
- Jenis entiti (Sdn Bhd / Bhd / Perkongsian / Tunggal / Lain-lain)
- Alamat perniagaan
- Bandar / Negeri / Poskod
- Nombor telefon syarikat
- E-mel syarikat (akan menjadi e-mel log masuk utama)
- Laman web (opsyenal)
- Bidang utama (multi-select chips): Pengedaran Filem Panggung / Pengedaran TV / Penyiaran / Penerbitan / Lain-lain
Buttons: `Batal` (ghost) / `Seterusnya →` (primary)

### Step 2 — Pegawai Bertanggungjawab
- Nama penuh
- No. KP
- Jawatan dalam syarikat
- E-mel peribadi
- Nombor telefon
- Salinan KP (muat naik, max 5MB)

### Step 3 — Dokumen Sokongan
Upload zone for each:
- Sijil Pendaftaran SSM (wajib, PDF, max 10MB)
- Permit Filem Import (jika berkenaan)
- Penyata bank perniagaan (untuk pengesahan akaun bayaran)
- Lain-lain (opsyenal — sehingga 3 fail)

### Step 4 — Pengesahan
- Summary of all entered data in card blocks (read-only)
- Terms checkbox: "Saya mengesahkan maklumat ini adalah benar dan menerima Dasar Privasi dan Dasar Keselamatan iLPF."
- Final CTA: `Hantar Pendaftaran →` (btn-teal lg)

### Success state (post-submit)
Full-screen confirmation:
- Massive teal checkmark icon
- H1: `Dihantar.` *(with the teal dot)*
- Body: Pendaftaran anda telah diterima. Kami akan semak dalam **3 hari bekerja**. E-mel pengesahan akaun akan dihantar ke `[e-mel]`.
- Reference number badge: `Rujukan: REG-2026-XXXXX`
- CTA: `Kembali ke Utama →`

---

## 3.18 Permohonan ALPF — `/permohonan-alpf.html`

**Purpose.** Application to become an Ahli Lembaga Penapisan Filem.

**Layout.** Same multi-step pattern as §3.17. 5 steps:
1. **Maklumat Peribadi**
2. **Latar Belakang Pendidikan**
3. **Pengalaman Kerjaya**
4. **Bidang Kepakaran & Bahasa**
5. **Pengesahan**

### Page header
- H1: `Permohonan Ahli Lembaga Penapisan Filem.`
- Lede: Lembaga Penapisan Filem mencari individu berpengalaman dari pelbagai bidang untuk membantu membuat keputusan tapisan filem Malaysia.

### Eligibility callout (orange-soft card, top of form)
Eyebrow: SYARAT KELAYAKAN
- Warganegara Malaysia.
- Berumur **25 hingga 65 tahun**.
- Berkelayakan **sekurang-kurangnya Diploma** atau setaraf.
- Berpengalaman luas dalam bidang seperti pentadbiran, pengurusan, keagamaan, penguatkuasaan, keselamatan, penyiaran, pendidikan, atau bidang yang bersesuaian.
- **Keutamaan** kepada calon dengan kemahiran **pelbagai bahasa**.

### Step 1 — Maklumat Peribadi
- Nama penuh (mengikut KP)
- No. KP
- Tarikh lahir
- Jantina
- Bangsa
- Alamat semasa
- Nombor telefon
- E-mel
- Status perkahwinan

### Step 2 — Latar Belakang Pendidikan
Repeater (add multiple entries):
- Tahap (Diploma / Ijazah / Sarjana / PhD / Profesional)
- Institusi
- Bidang pengajian
- Tahun graduasi

### Step 3 — Pengalaman Kerjaya
Repeater:
- Jawatan
- Organisasi
- Sektor (Awam / Swasta / NGO / Akademik)
- Dari tahun – Hingga tahun (atau "Sekarang")
- Penerangan ringkas (2-3 ayat)

### Step 4 — Bidang Kepakaran & Bahasa
- Bidang kepakaran utama (multi-select chips): Pentadbiran / Pengurusan / Keagamaan / Penguatkuasaan / Keselamatan / Penyiaran / Pendidikan / Bahasa & Sastera / Psikologi / Sosiologi / Undang-undang / Perfileman / Lain-lain
- Bahasa yang dikuasai (multi-select with proficiency): BM / EN / Mandarin / Tamil / Arab / Lain-lain — setiap satu: Asas / Pertengahan / Lancar / Penutur asli
- Pernah menjadi ALPF sebelum ini? (Ya/Tidak — jika ya, tempoh)

### Step 5 — Pengesahan
- Upload area: Salinan KP, Salinan sijil kelulusan tertinggi, CV terkini, Surat sokongan (opsyenal)
- Declaration checkbox: "Saya mengesahkan maklumat ini adalah benar. Saya memahami bahawa pemalsuan maklumat boleh menyebabkan permohonan ditolak atau pelantikan dibatalkan."
- Final CTA: `Hantar Permohonan →` (btn-teal lg)

### Success state
- Teal checkmark
- H1: `Dihantar.`
- Body: Permohonan anda telah diterima dan akan disemak oleh Urus Setia Lembaga. Proses semakan mengambil masa **30-60 hari bekerja**. Anda akan dimaklumkan melalui e-mel.
- Reference: `ALPF-2026-XXXXX`

---

## 3.19 Hubungi Kami — `/hubungi.html`

**Purpose.** Contact info. Make it scannable.

**Layout.**

### Page header
- H1: `Hubungi kami.`
- Lede: Pejabat Penapisan Filem, Bahagian Kawalan Penapisan Filem dan Penguatkuasaan, KDN.

### 3-column grid
**Lokasi**
- Alamat: Aras 4, Blok D2, Kompleks D, Pusat Pentadbiran Kerajaan Persekutuan, 62546 Putrajaya
- Map embed (Google Maps, 14:9 ratio, 14px radius)

**Hubungi**
- Telefon: 03-8886 3000
- Faks: 03-8889 1417
- E-mel umum: `pro@moha.gov.my`
- E-mel sokongan iLPF: `sokongan@ilpf.moha.gov.my`

**Waktu Operasi**
- Isnin – Khamis: 8.30 pagi – 5.30 petang
- Jumaat: 8.30 pagi – 12.15 tengah hari, 2.45 petang – 5.30 petang
- Sabtu, Ahad, Cuti Umum: TUTUP
- Sistem dalam talian: 24 / 7

### Section: Borang Maklum Balas
Inline form (single card):
- Nama
- E-mel
- Kategori (select): Pertanyaan / Aduan / Cadangan / Masalah Teknikal
- Mesej (textarea)
- `Hantar →` (btn-teal)

### Section: Pautan Pantas
4-card row:
- FAQ → /faq
- Piagam Pelanggan → /piagam-pelanggan
- Statistik → /statistik
- Log Masuk → /login/pengedar

---

# Build Order Recommendation

If building incrementally, build in this order:

1. **`assets/styles.css`** — design tokens + base components + hero animations
2. **Landing (`/index.html`)** — the centerpiece, validates the system
3. **Login pages** (×2) — small, validates form components
4. **Piagam Pelanggan** — short page, validates card patterns
5. **Klasifikasi Filem** — validates the regulatory chip pattern
6. **Senarai Filem** — validates table + filter patterns
7. **Statistik Dashboard** — validates ticker + chart patterns
8. **FAQ** — validates accordion
9. **Maklumat Korporat hub + 6 sub-pages**
10. **Kalkulator Yuran** — needs fee data, can be last
11. **Registration forms** (×2 multi-step) — most complex, leave for last
12. **Hubungi Kami** — simple, fine anywhere

---

# What you (the project owner) still need to supply

Before the build can go to production:

| Item | Where it's needed |
|---|---|
| iLPF v2 logo (SVG + PNG) | Global header, footer, favicon, login pages |
| Photo of Pengarah PPF | §3.3 Mesej Pengarah |
| Photo of Pengerusi ALPF | §3.8 Pengerusi |
| Name + bio of Pengarah PPF | §3.3 |
| Name + bio of Pengerusi ALPF | §3.8 |
| Names of ALPF board members (~10-15) | §3.7 Carta Organisasi |
| Photos of ALPF members (optional, can be silhouettes) | §3.7 |
| Real fee rates from Peraturan 1984 (current pindaan) | §3.13 Kalkulator |
| Confirmation of Piagam Pelanggan changes (5/2/5/5/5 hari) | §3.11 |
| Real e-mail addresses (sokongan@, etc.) | §3.19 Hubungi |
| Real social media handles (if any) | Footer |

---

**End of specification.**

*This document is the single source of truth for the iLPF v2 portal build. Treat it as a contract between project owner and builder.*

