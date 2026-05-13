/* iLPF v2 — Login + MFA variants
   Three side-by-side designs sharing the same step machine.
   Step 1: ID + kata laluan
   Step 2: SMS OTP (6 or 8 digit) — switches to backup-code sub-mode
   Step 3: Disahkan · redirecting */

const { useState, useEffect, useRef, useCallback } = React;

/* ---------- icons (inline SVG) -------------------------------------- */

const Ic = {
  shield: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
  ),
  phone: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></svg>
  ),
  eye: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  eyeOff: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m3 3 18 18"/><path d="M10.7 5.1A11 11 0 0 1 12 5c6.5 0 10 7 10 7a13.2 13.2 0 0 1-2.2 2.95"/><path d="M6.6 6.6A13.6 13.6 0 0 0 2 12s3.5 7 10 7a10.8 10.8 0 0 0 5-1.2"/><path d="M9.9 9.9A3 3 0 0 0 14 14"/></svg>
  ),
  check: (p) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>
  ),
  arrowR: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
  ),
  arrowL: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>
  ),
  key: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 8.2-8.2"/><path d="m17 5 3 3"/><path d="m15 7 3 3"/></svg>
  ),
  alert: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
  ),
};

/* ---------- shared step machine ------------------------------------- */

function useLoginFlow(otpLen, onSubmitCreds, onSubmitOtp) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState("sms"); // 'sms' | 'backup'
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [credBusy, setCredBusy] = useState(false);
  const [credErr, setCredErr] = useState("");

  const otpRef = useRef(Array(otpLen).fill(""));
  const [otp, setOtpState] = useState(() => Array(otpLen).fill(""));
  const setOtp = useCallback((v) => { otpRef.current = v; setOtpState(v); }, []);
  const [otpBusy, setOtpBusy] = useState(false);
  const [otpErr, setOtpErr] = useState("");
  const [resendIn, setResendIn] = useState(32);

  const [backup, setBackup] = useState(["", "", "", ""]);
  const [backupBusy, setBackupBusy] = useState(false);
  const [backupErr, setBackupErr] = useState("");

  // Reset OTP array when length changes
  useEffect(() => {
    const fresh = Array(otpLen).fill("");
    otpRef.current = fresh;
    setOtpState(fresh);
  }, [otpLen]);

  // Resend countdown
  useEffect(() => {
    if (step !== 2 || mode !== "sms") return;
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, mode, resendIn]);

  const submitCreds = useCallback(
    (e) => {
      e && e.preventDefault();
      setCredErr("");
      setCredBusy(true);
      if (onSubmitCreds) {
        onSubmitCreds({ userId, password }, ({ ok, error }) => {
          setCredBusy(false);
          if (ok) { setStep(2); setMode("sms"); setResendIn(32); }
          else setCredErr(error || "E-mel atau kata laluan tidak sah.");
        });
      } else {
        setTimeout(() => {
          setCredBusy(false);
          setStep(2);
          setMode("sms");
          setResendIn(32);
        }, 700);
      }
    },
    [userId, password, onSubmitCreds]
  );

  const submitOtp = useCallback(() => {
    setOtpBusy(true);
    setOtpErr("");
    if (onSubmitOtp) {
      onSubmitOtp({ code: otpRef.current.join("") }, ({ ok, error, redirect }) => {
        setOtpBusy(false);
        if (ok) {
          setStep(3);
          if (redirect) setTimeout(() => { window.location.href = redirect; }, 1200);
        } else {
          setOtpErr(error || "Kod OTP tidak sah.");
        }
      });
    } else {
      setTimeout(() => { setOtpBusy(false); setStep(3); }, 900);
    }
  }, [onSubmitOtp]);

  const submitBackup = useCallback(() => {
    setBackupBusy(true);
    setBackupErr("");
    setTimeout(() => {
      setBackupBusy(false);
      setStep(3);
    }, 900);
  }, []);

  const resend = () => {
    setResendIn(32);
    setOtp(Array(otpLen).fill(""));
    setOtpErr("");
  };

  const restart = () => {
    setStep(1);
    setMode("sms");
    setOtp(Array(otpLen).fill(""));
    setBackup(["", "", "", ""]);
    setOtpErr("");
    setBackupErr("");
    setCredErr("");
    setResendIn(32);
  };

  return {
    step, setStep,
    mode, setMode,
    userId, setUserId,
    password, setPassword,
    showPass, setShowPass,
    credBusy, credErr, submitCreds,
    otp, setOtp,
    otpBusy, otpErr, submitOtp,
    resendIn, resend,
    backup, setBackup,
    backupBusy, backupErr, submitBackup,
    restart,
  };
}

