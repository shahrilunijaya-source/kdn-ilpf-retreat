# Google Sheets Integration Patterns

Reusable patterns for fetching and parsing Google Sheets data in plain JS.

---

## Access Method Decision

```
Is the sheet PUBLIC?
  YES → Use CSV Export URL (no API key, simplest)
  NO  → Use Sheets API v4 with API Key (key in config.js, NOT in HTML)
```

---

## Method A: Public Sheet — CSV Export

**Setup:** Share sheet → "Anyone with link can view"

**URL pattern:**
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={GID}
```
- `SHEET_ID` = the long ID in the sheet URL
- `GID` = tab ID (found in URL after `#gid=`, default tab = `0`)

**Fetch + parse:**
```js
// js/sheets.js
export async function fetchSheetCSV(sheetId, gid = 0) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  const text = await res.text();
  return parseCSV(text);
}

export function parseCSV(text) {
  const [headerLine, ...rows] = text.trim().split('\n');
  const headers = headerLine.split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return rows.map(row => {
    const vals = row.match(/(".*?"|[^,]+|(?<=,)(?=,)|^(?=,)|(?<=,)$)/g) || [];
    return Object.fromEntries(headers.map((h, i) => [h, (vals[i] ?? '').replace(/^"|"$/g, '').trim()]));
  });
}
```

**Caveat:** CSV export strips formatting. Dates come as strings — parse them:
```js
const date = new Date(row['Tarikh']); // or use dayjs CDN
```

---

## Method B: Private Sheet — Sheets API v4

**Setup:** Google Cloud Console → enable Sheets API → create API key → restrict to Sheets API

**Config:**
```js
// js/config.js
export const SHEET_ID = 'your_sheet_id_here';
export const API_KEY  = 'your_api_key_here';  // never commit to public repo
export const TABS = {
  profil: 'Sheet1',
};
```

**Fetch:**
```js
// js/sheets.js
import { SHEET_ID, API_KEY, TABS } from './config.js';

export async function fetchSheetAPI(tabName, range = 'A1:Z1000') {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${tabName}!${range}?key=${API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json.values) throw new Error('No data returned from Sheets API');
  const [headers, ...rows] = json.values;
  return rows.map(row => Object.fromEntries(headers.map((h, i) => [h, row[i] ?? ''])));
}
```

---

## Caching Pattern

Always cache in `sessionStorage` — Sheets API has quota; CSV endpoint is slow on repeat calls.

```js
export async function getData(forceRefresh = false) {
  const CACHE_KEY = 'kdn_profil_data';
  if (!forceRefresh) {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) return JSON.parse(cached);
  }
  const data = await fetchSheetCSV(SHEET_ID, 0);
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
  return data;
}
```

Add a "Refresh" button that calls `getData(true)`.

---

## Column Mapping

Define column names once in `config.js`, not scattered in UI code:

```js
// js/config.js
export const COLS = {
  nama:     'Nama Pegawai',
  jawatan:  'Jawatan',
  gred:     'Gred',
  negeri:   'Negeri',
  tarikh:   'Tarikh Lantikan',
  status:   'Status',
};
```

Use in transform:
```js
import { COLS as C } from './config.js';
const name = row[C.nama];
```

---

## Common Gotchas

| Problem | Cause | Fix |
|---------|-------|-----|
| CORS error on CSV fetch | Sheet not published/shared | Share sheet publicly |
| Empty cells come as `undefined` | API returns short rows | Use `row[i] ?? ''` |
| Numbers parsed as strings | CSV everything is string | `parseInt(row[C.gred])` |
| Dates wrong timezone | Sheets uses local tz in CSV | Parse with `new Date(v + 'T00:00:00')` |
| Quota exceeded | Too many API calls | Add sessionStorage cache |
| CSV breaks on commas in cells | Cell contains comma | Use quoted-field regex parser |

---

## Aggregation Helpers

```js
// js/transform.js
export function countBy(data, key) {
  return data.reduce((acc, row) => {
    acc[row[key]] = (acc[row[key]] || 0) + 1;
    return acc;
  }, {});
}

export function groupBy(data, key) {
  return data.reduce((acc, row) => {
    (acc[row[key]] ??= []).push(row);
    return acc;
  }, {});
}

export function sumBy(data, key) {
  return data.reduce((sum, row) => sum + (parseFloat(row[key]) || 0), 0);
}
```

---

## Chart.js Quick Patterns

```html
<!-- In index.html head -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
```

```js
// js/charts.js
export function barChart(canvasId, labels, values, label = 'Data') {
  const ctx = document.getElementById(canvasId).getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label, data: values, backgroundColor: '#1e3a5f' }] },
    options: { responsive: true, plugins: { legend: { display: false } } },
  });
}

export function pieChart(canvasId, labels, values) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  return new Chart(ctx, {
    type: 'doughnut',
    data: { labels, datasets: [{ data: values }] },
    options: { responsive: true },
  });
}
```
