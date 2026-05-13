# iLPF v2 ALPF Workspace — Master Build Specification

**Project.** Authenticated workspace for Ahli Lembaga Penapisan Filem (ALPF) — board members of Malaysia's Lembaga Penapisan Filem under KDN. Complete revolution of the existing iLPF workspace at `ilpf.moha.gov.my/test1/`.

**For.** Claude Design (HTML/CSS prototype) → Claude Code (Laravel + Blade conversion).

**Reference brand.** iLPF v2 — *The Clear Frame* (Built to decide. Designed to deliver.)

**Companion to.** `ilpf-v2-portal-spec.md` (public-facing portal). This document covers the authenticated workspace. Design tokens, typography, and tone are inherited from the portal spec — do not redefine them.

**Replaces.**
- Dashboard (currently a 13-card grid showing mostly zeros)
- User Profile (currently a dense single-column form)
- Tapisan list (currently a cluttered table)
- Tapisan screen (v3 at `kdn-ilpf-retreat.myappsonline.net/ilpf/ilpf_tapisan_v3.html` — preserves all features, redesigns the UX)

---

## How to use this document

Four layers, read in order:

1. **PART 1 — Master Prompt.** Paste verbatim into Claude Design as the opening message.
2. **PART 2 — Structured Specification.** Workspace-specific components, IA, patterns. Reuses tokens from the portal spec.
3. **PART 3 — Page-by-Page Briefs.** Four screens with real Bahasa Malaysia copy in iLPF voice.
4. **PART 4 — Laravel + Blade Conversion Notes.** Handoff guidance for Claude Code.

**Placeholder convention.** `[BRACKETED CAPS]` for data to be filled before production.

---

# PART 1 — MASTER PROMPT

> Copy everything inside the fenced block below into Claude Design as your first message for the workspace build.

```
Build the authenticated workspace for iLPF v2 — Malaysia's Pejabat Penapisan Filem (PPF) under KDN. This is the daily tool for Ahli Lembaga Penapisan Filem (ALPF) — the board members who watch films, record edits, and make classification decisions.

It is a complete revolution of the existing iLPF dashboard, which currently shows a 13-card grid of mostly-zero counters that gives ALPF members no signal about what they need to do. The new workspace is calm, decision-focused, and AI-assisted without being AI-dependent — every AI suggestion is a sidecar that ALPF can accept with one click or ignore entirely while working manually.

REFERENCE FOR PATTERN AND FEEL
- Think Linear, Notion, Height — calm, dense-when-needed, never bureaucratic.
- Spiritual reference: a senior analyst's terminal at a serious institution. Confident. Quiet. Decisive.
- Do NOT mirror legacy government dashboards. No 13-card zero grids. No "Halaman Utama" breadcrumbs everywhere. No competing color pills.

BRAND SYSTEM — "The Clear Frame"
Inherit all design tokens, typography (Poppins exclusively), color palette, dot motif, and tone from the iLPF v2 portal spec. The workspace must feel like the same product as the public portal — same header, same brand, same voice — just operating in an authenticated context.

Key reminders:
- Electric Teal #00B8A9 is the workhorse — CTAs, accents, the signature dot
- Deep Pine #003D3A — headings, dark surfaces, the nav header, pinned messages
- Pine Deep #002624 — utility bar, footer, AI card backgrounds
- Spotlight Orange #FF6B35 — alerts, urgency, late tasks, Aku Janji reminders (max 10% of any screen)
- Soft White #FAFAF7 — page background
- Pure white — card surfaces
- Status colors: Success #10B981, Warning #F59E0B, Danger #EF4444

The DOT remains the brand's micro-signature — after the iLPF wordmark, after decisive statements ("Diluluskan.", "Dihantar.", "Selesai.").

WHO USES THIS WORKSPACE
ALPF members. Appointed by YB Menteri for 3-year terms. NOT full-time PPF staff — they come from diverse sectors (penyiaran, pendidikan, keagamaan, penguatkuasaan, undang-undang, perfileman). They watch films in panels of 3 (one Ketua Panel, two Ahli Panel). They use this system several times a week. They are PAID per session — so KPI tracking matters to them personally.

AI INTEGRATION PHILOSOPHY
The AI is a speed boost layered on top of the normal flow. ALPF can ignore every AI card and do the job manually exactly like before. AI never blocks, never forces a click, never reorganizes the work. It is a sidecar, not a checkpoint.

Visual treatment: every AI element uses a dark pine-deep (#001E1C or #0A0F14) background with teal accents — unmistakably "the machine talking". Never confused with human input.

TONE OF VOICE
- Primary language: Bahasa Malaysia
- Style: Short. Decisive. Never apologetic.
- Examples:
  ✅ "3 tugasan dalam tangan. 1 lewat. Anggaran 4 jam kerja."
  ❌ "Anda mempunyai 3 tugasan yang sedang menunggu untuk diselesaikan."
  ✅ "Hantar untuk pengesahan Ketua Unit."
  ❌ "Sila tekan butang di bawah untuk menghantar laporan ini kepada Ketua Unit."

SCOPE — DELIVER THE WORKSPACE PROTOTYPE
Multiple HTML files, fully navigable, sharing one stylesheet. Reuse `assets/styles.css` from the portal build, extending with workspace-only classes prefixed `.ws-` (workspace).

Pages required for this phase:

1. /app/utama.html — Dashboard (centerpiece, validates the workspace shell)
2. /app/profil.html — User Profile (self view) + peer view as a slide-out drawer demo
3. /app/permohonan/tapisan.html — Tapisan list (assignment queue with rich filtering)
4. /app/tapisan/{id}.html — Tapisan screen (the screening workspace, preserves every feature from v3)

CONSTRAINTS
- Light mode first. Desktop-first (24"+ monitors are common), mobile-responsive (breakpoints: 1280, 1024, 768).
- WCAG AA contrast. Visible focus states. Keyboard navigation throughout — many ALPF will keyboard-shortcut while screening.
- Bahasa Malaysia copy provided verbatim in page briefs.
- Classification chips (U / P12 / 13 / 16 / 18) follow the regulatory mark spec from the portal — separate from brand teal/orange.
- The Tapisan screen preserves every feature from v3 at kdn-ilpf-retreat.myappsonline.net/ilpf/ilpf_tapisan_v3.html — confirmed; no features get dropped, only UX reorganized.

START SEQUENCE
1. Confirm you have the portal stylesheet and design tokens loaded. If not, ask for them.
2. Generate workspace-specific stylesheet extensions — new components (top bar with notification dropdowns, sidebar, contract countdown, AI suggestion cards, floating recorder, hantar modal, screening Senarai with play/delete).
3. Build the Dashboard first — validates the workspace shell.
4. Then User Profile, Tapisan List, Tapisan Screen.

Ask clarifying questions before generating.
```

---

# PART 2 — STRUCTURED SPECIFICATION

## 2.1 Information Architecture — Workspace

```
iLPF v2 Workspace (authenticated)
│
├── Utama (/app/utama)                     ← Dashboard (default landing after login)
│
├── Permohonan ▾
│   ├── Perakuan A ▾
│   │   ├── Pita ▾
│   │   │   ├── Senarai Permohonan Pita
│   │   │   ├── Pindaan Pita ›
│   │   │   ├── Sejarah Tapisan Pita
│   │   │   ├── Status Pita
│   │   │   └── Senarai TUT (PITA)
│   │   ├── Filem ›
│   │   └── Tapisan                       ← the queue we are building
│   ├── Iklan ›
│   ├── Bahan Publisiti ›
│   └── Cetak Semula ›
│
├── Stesen TV ▾
├── Cuti ▾
├── Sejarah ▾
├── Laporan ▾
└── Manual Pengguna ▾
```

The Tapisan link (under Permohonan ▾ Perakuan A ▾) is the active link that drives the workspace this spec covers. Other links are preserved structurally but not designed in this phase.

## 2.2 Design Token Extensions (workspace-only)

The workspace inherits `--teal`, `--pine`, `--pine-deep`, `--orange`, `--ink`, `--paper`, neutrals, status colors, radii, and the type scale from the portal spec. The additional tokens below are workspace-specific:

```css
:root {
  /* AI surface — distinct from regular dark surfaces */
  --ai-bg: #001E1C;
  --ai-bg-deep: #0A0F14;
  --ai-border: rgba(0, 184, 169, 0.22);
  --ai-text-primary: #FFFFFF;
  --ai-text-muted: rgba(255, 255, 255, 0.65);
  --ai-text-subtle: rgba(255, 255, 255, 0.45);
  --ai-accent: #5DCAA5;

  /* Scene category colors — for Peta Pengubahan heatmap and Adegan chips */
  --cat-ganas: #EF4444;       /* red */
  --cat-seram: #EC4899;       /* pink */
  --cat-ngeri: #A855F7;       /* purple */
  --cat-seksual: #F97316;     /* orange-red */
  --cat-kebogelan: #FB923C;   /* lighter orange */
  --cat-dadah: #6366F1;       /* indigo */
  --cat-rokok: #F59E0B;       /* amber */
  --cat-arak: #84CC16;        /* lime */
  --cat-bahasa: #06B6D4;      /* cyan */
  --cat-agama: #D97706;       /* dark amber */
  --cat-jenama: #9CA3AF;      /* neutral gray */

  /* Tindakan chip colors — for AI suggestions table */
  --tind-kabur: #FEF3C7;        /* amber light */
  --tind-kabur-text: #92400E;
  --tind-potong: #FEE2E2;       /* red light */
  --tind-potong-text: #991B1B;
  --tind-senyap: #DBEAFE;       /* blue light */
  --tind-senyap-text: #1E40AF;
  --tind-psa: #DCFCE7;          /* green light */
  --tind-psa-text: #166534;
  --tind-semak: #FEF3C7;        /* warning */
  --tind-semak-text: #92400E;

  /* Workspace-specific spacing */
  --ws-sidebar-w: 240px;
  --ws-sidebar-collapsed-w: 56px;
  --ws-topbar-h: 56px;
  --ws-floating-recorder-h: 76px;
  --ws-content-max-w: 1280px;
}
```

## 2.3 Workspace Shell Components

### 2.3.1 Top utility bar (inherits from portal §2.4.1)
Same dark pine-deep bar as the portal — `Portal Rasmi PPF · KDN` on the left, `BM/EN · OKU · Hubungi` on the right. Persists across all workspace pages.

