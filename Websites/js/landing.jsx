// Landing page sections — Pine Stage system

function HeroDashPanel() {
  return (
    <div className="hero-dash">
      <div className="glass">
        <div className="glass-hd">
          <span className="ttl">Permohonan Aktif</span>
          <span className="live">Live</span>
        </div>
        <div className="row">
          <div className="info">
            <div className="poster"></div>
            <div>
              <div className="t-title">Sheriff: Narko-Integriti 2</div>
              <div className="t-meta">A2026/04/0892</div>
            </div>
          </div>
          <span className="cls cls-18">18</span>
        </div>
        <div className="row">
          <div className="info">
            <div className="poster"></div>
            <div>
              <div className="t-title">Dune: Part Three</div>
              <div className="t-meta">A2026/04/0871</div>
            </div>
          </div>
          <span className="cls cls-p12">P12</span>
        </div>
        <div className="row">
          <div className="info">
            <div className="poster"></div>
            <div>
              <div className="t-title">Upin & Ipin: Lagenda Pulau</div>
              <div className="t-meta">A2026/03/0661</div>
            </div>
          </div>
          <span className="cls cls-u">U</span>
        </div>
        <div className="row">
          <div className="info">
            <div className="poster"></div>
            <div>
              <div className="t-title">Polis Evo 4 · trailer 90s</div>
              <div className="t-meta">BP2026/03/0728</div>
            </div>
          </div>
          <span className="status">Disemak</span>
        </div>
      </div>
      <div className="stats-row">
        <div className="stat-mini">
          <div className="lbl">Hari ini</div>
          <div className="num">47</div>
          <div className="sub">permohonan dalam talian</div>
        </div>
        <div className="stat-mini">
          <div className="lbl">Memerlukan tindakan</div>
          <div className="num orange">3</div>
          <div className="sub">menjelang tarikh akhir</div>
        </div>
      </div>
    </div>
  );
}

