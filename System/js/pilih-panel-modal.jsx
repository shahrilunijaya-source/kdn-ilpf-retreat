/* iLPF v2 — Pilih Ahli Panel modal
   Exposes: PilihPanelModal */

const { useState: useStatePAP, useMemo: useMemoPAP } = React;

function PanelPreview({ member, data, onClose }) {
  const pct = member.attend;
  const badgeStyle = (k) => {
    if (!k) return {};
    if (k === 'U')  return { background: 'var(--teal)', color: '#fff' };
    if (k === 'TU') return { background: 'var(--orange)', color: '#fff' };
    return { background: '#e8902b', color: '#fff' };
  };
  return (
    <div className="pap-preview-back" onClick={onClose}>
      <div className="pap-preview-card" onClick={(e) => e.stopPropagation()}>
        <div className="pap-preview__head">
          <div className="pap-preview__head-top">
            <span className="pap-preview__sup">PROFIL RINGKAS · CALON AHLI PANEL</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <a href={`Profil.php?id=${member.userId}`} target="_blank" className="pap-preview__full-link">Profil penuh ↗</a>
              <button className="pap-preview__close" onClick={onClose}>×</button>
            </div>
          </div>
          <div className="pap-preview__subtitle">Pratonton pandangan rakan <span style={{ color: '#e8902b' }}>●</span></div>
        </div>

        <div className="pap-preview__body">
          <div className="pap-preview__profile">
            <div className="pap-preview__avatar">{member.initials}</div>
            <div>
              <div className="pap-preview__name">{member.name}</div>
              <div className="pap-preview__alpf">
                ALPF sejak {member.sejak}{member.penggal ? ' · Penggal ' + member.penggal : ''}
              </div>
              <div className="pap-preview__pills">
                {member.expertise.map((e) => <span key={e} className="pap-row__pill">{e}</span>)}
              </div>
            </div>
          </div>

          <div className="pap-preview__divider" />

          <div className="pap-preview__section-label">BEBAN KERJA SEMASA</div>
          <div className="pap-preview__stat-grid">
            <div className="pap-preview__stat-box">
              <div className="pap-preview__stat-label">DALAM TANGAN</div>
              <div className="pap-preview__stat-val">{member.beban}</div>
            </div>
            <div className="pap-preview__stat-box">
              <div className="pap-preview__stat-label">LEWAT</div>
              <div className="pap-preview__stat-val" style={{ color: data && data.lewat > 0 ? 'var(--orange)' : 'var(--ink)' }}>
                {data ? data.lewat : '—'}
              </div>
            </div>
            <div className="pap-preview__stat-box">
              <div className="pap-preview__stat-label">MINGGU INI</div>
              <div className="pap-preview__stat-val">{data ? data.minggu_ini : '—'}</div>
            </div>
          </div>

          <div className="pap-preview__divider" />

          <div className="pap-preview__section-label">KADAR KEHADIRAN (12 BULAN)</div>
          <div className="pap-preview__attend-row">
            <span style={{ fontSize: 12, color: 'var(--mute)' }}>Hadir dan selesai</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--teal)' }}>{pct}%</span>
          </div>
          <div className="pap-preview__bar">
            <div className="pap-preview__bar-fill" style={{ width: `${pct}%` }} />
          </div>
          {data && (
            <div style={{ fontSize: 11, color: 'var(--mute)', marginTop: 6 }}>
              {data.selesai} sesi dihadiri · 0 tidak dihadiri · {data.lewat_laporan} lewat hantar laporan
            </div>
          )}

          {data && data.tapisan_terkini.length > 0 && (
            <>
              <div className="pap-preview__divider" />
              <div className="pap-preview__section-label">{data.tapisan_terkini.length} TAPISAN TERKINI</div>
              <div className="pap-preview__films">
                {data.tapisan_terkini.map((f, i) => (
                  <div key={i} className="pap-preview__film">
                    <div>
                      <div className="pap-preview__film-title">{f.tajuk}</div>
                      <div className="pap-preview__film-date">{f.tarikh}</div>
                    </div>
                    {f.klasifikasi && (
                      <span className="pap-preview__badge" style={badgeStyle(f.klasifikasi)}>{f.klasifikasi}</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PilihPanelModal({ pool, excludeIds = [], onClose, onPick }) {
  const I = window.Icons;
  const [query, setQuery] = useStatePAP('');
  const [preview, setPreview] = useStatePAP(null);
  const [previewData, setPreviewData] = useStatePAP(null);

  React.useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') { if (preview) setPreview(null); else onClose(); }
    };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose, preview]);

  const openPreview = (p, e) => {
    e.stopPropagation();
    setPreview(p);
    setPreviewData(null);
    fetch(`api/panel-profile.php?user_id=${p.userId}`)
      .then((r) => r.json())
      .then((d) => setPreviewData(d))
      .catch(() => {});
  };

  const rows = useMemoPAP(() => {
    const q = query.trim().toLowerCase();
    return pool.filter((p) => {
      if (excludeIds.includes(p.id)) return false;
      if (!q) return true;
      const hay = (p.name + ' ' + p.expertise.join(' ')).toLowerCase();
      return hay.includes(q);
    });
  }, [pool, query, excludeIds]);

  return (
    <>
      <div className="modal-back" onClick={onClose}>
        <div className="modal-card" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <div className="modal-head__title">Pilih Ahli Panel<span className="dot" /></div>
              <div className="modal-head__sub">{rows.length} calon · cari mengikut nama atau kepakaran</div>
            </div>
            <button className="modal-head__close" onClick={onClose}><I.close /></button>
          </div>
          <div className="modal-body">
            <div className="pap-search">
              <span className="pap-search__icon"><I.search /></span>
              <input
                type="text"
                placeholder="Cari nama, kepakaran (cth: Bahasa, Keagamaan, Tamil)…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>

            {rows.length === 0 ? (
              <div className="pap-empty">
                Tiada calon menepati carian. Cuba kata kunci lain.
              </div>
            ) : (
              rows.map((p) => (
                <div key={p.id} className="pap-row" onClick={() => onPick(p)}>
                  <div className="pap-row__avatar">{p.initials}</div>
                  <div>
                    <div className="pap-row__name">{p.name}</div>
                    <div className="pap-row__meta">
                      {p.expertise.map((e) => <span key={e} className="pap-row__pill">{e}</span>)}
                      <span style={{ color: 'var(--mute-2)' }}>· Sejak {p.sejak}</span>
                    </div>
                    <a className="pap-row__pratonton" onClick={(e) => openPreview(p, e)}>
                      Pratonton pandangan rakan
                    </a>
                  </div>
                  <div className={`pap-row__stat ${p.beban === 0 ? 'is-ok' : p.beban >= 3 ? 'is-warn' : ''}`}>
                    <span className="num">{p.beban}</span>
                    dalam tangan
                  </div>
                  <div className={`pap-row__stat ${p.attend >= 95 ? 'is-ok' : ''}`}>
                    <span className="num">{p.attend}%</span>
                    hadir
                  </div>
                  <div className="pap-row__arrow">→</div>
                </div>
              ))
            )}
          </div>
          <div className="modal-foot">
            <button className="modal-foot__btn" onClick={onClose}>Batal</button>
          </div>
        </div>
      </div>
      {preview && (
        <PanelPreview member={preview} data={previewData} onClose={() => setPreview(null)} />
      )}
    </>
  );
}

Object.assign(window, { PilihPanelModal });
