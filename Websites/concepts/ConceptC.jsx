// CONCEPT C — Pine Stage
// Dark hero on Deep Pine with teal glow + grain. Live regulator dashboard
// preview floats inside the hero. Premium SaaS / Linear-product-page vibe.

function ConceptC() {
  return (
    <div className="concept-c">
      <UtilBar />
      <SiteHeader />

      <section className="cc-hero">
        <div className="container">
          <div className="cc-hero-grid">
            <div>
              <span className="eyebrow on-pine">Pejabat Penapisan Filem · v2 dilancarkan<span className="dot orange"></span></span>
              <h1>
                Dibina untuk<br/>
                membuat <span className="accent">keputusan<span className="signature-dot"></span></span>
              </h1>
              <p className="lede">
                Platform rasmi Lembaga Penapisan Filem Malaysia. Tapisan, klasifikasi,
                dan pensijilan filem — semuanya dalam satu ruang kerja digital.
              </p>
              <div className="cc-hero-actions">
                <a href="#" className="btn btn-teal btn-lg">Hantar Permohonan <i data-lucide="arrow-right"></i></a>
                <a href="#" className="btn btn-ghost-light btn-lg">Tonton Demo <i data-lucide="play"></i></a>
              </div>
              <div className="cc-hero-trust">
                <span className="t-item"><i data-lucide="shield-check"></i> Akta 620</span>
                <span className="t-item"><i data-lucide="zap"></i> SLA 5 hari</span>
                <span className="t-item"><i data-lucide="lock"></i> Disahkan KDN</span>
              </div>
            </div>

            <div className="cc-dash">
              <div className="card">
                <div className="card-hd">
                  <span className="ttl">Permohonan Aktif</span>
                  <span className="pulse">Live</span>
                </div>
                <div className="row">
                  <div className="info">
                    <div className="poster"></div>
                    <div>
                      <div className="t-title">Sheriff: Narko-Integriti 2</div>
                      <div className="t-meta">A2026/04/0892</div>
                    </div>
                  </div>
                  <span className="chip r18">18</span>
                </div>
                <div className="row">
                  <div className="info">
                    <div className="poster"></div>
                    <div>
                      <div className="t-title">Dune: Part Three</div>
                      <div className="t-meta">A2026/04/0871</div>
                    </div>
                  </div>
                  <span className="chip p13">P13</span>
                </div>
                <div className="row">
                  <div className="info">
                    <div className="poster"></div>
                    <div>
                      <div className="t-title">Upin & Ipin: Lagenda Pulau</div>
                      <div className="t-meta">A2026/03/0661</div>
                    </div>
                  </div>
                  <span className="chip u">U</span>
                </div>
                <div className="row">
                  <div className="info">
                    <div className="poster"></div>
                    <div>
                      <div className="t-title">Polis Evo 4 · trailer 90s</div>
                      <div className="t-meta">BP2026/03/0728</div>
                    </div>
                  </div>
                  <span className="status">Disemak</span>
                </div>
              </div>

              <div className="cc-stats-row">
                <div className="cc-stat-mini">
                  <div className="lbl">Hari ini</div>
                  <div className="num">47</div>
                  <div className="sub">permohonan dalam talian</div>
                </div>
                <div className="cc-stat-mini">
                  <div className="lbl">Memerlukan tindakan</div>
                  <div className="num orange">3</div>
                  <div className="sub">menjelang tarikh akhir</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cc-services">
        <div className="container">
          <div className="cc-services-head">
            <div>
              <span className="eyebrow">Perkhidmatan Pantas<span className="dot"></span></span>
              <h2>Apa yang anda perlukan?</h2>
            </div>
            <a href="#" className="ar">Semua perkhidmatan <i data-lucide="arrow-right" style={{width:14,height:14}}></i></a>
          </div>
          <div className="cc-services-grid">
            <SvcC icon="search" t="Semak Senarai Filem" p="Cari filem yang telah diluluskan dan klasifikasinya." />
            <SvcC icon="calculator" t="Kalkulator Yuran" p="Anggaran yuran tapisan mengikut tempoh tayangan." />
            <SvcC icon="shield-check" t="Klasifikasi Filem" p="Maksud U, P12, 13, 16, dan 18." />
            <SvcC icon="scroll-text" t="Piagam Pelanggan" p="Komitmen kami pada anda, disukat dalam hari." />
          </div>
        </div>
      </section>
    </div>
  );
}

function SvcC({ icon, t, p }) {
  return (
    <article className="cc-svc">
      <span className="ico-wrap"><i data-lucide={icon}></i></span>
      <h4>{t}</h4>
      <p>{p}</p>
      <span className="arrow">Buka <i data-lucide="arrow-right"></i></span>
    </article>
  );
}

window.ConceptC = ConceptC;
