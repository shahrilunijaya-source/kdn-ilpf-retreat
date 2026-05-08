import { GVIZ_URL, EXPORT_URL, PROXIES } from './config.js';
import { parseTags } from './transform.js';

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

function cell(row, i) {
  return (row[i] || '').trim() || '—';
}

export async function fetchResponses() {
  const cacheBust = '&_=' + Date.now();
  const directs = [GVIZ_URL + cacheBust, EXPORT_URL + cacheBust];
  const proxied = directs.flatMap(u => PROXIES.map(p => p(u)));
  const text = await tryFetch([...directs, ...proxied]);

  const rows = parseCSV(text);
  if (rows.length < 2) throw new Error('Sheet returned no rows.');

  const responses = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const name = (row[1] || '').trim();
    if (!name) continue;

    responses.push({
      timestamp:      cell(row,  0),
      name,
      dept:           cell(row,  2),
      freq:           cell(row,  3),
      oneLine:        cell(row,  4),
      top3Good:       cell(row,  5),
      top3Bad:        cell(row,  6),
      rootCause:      parseTags(cell(row, 7)),
      oneIssue:       cell(row,  8),
      manual:         cell(row,  9),
      smallFix:       cell(row, 10),
      v2Wants:        cell(row, 11),
      future3y:       cell(row, 12),
      wowFactor:      cell(row, 13),
      question:       cell(row, 14),
      aiSuitable:     cell(row, 15),
      aiHelp:         parseTags(cell(row, 16)),
      aiConcern:      cell(row, 17),
      priority5:      parseTags(cell(row, 18)),
      approach:       cell(row, 19),
      futureSentence: cell(row, 20),
      other:          cell(row, 21),
    });
  }
  return responses;
}
