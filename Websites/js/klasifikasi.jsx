// Klasifikasi Filem — visual explainer

function KlasifikasiPage() {
  const cls = window.iLPFData.classifications;
  return (
    <>
      <section className="page-head">
        <div className="container-narrow">
          <div className="breadcrumb">
            <a href="index.html">Utama</a>
            <span className="sep">/</span>
            <a href="senarai-filem.html">Perkhidmatan</a>
            <span className="sep">/</span>
            <span className="cur">Klasifikasi Filem</span>
          </div>
          <h1>Lima keputusan<span className="signature-dot"></span></h1>
          <p className="lede">
            Setiap filem yang ditapis akan diberi salah satu daripada lima klasifikasi
            berikut. Klasifikasi memberi panduan kepada penonton dan ibu bapa tentang
            kesesuaian filem mengikut umur.
          </p>
        </div>
      </section>

      <section style={{paddingBottom: 64}}>
        <div className="container-narrow" style={{display:"flex", flexDirection:"column", gap: 16}}>
          {cls.map(c => (
            <article key={c.id} id={c.id} className="cls-detail">
              <div>
                <span className={"cls cls-xl cls-" + c.id}>{c.id === "p12" ? "P12" : c.id.toUpperCase()}</span>
              </div>
              <div className="meta">
                <span className="eyebrow">Klasifikasi<span className="e-dot"></span></span>
                <h2>{c.t}</h2>
                <p className="desc">{c.age}. {c.desc}</p>
                <h5>Apa yang anda akan jangkakan</h5>
                <ul>
                  {c.points.map((p,i) => <li key={i}>{p}</li>)}
                </ul>
                <h5>Contoh filem</h5>
                <div className="examples">
                  {c.examples.map((e,i) => <a key={i} href="senarai-filem.html">{e}</a>)}
                </div>
              </div>
            </article>
          ))}

          <div className="callout-pine" style={{marginTop: 32}}>
            <div className="inner">
              <span className="eyebrow on-pine">Cara kami membuat keputusan<span className="e-dot"></span></span>
              <h3>Setiap filem dinilai oleh panel tiga Ahli Lembaga.</h3>
              <p>
                ALPF menilai mengikut Garis Panduan Penapisan Filem 2026 berdasarkan
                keseluruhan kandungan — bukan satu adegan terpencil.
              </p>
              <div style={{marginTop: 24, display:"flex", gap: 12}}>
                <a href="#" className="btn btn-teal">Baca Garis Panduan penuh <i data-lucide="arrow-right"></i></a>
                <a href="#" className="btn btn-ghost-light">Proses rayuan</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.KlasifikasiPage = KlasifikasiPage;
