// Daftar Akaun Pengedar — multi-step form
// Shows the full stepper with step 1 active (active state demo).

function DaftarPage() {
  const [step, setStep] = React.useState(0);
  const steps = [
    { t: "Maklumat Syarikat", d: "SSM, alamat, sektor" },
    { t: "Pegawai Dihubungi",  d: "Nama, jawatan, kontak" },
    { t: "Dokumen Sokongan",   d: "Sijil SSM, lesen" },
    { t: "Pengesahan",          d: "Emel & semakan" },
  ];

  return (
    <>
      <section className="page-head">
        <div className="container-narrow">
          <div className="breadcrumb">
            <a href="index.html">Utama</a>
            <span className="sep">/</span>
            <a href="login.html?as=pengedar">Log Masuk Pengedar</a>
            <span className="sep">/</span>
            <span className="cur">Daftar Akaun</span>
          </div>
          <h1>Daftar Akaun Pengedar<span className="signature-dot"></span></h1>
          <p className="lede">
            Empat langkah ringkas. Pengesahan akaun mengambil 1–2 hari bekerja.
            Sediakan dokumen SSM dan maklumat pegawai dihubungi sebelum bermula.
          </p>
        </div>
      </section>

      <section style={{paddingBottom: 64}}>
        <div className="container-narrow" style={{display:"flex", flexDirection:"column", gap: 24}}>
          <div className="stepper">
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div className={"stepper-item " + (i === step ? "active" : i < step ? "done" : "")}>
                  <span className="n">{i < step ? "✓" : i+1}</span>
                  <div>
                    <div className="lbl">{s.t}</div>
                    <div style={{font:"400 11px/1.3 var(--font-sans)", color:"var(--gray-500)", marginTop: 2}}>{s.d}</div>
                  </div>
                </div>
                {i < steps.length - 1 && <span className="arr">→</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="card" style={{padding: 36}}>
            {step === 0 && (
              <div>
                <h3 style={{font:"700 24px/1.2 var(--font-sans)", letterSpacing:"-0.02em", color:"var(--pine)", margin:"0 0 6px"}}>Maklumat Syarikat</h3>
                <p style={{font:"400 14.5px/1.6 var(--font-sans)", color:"var(--gray-600)", margin:"0 0 28px"}}>
                  Maklumat ini akan disahkan dengan rekod Suruhanjaya Syarikat Malaysia (SSM).
                </p>
                <div style={{display:"flex", flexDirection:"column", gap: 16}}>
                  <div className="field-row">
                    <div className="field">
                      <label>Nama Syarikat <span className="req">*</span></label>
                      <input type="text" placeholder="Contoh: ABC Productions Sdn Bhd" />
                    </div>
                    <div className="field">
                      <label>No. Pendaftaran SSM <span className="req">*</span></label>
                      <input type="text" placeholder="202101012345" />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label>Jenis Entiti <span className="req">*</span></label>
                      <select>
                        <option>Sdn Bhd</option>
                        <option>Berhad</option>
                        <option>Perkongsian Liabiliti Terhad (PLT)</option>
                        <option>Perniagaan Tunggal</option>
                        <option>Stesen TV / RTM</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>Sektor Utama <span className="req">*</span></label>
                      <select>
                        <option>Pengeluar / Studio</option>
                        <option>Pengedar filem pawagam</option>
                        <option>Stesen TV</option>
                        <option>Agensi pengiklanan</option>
                        <option>Lain-lain</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Alamat Berdaftar <span className="req">*</span></label>
                    <textarea rows="3" placeholder="Alamat penuh seperti dalam rekod SSM"></textarea>
                  </div>
                  <div className="field-row">
                    <div className="field"><label>Negeri <span className="req">*</span></label><select><option>Selangor</option><option>Kuala Lumpur</option><option>Putrajaya</option><option>Pulau Pinang</option><option>Johor</option><option>Sabah</option><option>Sarawak</option></select></div>
                    <div className="field"><label>Poskod <span className="req">*</span></label><input type="text" placeholder="40000"/></div>
                  </div>
                </div>
              </div>
            )}
            {step === 1 && (
              <div>
                <h3 style={{font:"700 24px/1.2 var(--font-sans)", letterSpacing:"-0.02em", color:"var(--pine)", margin:"0 0 28px"}}>Pegawai Dihubungi</h3>
                <p style={{color:"var(--gray-500)"}}>[Langkah 2 — demo sahaja]</p>
              </div>
            )}

            <div style={{display:"flex", justifyContent:"space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--gray-200)"}}>
              <button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep(Math.max(0, step-1))}>
                <i data-lucide="arrow-left"></i> Kembali
              </button>
              <button className="btn btn-teal" onClick={() => setStep(Math.min(steps.length - 1, step+1))}>
                Seterusnya <i data-lucide="arrow-right"></i>
              </button>
            </div>
          </div>

          <div style={{display:"flex", gap: 10, alignItems:"center", padding: 16, background:"var(--paper)", borderRadius: 12, font:"400 13px/1.5 var(--font-sans)", color:"var(--gray-600)"}}>
            <i data-lucide="lock" style={{color:"var(--teal-700)"}}></i>
            <span>Maklumat anda disulitkan dan diproses mengikut Akta Perlindungan Data Peribadi 2010. Kami tidak berkongsi data dengan pihak ketiga.</span>
          </div>
        </div>
      </section>
    </>
  );
}

