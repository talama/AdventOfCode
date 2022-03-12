const fs = require('fs').promises;

async function format(input) {
  const data = await (
    await fs.readFile(input, 'utf-8')
  ).split('\n\n');

  const numbers = data
    .shift()
    .split(',')
    .map((number) => +number);

  const boards = data.map((board) =>
    board.split('\n').map((row) =>
      row
        .split(' ')
        .filter((number) => number !== '')
        .map((number) => ({ value: +number, called: false })),
    ),
  );

  return [numbers, boards];
}

format('./test.txt').then((data) => console.log(data[1][0]));
