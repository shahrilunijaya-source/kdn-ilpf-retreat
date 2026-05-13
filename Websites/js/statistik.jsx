// Statistik — public dashboard

function Donut({ data, size = 220, stroke = 32 }) {
  const total = data.reduce((s, d) => s + d.v, 0);
  const cx = size / 2, cy = size / 2;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let off = 0;
  return (
    <svg className="donut" viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--gray-100)" strokeWidth={stroke}/>
      {data.map((d, i) => {
        const len = (d.v / total) * c;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.c} strokeWidth={stroke}
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-off}
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="butt"
          />
        );
        off += len;
        return el;
      })}
      <text x={cx} y={cy - 8} textAnchor="middle" style={{font:"600 11px var(--font-sans)", letterSpacing:"0.12em", textTransform:"uppercase", fill:"var(--gray-500)"}}>Jumlah</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{font:"700 28px var(--font-sans)", letterSpacing:"-0.025em", fill:"var(--pine)"}}>{total.toLocaleString("ms-MY")}</text>
    </svg>
  );
}

function TrendChart() {
  // 16 months Jan 2025 – Apr 2026
  const months = ["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogo","Sep","Okt","Nov","Dis","Jan","Feb","Mac","Apr"];
  const received  = [142, 156, 168, 172, 188, 196, 184, 192, 178, 195, 210, 224, 198, 215, 232, 240];
  const approved  = [128, 142, 156, 160, 175, 184, 172, 178, 165, 182, 198, 210, 184, 200, 218, 226];
  const w = 920, h = 280, pad = { l: 48, r: 24, t: 24, b: 36 };
  const max = Math.max(...received, ...approved) * 1.1;
  const sx = (i) => pad.l + (i / (months.length - 1)) * (w - pad.l - pad.r);
  const sy = (v) => h - pad.b - (v / max) * (h - pad.t - pad.b);
  const path = (arr) => arr.map((v, i) => `${i === 0 ? "M" : "L"}${sx(i)} ${sy(v)}`).join(" ");
  return (
    <svg className="trend-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
      {[0, 50, 100, 150, 200, 250].map((g, i) => (
        <g key={i}>
          <line x1={pad.l} y1={sy(g)} x2={w - pad.r} y2={sy(g)} stroke="var(--gray-100)" strokeWidth="1"/>
          <text x={pad.l - 8} y={sy(g) + 4} textAnchor="end" style={{font:"400 11px var(--font-mono)", fill:"var(--gray-400)"}}>{g}</text>
        </g>
      ))}
      <path d={`${path(received)} L${sx(months.length-1)} ${h-pad.b} L${sx(0)} ${h-pad.b} Z`} fill="rgba(0,184,169,0.07)"/>
      <path d={path(received)} stroke="var(--teal)" strokeWidth="2.5" fill="none"/>
      <path d={path(approved)} stroke="var(--pine)" strokeWidth="2.5" fill="none" strokeDasharray="0"/>
      {received.map((v, i) => <circle key={"r"+i} cx={sx(i)} cy={sy(v)} r="3" fill="var(--teal)"/>)}
      {approved.map((v, i) => <circle key={"a"+i} cx={sx(i)} cy={sy(v)} r="3" fill="var(--pine)"/>)}
      {months.map((m, i) => (
        <text key={i} x={sx(i)} y={h - pad.b + 18} textAnchor="middle" style={{font:"500 10px var(--font-sans)", fill:"var(--gray-500)"}}>{m}</text>
      ))}
    </svg>
  );
}

