// FAQ — categorized, searchable

function FAQPage() {
  const faqs = window.iLPFData.faqs;
  const cats = [
    { id: "all",          t: "Semua" },
    { id: "umum",         t: "Umum" },
    { id: "permohonan",   t: "Permohonan" },
    { id: "yuran",        t: "Yuran" },
    { id: "klasifikasi",  t: "Klasifikasi" },
    { id: "rayuan",       t: "Rayuan" },
    { id: "akaun",        t: "Akaun" },
  ];
  const [cat, setCat] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(0);

  const filtered = faqs.filter(f => {
    if (cat !== "all" && f.c !== cat) return false;
    if (query) {
      const q = query.toLowerCase();
      return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <>
      <section className="page-head">
        <div className="container-narrow">
          <div className="breadcrumb">
            <a href="index.html">Utama</a>
            <span className="sep">/</span>
            <span className="cur">Soalan Lazim</span>
          </div>
          <h1>Soalan Lazim<span className="signature-dot"></span></h1>
          <p className="lede">Jawapan ringkas, terus pada isunya. Cari soalan atau pilih kategori.</p>
        </div>
      </section>

      <section style={{paddingBottom: 64}}>
        <div className="container-narrow">
          <div className="search-input" style={{marginBottom: 24}}>
            <i data-lucide="search"></i>
            <input type="text" placeholder="Cari soalan atau kata kunci…" value={query} onChange={(e)=>setQuery(e.target.value)}/>
          </div>

          <div className="faq-cats">
            {cats.map(c => (
              <button key={c.id} className={"faq-cat " + (cat === c.id ? "active" : "")} onClick={() => { setCat(c.id); setOpen(-1); }}>
                {c.t}
                {c.id !== "all" && <span style={{marginLeft: 6, opacity: 0.6, font:"500 11px var(--font-mono)"}}>
                  {faqs.filter(f => f.c === c.id).length}
                </span>}
              </button>
            ))}
          </div>

          <div className="faq-list">
            {filtered.length === 0 && (
              <div style={{padding: 48, textAlign: "center", color: "var(--gray-500)"}}>
                Tiada soalan dijumpai. Cuba kata kunci lain.
              </div>
            )}
            {filtered.map((f, i) => (
              <div key={i} className={"faq-item " + (open === i ? "open" : "")}>
                <div className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{f.q}</span>
                  <span className="icn"><i data-lucide="plus"></i></span>
                </div>
                <div className="faq-a"><p style={{margin: 0}}>{f.a}</p></div>
              </div>
            ))}
          </div>

          <div className="callout-pine" style={{marginTop: 48}}>
            <div className="inner">
              <span className="eyebrow on-pine">Tiada jawapan?<span className="e-dot orange"></span></span>
              <h3>Hubungi sokongan iLPF terus.</h3>
              <p>Pegawai sokongan tersedia Isnin – Jumaat, 8:30 pagi – 5:00 petang.</p>
              <div style={{marginTop: 24, display:"flex", gap: 12, flexWrap: "wrap"}}>
                <a href="hubungi.html" className="btn btn-teal">Hubungi Kami <i data-lucide="arrow-right"></i></a>
                <a href="tel:0388688400" className="btn btn-ghost-light"><i data-lucide="phone"></i> 03-8868 8400</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.FAQPage = FAQPage;
