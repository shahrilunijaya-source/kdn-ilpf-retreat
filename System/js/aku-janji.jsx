/* iLPF v2 — Aku Janji overlay
   Two variants:
     - AkuJanjiV2: transparent, non-blocking quarterly overlay (spec §2.4.1)
     - AkuJanjiLegacy: original blocking modal with Bersetuju/Tidak Bersetuju
   Both share submit flow:
     idle → submitting (~700ms backend round-trip) → receipt (timestamp/IP/quarter)
   Exposes: AkuJanjiV2, AkuJanjiLegacy */

const { useState: useStateAJ } = React;

function currentQuarterLabel() {
  const d = window.iLPF.today;
  const q = Math.floor(d.getMonth() / 3) + 1;
  return `Q${q} ${d.getFullYear()}`;
}
function nowStamp() {
  const d = window.iLPF.today;
  const time = "10:42:18"; // deterministic for demo
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${time} MYT`;
}

const DEMO_BACKEND = {
  ip: "60.49.182.14",
  device: "MacBook Pro · Safari 18.4",
  txnId: "AJ-2026-Q2-00428",
};

/* ---------- Shared receipt card (after submit) ----------------------- */

function AkuReceipt({ onClose, mode }) {
  const I = window.Icons;
  return (
    <div className="aku-receipt">
      <div className="aku-receipt__ring"><I.check /></div>
      <div className="aku-receipt__title">Direkodkan.<span className="dot" /></div>
      <div className="aku-receipt__sub">
        Pengesahan suku ini telah dihantar dan disimpan secara legal.
      </div>
      <div className="aku-receipt__meta">
        <div className="row"><span>Suku</span><strong>{currentQuarterLabel()}</strong></div>
        <div className="row"><span>Cap masa</span><strong>{nowStamp()}</strong></div>
        <div className="row"><span>IP</span><strong>{DEMO_BACKEND.ip}</strong></div>
        <div className="row"><span>Peranti</span><strong>{DEMO_BACKEND.device}</strong></div>
        <div className="row"><span>Rujukan</span><strong>{DEMO_BACKEND.txnId}</strong></div>
        <div className="row"><span>Status</span><strong style={{ color: 'var(--success)' }}>200 · Disimpan</strong></div>
      </div>
      <button className="aku-receipt__close" onClick={onClose}>
        {mode === 'legacy' ? 'Teruskan ke Utama →' : 'Tutup'}
      </button>
    </div>
  );
}

/* ---------- V2 — Transparent quarterly overlay ----------------------- */

function AkuJanjiV2({ onDismiss }) {
  const I = window.Icons;
  const data = window.iLPF;
  const [step, setStep] = useStateAJ('idle'); // 'idle' | 'submitting' | 'done'

  const submit = () => {
    setStep('submitting');
    setTimeout(() => setStep('done'), 750);
  };

  if (step === 'done') {
    return (
      <div className="aku-overlay">
        <div className="aku">
          <AkuReceipt onClose={onDismiss} mode="v2" />
        </div>
      </div>
    );
  }

  return (
    <div className="aku-overlay">
      <div className="aku">
        <div className="aku__eyebrow">Pengesahan suku ini · 3 perkara · {currentQuarterLabel()}</div>
        <h2 className="aku__title">Aku Janji KDN<span className="dot" /></h2>
        <div className="aku__list">
          {data.akuJanji.map((s, i) => (
            <div key={i} className="aku__item">
              <span className="aku__num">{i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <button className="aku__cta" onClick={submit} disabled={step === 'submitting'}>
          {step === 'submitting' ? (
            <span className="aku-submitting"><span className="sp" /> Menghantar ke KDN…</span>
          ) : (
            <>Saya akui · Sahkan suku ini <I.arrowR /></>
          )}
        </button>
      </div>
    </div>
  );
}

/* ---------- Legacy — Blocking modal ---------------------------------- */

function AkuJanjiLegacy({ onDismiss, onReject }) {
  const I = window.Icons;
  const data = window.iLPF;
  const [step, setStep] = useStateAJ('idle'); // 'idle' | 'submitting' | 'done' | 'rejected'

  const accept = () => {
    setStep('submitting');
    setTimeout(() => setStep('done'), 750);
  };

  return (
    <div className="aku aku--legacy">
      <div className="aku-card">
        {step === 'done' ? (
          <AkuReceipt onClose={onDismiss} mode="legacy" />
        ) : step === 'rejected' ? (
          <>
            <div className="aku__eyebrow" style={{ color: 'var(--danger)' }}>TINDAKAN DIBATALKAN</div>
            <h2 className="aku__title">Tidak boleh teruskan.<span className="dot dot--orange" /></h2>
            <div className="aku-reject">
              Anda <strong>tidak boleh</strong> mengakses ruang kerja ALPF tanpa mengesahkan Aku Janji
              suku ini. Hubungi Ketua Unit jika anda perlukan pengecualian.
            </div>
            <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
              <button className="aku__dismiss" style={{ flex: 1 }} onClick={() => setStep('idle')}>
                ← Kembali ke Aku Janji
              </button>
              <a href="logout.php" style={{ flex: 1, textAlign: 'center', padding: '10px', background: 'var(--paper-2)', borderRadius: 'var(--r-md)', fontSize: 13, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none' }}>
                Log keluar
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="aku__eyebrow">Versi LEGACY · Blocking · {currentQuarterLabel()}</div>
            <h2 className="aku__title">Aku Janji KDN<span className="dot" /></h2>
            <p style={{ fontSize: 12.5, color: 'var(--mute)', margin: '0 0 14px', lineHeight: 1.55 }}>
              Anda perlu mengakui ketiga-tiga perkara di bawah sebelum meneruskan ke ruang kerja.
            </p>
            <div className="aku__list">
              {data.akuJanji.map((s, i) => (
                <div key={i} className="aku__item">
                  <span className="aku__num">{i + 1}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div className="aku-choice">
              <button className="reject" onClick={() => setStep('rejected')} disabled={step === 'submitting'}>
                Tidak Bersetuju
              </button>
              <button className="accept" onClick={accept} disabled={step === 'submitting'}>
                {step === 'submitting' ? (
                  <span className="aku-submitting"><span className="sp" /> Menghantar…</span>
                ) : (
                  <>Bersetuju · Teruskan <I.arrowR /></>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { AkuJanjiV2, AkuJanjiLegacy });
