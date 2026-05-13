// Senarai Filem — searchable, filterable film registry

function SenaraiFilemPage() {
  const films = window.iLPFData.films;
  const [query, setQuery] = React.useState("");
  const [cls, setCls] = React.useState(null);
  const [jenis, setJenis] = React.useState(null);
  const [sort, setSort] = React.useState("Terbaru");

  const filtered = React.useMemo(() => {
    let f = films.filter(film => {
      if (cls && film.cls !== cls) return false;
      if (jenis && film.jenis !== jenis) return false;
      if (query) {
        const q = query.toLowerCase();
        return film.t.toLowerCase().includes(q) || film.pengedar.toLowerCase().includes(q) || film.cert.toLowerCase().includes(q);
      }
      return true;
    });
    return f;
  }, [query, cls, jenis, sort]);

  const jenisOpts = ["Pawagam", "Tayangan TV", "Bahan Publisiti", "Iklan", "Pita & DVD"];

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb">
            <a href="index.html">Utama</a>
            <span className="sep">/</span>
            <span className="cur">Senarai Filem</span>
          </div>
          <div className="page-head-row">
            <div>
              <h1>Senarai Filem<span className="signature-dot"></span></h1>
              <p className="lede">Senarai filem yang telah ditapis dan diluluskan oleh Lembaga Penapisan Filem.</p>
            </div>
            <div style={{display:"flex", gap: 24, alignItems: "center"}}>
              <div>
                <div style={{font:"700 32px/1 var(--font-sans)", color:"var(--pine)", letterSpacing:"-0.025em"}}>1,847</div>
                <div style={{font:"500 12px/1 var(--font-sans)", color:"var(--gray-500)", letterSpacing:"0.1em", textTransform:"uppercase", marginTop:6}}>Direkodkan 2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{paddingBottom: 64}}>
        <div className="container" style={{display:"flex", flexDirection:"column", gap: 20}}>
          <div className="filter-bar">
            <div className="filter-row">
              <div className="search-input">
                <i data-lucide="search"></i>
                <input
                  type="text"
                  placeholder="Cari tajuk filem, pengedar, atau nombor sijil…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <select className="filter-chip" style={{padding: "10px 14px"}} value={sort} onChange={(e)=>setSort(e.target.value)}>
                <option>Terbaru</option>
                <option>Tertua</option>
                <option>Tajuk A–Z</option>
                <option>Tajuk Z–A</option>
              </select>
            </div>
            <div className="filter-row">
              <div className="chip-group">
                <span className="group-label">Klasifikasi</span>
                {["u","p12","13","16","18"].map(c => (
                  <button key={c} className={"filter-chip " + (cls === c ? "active" : "")} onClick={() => setCls(cls === c ? null : c)}>
                    <span className={"cls cls-" + c} style={{width: 22, height: 22, fontSize: 10, borderRadius: 5}}>{c === "p12" ? "P12" : c.toUpperCase()}</span>
                    {c === "u" ? "Umum" : c === "p12" ? "P12" : c}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-row">
              <div className="chip-group">
                <span className="group-label">Jenis</span>
                {jenisOpts.map(j => (
                  <button key={j} className={"filter-chip " + (jenis === j ? "active" : "")} onClick={() => setJenis(jenis === j ? null : j)}>
                    {j}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{font:"400 13px/1 var(--font-sans)", color:"var(--gray-600)"}}>
            Menunjukkan <b style={{color:"var(--pine)"}}>{filtered.length}</b> daripada {films.length} filem
          </div>

          <div className="film-table">
            <table>
              <thead>
                <tr>
                  <th>Tajuk Filem</th>
                  <th style={{width: 90}}>Klasifikasi</th>
                  <th style={{width: 150}}>Jenis</th>
                  <th>Pengedar</th>
                  <th style={{width: 130}}>Tarikh</th>
                  <th style={{width: 180}}>Sijil</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((f, i) => (
                  <tr key={i} className="film-row">
                    <td className="t-title">{f.t}</td>
                    <td><span className={"cls cls-" + f.cls}>{f.cls === "p12" ? "P12" : f.cls.toUpperCase()}</span></td>
                    <td>{f.jenis}</td>
                    <td>{f.pengedar}</td>
                    <td className="t-date">{f.date}</td>
                    <td className="t-cert">{f.cert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <div className="pg-info">Halaman 1 daripada 92 · 20 setiap halaman</div>
            <div className="pg-controls">
              <button className="pg-btn"><i data-lucide="chevron-left"></i></button>
              <button className="pg-btn active">1</button>
              <button className="pg-btn">2</button>
              <button className="pg-btn">3</button>
              <span style={{color:"var(--gray-400)", padding:"0 6px"}}>…</span>
              <button className="pg-btn">92</button>
              <button className="pg-btn"><i data-lucide="chevron-right"></i></button>
            </div>
          </div>

          <p style={{font:"400 13px/1.5 var(--font-sans)", color:"var(--gray-500)", textAlign:"center"}}>
            Data dikemas kini setiap hari pada pukul 6 petang.
            Senarai meliputi filem yang ditapis sejak Januari 2024.
          </p>
        </div>
      </section>
    </>
  );
}

window.SenaraiFilemPage = SenaraiFilemPage;
