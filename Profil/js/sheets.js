import { GVIZ_URL, EXPORT_URL, PROXIES } from './config.js';
import { ANIMAL_DATA } from './transform.js';

// Robust CSV parser — handles quoted fields, escaped quotes, newlines in cells
export function parseCSV(text) {
  const rows = []; let row = []; let cell = ''; let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else cell += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(cell); cell = ''; }
      else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
      else if (c === '\r') { /* skip */ }
      else cell += c;
    }
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

// Try a list of URLs in order — return CSV text from first that works
async function tryFetch(urls) {
  let lastErr = null;
  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: 'no-store', redirect: 'follow' });
      if (!res.ok) { lastErr = new Error(`HTTP ${res.status}`); continue; }
      const text = await res.text();
      if (text.trim().startsWith('<') || text.includes('<!DOCTYPE') || text.includes('<HTML')) {
        lastErr = new Error('Got HTML instead of CSV (sheet may not be public)');
        continue;
      }
      if (!text.trim()) { lastErr = new Error('Empty response'); continue; }
      return text;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error('All endpoints failed');
}

export async function fetchProfiles() {
  const cacheBust = '&_=' + Date.now();
  const directs = [GVIZ_URL + cacheBust, EXPORT_URL + cacheBust];
  const proxied = directs.flatMap(u => PROXIES.map(p => p(u)));
  const candidates = [...directs, ...proxied];

  const text = await tryFetch(candidates);
  const rows = parseCSV(text);
  if (rows.length < 2) throw new Error('Sheet returned no rows.');

  const header = rows[0];
  const idx = (needle) => header.findIndex(h => h && h.toLowerCase().includes(needle.toLowerCase()));

  // Prefer 2nd Email column (form's own field, not the pre-filled one)
  const emailCols = header.reduce((acc, h, i) => { if (h && h.toLowerCase().includes('email')) acc.push(i); return acc; }, []);
  const cEmail = emailCols.length > 1 ? emailCols[1] : emailCols[0];

  const cName   = idx('name');
  const cPhone  = idx('phone');
  const cAnim1  = idx('seekor binatang muncul');
  const cAnim2  = idx('binatang kedua');
  const cAnim3  = idx('binatang ketiga');
  const cMBTI   = idx('mbti');
  const cR      = idx('total 1');
  const cT      = idx('total 2');
  const cF      = idx('total 3');
  const cS      = idx('total 4');
  const cAnimal = header.length - 1; // last col: computed Animal result

  const profiles = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const name = (row[cName] || '').trim();
    if (!name) continue;

    const animal = (row[cAnimal] || 'Rabbit').trim();
    const scores = {
      Rabbit:   parseInt(row[cR]) || 0,
      Tortoise: parseInt(row[cT]) || 0,
      Fox:      parseInt(row[cF]) || 0,
      Sloth:    parseInt(row[cS]) || 0,
    };
    if (scores.Rabbit + scores.Tortoise + scores.Fox + scores.Sloth === 0) continue;

    profiles.push({
      name,
      email: (row[cEmail] || '').trim() || '—',
      phone: (row[cPhone] || '').trim() || '—',
      mbti:  ((row[cMBTI] || '').trim().toUpperCase()) || null,
      animal: ANIMAL_DATA[animal] ? animal : 'Rabbit',
      scores,
      declare: [
        { q: 'Bagaimana anda rasa orang lain nampak diri anda', label: (row[cAnim1] || '').trim() || '—', stage: 'Stage 1' },
        { q: 'Bagaimana anda mahu orang lain melihat anda',     label: (row[cAnim2] || '').trim() || '—', stage: 'Stage 2' },
        { q: 'Siapa diri anda yang sebenar-benarnya di dalam',  label: (row[cAnim3] || '').trim() || '—', stage: 'Stage 3' },
      ],
    });
  }
  return profiles;
}
