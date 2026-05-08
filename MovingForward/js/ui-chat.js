import { fetchResponses } from './sheets.js';
import { QUESTIONS } from './transform.js';

const CLAUDE_MODEL = 'claude-sonnet-4-6';
const LS_KEY = 'kdnilpf_apikey';

let responses = [];
let dataReady = false;
let apiKey = localStorage.getItem(LS_KEY) || '';
let history = []; // { role, content }
let streaming = false;

/* ── DOM ── */
const chatArea   = document.getElementById('chatArea');
const welcome    = document.getElementById('welcome');
const msgInput   = document.getElementById('msgInput');
const sendBtn    = document.getElementById('sendBtn');
const inputHint  = document.getElementById('inputHint');
const dataPill   = document.getElementById('dataPill');
const dataText   = document.getElementById('dataText');
const keyBtn     = document.getElementById('keyBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const keyInput   = document.getElementById('keyInput');
const modalSave  = document.getElementById('modalSave');
const modalCancel = document.getElementById('modalCancel');

/* ── INIT ── */
updateKeyBtn();
loadData();

document.getElementById('suggestions').addEventListener('click', e => {
  const s = e.target.closest('.suggestion');
  if (s) sendMessage(s.textContent);
});

msgInput.addEventListener('input', () => {
  msgInput.style.height = 'auto';
  msgInput.style.height = Math.min(msgInput.scrollHeight, 160) + 'px';
  updateSendBtn();
});

msgInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); trySend(); }
});

sendBtn.addEventListener('click', trySend);

keyBtn.addEventListener('click', () => {
  keyInput.value = apiKey;
  modalBackdrop.classList.add('open');
  keyInput.focus();
});
modalCancel.addEventListener('click', () => modalBackdrop.classList.remove('open'));
modalBackdrop.addEventListener('click', e => { if (e.target === modalBackdrop) modalBackdrop.classList.remove('open'); });
modalSave.addEventListener('click', saveKey);
keyInput.addEventListener('keydown', e => { if (e.key === 'Enter') saveKey(); });

function saveKey() {
  apiKey = keyInput.value.trim();
  if (apiKey) localStorage.setItem(LS_KEY, apiKey);
  else localStorage.removeItem(LS_KEY);
  modalBackdrop.classList.remove('open');
  updateKeyBtn();
  updateSendBtn();
}

function updateKeyBtn() {
  if (apiKey) { keyBtn.textContent = '🔑 API Key ✓'; keyBtn.classList.add('has-key'); }
  else { keyBtn.textContent = '🔑 API Key'; keyBtn.classList.remove('has-key'); }
}

function updateSendBtn() {
  const canSend = dataReady && apiKey && msgInput.value.trim() && !streaming;
  sendBtn.disabled = !canSend;
  if (!apiKey) inputHint.textContent = 'Klik "API Key" untuk set Anthropic API key dahulu';
  else if (!dataReady) inputHint.textContent = 'Tunggu data survey dimuatkan…';
  else inputHint.textContent = `${responses.length} respons dimuatkan · Claude ${CLAUDE_MODEL}`;
}

/* ── DATA ── */
async function loadData() {
  dataPill.className = 'data-pill loading';
  try {
    responses = await fetchResponses();
    dataReady = true;
    dataPill.className = 'data-pill ready';
    dataText.textContent = `${responses.length} respons`;
  } catch (err) {
    dataPill.className = 'data-pill error';
    dataText.textContent = 'Gagal muatkan data';
  }
  updateSendBtn();
}

/* ── SYSTEM PROMPT ── */
function buildSystemPrompt() {
  const lines = [
    'Anda adalah penganalisis data survey KDN iLPF yang pakar.',
    'Jawab soalan berdasarkan data survey di bawah sahaja.',
    'Gunakan bahasa yang sama dengan soalan pengguna (Melayu atau Inggeris).',
    'Format jawapan dengan jelas — gunakan senarai, jadual, atau perenggan pendek.',
    'Jika soalan tidak berkaitan data, beritahu pengguna dengan sopan.',
    '',
    `Tarikh: ${new Date().toLocaleDateString('ms-MY')}`,
    `Jumlah respons: ${responses.length}`,
    '',
    '=== DATA SURVEY ===',
  ];

  for (const r of responses) {
    lines.push(`\n--- Respons #${responses.indexOf(r) + 1}: ${r.name} (${r.dept}) ---`);
    lines.push(`Kekerapan guna iLPF: ${r.freq}`);
    for (const q of QUESTIONS) {
      const val = r[q.key];
      if (!val || val === '—') continue;
      const display = Array.isArray(val) ? val.join(', ') : val;
      if (display && display !== '—') lines.push(`${q.label}: ${display}`);
    }
  }

  return lines.join('\n');
}

/* ── SEND ── */
function trySend() {
  const text = msgInput.value.trim();
  if (!text || !dataReady || !apiKey || streaming) return;
  sendMessage(text);
}

async function sendMessage(text) {
  if (streaming) return;

  // hide welcome
  if (welcome) welcome.remove();

  appendMsg('user', text);
  msgInput.value = '';
  msgInput.style.height = 'auto';
  history.push({ role: 'user', content: text });

  const assistantBubble = appendMsg('assistant', '');
  const typingEl = document.createElement('div');
  typingEl.className = 'typing';
  typingEl.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  assistantBubble.appendChild(typingEl);

  streaming = true;
  updateSendBtn();

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 2048,
        system: buildSystemPrompt(),
        messages: history,
        stream: true,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `HTTP ${res.status}`);
    }

    typingEl.remove();
    let fullText = '';
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6);
        if (data === '[DONE]') break;
        try {
          const evt = JSON.parse(data);
          if (evt.type === 'content_block_delta' && evt.delta?.text) {
            fullText += evt.delta.text;
            assistantBubble.innerHTML = renderMarkdown(fullText);
            chatArea.scrollTop = chatArea.scrollHeight;
          }
        } catch { /* skip malformed lines */ }
      }
    }

    history.push({ role: 'assistant', content: fullText });

  } catch (err) {
    typingEl.remove();
    assistantBubble.innerHTML = `<span style="color:var(--rose)">Ralat: ${err.message}</span>`;
    history.pop(); // remove failed user msg from history
  }

  streaming = false;
  updateSendBtn();
  chatArea.scrollTop = chatArea.scrollHeight;
}

/* ── RENDER ── */
function appendMsg(role, text) {
  const wrap = document.createElement('div');
  wrap.className = `msg ${role}`;

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = role === 'user' ? '👤' : '🤖';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  if (text) bubble.innerHTML = renderMarkdown(text);

  wrap.appendChild(avatar);
  wrap.appendChild(bubble);
  chatArea.appendChild(wrap);
  chatArea.scrollTop = chatArea.scrollHeight;
  return bubble;
}

function renderMarkdown(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h3>$1</h3>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^[-•*] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^(?!<[hul])(.+)$/gm, (m) => m.startsWith('<') ? m : m);
}
