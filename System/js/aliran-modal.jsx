/* iLPF v2 — Aliran Proses modal (shared list/screen)
   Exposes: window.AliranModal */

function AliranModal({ steps, onClose, title = "Aliran Proses — Perakuan A Pita" }) {
  const I = window.Icons;
  React.useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="modal-head__title">{title}<span className="dot" /></div>
            <div className="modal-head__sub">11 langkah · langkah semasa diwarnakan teal</div>
          </div>
          <button className="modal-head__close" onClick={onClose} aria-label="Tutup">
            <I.close />
          </button>
        </div>
        <div className="modal-body">
          <div className="aliran">
            {steps.map((s) => (
              <div key={s.n} className={`aliran__row is-${s.status}`}>
                <div className="aliran__num">{s.status === 'done' ? '✓' : s.n}</div>
                <div>
                  <div className="aliran__title">{s.title}</div>
                  <div className="aliran__role">{s.role}</div>
                </div>
                <div className="aliran__status">
                  {s.status === 'done' && (<>Selesai<span className="ts">{s.ts}</span></>)}
                  {s.status === 'current' && (<>Sedang berjalan</>)}
                  {s.status === 'pending' && (<>Menanti</>)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-foot">
          <button className="modal-foot__btn modal-foot__btn--primary" onClick={onClose}>Tutup</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AliranModal });
