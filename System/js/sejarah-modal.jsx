/* iLPF v2 — Sejarah modal (iLPF + eFilem records)
   Opened from Tapisan Screen's "Sejarah" button.
   Exposes: SejarahModal */

const { useState: useStateSej, useMemo: useMemoSej } = React;

function simBucket(s) {
  if (s >= 85) return 'is-high';
  if (s >= 65) return 'is-mid';
  return '';
}

/* ---------- iLPF record card --------------------------------------- */

function IlpfRecord({ r }) {
  return (
    <div className="sej-rec">
      <div className="sej-rec__top">
        <div>
          <div className="sej-rec__title">{r.title}</div>
          <div className="sej-rec__sub">
            <span>{r.year}</span>
            <span className="sep">·</span>
            <span>{r.tarikh}</span>
            <span className="sep">·</span>
            <span>{r.id}</span>
          </div>
        </div>
        <div className="sej-rec__simbox">
          <span className={`sej-rec__sim ${simBucket(r.similarity)}`}>{r.similarity}%</span>
          <span className="sej-rec__simlbl">Kesamaan</span>
        </div>
      </div>
      <div className="sej-rec__chips">
        <span className={`cls cls--${r.kls}`}>{r.kls}</span>
        <span className={`sej-rec__kep ${r.keputusan}`}>{r.keputusan} · {r.keputusan === 'LBP' ? 'Lulus bersih' : r.keputusan === 'LDP' ? 'Lulus dgn pengubahan' : 'Tidak lulus'}</span>
        <span className="sej-rec__flag">{r.pengubahan} pengubahan</span>
      </div>
      <div className="sej-rec__meta">
        <div>
          <span className="k">Ketua Panel</span>
          <span className="v">{r.ketua}</span>
        </div>
        <div>
          <span className="k">Pemberat tertinggi</span>
          <span className="v">{r.pemberat}</span>
        </div>
        <div>
          <span className="k">Sumber</span>
          <span className="v">iLPF · rekod dalaman</span>
        </div>
      </div>
      <div className="sej-rec__note">"{r.note}"</div>
    </div>
  );
}

/* ---------- eFilem record card ------------------------------------- */

function EfilemRecord({ r }) {
  return (
    <div className="sej-rec">
      <div className="sej-rec__top">
        <div>
          <div className="sej-rec__title">{r.title}</div>
          <div className="sej-rec__sub">
            <span>{r.year}</span>
            <span className="sep">·</span>
            <span>{r.origin}</span>
            <span className="sep">·</span>
            <span>{r.id}</span>
          </div>
        </div>
        <div className="sej-rec__simbox">
          <span className={`sej-rec__sim ${simBucket(r.similarity)}`}>{r.similarity}%</span>
          <span className="sej-rec__simlbl">Kesamaan</span>
        </div>
      </div>
      <div className="sej-rec__chips">
        <span className="sej-rec__flag">{r.genre}</span>
        <span className="sej-rec__flag">{r.rating}</span>
        <span className="sej-rec__flag">{r.runtime}</span>
        <span className={`sej-rec__flag ${r.kdnIdentified ? '' : 'is-new'}`}>
          {r.kdnIdentified ? 'iLPF: pernah ditapis' : 'iLPF: belum ditapis'}
        </span>
      </div>
      <div className="sej-rec__meta">
        <div>
          <span className="k">Box office</span>
          <span className="v">{r.bo}</span>
        </div>
        <div>
          <span className="k">Asal</span>
          <span className="v">{r.origin}</span>
        </div>
        <div>
          <span className="k">Sumber</span>
          <span className="v">eFilem · industri</span>
        </div>
      </div>
      <div className="sej-rec__note">"{r.note}"</div>
    </div>
  );
}

/* ---------- Modal -------------------------------------------------- */

function SejarahModal({ filmTitle, ilpf, efilem, onClose }) {
  const I = window.Icons;
  const [tab, setTab] = useStateSej('ilpf');
  const [sort, setSort] = useStateSej('similarity'); // 'similarity' | 'year'

  React.useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  const rows = useMemoSej(() => {
    const arr = tab === 'ilpf' ? [...ilpf] : [...efilem];
    if (sort === 'similarity') arr.sort((a, b) => b.similarity - a.similarity);
    else arr.sort((a, b) => b.year - a.year);
    return arr;
  }, [tab, sort, ilpf, efilem]);

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: 720 }} onClick={(e) => e.stopPropagation()}>
        <div className="sej-head">
          <div className="sej-head__top">
            <div>
              <div className="sej-head__title">Sejarah · {filmTitle}<span className="dot" /></div>
              <div className="sej-head__sub">Rekod dalaman iLPF + pangkalan data industri eFilem</div>
            </div>
            <button className="modal-head__close" onClick={onClose} aria-label="Tutup">
              <I.close />
            </button>
          </div>
          <div className="sej-tabs">
            <button
              className={`sej-tab ${tab === 'ilpf' ? 'is-active' : ''}`}
              onClick={() => setTab('ilpf')}
            >
              Sejarah iLPF<span className="count">{ilpf.length}</span>
            </button>
            <button
              className={`sej-tab ${tab === 'efilem' ? 'is-active' : ''}`}
              onClick={() => setTab('efilem')}
            >
              Sejarah eFilem<span className="count">{efilem.length}</span>
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="sej-sort">
            <span>
              {tab === 'ilpf'
                ? `Filem serupa yang pernah ditapis oleh ALPF`
                : `Filem berkaitan dalam pangkalan data industri`}
            </span>
            <div className="sej-sort__cluster">
              <span style={{ alignSelf: 'center', marginRight: 6, fontSize: 10.5, letterSpacing: '0.06em' }}>SUSUN:</span>
              <button
                className={`sej-sort__btn ${sort === 'similarity' ? 'is-active' : ''}`}
                onClick={() => setSort('similarity')}
              >Kesamaan</button>
              <button
                className={`sej-sort__btn ${sort === 'year' ? 'is-active' : ''}`}
                onClick={() => setSort('year')}
              >Tahun</button>
            </div>
          </div>
          {rows.map((r) => (
            tab === 'ilpf'
              ? <IlpfRecord key={r.id} r={r} />
              : <EfilemRecord key={r.id} r={r} />
          ))}
        </div>

        <div className="modal-foot">
          <span style={{ marginRight: 'auto', fontSize: 11, color: 'var(--mute)' }}>
            Pemilihan rekod ini hanya untuk panduan. Keputusan tapisan terkini terletak pada budi bicara ALPF.
          </span>
          <button className="modal-foot__btn modal-foot__btn--primary" onClick={onClose}>Tutup</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SejarahModal });
