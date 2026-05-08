/* Horizontal bar chart — returns HTML string */
export function renderHBar(entries, opts = {}) {
  const max = entries[0]?.[1] || 1;
  const total = opts.total || entries.reduce((s, [, v]) => s + v, 0);
  const color = opts.color || 'var(--accent)';
  const limit = opts.limit || entries.length;

  return entries.slice(0, limit).map(([label, count]) => {
    const pct = (count / max) * 100;
    const sharePct = Math.round(count / total * 100);
    return `<div class="hbar-row">
      <div class="hbar-label" title="${label}">${label}</div>
      <div class="hbar-track"><div class="hbar-fill" style="width:${pct}%;background:${color}"></div></div>
      <div class="hbar-num">${count} <span class="hbar-pct">(${sharePct}%)</span></div>
    </div>`;
  }).join('');
}

/* Donut-style badge row — returns HTML for colored pill counts */
export function renderPills(entries, colorFn) {
  return entries.map(([label, count]) => {
    const color = colorFn ? colorFn(label) : 'var(--accent)';
    return `<div class="pill-item">
      <span class="pill-dot" style="background:${color}"></span>
      <span class="pill-lbl">${label}</span>
      <span class="pill-cnt">${count}</span>
    </div>`;
  }).join('');
}
