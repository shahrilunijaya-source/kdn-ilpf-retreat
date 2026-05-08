# Stack ADR — KDN-iLPF Profil

**Decision date:** 2026-05-08
**Status:** LOCKED

---

## Decision

Plain HTML/CSS/JS. No framework. No build tool. No backend.

## Context

- Simple internal dashboard, data from Google Sheets
- Small scope — profile analytics display only
- Single developer, no CI/CD requirement
- Must run from a folder, no server setup

## Options Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **Plain HTML/JS** | Zero setup, instant deploy, no dependencies | Manual DOM, no reactivity | **CHOSEN** |
| Next.js | React ecosystem, good DX | npm install, build step, overkill | Rejected |
| Laravel | Familiar from JKPTG | Needs PHP server, way overkill | Rejected |
| Flask/FastAPI | Good API layer | Needs Python runtime + deploy | Rejected |

## Constraints

- No `npm install` in this project
- All dependencies via CDN only
- Must open as `index.html` in browser (or GitHub Pages)
- If Google Sheet is private, use API key in `js/config.js`

## Revisit Trigger

Revisit this decision ONLY if:
- Data needs server-side processing (auth, write-back, sensitive keys)
- Dashboard grows beyond 5+ pages
- Team grows beyond 1 developer
