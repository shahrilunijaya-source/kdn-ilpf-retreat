// Shared chrome — utility bar, header — used in all three concepts
function UtilBar({ theme = "dark" }) {
  return (
    <div className="util-bar">
      <div className="container">
        <div className="util-left">
          <span className="jata"></span>
          <span>Portal Rasmi Pejabat Penapisan Filem · Kementerian Dalam Negeri Malaysia</span>
        </div>
        <div className="util-right">
          <a href="#">FAQ</a>
          <a href="#">Hubungi</a>
          <a href="#">Maklum Balas</a>
          <a href="#">Peta Laman</a>
          <span className="sep">|</span>
          <span className="lang"><b>BM</b> / EN</span>
          <span className="sep">|</span>
          <a href="#">OKU</a>
          <span className="sep">|</span>
          <a href="#">MyiLPF Intranet →</a>
        </div>
      </div>
    </div>
  );
}

function BrandLockup() {
  return (
    <a href="#" className="brand-lockup">
      <span className="mark">i</span>
      <span className="stack">
        <span className="top">iLPF<span className="signature-dot"></span></span>
        <span className="bot">Pejabat Penapisan Filem</span>
      </span>
    </a>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <BrandLockup />
        <nav className="site-nav">
          <a href="#" className="active">Utama</a>
          <a href="#">Profil <i data-lucide="chevron-down" className="caret"></i></a>
          <a href="#">Perkhidmatan <i data-lucide="chevron-down" className="caret"></i></a>
          <a href="#">Statistik</a>
          <a href="#">FAQ</a>
        </nav>
        <div className="header-cta">
          <a href="#" className="btn btn-ghost">Hubungi</a>
          <a href="#" className="btn btn-pine">Log Masuk <i data-lucide="chevron-down"></i></a>
        </div>
      </div>
    </header>
  );
}

window.UtilBar = UtilBar;
window.SiteHeader = SiteHeader;
window.BrandLockup = BrandLockup;
