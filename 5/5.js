const fs = require('fs').promises;

async function format(path) {
  const data = await fs.readFile(path, 'utf-8');
  return data
    .trim()
    .split('\n')
    .map((str) => {
      const line = str.match(/\d{1,3}/g);
      return {
        x1: +line[0],
        y1: +line[1],
        x2: +line[2],
        y2: +line[3],
      };
    });
}

format('./test.txt').then((lines) => {
  console.log(lines);
});
