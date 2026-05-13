/* iLPF v2 — Tapisan Screen sections: Sinopsis, Dialog, Genre, Tema, Panel, Keterangan
   Each section uses .tap-section + .tap-rt + AI sidecar (.ai-strip).
   Exposes the section components individually. */

const { useState: useStateTSec } = React;

/* ---------- Reusable RT editor ---------------------------------------- */

function RtEditor({ children, small }) {
  return (
    <div className="tap-rt">
      <div className="tap-rt__bar">
        <button className="tap-rt__btn"><strong>B</strong></button>
        <button className="tap-rt__btn"><em>I</em></button>
        <button className="tap-rt__btn"><u>U</u></button>
        <span className="tap-rt__sep" />
        <button className="tap-rt__btn">Styles</button>
        <button className="tap-rt__btn">Format</button>
        <button className="tap-rt__btn">Font</button>
        <button className="tap-rt__btn">Size</button>
        <span className="tap-rt__sep" />
        <button className="tap-rt__btn">≣</button>
        <button className="tap-rt__btn">⌗</button>
        <button className="tap-rt__btn">🔗</button>
        <button className="tap-rt__btn">📷</button>
      </div>
      <div className={`tap-rt__area ${small ? 'tap-rt__area--small' : ''}`} contentEditable suppressContentEditableWarning>
        {children}
      </div>
    </div>
  );
}

/* ---------- AI sidecar (pattern A) ------------------------------------ */

function AiSidecar({ title, conf, meta, children, onAccept, ctaLabel = "Salin" }) {
  return (
    <div className="ai-strip">
      <div className="ai-strip__head">
        <span className="ai-strip__badge"><span className="dot dot--white" /> {title}</span>
        <span className="ai-strip__conf">
          Keyakinan <strong>{conf}%</strong>{meta ? ` · ${meta}` : ''}
        </span>
        <button className="ai-strip__cta" onClick={onAccept}>{ctaLabel}</button>
      </div>
      <div className="ai-strip__text">{children}</div>
    </div>
  );
}

/* ---------- Sinopsis section ------------------------------------------ */

function SinopsisSection({ ai, value, onChange }) {
  return (
    <section className="tap-section">
      <div className="tap-section__head">
        <span className="tap-section__title">Sinopsis<span className="req">*</span></span>
        <span className="tap-section__meta">Tulis terus, atau guna cadangan AI di bawah</span>
      </div>
      <RtEditor>{value}</RtEditor>
      {ai && (
        <AiSidecar title="AI Sinopsis" conf={ai.conf} meta={ai.meta} onAccept={() => onChange(ai.text)}>
          {ai.text}
        </AiSidecar>
      )}
    </section>
  );
}

/* ---------- Dialog & sari kata section -------------------------------- */

function DialogSection({ ai, value, onChange }) {
  return (
    <section className="tap-section">
      <div className="tap-section__head">
        <span className="tap-section__title">Dialog &amp; sari kata</span>
        <span className="tap-section__meta">Catatan analisis ASR + OCR</span>
      </div>
      <RtEditor>{value}</RtEditor>
      {ai && (
        <AiSidecar title="AI Dialog &amp; Sarikata" conf={ai.conf} meta={ai.meta} onAccept={() => onChange && onChange(ai.text)}>
          {ai.text}
        </AiSidecar>
      )}
    </section>
  );
}

/* ---------- Genre / Tema common ---------------------------------------- */

