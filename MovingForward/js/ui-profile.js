import { fetchResponses } from './sheets.js';
import { aiColor, freqColor } from './transform.js';

/* ---- State ---- */
let RESPONSES = [];
let currentIdx = 0;

/* ---- DOM refs ---- */
const shell      = document.getElementById('shell');
const prevBtn    = document.getElementById('prevBtn');
const nextBtn    = document.getElementById('nextBtn');
const navPos     = document.getElementById('navPos');
const topbarName = document.getElementById('topbarName');

/* ---- Helpers ---- */
function safe(str) { return String(str || '').replace(/</g, '&lt;'); }
function tags(arr) { return (arr || []).map(t => `<span class="tag">${safe(t)}</span>`).join(''); }
function text(val) { return val && val !== '—' ? safe(val) : '<span style="color:var(--muted);font-style:italic">—</span>'; }

function updateNav() {
  prevBtn.disabled = currentIdx <= 0;
  nextBtn.disabled = currentIdx >= RESPONSES.length - 1;
  navPos.textContent = RESPONSES.length ? `${currentIdx + 1} / ${RESPONSES.length}` : '';
}

/* ---- Render ---- */
function renderResponse(idx) {
  const r = RESPONSES[idx];
  if (!r) return;

  topbarName.textContent = r.name;
  document.title = `${r.name} · KDN iLPF`;
  updateNav();

  const headName = r.name.length > 1
    ? safe(r.name.slice(0,-1)) + `<em>${safe(r.name.slice(-1))}</em>`
    : `<em>${safe(r.name)}</em>`;

  const aiCol = aiColor(r.aiSuitable);
  const aiStyle = `color:${aiCol};border-color:${aiCol}40;background:${aiCol}18`;

  const priorityDots = r.priority5.map(t =>
    `<div class="pbar-item"><div class="pbar-dot"></div><div class="pbar-lbl">${safe(t)}</div></div>`
  ).join('');

  shell.innerHTML = `
    <!-- HERO -->
    <div class="hero fade-in">
      <div class="hero-tag">Respons · ${String(idx + 1).padStart(2,'0')} / ${String(RESPONSES.length).padStart(2,'0')}</div>
      <div class="hero-name">${headName}</div>
      <div class="hero-meta">
        <div class="hero-badge"><div class="dot" style="background:var(--accent)"></div>${safe(r.dept)}</div>
        <div class="hero-badge"><div class="dot" style="background:${freqColor(r.freq)}"></div>${safe(r.freq)}</div>
        <div class="hero-badge" style="font-size:11px;color:var(--ink-soft)">${safe(r.timestamp)}</div>
      </div>
      ${r.oneLine !== '—' ? `<div class="hero-oneliner">${safe(r.oneLine)}"</div>` : ''}
    </div>

    <!-- SECTION: Penilaian Semasa -->
    <div class="sec-head"><h2><span class="ord">01</span> Penilaian Sistem Semasa</h2></div>
    <div class="qa-grid">
      <div class="qa-item full">
        <div class="qa-q">3 Perkara Paling Baik Tentang iLPF Sekarang</div>
        <div class="qa-a">${text(r.top3Good)}</div>
      </div>
      <div class="qa-item full">
        <div class="qa-q">3 Perkara Paling Menyusahkan</div>
        <div class="qa-a">${text(r.top3Bad)}</div>
      </div>
      <div class="qa-item">
        <div class="qa-q">Punca Isu Terbesar</div>
        <div class="qa-a">${r.rootCause.length ? tags(r.rootCause) : text('—')}</div>
      </div>
      <div class="qa-item">
        <div class="qa-q">Isu #1 Untuk Diselesaikan Dahulu</div>
        <div class="qa-a">${text(r.oneIssue)}</div>
      </div>
      <div class="qa-item">
        <div class="qa-q">Kerja Yang Terlalu Manual / Berulang</div>
        <div class="qa-a">${text(r.manual)}</div>
      </div>
      <div class="qa-item">
        <div class="qa-q">Perbaikan Kecil, Impak Besar</div>
        <div class="qa-a">${text(r.smallFix)}</div>
      </div>
    </div>

    <!-- SECTION: Visi Masa Depan -->
    <div class="sec-head"><h2><span class="ord">02</span> Visi iLPF Masa Depan</h2></div>
    <div class="qa-grid">
      <div class="qa-item full">
        <div class="qa-q">iLPF Versi Baharu — 3 Perkara Utama Yang Dikehendaki</div>
        <div class="qa-a">${text(r.v2Wants)}</div>
      </div>
      <div class="qa-item">
        <div class="qa-q">iLPF 3 Tahun Dari Sekarang</div>
        <div class="qa-a">${text(r.future3y)}</div>
      </div>
      <div class="qa-item">
        <div class="qa-q">Ciri "Wow Factor"</div>
        <div class="qa-a">${text(r.wowFactor)}</div>
      </div>
      <div class="qa-item full">
        <div class="qa-q">Soalan Untuk iLPF Kalau Boleh Bercakap</div>
        <div class="qa-a quote">${r.question !== '—' ? `"${safe(r.question)}"` : text('—')}</div>
      </div>
    </div>

    <!-- SECTION: AI & Keutamaan -->
    <div class="sec-head"><h2><span class="ord">03</span> AI & Keutamaan Penambahbaikan</h2></div>
    <div class="ai-block">
      <div class="qa-q" style="margin-bottom:10px">AI Sesuai Membantu Proses iLPF?</div>
      ${r.aiSuitable !== '—' ? `<div class="ai-sentiment" style="${aiStyle}">${safe(r.aiSuitable)}</div>` : ''}
      <div class="qa-grid" style="margin-top:14px">
        <div class="qa-item" style="background:var(--surface2)">
          <div class="qa-q">Bahagian Yang AI Boleh Bantu</div>
          <div class="qa-a">${r.aiHelp.length ? tags(r.aiHelp) : text('—')}</div>
        </div>
        <div class="qa-item" style="background:var(--surface2)">
          <div class="qa-q">Kebimbangan Penggunaan AI</div>
          <div class="qa-a">${text(r.aiConcern)}</div>
        </div>
      </div>
    </div>

    ${r.priority5.length ? `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-top:12px">
      <div class="qa-q" style="margin-bottom:12px">5 Perkara Paling Penting Untuk Ditambah Baik</div>
      <div class="priority-bars">${priorityDots}</div>
    </div>` : ''}

    <div class="qa-grid" style="margin-top:12px">
      <div class="qa-item full">
        <div class="qa-q">Pendekatan Jika Bajet & Masa Terhad</div>
        <div class="qa-a">${text(r.approach)}</div>
      </div>
    </div>

    <!-- SECTION: Penutup -->
    <div class="sec-head"><h2><span class="ord">04</span> Kata Penutup</h2></div>
    <div class="qa-grid">
      <div class="qa-item full">
        <div class="qa-q">Satu Ayat Untuk iLPF Masa Depan</div>
        <div class="qa-a quote">${r.futureSentence !== '—' ? `"${safe(r.futureSentence)}"` : text('—')}</div>
      </div>
      ${r.other !== '—' ? `
      <div class="qa-item full">
        <div class="qa-q">Cadangan Lain</div>
        <div class="qa-a">${text(r.other)}</div>
      </div>` : ''}
    </div>

    <div class="foot">
      <span>KDN iLPF · Moving Forward</span>
      <span class="pill">Auto-refresh every 60s</span>
    </div>`;

  /* update URL */
  const url = new URL(location.href);
  url.searchParams.set('i', idx);
  history.replaceState(null, '', url);
  window.scrollTo(0, 0);
}

/* ---- Init ---- */
async function init() {
  const params = new URLSearchParams(location.search);
  currentIdx = Math.max(0, parseInt(params.get('i') || '0'));

  try {
    const cached = sessionStorage.getItem('mf_responses');
    if (cached) {
      RESPONSES = JSON.parse(cached);
      renderResponse(currentIdx);
      return;
    }
  } catch { /* ignore */ }

  try {
    RESPONSES = await fetchResponses();
    if (!RESPONSES.length) {
      shell.innerHTML = `<div class="state"><div class="icon">😭</div><h3>Tiada data</h3><p>Borang belum ada respons.</p></div>`;
      return;
    }
    currentIdx = Math.min(currentIdx, RESPONSES.length - 1);
    renderResponse(currentIdx);
  } catch (err) {
    shell.innerHTML = `<div class="state"><div class="icon">⚠️</div><h3>Fetch failed</h3><p>${safe(err.message)}</p></div>`;
  }
}

/* ---- Navigation ---- */
prevBtn.addEventListener('click', () => { if (currentIdx > 0) { currentIdx--; renderResponse(currentIdx); } });
nextBtn.addEventListener('click', () => { if (currentIdx < RESPONSES.length - 1) { currentIdx++; renderResponse(currentIdx); } });
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft'  && currentIdx > 0)                     { currentIdx--; renderResponse(currentIdx); }
  if (e.key === 'ArrowRight' && currentIdx < RESPONSES.length - 1)  { currentIdx++; renderResponse(currentIdx); }
  if (e.key === 'Escape') location.href = 'index.html';
});

init();
