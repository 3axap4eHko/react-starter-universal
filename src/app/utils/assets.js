import fs from 'fs';
import CleanCSS from 'clean-css';

const cleanCSS = new CleanCSS({});

function waitFile(filename) {
  return new Promise(resolve => {
    const timeerId = setInterval(() => {
      if (fs.existsSync(filename)) {
        clearInterval(timeerId);
        resolve(filename);
      }
    }, 100);
  });
}

function styles(assets) {
  if (process.env.NODE_ENV === 'production') {
    const style = assets.css.map(asset => fs.readFileSync(`${process.cwd()}/www/${asset}`, 'utf8')).join('\n');
    return `<style>${cleanCSS.minify(style).styles}</style>`;
  }
  return assets.css.map(asset => `<link rel="stylesheet" href="/${asset}" />`).join('\n');
}

function scripts(assets) {
  return assets.js.map(asset => `<script src="/${asset}"></script>`).join('\n');
}

export default async function () {
  const filename = await waitFile(`${process.cwd()}/assets.json`);
  const assets = JSON.parse(fs.readFileSync(filename, 'utf8'));

  return {
    css: styles(assets),
    js: scripts(assets),
  };
}

