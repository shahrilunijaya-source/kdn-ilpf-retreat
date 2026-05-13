/* iLPF v2 — Workspace shell
   - Utility bar
   - Top bar with Tugasan Panggung / Cuti dropdowns + user menu
   - Sidebar (collapsible groups, persistent expand-state)
   - Content slot
   Exposes: window.Shell, window.PageHead */

const { useState: useStateShell, useEffect: useEffectShell, useRef: useRefShell } = React;

function useClickOutside(ref, onClose, active) {
  useEffectShell(() => {
    if (!active) return undefined;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && onClose());
    return () => document.removeEventListener('mousedown', handler);
  }, [active, ref, onClose]);
}

/* === Utility bar ======================================================= */
function UtilityBar() {
  return (
    <div className="ws-utility">
      <div className="l">
        <span>Portal Rasmi PPF · KDN</span>
      </div>
      <div className="r">
        <a href="#">BM / EN</a>
        <span>·</span>
        <a href="#">OKU</a>
        <span>·</span>
        <a href="#">Hubungi</a>
      </div>
    </div>
  );
}

/* === Top bar =========================================================== */
function TopBar({ context, onToggleSidebar }) {
  const [open, setOpen] = useStateShell(null); // 'panggung' | 'cuti' | 'user'
  const containerRef = useRefShell(null);
  useClickOutside(containerRef, () => setOpen(null), !!open);

  const { panggung, cutiMesyuarat, me } = window.iLPF;
  const I = window.Icons;

  return (
    <div className="ws-topbar" ref={containerRef}>
      <button className="ws-topbar__burger" onClick={onToggleSidebar} aria-label="Toggle sidebar">
        <I.menu />
      </button>
      <a className="ws-topbar__brand" href="Utama.php">
        <img src="assets/logo-mark.svg" alt="iLPF" height="32" />
      </a>
      <div className="ws-topbar__sep" />
      <div className="ws-topbar__context">{context || "Ruang ALPF"}</div>

      <div className="ws-topbar__spacer" />

      <div className="ws-topbar__cluster">
        <button
          className={`ws-topbar__btn ${open === 'panggung' ? 'is-open' : ''}`}
          onClick={() => setOpen(open === 'panggung' ? null : 'panggung')}
        >
          <I.bell />
          <span>Tugasan Panggung</span>
          {panggung.length > 0 && <span className="badge">{panggung.length}</span>}
        </button>

        <button
          className={`ws-topbar__btn ${open === 'cuti' ? 'is-open' : ''}`}
          onClick={() => setOpen(open === 'cuti' ? null : 'cuti')}
        >
          <I.calendar />
          <span>Cuti / Mesyuarat Luar</span>
          {cutiMesyuarat.length > 0 && <span className="badge badge--teal">{cutiMesyuarat.length}</span>}
        </button>

        <button
          className={`ws-topbar__user ${open === 'user' ? 'is-open' : ''}`}
          onClick={() => setOpen(open === 'user' ? null : 'user')}
        >
          <span className="ws-topbar__avatar"><img src="assets/mnasir.jpg" alt={me.initials} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} /></span>
          <span className="ws-topbar__name">
            <span>{me.name.split(' ').slice(0, 2).join(' ')}</span>
            <span className="sub">{me.alpfId}</span>
          </span>
          <I.chevDown style={{ color: 'rgba(255,255,255,0.5)' }} />
        </button>
      </div>

      {open === 'panggung' && <PanggungDropdown items={panggung} />}
      {open === 'cuti' && <CutiDropdown items={cutiMesyuarat} />}
      {open === 'user' && <UserDropdown me={me} />}
    </div>
  );
}

