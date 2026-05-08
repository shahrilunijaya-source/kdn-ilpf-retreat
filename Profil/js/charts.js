import { ANIMAL_EMOJI } from './transform.js';

// Renders the four score bars. Returns HTML string.
export function renderScoreBars(scores) {
  const total = Object.values(scores).reduce((s, v) => s + v, 0) || 1;
  const winName = Object.entries(scores).sort((x, y) => y[1] - x[1])[0][0];

  return ['Rabbit', 'Tortoise', 'Fox', 'Sloth'].map(name => {
    const v = scores[name];
    const pct = (v / total) * 100;
    const isWin = name === winName;
    return `<div class="score ${isWin ? 'win' : ''}">
      <div class="top"><div class="name">${ANIMAL_EMOJI[name]} ${name}</div><div class="num">${v}</div></div>
      <div class="bar"><div class="fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
}
