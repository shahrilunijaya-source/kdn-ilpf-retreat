// Shared chrome for the iLPF Portal
// UtilBar, SiteHeader, SiteFooter, BrandLockup
// Used by every page.

function JataNegara({ size = 40 }) {
  return (
    <img
      src="assets/Jata_MalaysiaV2.svg.png"
      width={size}
      height={size}
      alt="Jata Negara — Lambang Kerajaan Malaysia"
      style={{ display: "block", objectFit: "contain" }}
    />
  );
}

function GovLockup() {
  return (
    <a href="https://www.malaysia.gov.my" className="gov-lockup" aria-label="Jata Negara — Kerajaan Malaysia">
      <JataNegara size={42} />
    </a>);

}

function UtilBar() {
  return (
    <div className="util-bar">
      <div className="container">
        <div className="util-left">
          <span>Portal Rasmi Pejabat Penapisan Filem · Kementerian Dalam Negeri Malaysia</span>
        </div>
        <div className="util-right">
          <a href="faq.html">FAQ</a>
          <a href="hubungi.html">Hubungi</a>
          <a href="#">Maklum Balas</a>
          <a href="#">Peta Laman</a>
          <span className="sep">|</span>
          <span className="lang"><b>BM</b> / <span>EN</span></span>
          <a href="#">OKU</a>
        </div>
      </div>
    </div>);

}

function BrandLockup({ href = "index.html" }) {
  return (
    <a href={href} className="brand-lockup">
      <img src="assets/logo-mark.svg" className="mark" alt="iLPF" />
      <span className="brand-name"><span>Pejabat</span><span>Penapisan Filem</span></span>
    </a>);

}

function NavDropdown({ label, href, active, items }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const closeT = React.useRef(null);

  const handleEnter = () => {clearTimeout(closeT.current);setOpen(true);};
  const handleLeave = () => {closeT.current = setTimeout(() => setOpen(false), 140);};

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {if (!ref.current?.contains(e.target)) setOpen(false);};
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  return (
    <div className="nav-dd" ref={ref} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <a href={href}
      className={(active ? "active " : "") + (open ? "is-open" : "")}
      aria-haspopup="true" aria-expanded={open}
      onClick={(e) => {e.preventDefault();setOpen((v) => !v);}}>
        {label} <i data-lucide="chevron-down" className="caret"></i>
      </a>
      <div className={"nav-dd-panel " + (open ? "open" : "")} role="menu">
        {items.map((it, i) =>
        <a key={i} href={it.h} role="menuitem">
            <span className="ico"><i data-lucide={it.i}></i></span>
            <span className="info">
              <span className="t1">{it.t}</span>
              <span className="t2">{it.d}</span>
            </span>
          </a>
        )}
      </div>
    </div>);

}

