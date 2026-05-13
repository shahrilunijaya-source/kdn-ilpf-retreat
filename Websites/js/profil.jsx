// Profil hub — Maklumat Korporat
// Includes hub + key sub-page content stitched together on one page for now,
// scrollable with anchor jumps from the nav.

function ProfilPage() {
  const cards = [
    { i: "user", t: "Mesej Pengarah PPF", p: "Perutusan dan pandangan strategik daripada Pengarah Pejabat Penapisan Filem.", h: "#mesej" },
    { i: "history", t: "Latar Belakang", p: "Sejarah LPF sejak 1954 hingga kini. Lebih 70 tahun pengalaman dalam tapisan filem Malaysia.", h: "#latar" },
    { i: "target", t: "Misi, Visi & Objektif", p: "Apa yang kami perjuangkan, ke mana kami menuju, dan bagaimana kami menyukatnya.", h: "#visi" },
    { i: "gavel", t: "Peranan PPF", p: "Fungsi, kuasa, dan tanggungjawab di bawah Akta Penapisan Filem 2002.", h: "#peranan" },
    { i: "git-branch", t: "Carta Organisasi ALPF", p: "Struktur Ahli Lembaga Penapisan Filem dan Urus Setia.", h: "#carta" },
    { i: "award", t: "Pengerusi", p: "Latar belakang dan kerjaya Pengerusi Lembaga Penapisan Filem.", h: "#pengerusi" },
  ];

  const timeline = [
    { y: "1908", t: "Tapisan filem mula dilaksanakan", b: "Sebelum penubuhan LPF, tugas tapisan dilakukan oleh pihak Polis di bawah Ordinan Teater 1908." },
    { y: "1924", t: "Ordinan Filem Sinematograf",      b: "Undang-undang pertama khusus untuk kawalan dan tapisan filem, digubal untuk Negeri-Negeri Selat." },
    { y: "1952", t: "Ordinan Filem Sinematograf 1952", b: "Undang-undang seluruh Tanah Melayu. Tapisan dibuat oleh seorang pegawai yang bertanggungjawab kepada Ketua Polis." },
    { y: "1954", t: "Penubuhan Lembaga Penapis Filem", b: "Dua jawatankuasa diwujudkan — di Singapura untuk Negeri Selat, dan di Kuala Lumpur untuk Tanah Melayu." },
    { y: "1966", t: "Ibu pejabat berpindah ke Kuala Lumpur", b: "LPF Malaysia berpusat di KL. Akta Filem Sinematograf 1952 (Pindaan 1966) berkuat kuasa." },
    { y: "2002", t: "Akta Penapisan Filem (Akta 620)", b: "Akta moden yang berkuat kuasa sehingga hari ini. Memperkenalkan sistem panel tiga ALPF dan klasifikasi rasmi." },
    { y: "2010", t: "Klasifikasi U, P13, 18 diperkenalkan", b: "Sistem klasifikasi formal menggantikan kelulusan binari." },
    { y: "2020", t: "Klasifikasi P12, 13, 16, 18 disemak", b: "Klasifikasi diperinci untuk mengukur kesesuaian umur dengan lebih tepat." },
    { y: "2024", t: "iLPF dilancarkan", b: "Sistem dalam talian pertama untuk penghantaran permohonan tapisan filem." },
    { y: "2026", t: "iLPF v2", b: "Revolusi penuh — antara muka baharu, aliran kerja digital, dan Piagam Pelanggan dipendekkan separuh." },
  ];

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb">
            <a href="index.html">Utama</a>
            <span className="sep">/</span>
            <span className="cur">Maklumat Korporat</span>
          </div>
          <h1>Maklumat Korporat<span className="signature-dot"></span></h1>
          <p className="lede">Sejarah, peranan, dan kepimpinan Pejabat Penapisan Filem Malaysia.</p>
        </div>
      </section>

      <section style={{paddingBottom: 64}}>
        <div className="container">
          <div className="profile-grid">
            {cards.map((c, i) => (
              <a key={i} href={c.h} className="profile-card">
                <span className="ico"><i data-lucide={c.i}></i></span>
                <h4>{c.t}</h4>
                <p>{c.p}</p>
                <span className="arrow">Lihat <i data-lucide="arrow-right"></i></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Mesej Pengarah */}
      <section id="mesej" style={{padding: "48px 0 96px", background: "#fff", borderTop: "1px solid var(--gray-200)"}}>
        <div className="container">
          <div style={{display:"grid", gridTemplateColumns:"360px 1fr", gap: 64, alignItems: "start"}}>
            <div>
              <img src="assets/enBurhan.png" alt="En Burhan Bin Mat Sum — Pengarah PPF" style={{width:"100%", aspectRatio:"4/5", borderRadius:20, objectFit:"cover", objectPosition:"top", display:"block"}} />
              <div style={{marginTop: 20}}>
                <span className="eyebrow">Pengarah PPF<span className="e-dot"></span></span>
                <h3 style={{font:"700 22px/1.2 var(--font-sans)", color:"var(--pine)", margin:"10px 0 4px", letterSpacing:"-0.02em"}}>En Burhan Bin Mat Sum</h3>
                <p style={{font:"500 14px/1.4 var(--font-sans)", color:"var(--gray-600)", margin:0}}>Pengarah, Pejabat Penapisan Filem Malaysia</p>
                <span className="badge badge-teal" style={{marginTop: 12}}>Dilantik [tarikh pelantikan]</span>
              </div>
            </div>

            <div>
              <span className="eyebrow">Mesej Pengarah<span className="e-dot"></span></span>
              <h2 style={{font:"700 44px/1.05 var(--font-sans)", letterSpacing:"-0.03em", color:"var(--pine)", margin:"12px 0 28px"}}>
                Tapisan yang adil.<br/>Tapisan yang telus<span className="signature-dot"></span>
              </h2>
              <div style={{font:"400 16px/1.7 var(--font-sans)", color:"var(--gray-700)", display:"flex", flexDirection:"column", gap: 18, maxWidth: 680}}>
                <p>Assalamualaikum dan salam sejahtera.</p>
                <p>Pejabat Penapisan Filem telah berkhidmat kepada rakyat Malaysia sejak 1954. Tugas kami mudah dinyatakan, tetapi memerlukan ketelitian: memastikan setiap filem yang ditayangkan di negara ini sesuai dengan masyarakat, undang-undang, dan nilai sejagat.</p>
                <p>Dengan iLPF v2, kami memperbaharui janji itu untuk era digital.</p>
                <p>Pengedar filem kini boleh menghantar permohonan dalam talian sepenuhnya. Ahli Lembaga Penapisan Filem bekerja dalam ruang digital yang teratur. Pegawai PPF dapat menjejaki setiap permohonan dari hantaran sehingga sijil dikeluarkan. Dan rakyat Malaysia dapat menyemak status filem secara terbuka.</p>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap: 20, padding:"24px 0", borderTop:"1px solid var(--gray-200)", borderBottom:"1px solid var(--gray-200)", margin: "8px 0"}}>
                  <div>
                    <div style={{font:"700 24px/1.2 var(--font-sans)", color:"var(--teal-700)", letterSpacing:"-0.02em"}}>Jelas<span className="signature-dot"></span></div>
                    <div style={{font:"400 14px/1.5 var(--font-sans)", color:"var(--gray-600)", marginTop:6}}>Setiap keputusan boleh dijelaskan. Tiada birokrasi tersembunyi.</div>
                  </div>
                  <div>
                    <div style={{font:"700 24px/1.2 var(--font-sans)", color:"var(--teal-700)", letterSpacing:"-0.02em"}}>Pantas<span className="signature-dot"></span></div>
                    <div style={{font:"400 14px/1.5 var(--font-sans)", color:"var(--gray-600)", marginTop:6}}>Piagam Pelanggan kami dipendekkan separuh untuk dua perkhidmatan utama.</div>
                  </div>
                  <div>
                    <div style={{font:"700 24px/1.2 var(--font-sans)", color:"var(--teal-700)", letterSpacing:"-0.02em"}}>Adil<span className="signature-dot"></span></div>
                    <div style={{font:"400 14px/1.5 var(--font-sans)", color:"var(--gray-600)", marginTop:6}}>Setiap filem dinilai mengikut Garis Panduan, tanpa pilih kasih.</div>
                  </div>
                </div>
                <p>Selamat menggunakan iLPF v2. Terima kasih atas kepercayaan anda.</p>
                <p style={{margin:"20px 0 0"}}>
                  <b style={{color:"var(--pine)"}}>— En Burhan Bin Mat Sum</b><br/>
                  <span style={{font:"400 14px/1.4 var(--font-sans)", color:"var(--gray-500)"}}>Pengarah, Pejabat Penapisan Filem Malaysia</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latar Belakang — Timeline */}
      <section id="latar" style={{padding: "96px 0", background: "var(--paper)"}}>
        <div className="container-narrow">
          <span className="eyebrow">Latar Belakang<span className="e-dot"></span></span>
          <h2 style={{font:"700 44px/1.05 var(--font-sans)", letterSpacing:"-0.03em", color:"var(--pine)", margin:"12px 0 8px"}}>Tujuh dekad tapisan filem<span className="signature-dot"></span></h2>
          <p style={{font:"400 17px/1.6 var(--font-sans)", color:"var(--gray-600)", margin:"0 0 48px", maxWidth: 600}}>
            Daripada Ordinan Teater 1908 hinggalah iLPF v2 — sejarah penapisan filem Malaysia, dalam satu garis masa.
          </p>

          <div style={{position:"relative", paddingLeft: 32, borderLeft: "2px solid var(--gray-200)", display:"flex", flexDirection:"column", gap: 28}}>
            {timeline.map((t, i) => (
              <div key={i} style={{position:"relative"}}>
                <span style={{position:"absolute", left: -41, top: 4, width: 18, height: 18, borderRadius: 999, background:"#fff", border:"2px solid var(--teal)"}}></span>
                <div style={{font:"700 24px/1 var(--font-mono)", color:"var(--teal-700)", letterSpacing:"-0.01em"}}>{t.y}</div>
                <h4 style={{font:"600 19px/1.3 var(--font-sans)", color:"var(--pine)", margin:"6px 0 6px", letterSpacing:"-0.01em"}}>{t.t}</h4>
                <p style={{font:"400 14.5px/1.6 var(--font-sans)", color:"var(--gray-600)", margin:0, maxWidth: 720}}>{t.b}</p>
              </div>
            ))}
          </div>

          <p style={{font:"400 12.5px/1.5 var(--font-sans)", color:"var(--gray-500)", marginTop: 48}}>
            Sumber: Akta Penapisan Filem 2002, Arkib KDN.
          </p>
        </div>
      </section>

      {/* Misi Visi Objektif */}
      <section id="visi" style={{padding: "96px 0", background: "#fff"}}>
        <div className="container-narrow">
          <span className="eyebrow">Misi, Visi & Objektif<span className="e-dot"></span></span>
          <h2 style={{font:"700 44px/1.05 var(--font-sans)", letterSpacing:"-0.03em", color:"var(--pine)", margin:"12px 0 40px"}}>Apa yang kami perjuangkan.</h2>

          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 16, marginBottom: 16}}>
            <div className="card" style={{padding: 32}}>
              <span className="eyebrow">Visi<span className="e-dot"></span></span>
              <p style={{font:"600 22px/1.4 var(--font-sans)", color:"var(--pine)", letterSpacing:"-0.015em", margin:"16px 0 0"}}>
                Tapisan filem Malaysia yang paling jelas, paling adil, dan paling pantas di rantau ini.
              </p>
            </div>
            <div className="card" style={{padding: 32}}>
              <span className="eyebrow">Misi<span className="e-dot"></span></span>
              <p style={{font:"600 20px/1.45 var(--font-sans)", color:"var(--pine)", letterSpacing:"-0.015em", margin:"16px 0 0"}}>
                Memastikan setiap filem yang ditayangkan menepati Akta Penapisan Filem 2002, Garis Panduan, dan nilai sejagat — tanpa menghalang kreativiti yang sah.
              </p>
            </div>
          </div>

          <div className="card" style={{padding: 32}}>
            <span className="eyebrow">Objektif<span className="e-dot"></span></span>
            <ol style={{marginTop: 16, padding:"0 0 0 24px", display:"flex", flexDirection:"column", gap: 14, color:"var(--gray-700)", font:"400 16px/1.55 var(--font-sans)"}}>
              <li><b style={{color:"var(--pine)"}}>Tapisan tepat pada masa.</b> Memenuhi Piagam Pelanggan dalam setiap permohonan.</li>
              <li><b style={{color:"var(--pine)"}}>Keputusan boleh dijelaskan.</b> Setiap kelulusan, suntingan, atau penolakan disertakan dengan rasional bertulis.</li>
              <li><b style={{color:"var(--pine)"}}>Sistem yang telus.</b> Statistik tapisan diterbitkan secara terbuka.</li>
              <li><b style={{color:"var(--pine)"}}>Industri yang dihormati.</b> Pengedar dan stesen TV dilayan sebagai rakan kongsi, bukan pemohon.</li>
              <li><b style={{color:"var(--pine)"}}>Pegawai yang dilengkapi.</b> ALPF dan PPF bekerja dalam ruang digital yang membantu mereka membuat keputusan yang baik.</li>
            </ol>
          </div>

          <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 12, marginTop: 24}}>
            {[
              { t: "Telus", d: "Tiada keputusan tersembunyi." },
              { t: "Pantas", d: "Setiap hari penting." },
              { t: "Adil", d: "Sama undang-undang untuk semua." },
              { t: "Profesional", d: "Hormat, ketepatan, integriti." },
            ].map((v, i) => (
              <div key={i} className="card" style={{padding: 20}}>
                <div style={{font:"700 18px/1.2 var(--font-sans)", color:"var(--pine)", letterSpacing:"-0.015em"}}>{v.t}<span className="signature-dot"></span></div>
                <div style={{font:"400 13px/1.5 var(--font-sans)", color:"var(--gray-600)", marginTop: 6}}>{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pengerusi */}
      <section id="pengerusi" style={{padding: "48px 0 96px", background: "#fff", borderTop: "1px solid var(--gray-200)"}}>
        <div className="container">
          <div style={{display:"grid", gridTemplateColumns:"360px 1fr", gap: 64, alignItems: "start"}}>
            <div>
              <img src="assets/HjKhir.png" alt="Tuan Haji Mohammad Khir bin Mat Lazim — Pengerusi LPF" style={{width:"100%", aspectRatio:"4/5", borderRadius:20, objectFit:"contain", objectPosition:"center", display:"block", background:"var(--gray-50)"}} />
              <div style={{marginTop: 20}}>
                <span className="eyebrow">Pengerusi LPF<span className="e-dot"></span></span>
                <h3 style={{font:"700 22px/1.2 var(--font-sans)", color:"var(--pine)", margin:"10px 0 4px", letterSpacing:"-0.02em"}}>Tuan Haji Mohammad Khir bin Mat Lazim</h3>
                <p style={{font:"500 14px/1.4 var(--font-sans)", color:"var(--gray-600)", margin:0}}>Pengerusi, Lembaga Penapisan Filem</p>
              </div>
            </div>

            <div>
              <span className="eyebrow">Profil Pengerusi<span className="e-dot"></span></span>
              <h2 style={{font:"700 40px/1.05 var(--font-sans)", letterSpacing:"-0.03em", color:"var(--pine)", margin:"12px 0 28px"}}>
                Tuan Haji Mohammad Khir<br/>bin Mat Lazim<span className="signature-dot"></span>
              </h2>
              <div style={{font:"400 16px/1.7 var(--font-sans)", color:"var(--gray-700)", display:"flex", flexDirection:"column", gap: 18, maxWidth: 680}}>
                <p>Tuan Haji Mohamad Khir bin Mat Lazim ialah Pengerusi Lembaga Penapisan Filem (LPF) di bawah Kementerian Dalam Negeri (KDN). Beliau merupakan seorang pegawai kanan perkhidmatan awam Malaysia yang berpengalaman luas dalam pentadbiran kerajaan persekutuan.</p>
                <p>Sebelum dilantik sebagai Pengerusi LPF, beliau pernah menjawat jawatan Timbalan Ketua Pengarah (Pengurusan) di Jabatan Pendaftaran Negara (JPN). Beliau turut pernah berkhidmat sebagai Pengarah, Bahagian Khidmat Pengurusan di Kementerian Perumahan dan Kerajaan Tempatan, serta Timbalan Ketua Pengarah (Sektor Keselamatan dan Kebajikan) di Jabatan Kebajikan Masyarakat.</p>
                <p>Dengan pengalaman mendalam dalam pengurusan perumahan, kerajaan tempatan, dan kebajikan masyarakat, Tuan Haji Mohamad Khir membawa perspektif pentadbiran yang komprehensif dalam memimpin LPF. Beliau aktif dalam sesi wawancara media dan majlis rasmi berkaitan penapisan filem dan media di Malaysia.</p>
                <div style={{marginTop: 8, padding:"20px 24px", background:"var(--gray-50)", borderRadius:12, borderLeft:"3px solid var(--teal)"}}>
                  <div style={{font:"600 13px/1.4 var(--font-sans)", color:"var(--gray-500)", letterSpacing:"0.04em", textTransform:"uppercase", marginBottom: 8}}>Hubungi</div>
                  <a href="mailto:mohamadkhir@moha.gov.my" style={{font:"500 15px/1.4 var(--font-sans)", color:"var(--pine)", textDecoration:"none"}}>mohamadkhir@moha.gov.my</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.ProfilPage = ProfilPage;