function PermohonanALPFPage() {
  const [step, setStep] = React.useState(0);
  const steps = [
    { t: "Maklumat Peribadi", d: "Nama, MyKad, kontak" },
    { t: "Kelayakan",          d: "Pendidikan, kerjaya" },
    { t: "Bidang Kepakaran",   d: "Sektor, pengalaman" },
    { t: "Penyataan & Sokongan", d: "Surat, dokumen" },
    { t: "Pengesahan",          d: "Semakan akhir" },
  ];

  return (
    <>
      <section className="page-head">
        <div className="container-narrow">
          <div className="breadcrumb">
            <a href="index.html">Utama</a>
            <span className="sep">/</span>
            <a href="login.html?as=pegawai">Pegawai & ALPF</a>
            <span className="sep">/</span>
            <span className="cur">Permohonan ALPF Baru</span>
          </div>
          <h1>Permohonan Ahli Lembaga<span className="signature-dot"></span></h1>
          <p className="lede">
            Mohon menjadi Ahli Lembaga Penapisan Filem di bawah seksyen 3 Akta Penapisan Filem 2002.
            Tempoh perkhidmatan 3 tahun, boleh disambung.
          </p>
        </div>
      </section>

      <section style={{paddingBottom: 64}}>
        <div className="container-narrow" style={{display:"flex", flexDirection:"column", gap: 24}}>
          <div className="callout-pine">
            <div className="inner">
              <span className="eyebrow on-pine">Kriteria asas<span className="e-dot"></span></span>
              <h3>Sebelum anda memohon.</h3>
              <ul style={{margin:"16px 0 0", padding:"0 0 0 20px", color:"rgba(255,255,255,0.85)", font:"400 14.5px/1.7 var(--font-sans)"}}>
                <li>Warganegara Malaysia, berumur 30 tahun ke atas.</li>
                <li>Tiada rekod jenayah atau ketidakaktifan profesional.</li>
                <li>Pengalaman sekurang-kurangnya 10 tahun dalam sektor berkaitan: penyiaran, pendidikan, keagamaan, penguatkuasaan, pengurusan, bahasa.</li>
                <li>Bersedia menghadiri sesi tapisan sekurang-kurangnya 2 kali seminggu di Putrajaya atau secara dalam talian.</li>
              </ul>
            </div>
          </div>

          <div className="stepper">
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div className={"stepper-item " + (i === step ? "active" : i < step ? "done" : "")}>
                  <span className="n">{i < step ? "✓" : i+1}</span>
                  <div>
                    <div className="lbl">{s.t}</div>
                    <div style={{font:"400 11px/1.3 var(--font-sans)", color:"var(--gray-500)", marginTop: 2}}>{s.d}</div>
                  </div>
                </div>
                {i < steps.length - 1 && <span className="arr">→</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="card" style={{padding: 36}}>
            {step === 0 && (
              <div>
                <h3 style={{font:"700 24px/1.2 var(--font-sans)", letterSpacing:"-0.02em", color:"var(--pine)", margin:"0 0 6px"}}>Maklumat Peribadi</h3>
                <p style={{font:"400 14.5px/1.6 var(--font-sans)", color:"var(--gray-600)", margin:"0 0 28px"}}>
                  Maklumat ini akan disahkan dengan Jabatan Pendaftaran Negara dan PDRM.
                </p>
                <div style={{display:"flex", flexDirection:"column", gap: 16}}>
                  <div className="field"><label>Nama Penuh (seperti MyKad) <span className="req">*</span></label><input type="text"/></div>
                  <div className="field-row">
                    <div className="field"><label>No. MyKad <span className="req">*</span></label><input type="text" placeholder="700101-10-1234"/></div>
                    <div className="field"><label>Tarikh Lahir <span className="req">*</span></label><input type="date"/></div>
                  </div>
                  <div className="field-row">
                    <div className="field"><label>Jantina <span className="req">*</span></label><select><option>Lelaki</option><option>Perempuan</option></select></div>
                    <div className="field"><label>Bangsa <span className="req">*</span></label><select><option>Melayu</option><option>Cina</option><option>India</option><option>Bumiputera</option><option>Lain-lain</option></select></div>
                  </div>
                  <div className="field-row">
                    <div className="field"><label>Emel <span className="req">*</span></label><input type="email"/></div>
                    <div className="field"><label>No. Telefon <span className="req">*</span></label><input type="tel" placeholder="012-345 6789"/></div>
                  </div>
                  <div className="field"><label>Alamat Surat-Menyurat <span className="req">*</span></label><textarea rows="3"></textarea></div>
                </div>
              </div>
            )}
            {step > 0 && (
              <div>
                <h3 style={{font:"700 24px/1.2 var(--font-sans)", letterSpacing:"-0.02em", color:"var(--pine)", margin:"0 0 28px"}}>{steps[step].t}</h3>
                <p style={{color:"var(--gray-500)"}}>[Langkah {step+1} — demo sahaja]</p>
              </div>
            )}

            <div style={{display:"flex", justifyContent:"space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--gray-200)"}}>
              <button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep(Math.max(0, step-1))}>
                <i data-lucide="arrow-left"></i> Kembali
              </button>
              <button className="btn btn-pine" onClick={() => setStep(Math.min(steps.length-1, step+1))}>
                Seterusnya <i data-lucide="arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.DaftarPage = DaftarPage;
window.PermohonanALPFPage = PermohonanALPFPage;
