export const SHEET_ID = '1zVjDJABbSz032w8W4OC_vOegHQBeF5PImNOR0LzSfT8';
export const SHEET_GID = '313116613'; // Form responses 1

export const GVIZ_URL   = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${SHEET_GID}`;
export const EXPORT_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

// CORS proxies — fallback when opening from file:// (direct fetch blocked)
export const PROXIES = [
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
];

export const AUTO_REFRESH_MS = 60_000;
