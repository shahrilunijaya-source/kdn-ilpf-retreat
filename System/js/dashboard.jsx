/* iLPF v2 — Dashboard (Utama)
   Exposes window.Dashboard component.
   Reads window.iLPF mock data + accepts a `state` prop:
     'calm' | 'normal' | 'heavy' | 'ending'
   Plus showAkuJanji + tod (time of day) props. */

const { useState: useStateDash, useMemo: useMemoDash } = React;

/* ---------- Greeting line ---------------------------------------------- */

const GREETING_BY_TOD = {
  pagi: "Selamat pagi",
  "tengah-hari": "Selamat tengah hari",
  petang: "Selamat petang",
  malam: "Selamat malam",
};

function Greeting({ name, count, late, hours, tod }) {
  const hello = GREETING_BY_TOD[tod] || "Selamat petang";
  if (count === 0) {
    return (
      <div>
        <h1 className="dash-greet__h1">{hello}, {name}.<span className="dot" /></h1>
        <p className="dash-greet__sub">
          <strong>0 tugasan</strong> dalam tangan. Hari yang lapang.
        </p>
      </div>
    );
  }
  return (
    <div>
      <h1 className="dash-greet__h1">{hello}, {name}.<span className="dot" /></h1>
      <p className="dash-greet__sub">
        <strong>{count} tugasan</strong> dalam tangan.
        {' '}
        {late > 0 ? (<><span className="late">{late} lewat.</span> </>) : null}
        Anggaran <strong>{hours} jam</strong> kerja.
      </p>
    </div>
  );
}

/* ---------- Contract countdown ---------------------------------------- */

function ContractCountdown({ pelantikan, tamat, daysLeft }) {
  // States per spec:
  //  > 90  — teal, years + months
  //  60–90 — neutral, months + weeks
  //  < 60  — orange, days tabular
  //  < 14  — orange + pulse
  let cls = '';
  let pulse = false;
  let big = '';
  let eyebrow = 'PELANTIKAN';
  if (daysLeft < 14) { cls = 'is-orange'; pulse = true; big = `${daysLeft} hari lagi`; }
  else if (daysLeft < 60) { cls = 'is-orange'; big = `${daysLeft} hari lagi`; }
  else if (daysLeft < 90) {
    const m = Math.floor(daysLeft / 30);
    const w = Math.floor((daysLeft % 30) / 7);
    big = `${m} bulan${w > 0 ? ` ${w} minggu` : ''} lagi`;
  } else {
    const y = Math.floor(daysLeft / 365);
    const m = Math.floor((daysLeft % 365) / 30);
    big = `${y > 0 ? `${y} tahun ` : ''}${m} bulan lagi`;
  }
  const fmt = (d) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  return (
    <div className={`dash-contract ${cls} ${pulse ? 'is-pulse' : ''}`}>
      <div className="dash-contract__eyebrow">{eyebrow}</div>
      <div className="dash-contract__big tabular">{big}</div>
      <div className="dash-contract__sub">
        Lantik {fmt(pelantikan)} · Tamat {fmt(tamat)}
      </div>
    </div>
  );
}

/* ---------- Pengumuman ------------------------------------------------- */

