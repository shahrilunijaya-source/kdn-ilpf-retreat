# KDN-iLPF Profil — Build Instructions

**Project:** KDN iLPF Profile Dashboard
**Purpose:** Read data from Google Sheets → display analytics/dashboard
**Stack:** LOCKED. Plain HTML/CSS/JS. No build step. No backend. No frameworks.
**Default model:** Sonnet.

---

## Start Here (every new session)

1. Read `STACK-ADR.md` — stack decision (no re-debate)
2. Read `SHEETS-PATTERNS.md` — Google Sheets integration gotchas
3. Check `STATE.md` — current progress
4. Resume from current stage

---

## Workflow Stages

### Stage 1 — Sheets Setup
| Step | Action |
|------|--------|
| 1a | User provides Google Sheet URL or ID |
| 1b | Determine access method: Published CSV (public) or API Key (private) |
| 1c | Write `js/config.js` — sheet ID, tab GIDs, column mappings |
| 1d | Test fetch — log raw data to console, confirm columns parse correctly |
| 1e | Write `js/sheets.js` — fetchData(), parseCSV(), cache in localStorage |

### Stage 2 — Data Model
| Step | Action |
|------|--------|
| 2a | Map sheet columns → JS object fields |
| 2b | Write `js/transform.js` — clean, normalize, group data |
| 2c | Identify KPIs: what counts, aggregates, filters the dashboard needs |

### Stage 3 — Dashboard UI
| Step | Action |
|------|--------|
| 3a | Wireframe: stat cards + charts + table layout |
| 3b | Write `index.html` — semantic structure, Tailwind CDN |
| 3c | Write `js/charts.js` — Chart.js via CDN, all chart configs |
| 3d | Write `js/ui.js` — render cards, tables, filters |

### Stage 4 — Polish & Deploy
| Step | Action |
|------|--------|
| 4a | `/design-review` or `/browse` — visual check |
| 4b | Test on mobile (responsive) |
| 4c | Deploy: GitHub Pages or drop folder to hosting |

---

## Stack (LOCKED)

| Layer | Choice | Why |
|-------|--------|-----|
| Markup | HTML5 | Zero setup |
| Style | Tailwind CDN | Utility-first, no build |
| Interactivity | Vanilla JS (ES modules) | No transpile needed |
| Charts | Chart.js CDN | Best plain-JS chart lib |
| Data source | Google Sheets (CSV or API) | User-managed, no DB |
| Hosting | Static (GitHub Pages / folder) | No server needed |

No Vue, no React, no bundler, no npm. If complexity grows → revisit in `STACK-ADR.md`.

---

## Google Sheets Integration

See `SHEETS-PATTERNS.md` for full patterns. Quick rules:
- **Public sheet → use CSV export URL** (no API key needed)
- **Private sheet → use Sheets API v4 with API key** (key lives in `js/config.js`, NOT hardcoded in HTML)
- Always cache fetched data in `sessionStorage` — avoid hitting Sheets on every render
- Parse dates as `Date` objects early; don't re-parse in UI code

---

## Rules

- **Read before edit.** Read file before modifying.
- **No inline styles.** Tailwind classes only.
- **No `var`.** Use `const`/`let`.
- **Config not hardcoded.** Sheet IDs, API keys → `js/config.js`.
- **Update `STATE.md`** after each stage.
- **No re-debate stack.** See `STACK-ADR.md`.

---

## File Layout

```
Profil/
├── index.html          # Main dashboard page
├── CLAUDE.md           # This file
├── STACK-ADR.md        # Stack decision record
├── SHEETS-PATTERNS.md  # Sheets integration patterns
├── STATE.md            # Current progress
├── js/
│   ├── config.js       # Sheet IDs, API keys, column maps
│   ├── sheets.js       # fetchData(), parseCSV(), cache
│   ├── transform.js    # Data cleaning + aggregation
│   ├── charts.js       # Chart.js chart definitions
│   └── ui.js           # DOM rendering, filters
└── css/
    └── app.css         # Custom overrides (minimal)
```
