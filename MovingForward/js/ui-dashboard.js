import { AUTO_REFRESH_MS, EXPORT_URL } from './config.js';
import { fetchResponses } from './sheets.js';
import { countTags, countField, aiColor, freqColor } from './transform.js';
import { renderHBar, renderPills } from './charts.js';

/* ---- State ---- */
let RESPONSES = [];
let searchQ = '';

/* ---- DOM refs ---- */
const grid        = document.getElementById('grid');
const gridCount   = document.getElementById('gridCount');
const statusPill  = document.getElementById('liveStatus');
const statusText  = document.getElementById('statusText');
const refreshBtn  = document.getElementById('refreshBtn');
const searchInput = document.getElementById('searchInput');
const insightsRow1 = document.getElementById('insightsRow1');
const aiGrid      = document.getElementById('aiGrid');
const quotesGrid  = document.getElementById('quotesGrid');

const statTotal    = document.getElementById('statTotal');
const statDepts    = document.getElementById('statDepts');
const statDeptsSub = document.getElementById('statDeptsSub');
const statAI       = document.getElementById('statAI');
const statTopIssue = document.getElementById('statTopIssue');

/* ---- Status ---- */
function setStatus(state, text) {
  statusPill.classList.remove('loading', 'error');
  if (state === 'loading') statusPill.classList.add('loading');
  if (state === 'error')   statusPill.classList.add('error');
  statusText.textContent = text;
}

/* ---- AI tag class ---- */
function aiTagClass(val) {
  if (!val || val === '—') return '';
  const v = val.toLowerCase();
  if (v.includes('sangat sesuai') || v.startsWith('ya'))       return 'ai-y';
  if (v.includes('mungkin') || v.includes('sebahagian'))       return 'ai-m';
  if (v.includes('tidak pasti'))                               return 'ai-u';
  if (v.includes('tidak sesuai'))                              return 'ai-n';
  return '';
}

/* ---- Stats + Insights ---- */
function renderInsights(r) {
  if (!r.length) return;

  /* Stats */
  statTotal.textContent = r.length;
  const deptSet = new Set(r.map(x => x.dept).filter(d => d !== '—'));
  statDepts.textContent = deptSet.size;
  statDeptsSub.textContent = 'bahagian berbeza';

  const aiPos = r.filter(x => {
    const v = (x.aiSuitable || '').toLowerCase();
    return v.startsWith('ya') || v.includes('mungkin') || v.includes('sebahagian');
  }).length;
  statAI.textContent = `${Math.round(aiPos / r.length * 100)}%`;

  const issueCounts = countField(r.filter(x => x.oneIssue !== '—'), 'oneIssue');
  statTopIssue.textContent = issueCounts[0]?.[0] || '—';

  /* Insight 1: Priority 5 improvements */
  const p5 = countTags(r, 'priority5');
  const totalTags = r.reduce((s, x) => s + x.priority5.length, 0) || 1;
  insightsRow1.innerHTML = `
    <div class="ins-card">
      <h3>5 Perkara Paling Penting (Keutamaan Terkumpul)</h3>
      ${p5.length ? renderHBar(p5, { total: r.length, color: 'var(--accent)', limit: 8 }) : '<p style="color:var(--ink-soft);font-size:13px">Tiada data</p>'}
    </div>
    <div class="ins-card">
      <h3>Punca Isu Terbesar (Root Cause)</h3>
      ${countTags(r, 'rootCause').length ? renderHBar(countTags(r, 'rootCause'), { total: r.length, color: 'var(--accent2)', limit: 8 }) : '<p style="color:var(--ink-soft);font-size:13px">Tiada data</p>'}
    </div>`;

  /* AI Grid */
  const aiSent = countField(r.filter(x => x.aiSuitable !== '—'), 'aiSuitable');
  const aiHelp = countTags(r, 'aiHelp');
  const approach = countField(r.filter(x => x.approach !== '—'), 'approach');

  aiGrid.innerHTML = `
    <div class="ins-card">
      <h3>AI Sesuai Membantu iLPF?</h3>
      ${renderPills(aiSent, aiColor)}
    </div>
    <div class="ins-card">
      <h3>Bahagian Yang AI Boleh Bantu</h3>
      ${aiHelp.length ? renderHBar(aiHelp, { total: r.length, color: 'var(--purple)', limit: 6 }) : '<p style="color:var(--ink-soft);font-size:13px">Tiada data</p>'}
    </div>
    <div class="ins-card">
      <h3>Pendekatan Jika Bajet & Masa Terhad</h3>
      ${renderPills(approach, () => 'var(--gold)')}
    </div>`;

  /* Quotes */
  const quotes = r.filter(x => x.oneLine && x.oneLine !== '—');
  quotesGrid.innerHTML = quotes.map(x => `
    <div class="quote-card">
      <div class="quote-text">${x.oneLine.replace(/</g,'&lt;')}</div>
      <div class="quote-meta">
        <span class="name">${x.name.replace(/</g,'&lt;')}</span>
        <span>${x.dept.replace(/</g,'&lt;')}</span>
      </div>
    </div>`).join('');
}