/* ---------- OTP grid component -------------------------------------- */

function OtpGrid({ value, onChange, onComplete, dark, errored, len }) {
  const refs = useRef([]);

  const set = (i, v) => {
    const next = [...value];
    next[i] = v;
    onChange(next);
    if (v && i < len - 1) refs.current[i + 1]?.focus();
    if (next.every((d) => d !== "") && next.join("").length === len) {
      onComplete && onComplete(next.join(""));
    }
  };

  const handleKey = (i, e) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowLeft" && i > 0) {
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < len - 1) {
      refs.current[i + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const txt = (e.clipboardData.getData("text") || "")
      .replace(/\D/g, "")
      .slice(0, len);
    if (!txt) return;
    e.preventDefault();
    const next = Array(len).fill("");
    for (let i = 0; i < txt.length; i++) next[i] = txt[i];
    onChange(next);
    const focusAt = Math.min(txt.length, len - 1);
    refs.current[focusAt]?.focus();
    if (txt.length === len) onComplete && onComplete(txt);
  };

  return (
    <div className="otp">
      {Array.from({ length: len }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className={`otp__cell ${dark ? "otp__cell--dark" : ""} ${value[i] ? "otp__cell--filled" : ""} ${errored ? "otp__cell--err" : ""}`}
          value={value[i]}
          onChange={(e) => set(i, e.target.value.replace(/\D/g, "").slice(-1))}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          autoFocus={i === 0}
        />
      ))}
    </div>
  );
}

/* ---------- Backup-code 4×4 grid ------------------------------------ */