### 2.3.2 Workspace header (replaces public-portal header)
- Background: pine-deep `#003D3A` (solid, no glass)
- Height: 56px
- Left: hamburger toggle (collapses sidebar) + iLPF wordmark + dot
- Center: nothing
- Right (top-right cluster, in order):
  - `🔔 Tugasan Panggung` with badge count (e.g. `2`) — dropdown reveals upcoming screening sessions
  - `📅 Cuti / Mesyuarat Luar` with badge count — dropdown reveals leave + external meetings of self and peers
  - User chip (avatar circle + name + chevron) — dropdown reveals: Profil saya, Tukar kata laluan, Tema (light/dark), Log keluar
- Font: white on pine

#### Tugasan Panggung dropdown content
List of upcoming screening sessions. Each row:
- Panggung number (e.g. `Panggung 1`)
- Film title
- Film ID + No. Permohonan
- Role chip (Ketua Panel teal / Ahli Panel neutral)
- Tarikh + Masa
- Tap → opens that Tapisan screen

#### Cuti / Mesyuarat Luar dropdown content
List of upcoming leave and external meetings (self + peers). Each row:
- Name (self entries bolded)
- Tarikh Mula – Tarikh Tamat
- Type label: `Cuti: temujanji hospital` / `Mesyuarat: KURSUS INDUKSI ALPF`
- Tap → opens the calendar view zoomed on that date

### 2.3.3 Sidebar (left, fixed)
- Background: pine-deep `#003D3A`
- Width: 240px (expanded), 56px (collapsed)
- All items in white-on-pine. Active item has teal left-border accent and lighter pine background.
- Parent groups (Permohonan, Stesen TV, Cuti, Sejarah, Laporan, Manual Pengguna) are collapsible. Default expanded for the currently-active group, collapsed for others.
- Icon-only mode (when collapsed): icons only, tooltips on hover.
- The active link drives the breadcrumb in the page header.

Full sidebar structure:

```
○  Utama
▼  Permohonan
   ▼  Perakuan A
      ▼  Pita
         •  Senarai Permohonan Pita
         ›  Pindaan Pita
         •  Sejarah Tapisan Pita
         •  Status Pita
         •  Senarai TUT (PITA)
      ›  Filem
      •  Tapisan                       ← active
   ›  Iklan
   ›  Bahan Publisiti
   ›  Cetak Semula
▼  Stesen TV
   •  Stesen TV Awesome
   •  Stesen TV RTM
   •  Stesen TV Al-Hijrah
   •  Stesen Unifi TV
   •  Stesen TV Sarawak
   •  Stesen Suke TV
   •  Stesen ENJOY TV
▼  Cuti
   •  Mohon Cuti
   •  Senarai Permohonan Cuti
   •  Mesyuarat / Latihan
▼  Sejarah
   •  Sejarah iLPF
   •  Sejarah eFilem
▼  Laporan
   •  Laporan Penapisan
   •  Laporan Bahan Publisiti
   •  Laporan Prestasi ALPF
▼  Manual Pengguna
   •  ALPF
```

### 2.3.4 Main content area
- Background: paper `#FAFAF7`
- Max content width: 1280px (centered, or left-aligned with right padding for wide-screen breathing room)
- Page padding: 24px on tablets, 32px on desktop

## 2.4 Workspace-Specific Components

### 2.4.1 Aku Janji overlay (transparent, non-blocking)

The legacy Aku Janji page (blocking modal on every login with 3 checkboxes + Bersetuju/Tidak Bersetuju) is replaced by a transparent overlay that appears **once per quarter** on first login of the quarter.

- Renders as a 360×420px floating card in the top-right of the Dashboard
- Card has a translucent backdrop blur, soft-orange border (rgba(255,107,53,0.25))
- Title: `Aku Janji Konflik Kepentingan KDN` (with dot)
- Eyebrow: `Pengesahan suku ini · 3 perkara`
- Three numbered statements (compact, from the original Aku Janji):
  1. Saya tidak mempunyai konflik kepentingan dengan saudara/sekutu.
  2. Saya akan mengisytiharkan kepentingan jika berlaku.
  3. Saya akur kepada tindakan tatatertib jika memungkiri.
- Single primary button: `Saya akui · Sahkan suku ini →` (teal)
- Small dismiss link: `Ingatkan saya kemudian` (closes for this session, reappears next login)
- Captured legally — backend records timestamp, IP, quarter on dismiss + confirmation
- Reappears: next quarter (Q1, Q2, Q3, Q4 boundaries)

### 2.4.2 Contract countdown widget

A small card showing remaining time on the ALPF's 3-year appointment.

Visual states based on remaining time:
- **> 90 days remaining** — calm teal. Shows years + months (`1 tahun 8 bulan lagi`)
- **60–90 days remaining** — neutral gray. Shows months + weeks (`2 bulan 1 minggu lagi`)
- **< 60 days remaining** — orange. Shows days as a tabular-number countdown (`53 hari lagi`)
- **< 14 days remaining** — orange + pulse animation. Daily ticker.

Structure:
- Eyebrow: `PELANTIKAN`
- Big number/duration in pine-deep
- Sub: appointment date + expiry date, OR (when < 60 days) handover progress

When < 60 days, an AI handover suggestion strip appears below the widget on the dashboard:
- Pine background, teal accents
- Eyebrow: `CADANGAN AI · HANDOVER`
- Body: lists open tapisan ALPF needs to clear before term ends, suggests reassignment of remaining work to other ALPF with matching expertise

### 2.4.3 AI suggestion card patterns

Three visual treatments of AI cards across the workspace:

#### A. AI sidecar strip (inline with editors)
Used for: AI Sinopsis, AI Dialog & Sarikata, AI Genre, AI Tema, AI Panel.

- Pine-deep background `#001E1C` with teal-tinted border
- Sits **below** its associated editor or field (never beside — confirmed)
- Full width of the section
- Header row: AI badge (with dot) on left + confidence + model info on right
- Body: suggestion text in white-muted
- Right: `Guna cadangan` button in teal (vertically centered)

#### B. AI dark table (for AI Cadangan Pengubahan)
Used only for the AI Cadangan Pengubahan table on the Tapisan screen — preserves the v3 visual treatment.

- Background: `#0A0F14` (slightly darker than the sidecar strip — distinguishes the data table from inline suggestions)
- Border: `0.5px solid #1F2937`
- Header strip: pine-deep `#0F1419` with sparkles icon + `CADANGAN AI PENGUBAHAN` label + meta counts + Salin Semua button
- Columns: Bil · ▶ play · Dan · Hingga · Tindakan chip · Adegan chip · Keterangan + conf · + accept button
- Row hover: subtle teal-tinted background tint
- Tindakan chips: filled neutral with bright text color per category (KABURKAN purple, POTONGKAN red, SENYAPKAN teal, PSA OVERLAY green, SEMAK MANUAL amber)
- Adegan chips: filled neutral with bright color per scene category

#### C. AI Cadangan Keputusan card (in the Keputusan box at bottom)
- Sits at the top of the Keputusan box (pine-bordered container at the bottom of the Tapisan screen)
- Pine-deep background, teal border
- Single big primary action: `Guna seluruh cadangan` — fills LBP/LDP/TUT + Klasifikasi + all 10 Pemberat in one click
- Body: explains the suggested decision in 1-2 sentences with model name + confidence

### 2.4.4 Floating Rekod Tempoh bar (Tapisan screen only)

A pinned horizontal bar along the bottom edge of the Tapisan screen viewport.

- Position: `fixed` to bottom of viewport, `left: 16px`, `right: 16px`, `bottom: 16px`
- Background: rgba(10,14,19,0.96) with `backdrop-filter: blur(20px)` (smoked-glass)
- Border: 0.5px teal-tinted
- Border-radius: 12px
- Padding: 11px 14px
- Box-shadow: subtle drop shadow for elevation

Layout (5 columns, left to right):
1. **Label column** — `REKOD TEMPOH` (small teal text, two lines, with dot)
2. **Timestamp pair** — Mula (teal) + Henti (orange), tabular-num font
3. **Pickers** — Two rows: Tindakan (Potong/Senyap/Kabur/Padam/Lain), Adegan (Ganas/Seram/Ngeri/Seksual/Kebogelan/Dadah/Rokok/Arak/Bahasa, with `+ N lagi` overflow); selected pills get filled background (Tindakan pine, Adegan orange)
4. **Note input** — 200px text input with placeholder `Catat keterangan…`
5. **Simpan button** — teal primary, small floppy icon

Behavior:
- Visible on the Tapisan screen only
- Stays in the same screen position regardless of scroll
- Has a small hide toggle on the far right (collapses to a 32×32 floating bubble in bottom-right; click bubble to re-expand)
- When the video enters fullscreen, the recorder transforms into a strip glued to the bottom of the fullscreen video (more compact, fewer pickers visible, scrollable horizontally)

### 2.4.5 Senarai Pengubahan Yang Ditapis (validated edits list)

The list of edits that have been accepted (from AI suggestions via `+` button) or recorded manually (via the floating recorder).

