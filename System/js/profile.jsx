/* iLPF v2 — Profile page (/app/profil)
   Self view with 5 tabs + peer-view slide-out drawer.
   Exposes window.Profile component. */

const { useState: useStateProfil, useMemo: useMemoProfil } = React;

/* ---------- Identity card (left column) ------------------------------- */

function IdentityCard({ me, daysLeft, tamatLabel }) {
  const fmt = (d) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  const status =
    daysLeft < 14 ? "tempoh akhir"
    : daysLeft < 60 ? "tahun terakhir"
    : "layak diperbaharui";
  const bigText =
    daysLeft < 60 ? `${daysLeft} hari lagi` :
    daysLeft < 90 ? `${Math.floor(daysLeft / 30)} bulan ${Math.floor((daysLeft % 30) / 7)} mgg`
    : `${Math.floor(daysLeft / 365)} tahun ${Math.floor((daysLeft % 365) / 30)} bulan`;
  return (
    <aside className="profil-id">
      <div className="profil-id__photo"><img src="assets/mnasir.jpg" alt={me.initials} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} /></div>
      <div className="profil-id__name">{me.name}</div>
      <div className="profil-id__alpf">{me.alpfId}</div>
      <div className="profil-id__pills">
        {me.expertise.map((p, i) => <span key={i} className="profil-id__pill">{p}</span>)}
      </div>
      <div className="profil-id__sep" />
      <div className="profil-id__rows">
        <div className="profil-id__row"><span className="k">Pelantikan</span><span className="v">{fmt(me.pelantikan)}</span></div>
        <div className="profil-id__row"><span className="k">Tamat</span><span className="v">{tamatLabel}</span></div>
        <div className="profil-id__row"><span className="k">Penggal</span><span className="v">{me.penggal}</span></div>
      </div>
      <div className="profil-id__countdown">
        <div className="eyebrow">Baki Pelantikan</div>
        <div className="big">{bigText}</div>
        <div className="sub">{daysLeft} hari · {status}</div>
      </div>
    </aside>
  );
}

/* ---------- Tab strip -------------------------------------------------- */

const TABS = [
  { id: 'maklumat', label: 'Maklumat saya' },
  { id: 'akademik', label: 'Akademik' },
  { id: 'pekerjaan', label: 'Pekerjaan' },
  { id: 'keluarga', label: 'Keluarga' },
  { id: 'akaun', label: 'Akaun' },
];

