import { AUTO_REFRESH_MS, EXPORT_URL } from './config.js';
import { fetchProfiles } from './sheets.js';
import { ANIMAL_EMOJI, ANIMAL_DATA, MBTI_DATA, emojiFor } from './transform.js';
import { renderScoreBars } from './charts.js';

/* ---- State ---- */
let PROFILES = [];
let currentIdx = 0;

/* ---- DOM refs ---- */
const card       = document.getElementById('card');
const select     = document.getElementById('nameSelect');
const statusPill = document.getElementById('liveStatus');
const statusText = document.getElementById('statusText');
const refreshBtn = document.getElementById('refreshBtn');

/* ---- Helpers ---- */
function setStatus(state, text) {
  statusPill.classList.remove('loading', 'error');
  if (state === 'loading') statusPill.classList.add('loading');
  if (state === 'error')   statusPill.classList.add('error');
  statusText.textContent = text;
}

function listItems(arr) {
  return arr.map(x => `<li>${x}</li>`).join('');
}

/* ---- Render ---- */
function renderProfile(idx) {
  const p = PROFILES[idx];
  if (!p) { renderEmpty(); return; }

  const m = p.mbti && MBTI_DATA[p.mbti] ? MBTI_DATA[p.mbti] : null;
  const a = ANIMAL_DATA[p.animal];

  const declareCards = p.declare.map(d => `
    <div class="declare-card">
      <div class="stage">${d.stage}</div>
      <div class="q">${d.q}</div>
      <div class="icon">${emojiFor(d.label)}</div>
      <div class="label">"${d.label}"</div>
    </div>`).join('');

  const mbtiBlock = m ? `
    <div class="persona-block mbti">
      <div class="persona-head">
        <div class="persona-tag">MBTI Profile</div>
        <div class="persona-title">${p.mbti}</div>
        <div class="persona-def">${m.def}</div>
      </div>
      <div class="persona-body">
        <div class="facet"><h4>Strengths</h4><ul>${listItems(m.s)}</ul></div>
        <div class="facet"><h4>Weaknesses</h4><ul>${listItems(m.w)}</ul></div>
        <div class="facet"><h4>Interests</h4><ul>${listItems(m.i)}</ul></div>
        <div class="facet"><h4>Suitable Tasks</h4><ul>${listItems(m.t)}</ul></div>
      </div>
    </div>` : `
    <div class="persona-block mbti">
      <div class="persona-head">
        <div class="persona-tag">MBTI Profile</div>
        <div class="persona-title">—</div>
        <div class="persona-def">Not declared</div>
      </div>
      <div class="persona-body" style="grid-template-columns:1fr">
        <p style="color:var(--muted);font-size:13px;font-style:italic;font-family:'Fraunces',serif">No MBTI provided in this response.</p>
      </div>
    </div>`;

  const animalBlock = `
    <div class="persona-block animal">
      <div class="persona-head">
        <div class="persona-tag">Inner Animal</div>
        <div class="persona-title"><span class="emoji">${ANIMAL_EMOJI[p.animal]}</span> ${p.animal}</div>
        <div class="persona-def">${a.def}</div>
      </div>
      <div class="persona-body">
        <div class="facet"><h4>Strengths</h4><ul>${listItems(a.s)}</ul></div>
        <div class="facet"><h4>Weaknesses</h4><ul>${listItems(a.w)}</ul></div>
        <div class="facet"><h4>Interests</h4><ul>${listItems(a.i)}</ul></div>
        <div class="facet"><h4>Suitable Tasks</h4><ul>${listItems(a.t)}</ul></div>
      </div>
      <div class="animal-art">${ANIMAL_EMOJI[p.animal]}</div>
    </div>`;

  const safeName = p.name.replace(/</g, '&lt;');
  const headName = safeName.length > 1
    ? safeName.slice(0, -1) + `<em>${safeName.slice(-1)}</em>`
    : `<em>${safeName}</em>`;

  card.innerHTML = `
    <div class="hero">
      <div class="hero-inner">
        <div>
          <div class="hero-tag">Personality Dossier · ${String(idx + 1).padStart(2, '0')} / ${String(PROFILES.length).padStart(2, '0')}</div>
          <h1>${headName}</h1>
          <div class="hero-meta">
            <div class="item"><span class="dot"></span> ${p.email}</div>
            <div class="item"><span class="dot"></span> ${p.phone}</div>
          </div>
        </div>
        <div class="hero-badges">
          <div class="badge mbti">
            <div class="ring">${p.mbti || '—'}</div>
            <div>
              <div class="label">MBTI Type</div>
              <div class="value">${p.mbti || 'Not declared'}</div>
              <div class="sub">${m ? m.def : '—'}</div>
            </div>
          </div>
          <div class="badge animal">
            <div class="ring">${ANIMAL_EMOJI[p.animal]}</div>
            <div>
              <div class="label">Inner Animal</div>
              <div class="value">${p.animal}</div>
              <div class="sub">${a.def}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scores">${renderScoreBars(p.scores)}</div>
    <div class="section-head">
      <h2><span class="ord">01</span>Self Declaration</h2>
      <div class="sub">three animals · three layers of self</div>
    </div>
    <div class="declare">${declareCards}</div>
    <div class="section-head">
      <h2><span class="ord">02</span>Personality Profile</h2>
      <div class="sub">MBTI temperament &middot; Inner-animal archetype</div>
    </div>
    <div class="persona">${mbtiBlock}${animalBlock}</div>
    <div class="foot">
      <span>Synced from Google Sheets · ${PROFILES.length} response${PROFILES.length === 1 ? '' : 's'}</span>
      <span class="pill">Auto-refresh every 60s</span>
    </div>`;

  card.classList.remove('fade');
  void card.offsetWidth;
  card.classList.add('fade');
}

