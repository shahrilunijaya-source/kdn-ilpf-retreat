/* iLPF v2 — Floating Rekod Tempoh + Hantar untuk Pengesahan modal
   Exposes: FloatingRecorder, HantarModal */

const { useState: useStateRec, useEffect: useEffectRec } = React;

/* ---------- Floating Rekod Tempoh ------------------------------------ */

const TIND_PILLS = ["Potong", "Senyap", "Kabur", "Padam", "Lain"];
const ADEG_PILLS_VISIBLE = ["Ganas", "Seram", "Ngeri", "Seksual", "Kebogelan"];
const ADEG_PILLS_OVERFLOW = ["Dadah", "Rokok", "Arak", "Bahasa"];

/* adegan label → pill key map (case-insensitive) */
const ADEG_NORM = {
  ganas: 'Ganas', seram: 'Seram', ngeri: 'Ngeri',
  seksual: 'Seksual', kebogelan: 'Kebogelan',
  dadah: 'Dadah', rokok: 'Rokok', arak: 'Arak', bahasa: 'Bahasa',
};

function secToHMS(s) {
  if (!isFinite(s)) return '00:00:00';
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  return [h, m, sec].map(v => String(v).padStart(2, '0')).join(':');
}

function FloatingRecorder({ onSave, inline }) {
  const I = window.Icons;
  const [collapsed, setCollapsed] = useStateRec(false);
  const [tind, setTind] = useStateRec(null);
  const [adeg, setAdeg] = useStateRec(null);
  const [note, setNote] = useStateRec("");
  const [mula, setMula] = useStateRec("00:00:00");
  const [henti, setHenti] = useStateRec("00:00:00");

  /* window.__iLPFAnnotate(tStart, adegan) — called by heatmap on click */
  useEffectRec(() => {
    window.__iLPFAnnotate = (tStart, adegan) => {
      if (tStart) setMula(tStart);
      if (adegan) {
        const key = ADEG_NORM[adegan.toLowerCase()] || null;
        if (key) setAdeg(key);
      }
      if (!inline) setCollapsed(false);
    };
    return () => { delete window.__iLPFAnnotate; };
  }, []);

  const markMula = () => setMula(secToHMS(window.__iLPFCurrentSec || 0));
  const markHenti = () => setHenti(secToHMS(window.__iLPFCurrentSec || 0));

  if (!inline && collapsed) {
    return (
      <div className="recorder recorder--collapsed" onClick={() => setCollapsed(false)} title="Rekod Tempoh">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" fill="currentColor"/>
        </svg>
      </div>
    );
  }

  const save = () => {
    if (!tind || !adeg) return;
    onSave({
      bil: '—',
      dan: mula, hingga: henti,
      tindakan: tind.toUpperCase(),
      adegan: adeg.toUpperCase(),
      desc: note || `${tind} · ${adeg}`,
      source: 'manual',
    });
    setNote("");
    setTind(null);
    setAdeg(null);
  };

  if (inline) {
    return (
      <div className="tap-rekod-wrap">
        <div className="tap-rekod__label">
          REKOD TEMPOH <span className="dot" />
        </div>
        <div className="tap-rekod__btns">
          <button className="tap-rekod__btn-mula" onClick={markMula}>▶ MULA</button>
          <button className="tap-rekod__btn-berhenti" onClick={markHenti}>■ BERHENTI</button>
        </div>
        <div className="tap-rekod__times">
          <div className="tap-rekod__time">{mula}</div>
          <div className="tap-rekod__time">{henti}</div>
        </div>
        <div className="tap-rekod__key">Tindakan</div>
        <div className="tap-rekod__pills">
          {TIND_PILLS.map(p => (
            <button key={p} className={`recorder__pill ${tind === p ? 'is-active' : ''}`} onClick={() => setTind(p)}>{p}</button>
          ))}
        </div>
        <div className="tap-rekod__key">Adegan</div>
        <div className="tap-rekod__pills">
          {[...ADEG_PILLS_VISIBLE, ...ADEG_PILLS_OVERFLOW].map(p => (
            <button key={p} className={`recorder__pill ${adeg === p ? 'is-active--adegan' : ''}`} onClick={() => setAdeg(p)}>{p}</button>
          ))}
        </div>
        <div className="tap-rekod__key">Keterangan Tindakan</div>
        <textarea
          className="recorder__note"
          placeholder="Nyatakan keterangan tindakan..."
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={2}
          style={{ width: '100%', boxSizing: 'border-box', resize: 'none', marginBottom: 10, display: 'block' }}
        />
        <button className="recorder__save" onClick={save} disabled={!tind || !adeg} style={{ width: '100%' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          Tambah ke Senarai
        </button>
      </div>
    );
  }

  return (
    <div className="recorder">
      <div className="recorder__label">REKOD<br/>TEMPOH<span className="dot" /></div>

      <div className="recorder__times">
        <div className="recorder__time">
          <span className="k">Mula</span>
          <div className="recorder__time-mula">{mula}</div>
        </div>
        <div className="recorder__time">
          <span className="k">Henti</span>
          <div className="recorder__time-henti">{henti}</div>
        </div>
      </div>

      <div className="recorder__pickers">
        <div className="recorder__picker-row">
          <span className="key">Tindakan</span>
          {TIND_PILLS.map((p) => (
            <button
              key={p}
              className={`recorder__pill ${tind === p ? 'is-active' : ''}`}
              onClick={() => setTind(p)}
            >{p}</button>
          ))}
        </div>
        <div className="recorder__picker-row">
          <span className="key">Adegan</span>
          {ADEG_PILLS_VISIBLE.map((p) => (
            <button
              key={p}
              className={`recorder__pill ${adeg === p ? 'is-active--adegan' : ''}`}
              onClick={() => setAdeg(p)}
            >{p}</button>
          ))}
          <span className="recorder__pill" style={{ background: 'transparent' }}>
            <span className="more">+ {ADEG_PILLS_OVERFLOW.length} lagi</span>
          </span>
        </div>
      </div>

      <input
        className="recorder__note"
        placeholder="Catat keterangan…"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button className="recorder__save" onClick={save} disabled={!tind || !adeg}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
        Simpan
      </button>

      <button className="recorder__collapse" onClick={() => setCollapsed(true)} title="Sembunyikan">
        <I.close />
      </button>
    </div>
  );
}

/* ---------- Hantar Modal --------------------------------------------- */

function HantarModal({ filmTitle, pengubahanCount, decision, klasifikasi, onClose, onConfirm }) {
  const I = window.Icons;
  const [checks, setChecks] = useStateRec([true, true, true]);
  const [note, setNote] = useStateRec("");

  React.useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  const tog = (i) => setChecks((c) => c.map((v, idx) => idx === i ? !v : v));

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="modal-head__title">Hantar kepada Ketua Unit<span className="dot" /></div>
            <div className="modal-head__sub">Pengesahan akhir · langkah 7 → 8</div>
          </div>
          <button className="modal-head__close" onClick={onClose}><I.close /></button>
        </div>
        <div className="modal-body">
          <div className="hantar-ai">
            <div className="hantar-ai__head">
              <span className="hantar-ai__eyebrow">
                <span className="dot dot--white" style={{ width: 5, height: 5 }} /> AI Ringkasan Hantar
              </span>
              <a className="hantar-ai__edit" href="#">Edit ringkasan ↗</a>
            </div>
            <div className="hantar-ai__text">
              <strong>{filmTitle}</strong> · Keputusan: <strong>{decision || 'LDP'}</strong> ·
              {' '}Klasifikasi: <strong>{klasifikasi || 'P13'}</strong> ·
              {' '}<strong>{pengubahanCount} pengubahan</strong> direkodkan.
              Pemberat tertinggi: <strong>Ganas Sederhana · Seram Sederhana · Bahasa Sederhana</strong>.
              Panel: Encik Ridzuan (Ketua) + 2 ahli menunggu pengesahan.
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div className="kep-label">Nota untuk Ketua Unit</div>
            <textarea
              className="hantar-note"
              placeholder="Tambah konteks, hujah panel, atau perkara untuk perhatian khusus…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div>
            <div className="kep-label">Pengesahan akhir</div>
            {[
              "Panel telah bersetuju dengan keputusan dan klasifikasi.",
              "Semua pengubahan dan justifikasi telah direkodkan.",
              "Saya bertanggungjawab ke atas keputusan ini sebagai Ketua Panel.",
            ].map((s, i) => (
              <div
                key={i}
                className={`hantar-check ${checks[i] ? 'is-on' : ''}`}
                onClick={() => tog(i)}
              >
                <span className="hantar-check__box">
                  {checks[i] && <I.check />}
                </span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-foot">
          <button className="modal-foot__btn" onClick={onClose}>Batal</button>
          <button className="modal-foot__btn modal-foot__btn--primary" onClick={onConfirm}>
            Hantar kepada Ketua Unit →
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FloatingRecorder, HantarModal });