function PanggungDropdown({ items }) {
  return (
    <div className="ws-dropdown" style={{ right: 280 }}>
      <div className="ws-dropdown__head">
        <div className="ws-dropdown__title">Tugasan Panggung<span className="dot" /></div>
        <div className="ws-dropdown__meta">{items.length} sesi akan datang</div>
      </div>
      <div className="ws-dropdown__list">
        {items.map((p, i) => (
          <a key={i} href="#" className="ws-dropdown__item">
            <div className="ws-pgg">
              <div className="ws-pgg__num">
                Panggung<strong>{p.panggung.replace('Panggung ', '')}</strong>
              </div>
              <div className="ws-pgg__body">
                <div className="ws-pgg__film">{p.film}</div>
                <div className="ws-pgg__sub">
                  <span>{p.ids}</span>
                  <span className={`ws-role ws-role--${p.role}`}>{p.role === 'ketua' ? 'Ketua Panel' : 'Ahli Panel'}</span>
                </div>
              </div>
              <div className="ws-pgg__when">
                <div className="d">{p.tarikh}</div>
                <div>{p.masa}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function CutiDropdown({ items }) {
  return (
    <div className="ws-dropdown" style={{ right: 110 }}>
      <div className="ws-dropdown__head">
        <div className="ws-dropdown__title">Cuti / Mesyuarat Luar<span className="dot" /></div>
        <div className="ws-dropdown__meta">Akan datang · Anda + rakan</div>
      </div>
      <div className="ws-dropdown__list">
        {items.map((c, i) => (
          <a key={i} href="#" className="ws-dropdown__item">
            <div className="ws-cuti">
              <div>
                <div className={`ws-cuti__name ${c.self ? 'is-self' : ''}`}>
                  {c.name}{c.self && ' · anda'}
                </div>
                <div className="ws-cuti__type">{c.type}</div>
              </div>
              <div className="ws-cuti__dates">
                {c.from === c.to ? c.from : `${c.from} – ${c.to}`}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function UserDropdown({ me }) {
  const I = window.Icons;
  return (
    <div className="ws-dropdown" style={{ right: 14, width: 260 }}>
      <div className="ws-dropdown__head" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="ws-topbar__avatar" style={{ width: 36, height: 36, fontSize: 13 }}><img src="assets/mnasir.jpg" alt={me.initials} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} /></div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--pine)' }}>{me.name}</div>
          <div style={{ fontSize: 10.5, color: 'var(--mute)', letterSpacing: '0.06em' }}>{me.alpfId}</div>
        </div>
      </div>
      <div className="ws-dropdown__list">
        <a className="ws-dropdown__user-item" href="Profil.php"><I.user /> Profil saya</a>
        <a className="ws-dropdown__user-item" href="#"><I.key /> Tukar kata laluan</a>
        <a className="ws-dropdown__user-item" href="#"><I.moon /> Tema</a>
        <a className="ws-dropdown__user-item ws-dropdown__user-item--danger" href="logout.php"><I.logout /> Log keluar</a>
      </div>
    </div>
  );
}

/* === Sidebar =========================================================== */

const SIDE_ICON = {
  utama: 'home',
  permohonan: 'inbox',
  'stesen-tv': 'tv',
  cuti: 'leaf',
  sejarah: 'clock',
  laporan: 'chart',
  manual: 'book',
};

function Sidebar({ activeKey, expanded, onToggleGroup }) {
  const { sidebar } = window.iLPF;
  const I = window.Icons;

  // Find which top-level groups contain the active key (open by default)
  const isActive = (id) => id === activeKey;

  const renderItem = (item, depth = 0) => {
    if (item.kind === 'item') {
      return (
        <a
          key={item.id}
          href={item.href}
          className={`ws-side-item ${isActive(item.id) ? 'is-active' : ''}`}
        >
          <span className="ws-side-item__bullet" />
          <span className="ws-side-label">{item.label}</span>
        </a>
      );
    }
    const open = !!expanded[item.id];
    return (
      <div key={item.id} className="ws-side-group">
        <button
          className={`ws-side-group__head ${open ? 'is-open' : ''}`}
          onClick={() => onToggleGroup(item.id)}
          style={depth === 0 ? null : { paddingLeft: 6, fontSize: 11.5, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}
        >
          <span className="ws-side-group__caret"><I.chevRight /></span>
          <span className="ws-side-label">{item.label}</span>
        </button>
        {open && (
          <div className="ws-side-group__children">
            {item.children.map((c) => renderItem(c, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="ws-sidebar" aria-label="Navigasi utama">
      {sidebar.map((node) => {
        if (node.kind === 'item') {
          // Top-level "Utama"
          return (
            <a
              key={node.id}
              href={node.href}
              className={`ws-side-top ${isActive(node.id) ? 'is-active' : ''}`}
            >
              <span className="ws-side-top__icon">{(() => {
                const Comp = I[SIDE_ICON[node.id] || 'home'];
                return Comp ? <Comp /> : null;
              })()}</span>
              <span className="ws-side-label">{node.label}</span>
            </a>
          );
        }
        // Top-level group
        const open = !!expanded[node.id];
        const IconComp = I[SIDE_ICON[node.id] || 'inbox'];
        return (
          <div key={node.id} className="ws-side-group">
            <button
              className={`ws-side-group__head ${open ? 'is-open' : ''}`}
              onClick={() => onToggleGroup(node.id)}
              style={{ padding: '9px 18px', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}
            >
              <span className="ws-side-top__icon">{IconComp ? <IconComp /> : null}</span>
              <span className="ws-side-label" style={{ flex: 1 }}>{node.label}</span>
              <span className="ws-side-group__caret"><I.chevRight /></span>
            </button>
            {open && (
              <div className="ws-side-group__children" style={{ marginLeft: 10 }}>
                {node.children.map((c) => renderItem(c, 1))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* === Shell ============================================================== */

function Shell({ activeKey = 'utama', context, defaultExpanded, children }) {
  const initialExpanded = defaultExpanded || {
    permohonan: true,
    'perakuan-a': true,
    pita: true,
  };
  const [expanded, setExpanded] = useStateShell(initialExpanded);
  const [collapsed, setCollapsed] = useStateShell(false);

  const toggleGroup = (id) => setExpanded((e) => ({ ...e, [id]: !e[id] }));

  return (
    <div className={`ws-app ${collapsed ? 'is-collapsed' : ''}`}>
      <TopBar context={context} onToggleSidebar={() => setCollapsed((c) => !c)} />
      <Sidebar activeKey={activeKey} expanded={expanded} onToggleGroup={toggleGroup} />
      <main className="ws-content">{children}</main>
    </div>
  );
}

Object.assign(window, { Shell });
