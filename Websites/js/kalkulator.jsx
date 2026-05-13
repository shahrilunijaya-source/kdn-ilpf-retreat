// Kalkulator Yuran — interactive fee estimator

function KalkulatorPage() {
  const [jenis, setJenis] = React.useState("pawagam");
  const [tempoh, setTempoh] = React.useState(120);  // minutes
  const [bahasa, setBahasa] = React.useState("malaysia");
  const [format, setFormat] = React.useState("digital");

  // crude rate calc — illustrative
  const baseRates = { pawagam: 8, tv: 6, publisiti: 12, iklan: 14, dvd: 7 };
  const formatMult = { digital: 1.0, "35mm": 1.4, dcp: 1.1 };
  const bahasaMult = { malaysia: 1.0, inggeris: 1.0, "lain-lain": 1.15 };
  const minBase   = baseRates[jenis] * tempoh;
  const fmtAdj    = minBase * (formatMult[format] - 1);
  const bhsAdj    = minBase * (bahasaMult[bahasa] - 1);
  const sst       = (minBase + fmtAdj + bhsAdj) * 0.06;
  const total     = minBase + fmtAdj + bhsAdj + sst;

  const fmtRM = (v) => "RM " + v.toFixed(2);

  const jenisOpts = [
    { id: "pawagam",   t: "Tayangan Panggung", d: "Sijil A — pawagam" },
    { id: "tv",        t: "Tayangan TV",       d: "Filem & rancangan TV" },
    { id: "publisiti", t: "Bahan Publisiti",   d: "Poster, treler, iklan filem" },
    { id: "iklan",     t: "Iklan TV / Pawagam", d: "Iklan komersial" },
    { id: "dvd",       t: "Pita & DVD",        d: "Sijil B — jualan / pengedaran" },
  ];

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb">
            <a href="index.html">Utama</a>
            <span className="sep">/</span>
            <a href="senarai-filem.html">Perkhidmatan</a>
            <span className="sep">/</span>
            <span className="cur">Kalkulator Yuran</span>
          </div>
          <h1>Kalkulator Yuran<span className="signature-dot"></span></h1>
          <p className="lede">
            Anggaran yuran tapisan filem mengikut Peraturan-Peraturan Penapisan (Fi) Filem 1984.
          </p>
        </div>
      </section>

      <section style={{paddingBottom: 64}}>
        <div className="container">
          <div className="calc-grid">
            <div className="calc-form">
              <div className="calc-step">
                <div className="step-hdr"><span className="step-num">1</span><h3>Jenis Permohonan</h3></div>
                <div className="calc-radio-grid">
                  {jenisOpts.slice(0,4).map(j => (
                    <label key={j.id} className={"radio-card " + (jenis === j.id ? "checked" : "")} onClick={() => setJenis(j.id)}>
                      <span className="rc-dot"></span>
                      <span className="rc-body">
                        <h5>{j.t}</h5>
                        <p>{j.d}</p>
                      </span>
                    </label>
                  ))}
                </div>
                <label className={"radio-card " + (jenis === "dvd" ? "checked" : "")} onClick={() => setJenis("dvd")} style={{marginTop: 10}}>
                  <span className="rc-dot"></span>
                  <span className="rc-body">
                    <h5>{jenisOpts[4].t}</h5>
                    <p>{jenisOpts[4].d}</p>
                  </span>
                </label>
              </div>

              <div className="calc-step">
                <div className="step-hdr"><span className="step-num">2</span><h3>Tempoh Tayangan</h3></div>
                <div style={{display:"flex", gap: 16, alignItems:"center"}}>
                  <input type="range" min="10" max="240" step="5" value={tempoh}
                    onChange={(e) => setTempoh(+e.target.value)}
                    style={{flex:1, accentColor: "var(--teal)"}}/>
                  <div style={{font:"700 28px/1 var(--font-sans)", color:"var(--pine)", letterSpacing:"-0.02em", minWidth: 100, textAlign:"right"}}>
                    {tempoh}<span style={{fontSize: 13, fontWeight: 500, color: "var(--gray-500)", marginLeft: 4}}>minit</span>
                  </div>
                </div>
                <p className="hint" style={{font:"400 12px/1.4 var(--font-sans)", color:"var(--gray-500)", marginTop: 10}}>
                  Tempoh sebenar filem (tidak termasuk kredit atau iklan).
                </p>
              </div>

              <div className="calc-step">
                <div className="step-hdr"><span className="step-num">3</span><h3>Bahasa & Format</h3></div>
                <div className="field-row">
                  <div className="field">
                    <label>Bahasa</label>
                    <select value={bahasa} onChange={(e) => setBahasa(e.target.value)}>
                      <option value="malaysia">Bahasa Malaysia</option>
                      <option value="inggeris">Bahasa Inggeris</option>
                      <option value="lain-lain">Lain-lain (perlu terjemahan)</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Format penyerahan</label>
                    <select value={format} onChange={(e) => setFormat(e.target.value)}>
                      <option value="digital">Digital (MP4, MOV)</option>
                      <option value="dcp">DCP</option>
                      <option value="35mm">35mm</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{marginTop: 16, padding: "16px 20px", background: "var(--paper)", borderRadius: 12, font:"400 13px/1.5 var(--font-sans)", color:"var(--gray-600)", display:"flex", gap: 12, alignItems:"start"}}>
                <i data-lucide="info" style={{color:"var(--teal-700)", marginTop: 2, flexShrink: 0}}></i>
                <span>Anggaran sahaja. Yuran sebenar disahkan selepas semakan dokumen oleh pegawai PPF.</span>
              </div>
            </div>

            <aside className="calc-panel">
              <div className="lbl">Anggaran Yuran Tapisan</div>
              <div className="total"><span className="cur">RM</span>{total.toLocaleString("ms-MY", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <p className="ref">Termasuk SST 6%. Untuk {tempoh} minit · {jenisOpts.find(j=>j.id===jenis).t}.</p>

              <div className="calc-breakdown">
                <div className="calc-bk-row">
                  <span className="l">Asas tapisan ({tempoh} min)</span>
                  <span className="v">{fmtRM(minBase)}</span>
                </div>
                {Math.abs(fmtAdj) > 0.001 && (
                  <div className="calc-bk-row">
                    <span className="l">Pelarasan format</span>
                    <span className="v">{fmtRM(fmtAdj)}</span>
                  </div>
                )}
                {Math.abs(bhsAdj) > 0.001 && (
                  <div className="calc-bk-row">
                    <span className="l">Pelarasan bahasa (terjemahan)</span>
                    <span className="v">{fmtRM(bhsAdj)}</span>
                  </div>
                )}
                <div className="calc-bk-row">
                  <span className="l">SST (6%)</span>
                  <span className="v">{fmtRM(sst)}</span>
                </div>
              </div>

              <a href="login.html?as=pengedar" className="btn btn-teal btn-block btn-lg">
                Teruskan ke Permohonan <i data-lucide="arrow-right"></i>
              </a>
              <p style={{font:"400 11px/1.5 var(--font-sans)", color:"rgba(255,255,255,0.55)", margin:"14px 0 0", textAlign:"center"}}>
                Bayaran melalui FPX, kad kredit/debit, atau ePay.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

window.KalkulatorPage = KalkulatorPage;
