/* iLPF v2 — Tapisan List page (/app/permohonan/tapisan)
   Exposes window.TapisanList. */

const { useState: useStateTL, useMemo: useMemoTL } = React;

const STATUS_LABEL = {
  'lewat': 'Lewat',
  'hari-ini': 'Hari ini',
  'minggu-ini': 'Minggu ini',
  'akan-datang': 'Akan datang',
  'selesai': 'Selesai',
};

const JENIS_OPTIONS = ['Filem', 'Pita', 'TV', 'Iklan', 'Publisiti'];

function TapisanList() {
  const data = window.iLPF;
  const all = data.senaraiTapisan;

  const [statusFilter, setStatusFilter] = useStateTL('semua');
  const [jenisFilter, setJenisFilter] = useStateTL(null);
  const [search, setSearch] = useStateTL('');
  const [page, setPage] = useStateTL(1);
  const [aliranOpen, setAliranOpen] = useStateTL(false);

  // Status counts (across all rows, before search)
  const counts = useMemoTL(() => {
    const c = { semua: all.length, lewat: 0, 'hari-ini': 0, 'minggu-ini': 0, 'akan-datang': 0, selesai: 0 };
    for (const r of all) c[r.status] = (c[r.status] || 0) + 1;
    return c;
  }, [all]);

  const filtered = useMemoTL(() => {
    const term = search.trim().toLowerCase();
    return all.filter((r) => {
      if (statusFilter !== 'semua' && r.status !== statusFilter) return false;
      if (jenisFilter && r.jenis !== jenisFilter) return false;
      if (term) {
        const hay = [r.title, r.noPermohonan, r.pengedar, r.filmId, r.regNo].join(' ').toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
  }, [all, statusFilter, jenisFilter, search]);

  const perPage = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageRows = filtered.slice((page - 1) * perPage, page * perPage);

  React.useEffect(() => { setPage(1); }, [statusFilter, jenisFilter, search]);

  const lateTotal = counts.lewat || 0;
  const doneWeek = counts.selesai || 0;

  const I = window.Icons;

  const ctaCls = (r) => {
    if (r.status === 'lewat') return 'tap-row__cta--orange';
    if (r.status === 'selesai') return 'tap-row__cta--ghost';
    if (r.cta === 'Sambung' || r.cta === 'Sedia') return 'tap-row__cta--pine';
    return 'tap-row__cta--ghost';
  };

  return (
    <>
      <div className="ws-page is-tap">
        <div className="tap-head">
          <div>
            <h1 className="tap-head__title">Senarai Tapisan<span className="dot" /></h1>
            <p className="tap-head__sub">
              <strong>{counts.semua - doneWeek} tugasan</strong> dalam tangan
              {' · '}
              <span className="late">{lateTotal} lewat</span>
              {' · '}
              <strong>{doneWeek} selesai</strong> minggu ini
            </p>
          </div>
          <div className="tap-head__cluster">
            <button className="tap-head__btn"><I.doc /> Eksport</button>
            <button className="tap-head__btn"><I.menu /> Kolum</button>
          </div>
        </div>

        {/* Compact Aliran Proses */}
        <div className="tap-aliran">
          <span className="tap-aliran__eyebrow">Aliran Proses</span>
          <span className="tap-aliran__chip">
            <span className="n">7</span>
            Tapisan &amp; Laporan
          </span>
          <span className="tap-aliran__next">→ Pengesahan Laporan</span>
          <button className="tap-aliran__link" onClick={() => setAliranOpen(true)}>
            Lihat 11 langkah penuh ↗
          </button>
        </div>

        {/* Filters */}
        <div className="tap-filters">
          {['semua', 'lewat', 'hari-ini', 'minggu-ini', 'selesai'].map((s) => (
            <button
              key={s}
              className={`tap-chip ${statusFilter === s ? 'is-active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              <span>{s === 'semua' ? 'Semua' : STATUS_LABEL[s]}</span>
              <span className="tap-chip__count">{counts[s] || 0}</span>
            </button>
          ))}
          <div className="tap-filters__sep" />
          {JENIS_OPTIONS.map((j) => (
            <button
              key={j}
              className={`tap-chip ${jenisFilter === j ? 'is-active' : ''}`}
              onClick={() => setJenisFilter(jenisFilter === j ? null : j)}
            >
              <span>{j}</span>
            </button>
          ))}
          <div className="tap-search">
            <span className="tap-search__icon"><I.search /></span>
            <input
              type="text"
              placeholder="Cari tajuk, no. permohonan, pengedar…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="tap-table">
          <div className="tap-table__head">
            <div></div>
            <div className="tap-table__th">Tajuk</div>
            <div className="tap-table__th">Tujuan</div>
            <div className="tap-table__th">No. Permohonan</div>
            <div className="tap-table__th" style={{ textAlign: 'center' }}>Peranan</div>
            <div className="tap-table__th">Jenis</div>
            <div className="tap-table__th">Jangkaan Laporan</div>
            <div></div>
          </div>

          {pageRows.length === 0 ? (
            <div className="tap-empty">
              <div className="tap-empty__title">Tiada tugasan menepati penapis anda.<span className="dot" /></div>
              <div className="tap-empty__sub">Cuba ubah penapis atau buang semua.</div>
              <button
                className="tap-empty__btn"
                onClick={() => { setStatusFilter('semua'); setJenisFilter(null); setSearch(''); }}
              >
                <I.close /> Buang penapis
              </button>
            </div>
          ) : (
            pageRows.map((r) => (
              <a
                key={r.id}
                href={`Tapisan.php?id=${r.dbId}`}
                className={`tap-row ${r.status === 'lewat' ? 'is-late' : ''} ${r.status === 'selesai' ? 'is-done' : ''}`}
              >
                <div className="tap-row__panel">{r.panel}</div>
                <div>
                  <div className="tap-row__title">{r.title}</div>
                  <div className="tap-row__sub">
                    <span>{r.filmId}</span>
                    <span className="sep">·</span>
                    <span>{r.pengedar}</span>
                    <span className="sep">·</span>
                    <span>{r.regNo}</span>
                  </div>
                </div>
                <div className="tap-row__tujuan">{r.tujuan}</div>
                <div className="tap-row__no">{r.noPermohonan}</div>
                <div className="tap-row__role-cell">
                  <span className={`ws-role ws-role--${r.role}`}>
                    {r.role === 'ketua' ? 'Ketua Panel' : 'Ahli Panel'}
                  </span>
                </div>
                <div className="tap-row__jenis">{r.jenis}</div>
                <div className="tap-row__due">
                  {r.status === 'selesai' ? (
                    <>
                      <div className="tap-row__due-label">
                        <span className={`cls cls--${r.kls}`}>{r.kls}</span> {r.keputusan}
                      </div>
                      <div className="tap-row__due-sub">Selesai {r.selesai}</div>
                    </>
                  ) : (
                    <>
                      <div className="tap-row__due-label">{r.dueLabel}</div>
                      <div className="tap-row__due-sub">{r.dueSub}</div>
                    </>
                  )}
                </div>
                <div>
                  <span className={`tap-row__cta ${ctaCls(r)}`}>
                    {r.cta} {r.status !== 'selesai' ? <I.arrowR /> : null}
                  </span>
                </div>
              </a>
            ))
          )}

          {pageRows.length > 0 && (
            <div className="tap-page">
              <span>
                Paparan {(page - 1) * perPage + 1} hingga {Math.min(page * perPage, filtered.length)} daripada {filtered.length} rekod
              </span>
              <div className="tap-page__nav">
                <button className="tap-page__btn" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((p) => (
                  <button
                    key={p}
                    className={`tap-page__btn ${page === p ? 'is-active' : ''}`}
                    onClick={() => setPage(p)}
                  >{p}</button>
                ))}
                <button className="tap-page__btn" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>›</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {aliranOpen && (
        <AliranModal steps={data.aliranProses} onClose={() => setAliranOpen(false)} />
      )}
    </>
  );
}

Object.assign(window, { TapisanList });
