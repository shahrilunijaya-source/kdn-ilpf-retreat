// Piagam Pelanggan — service charter

function PiagamPage() {
  const piagam = window.iLPFData.piagam;
  return (
    <>
      <section className="page-head">
        <div className="container-narrow">
          <div className="breadcrumb">
            <a href="index.html">Utama</a>
            <span className="sep">/</span>
            <a href="senarai-filem.html">Perkhidmatan</a>
            <span className="sep">/</span>
            <span className="cur">Piagam Pelanggan</span>
          </div>
          <h1>Piagam Pelanggan<span className="signature-dot"></span></h1>
          <p className="lede">Komitmen kami pada anda, disukat dalam hari.</p>
        </div>
      </section>

      <section style={{paddingBottom: 48}}>
        <div className="container-narrow">
          <div className="callout-orange">
            <span className="eyebrow" style={{color:"var(--orange-600)"}}>Baharu Tahun 2026<span className="e-dot orange"></span></span>
            <h3>Empat daripada lima perkhidmatan kini lebih pantas.</h3>
            <p>
              Susulan pengstrukturan semula proses dalaman, kami telah memendekkan
              tempoh pemprosesan untuk perkhidmatan utama tanpa menjejaskan ketelitian tapisan.
            </p>
          </div>
        </div>
      </section>

      <section style={{paddingTop: 0, paddingBottom: 64}}>
        <div className="container-narrow">
          <h2 style={{font:"700 32px/1.1 var(--font-sans)", letterSpacing:"-0.025em", color:"var(--pine)", marginBottom: 24}}>
            Komitmen kami
          </h2>
          <div className="piagam-table">
            {piagam.map((p, i) => (
              <div key={i} className="piagam-row-lg">
                <div className="dur">{p.dur}<span className="u">hari bekerja</span></div>
                <div className="info">
                  <h4>{p.svc}</h4>
                  <p>Dahulu: <s style={{color:"var(--gray-400)"}}>{p.was}</s> · Dikira dari tarikh permohonan lengkap diterima.</p>
                </div>
                <span className={"delta " + p.state}>{p.state === "down" ? "▼ Dipendekkan " : "✓ "}{p.pct}</span>
              </div>
            ))}
          </div>

          <div className="divider"></div>

          <h2 style={{font:"700 32px/1.1 var(--font-sans)", letterSpacing:"-0.025em", color:"var(--pine)", marginBottom: 16}}>
            Syarat
          </h2>
          <ol style={{margin:0, padding:"0 0 0 20px", display:"flex", flexDirection:"column", gap: 12, color:"var(--gray-700)", font:"400 15px/1.6 var(--font-sans)"}}>
            <li>Tempoh dikira dari <b style={{color:"var(--pine)"}}>tarikh permohonan lengkap diterima</b>, bukan tarikh hantaran.</li>
            <li>Permohonan yang tidak lengkap (dokumen kurang, salinan rendah, yuran belum dijelaskan) tidak akan diproses.</li>
            <li>Tempoh dikira dalam <b style={{color:"var(--pine)"}}>hari bekerja sahaja</b> — tidak termasuk hujung minggu dan cuti umum.</li>
            <li>Permohonan kompleks (filem yang memerlukan rayuan dalaman atau rujukan kepada panel khas) mungkin mengambil masa lebih lama. Anda akan dimaklumkan secara bertulis.</li>
            <li>Tempoh tidak terpakai semasa tempoh penyelenggaraan sistem yang diumumkan atau gangguan luar jangka.</li>
          </ol>

          <div className="divider"></div>

          <h2 style={{font:"700 32px/1.1 var(--font-sans)", letterSpacing:"-0.025em", color:"var(--pine)", marginBottom: 24}}>
            Pencapaian kami
          </h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="lbl">Mencapai Piagam</div>
              <div className="num">96.4%</div>
              <div className="sub">permohonan Q1 2026</div>
            </div>
            <div className="stat-card">
              <div className="lbl">Purata sebenar</div>
              <div className="num">4.2<span style={{fontSize:18,fontWeight:500,color:"var(--gray-500)",letterSpacing:0,marginLeft:6}}>hari</span></div>
              <div className="sub">masa pemprosesan</div>
            </div>
            <div className="stat-card">
              <div className="lbl">Disenaraikan 2026</div>
              <div className="num">1,847</div>
              <div className="sub">filem tahun ini</div>
            </div>
            <div className="stat-card">
              <div className="lbl">Pengedar berpuas hati</div>
              <div className="num">99.1%</div>
              <div className="sub">kaji selidik Mac 2026</div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="callout-pine">
            <div className="inner">
              <span className="eyebrow on-pine">Jika kami gagal<span className="e-dot orange"></span></span>
              <h3>Setiap aduan disiasat dan dibalas dalam 7 hari bekerja.</h3>
              <p>
                Jika permohonan anda tidak diproses dalam tempoh Piagam tanpa sebab
                yang sah, sila maklumkan kami melalui borang Maklum Balas.
              </p>
              <div style={{marginTop: 24}}>
                <a href="hubungi.html" className="btn btn-teal">Hantar Maklum Balas <i data-lucide="arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.PiagamPage = PiagamPage;
