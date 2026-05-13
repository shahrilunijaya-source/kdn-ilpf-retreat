/* iLPF v2 — Tapisan Screen root
   Composes nav, title, video, peta, AI table, senarai, sections, keputusan,
   floating recorder, action footer, hantar modal, mini-player. */

const { useState: useStateTS, useMemo: useMemoTS } = React;

function TapisanScreen() {
  const data = window.iLPF.tapisanScreen;
  const I = window.Icons;

  // --- accepted pengubahan list (from AI accepts + manual records) ---
  const [items, setItems] = useStateTS([]);
  const addedIds = useMemoTS(() => {
    const s = new Set();
    items.forEach((it) => { if (it.source === 'ai') s.add(it.bil); });
    return s;
  }, [items]);

  const [hantarOpen, setHantarOpen] = useStateTS(false);
  const [aliranOpen, setAliranOpen] = useStateTS(false);
  const [pickSlot, setPickSlot] = useStateTS(null); // null | 'ketua' | 0 | 1
  const [panelSemasa, setPanelSemasa] = useStateTS(data.panelSemasa);
  const [sejarahOpen, setSejarahOpen] = useStateTS(false);

  // --- editor states ---
  const [sinopsis, setSinopsis] = useStateTS(
    "Tulis sinopsis di sini, atau guna cadangan AI di bawah."
  );
  const [dialog, setDialog] = useStateTS("Tulis catatan dialog dan sari kata di sini…");
  const [genre, setGenre] = useStateTS([]);
  const [tema, setTema] = useStateTS([]);

  const acceptAi = (r) => {
    if (addedIds.has(r.bil)) return;
    setItems((prev) => [...prev, { ...r, source: 'ai' }]);
  };
  const acceptAll = () => {
    const remaining = data.aiPengubahan.filter((r) => !addedIds.has(r.bil));
    setItems((prev) => [...prev, ...remaining.map((r) => ({ ...r, source: 'ai' }))]);
  };
  const deleteItem = (r) => {
    setItems((prev) => prev.filter((x) => !(x.bil === r.bil && x.source === r.source)));
  };
  const saveManual = (rec) => {
    const nextBil = String(items.length + 1).padStart(2, '0') + 'M';
    setItems((prev) => [...prev, { ...rec, bil: nextBil }]);
  };

  const toggleGenre = (g) => setGenre((arr) => arr.includes(g) ? arr.filter((x) => x !== g) : [...arr, g]);
  const toggleTema = (t) => setTema((arr) => arr.includes(t) ? arr.filter((x) => x !== t) : [...arr, t]);

  // Video pins from accepted items
  const pins = items.map((it) => ({
    bil: it.bil,
    pct: (timeToSec(it.dan) / 1080) * 100,
    kind: it.source === 'ai' ? 'orange' : 'amber',
  }));

  return (
    <div className="tap-screen">
      {/* Nav bar */}
      <div className="tap-nav">
        <a className="tap-nav__back" href="Tapisan-Senarai.php">
          <I.arrowL /> Kembali
        </a>
        <div className="tap-nav__crumb">
          <a href="Tapisan-Senarai.php">Senarai Tapisan</a>
          <span>›</span>
          <span className="now">{data.info.noPermohonan}</span>
        </div>
        <div className="tap-nav__cluster">
          <span className="tap-nav__step">Langkah 7 dari 11</span>
          <button className="tap-nav__btn" onClick={() => setAliranOpen(true)}>
            Aliran proses
          </button>
          <button className="tap-nav__btn" onClick={() => setSejarahOpen(true)}>
            <I.clock /> Sejarah
          </button>
        </div>
      </div>

      {/* Title block */}
      <div className="tap-title">
        <div>
          <h1 className="tap-title__h1">{data.info.title}<span className="dot" /></h1>
          <p className="tap-title__sub">
            {data.info.perakuan} · <strong>{data.info.noPermohonan}</strong> · {data.info.pengedar}
          </p>
          <div className="tap-title__chips">
            {data.info.kategori.map((k) => <span key={k} className="tap-title__chip">{k}</span>)}
          </div>
        </div>
        <div className="tap-title__meta">
          <div style={{ marginBottom: 4 }}>Tarikh hantar: {data.info.tarikhHantar}</div>
          <div className="due">Jangkaan laporan: {data.info.jangkaan}</div>
        </div>
      </div>

      {/* Body */}
      <div className="tap-body">
        <style>{`
          .tap-main { display: grid; grid-template-columns: 60% 1fr; align-items: start; gap: 0; }
          .tap-panel { display: flex; flex-direction: column; border-left: 1px solid var(--line); background: var(--paper); }
          .tap-panel__info { padding: 10px 14px 8px; border-bottom: 1px solid var(--line); display: flex; align-items: flex-start; gap: 8px; }
          .tap-panel__icon { font-size: 13px; margin-top: 1px; }
          .tap-panel__filename { font-size: 11px; font-weight: 700; color: var(--orange); letter-spacing: .04em; }
          .tap-panel__date { font-size: 10.5px; color: var(--mute); margin-top: 2px; }
          .tap-rekod-wrap { padding: 12px 14px; border-bottom: 1px solid var(--line); }
          .tap-rekod__label { font-size: 10px; font-weight: 700; letter-spacing: .12em; color: var(--orange); text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 5px; }
          .tap-rekod__btns { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 6px; }
          .tap-rekod__btn-mula { background: var(--teal); color: var(--pine-deep); border-radius: var(--r-sm); padding: 10px 6px; font-size: 12px; font-weight: 700; letter-spacing: .05em; }
          .tap-rekod__btn-mula:active { filter: brightness(.88); }
          .tap-rekod__btn-berhenti { background: var(--danger); color: #fff; border-radius: var(--r-sm); padding: 10px 6px; font-size: 12px; font-weight: 700; letter-spacing: .05em; }
          .tap-rekod__btn-berhenti:active { filter: brightness(.88); }
          .tap-rekod__times { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 12px; }
          .tap-rekod__time { background: var(--paper-2); border: 1px solid var(--line); border-radius: var(--r-sm); padding: 5px 8px; font-size: 15px; font-weight: 700; font-family: var(--mono); text-align: center; color: var(--ink); }
          .tap-rekod__key { font-size: 10.5px; font-weight: 600; color: var(--mute); margin-bottom: 5px; text-transform: uppercase; letter-spacing: .06em; }
          .tap-rekod__pills { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 10px; }
          .tap-simpan { width: 100%; padding: 14px 16px; background: var(--orange); color: #fff; font-size: 13px; font-weight: 700; letter-spacing: .08em; display: flex; align-items: center; justify-content: center; gap: 8px; transition: filter .15s; flex-shrink: 0; }
          .tap-simpan:hover { background: var(--orange-soft); filter: brightness(1.08); }
          .tap-simpan svg { width: 15px; height: 15px; flex-shrink: 0; }
          .tap-panel .recorder__pill { background: var(--paper-2); color: var(--ink); border: 1px solid var(--line); border-radius: var(--r-sm); padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; }
          .tap-panel .recorder__pill.is-active { background: var(--teal); color: var(--pine-deep); border-color: var(--teal); }
          .tap-panel .recorder__pill.is-active--adegan { background: var(--orange); color: #fff; border-color: var(--orange); }
          .tap-panel .recorder__note { background: var(--paper-2); color: var(--ink); border: 1px solid var(--line); border-radius: var(--r-sm); padding: 7px 10px; font-size: 12px; width: 100%; box-sizing: border-box; resize: none; display: block; min-height: 52px; height: auto; }
          .tap-panel .recorder__note::placeholder { color: var(--mute); }
          .tap-panel .recorder__save { background: var(--orange); color: #fff; border-radius: var(--r-sm); padding: 10px 14px; font-size: 12px; font-weight: 700; width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px; }
          .tap-panel .recorder__save:disabled { opacity: .45; cursor: not-allowed; }
        `}</style>

        <div className="tap-main">
          {/* Left: video player */}
          <div>
            <VideoPlayer pins={pins} />
          </div>

          {/* Right: annotation panel */}
          <div className="tap-panel">
            <FloatingRecorder onSave={saveManual} inline />

          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
          <CadanganAiPengubahan
            rows={data.aiPengubahan}
            onAccept={acceptAi}
            onAcceptAll={acceptAll}
            addedIds={addedIds}
          />
          <SenaraiPengubahan
            items={items}
            onDelete={deleteItem}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
          <SinopsisSection
            ai={data.aiSinopsis}
            value={sinopsis}
            onChange={setSinopsis}
          />
          <DialogSection ai={data.aiDialog} value={dialog} onChange={setDialog} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
          <GenreOrTemaSection
            title="Genre"
            pool={['Animasi','Bual bicara','Biografi','Berita','Dokumentasi','Drama','Fantasi','Fiksyen','Epik','Candawara (Game Show)','Seram','Jenayah','Kartun','Keluarga','Komedi','Muzikal','Muzik','Misteri','Pengembaraan','Peperangan','Politik','Realiti-TV','Roman','Satira','Sejarah','Sci-Fi','Sukan','Thriller','Western (Cowboy)','Lain-lain']}
            ai={data.aiGenre}
            selected={genre}
            onTogglePill={toggleGenre}
            onAcceptTop={(top) => setGenre(top)}
            onSetAll={setGenre}
          />
          <GenreOrTemaSection
            title="Tema"
            pool={['Adiwira','Alam Ghaib','Alam Sekitar','Berita','Biografi','Bual-bicara','Ceramah','Dendam','Demonstrasi','Dongeng','Ekspidisi','Fantasi','Festival','Forum','Hantu','Hiburan','Ideologi','Jati diri','Jenaka','Karaoke','Keadilan','Kebudayaan','Kecurangan','Kedaulatan','Kejayaan','Kekecewaan','Kekejaman','Kekeluargaan','Kemasyarakatan','Kesenian','Kesetiaan','Khurafat','Konflik','Konspirasi','LGBTQ','Maruah','Masakan','Misteri','Motivasi','Ngeri','Patriotik','Pejuang','Pembelotan','Pembunuhan','Pencederaan','Penderhakaan','Penerokaan','Pengembaraan','Pandemik','Pengetahuan Am','Pengkhianatan','Penguasaan','Penindasan','Penyelidikan','Penyeludupan','Penyiasatan','Peperangan','Perlumbaan','Permainan Video','Permusuhan','Perniagaan','Persahabatan','Persaingan','Persengketaan','Pertandingan','Penjajahan','Pertembungan','Pertentangan','Pengintipan','Pengorbanan','Promosi','Propaganda','Psikologi','Reaksi','Rencan','Rusuhan','Sabotaj','Sejarah','Sihir','Sukan','Tali barut','Teknologi','Wabak','Zombie','Lain-lain']}
            ai={data.aiTema}
            selected={tema}
            onTogglePill={toggleTema}
            onAcceptTop={(top) => setTema(top)}
            onSetAll={setTema}
          />
        </div>

        <PanelSection
          ai={data.aiPanel}
          panel={panelSemasa}
          onOpenPick={(slot) => setPickSlot(slot)}
          onAddAi={() => {
            const recs = data.aiPanel.members.map((m) => ({
              ...m,
              initials: m.name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase(),
            }));
            setPanelSemasa((p) => {
              const existing = new Set([p.ketua?.name, ...p.ahli.filter(Boolean).map((a) => a.name)].filter(Boolean));
              const available = recs.filter((r) => !existing.has(r.name));
              const ahli = [...p.ahli];
              let r = 0;
              for (let i = 0; i < ahli.length && r < available.length; i++) {
                if (!ahli[i]) { ahli[i] = available[r++]; }
              }
              return { ...p, ahli };
            });
          }}
        />

        <KeputusanBox
          ai={data.aiKeputusan}
          pemberatLabels={data.pemberatLabels}
          pemberatRows={data.pemberatRows}
        />
      </div>

      {/* Action footer */}
      <div className="tap-actions">
        <div className="tap-actions__sum">
          <span><strong>{items.length} pengubahan</strong></span>
          <span className="badge">LDP · P13</span>
          <span className="saved">auto-saved 12 saat lalu</span>
        </div>
        <div className="tap-actions__cluster">
          <a href="Tapisan-Senarai.php" className="tap-actions__btn tap-actions__btn--ghost" style={{ textDecoration: 'none' }}>Kembali</a>
          <button className="tap-actions__btn tap-actions__btn--pine">Simpan draf</button>
          <a href={`Laporan.php?id=${data.assignmentId}`} target="_blank" rel="noopener" className="tap-actions__btn tap-actions__btn--ghost" style={{ textDecoration: 'none' }}>Jana laporan PDF…</a>
          <button className="tap-actions__btn tap-actions__btn--primary" onClick={() => setHantarOpen(true)}>
            Hantar untuk pengesahan <I.arrowR />
          </button>
        </div>
      </div>

      {/* Modals */}
      {hantarOpen && (
        <HantarModal
          filmTitle={data.info.title}
          pengubahanCount={items.length}
          decision="LDP"
          klasifikasi="P13"
          onClose={() => setHantarOpen(false)}
          onConfirm={() => { window.location.href = 'Tapisan-Senarai.php'; }}
        />
      )}
      {aliranOpen && (
        <AliranModal steps={window.iLPF.aliranProses} onClose={() => setAliranOpen(false)} />
      )}
      {sejarahOpen && (
        <SejarahModal
          filmTitle={data.info.title}
          ilpf={window.iLPF.sejarahIlpf}
          efilem={window.iLPF.sejarahEfilem}
          onClose={() => setSejarahOpen(false)}
        />
      )}
      {pickSlot !== null && (
        <PilihPanelModal
          pool={window.iLPF.alpfPool}
          excludeIds={panelSemasa.ahli.filter(Boolean).map((a) => a.id).filter(Boolean)}
          onClose={() => setPickSlot(null)}
          onPick={(p) => {
            const initials = p.initials || p.name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
            const member = { ...p, initials, expertise: Array.isArray(p.expertise) ? p.expertise.join(' · ') : p.expertise };
            setPanelSemasa((cur) => {
              if (pickSlot === 'ketua') return { ...cur, ketua: member };
              const ahli = [...cur.ahli];
              ahli[pickSlot] = member;
              return { ...cur, ahli };
            });
            setPickSlot(null);
          }}
        />
      )}
    </div>
  );
}

// Helper shared with tapisan-video.jsx (re-declare here for scope safety)
function timeToSec(t) {
  if (!t) return 0;
  const [h, m, s] = t.split(':').map(Number);
  return h * 3600 + m * 60 + s;
}

Object.assign(window, { TapisanScreen });
