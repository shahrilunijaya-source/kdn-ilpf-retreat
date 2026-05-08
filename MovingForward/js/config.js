export const SHEET_ID  = '1T9LVm0620g4r4Iu_1TXob64z_ltx0sXRpARFiJD3wUQ';
export const SHEET_GID = '2102874611';

export const GVIZ_URL   = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${SHEET_GID}`;
export const EXPORT_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

export const PROXIES = [
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
];

export const AUTO_REFRESH_MS = 60_000;