function SiteHeader({ current = "" }) {
  const [loginOpen, setLoginOpen] = React.useState(false);

  // close login dropdown on outside click
  React.useEffect(() => {
    if (!loginOpen) return;
    const close = (e) => {
      if (!e.target.closest(".login-dd")) setLoginOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [loginOpen]);

  const profilItems = [
  { i: "user", t: "Mesej Pengarah PPF", d: "Perutusan daripada Pengarah", h: "profil.html#mesej" },
  { i: "history", t: "Latar Belakang", d: "Sejarah LPF sejak 1908", h: "profil.html#latar" },
  { i: "target", t: "Misi, Visi & Objektif", d: "Apa yang kami perjuangkan", h: "profil.html#visi" },
  { i: "gavel", t: "Peranan PPF", d: "Fungsi di bawah Akta 620", h: "profil.html#peranan" },
  { i: "git-branch", t: "Carta Organisasi ALPF", d: "Struktur Lembaga & Urus Setia", h: "profil.html#carta" },
  { i: "award", t: "Pengerusi", d: "Latar belakang dan kerjaya", h: "profil.html#pengerusi" }];

  const perkhidmatanItems = [
  { i: "search", t: "Senarai Filem", d: "Cari filem yang telah ditapis", h: "senarai-filem.html" },
  { i: "shield-check", t: "Klasifikasi Filem", d: "U · P12 · 13 · 16 · 18", h: "klasifikasi.html" },
  { i: "calculator", t: "Kalkulator Yuran", d: "Anggaran yuran tapisan", h: "kalkulator.html" },
  { i: "scroll-text", t: "Piagam Pelanggan", d: "Komitmen kami, disukat dalam hari", h: "piagam-pelanggan.html" },
  { i: "user-plus", t: "Daftar Akaun Pengedar", d: "Untuk pengedar filem dan stesen TV", h: "daftar.html" },
  { i: "gavel", t: "Permohonan ALPF", d: "Mohon menjadi Ahli Lembaga", h: "permohonan-alpf.html" }];


  return (
    <header className="site-header">
      <a className="skip" href="#main">Langkau ke kandungan utama</a>
      <div className="container">
        <div className="co-brand">
          <GovLockup />
          <BrandLockup />
        </div>
        <nav className="site-nav" aria-label="Utama">
          <a href="index.html" className={current === "home" ? "active" : ""}>Utama</a>
          <NavDropdown label="Profil" href="profil.html" active={current === "profil"} items={profilItems} />
          <NavDropdown label="Perkhidmatan" href="senarai-filem.html" active={current === "perkhidmatan"} items={perkhidmatanItems} />
          <a href="statistik.html" className={current === "statistik" ? "active" : ""}>Statistik</a>
          <a href="faq.html" className={current === "faq" ? "active" : ""}>FAQ</a>
        </nav>
        <div className="header-cta">
          <a href="hubungi.html" className="btn btn-ghost">Hubungi</a>
          <div className={"login-dd " + (loginOpen ? "open" : "")}>
            <button className="btn btn-pine" onClick={(e) => {e.stopPropagation();setLoginOpen((v) => !v);}}>
              Log Masuk <i data-lucide="chevron-down"></i>
            </button>
            <div className="login-dd-panel" role="menu">
              <a href="login.html?as=pengedar">
                <span className="ico"><i data-lucide="film"></i></span>
                <span className="info">
                  <span className="t1">Pengedar Filem</span>
                  <span className="t2">Distributor · stesen TV</span>
                </span>
              </a>
              <a href="login.html?as=pegawai">
                <span className="ico"><i data-lucide="shield-check"></i></span>
                <span className="info">
                  <span className="t1">PPF & ALPF</span>
                  <span className="t2">Pegawai · Ahli Lembaga</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>);

}

function SiteFooter() {
  return (
    <footer className="site-footer" style={{ backgroundColor: "rgb(0, 18, 17)" }}>
      <div className="container">
        <div className="grid">
          <div>
            <div className="footer-brand">
              <img src="assets/logo-mark.svg" className="mark" alt="iLPF" />
              <span className="stack">
                <span className="t1">iLPF<span className="signature-dot"></span></span>
                <span className="t2">Pejabat Penapisan Filem Malaysia</span>
              </span>
            </div>
            <p className="footer-desc">
              Platform rasmi Lembaga Penapisan Filem Malaysia di bawah Kementerian Dalam Negeri.
              Built to decide. Designed to deliver.
            </p>
          </div>
          <div>
            <h5>Profil</h5>
            <ul>
              <li><a href="profil.html">Maklumat Korporat</a></li>
              <li><a href="profil.html#mesej">Mesej Pengarah</a></li>
              <li><a href="profil.html#latar">Latar Belakang</a></li>
              <li><a href="profil.html#visi">Misi, Visi & Objektif</a></li>
              <li><a href="profil.html#peranan">Peranan PPF</a></li>
              <li><a href="profil.html#carta">Carta Organisasi</a></li>
            </ul>
          </div>
          <div>
            <h5>Perkhidmatan</h5>
            <ul>
              <li><a href="senarai-filem.html">Senarai Filem</a></li>
              <li><a href="klasifikasi.html">Klasifikasi Filem</a></li>
              <li><a href="kalkulator.html">Kalkulator Yuran</a></li>
              <li><a href="piagam-pelanggan.html">Piagam Pelanggan</a></li>
              <li><a href="statistik.html">Statistik Tapisan</a></li>
              <li><a href="daftar.html">Daftar Akaun</a></li>
            </ul>
          </div>
          <div>
            <h5>Pautan Luar</h5>
            <ul>
              <li><a href="#">Kementerian Dalam Negeri</a></li>
              <li><a href="#">MyGovernment</a></li>
              <li><a href="#">Akta Penapisan Filem 2002</a></li>
              <li><a href="#">Garis Panduan Penapisan</a></li>
              <li><a href="#">Jawatankuasa Rayuan</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="meta">
            <span className="jata-footer" aria-hidden="true">
              <JataNegara size={20} />
            </span>
            <span>© 2026 Kerajaan Malaysia · Pejabat Penapisan Filem</span>
          </div>
          <div className="links">
            <a href="#">Dasar Privasi</a>
            <a href="#">Dasar Keselamatan</a>
            <a href="#">Pematuhan PPPA Bil.1/2025</a>
          </div>
        </div>
      </div>
    </footer>);

}

window.UtilBar = UtilBar;
window.BrandLockup = BrandLockup;
window.SiteHeader = SiteHeader;
window.SiteFooter = SiteFooter;
window.JataNegara = JataNegara;
window.GovLockup = GovLockup;