/* Survey field labels for display */
export const QUESTIONS = [
  { key: 'oneLine',        label: 'iLPF hari ini dalam satu ayat' },
  { key: 'top3Good',       label: '3 perkara paling baik' },
  { key: 'top3Bad',        label: '3 perkara paling menyusahkan' },
  { key: 'rootCause',      label: 'Punca isu terbesar' },
  { key: 'oneIssue',       label: 'Isu #1 untuk diselesaikan' },
  { key: 'manual',         label: 'Kerja yang terlalu manual / berulang' },
  { key: 'smallFix',       label: 'Perbaikan kecil, impak besar' },
  { key: 'v2Wants',        label: 'iLPF versi baharu — 3 perkara utama' },
  { key: 'future3y',       label: 'iLPF 3 tahun dari sekarang' },
  { key: 'wowFactor',      label: '"Wow factor" untuk iLPF' },
  { key: 'question',       label: 'Soalan untuk iLPF kalau boleh bercakap' },
  { key: 'aiSuitable',     label: 'AI sesuai membantu iLPF?' },
  { key: 'aiHelp',         label: 'Bahagian yang AI boleh bantu' },
  { key: 'aiConcern',      label: 'Kebimbangan penggunaan AI' },
  { key: 'priority5',      label: '5 perkara paling penting ditambah baik' },
  { key: 'approach',       label: 'Pendekatan jika bajet & masa terhad' },
  { key: 'futureSentence', label: 'Satu ayat untuk iLPF masa depan' },
  { key: 'other',          label: 'Cadangan lain' },
];

/* Frequency order for sorting */
export const FREQ_ORDER = [
  'Setiap hari',
  'Beberapa kali seminggu',
  'Beberapa kali sebulan',
  'Jarang / Sekali sekala',
];

/* Split comma-separated multi-select values into clean tag array */
export function parseTags(str) {
  if (!str || str === '—') return [];
  return str.split(',').map(s => s.trim()).filter(Boolean);
}

/* Count occurrences in an array of tag arrays */
export function countTags(responses, key) {
  const map = new Map();
  for (const r of responses) {
    for (const tag of (r[key] || [])) {
      map.set(tag, (map.get(tag) || 0) + 1);
    }
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

/* Count a single-value field */
export function countField(responses, key) {
  const map = new Map();
  for (const r of responses) {
    const v = r[key] || '—';
    map.set(v, (map.get(v) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

/* AI sentiment color */
export const AI_COLORS = {
  'Ya, sangat sesuai': '#56d364',
  'Mungkin sesuai untuk sebahagian proses sahaja': '#d4a843',
  'Tidak pasti': '#a8b4ff',
  'Tidak sesuai': '#e8734a',
};

export function aiColor(val) {
  for (const k in AI_COLORS) {
    if (val && val.includes(k.slice(0, 10))) return AI_COLORS[k];
  }
  return '#8b949e';
}

/* Frequency badge color */
export function freqColor(val) {
  if (!val) return '#8b949e';
  if (val.toLowerCase().includes('setiap'))    return '#56d364';
  if (val.toLowerCase().includes('minggu'))    return '#4ecdc4';
  if (val.toLowerCase().includes('bulan'))     return '#d4a843';
  return '#a8b4ff';
}