function StatistikPage() {
  const byType = window.iLPFData.stats2026.byType;
  const byCls  = window.iLPFData.stats2026.byCls;
  const totalCls = byCls.reduce((s,c) => s+c.v, 0);

  const feed = [
    { t: "2 min", b: "Permohonan dihantar", x: "Bahan Publisiti — pengedar tempatan", tag: "Baharu", c: "subm" },
    { t: "5 min", b: "Permohonan diluluskan", x: "Tayangan Panggung — klasifikasi P13", tag: "Selesai", c: "appr" },
    { t: "8 min", b: "Panel ALPF memulakan sesi", x: "3 ahli · tapisan pawagam", tag: "Sesi", c: "subm" },
    { t: "12 min", b: "Permohonan dihantar", x: "Tayangan TV — drama tempatan", tag: "Baharu", c: "subm" },
    { t: "18 min", b: "Sijil A dikeluarkan", x: "A2026/05/1247", tag: "Selesai", c: "appr" },
    { t: "24 min", b: "Permohonan dihantar", x: "Iklan komersial 30s", tag: "Baharu", c: "subm" },
    { t: "31 min", b: "Permohonan diluluskan", x: "Pita & DVD — klasifikasi 16", tag: "16", c: "appr" },
    { t: "38 min", b: "Bahan publisiti diluluskan", x: "Treler filem pawagam", tag: "Selesai", c: "appr" },
  ];

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb">
            <a href="index.html">Utama</a>
            <span className="sep">/</span>
            <span className="cur">Statistik</span>
          </div>
          <div className="page-head-row">
            <div>
              <h1>Statistik Tapisan<span className="signature-dot"></span></h1>
              <p className="lede">Data terbuka tentang permohonan, kelulusan, dan klasifikasi filem di Malaysia.</p>
            </div>
            <span className="badge badge-orange badge-pulse"><span className="d"></span> Live · Dikemas kini setiap minit</span>
          </div>
          <div style={{display:"flex", gap: 8, marginTop: 24}}>
            {["Hari Ini","Minggu Ini","Bulan Ini","Tahun Ini","Tersuai"].map((p,i) => (
              <button key={i} className={"filter-chip " + (i === 3 ? "active" : "")}>{p}</button>
            ))}
          </div>
        </div>
      </section>

      <section style={{paddingBottom: 48}}>
        <div className="container">
          <div className="stats-grid" style={{marginBottom: 48}}>
            <div className="stat-card">
              <div className="lbl">Permohonan hari ini</div>
              <div className="num">47</div>
              <div className="sub">dalam talian</div>
              <div className="delta">▲ 12% vs purata 30 hari</div>
            </div>
            <div className="stat-card">
              <div className="lbl">Sedang disemak</div>
              <div className="num">18</div>
              <div className="sub">oleh ALPF</div>
              <div className="delta neutral">~ 22 minit anggaran</div>
            </div>
            <div className="stat-card">
              <div className="lbl">Diluluskan hari ini</div>
              <div className="num">31</div>
              <div className="sub">sijil dikeluarkan</div>
              <div className="delta">96% mencapai Piagam</div>
            </div>
            <div className="stat-card">
              <div className="lbl">Aktiviti Live</div>
              <div className="num">6</div>
              <div className="sub">pegawai aktif sekarang</div>
              <div className="delta orange">3 panel dalam sesi</div>
            </div>
          </div>

          <div className="split-2" style={{marginBottom: 32}}>
            <div className="card" style={{padding: 32}}>
              <span className="eyebrow">Permohonan mengikut jenis<span className="e-dot"></span></span>
              <h3 style={{font:"700 22px/1.2 var(--font-sans)", letterSpacing:"-0.02em", color:"var(--pine)", margin:"10px 0 24px"}}>Tahun 2026</h3>
              <div className="donut-wrap">
                <Donut data={byType} />
                <div className="donut-legend">
                  {byType.map((d, i) => {
                    const total = byType.reduce((s,x) => s+x.v, 0);
                    return (
                      <div key={i} className="lg-row">
                        <span className="sw" style={{background: d.c}}></span>
                        <span className="label">{d.l}</span>
                        <span className="val">{d.v.toLocaleString("ms-MY")}</span>
                        <span className="pct">{((d.v/total)*100).toFixed(1)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="card" style={{padding: 32}}>
              <span className="eyebrow">Klasifikasi dikeluarkan<span className="e-dot"></span></span>
              <h3 style={{font:"700 22px/1.2 var(--font-sans)", letterSpacing:"-0.02em", color:"var(--pine)", margin:"10px 0 24px"}}>Tahun 2026</h3>
              <div className="stacked-bar" style={{marginBottom: 20}}>
                {byCls.map((d, i) => (
                  <span key={i} className="seg" style={{background: d.c, width: ((d.v/totalCls)*100) + "%"}}>
                    {d.l}
                  </span>
                ))}
              </div>
              <div className="donut-legend">
                {byCls.map((d, i) => (
                  <div key={i} className="lg-row">
                    <span className={"cls cls-" + (d.l === "U" ? "u" : d.l === "P12" ? "p12" : d.l)} style={{width: 28, height: 28, fontSize: 11, borderRadius: 6}}>{d.l}</span>
                    <span className="label">{
                      d.l === "U" ? "Umum" :
                      d.l === "P12" ? "Bimbingan Ibu Bapa 12+" :
                      d.l === "13" ? "Bimbingan 13+" :
                      d.l === "16" ? "Belia 16+" : "Dewasa 18+"
                    }</span>
                    <span className="val">{d.v.toLocaleString("ms-MY")}</span>
                    <span className="pct">{((d.v/totalCls)*100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card" style={{padding: 32, marginBottom: 32}}>
            <div style={{display:"flex", alignItems:"end", justifyContent:"space-between", marginBottom: 24}}>
              <div>
                <span className="eyebrow">Tren bulanan<span className="e-dot"></span></span>
                <h3 style={{font:"700 22px/1.2 var(--font-sans)", letterSpacing:"-0.02em", color:"var(--pine)", margin:"10px 0 0"}}>Jan 2025 – Apr 2026</h3>
              </div>
              <div style={{display:"flex", gap: 18, font:"500 12px/1 var(--font-sans)", color:"var(--gray-700)"}}>
                <span style={{display:"inline-flex", gap:6, alignItems:"center"}}>
                  <span style={{width:10, height:10, borderRadius:999, background:"var(--teal)"}}></span> Diterima
                </span>
                <span style={{display:"inline-flex", gap:6, alignItems:"center"}}>
                  <span style={{width:10, height:10, borderRadius:999, background:"var(--pine)"}}></span> Diluluskan
                </span>
              </div>
            </div>
            <TrendChart />
          </div>

          <div className="split-2">
            <div>
              <div style={{marginBottom: 20}}>
                <span className="eyebrow">Aktiviti Live<span className="e-dot orange"></span></span>
                <h3 style={{font:"700 22px/1.2 var(--font-sans)", letterSpacing:"-0.02em", color:"var(--pine)", margin:"10px 0 0"}}>Apa yang berlaku sekarang</h3>
              </div>
              <div className="live-feed">
                {feed.map((f, i) => (
                  <div key={i} className="lf-row">
                    <span className="t">{f.t}</span>
                    <span className="desc"><b>{f.b}</b> · {f.x}</span>
                    <span className={"tag " + f.c}>{f.tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{marginBottom: 20}}>
                <span className="eyebrow">Muat turun data<span className="e-dot"></span></span>
                <h3 style={{font:"700 22px/1.2 var(--font-sans)", letterSpacing:"-0.02em", color:"var(--pine)", margin:"10px 0 0"}}>Data terbuka</h3>
              </div>
              <div style={{display:"flex", flexDirection:"column", gap: 12}}>
                <a href="#" className="card card-link" style={{display:"flex", gap:14, alignItems:"center"}}>
                  <span style={{width:40, height:40, borderRadius:10, background:"var(--teal-50)", color:"var(--teal-700)", display:"grid", placeItems:"center"}}>
                    <i data-lucide="file-spreadsheet"></i>
                  </span>
                  <div style={{flex:1}}>
                    <div style={{font:"600 14px/1.2 var(--font-sans)", color:"var(--pine)"}}>Statistik 2026 (CSV)</div>
                    <div style={{font:"400 12px/1.4 var(--font-sans)", color:"var(--gray-500)"}}>Dikemas kini Jan – Apr 2026 · 247 KB</div>
                  </div>
                  <i data-lucide="download" style={{color:"var(--gray-500)"}}></i>
                </a>
                <a href="#" className="card card-link" style={{display:"flex", gap:14, alignItems:"center"}}>
                  <span style={{width:40, height:40, borderRadius:10, background:"var(--teal-50)", color:"var(--teal-700)", display:"grid", placeItems:"center"}}>
                    <i data-lucide="file-text"></i>
                  </span>
                  <div style={{flex:1}}>
                    <div style={{font:"600 14px/1.2 var(--font-sans)", color:"var(--pine)"}}>Laporan tahunan 2025 (PDF)</div>
                    <div style={{font:"400 12px/1.4 var(--font-sans)", color:"var(--gray-500)"}}>48 halaman · 3.2 MB</div>
                  </div>
                  <i data-lucide="download" style={{color:"var(--gray-500)"}}></i>
                </a>
                <a href="#" className="card card-link" style={{display:"flex", gap:14, alignItems:"center"}}>
                  <span style={{width:40, height:40, borderRadius:10, background:"var(--pine)", color:"#fff", display:"grid", placeItems:"center"}}>
                    <i data-lucide="terminal"></i>
                  </span>
                  <div style={{flex:1}}>
                    <div style={{font:"600 14px/1.2 var(--font-sans)", color:"var(--pine)"}}>API Terbuka (pembangun)</div>
                    <div style={{font:"400 12px/1.4 var(--font-sans)", color:"var(--gray-500)"}}>REST · RAM-MY OData v4 · Kunci API percuma</div>
                  </div>
                  <i data-lucide="arrow-up-right" style={{color:"var(--gray-500)"}}></i>
                </a>
              </div>

              <p style={{font:"400 12.5px/1.5 var(--font-sans)", color:"var(--gray-500)", marginTop: 20}}>
                Data terbuka di bawah lesen Creative Commons CC-BY 4.0.
                Data peribadi telah dianonimkan mengikut Akta Perlindungan Data Peribadi 2010.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.StatistikPage = StatistikPage;
