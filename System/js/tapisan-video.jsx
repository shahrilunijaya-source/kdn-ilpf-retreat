/* iLPF v2 — Tapisan Screen: video, peta, AI pengubahan table, senarai
   Exposes: VideoPlayer, PetaPengubahan, CadanganAiPengubahan, SenaraiPengubahan */

const { useState: useStateTV, useMemo: useMemoTV, useRef: useRefTV, useEffect: useEffectTV } = React;

/* ---------- Video player ---------------------------------------------- */

const VIDEO_SRC = 'assets/YTDown_YouTube_5-Brutal-Gangster-Moments_Media_1JFAqBIJVUQ_002_720p.mp4';

function fmt(s) {
  if (!isFinite(s)) return '00:00';
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

const FALLBACK_DUR = 1080;

function VideoPlayer({ pins }) {
  const vidRef    = useRefTV(null);
  const fillRef   = useRefTV(null);
  const thumbRef  = useRefTV(null);
  const vFillRef  = useRefTV(null);
  const timeRef   = useRefTV(null);
  const durRef    = useRefTV(null);
  const [playing, setPlaying] = useStateTV(false);
  const [muted,   setMuted]   = useStateTV(false);
  const [vol,     setVol]     = useStateTV(1);

  const getDur = () => {
    const d = vidRef.current?.duration;
    return (d && isFinite(d) && d > 0) ? d : FALLBACK_DUR;
  };

  const applyFill = (pct) => {
    const p = Math.max(0, Math.min(1, pct));
    if (fillRef.current)  fillRef.current.style.width  = (p * 100) + '%';
    if (thumbRef.current) thumbRef.current.style.left  = (p * 100) + '%';
  };

  const applyVol = (pct) => {
    const p = Math.max(0, Math.min(1, pct));
    if (vFillRef.current) vFillRef.current.style.width = (p * 100) + '%';
  };

  useEffectTV(() => {
    window.__iLPFSeek = (sec) => {
      const v = vidRef.current;
      if (!v) return;
      try { v.currentTime = sec; } catch(e) {}
      v.play();
      setPlaying(true);
      applyFill(sec / getDur());
    };
    return () => { delete window.__iLPFSeek; };
  }, []);

  const onTimeUpdate = () => {
    const v = vidRef.current;
    if (!v) return;
    const t = v.currentTime, dur = getDur();
    window.__iLPFCurrentSec = t;
    window.dispatchEvent(new CustomEvent('ilpf:time', { detail: { current: t, duration: dur } }));
    applyFill(t / dur);
    if (timeRef.current) timeRef.current.textContent = fmt(t);
    if (durRef.current && isFinite(v.duration)) durRef.current.textContent = fmt(v.duration);
  };

  const toggle = () => {
    const v = vidRef.current;
    if (!v) return;
    playing ? v.pause() : v.play();
    setPlaying(!playing);
  };

  const makeDragHandler = (onValue) => (e) => {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    const compute = (ev) => {
      const r = el.getBoundingClientRect();
      onValue(Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)));
    };
    compute(e);
    const onMove = (ev) => compute(ev);
    const onUp   = () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerup', onUp); };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup',   onUp);
  };

  const onScrubValue = (pct) => {
    try { if (vidRef.current) vidRef.current.currentTime = getDur() * pct; } catch(e) {}
    applyFill(pct);
  };

  const onVolValue = (pct) => {
    const v = vidRef.current;
    if (v) { v.volume = pct; v.muted = pct === 0; }
    applyVol(pct);
    setVol(pct);
    setMuted(pct === 0);
  };

  const toggleMute = () => {
    const v = vidRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    applyVol(next ? 0 : vol);
  };

  const toggleFull = () => {
    const v = vidRef.current;
    if (!v) return;
    document.fullscreenElement ? document.exitFullscreen() : v.requestFullscreen();
  };

  return (
    <div className="tap-video-wrap">
      <div className="tap-video" onClick={toggle}>
        <div className="tap-video__wm">iLPF / Lembaga / Penapisan</div>
        <video ref={vidRef} className="tap-video__el" src={VIDEO_SRC}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={() => { if (durRef.current) durRef.current.textContent = fmt(getDur()); }}
          onEnded={() => setPlaying(false)}
        />
      </div>
      <div className="tap-video__controls" onClick={(e) => e.stopPropagation()}>
        <button className="tap-video__btn" onClick={toggle}>
          {playing
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          }
        </button>

        {/* Scrubber */}
        <div className="tap-video__track" onPointerDown={makeDragHandler(onScrubValue)}>
          <div className="tap-video__rail" />
          <div ref={fillRef} className="tap-video__fill" />
          <div ref={thumbRef} className="tap-video__thumb" />
          {pins.map((p, i) => (
            <div key={i} className={`tap-video__pin tap-video__pin--${p.kind}`}
              style={{ left: `${p.pct}%` }} title={`Bil ${p.bil}`} />
          ))}
        </div>

        <div className="tap-video__time">
          <span ref={timeRef}>00:00</span> / <span ref={durRef}>--:--</span>
        </div>

        {/* Mute toggle */}
        <button className="tap-video__btn" onClick={toggleMute}>
          {muted || vol === 0
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          }
        </button>

        {/* Volume slider */}
        <div className="tap-video__vol" onPointerDown={makeDragHandler(onVolValue)}>
          <div className="tap-video__vol-rail" />
          <div ref={vFillRef} className="tap-video__vol-fill" style={{ width: '100%' }} />
        </div>

        <button className="tap-video__btn" onClick={toggleFull}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ---------- Peta Pengubahan ------------------------------------------- */

// Convert "HH:MM:SS" to seconds
function tsToSec(t) {
  const [h, m, s] = t.split(':').map(Number);
  return h * 3600 + m * 60 + s;
}

function PetaPengubahan({ rows, kategoriBlur, hideLegend }) {
  const [currentSec, setCurrentSec] = useStateTV(0);
  const [duration, setDuration] = useStateTV(0);

  useEffectTV(() => {
    const h = (e) => { setCurrentSec(e.detail.current); setDuration(e.detail.duration); };
    window.addEventListener('ilpf:time', h);
    return () => window.removeEventListener('ilpf:time', h);
  }, []);

  const TOTAL = duration > 0 ? duration : 1080;
  const segments = rows.map((r) => {
    const start = tsToSec(r.dan);
    const end = tsToSec(r.hingga);
    const cat = kategoriBlur.find((k) => k.id === r.adegan.toLowerCase()) || kategoriBlur[0];
    return {
      bil: r.bil,
      adegan: r.adegan,
      left: (start / TOTAL) * 100,
      width: Math.max(((end - start) / TOTAL) * 100, 0.6),
      color: cat.color,
      conf: r.conf,
      tStart: r.dan,
      tEnd: r.hingga,
      startSec: start,
    };
  });
  const playheadPct = TOTAL > 0 ? (currentSec / TOTAL) * 100 : 0;

  /* active segment = largest startSec still <= currentSec */
  let activeIdx = -1;
  for (let i = segments.length - 1; i >= 0; i--) {
    if (currentSec >= segments[i].startSec) { activeIdx = i; break; }
  }

  const seekTrack = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    window.__iLPFSeek?.(ratio * TOTAL);
  };

  return (
    <div className="peta">
      <style>{`
        .peta__seg { position: relative; transition: filter 0.1s; }
        .peta__seg:hover::after {
          content: '▶';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          font-size: 7px;
          color: rgba(255,255,255,0.95);
          pointer-events: none;
          text-shadow: 0 0 4px rgba(0,0,0,0.6);
        }
        .peta__seg--active {
          outline: 2px solid rgba(255,255,255,0.9);
          outline-offset: -1px;
          filter: brightness(1.35);
          z-index: 2;
        }
      `}</style>
      <div className="peta__head">
        <div className="peta__title">Peta Pengubahan — heatmap AI<span className="dot" /></div>
        <div className="peta__meta">klik segmen untuk tuju · {rows.length} segmen dikesan</div>
      </div>
      <div className="peta__track" onClick={seekTrack} style={{ cursor: 'pointer' }}>
        {segments.map((s, i) => (
          <div
            key={i}
            className={`peta__seg${i === activeIdx ? ' peta__seg--active' : ''}`}
            style={{ left: `${s.left}%`, width: `${s.width}%`, background: s.color, cursor: 'pointer' }}
            title={`Bil ${s.bil} · ${s.adegan} · ${s.tStart}–${s.tEnd} · conf ${s.conf}%`}
            onClick={(e) => {
              e.stopPropagation();
              window.__iLPFSeek?.(s.startSec);
              window.__iLPFAnnotate?.(s.tStart, s.adegan);
            }}
          />
        ))}
        <div className="peta__playhead" style={{ left: `${playheadPct}%` }} />
      </div>
      <div className="peta__scale">
        {['00:00', '04:30', '09:00', '13:30', '18:00'].map((t) => <span key={t}>{t}</span>)}
      </div>
      {!hideLegend && (
        <div className="peta__legend">
          {kategoriBlur.map((k) => (
            <span key={k.id} className="peta__legend-item">
              <span className="peta__legend-swatch" style={{ background: k.color }} />
              {k.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Cadangan AI Pengubahan dark table ------------------------- */

const TIND_KEY = {
  KABURKAN: 'KABURKAN',
  POTONGKAN: 'POTONGKAN',
  SENYAPKAN: 'SENYAPKAN',
  'PSA OVERLAY': 'PSA',
  'SEMAK MANUAL': 'SEMAK',
};

function CadanganAiPengubahan({ rows, onAccept, onAcceptAll, addedIds }) {
  const I = window.Icons;
  const remaining = rows.length - addedIds.size;
  return (
    <div className="ai-tbl">
      <div className="ai-tbl__head">
        <span className="ai-tbl__title"><I.spark /> Cadangan AI Pengubahan<span className="dot" /></span>
        <span className="ai-tbl__meta">{addedIds.size}/{rows.length} diterima · {remaining} tertangguh</span>
        <button className="ai-tbl__copy" onClick={onAcceptAll}>
          Salin semua
        </button>
      </div>
      <div className="ai-tbl__cols">
        <span>Bil</span>
        <span></span>
        <span>Dan</span>
        <span>Hingga</span>
        <span>Tindakan</span>
        <span>Adegan</span>
        <span>Keterangan + conf</span>
        <span></span>
      </div>
      {rows.map((r) => {
        const taken = addedIds.has(r.bil);
        return (
          <div key={r.bil} className="ai-row" style={taken ? { opacity: 0.5 } : null}>
            <span className="ai-row__bil">{r.bil}</span>
            <button className="ai-row__play" onClick={() => window.__iLPFSeek?.(tsToSec(r.dan))}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <span className="ai-row__t" style={{ cursor: 'pointer' }} onClick={() => window.__iLPFSeek?.(tsToSec(r.dan))} title="Tuju ke masa ini">{r.dan}</span>
            <span className="ai-row__t" style={{ cursor: 'pointer' }} onClick={() => window.__iLPFSeek?.(tsToSec(r.hingga))} title="Tuju ke masa ini">{r.hingga}</span>
            <span><span className={`tind-chip tind-chip--${TIND_KEY[r.tindakan] || r.tindakan}`}>{r.tindakan}</span></span>
            <span><span className={`adeg-chip adeg-chip--${r.adegan}`}>{r.adegan}</span></span>
            <div className="ai-row__desc">
              <span className="text">{r.desc}</span>
              <span className="ai-row__conf">{r.conf}%</span>
            </div>
            <button
              className="ai-row__add"
              onClick={() => onAccept(r)}
              disabled={taken}
              title={taken ? 'Sudah diterima' : 'Salin ke Senarai'}
            >
              {taken ? '✓' : '+'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Senarai Pengubahan Yang Ditapis --------------------------- */

function SenaraiPengubahan({ items, onDelete }) {
  const I = window.Icons;
  if (items.length === 0) {
    return (
      <div className="sen-card">
        <div className="sen-head">
          <span className="sen-head__title">Senarai Pengubahan Yang Ditapis<span className="dot" /></span>
          <span className="sen-head__meta">0 pengubahan direkodkan</span>
        </div>
        <div className="sen-empty">
          Tiada pengubahan direkodkan. Salin cadangan AI di atas atau guna Rekod Tempoh di bawah.
        </div>
      </div>
    );
  }
  const aiCount = items.filter((x) => x.source === 'ai').length;
  const manualCount = items.length - aiCount;
  return (
    <div className="sen-card">
      <div className="sen-head">
        <span className="sen-head__title">Senarai Pengubahan Yang Ditapis<span className="dot" /></span>
        <span className="sen-head__meta">
          {items.length} pengubahan direkodkan · {aiCount} daripada AI · {manualCount} manual
        </span>
      </div>
      <div className="sen-cols">
        <span>Bil</span>
        <span></span>
        <span>Dan</span>
        <span>Hingga</span>
        <span>Tindakan</span>
        <span>Adegan</span>
        <span>Keterangan</span>
      </div>
      {items.map((r, i) => (
        <div key={r.bil + '-' + i} className="sen-row">
          <span className="sen-row__bil">{r.bil}</span>
          <div className="sen-row__actions">
            <button className="sen-row__btn sen-row__btn--play" onClick={() => window.__iLPFSeek?.(tsToSec(r.dan))} title="Main">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <button className="sen-row__btn sen-row__btn--del" onClick={() => onDelete(r)} title="Padam">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="m5 6 1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"/></svg>
            </button>
          </div>
          <span className="sen-row__t" style={{ cursor: 'pointer' }} onClick={() => window.__iLPFSeek?.(tsToSec(r.dan))} title="Tuju ke masa ini">{r.dan}</span>
          <span className="sen-row__t" style={{ cursor: 'pointer' }} onClick={() => window.__iLPFSeek?.(tsToSec(r.hingga))} title="Tuju ke masa ini">{r.hingga}</span>
          <span><span className={`tind-light tind-${TIND_KEY[r.tindakan] || r.tindakan}`}>{r.tindakan}</span></span>
          <span><span className={`adeg-light adeg-${r.adegan}`}>{r.adegan}</span></span>
          <div className="sen-row__keterangan">
            <strong>{r.desc}</strong>
            <span className={`sen-row__source ${r.source === 'ai' ? 'ai' : ''}`}>
              {r.source === 'ai' ? 'AI' : 'Manual'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { VideoPlayer, PetaPengubahan, CadanganAiPengubahan, SenaraiPengubahan });