function Pengumuman({ items, onDismiss }) {
  if (!items || items.length === 0) return null;
  const I = window.Icons;
  return (
    <div className="dash-pengumuman">
      {items.map((p) => (
        <div className="dash-peng" key={p.id}>
          <div className="dash-peng__pin"><I.pin /></div>
          <div className="dash-peng__body">
            <div className="dash-peng__eyebrow">PENGUMUMAN · {p.from}</div>
            <div className="dash-peng__title">{p.title}</div>
            <div className="dash-peng__desc">{p.body}</div>
          </div>
          <button className="dash-peng__close" onClick={() => onDismiss(p.id)} aria-label="Tutup">
            <I.close />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------- Tugasan Hari Ini ------------------------------------------ */

function TugasanList({ items }) {
  const I = window.Icons;
  if (!items || items.length === 0) {
    return (
      <div className="dash-empty">
        <div className="dash-empty__title">Tiada tugasan hari ini.<span className="dot" /></div>
        <div className="dash-empty__sub">
          Anda boleh menyemak senarai penuh atau mengambil rehat yang anda berhak.
        </div>
      </div>
    );
  }
  return (
    <div className="dash-tugasan">
      {items.map((t) => {
        const ctaCls = t.late ? 'dash-trow__cta--orange' : (t.cta === 'Sedia' ? 'dash-trow__cta--pine' : 'dash-trow__cta--ghost');
        return (
          <div key={t.id} className={`dash-trow ${t.late ? 'is-late' : ''}`}>
            <div className="dash-trow__panel">{t.panel}</div>
            <div className="dash-trow__title-row">
              <div className="dash-trow__title">{t.title}</div>
              <div className="dash-trow__sub">
                <span>{t.meta}</span>
                <span className="sep">·</span>
                <span className={`ws-role ws-role--${t.role}`}>
                  {t.role === 'ketua' ? 'Ketua Panel' : 'Ahli Panel'}
                </span>
              </div>
            </div>
            <div className="dash-trow__due">
              <div className="dash-trow__due-label">{t.dueLabel}</div>
              <div className="dash-trow__due-sub">{t.dueSub}</div>
            </div>
            <a href="Tapisan-Senarai.php" className={`dash-trow__cta ${ctaCls}`}>
              {t.cta} <I.arrowR />
            </a>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- KPI tiles ------------------------------------------------- */

function KpiTiles({ kpi }) {
  const tiles = [
    { eyebrow: 'TAPISAN MINGGU INI', ...kpi.mingguIni },
    { eyebrow: 'DALAM TANGAN', ...kpi.dalamTangan },
    { eyebrow: 'SLA BULAN INI', ...kpi.sla },
    { eyebrow: 'CADANGAN AI', ...kpi.ai },
  ];
  return (
    <div className="dash-kpis">
      {tiles.map((t, i) => (
        <div key={i} className={`dash-kpi ${t.warn ? 'is-warn' : ''} ${t.ok ? 'is-ok' : ''}`}>
          <div className="dash-kpi__eyebrow">{t.eyebrow}</div>
          <div className="dash-kpi__value">{t.value}</div>
          <div className="dash-kpi__sub">{t.sub}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Tugasan terakhir + Lifetime ------------------------------- */

function TugasanTerakhir({ data }) {
  const I = window.Icons;
  return (
    <div className="dash-last">
      <div className="dash-last__check"><I.check /></div>
      <div className="dash-last__body">
        <strong>Tugasan terakhir selesai</strong>
        <span className="sep">·</span>
        <strong>{data.title}</strong>
        <span className="sep">·</span>
        {data.keputusan}
        {' '}
        <span className={`cls cls--${data.klasifikasi}`} style={{ marginLeft: 6 }}>{data.klasifikasi}</span>
      </div>
      <div className="dash-last__time">{data.timeAgo}</div>
    </div>
  );
}

function LifetimeFooter({ data }) {
  return (
    <div className="dash-lifetime">
      Sepanjang pelantikan: <strong>{data.filem} filem ditapis</strong>
      {' · '}
      <strong>{data.jamSkrin} jam skrin</strong>
      {' · sejak '}<strong>{data.sejak}</strong>
    </div>
  );
}

/* ---------- Right rail cards ----------------------------------------- */

function BakiCuti({ baki }) {
  const I = window.Icons;
  const pctR = Math.round((baki.rehat.used / baki.rehat.total) * 100);
  const pctS = Math.round((baki.sakit.used / baki.sakit.total) * 100);
  return (
    <div className="rail-card">
      <div className="rail-card__head">
        <div className="rail-card__eyebrow">Baki Cuti</div>
      </div>
      <div className="baki-row">
        <span>Cuti rehat</span>
        <span>
          <span className="baki-row__bar" style={{ '--pct': `${pctR}%` }} />
          <span className="baki-row__count">{baki.rehat.used}/{baki.rehat.total} hari</span>
        </span>
      </div>
      <div className="baki-row">
        <span>Cuti sakit</span>
        <span>
          <span className="baki-row__bar" style={{ '--pct': `${pctS}%` }} />
          <span className="baki-row__count">{baki.sakit.used}/{baki.sakit.total} hari</span>
        </span>
      </div>
      <div className="baki-row">
        <span>Permohonan menunggu</span>
        <span className="baki-row__count">{baki.menunggu}</span>
      </div>
      <div className="rail-card__foot">
        <span style={{ fontSize: 11, color: 'var(--mute)' }}>Tahun 2026</span>
        <a className="rail-card__link" href="#">Mohon cuti <I.arrowR style={{ verticalAlign: '-2px' }} /></a>
      </div>
    </div>
  );
}

const BM_MONTHS = ['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember'];
const DOW_BM = ['I','S','R','K','J','S','A'];

function buildMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const dim = new Date(year, month + 1, 0).getDate();
  // Convert JS day (Sun=0..Sat=6) → Monday=0..Sunday=6
  const offset = (first.getDay() + 6) % 7;
  const prevDim = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = 0; i < offset; i++) {
    cells.push({ d: prevDim - offset + 1 + i, out: true });
  }
  for (let d = 1; d <= dim; d++) cells.push({ d, out: false });
  // pad to 6 rows (42)
  while (cells.length < 42) cells.push({ d: cells.length - dim - offset + 1, out: true });
  return cells;
}

function MiniKalendar({ today, markers }) {
  const year = today.getFullYear();
  const month = today.getMonth();
  const grid = useMemoDash(() => buildMonthGrid(year, month), [year, month]);
  const map = useMemoDash(() => {
    const m = new Map();
    (markers || []).forEach((x) => m.set(x.d, x));
    return m;
  }, [markers]);
  return (
    <div className="rail-card">
      <div className="rail-card__head">
        <div className="rail-card__eyebrow">KALENDAR · {BM_MONTHS[month]} {year}</div>
      </div>
      <div className="kal">
        {DOW_BM.map((d, i) => <div key={`dow-${i}`} className="kal__dow">{d}</div>)}
        {grid.map((c, i) => {
          const isToday = !c.out && c.d === today.getDate();
          const mk = !c.out ? map.get(c.d) : null;
          return (
            <div
              key={i}
              className={`kal__cell ${c.out ? 'kal__cell--out' : ''} ${isToday ? 'kal__cell--today' : ''}`}
            >
              {c.d}
              {mk && (mk.t || mk.c) && (
                <div className="dot-bar">
                  {mk.t && <span className="t" />}
                  {mk.c && <span className="c" />}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="rail-card__foot" style={{ justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10.5, color: 'var(--mute)', display: 'inline-flex', gap: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)' }} /> Tugasan
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B82F6' }} /> Cuti
          </span>
        </span>
        <a className="rail-card__link" href="#">Penuh →</a>
      </div>
    </div>
  );
}

function CadanganAi({ text, state }) {
  const I = window.Icons;
  return (
    <div className="ai-card">
      <div className="ai-card__eyebrow">
        <I.spark />
        Cadangan AI<span className="dot" />
      </div>
      <div className="ai-card__body">{text}</div>
      <div className="ai-card__meta">neutron-7b · keadaan: {state}</div>
    </div>
  );
}

/* ---------- Aku Janji overlay ---------------------------------------- */

function AkuJanji({ statements, onConfirm, onDismiss }) {
  const I = window.Icons;
  return (
    <div className="aku">
      <button className="aku__close" onClick={onDismiss} aria-label="Tutup">
        <I.close />
      </button>
      <div className="aku__eyebrow">Pengesahan suku ini · 3 perkara</div>
      <h2 className="aku__title">Aku Janji KDN<span className="dot" /></h2>
      <div className="aku__list">
        {statements.map((s, i) => (
          <div key={i} className="aku__item">
            <span className="aku__num">{i + 1}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>
      <button className="aku__cta" onClick={onConfirm}>
        Saya akui · Sahkan suku ini <I.arrowR />
      </button>
      <button className="aku__dismiss" onClick={onDismiss}>Ingatkan saya kemudian</button>
    </div>
  );
}

/* ---------- Dashboard root ------------------------------------------- */

function Dashboard({ state = 'heavy', showAkuJanji = true, tod = 'petang', akuVariant = 'v2' }) {
  const data = window.iLPF;
  const [pengumumanIds, setPengumumanIds] = useStateDash(data.pengumuman.map((p) => p.id));
  const [akuOpen, setAkuOpen] = useStateDash(showAkuJanji);

  // Keep akuOpen in sync with the prop (so the tweak toggle re-opens it)
  React.useEffect(() => { setAkuOpen(showAkuJanji); }, [showAkuJanji]);
  // Reset pengumuman when state flips
  React.useEffect(() => { setPengumumanIds(data.pengumuman.map((p) => p.id)); }, [state, data.pengumuman]);

  // Days left from today to tamat (override per state for clarity)
  const baseDays = Math.round((data.me.tamat - data.today) / 86400000);
  const daysLeft = state === 'ending' ? 11 : state === 'heavy' ? 53 : baseDays;
  const tamatEff = state === 'ending'
    ? data.addDays(11)
    : state === 'heavy'
      ? data.addDays(53)
      : data.me.tamat;
  const pelantikanEff = data.addDays(-Math.round((tamatEff - data.me.pelantikan) / 86400000) + Math.round((tamatEff - data.me.pelantikan) / 86400000));
  // (kept original pelantikan — pelantikanEff intentionally same as me.pelantikan)

  // Tugasan + KPI per state
  const tugasan = data.tugasan[state] || [];
  const kpi = data.kpi[state];

  // Pengumuman filtered by dismiss
  const peng = (state === 'calm')
    ? []
    : data.pengumuman.filter((p) => pengumumanIds.includes(p.id));

  // Headline counts
  const lateCount = tugasan.filter((t) => t.late).length;
  const hoursEst = state === 'heavy' ? 7 : state === 'normal' ? 4 : state === 'ending' ? 3 : 0;

  return (
    <>
      <div className="ws-page">
        <div className="ws-page__main">
          <div className="dash-greet">
            <Greeting
              name={data.me.name}
              count={tugasan.length}
              late={lateCount}
              hours={hoursEst}
              tod={tod}
            />
            <ContractCountdown
              pelantikan={data.me.pelantikan}
              tamat={tamatEff}
              daysLeft={daysLeft}
            />
          </div>

          <Pengumuman
            items={peng}
            onDismiss={(id) => setPengumumanIds((ids) => ids.filter((x) => x !== id))}
          />

          <section className="dash-sec">
            <div className="dash-sec__head">
              <div className="dash-sec__eyebrow">Tugasan Hari Ini</div>
              <a className="dash-sec__cta" href="Tapisan-Senarai.php">Lihat semua →</a>
            </div>
            <TugasanList items={tugasan} />
          </section>

          <section className="dash-sec">
            <div className="dash-sec__head">
              <div className="dash-sec__eyebrow">Prestasi Anda</div>
              <a className="dash-sec__cta" href="Laporan.php">Laporan penuh →</a>
            </div>
            <KpiTiles kpi={kpi} />
            {data.tugasanTerakhir && <TugasanTerakhir data={data.tugasanTerakhir} />}
          </section>

          <LifetimeFooter data={data.lifetime} />
        </div>

        <aside className="ws-page__rail">
          <BakiCuti baki={data.baki} />
          <MiniKalendar today={data.today} markers={data.kalendarMarkers} />
          <CadanganAi text={data.cadanganAi[state]} state={state} />
        </aside>
      </div>

      {akuOpen && (
        window.AkuJanjiLegacy && akuVariant === 'legacy' ? (
          <AkuJanjiLegacy onDismiss={() => setAkuOpen(false)} />
        ) : window.AkuJanjiV2 ? (
          <AkuJanjiV2 onDismiss={() => setAkuOpen(false)} />
        ) : (
          <AkuJanji
            statements={data.akuJanji}
            onConfirm={() => setAkuOpen(false)}
            onDismiss={() => setAkuOpen(false)}
          />
        )
      )}
    </>
  );
}

Object.assign(window, { Dashboard });
