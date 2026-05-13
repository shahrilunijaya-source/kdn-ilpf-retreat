/* iLPF v2 — Keputusan Tapisan box: LBP/LDP/TUT + Klasifikasi + Pemberat + AI Cadangan
   Exposes: KeputusanBox */

const { useState: useStateKep } = React;

const DECISION_OPTS = [
  { code: "LBP", name: "Lulus bersih" },
  { code: "LDP", name: "Lulus dgn pengubahan" },
  { code: "TUT", name: "Tidak lulus" },
];
const CLS_OPTS = ["U", "P12", "13", "16", "18"];

function KeputusanBox({ ai, pemberatLabels, pemberatRows }) {
  const [decision, setDecision] = useStateKep(null);
  const [klasifikasi, setKlasifikasi] = useStateKep(null);
  const [pemberat, setPemberat] = useStateKep(
    Object.fromEntries(pemberatRows.map((r) => [r.id, -1]))
  );

  const acceptAi = () => {
    if (!ai) return;
    setDecision(ai.keputusan);
    setKlasifikasi(ai.klasifikasi);
    setPemberat(ai.pemberat);
  };

  return (
    <div className="kep">
      {/* Left: dark AI cadangan panel */}
      {ai && (
        <div className="kep__ai-col">
          <div className="kep__ai-col-head">
            <span className="kep__ai-eyebrow">
              <span className="dot" style={{ background: 'var(--teal)', width: 5, height: 5 }} />
              AI Cadangan Keputusan
            </span>
            <span className="kep__ai-conf">Keyakinan <strong>{ai.conf}%</strong></span>
            <button className="ai-strip__cta" style={{ marginLeft: 8, flexShrink: 0 }} onClick={acceptAi}>Salin</button>
          </div>

          <div className="kep__ai-chips">
            <span className="kep__ai-chip kep__ai-chip--kep">{ai.keputusan}</span>
            <span className="kep__ai-chip kep__ai-chip--cls">{ai.klasifikasi}</span>
          </div>

          <div className="kep__ai-text">{ai.text}</div>
        </div>
      )}

      {/* Right: light manual form */}
      <div className="kep__manual-col">
        <div className="kep__head">
          <h2 className="kep__title">Keputusan Tapisan<span className="dot" /></h2>
          <span className="kep__meta">Setelah semua borang di atas selesai, buat keputusan di sini.</span>
        </div>

        <div className="kep-row">
          <div>
            <div className="kep-label">Keputusan <span className="req">*</span></div>
            <div className="kep-opts">
              {DECISION_OPTS.map((o) => (
                <button
                  key={o.code}
                  className={`kep-opt ${decision === o.code ? 'is-active' : ''}`}
                  onClick={() => setDecision(o.code)}
                >
                  <div className="kep-opt__code">{o.code}</div>
                  <div className="kep-opt__name">{o.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="kep-label">Klasifikasi <span className="req">*</span></div>
            <div className="kep-cls">
              {CLS_OPTS.map((c) => (
                <button
                  key={c}
                  data-code={c}
                  className={`kep-cls-chip ${klasifikasi === c ? 'is-active' : ''}`}
                  onClick={() => setKlasifikasi(c)}
                >{c}</button>
              ))}
            </div>
          </div>
        </div>

        {decision === "TUT" && (
          <div className="kep-alasan">
            <div className="kep-label" style={{ color: 'var(--danger)' }}>Alasan TUT <span className="req">*</span></div>
            <textarea
              className="hantar-note"
              style={{ marginTop: 6 }}
              placeholder="Catatkan alasan terperinci kenapa filem tidak diluluskan…"
            />
          </div>
        )}

        <div className="pem">
          <div className="pem__head">
            <span className="kep-label" style={{ marginBottom: 0 }}>Pemberat</span>
            <span style={{ fontSize: 11, color: 'var(--mute)', letterSpacing: '0.04em' }}>10 kategori</span>
          </div>
          {pemberatRows.map((r) => (
            <div key={r.id} className="pem__row">
              <span className="pem__label">{r.label}</span>
              <div className="pem__scale">
                {Array.from({ length: 7 }).map((_, i) => (
                  <button
                    key={i}
                    className={`pem__seg ${i <= pemberat[r.id] ? 'is-active' : ''}`}
                    onClick={() => setPemberat((p) => ({ ...p, [r.id]: i }))}
                    title={pemberatLabels[i]}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="pem__legend">
            <span />
            <div className="pem__legend-row">
              {pemberatLabels.map((l) => <span key={l}>{l}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { KeputusanBox });
