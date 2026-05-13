// Hubungi Kami — contact page

function HubungiPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumb">
            <a href="index.html">Utama</a>
            <span className="sep">/</span>
            <span className="cur">Hubungi Kami</span>
          </div>
          <h1>Hubungi kami<span className="signature-dot"></span></h1>
          <p className="lede">
            Kami sedia membantu pengedar, stesen TV, dan rakyat Malaysia.
            Pegawai sokongan tersedia Isnin–Jumaat, 8:30 pagi – 5:00 petang.
          </p>
        </div>
      </section>

      <section style={{paddingBottom: 64}}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-card">
                <span className="ico"><i data-lucide="map-pin"></i></span>
                <div>
                  <h5>Alamat Pejabat</h5>
                  <p>
                    Pejabat Penapisan Filem Malaysia<br/>
                    Aras 3, Blok D2, Kompleks D<br/>
                    Pusat Pentadbiran Kerajaan Persekutuan<br/>
                    62546 Putrajaya
                  </p>
                </div>
              </div>
              <div className="contact-card">
                <span className="ico"><i data-lucide="phone"></i></span>
                <div>
                  <h5>Telefon</h5>
                  <p>
                    Sokongan umum: <b style={{color:"var(--pine)"}}>03-8868 8400</b><br/>
                    Sokongan teknikal: 03-8868 8412<br/>
                    Faks: 03-8889 1006
                  </p>
                </div>
              </div>
              <div className="contact-card">
                <span className="ico"><i data-lucide="mail"></i></span>
                <div>
                  <h5>Emel</h5>
                  <p>
                    Pertanyaan umum: <a href="mailto:lpf@moha.gov.my" style={{color:"var(--teal-700)"}}>lpf@moha.gov.my</a><br/>
                    Sokongan teknikal: sokongan@ilpf.moha.gov.my<br/>
                    Maklum balas: maklumbalas@ilpf.moha.gov.my
                  </p>
                </div>
              </div>
              <div className="contact-card">
                <span className="ico"><i data-lucide="clock"></i></span>
                <div>
                  <h5>Waktu Operasi</h5>
                  <p>
                    Isnin – Khamis: 8:30 pagi – 5:00 petang<br/>
                    Jumaat: 8:30 pagi – 12:15 t.h., 2:45 – 5:00 petang<br/>
                    Sabtu, Ahad & cuti umum: Tutup
                  </p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("Demo — pertanyaan dihantar."); }}>
              <h3>Hantar pertanyaan</h3>
              <p className="sub">Kami akan membalas dalam tempoh 2 hari bekerja.</p>
              <div className="field-row">
                <div className="field">
                  <label>Nama penuh <span className="req">*</span></label>
                  <input type="text" required />
                </div>
                <div className="field">
                  <label>Emel <span className="req">*</span></label>
                  <input type="email" required />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Nombor telefon</label>
                  <input type="tel" placeholder="012-345 6789"/>
                </div>
                <div className="field">
                  <label>Kategori <span className="req">*</span></label>
                  <select required>
                    <option value="">Pilih kategori…</option>
                    <option>Pertanyaan umum</option>
                    <option>Permohonan tapisan</option>
                    <option>Akaun pengedar</option>
                    <option>Yuran & bayaran</option>
                    <option>Sokongan teknikal</option>
                    <option>Maklum balas</option>
                    <option>Lain-lain</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Subjek <span className="req">*</span></label>
                <input type="text" placeholder="Ringkasan pertanyaan anda" required />
              </div>
              <div className="field">
                <label>Mesej <span className="req">*</span></label>
                <textarea rows="6" placeholder="Sila jelaskan pertanyaan anda secara terperinci…" required></textarea>
              </div>
              <div style={{display:"flex", gap: 10, alignItems:"start", padding: 14, background: "var(--paper)", borderRadius: 10, font: "400 12.5px/1.5 var(--font-sans)", color: "var(--gray-600)"}}>
                <input type="checkbox" required style={{accentColor:"var(--teal)", marginTop: 2}}/>
                <span>Saya bersetuju bahawa maklumat saya akan diproses mengikut <a href="#" style={{color:"var(--teal-700)"}}>Dasar Privasi</a> dan Akta Perlindungan Data Peribadi 2010.</span>
              </div>
              <button type="submit" className="btn btn-teal btn-lg" style={{alignSelf:"start"}}>
                Hantar Pertanyaan <i data-lucide="arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

window.HubungiPage = HubungiPage;