function BackupGrid({ value, onChange, dark }) {
  const refs = useRef([]);
  const set = (gi, v) => {
    const cleaned = v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
    const next = [...value];
    next[gi] = cleaned;
    onChange(next);
    if (cleaned.length === 4 && gi < 3) refs.current[gi + 1]?.focus();
  };
  const handlePaste = (e) => {
    const txt = (e.clipboardData.getData("text") || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 16);
    if (!txt) return;
    e.preventDefault();
    const next = ["", "", "", ""];
    for (let i = 0; i < 4; i++) next[i] = txt.slice(i * 4, i * 4 + 4);
    onChange(next);
    const lastIdx = Math.min(3, Math.floor((txt.length - 1) / 4));
    refs.current[lastIdx]?.focus();
  };
  return (
    <div className={`backup ${dark ? "backup--dark" : ""}`}>
      {[0, 1, 2, 3].map((gi) => (
        <React.Fragment key={gi}>
          <input
            ref={(el) => (refs.current[gi] = el)}
            type="text"
            className="backup__cell"
            value={value[gi]}
            onChange={(e) => set(gi, e.target.value)}
            onPaste={handlePaste}
            placeholder="····"
            autoFocus={gi === 0}
          />
          {gi < 3 && <span className="backup__sep">–</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ---------- Resend pill --------------------------------------------- */

function ResendPill({ resendIn, onResend, dark }) {
  return (
    <div className="va-resend" style={dark ? { color: "rgba(255,255,255,0.55)" } : null}>
      <span>Tidak menerima SMS?</span>
      {resendIn > 0 ? (
        <span className="tabular" style={{ fontSize: 12 }}>
          Hantar semula dalam <strong className="tabular">0:{String(resendIn).padStart(2, "0")}</strong>
        </span>
      ) : (
        <button type="button" className="va-resend__btn" style={dark ? { color: "var(--teal)" } : null} onClick={onResend}>
          Hantar semula →
        </button>
      )}
    </div>
  );
}

/* ====================================================================
   VARIANT A — Centered card (classic, calm)
   ==================================================================== */

function LoginA({ otpLen, phone, onSubmitCreds }) {
  const f = useLoginFlow(otpLen, onSubmitCreds);
  return (
    <div className="va-page">
      <div className="va-page__utility">
        <div className="l">
          <span>Portal Rasmi PPF · KDN</span>
        </div>
        <div className="r">
          <span>BM / EN</span>
          <span>·</span>
          <span>OKU</span>
          <span>·</span>
          <span>Hubungi</span>
        </div>
      </div>

      <div className="va-card swap">
        <div className="va-brand">
          <div className="va-brand__mark">
            <img src="assets/logo-mark.svg" alt="iLPF" height="40" />
          </div>
          <div className="va-brand__sub">Ruang ALPF</div>
        </div>

        {f.step === 1 && (
          <div className="swap__screen">
            <h1 className="va-title">Log masuk.<span className="dot" /></h1>
            <p className="va-sub">Pengesahan dua langkah aktif untuk semua ALPF.</p>

            <form className="va-form" onSubmit={f.submitCreds}>
              <div className="field">
                <label className="field__label">ID Pengguna / No. Kad Pengenalan</label>
                <input
                  className="field__input"
                  placeholder="contoh: 800101145678 atau nama.alpf@kdn"
                  value={f.userId}
                  onChange={(e) => f.setUserId(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="field">
                <label className="field__label">Kata Laluan</label>
                <div className="field__row">
                  <input
                    className="field__input"
                    type={f.showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={f.password}
                    onChange={(e) => f.setPassword(e.target.value)}
                  />
                  <button type="button" className="field__eye" onClick={() => f.setShowPass((v) => !v)} aria-label="Tunjuk kata laluan">
                    {f.showPass ? <Ic.eyeOff /> : <Ic.eye />}
                  </button>
                </div>
              </div>

              <div className="va-form__row">
                <span style={{ color: "var(--mute)" }}>
                  <Ic.shield style={{ verticalAlign: "-3px", marginRight: 4 }} />
                  Disahkan SMS pada langkah seterusnya
                </span>
                <a href="#">Lupa kata laluan?</a>
              </div>

              {f.credErr && (
                <div className="formerr"><Ic.alert /> {f.credErr}</div>
              )}

              <button type="submit" className="btn btn--primary btn--block" disabled={f.credBusy}>
                {f.credBusy ? (
                  <span className="verifying"><span className="spinner" /> Mengesahkan…</span>
                ) : (
                  <>Teruskan <Ic.arrowR /></>
                )}
              </button>
            </form>
          </div>
        )}

        {f.step === 2 && (
          <div className="swap__screen">
            <button className="va-back" onClick={f.restart} aria-label="Kembali"><Ic.arrowL /></button>

            <div className="steprail" style={{ marginBottom: 18 }}>
              <span className="steprail__pill steprail__pill--done"><span className="steprail__n">✓</span> Kata laluan</span>
              <span className="steprail__pill steprail__pill--active"><span className="steprail__n">2</span> SMS OTP</span>
            </div>

            <h1 className="va-title">Sahkan identiti.<span className="dot" /></h1>
            <p className="va-sub">
              {f.mode === "sms"
                ? `Kod ${otpLen}-digit dihantar ke nombor berdaftar anda.`
                : "Masukkan kod sandaran 16-aksara dari pendaftaran anda."}
            </p>

            {f.mode === "sms" ? (
              <>
                <div className="va-otp-target">
                  <div className="va-otp-target__icon"><Ic.phone /></div>
                  <div>
                    <span className="va-otp-target__hint">Dihantar ke</span>
                    <span className="va-otp-target__phone">{phone}</span>
                  </div>
                </div>

                <OtpGrid
                  value={f.otp}
                  onChange={f.setOtp}
                  onComplete={f.submitOtp}
                  errored={!!f.otpErr}
                  len={otpLen}
                />

                {f.otpErr && (
                  <div className="formerr" style={{ marginTop: 14 }}><Ic.alert /> {f.otpErr}</div>
                )}

                <ResendPill resendIn={f.resendIn} onResend={f.resend} />

                <button
                  className="btn btn--primary btn--block"
                  style={{ marginTop: 18 }}
                  disabled={f.otpBusy}
                  onClick={f.submitOtp}
                >
                  {f.otpBusy ? (
                    <span className="verifying" style={{ color: "rgba(255,255,255,0.95)" }}>
                      <span className="spinner" style={{ borderColor: "rgba(255,255,255,0.25)", borderTopColor: "#fff" }} /> Mengesahkan…
                    </span>
                  ) : (
                    <>Sahkan <Ic.arrowR /></>
                  )}
                </button>

                <div className="va-alt">
                  <span><Ic.key style={{ verticalAlign: "-2px", marginRight: 6 }} />Tiada akses ke telefon?</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); f.setMode("backup"); }}>Guna kod sandaran →</a>
                </div>
              </>
            ) : (
              <>
                <BackupGrid value={f.backup} onChange={f.setBackup} />

                {f.backupErr && (
                  <div className="formerr" style={{ marginTop: 14 }}><Ic.alert /> {f.backupErr}</div>
                )}

                <button
                  className="btn btn--primary btn--block"
                  style={{ marginTop: 18 }}
                  disabled={f.backupBusy}
                  onClick={f.submitBackup}
                >
                  {f.backupBusy ? (
                    <span className="verifying" style={{ color: "rgba(255,255,255,0.95)" }}>
                      <span className="spinner" style={{ borderColor: "rgba(255,255,255,0.25)", borderTopColor: "#fff" }} /> Mengesahkan…
                    </span>
                  ) : (
                    <>Sahkan <Ic.arrowR /></>
                  )}
                </button>

                <div className="va-alt">
                  <span>Kod sandaran adalah sekali guna.</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); f.setMode("sms"); }}>← Kembali ke SMS</a>
                </div>
              </>
            )}
          </div>
        )}

        {f.step === 3 && (
          <div className="swap__screen va-success">
            <div className="va-success__ring"><Ic.check /></div>
            <h1 className="va-title" style={{ justifyContent: "center" }}>Disahkan.<span className="dot" /></h1>
            <p className="va-sub" style={{ textAlign: "center" }}>
              Selamat datang kembali. Membuka ruang kerja anda.
            </p>
            <div className="va-success__redir">
              <span><span className="dots"><span /><span /><span /></span> Mengalihkan ke</span>
              <span className="target">/app/utama</span>
            </div>
          </div>
        )}

        <div className="va-footer">
          <span>© KDN · PPF 2026</span>
          <span className="build">v2.0.0-alpf</span>
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   VARIANT B — Split editorial
   ==================================================================== */

function LoginB({ otpLen, phone, onSubmitCreds, onSubmitOtp }) {
  const f = useLoginFlow(otpLen, onSubmitCreds, onSubmitOtp);
  return (
    <div className="vb-page">
      <div className="vb-left">
        <div>
          <div className="vb-left__top">
            <div className="wm"><span className="i">i</span>LPF<span className="dot" /></div>
            <div className="meta">RUANG ALPF · v2</div>
          </div>
        </div>

        <div>
          <h2 className="vb-left__hero">
            <span className="line">Dibina untuk</span>
            <span className="line"><span className="accent">memutuskan</span>.</span>
            <span className="line">Direka untuk</span>
            <span className="line">menyampaikan.<span className="dot dot--lg" /></span>
          </h2>
          <p className="vb-left__lede">
            Ruang kerja Ahli Lembaga Penapisan Filem. Tenang. Padat. Decisif. Setiap tugasan, satu klik daripada selesai.
          </p>

          <div className="vb-left__decisive">
            <div className="vb-decisive"><span className="word">Diluluskan</span>.</div>
            <div className="vb-decisive"><span className="word">Dihantar</span>.</div>
            <div className="vb-decisive"><span className="word">Selesai</span>.</div>
          </div>
        </div>

        <div className="vb-left__foot">
          <span className="stamp">Pejabat Penapisan Filem · KDN</span>
          <span>Sesi disulitkan TLS 1.3</span>
        </div>
      </div>

      <div className="vb-right">
        <div className="vb-right__inner swap">
          {f.step === 1 && (
            <div className="swap__screen">
              <div className="vb-right__head">
                <div>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>Langkah 1 daripada 2</div>
                  <h1 className="vb-h1">Log masuk.<span className="dot" /></h1>
                </div>
              </div>
              <p className="vb-sub">Masukkan butiran rasmi anda untuk meneruskan.</p>

              <form className="va-form" onSubmit={f.submitCreds}>
                <div className="field">
                  <label className="field__label">No. Kad Pengenalan / Emel KDN</label>
                  <input
                    className="field__input"
                    placeholder="800101145678"
                    value={f.userId}
                    onChange={(e) => f.setUserId(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="field">
                  <label className="field__label">Kata Laluan</label>
                  <div className="field__row">
                    <input
                      className="field__input"
                      type={f.showPass ? "text" : "password"}
                      placeholder="••••••••"
                      value={f.password}
                      onChange={(e) => f.setPassword(e.target.value)}
                    />
                    <button type="button" className="field__eye" onClick={() => f.setShowPass((v) => !v)}>
                      {f.showPass ? <Ic.eyeOff /> : <Ic.eye />}
                    </button>
                  </div>
                </div>

                <div className="va-form__row">
                  <span style={{ color: "var(--mute)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Ic.shield /> SMS OTP seterusnya
                  </span>
                  <a href="#">Lupa kata laluan?</a>
                </div>

                {f.credErr && <div className="formerr"><Ic.alert /> {f.credErr}</div>}

                <button type="submit" className="btn btn--primary btn--block" disabled={f.credBusy}>
                  {f.credBusy ? (
                    <span className="verifying" style={{ color: "rgba(255,255,255,0.95)" }}>
                      <span className="spinner" style={{ borderColor: "rgba(255,255,255,0.25)", borderTopColor: "#fff" }} /> Mengesahkan…
                    </span>
                  ) : (
                    <>Teruskan <Ic.arrowR /></>
                  )}
                </button>
              </form>
            </div>
          )}

          {f.step === 2 && (
            <div className="swap__screen" style={{ position: "relative" }}>
              <button className="va-back" style={{ left: -44, top: -4 }} onClick={f.restart}><Ic.arrowL /></button>

              <div className="vb-right__head">
                <div>
                  <div className="eyebrow eyebrow--teal" style={{ marginBottom: 6 }}>Langkah 2 daripada 2 · MFA</div>
                  <h1 className="vb-h1">Sahkan dengan SMS.<span className="dot" /></h1>
                </div>
              </div>
              <p className="vb-sub">
                {f.mode === "sms"
                  ? `Kami menghantar kod ${otpLen}-digit ke nombor berdaftar anda. Kod sah selama 5 minit.`
                  : "Masukkan kod sandaran 16-aksara dari pendaftaran anda."}
              </p>

              {f.mode === "sms" ? (
                <>
                  <div className="va-otp-target">
                    <div className="va-otp-target__icon"><Ic.phone /></div>
                    <div>
                      <span className="va-otp-target__hint">Dihantar ke</span>
                      <span className="va-otp-target__phone">{phone}</span>
                    </div>
                  </div>

                  <OtpGrid
                    value={f.otp}
                    onChange={f.setOtp}
                    onComplete={f.submitOtp}
                    errored={!!f.otpErr}
                    len={otpLen}
                  />

                  {f.otpErr && <div className="formerr" style={{ marginTop: 14 }}><Ic.alert /> {f.otpErr}</div>}

                  <ResendPill resendIn={f.resendIn} onResend={f.resend} />

                  <button
                    className="btn btn--primary btn--block"
                    style={{ marginTop: 18 }}
                    disabled={f.otpBusy}
                    onClick={f.submitOtp}
                  >
                    {f.otpBusy ? (
                      <span className="verifying" style={{ color: "rgba(255,255,255,0.95)" }}>
                        <span className="spinner" style={{ borderColor: "rgba(255,255,255,0.25)", borderTopColor: "#fff" }} /> Mengesahkan…
                      </span>
                    ) : (
                      <>Sahkan <Ic.arrowR /></>
                    )}
                  </button>

                  <div className="va-alt">
                    <span><Ic.key style={{ verticalAlign: "-2px", marginRight: 6 }} />Tiada akses ke telefon?</span>
                    <a href="#" onClick={(e) => { e.preventDefault(); f.setMode("backup"); }}>Guna kod sandaran →</a>
                  </div>
                </>
              ) : (
                <>
                  <BackupGrid value={f.backup} onChange={f.setBackup} />
                  {f.backupErr && <div className="formerr" style={{ marginTop: 14 }}><Ic.alert /> {f.backupErr}</div>}
                  <button
                    className="btn btn--primary btn--block"
                    style={{ marginTop: 18 }}
                    disabled={f.backupBusy}
                    onClick={f.submitBackup}
                  >
                    {f.backupBusy ? (
                      <span className="verifying" style={{ color: "rgba(255,255,255,0.95)" }}>
                        <span className="spinner" style={{ borderColor: "rgba(255,255,255,0.25)", borderTopColor: "#fff" }} /> Mengesahkan…
                      </span>
                    ) : (
                      <>Sahkan <Ic.arrowR /></>
                    )}
                  </button>
                  <div className="va-alt">
                    <span>Kod sandaran adalah sekali guna.</span>
                    <a href="#" onClick={(e) => { e.preventDefault(); f.setMode("sms"); }}>← Kembali ke SMS</a>
                  </div>
                </>
              )}
            </div>
          )}

          {f.step === 3 && (
            <div className="swap__screen va-success">
              <div className="va-success__ring"><Ic.check /></div>
              <h1 className="vb-h1" style={{ justifyContent: "center" }}>Disahkan.<span className="dot" /></h1>
              <p className="vb-sub" style={{ textAlign: "center" }}>
                Selamat kembali. Membuka ruang kerja anda.
              </p>
              <a href="Utama.php" className="btn btn--primary btn--block" style={{ marginTop: 18, textDecoration: "none" }}>
                Masuk ruang kerja <Ic.arrowR />
              </a>
              <a href="Utama.php" className="va-success__redir" style={{ textDecoration: "none" }}>
                <span><span className="dots"><span /><span /><span /></span> Mengalihkan ke</span>
                <span className="target">/app/utama</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   VARIANT C — Pine terminal (dark, senior-analyst feel)
   ==================================================================== */

function LoginC({ otpLen, phone, onSubmitCreds }) {
  const f = useLoginFlow(otpLen, onSubmitCreds);
  const stamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  return (
    <div className="vc-page">
      <div className="vc-utility">
        <span>PORTAL.RASMI / PPF · KDN</span>
        <span className="pulse">SESI · TLS 1.3 · MY-WEST-1</span>
      </div>

      <div className="vc-panel swap">
        <div className="vc-panel__corner">AUTH · SECURE</div>

        <div className="vc-head">
          <div className="vc-mark"><span className="i">i</span>LPF<span className="dot" /></div>
          <div className="vc-meta">{stamp} UTC</div>
        </div>

        {f.step === 1 && (
          <div className="swap__screen">
            <div className="steprail steprail--dark" style={{ marginBottom: 14 }}>
              <span className="steprail__pill steprail__pill--active"><span className="steprail__n">1</span> Kata laluan</span>
              <span className="steprail__pill"><span className="steprail__n">2</span> SMS OTP</span>
            </div>

            <h1 className="vc-h1">Log masuk.<span className="dot" /></h1>
            <p className="vc-sub">Ruang kerja ALPF. Akses terhad kepada anggota Lembaga Penapisan Filem yang dilantik.</p>

            <form className="va-form" onSubmit={f.submitCreds}>
              <div className="field">
                <label className="field__label" style={{ color: "rgba(255,255,255,0.55)" }}>ID / No. KP</label>
                <input
                  className="field__input field__input--dark"
                  placeholder="800101145678"
                  value={f.userId}
                  onChange={(e) => f.setUserId(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="field">
                <label className="field__label" style={{ color: "rgba(255,255,255,0.55)" }}>Kata laluan</label>
                <div className="field__row">
                  <input
                    className="field__input field__input--dark"
                    type={f.showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={f.password}
                    onChange={(e) => f.setPassword(e.target.value)}
                  />
                  <button type="button" className="field__eye field__eye--dark" onClick={() => f.setShowPass((v) => !v)}>
                    {f.showPass ? <Ic.eyeOff /> : <Ic.eye />}
                  </button>
                </div>
              </div>

              <div className="vc-row">
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Ic.shield /> Pengesahan SMS aktif
                </span>
                <a href="#">Lupa kata laluan?</a>
              </div>

              {f.credErr && <div className="formerr"><Ic.alert /> {f.credErr}</div>}

              <button type="submit" className="btn btn--primary btn--block" disabled={f.credBusy}>
                {f.credBusy ? (
                  <span className="verifying verifying--dark"><span className="spinner" /> Mengesahkan…</span>
                ) : (
                  <>Teruskan <Ic.arrowR /></>
                )}
              </button>
            </form>
          </div>
        )}

        {f.step === 2 && (
          <div className="swap__screen" style={{ position: "relative" }}>
            <button
              className="va-back"
              style={{ left: -8, top: -8, color: "rgba(255,255,255,0.6)" }}
              onClick={f.restart}
              aria-label="Kembali"
            ><Ic.arrowL /></button>

            <div className="steprail steprail--dark" style={{ marginBottom: 14, paddingLeft: 26 }}>
              <span className="steprail__pill steprail__pill--done"><span className="steprail__n">✓</span> Kata laluan</span>
              <span className="steprail__pill steprail__pill--active"><span className="steprail__n">2</span> SMS OTP</span>
            </div>

            <h1 className="vc-h1">Sahkan identiti.<span className="dot" /></h1>
            <p className="vc-sub">
              {f.mode === "sms"
                ? `Kod ${otpLen}-digit dihantar. Sah 5 minit.`
                : "Kod sandaran 16-aksara. Sekali guna sahaja."}
            </p>

            {f.mode === "sms" ? (
              <>
                <div className="vc-target">
                  <div className="vc-target__icon"><Ic.phone /></div>
                  <div>
                    <span className="vc-target__hint">Dihantar ke</span>
                    <span className="vc-target__phone">{phone}</span>
                  </div>
                </div>

                <OtpGrid
                  value={f.otp}
                  onChange={f.setOtp}
                  onComplete={f.submitOtp}
                  errored={!!f.otpErr}
                  dark
                  len={otpLen}
                />

                {f.otpErr && <div className="formerr" style={{ marginTop: 14 }}><Ic.alert /> {f.otpErr}</div>}

                <ResendPill resendIn={f.resendIn} onResend={f.resend} dark />

                <button
                  className="btn btn--primary btn--block"
                  style={{ marginTop: 18 }}
                  disabled={f.otpBusy}
                  onClick={f.submitOtp}
                >
                  {f.otpBusy ? (
                    <span className="verifying" style={{ color: "rgba(255,255,255,0.95)" }}>
                      <span className="spinner" style={{ borderColor: "rgba(255,255,255,0.25)", borderTopColor: "#fff" }} /> Mengesahkan…
                    </span>
                  ) : (
                    <>Sahkan <Ic.arrowR /></>
                  )}
                </button>

                <div className="vc-alt">
                  <span><Ic.key style={{ verticalAlign: "-2px", marginRight: 6 }} />Tiada akses ke telefon?</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); f.setMode("backup"); }}>Guna kod sandaran →</a>
                </div>
              </>
            ) : (
              <>
                <BackupGrid value={f.backup} onChange={f.setBackup} dark />
                {f.backupErr && <div className="formerr" style={{ marginTop: 14 }}><Ic.alert /> {f.backupErr}</div>}
                <button
                  className="btn btn--primary btn--block"
                  style={{ marginTop: 18 }}
                  disabled={f.backupBusy}
                  onClick={f.submitBackup}
                >
                  {f.backupBusy ? (
                    <span className="verifying" style={{ color: "rgba(255,255,255,0.95)" }}>
                      <span className="spinner" style={{ borderColor: "rgba(255,255,255,0.25)", borderTopColor: "#fff" }} /> Mengesahkan…
                    </span>
                  ) : (
                    <>Sahkan <Ic.arrowR /></>
                  )}
                </button>
                <div className="vc-alt">
                  <span>Sekali guna sahaja.</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); f.setMode("sms"); }}>← Kembali ke SMS</a>
                </div>
              </>
            )}
          </div>
        )}

        {f.step === 3 && (
          <div className="swap__screen" style={{ textAlign: "center", padding: "14px 0 4px" }}>
            <div className="vc-success__ring"><Ic.check /></div>
            <h1 className="vc-h1" style={{ justifyContent: "center" }}>Disahkan.<span className="dot" /></h1>
            <p className="vc-sub" style={{ textAlign: "center" }}>Sesi aktif. Membuka ruang kerja anda.</p>
            <div className="vc-success__redir">
              <span><span className="dots"><span /><span /><span /></span> ROUTE</span>
              <span className="target">/app/utama</span>
            </div>
          </div>
        )}

        <div className="vc-foot">
          <span>© KDN · PPF 2026</span>
          <span className="build">v2.0.0-alpf · sha 7b3c2f</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginA, LoginB, LoginC });