- Light card, white background, 0.5px gray-200 border
- Header: title + meta count `5 pengubahan direkodkan · 3 daripada AI · 2 manual`
- Table columns: Bil · Tindakan (▶ play + 🗑 delete buttons) · Dan · Hingga · Aktiviti (Tindakan chip) · Adegan chip · Keterangan
- Each cell has a small ✎ pencil icon on hover for inline edit
- Bil cell: orange circle (visual link to the bil shown in the Peta Pengubahan when an entry has a corresponding pin)
- Play button (▶): green circle. On click, opens a **popup mini-player** that loops just that segment (Dan → Hingga). Popup has an expand button to send playback to the main video player.
- Delete button (🗑): red soft-bg with red icon. On click, confirms deletion via inline confirmation row (don't use a modal — too disruptive).

### 2.4.6 Popup mini-player

A floating card that plays a single segment for verification.

- Floats centered on screen with a translucent backdrop (50% opacity, blur)
- Width: 420px
- Header: `Pengubahan #N · [TINDAKAN] · [ADEGAN]` (with chips)
- Header controls: close (X) + expand (arrows-maximize → sends to main player)
- Video pane: 16:9 aspect, loops the segment between Dan and Hingga
- Below video: tempoh meta `Tempoh: 31 saat · Klimaks pukulan + darah` + secondary link `Hantar ke pemain utama ↗`
- Tap-outside dismisses

### 2.4.7 Peta Pengubahan heat-map

The AI-generated timeline showing detected scene categories.

- Sits directly below the video player
- Pine-deep background `#001E1C`, teal-tinted border
- Header: `Peta Pengubahan — heatmap AI` (with dot) + meta `klik segmen untuk pin · N segmen dikesan`
- Track: horizontal bar, 26px tall, dark rgba background
- Segments: absolutely positioned colored bars, one per detected scene category (using `--cat-*` colors)
- Playhead position: 2px teal vertical line with subtle glow
- Time scale below track: 5 evenly-spaced markers (`00:00 · 04:30 · 09:00 · 13:30 · 18:00` for an 18-minute film, scaled to actual film duration)
- Legend strip at the bottom: swatches of each scene category shown

Interaction:
- Hover a segment: tooltip with `Bil N · [ADEGAN] · 00:MM:SS – 00:MM:SS · conf X%`
- Click a segment: jumps the video player to that timestamp, pauses, fills the floating recorder's Mula/Henti + Tindakan + Adegan with AI's suggested values (ALPF can adjust then Simpan)

### 2.4.8 Hantar untuk Pengesahan modal

Triggered by the `Hantar untuk pengesahan` button in the Tapisan screen footer.

- Centered modal, 640px wide
- Header (pine-deep): `Hantar kepada Ketua Unit` (with dot)
- Body sections:
  1. **AI Ringkasan card** (pine-deep, teal-tinted) — auto-generated summary of the decision: film name + Keputusan (LBP/LDP/TUT) + Klasifikasi + count of pengubahan + top pemberat categories + panel members. Edit link in top-right (`Edit ringkasan ↗`).
  2. **Nota untuk Ketua Unit** (textarea, 84px tall) — free text for context, panel arguments, or special attention notes.
  3. **Pengesahan akhir** (checklist) — three statements with pre-filled green checkboxes (ALPF reviews and can uncheck if not yet true):
     - Panel telah bersetuju dengan keputusan dan klasifikasi.
     - Semua pengubahan dan justifikasi telah direkodkan.
     - Saya bertanggungjawab ke atas keputusan ini sebagai Ketua Panel.
- Footer (paper background): `Batal` (ghost) + `Hantar kepada Ketua Unit →` (teal primary)

On submit: backend records the submission, transitions the application from step 7 (Tapisan & Laporan) to step 8 (Pengesahan Laporan), notifies the Ketua Unit. ALPF is redirected back to the Tapisan list with a toast confirmation.

### 2.4.9 Aliran Proses modal

Triggered by the `Aliran proses` button in the top bar.

- Centered modal, 720px wide
- Header (pine-deep): `Aliran Proses — Perakuan A Pita`
- Body: vertical step list with each step as a row
  - Step number circle (filled teal for completed, ringed teal for current, gray for future)
  - Step title + role description
  - Status pill: `Selesai · 10/03 10:51` / `Sedang berjalan` / `Menanti`
- The 11 steps:
  1. Permohonan — Syarikat menghantar permohonan
  2. Pembayaran — Syarikat menyemak invois dan membuat pembayaran
  3. Pengesahan Bayaran — Unit bayaran menyemak dan mengesahkan bayaran
  4. Pengesahan Media — Unit Pita menerima dan menyemak bahan media
  5. Penukaran Format & Muat Naik — Unit Pita menukar format dan muat naik
  6. Lantikan Panel — Penyelaras melantik Ketua Panel
  7. **Tapisan & Laporan** — Ketua Panel menonton dan menyediakan laporan (current step)
  8. Pengesahan Laporan — Pengerusi menyemak dan mengesahkan laporan
  9. Pembayaran Tambahan — Syarikat menyemak invois dan membuat pembayaran tambahan
  10. Pengesahan Bayaran Tambahan — Unit bayaran menyemak dan mengesahkan bayaran
  11. Selesai — Syarikat mencetak laporan tapisan dan Perakuan A
- Footer: `Tutup` button


# PART 3 — PAGE-BY-PAGE BRIEFS

Each brief gives: route, purpose, layout in order, real Bahasa Malaysia copy to use verbatim, and component callouts.

---

## 3.1 Dashboard — `/app/utama`

**Purpose.** Personal command center for the ALPF member. Surfaces today's work, contract status, peer activity, and personal KPIs. Replaces the legacy 13-card zero grid.

**Layout in order.**

### 3.1.1 Top utility bar + Workspace header
Per §2.3.1 and §2.3.2. Active sidebar item: `Utama`.

### 3.1.2 Greeting line
Single sentence at the top of the page content area, no card wrapper.

> **H1:** Selamat petang, [NAMA ALPF].
> **Sub:** [N] tugasan dalam tangan. [M] lewat. Anggaran [HOURS] jam kerja.

Time-of-day greeting cycles: pagi (00:00–11:59), tengah hari (12:00–13:59), petang (14:00–18:59), malam (19:00–23:59).

When all clear:
> 0 tugasan dalam tangan. Hari yang lapang.

### 3.1.3 Contract countdown widget (top-right of greeting line)
Per §2.4.2. Visual escalates based on remaining days.

### 3.1.4 Aku Janji overlay (conditional)
Per §2.4.1. Appears once per quarter on first login.

### 3.1.5 Pengumuman strip
Pinned messages from Pengerusi or Ketua Unit.

- Pine-deep card, 14px radius, 14×18px padding
- Orange pin icon (📌) on the left
- Eyebrow (small, orange): `PENGUMUMAN · KETUA UNIT` (or `· PENGERUSI`)
- Title (white, 14px semibold)
- Description (white-muted, 12px, 1.5 line-height)
- Close (X) on the right — dismisses for this user (server-side flag)

Example content:
> **PENGUMUMAN · KETUA UNIT**
> **Mesyuarat panel khas — 16 Mei 2026, 10.00 pagi.**
> Semua ALPF Pita dijemput hadir. Agenda: pindaan Garis Panduan Penapisan 2026 Bab 4. Lokasi: Bilik Mesyuarat Utama, Aras 4.

Multiple pengumuman: stack vertically with 8px gap.

### 3.1.6 Tugasan hari ini (replaces the 13-card zero grid)
Section eyebrow: `TUGASAN HARI INI`
Section CTA on the right: `Lihat semua →` (links to /app/permohonan/tapisan)

Card list. Each row:
- Panel number chip on the left (P1, P2, P3, P4) — orange background for late, neutral for normal
- Film title (semibold, ink-primary)
- Sub-meta: `Filem · FBEN20260396995` (sep dot) followed by Role chip (Ketua Panel teal pill / Ahli Panel neutral pill)
- Due cell on the right: bold status word (`Lewat 1 hari` orange / `Esok` neutral / `15 Mei` neutral) above small detail (`Sepatutnya 22/04` / `23/04 · 08:00 pg` / `4 hari lagi`)
- CTA button on the far right: `Mula tapisan →` (orange for late) / `Sedia →` (pine for upcoming) / `Lihat →` (ghost for further-out)

Show top 3-4 entries. If empty, render an encouraging empty state:
> **Tiada tugasan hari ini.**
> Anda boleh menyemak senarai penuh atau mengambil rehat yang anda berhak.

### 3.1.7 Prestasi anda (KPI tiles)
Section eyebrow: `PRESTASI ANDA`
Section CTA on the right: `Laporan penuh →` (links to /app/laporan/prestasi)

4 KPI tiles in a row. Each tile: 12px radius, 14px padding, 1fr grid columns.

| Eyebrow | Number | Sub |
|---|---|---|
| TAPISAN MINGGU INI | `[N]` filem | `[H] jam [M] min skrin` |
| DALAM TANGAN | `[N]` tugasan | `[X] lewat` (orange if non-zero) · `[Y] dalam tempoh` |
| SLA BULAN INI | `[N]%` | Purata `[D]` hari · `mengikut Piagam` (green if >= 95%, orange if < 90%) |
| CADANGAN AI | `[N]%` | `[X] daripada [Y] diterima` |

### 3.1.8 Tugasan terakhir selesai
Single horizontal card (paper bg, 0.5px border, 12px radius, 12×16px padding):
- Green checkmark icon on the left in a soft-green badge
- Body: `Tugasan terakhir selesai · [FILM TITLE] · [KEPUTUSAN]` with classification pill (P13/U/etc) inline
- Time on the right: `[TIME] lalu`
- Whole row clickable → opens that Tapisan in read-only mode

### 3.1.9 Lifetime footer strip
Very small gray text, centered, no card:
> Sepanjang pelantikan: **[N] filem ditapis** · **[H] jam skrin** · sejak [APPOINTMENT DATE]

### 3.1.10 Right rail (300px wide, sticky to viewport top)
Sits beside the main content column.

**Card 1 — Baki cuti**
- Eyebrow: `BAKI CUTI`
- Three rows:
  - Cuti rehat — `[N]/30 hari`
  - Cuti sakit — `[N]/14 hari`
  - Permohonan menunggu — `[N]`
- Footer link: `Mohon cuti →`

**Card 2 — Kalendar (compact)**
- Eyebrow: `KALENDAR · [MONTH] [YEAR]`
- 7-column mini calendar grid (I S R K J S A — Isnin to Ahad)
- Today is highlighted with orange background
- Days with tasks: small teal dot below the number
- Days with cuti: small blue dot below the number
- Days with both: stacked dots
- Footer link: `Lihat kalendar penuh →` (opens the existing iLPF calendar at /app/cuti)

**Card 3 — Cadangan AI**
- Pine-deep background, teal-tinted border, 12px radius
- Eyebrow: `CADANGAN AI` (with dot)
- Body: contextual suggestion based on current state. Examples:
  - When ALPF has a late task: `Tugasan "[FILM]" sudah lewat [N] hari. Cadangan: mulakan sebelum 11 pagi untuk pulih dalam Piagam.`
  - When contract is approaching: `Pelantikan tamat dalam [N] hari. Cadangan: serahkan 3 tugasan terbuka kepada Datin Yamunarani (kepakaran Bahasa selari).`
  - When AI acceptance rate drops: `Penerimaan cadangan AI bulan ini 62% — lebih rendah daripada purata anda 78%. Sila beri maklum balas pada cadangan yang ditolak.`
  - When everything is calm: `Hari yang lapang. Anda boleh menyemak laporan prestasi anda.`

### 3.1.11 Empty states
- No tugasan: see §3.1.6 empty state
- No pengumuman: hide the section entirely (don't show empty card)
- No late tasks: KPI tile shows `0 lewat` in normal gray (not orange)

---

## 3.2 User Profile — `/app/profil`

**Purpose.** ALPF's own profile (self view) — all personal information, contract details, lifetime KPIs. Some fields are private (visible only to self + Pengerusi); some fields are public (visible to peers when they click the ALPF in a Lantik Panel context).

The same `/app/profil` route shows the self view. A separate slide-out drawer (component, not a separate route) renders the **peer view** — what other officers see.

### 3.2.1 Self view layout

**Two-column grid:** 280px identity card (left) + 1fr main content (right).

#### Left column — Identity card
Pine-deep card, 14px radius, 20px padding, white text, centered text alignment.

- **Photo (circular, 96×96px)** — bordered with white 2px ring. If no photo, initials in pine-light background. `[PHOTO ALPF]`
- **Name** (Poppins 600, 17px, white)
- **ALPF ID** (small uppercase letter-spaced, white-muted): `ALPF/2024/00128`
- **Expertise pills** (teal-tinted background, teal text): e.g. `Penyiaran`, `Bahasa`
- **Divider** (0.5px white-12%)
- **Meta rows** (between rows, white-muted left + white right):
  - `Pelantikan` — `[DATE]`
  - `Tamat` — `[DATE]`
  - `Penggal` — `[Pertama/Kedua/Ketiga]`
- **Contract countdown block** at the bottom (teal-tinted background, soft):
  - Eyebrow: `BAKI PELANTIKAN`
  - Big duration: `[X tahun Y bulan]` (Poppins 700, 18px, white)
  - Sub: `[N] hari · [STATUS]` where STATUS is `layak diperbaharui` / `tahun terakhir` / `tempoh akhir`

#### Right column — Main content

**Tab strip across the top:**
- Maklumat saya (active)
- Akademik
- Pekerjaan
- Keluarga
- Akaun (password, 2FA, theme)

**Active tab: Maklumat saya**

##### Section 1 — Prestasi sepanjang pelantikan
Section eyebrow: `PRESTASI SEPANJANG PELANTIKAN`

4 KPI tiles same shape as the dashboard but lifetime-scoped:
- Filem ditapis · `[N]` · `[H] jam skrin`
- SLA purata · `[N]%` · `[D] hari pemprosesan`
- Sesi Ketua Panel · `[N]` · `[M] sesi sebagai Ahli`
- Cadangan AI · `[N]%` · `[X]/[Y] diterima`

##### Section 2 — Visibility strip
A soft-teal info strip with the eye icon:
> Maklumat di bawah dipaparkan kepada pegawai lain hanya apabila mereka melantik anda sebagai ahli panel.

##### Section 3 — Maklumat peribadi
Eyebrow: `MAKLUMAT PERIBADI`

White card, 12px radius, 18px padding, 2-column grid (gap 14×24).

Each field row has an uppercase 9-10px gray label above and a 13px ink value below. Private fields show a small "peribadi" tag inline next to the value.

Fields (preserving v3 set):
- Nama penuh
- No. kad pengenalan + `[private]`
- Umur
- Jantina
- Tarikh lahir
- Tempat lahir
- Bangsa
- Agama
- Warna kad pengenalan
- Alamat (full-width row)
- Negeri
- Daerah
- Poskod
- Nombor telefon + `[private]`
- Nombor telefon bimbit + `[private]`
- Emel + `[private]`
- Taraf perkahwinan
- Bahasa dikuasai (e.g. `BM (penutur asli) · BI (lancar) · Tamil (asas)`)

##### Section 4 — Peranan
Eyebrow: `PERANAN`

List of multi-role assignments (from v3). One per line, with role chip + system context:
- LPF
- LPF Stesen TV Pratonton
- LPF Stesen TV RTM
- Pegawai LPF Awesome
- Pegawai LPF Sarawak
- Pegawai LPF Suke
- Pegawai LPF ENJOY TV

##### Footer CTA
Single button at the bottom: `Kemaskini maklumat` (pine, with edit icon). Opens edit mode for the current tab.

#### Other tabs

**Akademik tab.** List of qualifications (repeater): Tahap (Diploma/Ijazah/Sarjana/PhD) · Institusi · Bidang · Tahun. Add button at the bottom.

**Pekerjaan tab.** List of past positions (repeater): Jawatan · Organisasi · Sektor · Dari – Hingga · Penerangan. Add button at the bottom.

**Keluarga tab.** Spouse + dependants. Each: Nama · Hubungan · No. KP · Tarikh lahir.

**Akaun tab.**
- Tukar kata laluan (form with old + new + confirm)
- Pengesahan 2 langkah (toggle + setup wizard)
- Tema (Light / Dark / Auto — saved per user)
- Bahasa antara muka (BM / EN — saved per user)
- Sesi aktif (table of recent logins with device, IP, last activity, Tamatkan sesi button)
- Log keluar daripada semua peranti (red ghost button)

### 3.2.2 Peer view drawer (slide-out from right)

Triggered when another officer (Pengerusi, Penyelaras, Ketua Unit) clicks an ALPF's name in any Lantik Panel context.

- Slides in from the right edge, 380px wide, full viewport height
- Backdrop: translucent dark overlay (clickable to dismiss)
- Smooth animation (transform translateX, 250ms ease)

#### Drawer header (pine-deep)
- Eyebrow: `PROFIL RINGKAS · CALON AHLI PANEL`
- Right: `Profil penuh ↗` link (opens read-only public profile in new tab) + close (X)

#### Drawer body

**1. Identity strip**
- Photo (56×56 circle)
- Name (15px semibold) + sub `ALPF sejak [DATE] · Penggal [Pertama/Kedua]`
- Pills (teal-tinted): expertise + bahasa

**2. Beban kerja semasa**
Section eyebrow: `BEBAN KERJA SEMASA`
3-card grid:
- Dalam tangan — `[N] tugasan`
- Lewat — `[N] tugasan` (orange if non-zero)
- Sesi minggu ini — `[N] terjadual`

**3. Kadar kehadiran (12 bulan)**
Section eyebrow: `KADAR KEHADIRAN (12 BULAN)`
Single card with:
- Label: `Hadir dan selesai`
- Big number: `[N]%` (green if >= 95%, orange < 90%, red < 80%)
- Progress bar (matching color)
- Sub: `[N] sesi dihadiri · [M] tidak dihadiri · [K] lewat hantar laporan`

**4. 3 tapisan terkini**
Section eyebrow: `3 TAPISAN TERKINI`
Three rows. Each: Film name + Date · Classification chip on the right.

**5. Primary CTA at the bottom**
- `Lantik sebagai Ahli Panel` (teal full-width)
- Secondary link: `Pilih ALPF lain ↗`

### 3.2.3 Public profile page (read-only, opens in new tab from peer drawer)

Same self-view layout but:
- Photo/name/expertise public
- All "private" fields hidden (no IC, no phone, no email, no address)
- Lifetime KPIs shown (these are public)
- Beban kerja + kadar kehadiran shown
- Akademik tab: shows education (institutions + qualifications + years) but not personal addresses
- Pekerjaan tab: shows past positions (titles + organizations) but not contact info
- Keluarga tab: HIDDEN entirely
- Akaun tab: HIDDEN entirely
- No "Kemaskini maklumat" CTA


---

## 3.3 Tapisan List — `/app/permohonan/tapisan`

**Purpose.** ALPF's assignment queue. Replaces the legacy table cluttered with Aliran Proses + bulky controls. Optimizes for "what should I work on next" with urgency-aware filtering.

### 3.3.1 Layout in order

**Page header.**
- H1: `Senarai Tapisan`
- Sub: `[N] tugasan dalam tangan · [M] lewat · [K] selesai minggu ini`
- Right cluster: `Eksport` ghost button (icon + label) + `Kolum` ghost button (column visibility toggle)

**Aliran Proses bar (compact, pine-deep).**
- Single horizontal pine-deep strip below the page header
- Format: `Aliran proses semasa · [STEP CHIP] → [NEXT STEP] · Lihat 11 langkah penuh ↗`
- The current step chip is teal-tinted; next step is muted white
- The "Lihat 11 langkah penuh" link opens the Aliran Proses modal (§2.4.9)

**Filter chips row.**
A horizontal row of pill-shaped chips with counts:
- Status: `Semua [N]` · `Lewat [N]` · `Hari ini [N]` · `Minggu ini [N]` · `Selesai [N]`
- Visual separator: ·
- Jenis: `Filem` · `Pita` · `TV` · `Iklan` · `Bahan Publisiti`
- Active chip: pine-deep filled, white text
- Inactive chip: white background, gray text
- Counts: small gray number after the label (white-muted when active)
- Right side: search input `Cari tajuk, no. permohonan, pengedar…` (with search icon)

**Results table.**
White card, 12px radius, 1px border. Table head has small uppercase letter-spaced labels in gray on paper background.

Columns:
1. Panel chip (P1/P2/P3/P4 — short for Panggung 1/2/3/4, or a checkmark icon for selesai rows)
2. Tajuk + sub-meta line (`[FILM ID] · [PENGEDAR] · [NO. PENDAFTARAN]`)
3. Tujuan (e.g. `Tayangan Pawagam`, `Tayangan TV (Bukan VOD)`, `Bahan Publisiti`)
4. No. Permohonan (monospace-feeling, smaller)
5. Peranan (Ketua Panel teal pill / Ahli Panel neutral pill)
6. Jenis (Filem / Pita / TV / Iklan / Publisiti — neutral text)
7. Jangkaan Laporan (bold status + sub-detail; orange when late, amber when due tomorrow, neutral otherwise)
8. CTA button (context-aware: orange `Mula tapisan →` for late, pine `Sambung →` for in-progress, neutral `Buka →` for upcoming, ghost `Lihat ↗` for selesai)

**~25-30 sample rows** — mix of statuses and types. Real-feeling Malaysian + international titles, 2025-2026. Late rows at the top, then due-soon, then upcoming, then selesai (dimmed) at the bottom.

Sample dataset (use these verbatim, generate 15-20 more rows in similar style):

| Panel | Tajuk | Tujuan | No. Permohonan | Peranan | Jenis | Jangkaan |
|---|---|---|---|---|---|---|
| P1 (late) | Dummy Film 21042026 Rayuan — 003 — *FBEN20260396995 · Astro Shaw Sdn Bhd · 1039592* | Tayangan Pawagam | PCBM20260396995 | Ketua Panel | Filem | Lewat 1 hari · Sepatutnya 22/04 |
| P1 (late) | Data Refresher Course — *FBAF20260397009 · Filem Negara Malaysia · 1039600* | Tayangan Amal | PCBM20260397009 | Ketua Panel | Filem | Lewat 1 hari · Sepatutnya 22/04 |
| P1 (due) | Dummy Pita 10032026 Ckeditor 002 — *PCBM20260396966 · Network Twenty One · 1039575* | Tayangan TV (Bukan VOD) | PCBM20260396966 | Ketua Panel | Pita | Esok · 15/05 · 5 hari sejak hantar |
| P2 | Sheriff: Narko-Integriti 2 — Trailer — *BP2026000412 · Astro Shaw Sdn Bhd* | Bahan Publisiti | BPCBM20260000412 | Ahli Panel | Publisiti | 15 Mei · 4 hari lagi |
| P2 | Polis Evo 4 — Trailer Versi 2 — *BP2026000419 · Astro Shaw Sdn Bhd* | Bahan Publisiti | BPCBM20260000419 | Ahli Panel | Publisiti | 15 Mei · 4 hari lagi |
| P3 | Inside Out 3 — Versi Dubbing BM — *PCBM20260397042 · Walt Disney Malaysia* | Tayangan Pawagam | PCBM20260397042 | Ahli Panel | Filem | 18 Mei · 7 hari lagi |
| P3 | Drama Pilihan Malaya — Episod 8 — *TV2026000287 · RTM* | Tayangan TV (RTM) | TVCBM20260000287 | Ketua Panel | TV | 19 Mei · 8 hari lagi |
| P4 | Iklan Petronas Tahun Baharu Cina 2026 — *I2026/02/0353 · Naga DDB Tribal* | Iklan TV | ICBM20260000353 | Ahli Panel | Iklan | 20 Mei · 9 hari lagi |
| P3 | Mat Kilau: Pendekar Pahang — *PCBM20260396921 · Studio Kembara* | Tayangan Pawagam | PCBM20260396921 | Ahli Panel | Filem | 21 Mei · 10 hari lagi |
| P4 | Iklan Tealive Ramadan 2026 — *I2026/03/0411 · Naga DDB Tribal* | Iklan TV | ICBM20260000411 | Ahli Panel | Iklan | 23 Mei · 12 hari lagi |
| P3 | Bercakap Dengan Jin: Episod Akhir — *PCBM20260397118 · KRU Studios* | Tayangan Pawagam | PCBM20260397118 | Ketua Panel | Filem | 25 Mei · 14 hari lagi |
| P4 | Upin & Ipin Klasik — Pakej DVD — *PCBM20260397156 · Les' Copaque Production* | Pita & DVD | PCBM20260397156 | Ahli Panel | Pita | 26 Mei · 15 hari lagi |
| ✓ (done) | Polis Evo 4 — *PCBM20260397001 · Astro Shaw Sdn Bhd* | Tayangan Pawagam | PCBM20260397001 | Ketua Panel | Filem | **P13 · Lulus dgn pengubahan** · Selesai 2 jam lalu |
| ✓ (done) | Upin & Ipin: Lagenda Pulau — *PCBM20260396852 · Les' Copaque Production* | Tayangan Pawagam | PCBM20260396852 | Ahli Panel | Filem | **U · Lulus bersih** · Selesai 11 Mei |
| ✓ (done) | Sheriff: Narko-Integriti 2 — *PCBM20260396789 · Astro Shaw Sdn Bhd* | Tayangan Pawagam | PCBM20260396789 | Ketua Panel | Filem | **18 · Lulus dgn pengubahan** · Selesai 8 Mei |

Pagination at the bottom: `Paparan 1 hingga 10 daripada [TOTAL] rekod` + page buttons.

**Empty states.**
- No tugasan at all: friendly empty state with calendar illustration + `Tiada tugasan dalam tangan. Hari yang lapang.`
- Filter returns no results: `Tiada tugasan menepati penapis anda. Tukar penapis.` + `Buang penapis →` link.

**Row click behavior.**
Click anywhere on a row → opens the Tapisan screen for that application. For selesai rows, opens in read-only mode.

---

## 3.4 Tapisan Screen — `/app/tapisan/{id}`

**Purpose.** The screening workspace. Watch the film, record edits, write synopsis/dialog, assign panel, set classification, send to Ketua Unit. This is where ALPF spends most of their time.

This is the most complex screen in the system. Every feature from v3 (at `kdn-ilpf-retreat.myappsonline.net/ilpf/ilpf_tapisan_v3.html`) is preserved. The redesign reorganizes layout, applies the new brand, separates AI surfaces clearly, and introduces the floating recorder + popup mini-player.

### 3.4.1 Top bar
Per §2.3 — top utility bar + workspace header inherited.

### 3.4.2 Tapisan navigation bar (below header, white background, 9×16 padding)
- Left: `← Kembali` (links back to Tapisan list)
- Breadcrumb: `Senarai Tapisan › **PCBM20260396966**` (No. Permohonan in ink-primary)
- Right cluster:
  - Step chip `Langkah 7 dari 11` (teal-tinted pill)
  - `Aliran proses` button — opens Aliran Proses modal (§2.4.9)
  - `Sejarah` button — opens Sejarah ILPF/eFilem (preserves v3 buttons)

### 3.4.3 Title block (white background, 13×16 padding, bottom border)
- H1: Film title (Poppins 700, 18px)
- Sub: `Perakuan A Pita · PCBM20260396966 · [PENGEDAR]`
- Chips row: kategori chips from v3 (`Tayangan TV (Bukan VOD)`, `Cereka`, `Pita`, `2 jam 56 min`, `Tempatan`, `DVD · MP4`)
- Right column: meta block
  - `Tarikh hantar: [DATE]`
  - `**Lewat [N] hari**` (orange, bold) OR `**Jangkaan laporan: [STATUS]**`

### 3.4.4 Body — single column, 16px padding, bottom-padding 96px (to clear the floating recorder)

The body sections in order, top to bottom:

#### A · Video player
- Aspect 16:9, max-height 360px
- Pine-deep background, 11px radius
- iLPF watermark overlay top-left (5×8 padding, 0.5px white-18% border): `iLPF / Lembaga / Penapisan`
- Controls bar at the bottom of the video: play/pause, scrub track (with orange pins for accepted AI edits and amber pins for manual edits), elapsed/total time (monospace tabular-nums), volume, fullscreen toggle

#### B · Peta Pengubahan
Per §2.4.7. Sits directly below the video.

#### C · Cadangan AI Pengubahan (dark v3 style)
Per §2.4.3 pattern B. Preserves v3 visual identity.

- Header bar: sparkles icon + `CADANGAN AI PENGUBAHAN` + meta + `Salin semua` button
- Column header row (uppercase letter-spaced, white-muted)
- Data rows with: Bil · ▶ play (jumps video) · Dan · Hingga · Tindakan chip · Adegan chip · Keterangan + confidence · `+` accept button

**Sample data — 8 rows (from v3, use verbatim):**

| Bil | Dan | Hingga | Tindakan | Adegan | Keterangan + conf |
|---|---|---|---|---|---|
| 01 | 00:01:30 | 00:01:58 | KABURKAN | KEBOGELAN | Pendedahan bahagian atas badan · 92% |
| 02 | 00:03:20 | 00:03:49 | POTONGKAN | SEKSUAL | Adegan intim eksplisit + 2 profaniti · 88% |
| 03 | 00:05:14 | 00:05:42 | SENYAPKAN | SERAM | Audio jolt +9 LU; kurangkan peak −6 dB · 91% |
| 04 | 00:07:08 | 00:07:31 | SENYAPKAN | BAHASA | 3 sebutan profaniti; sarikata diganti '[…]' · 86% |
| 05 | 00:09:42 | 00:10:13 | POTONGKAN | GANAS | Klimaks pukulan + darah; potong 11s · 94% |
| 06 | 00:12:18 | 00:12:36 | PSA OVERLAY | ROKOK | Pesanan kesihatan overlay 3s; tiada potongan · 79% |
| 07 | 00:14:30 | 00:14:58 | SEMAK MANUAL | AGAMA | Simbol agama dalam konteks sensitif · 68% |
| 08 | 00:16:22 | 00:16:58 | KABURKAN | JENAMA | 2 jenama komersial dikesan tanpa pengisytiharan · 81% |

Accept (+) button: animates a soft pulse on hover. On click, adds the row to Senarai Pengubahan Yang Ditapis below.

#### D · Senarai Pengubahan Yang Ditapis
Per §2.4.5.

- Light card with header: title + meta `[N] pengubahan direkodkan · [X] daripada AI · [Y] manual`
- Table columns: Bil · Actions (▶ + 🗑) · Dan · Hingga · Tindakan · Adegan · Keterangan
- Every cell has an inline ✎ pencil icon on hover for editing
- Empty state when no edits yet: `Tiada pengubahan direkodkan. Salin cadangan AI di atas atau guna Rekod Tempoh di bawah.`

#### E · Sinopsis section
Per §2.4.3 pattern A (AI sidecar strip below editor).

- Section card with header `Sinopsis *` + meta `Tulis terus, atau guna cadangan AI di bawah`
- Rich text editor with full toolbar: B / I / U / Styles / Format / Font / Size / list / link / image
- Min height: 100px
- Below editor: AI sidecar strip
  - Eyebrow: `AI Sinopsis` (with dot) + meta `Keyakinan [N]% · BM · [WORDCOUNT] patah`
  - Suggestion text (white-muted, 11px, 1.55 line-height)
  - `Guna cadangan` button (teal, right-aligned)

Sample AI Sinopsis (preserved from v3):
> Murugan, seorang petani tua di selatan India, bergelut menghidupkan anak lelakinya Karthik yang malas. Selepas tragedi keluarga, Karthik menyusuri jejak ayahnya dan menemui rahsia gelap kampung yang berkait dengan dendam lama generasi terdahulu.

Confidence: 89%, BM, 412 patah.

#### F · Dialog & sari kata section
Same pattern. Rich text editor (compact, 60px min) + AI sidecar strip.

Sample AI Dialog (preserved from v3):
> Komposisi bahasa: **BM 78%** · BI 18% · Tamil 4%. Sarikata: **TIADA**. 5 profaniti dikesan. Cadangan: senyapkan 5 sebutan; jana sarikata BM auto dari ASR; selaras GPPF KDN 2024.

Confidence: 82%, ASR+OCR.

#### G · Genre section
- Section card with header `Genre *` + meta `multi-pilih`
- Selected chip area (paper background, dashed border): shows currently selected genres as filled pine pills with X-remove. Empty state: dashed `+ Tambah` placeholder.
- Below: AI sidecar strip with `+` add-pills for top suggestions and lower-confidence pills in muted style with percentages.

Sample AI Genre (preserved from v3):
> Berasaskan adegan, audio, dan dialog:
> + Drama, + Seram, + Misteri
> Aksi 42%, Thriller 38%
> Keyakinan 91%.

CTA: `Terima 3 teratas` button on the right.

#### H · Tema section
Same pattern as Genre.

Sample AI Tema (preserved from v3):
> Motif dikesan dari sinopsis + dialog: **kekeluargaan dan dendam**.
> + Kekeluargaan, + Dendam, + Pengorbanan
> Cinta 31%, Persahabatan 27%
> Keyakinan 84%.

CTA: `Terima 3 teratas`.

#### I · Ahli panel section
- Section card with header `Ahli panel *` + meta `3 ahli diperlukan`
- Grid of 3 panel cards (1fr 1fr 1fr):
  - Ketua Panel (filled, teal-tinted): avatar (initials), name, role pill, meta `[N] dalam tangan · [N]% hadir`
  - Ahli 1, Ahli 2: empty slots with dashed border and `+ Pilih →` link

Click an empty slot → opens the Pilih Ahli Panel modal (preserved from v3).
Click a filled panel card → opens the Peer View drawer (§3.2.2).

Below: AI sidecar with `AI Panel` eyebrow and `0 tugasan dalam tangan` meta. Body lists 2 recommended ALPF inline: name + expertise + attendance. CTA: `Guna 2 teratas`.

Sample AI Panel suggestions (preserved from v3):
> - Datin Yamunarani A/P R. Muthuthamby Pillay — Bahasa, 99% hadir
> - Dato Dr Nik Azmi Bin Nik Omar — Keagamaan, 97% hadir

#### J · Keterangan Ketua Unit section
- Section card with header `Keterangan Ketua Unit` + meta `opsyenal`
- Rich text editor (compact, 55px min)
- No AI suggestion for this field — it's pure ALPF discretion
- Placeholder: `Tambah catatan ringkas untuk Ketua Unit…`

#### K · Keputusan Tapisan (the closing move)
Pine-bordered container, white background, 14px radius, 1.5px pine border, 18px padding.

**Header row** (with bottom border):
- H2: `Keputusan Tapisan` (with dot, Poppins 700, 16px, pine)
- Right meta: `Setelah semua borang di atas selesai, buat keputusan di sini.`

**AI Cadangan Keputusan card** (pine-deep, full width within container):
- Eyebrow: `AI Cadangan Keputusan` (with dot) + meta `Keyakinan [N]% · neutron-7b`
- Body: 1-2 sentence summary of suggested decision (preserved from v3):
  > Berasaskan 5 pengubahan diterima + adegan seram berkadar tinggi (4×) + profaniti sederhana (2×): **Lulus Dengan Pengubahan, P13**. Pemberat tertinggi: Ganas Sederhana, Seram Sederhana, Bahasa Sederhana.
- Single primary action: `Guna seluruh cadangan` — fills LBP/LDP/TUT + Klasifikasi + all 10 Pemberat in one click

**Two-column grid** (Keputusan + Klasifikasi side by side):

*Keputusan column:*
- Label: `Keputusan *`
- 3-option card group (LBP / LDP / TUT):
  - Each option: 10×6 padding, 8px radius, paper background, hover: pine border. Selected: pine fill, white text.
  - Each option shows the code on top (Poppins 700, 14px) and name below (small gray)
  - LBP — `Lulus bersih`
  - LDP — `Lulus dgn pengubahan`
  - TUT — `Tidak lulus`

*Klasifikasi column:*
- Label: `Klasifikasi *`
- Row of 5 regulatory chips (U / P12 / 13 / 16 / 18) — full saturation when active, 40% opacity when inactive
- Selected chip gets a 2px white border + 4px teal outer ring
- Colors per portal spec §2.4.6: U green, P12 blue, 13 amber, 16 red, 18 black

**Conditional: Alasan TUT** (visible only when TUT is selected):
- Label: `Alasan TUT *`
- Rich text editor (full toolbar)
- Required when TUT is selected

**Pemberat matrix** (full width below the Keputusan + Klasifikasi grid):
- Label: `Pemberat` + meta `10 kategori`
- Paper background container with 11px padding
- 10 rows (one per category): label (80px wide, semibold 10px) + 7-segment scale
- Categories in order: Ganas · Seram · Ngeri · Seksual · Kebogelan · Dadah · Rokok · Arak · Bahasa: Dialog & Sari Kata · Lain-lain
- Each scale: 7 segments side by side. Active segment fills teal (segments 1-4 = green, 5-6 = orange, 7 = red — but use a single teal fill for now, allow optional severity tinting later)
- Click a segment to set the level
- Below the matrix, a 7-column label row: `Tiada · Sgt Ringan · Ringan · Sederhana · Berat · Sgt Berat · Keterlaluan`

### 3.4.5 Floating Rekod Tempoh bar
Per §2.4.4. Pinned to the bottom of the viewport throughout the Tapisan screen.

### 3.4.6 Action footer (sticky bottom strip above the floating recorder)
Wait — actually, the action footer sits **above** the floating recorder, anchored to the bottom of the page content (not the viewport). The floating recorder is a separate sticky element that sits on top.

Footer layout:
- Background: white, 1px top border
- Padding: 13×18
- Left: summary status — `[N] pengubahan` (semibold pine) + classification pill (`LDP · P13` teal-tinted) + `auto-saved [TIME] lalu` (gray)
- Right: action button cluster
  - `Kembali` (ghost)
  - `Simpan draf` (pine)
  - `Lihat laporan ↗` (ghost) — opens the report preview in a new tab
  - `Hantar untuk pengesahan →` (teal primary) — opens the Hantar modal (§2.4.8)

### 3.4.7 Scrolled state — sticky info bar

When ALPF scrolls past the video (i.e. when the video is no longer in the viewport), a sticky bar appears at the top of the content area (below the workspace header).

- Background: ink `#0A0E13`, padded 8×12
- 3-column grid: video mini-thumbnail + status info + controls

Left column — **Video mini-thumbnail:**
- 90×50px thumbnail (currently playing frame or AI-detected key frame)
- Live dot (orange) on the top-right of thumbnail when video is playing
- Beside thumbnail: title (white, semibold, 10px, truncated) + time `03:42 / 18:00 · bermain` (white-muted, tabular-nums)

Middle column — **Status info** (with 0.5px white-15% left border):
- 4 small status items, each with uppercase letter-spaced label + value
- `PENGUBAHAN` · `[N] direkodkan` (green if >0)
- `KEPUTUSAN` · `Belum dibuat` (orange) or `LDP` (white) when set
- `KLASIFIKASI` · `Belum dipilih` (orange) or `P13` (white) when set
- `PANEL` · `[N] dari 3` (orange if < 3, green if 3)

Right column — **Controls** (3 buttons, 28×28 each):
- Pause/play toggle
- Jump to Keputusan (arrow-down-to-arc icon) — scrolls page to the Keputusan box at the bottom
- Maximize (arrows-maximize icon) — scrolls page back to top, restores full video

### 3.4.8 Modals on the Tapisan screen
- Aliran Proses (§2.4.9) — triggered by top-right button
- Pilih Ahli Panel — preserves v3 modal (search + filter ALPF list)
- Pilih Genre — preserves v3 modal (multi-select chips)
- Pilih Tema — preserves v3 modal (multi-select chips)
- Hantar untuk Pengesahan (§2.4.8) — triggered by footer primary button
- Popup mini-player (§2.4.6) — triggered by ▶ in Senarai Pengubahan Yang Ditapis
- Peer View drawer (§3.2.2) — triggered by clicking an Ahli Panel name

### 3.4.9 Empty + error states

- No video uploaded: `Bahan media belum dimuat naik. Hubungi Unit Pita.` with error icon
- AI not yet processed: AI Cadangan Pengubahan card shows `AI sedang memproses video — anggaran [N] minit` with spinner
- AI failed: `AI tidak dapat memproses. Anda boleh meneruskan tapisan manual.` with retry link
- Saving in progress: footer shows `Menyimpan…` with spinner instead of `auto-saved [TIME] lalu`


---

# PART 4 — LARAVEL + BLADE HANDOFF NOTES

This section guides Claude Code (or any developer) on converting the HTML/CSS prototype into a Laravel + Blade application. It is **not** for Claude Design — Claude Design produces HTML only.

## 4.1 Recommended Laravel folder structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Workspace/
│   │   │   ├── DashboardController.php          # /app/utama
│   │   │   ├── ProfileController.php            # /app/profil
│   │   │   ├── TapisanListController.php        # /app/permohonan/tapisan
│   │   │   └── TapisanController.php            # /app/tapisan/{id}
│   │   └── Api/
│   │       ├── AiSuggestionController.php       # AI endpoints
│   │       ├── PengubahanController.php         # save/edit/delete entries
│   │       └── KeputusanController.php          # submit decision
│   ├── Middleware/
│   │   ├── EnsureAlpfRole.php                   # gate workspace routes
│   │   └── RequireAkuJanjiQuarter.php           # check Aku Janji confirmation
│   └── Requests/
│       ├── StorePengubahanRequest.php
│       ├── UpdateKeputusanRequest.php
│       └── SubmitHantarRequest.php
├── Models/
│   ├── Alpf.php
│   ├── Tapisan.php
│   ├── Pengubahan.php
│   ├── AiSuggestion.php
│   ├── PanelAssignment.php
│   ├── Keputusan.php
│   └── AkuJanjiAcknowledgement.php
└── Services/
    ├── Ai/
    │   ├── PengubahanSuggester.php
    │   ├── SinopsisSuggester.php
    │   ├── DialogSuggester.php
    │   ├── GenreSuggester.php
    │   ├── TemaSuggester.php
    │   ├── PanelSuggester.php
    │   └── KeputusanSuggester.php
    └── ContractCountdownService.php

resources/
└── views/
    ├── layouts/
    │   ├── workspace.blade.php                  # main authenticated layout
    │   └── partials/
    │       ├── utility-bar.blade.php            # top dark strip
    │       ├── workspace-header.blade.php       # pine header with notifications
    │       ├── sidebar.blade.php                # left nav
    │       └── aku-janji-overlay.blade.php      # conditional overlay
    ├── workspace/
    │   ├── dashboard/
    │   │   ├── index.blade.php
    │   │   └── partials/
    │   │       ├── greeting.blade.php
    │   │       ├── contract-widget.blade.php
    │   │       ├── pengumuman.blade.php
    │   │       ├── tugasan-list.blade.php
    │   │       ├── kpi-tiles.blade.php
    │   │       ├── tugasan-terakhir.blade.php
    │   │       ├── lifetime-footer.blade.php
    │   │       ├── baki-cuti.blade.php
    │   │       ├── compact-calendar.blade.php
    │   │       └── ai-tip.blade.php
    │   ├── profile/
    │   │   ├── index.blade.php                  # self view
    │   │   ├── public.blade.php                 # peer/public view
    │   │   └── partials/
    │   │       ├── identity-card.blade.php
    │   │       ├── kpi-prestasi.blade.php
    │   │       ├── tabs/
    │   │       │   ├── maklumat.blade.php
    │   │       │   ├── akademik.blade.php
    │   │       │   ├── pekerjaan.blade.php
    │   │       │   ├── keluarga.blade.php
    │   │       │   └── akaun.blade.php
    │   │       └── peer-drawer.blade.php
    │   ├── tapisan-list/
    │   │   ├── index.blade.php
    │   │   └── partials/
    │   │       ├── aliran-bar.blade.php
    │   │       ├── filter-chips.blade.php
    │   │       ├── results-table.blade.php
    │   │       └── empty-state.blade.php
    │   └── tapisan/
    │       ├── show.blade.php                   # main tapisan screen
    │       └── partials/
    │           ├── nav-bar.blade.php
    │           ├── title-block.blade.php
    │           ├── video-player.blade.php
    │           ├── peta-pengubahan.blade.php
    │           ├── cadangan-ai-pengubahan.blade.php
    │           ├── senarai-pengubahan.blade.php
    │           ├── sinopsis-section.blade.php
    │           ├── dialog-section.blade.php
    │           ├── genre-section.blade.php
    │           ├── tema-section.blade.php
    │           ├── panel-section.blade.php
    │           ├── keterangan-section.blade.php
    │           ├── keputusan-box.blade.php
    │           ├── floating-recorder.blade.php
    │           ├── scrolled-sticky-bar.blade.php
    │           ├── action-footer.blade.php
    │           └── modals/
    │               ├── aliran-proses.blade.php
    │               ├── pilih-ahli-panel.blade.php
    │               ├── pilih-genre.blade.php
    │               ├── pilih-tema.blade.php
    │               ├── hantar-pengesahan.blade.php
    │               └── popup-mini-player.blade.php
    └── components/
        ├── ai-card.blade.php                    # reusable AI sidecar strip
        ├── ai-table.blade.php                   # dark AI suggestions table
        ├── classification-chip.blade.php        # U/P12/13/16/18
        ├── pemberat-row.blade.php               # one category × 7 segments
        └── status-pill.blade.php                # ketua/ahli/late/etc

public/
├── css/
│   ├── tokens.css                               # design variables
│   ├── portal.css                               # shared with public portal
│   └── workspace.css                            # workspace-only extensions
└── js/
    ├── workspace.js                             # nav, sidebar collapse, dropdowns
    ├── tapisan-recorder.js                      # floating recorder logic
    ├── tapisan-video.js                         # video + Peta + scrolled state
    ├── tapisan-ai.js                            # AI accept/reject + sidecar logic
    ├── tapisan-keputusan.js                     # decision + pemberat
    └── popup-player.js                          # mini-player for Senarai
```

## 4.2 Routes (`routes/web.php`)

```php
Route::middleware(['auth', 'alpf', 'aku.janji.check'])
    ->prefix('app')
    ->name('workspace.')
    ->group(function () {
        Route::get('utama', [DashboardController::class, 'index'])->name('dashboard');

        Route::get('profil', [ProfileController::class, 'show'])->name('profile');
        Route::patch('profil', [ProfileController::class, 'update'])->name('profile.update');
        Route::get('profil/{alpf}/peer', [ProfileController::class, 'peer'])->name('profile.peer');
        Route::get('profil/{alpf}/public', [ProfileController::class, 'public'])->name('profile.public');

        Route::prefix('permohonan')->name('permohonan.')->group(function () {
            Route::get('tapisan', [TapisanListController::class, 'index'])->name('tapisan');
            // other permohonan sub-routes
        });

        Route::prefix('tapisan')->name('tapisan.')->group(function () {
            Route::get('{tapisan}', [TapisanController::class, 'show'])->name('show');
            Route::patch('{tapisan}/draf', [TapisanController::class, 'saveDraft'])->name('save-draft');
            Route::post('{tapisan}/hantar', [TapisanController::class, 'submit'])->name('submit');
        });
    });

// AJAX endpoints used from the Tapisan screen
Route::middleware(['auth', 'alpf'])
    ->prefix('api/tapisan/{tapisan}')
    ->name('api.tapisan.')
    ->group(function () {
        Route::post('pengubahan', [PengubahanController::class, 'store'])->name('pengubahan.store');
        Route::patch('pengubahan/{pengubahan}', [PengubahanController::class, 'update'])->name('pengubahan.update');
        Route::delete('pengubahan/{pengubahan}', [PengubahanController::class, 'destroy'])->name('pengubahan.destroy');
        Route::post('keputusan', [KeputusanController::class, 'save'])->name('keputusan.save');

        // AI endpoints — each returns JSON with confidence + payload
        Route::prefix('ai')->name('ai.')->group(function () {
            Route::get('pengubahan', [AiSuggestionController::class, 'pengubahan'])->name('pengubahan');
            Route::get('sinopsis', [AiSuggestionController::class, 'sinopsis'])->name('sinopsis');
            Route::get('dialog', [AiSuggestionController::class, 'dialog'])->name('dialog');
            Route::get('genre', [AiSuggestionController::class, 'genre'])->name('genre');
            Route::get('tema', [AiSuggestionController::class, 'tema'])->name('tema');
            Route::get('panel', [AiSuggestionController::class, 'panel'])->name('panel');
            Route::get('keputusan', [AiSuggestionController::class, 'keputusan'])->name('keputusan');
            Route::post('summary', [AiSuggestionController::class, 'hantarSummary'])->name('summary');
        });
    });
```

## 4.3 Database schema (key tables)

```php
// alpf table
Schema::create('alpf', function (Blueprint $table) {
    $table->id();
    $table->string('alpf_id')->unique();            // ALPF/2024/00128
    $table->foreignId('user_id')->constrained();
    $table->string('nama_penuh');
    $table->string('no_kp')->encrypted();
    $table->date('tarikh_lahir');
    $table->string('jantina');
    $table->json('bahasa_dikuasai');                 // [{lang, proficiency}]
    $table->json('expertise');                       // [Penyiaran, Bahasa, ...]
    $table->date('appointment_date');
    $table->date('expiry_date');
    $table->integer('penggal');                      // 1, 2, 3
    $table->string('photo_path')->nullable();
    // ... other personal info fields per §3.2.1
    $table->timestamps();
});

// tapisan table
Schema::create('tapisan', function (Blueprint $table) {
    $table->id();
    $table->string('no_permohonan')->unique();       // PCBM20260396966
    $table->string('film_id');                       // FBEN20260396995
    $table->string('tajuk');
    $table->string('jenis');                         // Filem, Pita, TV, Iklan, Publisiti
    $table->string('tujuan');                        // Tayangan Pawagam, Tayangan TV, etc.
    $table->string('pengedar');
    $table->date('tarikh_hantar');
    $table->date('jangkaan_laporan');
    $table->integer('current_step')->default(7);    // step in Aliran Proses
    $table->string('media_path');
    $table->integer('duration_seconds');
    $table->json('kategori_chips');                  // ['Cereka', 'Tempatan', 'DVD', 'MP4']
    $table->text('sinopsis')->nullable();
    $table->text('dialog_sarikata')->nullable();
    $table->json('genre')->nullable();
    $table->json('tema')->nullable();
    $table->text('keterangan_ketua_unit')->nullable();
    $table->enum('keputusan', ['LBP', 'LDP', 'TUT'])->nullable();
    $table->enum('klasifikasi', ['U', 'P12', '13', '16', '18'])->nullable();
    $table->text('alasan_tut')->nullable();
    $table->json('pemberat')->nullable();            // {ganas: 4, seram: 4, ...}
    $table->foreignId('ketua_panel_id')->nullable()->constrained('alpf');
    $table->timestamp('submitted_at')->nullable();
    $table->timestamps();
});

// pengubahan table — both AI-accepted and manual entries
Schema::create('pengubahan', function (Blueprint $table) {
    $table->id();
    $table->foreignId('tapisan_id')->constrained();
    $table->integer('bil');                           // display order
    $table->integer('dan_seconds');                   // 00:01:30 => 90
    $table->integer('hingga_seconds');                // 00:01:58 => 118
    $table->string('tindakan');                       // POTONGKAN/KABURKAN/SENYAPKAN/PADAM/LAIN/PSA_OVERLAY/SEMAK_MANUAL
    $table->string('adegan');                         // GANAS/SERAM/NGERI/SEKSUAL/KEBOGELAN/DADAH/ROKOK/ARAK/BAHASA/AGAMA/JENAMA/LAIN_LAIN
    $table->text('keterangan');
    $table->enum('source', ['ai', 'manual'])->default('manual');
    $table->foreignId('ai_suggestion_id')->nullable()->constrained();
    $table->decimal('ai_confidence', 4, 3)->nullable();  // 0.000 to 1.000
    $table->foreignId('recorded_by')->constrained('alpf');
    $table->timestamps();
});

// ai_suggestions table — cached AI outputs per tapisan + type
Schema::create('ai_suggestions', function (Blueprint $table) {
    $table->id();
    $table->foreignId('tapisan_id')->constrained();
    $table->string('type');                           // pengubahan, sinopsis, dialog, genre, tema, panel, keputusan
    $table->json('payload');                          // suggestion content
    $table->decimal('confidence', 4, 3);
    $table->string('model');                          // neutron-7b, etc.
    $table->json('metadata')->nullable();             // segments_sampled, language_mix, etc.
    $table->boolean('accepted')->default(false);
    $table->timestamp('generated_at');
    $table->timestamp('accepted_at')->nullable();
    $table->timestamps();
});

// panel_assignments table
Schema::create('panel_assignments', function (Blueprint $table) {
    $table->id();
    $table->foreignId('tapisan_id')->constrained();
    $table->foreignId('alpf_id')->constrained();
    $table->enum('role', ['ketua', 'ahli']);
    $table->timestamps();
});

// aku_janji_acknowledgements table
Schema::create('aku_janji_acknowledgements', function (Blueprint $table) {
    $table->id();
    $table->foreignId('alpf_id')->constrained();
    $table->string('quarter');                         // 2026-Q2
    $table->ipAddress('ip');
    $table->text('user_agent');
    $table->timestamp('acknowledged_at');
    $table->unique(['alpf_id', 'quarter']);
});
```

## 4.4 AI integration contract

Each AI endpoint returns JSON in a consistent shape so the frontend can render any AI card the same way:

```json
{
  "type": "pengubahan",
  "model": "neutron-7b",
  "confidence": 0.87,
  "generated_at": "2026-05-13T08:42:11Z",
  "metadata": {
    "segments_sampled": 36,
    "duration_seconds": 1080
  },
  "payload": [
    {
      "dan_seconds": 90,
      "hingga_seconds": 118,
      "tindakan": "KABURKAN",
      "adegan": "KEBOGELAN",
      "keterangan": "Pendedahan bahagian atas badan",
      "confidence": 0.92
    }
  ]
}
```

For Sinopsis/Dialog/Genre/Tema:
```json
{
  "type": "sinopsis",
  "model": "neutron-7b",
  "confidence": 0.89,
  "metadata": { "language": "BM", "word_count": 412 },
  "payload": { "text": "Murugan, seorang petani tua..." }
}
```

For Keputusan:
```json
{
  "type": "keputusan",
  "model": "neutron-7b",
  "confidence": 0.87,
  "metadata": { "segments_sampled": 36 },
  "payload": {
    "hantar_pengesahan": true,
    "keputusan": "LDP",
    "klasifikasi": "13",
    "pemberat": {
      "ganas": 4, "seram": 4, "ngeri": 3, "seksual": 3, "kebogelan": 3,
      "dadah": 1, "rokok": 3, "arak": 1, "bahasa": 4, "lain_lain": 1
    },
    "alternatives": {
      "U": 0.12, "P12": 0.18, "13": 0.38, "16": 0.24, "18": 0.09
    },
    "rationale": "Berasaskan 5 pengubahan diterima + adegan seram berkadar tinggi (4×)..."
  }
}
```

## 4.5 Key Blade component patterns

### `<x-ai-card>` — the AI sidecar strip

```blade
{{-- resources/views/components/ai-card.blade.php --}}
@props([
    'title',                                         // e.g. "AI Sinopsis"
    'confidence',                                    // e.g. 89
    'meta' => null,                                  // e.g. "BM · 412 patah"
    'acceptLabel' => 'Guna cadangan',
    'acceptUrl' => null,
])
<div class="ai-strip">
    <div class="ai-body">
        <div class="ai-head">
            <span class="ai-badge">
                <span class="ai-dot"></span>
                {{ $title }}
            </span>
            <span class="ai-conf">
                Keyakinan <strong>{{ $confidence }}%</strong>
                @if($meta) · {{ $meta }} @endif
            </span>
        </div>
        <div class="ai-suggestion">{{ $slot }}</div>
    </div>
    @if($acceptUrl)
        <button type="button" class="ai-accept" data-accept-url="{{ $acceptUrl }}">
            {{ $acceptLabel }}
        </button>
    @endif
</div>
```

Usage in `sinopsis-section.blade.php`:

```blade
<x-ai-card
    title="AI Sinopsis"
    :confidence="$aiSinopsis->confidence_pct"
    :meta="$aiSinopsis->meta"
    :accept-url="route('api.tapisan.ai.sinopsis', $tapisan)"
>
    {{ $aiSinopsis->payload['text'] }}
</x-ai-card>
```

### `<x-classification-chip>` — the U/P12/13/16/18 regulatory chips

```blade
@props(['code', 'active' => false])
@php
    $colors = [
        'U'   => 'bg-success',
        'P12' => 'bg-info',
        '13'  => 'bg-warning',
        '16'  => 'bg-danger',
        '18'  => 'bg-ink',
    ];
@endphp
<button type="button"
    class="cls-chip {{ $colors[$code] }} {{ $active ? 'active' : '' }}"
    data-code="{{ $code }}"
>{{ $code }}</button>
```

### `<x-pemberat-row>` — single category row in the matrix

```blade
@props(['kategori', 'label', 'value' => 0])
<div class="pem-row">
    <span class="pem-label">{{ $label }}</span>
    <div class="pem-scale" data-kategori="{{ $kategori }}">
        @for($i = 0; $i < 7; $i++)
            <button type="button"
                class="pem-seg {{ $i <= $value ? 'active' : '' }}"
                data-level="{{ $i }}"
            ></button>
        @endfor
    </div>
</div>
```

## 4.6 JavaScript modules (vanilla, no framework needed)

The Tapisan screen has the most interactivity. Suggested module split:

**`tapisan-recorder.js`** — floating bar logic
- Capture Mula/Henti timestamps from video.currentTime
- Manage Tindakan + Adegan selection state
- Submit → POST `/api/tapisan/{id}/pengubahan` → append to Senarai
- Show toast on success

**`tapisan-video.js`** — video + Peta + scrolled state
- Sync playhead position with Peta Pengubahan
- Click Peta segment → seek video + pause + prefill recorder
- IntersectionObserver on video element → toggle scrolled-sticky-bar visibility
- Track segment overlap → highlight active segment in Peta when current time is inside it

**`tapisan-ai.js`** — AI accept/reject logic
- Click `+` on AI Cadangan Pengubahan row → POST to pengubahan with source=ai
- Click `Salin semua` → bulk-add all AI suggestions
- Click `Guna cadangan` on sidecar strip → fill the associated editor
- Click `Guna seluruh cadangan` on Keputusan AI card → fill LBP/LDP/TUT + klasifikasi + pemberat
- Track AI acceptance rate locally for KPI

**`tapisan-keputusan.js`** — decision + pemberat
- Manage LBP/LDP/TUT mutually exclusive selection
- Toggle Alasan TUT field visibility based on TUT selection
- Manage klasifikasi single-select
- Pemberat segment click → update value, save to local state
- Auto-save draft every 30 seconds → PATCH `/app/tapisan/{id}/draf`

**`popup-player.js`** — mini player for Senarai play button
- Open popup at center
- Set video src + currentTime = dan_seconds
- Listen for timeupdate → pause when currentTime >= hingga_seconds, loop back
- Expand button → close popup + seek main player to dan_seconds

## 4.7 Frontend assets — what to keep vs replace

From v3 at `kdn-ilpf-retreat.myappsonline.net/ilpf/ilpf_tapisan_v3.html`, keep:
- The AI Cadangan Pengubahan dark color scheme
- The Tindakan + Adegan color mapping
- The Peta Pengubahan heatmap idea (visualize as colored segments on a timeline)
- The Pemberat 10-category × 7-level structure
- The classification cadangan card with sample distribution
- The Aliran Proses 11-step list

Replace:
- The legacy form-heavy layout (replace with single scroll + Keputusan at bottom)
- The static Rekod Tempoh card (replace with floating bottom bar)
- The inline AI suggestion icons (replace with consistent AI sidecar strip pattern)
- The empty Senarai Pengubahan placeholder (replace with the play/delete/edit-enabled list)
- The Hantar button as a direct submit (replace with the Hantar modal containing AI summary)

## 4.8 Build order recommendation

1. **Workspace shell** — utility bar, header, sidebar, layout file
2. **Dashboard** — validates the shell
3. **Profile (self view)** — validates KPI tile pattern + tabs
4. **Tapisan List** — validates table + filter pattern
5. **Tapisan Screen — Phase 1** — video, Peta Pengubahan, Cadangan AI table, Senarai (no AI sidecars yet, no Keputusan box)
6. **Tapisan Screen — Phase 2** — Sinopsis/Dialog/Genre/Tema/Panel sections with AI sidecars
7. **Tapisan Screen — Phase 3** — Keputusan box + Pemberat matrix + Hantar modal
8. **Tapisan Screen — Phase 4** — Floating recorder + popup mini-player + scrolled sticky bar
9. **Peer view drawer** — slide-out component used from Panel section + dashboard
10. **Aku Janji overlay + Contract countdown** — final polish

## 4.9 Things the project owner must supply before launch

| Item | Where it's used |
|---|---|
| ALPF photos (or default avatar) | Profile, Peer drawer, Panel cards |
| AI model name(s) to display | All AI cards (currently shown as `neutron-7b`) |
| Real AI endpoint URLs | All AI cards' `data-accept-url` |
| Logo SVG (workspace variant) | Workspace header |
| Aku Janji legal copy (final approved version) | Aku Janji overlay |
| Pengumuman authoring workflow | Dashboard Pengumuman strip |
| Real ALPF names + ALPF IDs | Throughout |
| Cuti rehat / sakit annual entitlements | Profile, Dashboard Baki Cuti |
| Public profile visibility rules (legal review) | Profile peer view |
| Notification dropdowns data sources | Workspace header |

---

# CLOSING NOTES

## Companion document
This spec lives alongside `ilpf-v2-portal-spec.md` (public-facing portal). Both share:
- Brand system (The Clear Frame)
- Design tokens
- Typography (Poppins exclusively)
- The DOT motif
- Tone of voice (Bahasa Malaysia primary)
- Stylesheet (`assets/styles.css`)

## What this spec preserves from v3
Every feature from `ilpf_tapisan_v3.html` is preserved. The redesign reorganizes the UX — it does not remove functionality. The list of preserved features:
- Video player with iLPF watermark
- Aliran Proses 11-step modal
- Sejarah ILPF + Sejarah eFilem buttons
- Kategori chips (Tayangan TV / Cereka / Pita / duration / Tempatan / DVD / MP4)
- Rekod Tempoh (Mula/Berhenti + Tindakan + Adegan + Keterangan)
- Cadangan AI Pengubahan table with all 8 sample rows and confidence percentages
- Peta Pengubahan timeline heatmap
- Senarai Pengubahan Yang Ditapis with play/delete/inline-edit
- Sinopsis editor + AI Sinopsis card
- Dialog & Sari Kata editor + AI Dialog card with ASR+OCR
- Genre multi-select + AI Genre card
- Tema multi-select + AI Tema card
- Lantik Ahli Panel (Ketua + 2 Ahli) + AI Panel card
- Keterangan Ketua Unit field
- Keputusan picker (LBP/LDP/TUT)
- Klasifikasi chips (U/P12/13/16/18)
- AI Cadangan Keputusan with model + confidence + classification distribution
- Pemberat matrix (10 categories × 7 levels)
- Alasan TUT field (conditional)
- Action footer (Kembali/Simpan/Lihat Laporan/Hantar)
- Pilih Genre, Pilih Ahli Panel modals

## What this spec adds
- Aku Janji as transparent quarterly overlay (replaces blocking modal)
- Personal command center dashboard with KPIs, contract countdown, AI suggestions
- Profile with self + peer views, lifetime KPIs, contract countdown
- Single-column Tapisan layout with Keputusan as the closing move
- Floating Rekod Tempoh bar (replaces in-page recorder card)
- Popup mini-player for Senarai validation
- Hantar untuk Pengesahan modal with AI-generated summary + Ketua Unit note
- Scrolled sticky bar with mini video + decision status
- Brand-consistent AI surface treatment (pine-deep + teal across every AI element)

---

**End of specification.**

*This document is the single source of truth for the iLPF v2 ALPF workspace build. Hand to Claude Design for HTML prototyping. Hand to Claude Code with Part 4 for Laravel + Blade conversion.*