function renderEmpty() {
  card.innerHTML = `
    <div class="state">
      <div class="icon" style="background:#F0EBDF">😭</div>
      <h3>No responses yet</h3>
      <p>The sheet is reachable but has no completed entries. Submit the form and click <strong>Refresh</strong>.</p>
    </div>`;
}

function renderError(message) {
  card.innerHTML = `
    <div class="state error">
      <div class="icon">⚠️</div>
      <h3>Can't reach the Google Sheet</h3>
      <p>${message}</p>
      <p style="margin-top:8px"><strong>Checklist:</strong></p>
      <ol style="text-align:left;color:var(--ink-soft);font-size:13px;line-height:1.7;max-width:520px;list-style:decimal inside">
        <li>Sheet is shared <code>Anyone with the link → Viewer</code></li>
        <li>If opened locally, your browser may block direct fetch (CORS) — host the file or use the proxy fallback (already attempted)</li>
        <li>Test the CSV URL in incognito: <a href="${EXPORT_URL}" target="_blank" style="color:var(--accent)">open CSV in new tab</a></li>
      </ol>
      <p style="margin-top:12px"><button onclick="load()" class="refresh-btn" style="background:var(--accent);color:white;border:none">Try again</button></p>
    </div>`;
}

/* ---- Load ---- */
async function load() {
  refreshBtn.classList.add('spinning');
  setStatus('loading', 'Syncing…');
  try {
    const next = await fetchProfiles();
    const prevName = PROFILES[currentIdx]?.name;
    PROFILES = next;

    select.innerHTML = '';
    if (PROFILES.length === 0) {
      select.innerHTML = '<option>No data</option>';
      select.disabled = true;
      renderEmpty();
      setStatus('ok', '0 responses');
    } else {
      PROFILES.forEach((p, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = p.name;
        select.appendChild(opt);
      });
      select.disabled = false;
      const keepIdx = PROFILES.findIndex(p => p.name === prevName);
      currentIdx = keepIdx >= 0 ? keepIdx : 0;
      select.value = currentIdx;
      renderProfile(currentIdx);
      setStatus('ok', `Live · ${PROFILES.length} response${PROFILES.length === 1 ? '' : 's'}`);
    }
  } catch (err) {
    console.error(err);
    setStatus('error', 'Sync failed');
    renderError(err.message);
  } finally {
    setTimeout(() => refreshBtn.classList.remove('spinning'), 400);
  }
}

/* ---- Init ---- */
select.addEventListener('change', e => {
  currentIdx = Number(e.target.value);
  renderProfile(currentIdx);
});
refreshBtn.addEventListener('click', load);

load();
setInterval(load, AUTO_REFRESH_MS);
