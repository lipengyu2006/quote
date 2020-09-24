const fs = require('fs');

const path = './data/phrase/202009.tsv';
const data = fs.readFileSync(path, 'UTF-8');
const lines = data.split(/\r?\n/);

const words = [];
lines.forEach(l => {
  const units = l.split('\t');
  const word = units.shift();
  if (units.length > 1) units[0] = '[ ' + units[0] + ' ]';
  const word_info = units.map(v => `<dd>${ v }</dd>`).join('');
  words.push(`<dl><dt>${ word }</dt>${ word_info }</dl>`);
});

const html = `<div id="phrase">${ words.join('') }</div>`;
const file = './html/bar/episode_phrase.html';
fs.writeFileSync(file, html);
