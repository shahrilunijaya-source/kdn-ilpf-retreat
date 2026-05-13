// CONCEPT B — Frame System
// Editorial / typographic. Aspect-ratio frame brackets, mono ticker,
// hairline rules. Regulator-as-magazine. JPPH-done-right, refined.

function ConceptB() {
  return (
    <div className="concept-b">
      <UtilBar />
      <SiteHeader />

      <section className="cb-hero">
        <div className="cb-frame-brackets"></div>
        <div className="container">
          <div className="cb-meta-line">
            <span className="cb-aspect-marker"><span className="sq"></span> 2.35 : 1</span>
            <span>Akta 620</span>
            <span className="sep"></span>
            <span>Sejak 1954</span>
            <span className="sep"></span>
            <span className="accent">v2 · 2026</span>
          </div>
          <div className="cb-hero-grid">
            <div>
              <h1>
                <span className="row">Tapisan</span>
                <span className="row indent"><em>filem</em></span>
                <span className="row">Malaysia<span className="signature-dot"></span></span>
              </h1>
              <p className="lede">
                Platform rasmi untuk semakan, klasifikasi, dan pensijilan filem di Malaysia.
                Telus. Pantas. Adil.
              </p>
              <div className="cb-hero-actions">
                <a href="#" className="btn btn-pine btn-lg">Hantar Permohonan <i data-lucide="arrow-right"></i></a>
                <a href="#" className="btn btn-ghost btn-lg">Semak Senarai Filem <i data-lucide="arrow-up-right"></i></a>
              </div>
            </div>

            <aside className="cb-ticker">
              <div className="cb-ticker-head">
                <span className="label">Aktiviti Live</span>
                <span className="live">Live</span>
              </div>
              <div className="cb-ticker-rows">
                <div className="cb-ticker-row">
                  <span className="t">02 min</span>
                  <span className="desc"><b>Permohonan diluluskan</b> · Tayangan Panggung</span>
                  <span className="tag appr">P13</span>
                </div>
                <div className="cb-ticker-row">
                  <span className="t">05 min</span>
                  <span className="desc"><b>Permohonan dihantar</b> · Bahan Publisiti</span>
                  <span className="tag subm">Baharu</span>
                </div>
                <div className="cb-ticker-row">
                  <span className="t">08 min</span>
                  <span className="desc"><b>Panel ALPF</b> memulakan sesi · 3 ahli</span>
                  <span className="tag subm">Sesi</span>
                </div>
                <div className="cb-ticker-row">
                  <span className="t">18 min</span>
                  <span className="desc"><b>Sijil A dikeluarkan</b> · A2026/05/1247</span>
                  <span className="tag appr">Selesai</span>
                </div>
                <div className="cb-ticker-row">
                  <span className="t">24 min</span>
                  <span className="desc"><b>Permohonan dihantar</b> · Iklan komersial</span>
                  <span className="tag subm">Baharu</span>
                </div>
                <div className="cb-ticker-row">
                  <span className="t">31 min</span>
                  <span className="desc"><b>Permohonan diluluskan</b> · Pita & DVD</span>
                  <span className="tag appr">16</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="cb-strip">
        <div className="container">
          <div className="cb-strip-cell">
            <div className="n">47<span className="signature-dot"></span></div>
            <div className="l">Permohonan hari ini</div>
            <div className="delta">+12% vs semalam</div>
          </div>
          <div className="cb-strip-cell">
            <div className="n">18</div>
            <div className="l">Sedang disemak ALPF</div>
            <div className="delta">~22 min anggaran</div>
          </div>
          <div className="cb-strip-cell">
            <div className="n">312</div>
            <div className="l">Diluluskan minggu ini</div>
            <div className="delta">96% mencapai SLA</div>
          </div>
          <div className="cb-strip-cell">
            <div className="n">1,847</div>
            <div className="l">Disenaraikan 2026</div>
            <div className="delta">+203 bulan ini</div>
          </div>
        </div>
      </section>

      <section className="cb-services">
        <div className="container">
          <div className="cb-services-head">
            <div>
              <span className="eyebrow">Perkhidmatan Pantas<span className="dot"></span></span>
              <h2>Apa yang anda perlukan?</h2>
            </div>
            <p className="lede">
              Lapan perkhidmatan utama — dari menyemak filem yang telah ditapis,
              menganggar yuran, hingga memohon menjadi Ahli Lembaga.
            </p>
          </div>
          <div className="cb-services-grid">
            <Svc num="01" icon="search" t="Semak Senarai Filem" p="Cari filem yang telah diluluskan dan klasifikasinya." />
            <Svc num="02" icon="calculator" t="Kalkulator Yuran" p="Anggaran yuran tapisan mengikut tempoh tayangan." />
            <Svc num="03" icon="shield-check" t="Klasifikasi Filem" p="Maksud U, P12, 13, 16, dan 18." />
            <Svc num="04" icon="scroll-text" t="Piagam Pelanggan" p="Komitmen kami pada anda, disukat dalam hari." />
            <Svc num="05" icon="bar-chart-3" t="Statistik Tapisan" p="Data permohonan dan keputusan secara terbuka." />
            <Svc num="06" icon="user-plus" t="Daftar Akaun Pengedar" p="Untuk pengedar filem dan stesen TV." />
            <Svc num="07" icon="gavel" t="Permohonan Ahli Lembaga" p="Mohon menjadi ALPF di bawah Akta 620." />
            <Svc num="08" icon="help-circle" t="Soalan Lazim" p="Jawapan ringkas, terus pada isunya." />
          </div>
        </div>
      </section>
    </div>
  );
}

function Svc({ num, icon, t, p }) {
  return (
    <article className="cb-svc">
      <span className="num">{num} / 08</span>
      <span className="ico-wrap"><i data-lucide={icon}></i></span>
      <h4>{t}</h4>
      <p>{p}</p>
      <span className="open">Buka <i data-lucide="arrow-up-right"></i></span>
    </article>
  );
}

window.ConceptB = ConceptB;