function PilihPillModal({ title, pool, selected, onClose, onConfirm }) {
  const [q, setQ] = useStateTSec('');
  const [draft, setDraft] = useStateTSec([...selected]);
  const filtered = pool.filter((p) => p.toLowerCase().includes(q.toLowerCase()));
  const toggle = (p) => setDraft((d) => d.includes(p) ? d.filter((x) => x !== p) : [...d, p]);
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="modal-head__title">Pilih {title}</div>
          </div>
          <button className="modal-head__close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <input
            style={{ width: '100%', boxSizing: 'border-box', marginBottom: 14, padding: '8px 12px', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)', fontSize: 13, outline: 'none', background: 'var(--paper-2)', color: 'var(--ink)' }}
            placeholder="Cari..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoFocus
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {filtered.map((p) => (
              <button
                key={p}
                onClick={() => toggle(p)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: draft.includes(p) ? '1.5px solid var(--teal)' : '1px solid var(--line)',
                  background: draft.includes(p) ? 'var(--teal-soft)' : '#fff',
                  color: draft.includes(p) ? 'var(--pine-deep)' : 'var(--ink)',
                  fontSize: 13,
                  fontWeight: draft.includes(p) ? 600 : 400,
                  cursor: 'pointer',
                }}
              >{p}</button>
            ))}
          </div>
        </div>
        <div className="modal-foot" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--mute)' }}>{draft.length} dipilih</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="modal-foot__btn" onClick={onClose}>Batal</button>
            <button className="modal-foot__btn modal-foot__btn--primary" onClick={() => onConfirm(draft)}>Sahkan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenreOrTemaSection({ title, pool, ai, selected, onTogglePill, onAcceptTop, onSetAll }) {
  const [pickOpen, setPickOpen] = useStateTSec(false);
  return (
    <section className="tap-section">
      <div className="tap-section__head">
        <span className="tap-section__title">{title}<span className="req">*</span></span>
        <button className="ai-tbl__copy" onClick={() => setPickOpen(true)} style={{ marginLeft: 'auto' }}>+ Tambah</button>
      </div>
      <div className={`tap-pills ${selected.length === 0 ? 'tap-pills--empty' : ''}`}>
        {selected.length === 0
          ? <span style={{ cursor: 'pointer' }} onClick={() => setPickOpen(true)}>+ Tambah {title.toLowerCase()}</span>
          : selected.map((s) => (
              <span key={s} className="tap-pill">
                {s}
                <span className="tap-pill__x" onClick={() => onTogglePill(s)}>×</span>
              </span>
            ))
        }
      </div>
      {ai && (
        <div className="ai-strip">
          <div className="ai-strip__head">
            <span className="ai-strip__badge"><span className="dot dot--white" /> AI {title}</span>
            <span className="ai-strip__conf">Keyakinan <strong>{ai.conf}%</strong></span>
            <button className="ai-strip__cta" onClick={() => onAcceptTop(ai.top3)}>Salin</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {ai.top3.map((p) => (
              <button key={p} className="ai-pill" onClick={() => onTogglePill(p)}>
                <span className="ai-pill__plus">+</span> {p}
              </button>
            ))}
            {ai.lower.map((p) => (
              <span key={p.name} className="ai-pill ai-pill--low">
                {p.name} <span className="ai-pill__pct">{p.pct}%</span>
              </span>
            ))}
          </div>
        </div>
      )}
      {pickOpen && (
        <PilihPillModal
          title={title}
          pool={pool || []}
          selected={selected}
          onClose={() => setPickOpen(false)}
          onConfirm={(vals) => { onSetAll(vals); setPickOpen(false); }}
        />
      )}
    </section>
  );
}

/* ---------- Panel section --------------------------------------------- */

function PanelSection({ ai, panel, onOpenPick, onAddAi }) {
  return (
    <section className="tap-section">
      <div className="tap-section__head">
        <span className="tap-section__title">Ahli panel<span className="req">*</span></span>
        <span className="tap-section__meta">3 ahli diperlukan</span>
      </div>
      <div className="tap-panel-grid">
        {panel.ketua ? (
          <div className="tap-panel-card is-filled">
            <div className="tap-panel-card__avatar">{panel.ketua.initials}</div>
            <div>
              <div className="tap-panel-card__name">{panel.ketua.name}{panel.ketua.self ? ' · anda' : ''}</div>
              <div style={{ marginTop: 4 }}>
                <span className="tap-panel-card__role">Ketua Panel</span>
              </div>
            </div>
            <div className="tap-panel-card__meta">{panel.ketua.beban} dalam tangan · {panel.ketua.attend}% hadir</div>
          </div>
        ) : (
          <button className="tap-panel-card is-empty" onClick={() => onOpenPick('ketua')}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--paper-2)', display: 'grid', placeItems: 'center', color: 'var(--mute)', fontSize: 20 }}>+</div>
            <div className="pick">+ Pilih ketua →</div>
          </button>
        )}
        {[0, 1].map((i) => {
          const a = panel.ahli[i];
          if (a) {
            return (
              <div key={i} className="tap-panel-card is-filled" style={{ position: 'relative' }}>
                <div className="tap-panel-card__avatar" style={{ background: 'var(--teal)', color: 'var(--pine-deep)' }}>{a.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="tap-panel-card__name">{a.name}</div>
                  <div style={{ marginTop: 4 }}>
                    <span className="tap-panel-card__role" style={{ background: 'var(--paper-2)', color: 'var(--mute)' }}>Ahli Panel</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                  <div className="tap-panel-card__meta">{a.expertise} · {a.attend}% hadir</div>
                  <button className="ai-tbl__copy" onClick={() => onOpenPick(i)}>Tukar →</button>
                </div>
              </div>
            );
          }
          return (
            <button key={i} className="tap-panel-card is-empty" onClick={() => onOpenPick(i)}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--paper-2)', display: 'grid', placeItems: 'center', color: 'var(--mute)', fontSize: 20 }}>+</div>
              <div className="pick">+ Pilih ahli →</div>
            </button>
          );
        })}
      </div>

      {ai && (
        <div className="ai-strip">
          <div className="ai-strip__head">
            <span className="ai-strip__badge"><span className="dot dot--white" /> AI Panel</span>
            <span className="ai-strip__conf">Keyakinan <strong>{ai.conf}%</strong></span>
            <button className="ai-strip__cta" onClick={onAddAi}>Salin</button>
          </div>
          <div className="ai-strip__text">
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
              {ai.members.map((m, i) => (
                <li key={i}>
                  <strong style={{ color: '#fff', fontWeight: 600 }}>{m.name}</strong>
                  {' '}— {m.expertise}, {m.attend}% hadir
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

Object.assign(window, { SinopsisSection, DialogSection, GenreOrTemaSection, PanelSection, AiSidecar });
