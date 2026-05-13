/* iLPF v2 — Laporan Penapisan (print-ready PDF view)
   Exposes: LaporanPage */

const PEMBERAT_LABELS = {
  ganas: 'Ganas', seram: 'Seram', ngeri: 'Ngeri',
  seksual: 'Seksual', kebogelan: 'Kebogelan',
  dadah: 'Dadah', rokok: 'Rokok', arak: 'Arak',
  bahasa: 'Bahasa', lain: 'Lain-lain',
};
const PEMBERAT_SCALE = ['Tiada', 'Rendah', 'Sederhana', 'Tinggi'];

const KEP_FULL = { LBP: 'Lulus Bersih', LDP: 'Lulus Dengan Pengubahan', TUT: 'Tidak Lulus' };

function klasBg(k) {
  if (k === 'U')   return { background: '#1a7a5e', color: '#fff' };
  if (k === 'P12') return { background: '#2e7d32', color: '#fff' };
  if (k === '13')  return { background: '#e8902b', color: '#fff' };
  if (k === '16')  return { background: '#c0392b', color: '#fff' };
  if (k === '18')  return { background: '#7b1a1a', color: '#fff' };
  return { background: '#555', color: '#fff' };
}

function LaporanPage({ assignmentId }) {
  const ts = window.iLPF.tapisanScreen;

  if (!ts) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>
        <p>Tiada data tapisan. Sila buka laporan melalui skrin tapisan.</p>
        <a href="Tapisan-Senarai.php" style={{ color: '#1a7a5e' }}>← Kembali ke senarai</a>
      </div>
    );
  }

  const { info, aiPengubahan, manualPengubahan, aiSinopsis, aiGenre, aiTema,
          aiKeputusan, panelSemasa, decision } = ts;

  const kep = decision || aiKeputusan;
  const allEdits = [...(aiPengubahan || []), ...(manualPengubahan || [])];
  const pemberat = kep?.pemberat || {};

  return (
    <>
      <style>{`
        @media print {
          .lap-no-print { display: none !important; }
          body { background: #fff !important; }
          .lap-page { box-shadow: none !important; margin: 0 !important; }
        }
        .lap-wrap { background: #f4f5f7; min-height: 100vh; padding: 32px 16px; }
        .lap-toolbar {
          max-width: 780px; margin: 0 auto 16px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .lap-toolbar a { font-size: 13px; color: var(--teal); text-decoration: none; }
        .lap-toolbar a:hover { text-decoration: underline; }
        .lap-print-btn {
          background: var(--pine-deep); color: #fff;
          border-radius: 8px; padding: 10px 20px;
          font-size: 13px; font-weight: 700; cursor: pointer;
        }
        .lap-print-btn:hover { opacity: 0.88; }
        .lap-page {
          background: #fff; max-width: 780px; margin: 0 auto;
          box-shadow: 0 2px 20px rgba(0,0,0,0.12);
          border-radius: 4px; overflow: hidden;
        }

        /* Header */
        .lap-head {
          background: var(--pine-deep); color: #fff;
          padding: 24px 36px 20px; display: flex;
          justify-content: space-between; align-items: flex-start;
        }
        .lap-head__org { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; opacity: 0.65; text-transform: uppercase; margin-bottom: 6px; }
        .lap-head__title { font-size: 18px; font-weight: 800; letter-spacing: 0.02em; }
        .lap-head__sub { font-size: 12px; opacity: 0.7; margin-top: 4px; }
        .lap-head__badge {
          border: 2px solid rgba(255,255,255,0.4);
          border-radius: 8px; padding: 10px 18px; text-align: center;
        }
        .lap-head__kls { font-size: 28px; font-weight: 900; line-height: 1; }
        .lap-head__kls-label { font-size: 9px; font-weight: 600; letter-spacing: 0.08em; opacity: 0.65; text-transform: uppercase; margin-top: 3px; }

        /* Body */
        .lap-body { padding: 28px 36px; }
        .lap-section { margin-bottom: 26px; }
        .lap-section-title {
          font-size: 9.5px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--mute);
          border-bottom: 1px solid var(--line); padding-bottom: 6px; margin-bottom: 14px;
        }
        .lap-info-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        }
        .lap-info-row { display: flex; flex-direction: column; gap: 2px; }
        .lap-info-row__key { font-size: 10px; font-weight: 600; color: var(--mute); text-transform: uppercase; letter-spacing: 0.06em; }
        .lap-info-row__val { font-size: 13px; font-weight: 600; color: var(--ink); }

        /* Panel */
        .lap-panel-grid { display: flex; gap: 12px; flex-wrap: wrap; }
        .lap-panel-card {
          border: 1px solid var(--line); border-radius: 8px;
          padding: 12px 16px; display: flex; align-items: center; gap: 12px;
          flex: 1; min-width: 200px;
        }
        .lap-panel-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--teal-soft); color: var(--pine);
          font-size: 12px; font-weight: 700;
          display: grid; place-items: center; flex-shrink: 0;
        }
        .lap-panel-name { font-size: 12.5px; font-weight: 600; color: var(--ink); }
        .lap-panel-role { font-size: 10.5px; color: var(--mute); margin-top: 2px; }

        /* Pengubahan table */
        .lap-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .lap-table th {
          background: var(--paper-2); font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase; color: var(--mute);
          padding: 8px 10px; text-align: left; border-bottom: 1px solid var(--line);
        }
        .lap-table td {
          padding: 9px 10px; border-bottom: 1px solid var(--line);
          vertical-align: top; color: var(--ink);
        }
        .lap-table tr:last-child td { border-bottom: 0; }
        .lap-tindakan {
          display: inline-block; padding: 2px 8px; border-radius: 4px;
          font-size: 10px; font-weight: 700;
          background: var(--paper-2); color: var(--mute);
        }
        .lap-tindakan--potong { background: #fee2e2; color: #b91c1c; }
        .lap-tindakan--blur   { background: #fef3c7; color: #92400e; }
        .lap-tindakan--senyap { background: #ede9fe; color: #5b21b6; }
        .lap-tindakan--psa    { background: #d1fae5; color: #065f46; }
        .lap-empty-row { text-align: center; padding: 24px; color: var(--mute); font-size: 12px; }

        /* Pemberat */
        .lap-pemberat-grid {
          display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px;
        }
        .lap-pemberat-item {
          border: 1px solid var(--line); border-radius: 6px;
          padding: 8px 10px; text-align: center;
        }
        .lap-pemberat-item.is-active { border-color: var(--orange); background: #fff8f0; }
        .lap-pemberat-label { font-size: 9.5px; font-weight: 600; color: var(--mute); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .lap-pemberat-val { font-size: 13px; font-weight: 700; color: var(--ink); }
        .lap-pemberat-item.is-active .lap-pemberat-val { color: var(--orange); }

        /* Keputusan banner */
        .lap-kep-banner {
          background: var(--pine-deep); color: #fff;
          border-radius: 8px; padding: 16px 20px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .lap-kep-code { font-size: 22px; font-weight: 900; }
        .lap-kep-name { font-size: 12px; opacity: 0.75; margin-top: 2px; }

        /* Signatures */
        .lap-sig-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 8px; }
        .lap-sig-box { border-top: 1.5px solid var(--ink); padding-top: 8px; }
        .lap-sig-name { font-size: 12px; font-weight: 600; color: var(--ink); }
        .lap-sig-role { font-size: 10.5px; color: var(--mute); margin-top: 2px; }
        .lap-sig-space { height: 48px; }

        /* Sinopsis */
        .lap-prose { font-size: 12.5px; line-height: 1.7; color: var(--ink); }
        .lap-pills { display: flex; flex-wrap: wrap; gap: 6px; }
        .lap-pill {
          padding: 4px 12px; border-radius: 999px;
          background: var(--teal-soft); color: var(--pine);
          font-size: 11px; font-weight: 600;
        }

        /* Footer */
        .lap-foot {
          background: var(--paper-2); border-top: 1px solid var(--line);
          padding: 14px 36px; display: flex; justify-content: space-between;
          font-size: 10.5px; color: var(--mute);
        }
      `}</style>

      <div className="lap-wrap">
        <div className="lap-toolbar lap-no-print">
          <a href={`Tapisan.php?id=${assignmentId}`}>← Kembali ke skrin tapisan</a>
          <button className="lap-print-btn" onClick={() => window.print()}>
            Cetak / Simpan PDF ↓
          </button>
        </div>

        <div className="lap-page">
          {/* Header */}
          <div className="lap-head">
            <div>
              <div className="lap-head__org">Kementerian Dalam Negeri · Lembaga Penapisan Filem</div>
              <div className="lap-head__title">Laporan Penapisan</div>
              <div className="lap-head__sub">{info.noPermohonan} · {info.pengedar}</div>
            </div>
            {kep?.klasifikasi && (
              <div className="lap-head__badge" style={klasBg(kep.klasifikasi)}>
                <div className="lap-head__kls">{kep.klasifikasi}</div>
                <div className="lap-head__kls-label">Klasifikasi</div>
              </div>
            )}
          </div>

          <div className="lap-body">
            {/* Film info */}
            <div className="lap-section">
              <div className="lap-section-title">Maklumat Filem</div>
              <div className="lap-info-grid">
                <div className="lap-info-row">
                  <span className="lap-info-row__key">Tajuk</span>
                  <span className="lap-info-row__val">{info.title}</span>
                </div>
                <div className="lap-info-row">
                  <span className="lap-info-row__key">No. Permohonan</span>
                  <span className="lap-info-row__val">{info.noPermohonan}</span>
                </div>
                <div className="lap-info-row">
                  <span className="lap-info-row__key">Pengedar</span>
                  <span className="lap-info-row__val">{info.pengedar}</span>
                </div>
                <div className="lap-info-row">
                  <span className="lap-info-row__key">Tarikh Hantar</span>
                  <span className="lap-info-row__val">{info.tarikhHantar || '—'}</span>
                </div>
                <div className="lap-info-row">
                  <span className="lap-info-row__key">Jenis</span>
                  <span className="lap-info-row__val">{info.perakuan}</span>
                </div>
                <div className="lap-info-row">
                  <span className="lap-info-row__key">Kategori</span>
                  <span className="lap-info-row__val">{(info.kategori || []).join(' · ')}</span>
                </div>
              </div>
            </div>

            {/* Panel */}
            <div className="lap-section">
              <div className="lap-section-title">Ahli Panel</div>
              <div className="lap-panel-grid">
                {panelSemasa.ketua && (
                  <div className="lap-panel-card">
                    <div className="lap-panel-avatar">{panelSemasa.ketua.initials}</div>
                    <div>
                      <div className="lap-panel-name">{panelSemasa.ketua.name}</div>
                      <div className="lap-panel-role">Ketua Panel</div>
                    </div>
                  </div>
                )}
                {(panelSemasa.ahli || []).filter(Boolean).map((a, i) => (
                  <div key={i} className="lap-panel-card">
                    <div className="lap-panel-avatar" style={{ background: 'var(--teal)', color: 'var(--pine-deep)' }}>
                      {a.initials}
                    </div>
                    <div>
                      <div className="lap-panel-name">{a.name}</div>
                      <div className="lap-panel-role">Ahli Panel</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sinopsis */}
            <div className="lap-section">
              <div className="lap-section-title">Sinopsis</div>
              <p className="lap-prose">{aiSinopsis?.text || '—'}</p>
            </div>

            {/* Genre & Tema */}
            <div className="lap-section">
              <div className="lap-section-title">Genre &amp; Tema</div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Genre</div>
                  <div className="lap-pills">
                    {(aiGenre?.top3 || []).map((g) => <span key={g} className="lap-pill">{g}</span>)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Tema</div>
                  <div className="lap-pills">
                    {(aiTema?.top3 || []).map((t) => <span key={t} className="lap-pill">{t}</span>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Senarai Pengubahan */}
            <div className="lap-section">
              <div className="lap-section-title">Senarai Pengubahan ({allEdits.length})</div>
              {allEdits.length === 0 ? (
                <div className="lap-empty-row">Tiada pengubahan direkodkan.</div>
              ) : (
                <table className="lap-table">
                  <thead>
                    <tr>
                      <th>Bil</th>
                      <th>Dari</th>
                      <th>Hingga</th>
                      <th>Tindakan</th>
                      <th>Adegan</th>
                      <th>Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allEdits.map((e, i) => {
                      const t = (e.tindakan || '').toLowerCase();
                      let cls = '';
                      if (t.includes('potong')) cls = 'lap-tindakan--potong';
                      else if (t.includes('kabur')) cls = 'lap-tindakan--blur';
                      else if (t.includes('senyap')) cls = 'lap-tindakan--senyap';
                      else if (t.includes('psa')) cls = 'lap-tindakan--psa';
                      return (
                        <tr key={i}>
                          <td>{e.bil}</td>
                          <td style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>{e.dan}</td>
                          <td style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>{e.hingga}</td>
                          <td><span className={`lap-tindakan ${cls}`}>{e.tindakan}</span></td>
                          <td>{e.adegan}</td>
                          <td style={{ color: 'var(--mute)', fontSize: 11 }}>{e.desc}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pemberat */}
            <div className="lap-section">
              <div className="lap-section-title">Pemberat Kandungan</div>
              <div className="lap-pemberat-grid">
                {Object.entries(PEMBERAT_LABELS).map(([id, label]) => {
                  const val = (pemberat[id] || 0);
                  return (
                    <div key={id} className={`lap-pemberat-item ${val > 0 ? 'is-active' : ''}`}>
                      <div className="lap-pemberat-label">{label}</div>
                      <div className="lap-pemberat-val">{PEMBERAT_SCALE[val] || 'Tiada'}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Keputusan */}
            <div className="lap-section">
              <div className="lap-section-title">Keputusan</div>
              <div className="lap-kep-banner">
                <div>
                  <div className="lap-kep-code">{kep?.keputusan || '—'}</div>
                  <div className="lap-kep-name">{KEP_FULL[kep?.keputusan] || 'Belum diputuskan'}</div>
                </div>
                {kep?.klasifikasi && (
                  <div style={{ ...klasBg(kep.klasifikasi), padding: '10px 20px', borderRadius: 8, textAlign: 'center' }}>
                    <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1 }}>{kep.klasifikasi}</div>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', opacity: 0.75, marginTop: 3, textTransform: 'uppercase' }}>Klasifikasi</div>
                  </div>
                )}
              </div>
              {kep?.text && (
                <p className="lap-prose" style={{ marginTop: 12, color: 'var(--mute)' }}>{kep.text}</p>
              )}
            </div>

            {/* Signatures */}
            <div className="lap-section">
              <div className="lap-section-title">Tandatangan Panel</div>
              <div className="lap-sig-grid">
                {[
                  { name: panelSemasa.ketua?.name, role: 'Ketua Panel' },
                  ...(panelSemasa.ahli || []).filter(Boolean).map((a) => ({ name: a.name, role: 'Ahli Panel' })),
                ].map((s, i) => (
                  <div key={i} className="lap-sig-box">
                    <div className="lap-sig-space" />
                    <div className="lap-sig-name">{s.name || '—'}</div>
                    <div className="lap-sig-role">{s.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="lap-foot">
            <span>iLPF · Kementerian Dalam Negeri Malaysia</span>
            <span>Dicetak: {new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { LaporanPage });
