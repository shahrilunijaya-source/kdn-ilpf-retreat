// Login — Pengedar Filem + PPF/ALPF toggle

function LoginPage() {
  const params = new URLSearchParams(location.search);
  const initial = params.get("as") === "pegawai" ? "pegawai" : "pengedar";
  const [mode, setMode] = React.useState(initial);

  const isPengedar = mode === "pengedar";

  return (
    <section className="login-shell">
      <div className="login-left">
        <div className="inner">
          <BrandLockup />
          <span className="eyebrow on-pine" style={{marginTop: 64, display: "inline-flex"}}>
            {isPengedar ? "Untuk Pengedar Filem" : "Untuk Pegawai PPF & ALPF"}
            <span className="e-dot orange"></span>
          </span>
          <h2>
            {isPengedar
              ? "Hantar. Jejak. Selesai."
              : "Ruang kerja regulator."}
          </h2>
          <p>
            {isPengedar
              ? "Hantar filem, bahan publisiti, atau iklan. Jejak status permohonan dalam masa nyata. Muat turun sijil sebaik diluluskan."
              : "Akses panel tapisan, jadual sesi ALPF, dan papan pemuka kerja pegawai. Bekerja dari mana sahaja."}
          </p>
          <div className="feat">
            {isPengedar ? [
              { i: "upload-cloud", t: "Hantar dalam talian sepenuhnya", p: "Tiada lagi borang kertas. Muat naik salinan master dan dokumen sokongan terus." },
              { i: "zap", t: "Keputusan dalam 5 hari", p: "Piagam Pelanggan 2026 dipendekkan separuh untuk dua perkhidmatan utama." },
              { i: "bell", t: "Notifikasi langsung", p: "Setiap perubahan status dihantar melalui emel dan SMS." },
            ].map((f,i) => (
              <div key={i} className="feat-item">
                <span className="feat-ico"><i data-lucide={f.i}></i></span>
                <div>
                  <div className="feat-t">{f.t}</div>
                  <div className="feat-p">{f.p}</div>
                </div>
              </div>
            )) : [
              { i: "users", t: "Panel ALPF digital", p: "Jadual sesi tapisan, undi, dan rasional — semuanya dalam satu skrin." },
              { i: "file-check", t: "Aliran kerja PPF", p: "Daripada penerimaan hinggalah pengeluaran sijil dalam satu papan pemuka." },
              { i: "shield-check", t: "2FA wajib", p: "Pengesahan dua faktor untuk semua akaun pegawai." },
            ].map((f,i) => (
              <div key={i} className="feat-item">
                <span className="feat-ico"><i data-lucide={f.i}></i></span>
                <div>
                  <div className="feat-t">{f.t}</div>
                  <div className="feat-p">{f.p}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{position: "relative", zIndex: 1, font: "500 12px/1.5 var(--font-sans)", color: "rgba(255,255,255,0.45)"}}>
          © 2026 Kerajaan Malaysia · Pejabat Penapisan Filem
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="tabs">
            <button className={isPengedar ? "active" : ""} onClick={() => setMode("pengedar")}>
              <i data-lucide="film"></i> Pengedar
            </button>
            <button className={!isPengedar ? "active" : ""} onClick={() => setMode("pegawai")}>
              <i data-lucide="shield-check"></i> PPF & ALPF
            </button>
          </div>

          <h3>{isPengedar ? "Log masuk akaun pengedar" : "Log masuk pegawai"}</h3>
          <p className="lede">
            {isPengedar
              ? "Masukkan butiran akaun pengedar yang telah didaftarkan."
              : "Gunakan kredensial pegawai PPF atau ALPF anda."}
          </p>

          <form className="login-form" onSubmit={(e) => { e.preventDefault(); alert("Demo — log masuk simulasi."); }}>
            <div className="field">
              <label>{isPengedar ? "Nombor pendaftaran SSM atau emel" : "ID pegawai atau emel rasmi"} <span className="req">*</span></label>
              <input type="text" placeholder={isPengedar ? "202101012345 atau nama@syarikat.my" : "PPF12345 atau nama@moha.gov.my"} required />
            </div>
            <div className="field">
              <label>Kata laluan <span className="req">*</span></label>
              <input type="password" placeholder="••••••••••" required />
            </div>
            <div className="login-form meta-row" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <label className="remember" style={{display:"inline-flex", gap: 8, alignItems:"center", color:"var(--gray-700)", font:"400 13px/1 var(--font-sans)", cursor:"pointer"}}>
                <input type="checkbox" style={{accentColor:"var(--teal)"}}/> Ingat saya
              </label>
              <a href="#" style={{color:"var(--teal-700)", font:"500 13px/1 var(--font-sans)"}}>Lupa kata laluan?</a>
            </div>
            <button type="submit" className="btn btn-teal btn-block btn-lg">
              Log Masuk <i data-lucide="arrow-right"></i>
            </button>
            {!isPengedar && (
              <div style={{padding: "12px 14px", background: "var(--orange-50)", color: "var(--orange-600)", borderRadius: 10, font:"500 12.5px/1.4 var(--font-sans)", display:"flex", gap: 10, alignItems:"center"}}>
                <i data-lucide="shield" style={{width:16, height:16}}></i>
                Pengesahan dua faktor (2FA) wajib untuk akaun pegawai.
              </div>
            )}
          </form>

          <div className="foot">
            {isPengedar ? (
              <>Belum mempunyai akaun? <a href="daftar.html">Daftar Akaun Pengedar →</a></>
            ) : (
              <>Memohon menjadi Ahli Lembaga? <a href="permohonan-alpf.html">Permohonan ALPF Baru →</a></>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

window.LoginPage = LoginPage;