function HeroEditorialTicker() {
  const rows = [
    { t: "02 min", b: "Permohonan diluluskan", x: "Tayangan Panggung", tag: "P13",   c: "appr" },
    { t: "05 min", b: "Permohonan dihantar",   x: "Bahan Publisiti",   tag: "Baharu", c: "subm" },
    { t: "08 min", b: "Panel ALPF",            x: "memulakan sesi · 3 ahli", tag: "Sesi", c: "subm" },
    { t: "18 min", b: "Sijil A dikeluarkan",   x: "A2026/05/1247",     tag: "Selesai", c: "appr" },
    { t: "24 min", b: "Permohonan dihantar",   x: "Iklan komersial",   tag: "Baharu", c: "subm" },
    { t: "31 min", b: "Permohonan diluluskan", x: "Pita & DVD",        tag: "16",     c: "appr" },
  ];
  return (
    <aside className="hero-ticker">
      <div className="head">
        <span className="label">Aktiviti Live</span>
        <span className="live">Live</span>
      </div>
      <div className="rows">
        {rows.map((r, i) => (
          <div key={i} className="row">
            <span className="t">{r.t}</span>
            <span className="desc"><b>{r.b}</b> · {r.x}</span>
            <span className={"tag " + r.c}>{r.tag}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function HeroPine({ vibe = "pine" }) {
  React.useEffect(() => {
    var canvas = document.getElementById('ilpf-wave-bg');
    if (!canvas) return;
    var gl = canvas.getContext('webgl', { antialias: true });
    if (!gl) return;

    var vsSource = "attribute vec4 aVertexPosition;void main(){gl_Position=aVertexPosition;}";
    var fsSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;

      const float overallSpeed    = 0.2;
      const float gridSmoothWidth = 0.015;
      const float minLineWidth    = 0.005;
      const float maxLineWidth    = 0.08;
      const float lineSpeed       = 1.0  * overallSpeed;
      const float lineAmplitude   = 1.0;
      const float lineFrequency   = 0.2;
      const float warpSpeed       = 0.2  * overallSpeed;
      const float warpFrequency   = 0.5;
      const float warpAmplitude   = 0.4;
      const float offsetFrequency = 0.5;
      const float offsetSpeed     = 1.33 * overallSpeed;
      const float minOffsetSpread = 0.6;
      const float maxOffsetSpread = 2.0;
      const int   linesPerGroup   = 9;
      const float scale           = 5.0;
      const vec4  lineColor       = vec4(0.04, 0.45, 0.65, 1.0);

      #define drawCircle(pos,radius,coord) smoothstep(radius+gridSmoothWidth,radius,length(coord-(pos)))
      #define drawSmoothLine(pos,hw,t)     smoothstep(hw,0.0,abs(pos-(t)))
      #define drawCrispLine(pos,hw,t)      smoothstep(hw+gridSmoothWidth,hw,abs(pos-(t)))

      float random(float t){return(cos(t)+cos(t*1.3+1.3)+cos(t*1.4+1.4))/3.0;}
      float getPlasmaY(float x,float hf,float off){
        return random(x*lineFrequency+iTime*lineSpeed)*hf*lineAmplitude+off;
      }

      void main(){
        vec2 uv    = gl_FragCoord.xy/iResolution.xy;
        vec2 space = (gl_FragCoord.xy-iResolution.xy/2.0)/iResolution.x*2.0*scale;

        float hFade = 1.0-(cos(uv.x*6.28)*0.5+0.5);
        float vFade = 1.0-(cos(uv.y*6.28)*0.5+0.5);

        space.y += random(space.x*warpFrequency+iTime*warpSpeed)*warpAmplitude*(0.5+hFade);
        space.x += random(space.y*warpFrequency+iTime*warpSpeed+2.0)*warpAmplitude*hFade;

        vec4 lines    = vec4(0.0);
        vec4 bgColor1 = vec4(0.06, 0.09, 0.16, 1.0);
        vec4 bgColor2 = vec4(0.12, 0.23, 0.37, 1.0);

        for(int l=0;l<linesPerGroup;l++){
          float nl   = float(l)/float(linesPerGroup);
          float ot   = iTime*offsetSpeed;
          float op   = float(l)+space.x*offsetFrequency;
          float rand = random(op+ot)*0.5+0.5;
          float hw   = mix(minLineWidth,maxLineWidth,rand*hFade)/2.0;
          float off  = random(op+ot*(1.0+nl))*mix(minOffsetSpread,maxOffsetSpread,hFade);
          float lp   = getPlasmaY(space.x,hFade,off);
          float line = drawSmoothLine(lp,hw,space.y)/2.0+drawCrispLine(lp,hw*0.15,space.y);
          float cx   = mod(float(l)+iTime*lineSpeed,25.0)-12.0;
          vec2  cp   = vec2(cx,getPlasmaY(cx,hFade,off));
          line += drawCircle(cp,0.008,space)*1.5;
          lines += line*lineColor*rand;
        }

        vec4 col = mix(bgColor1, bgColor2, uv.x);
        col *= vFade; col.a = 1.0; col += lines * 0.45;
        gl_FragColor = col;
      }
    `;

    function loadShader(gl, type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
      return s;
    }

    var vs = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    var fs = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    var aPos  = gl.getAttribLocation(prog, 'aVertexPosition');
    var uRes  = gl.getUniformLocation(prog, 'iResolution');
    var uTime = gl.getUniformLocation(prog, 'iTime');

    function resize() {
      var p = canvas.parentElement;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.floor(p.clientWidth  * dpr);
      canvas.height = Math.floor(p.clientHeight * dpr);
      canvas.style.width  = p.clientWidth  + 'px';
      canvas.style.height = p.clientHeight + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize);
    var ro;
    if ('ResizeObserver' in window) { ro = new ResizeObserver(resize); ro.observe(canvas.parentElement); }
    resize();

    var rafId;
    var t0 = performance.now();
    (function render() {
      var t = (performance.now() - t0) / 1000;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aPos);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    })();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <section className="pine-hero" id="main">
      <canvas id="ilpf-wave-bg" aria-hidden="true"></canvas>
      <div className="container">
        <div className="grid">
          <div>
            <span className="eyebrow on-pine">
              Pejabat Penapisan Filem · v2 dilancarkan
              <span className="e-dot orange"></span>
            </span>
            <h1>
              Menepati nilai<br />
              estetika budaya <span className="accent">& moral negara<span className="signature-dot"></span></span>
            </h1>
            <p className="lede">
              Platform rasmi Lembaga Penapisan Filem Malaysia. Tapisan, klasifikasi,
              dan pensijilan filem — semuanya dalam satu ruang kerja digital.
            </p>
            <div className="pine-hero-actions">
              <a href="login.html?as=pengedar" className="btn btn-teal btn-lg">
                Hantar Permohonan <i data-lucide="arrow-right"></i>
              </a>
              <a href="senarai-filem.html" className="btn btn-ghost-light btn-lg">
                Semak Senarai Filem
              </a>
            </div>
            <div className="pine-hero-trust">
              <span className="t-item"><i data-lucide="shield-check"></i> Akta 620</span>
              <span className="t-item"><i data-lucide="zap"></i> Keputusan 5 hari</span>
              <span className="t-item"><i data-lucide="lock"></i> Disahkan KDN</span>
            </div>
          </div>

          {vibe === "editorial" ? <HeroEditorialTicker /> : <HeroDashPanel />}
        </div>
      </div>
    </section>
  );
}

function HebahanStrip() {
  const [tab, setTab] = React.useState("pengumuman");
  const tabs = [
  { id: "pengumuman", label: "Pengumuman", count: 4 },
  { id: "pemberitahuan", label: "Pemberitahuan", count: 4 },
  { id: "peringatan", label: "Peringatan", count: 4 }];

  const heb = {
    pengumuman: [
    { d: "12 MAY 2026", t: "Pelancaran rasmi iLPF v2", p: "Sistem baharu kini beroperasi penuh. Akaun pengedar sedia dipindahkan. Log masuk seperti biasa." },
    { d: "8 MAY 2026", t: "Pindaan Garis Panduan Penapisan 2026", p: "Versi 2026 berkuat kuasa pada 1 Jun. Muat turun salinan penuh di portal." },
    { d: "30 APR 2026", t: "Sesi taklimat industri Mei 2026", p: "Pengedar dan stesen TV dijemput hadir taklimat sistem baharu pada 22 Mei di KDN Putrajaya." }],

    pemberitahuan: [
    { d: "11 MAY 2026", t: "Penyelenggaraan sistem 15 Mei, 11mlm – 5pg", p: "Modul tapisan TV tidak dapat diakses sepanjang tempoh ini. Tiada kesan kepada permohonan sedia ada." },
    { d: "5 MAY 2026", t: "Yuran tapisan dikemas kini 1 Julai 2026", p: "Rujuk Peraturan-Peraturan Penapisan (Fi) Filem 1984 pindaan 2026. Kalkulator akan dikemas kini." },
    { d: "2 MAY 2026", t: "Borang Permohonan ALPF dalam talian sepenuhnya", p: "Tiada lagi borang kertas. Hantar permohonan dan lampiran terus melalui portal." }],

    peringatan: [
    { d: "10 MAY 2026", t: "Hantar bahan publisiti 2 hari sebelum tayangan", p: "Piagam Pelanggan baharu: tempoh pemprosesan 2 hari bekerja. Jangan tunggu hari terakhir." },
    { d: "7 MAY 2026", t: "Pastikan filem yang dihantar adalah salinan master", p: "Salinan rendah resolusi atau pratonton tidak akan dilayan. Rujuk panduan teknikal di FAQ." },
    { d: "3 MAY 2026", t: "Sijil A wajib bagi setiap tayangan pawagam", p: "Tiada Sijil A bermakna tiada tayangan. Semak status sijil sebelum hari tayangan." }]

  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head-row">
          <div>
            <span className="eyebrow">Hebahan Terkini<span className="e-dot"></span></span>
            <h2 style={{ margin: "8px 0 0", font: "700 44px/1.05 var(--font-sans)", letterSpacing: "-0.03em" }}>
              Pengumuman, pemberitahuan, peringatan.
            </h2>
          </div>
          <div className="heb-tabs">
            {tabs.map((t) =>
            <button key={t.id}
            className={"heb-tab " + (tab === t.id ? "active" : "")}
            onClick={() => setTab(t.id)}>
                {t.label} <span className="count">{t.count}</span>
              </button>
            )}
          </div>
        </div>
        <div style={{ height: 36 }}></div>
        <div className="heb-grid">
          {heb[tab].map((it, i) =>
          <article key={i} className="heb-card">
              <div className="date">{it.d}</div>
              <h4>{it.t}</h4>
              <p>{it.p}</p>
              <a className="more" href="#">Baca <i data-lucide="arrow-right" style={{ width: 13, height: 13 }}></i></a>
            </article>
          )}
        </div>
      </div>
    </section>);

}

function LiveStats() {
  return (
    <section style={{ padding: "32px 0 96px" }}>
      <div className="container">
        <div className="section-head-row" style={{ marginBottom: 32 }}>
          <div>
            <span className="eyebrow">Statistik Hari Ini<span className="e-dot orange"></span></span>
            <h2 style={{ margin: "8px 0 0", font: "700 44px/1.05 var(--font-sans)", letterSpacing: "-0.03em" }}>
              Sistem yang sentiasa hidup.
            </h2>
          </div>
          <a href="statistik.html" className="btn btn-ghost">
            Lihat statistik penuh <i data-lucide="arrow-right"></i>
          </a>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="lbl">Permohonan hari ini</div>
            <div className="num">47</div>
            <div className="sub">dalam talian</div>
            <div className="delta">▲ 12% vs semalam</div>
          </div>
          <div className="stat-card">
            <div className="lbl">Sedang disemak</div>
            <div className="num">18</div>
            <div className="sub">oleh ALPF</div>
            <div className="delta neutral">~ 22 minit anggaran</div>
          </div>
          <div className="stat-card">
            <div className="lbl">Diluluskan minggu ini</div>
            <div className="num">312</div>
            <div className="sub">sijil dikeluarkan</div>
            <div className="delta">96% mencapai SLA</div>
          </div>
          <div className="stat-card">
            <div className="lbl">Disenaraikan 2026</div>
            <div className="num">1,847</div>
            <div className="sub">sepanjang tahun</div>
            <div className="delta orange">+203 bulan ini</div>
          </div>
        </div>
      </div>
    </section>);

}

function ServicesPantas() {
  const svcs = [
  { i: "search", t: "Semak Senarai Filem", p: "Cari filem yang telah diluluskan dan klasifikasinya.", h: "senarai-filem.html" },
  { i: "calculator", t: "Kalkulator Yuran", p: "Anggaran yuran tapisan mengikut tempoh tayangan.", h: "kalkulator.html" },
  { i: "shield-check", t: "Klasifikasi Filem", p: "Maksud U, P12, 13, 16, dan 18.", h: "klasifikasi.html" },
  { i: "scroll-text", t: "Piagam Pelanggan", p: "Komitmen kami pada anda, disukat dalam hari.", h: "piagam-pelanggan.html" },
  { i: "bar-chart-3", t: "Statistik Tapisan", p: "Data permohonan dan keputusan secara terbuka.", h: "statistik.html" },
  { i: "user-plus", t: "Daftar Akaun Pengedar", p: "Untuk pengedar filem dan stesen TV.", h: "daftar.html" },
  { i: "gavel", t: "Permohonan Ahli Lembaga", p: "Mohon menjadi ALPF di bawah Akta 620.", h: "permohonan-alpf.html" },
  { i: "help-circle", t: "Soalan Lazim", p: "Jawapan ringkas, terus pada isunya.", h: "faq.html" }];

  return (
    <section style={{ padding: "0 0 96px", background: "var(--paper)" }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Perkhidmatan Pantas<span className="e-dot"></span></span>
          <h2 style={{ margin: "8px 0 0", font: "700 44px/1.05 var(--font-sans)", letterSpacing: "-0.03em" }}>
            Apa yang anda perlukan?
          </h2>
        </div>
        <div className="svc-grid">
          {svcs.map((s, i) =>
          <a key={i} href={s.h} className="svc">
              <span className="ico"><i data-lucide={s.i}></i></span>
              <h4>{s.t}</h4>
              <p>{s.p}</p>
              <span className="arrow">Buka <i data-lucide="arrow-right"></i></span>
            </a>
          )}
        </div>
      </div>
    </section>);

}

function ClassificationsTeaser() {
  const cls = window.iLPFData.classifications;
  const summaries = {
    u: "Sesuai untuk semua peringkat umur.",
    p12: "Bimbingan ibu bapa untuk bawah 12 tahun.",
    13: "Sesuai 13 tahun ke atas.",
    16: "Sesuai 16 tahun ke atas.",
    18: "Hanya untuk penonton dewasa."
  };
  return (
    <section style={{ padding: "0 0 96px" }}>
      <div className="container">
        <div className="section-head-row" style={{ marginBottom: 36 }}>
          <div>
            <span className="eyebrow">Klasifikasi Filem<span className="e-dot"></span></span>
            <h2 style={{ margin: "8px 0 0", font: "700 44px/1.05 var(--font-sans)", letterSpacing: "-0.03em" }}>
              Lima keputusan. Satu sistem.
            </h2>
          </div>
          <a href="klasifikasi.html" className="btn btn-ghost">
            Baca selengkapnya <i data-lucide="arrow-right"></i>
          </a>
        </div>
        <div className="cls-row">
          {cls.map((c) =>
          <a key={c.id} href={"klasifikasi.html#" + c.id} className="cls-teaser">
              <span className={"cls cls-lg cls-" + c.id}>{c.id === "p12" ? "P12" : c.id.toUpperCase()}</span>
              <h4>{c.t}</h4>
              <p>{summaries[c.id]}</p>
            </a>
          )}
        </div>
      </div>
    </section>);

}

function PiagamStrip() {
  return (
    <section style={{ padding: "0 0 96px" }}>
      <div className="container">
        <div className="section-head-row" style={{ marginBottom: 36 }}>
          <div>
            <span className="eyebrow">Piagam Pelanggan<span className="e-dot"></span></span>
            <h2 style={{ margin: "8px 0 0", font: "700 44px/1.05 var(--font-sans)", letterSpacing: "-0.03em" }}>
              Janji kami. Disukat dalam hari.
            </h2>
          </div>
          <a href="piagam-pelanggan.html" className="btn btn-ghost">
            Baca penuh <i data-lucide="arrow-right"></i>
          </a>
        </div>
        <div className="piagam-row">
          {window.iLPFData.piagam.map((p, i) =>
          <div key={i} className="piagam-card">
              <div className="dur">{p.dur}<span className="u">hari</span></div>
              <div className="svc-name">{p.svc}</div>
              <div className={"delta " + p.state}>{p.state === "down" ? "▼ " : "✓ "}{p.pct}</div>
              <div className="was">Dahulu: <s>{p.was}</s></div>
            </div>
          )}
        </div>
        <p style={{ font: "400 13px/1.5 var(--font-sans)", color: "var(--gray-500)", marginTop: 24, maxWidth: 720 }}>
          Tempoh dikira dari tarikh permohonan lengkap diterima.
          Rujuk Piagam Pelanggan penuh untuk syarat dan pengecualian.
        </p>
      </div>
    </section>);

}

function FAQTeaser() {
  const top = window.iLPFData.faqs.slice(0, 5);
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ padding: "0 0 96px" }}>
      <div className="container">
        <div className="section-head-row" style={{ marginBottom: 36 }}>
          <div>
            <span className="eyebrow">Soalan Lazim<span className="e-dot"></span></span>
            <h2 style={{ margin: "8px 0 0", font: "700 44px/1.05 var(--font-sans)", letterSpacing: "-0.03em" }}>
              Jawapan yang anda cari.
            </h2>
          </div>
          <a href="faq.html" className="btn btn-ghost">
            Lihat semua soalan <i data-lucide="arrow-right"></i>
          </a>
        </div>
        <div className="faq-list">
          {top.map((f, i) =>
          <div key={i} className={"faq-item " + (open === i ? "open" : "")}>
              <div className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="icn"><i data-lucide="plus"></i></span>
              </div>
              <div className="faq-a"><p style={{ margin: 0 }}>{f.a}</p></div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

window.HeroPine = HeroPine;
window.HebahanStrip = HebahanStrip;
window.LiveStats = LiveStats;
window.ServicesPantas = ServicesPantas;
window.ClassificationsTeaser = ClassificationsTeaser;
window.PiagamStrip = PiagamStrip;
window.FAQTeaser = FAQTeaser;