function TabStrip({ active, onChange }) {
  return (
    <div className="profil-tabs" role="tablist">
      {TABS.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={active === t.id}
          className={`profil-tab ${active === t.id ? 'is-active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Maklumat saya tab ----------------------------------------- */

function MaklumatTab({ profil, onOpenPeer }) {
  const I = window.Icons;
  return (
    <>
      {/* Prestasi sepanjang pelantikan */}
      <section className="profil-sec">
        <div className="profil-sec__head">
          <div className="profil-sec__eyebrow">Prestasi sepanjang pelantikan</div>
        </div>
        <div className="dash-kpis">
          {profil.prestasiLifetime.map((t, i) => (
            <div key={i} className={`dash-kpi ${t.warn ? 'is-warn' : ''} ${t.ok ? 'is-ok' : ''}`}>
              <div className="dash-kpi__eyebrow">{t.eyebrow}</div>
              <div className="dash-kpi__value">{t.value}</div>
              <div className="dash-kpi__sub">{t.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Visibility strip */}
      <div className="profil-vis">
        <span className="profil-vis__icon"><I.shield /></span>
        <span>
          Maklumat di bawah dipaparkan kepada pegawai lain hanya apabila mereka
          melantik anda sebagai ahli panel. Anda boleh{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); onOpenPeer(); }} style={{ color: 'var(--pine)', fontWeight: 600, textDecoration: 'underline' }}>
            prabaca pandangan rakan
          </a>{' '}
          untuk melihat apa yang mereka nampak.
        </span>
      </div>

      {/* Maklumat peribadi */}
      <section className="profil-sec">
        <div className="profil-sec__head">
          <div className="profil-sec__eyebrow">Maklumat peribadi</div>
        </div>
        <div className="profil-card">
          <div className="profil-fields">
            {profil.peribadi.map((f, i) => (
              <div key={i} className={`profil-field ${f.full ? 'full' : ''}`}>
                <div className="profil-field__k">{f.label}</div>
                <div className="profil-field__v">
                  <span>{f.value}</span>
                  {f.priv && <span className="profil-priv">peribadi</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Peranan */}
      <section className="profil-sec">
        <div className="profil-sec__head">
          <div className="profil-sec__eyebrow">Peranan</div>
        </div>
        <div className="profil-peranan">
          {profil.peranan.map((p, i) => (
            <div key={i} className="profil-peranan__row">{p}</div>
          ))}
        </div>
      </section>

      <div className="profil-actions">
        <button className="profil-actions__primary">
          <I.user /> Kemaskini maklumat
        </button>
        <button className="profil-actions__ghost" onClick={onOpenPeer}>
          <I.shield /> Pandangan rakan
        </button>
      </div>
    </>
  );
}

/* ---------- Akademik tab ---------------------------------------------- */

function AkademikTab({ items }) {
  return (
    <div className="profil-rep">
      {items.map((a, i) => (
        <div key={i} className="profil-rep__row">
          <div className="profil-rep__top">
            <div className="profil-rep__title">{a.tahap} · {a.bidang}</div>
            <div className="profil-rep__when">{a.tahun}</div>
          </div>
          <div className="profil-rep__org">{a.institusi}</div>
        </div>
      ))}
      <button className="profil-rep__add">+ Tambah kelayakan</button>
    </div>
  );
}

/* ---------- Pekerjaan tab --------------------------------------------- */

function PekerjaanTab({ items }) {
  return (
    <div className="profil-rep">
      {items.map((p, i) => (
        <div key={i} className="profil-rep__row">
          <div className="profil-rep__top">
            <div className="profil-rep__title">{p.jawatan}</div>
            <div className="profil-rep__when">{p.dari} – {p.hingga}</div>
          </div>
          <div className="profil-rep__org">{p.organisasi}</div>
          <div className="profil-rep__meta">{p.sektor}</div>
          <div className="profil-rep__desc">{p.desc}</div>
        </div>
      ))}
      <button className="profil-rep__add">+ Tambah jawatan</button>
    </div>
  );
}

/* ---------- Keluarga tab ---------------------------------------------- */

function KeluargaTab({ items }) {
  return (
    <div className="profil-rep">
      {items.map((k, i) => (
        <div key={i} className="profil-rep__row">
          <div className="profil-rep__top">
            <div className="profil-rep__title">{k.nama}</div>
            <div className="profil-rep__when">{k.hubungan}</div>
          </div>
          <div className="profil-rep__meta">No. KP: {k.kp} · Lahir: {k.lahir}</div>
        </div>
      ))}
      <button className="profil-rep__add">+ Tambah ahli keluarga</button>
    </div>
  );
}

/* ---------- Akaun tab ------------------------------------------------- */

function AkaunTab({ sesi }) {
  const [twoFA, setTwoFA] = useStateProfil(true);
  const [tema, setTema] = useStateProfil("light");
  const [bahasa, setBahasa] = useStateProfil("BM");
  return (
    <>
      {/* Tukar kata laluan */}
      <div className="profil-block">
        <div className="profil-block__head">
          <div>
            <div className="profil-block__title">Tukar kata laluan</div>
            <div className="profil-block__sub">Dikemaskini 5 bulan lalu</div>
          </div>
        </div>
        <div className="profil-fields" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="field">
            <label className="field__label">Kata laluan semasa</label>
            <input className="field__input" type="password" placeholder="••••••••" />
          </div>
          <div className="field">
            <label className="field__label">Baharu</label>
            <input className="field__input" type="password" placeholder="Min 12 aksara" />
          </div>
          <div className="field">
            <label className="field__label">Sahkan baharu</label>
            <input className="field__input" type="password" placeholder="Ulang" />
          </div>
        </div>
        <button className="profil-actions__primary" style={{ marginTop: 14 }}>Simpan kata laluan baharu</button>
      </div>

      {/* Pengesahan 2 langkah */}
      <div className="profil-block">
        <div className="profil-block__head">
          <div>
            <div className="profil-block__title">Pengesahan 2 langkah</div>
            <div className="profil-block__sub">SMS ke +60 16-221 7576 · disiapkan 5 Julai 2024</div>
          </div>
          <div className={`toggle ${twoFA ? 'is-on' : ''}`} onClick={() => setTwoFA(!twoFA)} role="switch" aria-checked={twoFA} />
        </div>
      </div>

      {/* Tema + Bahasa */}
      <div className="profil-block">
        <div className="profil-block__head">
          <div>
            <div className="profil-block__title">Antara muka</div>
            <div className="profil-block__sub">Disimpan untuk akaun ini</div>
          </div>
        </div>
        <div className="profil-block__row">
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Tema</div>
            <div style={{ fontSize: 11.5, color: 'var(--mute)' }}>Light · Dark · Auto</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['light', 'dark', 'auto'].map((v) => (
              <button
                key={v}
                onClick={() => setTema(v)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 500,
                  border: '1px solid var(--line)',
                  background: tema === v ? 'var(--pine)' : '#fff',
                  color: tema === v ? '#fff' : 'var(--ink)',
                }}
              >{v}</button>
            ))}
          </div>
        </div>
        <div className="profil-block__row">
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Bahasa antara muka</div>
            <div style={{ fontSize: 11.5, color: 'var(--mute)' }}>BM (default) atau English</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['BM', 'EN'].map((v) => (
              <button
                key={v}
                onClick={() => setBahasa(v)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 500,
                  border: '1px solid var(--line)',
                  background: bahasa === v ? 'var(--pine)' : '#fff',
                  color: bahasa === v ? '#fff' : 'var(--ink)',
                }}
              >{v}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Sesi aktif */}
      <div className="profil-block">
        <div className="profil-block__head">
          <div>
            <div className="profil-block__title">Sesi aktif</div>
            <div className="profil-block__sub">Log keluar daripada peranti yang tidak dikenali</div>
          </div>
        </div>
        <div className="profil-sesi">
          {sesi.map((s, i) => (
            <div key={i} className={`profil-sesi__row ${s.current ? 'is-current' : ''}`}>
              <div className="device">{s.device}</div>
              <div className="ip">{s.ip}</div>
              <div className="last">{s.last}</div>
              {!s.current && (
                <button className="profil-sesi__kill">Tamatkan</button>
              )}
              {s.current && <span style={{ fontSize: 10.5, color: 'var(--mute)', letterSpacing: '0.06em' }}>SEMASA</span>}
            </div>
          ))}
        </div>
        <button className="profil-danger-btn" style={{ marginTop: 14 }}>
          Log keluar daripada semua peranti
        </button>
      </div>
    </>
  );
}

/* ---------- Peer drawer ------------------------------------------------ */

function PeerDrawer({ peer, onClose }) {
  const I = window.Icons;
  const initials = peer.me.name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <>
      <div className="peer-backdrop" onClick={onClose} />
      <aside className="peer-drawer" role="dialog" aria-label="Profil ringkas">
        <div className="peer-head">
          <div>
            <div className="peer-head__eyebrow">Profil ringkas · Calon ahli panel</div>
            <div className="peer-head__title">Pratonton pandangan rakan</div>
          </div>
          <div className="peer-head__cluster">
            <a className="peer-head__link" href="Profil.php" target="_blank">Profil penuh ↗</a>
            <button className="peer-head__close" onClick={onClose} aria-label="Tutup">
              <I.close />
            </button>
          </div>
        </div>

        <div className="peer-body">
          <div className="peer-identity">
            <div className="peer-avatar"><img src="assets/mnasir.jpg" alt={initials} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} /></div>
            <div>
              <div className="peer-identity__name">{peer.me.name}</div>
              <div className="peer-identity__sub">
                ALPF sejak {peer.me.since} · Penggal {peer.me.penggal}
              </div>
              <div className="peer-identity__pills">
                {[...peer.me.expertise, ...peer.me.bahasa].map((p, i) => (
                  <span key={i} className="peer-pill">{p}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="peer-sec">
            <div className="peer-sec__eyebrow">Beban kerja semasa</div>
            <div className="peer-beban">
              <div className="peer-tile">
                <div className="peer-tile__eyebrow">Dalam tangan</div>
                <div className="peer-tile__value">{peer.beban.tangan}</div>
              </div>
              <div className={`peer-tile ${peer.beban.lewat > 0 ? 'is-warn' : ''}`}>
                <div className="peer-tile__eyebrow">Lewat</div>
                <div className="peer-tile__value">{peer.beban.lewat}</div>
              </div>
              <div className="peer-tile">
                <div className="peer-tile__eyebrow">Minggu ini</div>
                <div className="peer-tile__value">{peer.beban.mingguIni}</div>
              </div>
            </div>
          </div>

          <div className="peer-sec">
            <div className="peer-sec__eyebrow">Kadar kehadiran (12 bulan)</div>
            <div className="peer-kehadiran">
              <div className="peer-kehadiran__top">
                <div className="peer-kehadiran__label">Hadir dan selesai</div>
                <div className="peer-kehadiran__pct">{peer.kehadiran.pct}%</div>
              </div>
              <div className="peer-kehadiran__bar">
                <div className="peer-kehadiran__fill" style={{ width: `${peer.kehadiran.pct}%` }} />
              </div>
              <div className="peer-kehadiran__sub">
                {peer.kehadiran.hadir} sesi dihadiri · {peer.kehadiran.tidakHadir} tidak dihadiri · {peer.kehadiran.lewatLapor} lewat hantar laporan
              </div>
            </div>
          </div>

          <div className="peer-sec">
            <div className="peer-sec__eyebrow">3 tapisan terkini</div>
            <div className="peer-terkini">
              {peer.terkini.map((t, i) => (
                <div key={i} className="peer-terkini__row">
                  <div>
                    <div className="t">{t.title}</div>
                    <div className="d">{t.date}</div>
                  </div>
                  <span className={`cls cls--${t.kls}`}>{t.kls}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="peer-cta">
          <button className="peer-cta__primary">
            Lantik sebagai Ahli Panel <I.arrowR />
          </button>
          <button className="peer-cta__alt" onClick={onClose}>← Pilih ALPF lain</button>
        </div>
      </aside>
    </>
  );
}

/* ---------- Profile root ---------------------------------------------- */

function Profile() {
  const data = window.iLPF;
  const [tab, setTab] = useStateProfil('maklumat');
  const [peerOpen, setPeerOpen] = useStateProfil(false);

  const tamat      = new Date(data.me.tamat);
  const pelantikan = new Date(data.me.pelantikan);
  const today      = new Date();
  const me         = { ...data.me, tamat, pelantikan };

  const daysLeft   = Math.round((tamat - today) / 86400000);
  const tamatLabel = `${String(tamat.getDate()).padStart(2, '0')}/${String(tamat.getMonth() + 1).padStart(2, '0')}/${tamat.getFullYear()}`;

  return (
    <>
      <div className="ws-page is-profil">
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--pine)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Profil saya<span className="dot" />
          </h1>
          <p style={{ fontSize: 13.5, color: 'var(--mute)', margin: 0 }}>
            Maklumat peribadi, kelayakan dan tetapan akaun anda.
          </p>
        </div>

        <div className="profil-grid">
          <IdentityCard me={me} daysLeft={daysLeft} tamatLabel={tamatLabel} />
          <div className="profil-main">
            <TabStrip active={tab} onChange={setTab} />
            {tab === 'maklumat' && <MaklumatTab profil={data.profil} onOpenPeer={() => setPeerOpen(true)} />}
            {tab === 'akademik' && <AkademikTab items={data.profil.akademik} />}
            {tab === 'pekerjaan' && <PekerjaanTab items={data.profil.pekerjaan} />}
            {tab === 'keluarga' && <KeluargaTab items={data.profil.keluarga} />}
            {tab === 'akaun' && <AkaunTab sesi={data.profil.sesi} />}
          </div>
        </div>
      </div>

      {peerOpen && <PeerDrawer peer={data.peerView} onClose={() => setPeerOpen(false)} />}
    </>
  );
}

Object.assign(window, { Profile });