/* ---- Response Grid ---- */
function filtered() {
  const q = searchQ.toLowerCase();
  return RESPONSES.filter(r => !q || r.name.toLowerCase().includes(q) || r.dept.toLowerCase().includes(q));
}

function renderGrid() {
  const visible = filtered();
  gridCount.textContent = `${visible.length} respons`;

  if (!visible.length) {
    grid.innerHTML = `<div class="state"><div class="icon">🔍</div><h3>Tiada padanan</h3><p>Cuba carian lain.</p></div>`;
    return;
  }

  grid.innerHTML = visible.map(r => {
    const realIdx = RESPONSES.indexOf(r);
    const safeName = r.name.replace(/</g,'&lt;');
    const aiCls = aiTagClass(r.aiSuitable);
    const aiLabel = r.aiSuitable !== '—' ? r.aiSuitable.slice(0, 30) + (r.aiSuitable.length > 30 ? '…' : '') : null;
    const priorities = r.priority5.slice(0,3).map(t => `<span class="tag">${t.replace(/</g,'&lt;')}</span>`).join('');
    return `
    <div class="rcard" data-idx="${realIdx}" tabindex="0" role="button" aria-label="Lihat respons ${safeName}">
      <div class="rcard-top">
        <div class="rcard-name">${safeName}</div>
        <div class="rcard-num">#${String(realIdx + 1).padStart(2,'0')}</div>
      </div>
      <div class="rcard-dept">${r.dept.replace(/</g,'&lt;')} · ${r.freq.replace(/</g,'&lt;')}</div>
      ${r.oneLine !== '—' ? `<div class="rcard-quote">"${r.oneLine.replace(/</g,'&lt;')}"</div>` : ''}
      ${priorities ? `<div class="tag-row">${priorities}</div>` : ''}
      ${r.oneIssue !== '—' ? `<div class="rcard-issue"><strong>Isu #1:</strong> ${r.oneIssue.replace(/</g,'&lt;').slice(0,80)}${r.oneIssue.length > 80 ? '…' : ''}</div>` : ''}
      <div class="arrow">→</div>
    </div>`;
  }).join('');

  grid.querySelectorAll('.rcard').forEach(el => {
    el.addEventListener('click', () => navigate(Number(el.dataset.idx)));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') navigate(Number(el.dataset.idx)); });
  });
}

function navigate(idx) {
  try { sessionStorage.setItem('mf_responses', JSON.stringify(RESPONSES)); } catch { /* quota */ }
  location.href = `profile.html?i=${idx}`;
}

/* ---- Load ---- */
async function load() {
  refreshBtn.classList.add('spinning');
  setStatus('loading', 'Syncing…');
  try {
    RESPONSES = await fetchResponses();
    renderInsights(RESPONSES);
    if (RESPONSES.length === 0) {
      grid.innerHTML = `<div class="state"><div class="icon">😭</div><h3>Tiada respons lagi</h3><p>Hantar borang dan klik Refresh.</p></div>`;
      gridCount.textContent = '0 respons';
    } else {
      renderGrid();
    }
    setStatus('ok', `Live · ${RESPONSES.length} respons`);
  } catch (err) {
    console.error(err);
    setStatus('error', 'Sync failed');
    grid.innerHTML = `<div class="state">
      <div class="icon">⚠️</div>
      <h3>Can't reach the Google Sheet</h3>
      <p>${err.message}</p>
      <ol>
        <li>Sheet shared as <code>Anyone with the link → Viewer</code></li>
        <li>Open via http:// (Live Server), not file://</li>
        <li><a href="${EXPORT_URL}" target="_blank">Test CSV in new tab</a></li>
      </ol>
    </div>`;
  } finally {
    setTimeout(() => refreshBtn.classList.remove('spinning'), 400);
  }
}

/* ---- Wiring ---- */
searchInput.addEventListener('input', e => { searchQ = e.target.value; renderGrid(); });
refreshBtn.addEventListener('click', load);
load();
setInterval(load, AUTO_REFRESH_MS);
