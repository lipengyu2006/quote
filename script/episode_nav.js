const fs = require('fs');
const path = require('path');

const dir = './html/episode/';
const dir_path = path.resolve(dir);
const info = dir_tree(dir_path);
const folders = info.children.sort((a, b) => b.name - a.name);
//const json = JSON.stringify(dir_tree(dir_path), null, 2);
//fs.writeFileSync('./data/episode.json', json);
const html = template_nav_left(folders);
const file = './html/nav/episode_left.html';
fs.writeFileSync(file, html);

function template_nav_left(folders) {
  const tpl_level_2 = [];
  folders.forEach((v, i) => {
    const year = v.name;
    const month = v.children.sort((a, b) => b.name.split(/[_.]/)[1] - a.name.split(/[_.]/)[1]);
    const tpl_year = `<div class="level_1 y"><div>${ year }</div></div>`;
    const tpl_month = month.map(v => `<div class="level_1 m"><div>-${ v.name.split(/[_.]/)[1] }</div></div>`).join('');
    tpl_level_2.push(`<div class="level_2">${ tpl_year + tpl_month }</div>`);
  });
  return `<div class="nav_left">${ tpl_level_2.join('') }</div>`;
}

function dir_tree(dirPath) {
  const stats = fs.lstatSync(dirPath),
        info = {
          path: path.resolve(dirPath),
          name: path.basename(dirPath)
        };

  if (stats.isDirectory()) {
    info.type = 'folder';
    info.children = fs.readdirSync(dirPath).map(function(child) {
      return dir_tree(dirPath + '/' + child);
    });
  } else {
    // Assuming it's a file. In real life it could be a symlink or
    // something else!
    info.type = 'file';
  }

  return info;
}