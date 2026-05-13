// CONCEPT A — Cinematic Light
// Soft white hero with diagonal teal/orange light beams + film grain.
// Confident left-aligned display type. Linear-meets-Apple-product-page.

function ConceptA() {
  const [tab, setTab] = React.useState("pengumuman");
  const tabs = [
    { id: "pengumuman", label: "Pengumuman", count: 4 },
    { id: "pemberitahuan", label: "Pemberitahuan", count: 4 },
    { id: "peringatan", label: "Peringatan", count: 4 },
  ];
  const heb = {
    pengumuman: [
      { d: "12 MAY 2026", t: "Pelancaran rasmi iLPF v2", p: "Sistem baharu kini beroperasi penuh. Akaun pengedar sedia dipindahkan." },
      { d: "8 MAY 2026",  t: "Pindaan Garis Panduan Penapisan 2026", p: "Versi 2026 berkuat kuasa pada 1 Jun. Muat turun salinan penuh di portal." },
      { d: "30 APR 2026", t: "Sesi taklimat industri Mei 2026", p: "Pengedar dan stesen TV dijemput hadir taklimat sistem baharu di KDN Putrajaya." },
    ],
    pemberitahuan: [
      { d: "11 MAY 2026", t: "Penyelenggaraan sistem 15 Mei, 11mlm – 5pg", p: "Modul tapisan TV tidak dapat diakses sepanjang tempoh ini." },
      { d: "5 MAY 2026",  t: "Yuran tapisan dikemas kini berkuat kuasa 1 Julai", p: "Rujuk Peraturan-Peraturan Penapisan (Fi) Filem 1984 pindaan 2026." },
      { d: "2 MAY 2026",  t: "Borang Permohonan ALPF kini dalam talian sepenuhnya", p: "Tiada lagi borang kertas. Hantar permohonan terus melalui portal." },
    ],
    peringatan: [
      { d: "10 MAY 2026", t: "Hantar bahan publisiti 2 hari sebelum tayangan", p: "Piagam Pelanggan baharu: tempoh pemprosesan 2 hari bekerja. Jangan tunggu." },
      { d: "7 MAY 2026",  t: "Pastikan filem yang dihantar adalah salinan master", p: "Salinan rendah resolusi atau pratonton tidak akan dilayan." },
      { d: "3 MAY 2026",  t: "Sijil A wajib bagi setiap tayangan pawagam", p: "Tiada Sijil A bermakna tiada tayangan. Semak status sijil." },
    ],
  };

  return (
    <div className="concept-a">
      <UtilBar />
      <SiteHeader />

      <section className="ca-hero">
        <div className="ca-hero-bg">
          <div className="ca-streak s1"></div>
          <div className="ca-streak s2"></div>
          <div className="ca-streak s3"></div>
          <div className="ca-grain"></div>
        </div>
        <div className="container ca-hero-content">
          <span className="eyebrow">Pejabat Penapisan Filem · Sejak 1954<span className="dot"></span></span>
          <h1>
            Tapisan filem Malaysia.<br/>
            <span className="alt">Dibuat dengan jelas</span><span className="signature-dot"></span>
          </h1>
          <p className="lede">
            Platform rasmi untuk semakan, klasifikasi, dan pensijilan filem di Malaysia.
            Dibangunkan untuk pengedar, stesen TV, dan Ahli Lembaga Penapisan Filem.
          </p>
          <div className="ca-hero-actions">
            <a href="#" className="btn btn-teal btn-lg">Hantar Permohonan <i data-lucide="arrow-right"></i></a>
            <a href="#" className="btn btn-ghost btn-lg">Semak Senarai Filem</a>
          </div>
          <div className="ca-hero-trust">
            <span className="t-item"><i data-lucide="shield-check"></i> Akta Penapisan Filem 2002 (Akta 620)</span>
            <span className="sep">·</span>
            <span className="t-item"><i data-lucide="zap"></i> Keputusan 5 hari bekerja</span>
            <span className="sep">·</span>
            <span className="t-item"><i data-lucide="lock"></i> Disahkan KDN</span>
          </div>
        </div>
      </section>

      <section className="ca-hebahan">
        <div className="container">
          <div className="ca-hebahan-head">
            <div>
              <span className="eyebrow">Hebahan Terkini<span className="dot"></span></span>
              <h2>Pengumuman, pemberitahuan, peringatan.</h2>
            </div>
            <div className="ca-tabs">
              {tabs.map(t => (
                <button key={t.id}
                  className={"ca-tab " + (tab === t.id ? "active" : "")}
                  onClick={() => setTab(t.id)}>
                  {t.label} <span className="count">{t.count}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="ca-hebahan-grid">
            {heb[tab].map((it, i) => (
              <article key={i} className="ca-heb-card">
                <div className="date">{it.d}</div>
                <h4>{it.t}</h4>
                <p>{it.p}</p>
                <a className="more" href="#">Baca <i data-lucide="arrow-right" style={{width:13,height:13}}></i></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ca-stats">
        <div className="container">
          <div className="ca-stats-head">
            <div>
              <span className="eyebrow">Statistik Hari Ini<span className="dot orange"></span></span>
              <h2>Sistem yang sentiasa hidup.</h2>
            </div>
            <span className="live-badge"><span className="live-dot"></span> Live · Dikemas kini setiap minit</span>
          </div>
          <div className="ca-stats-grid">
            <div className="ca-stat">
              <div className="lbl">Permohonan hari ini</div>
              <div className="num">47</div>
              <div className="sub">dalam talian</div>
              <div className="delta">▲ 12% vs semalam</div>
            </div>
            <div className="ca-stat">
              <div className="lbl">Sedang disemak</div>
              <div className="num">18</div>
              <div className="sub">oleh ALPF</div>
              <div className="delta neutral">~ 22 minit anggaran</div>
            </div>
            <div className="ca-stat">
              <div className="lbl">Diluluskan minggu ini</div>
              <div className="num">312</div>
              <div className="sub">sijil dikeluarkan</div>
              <div className="delta">96% mencapai SLA</div>
            </div>
            <div className="ca-stat">
              <div className="lbl">Disenaraikan 2026</div>
              <div className="num">1,847</div>
              <div className="sub">sepanjang tahun</div>
              <div className="delta orange">+203 bulan ini</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.ConceptA = ConceptA;
