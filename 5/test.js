const fs = require('fs').promises;

async function format(path) {
  const data = await fs.readFile(path, 'utf-8');
  const lines = data
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
    })
    .filter((line) => line.x1 === line.x2 || line.y1 === line.y2);

  const gridSize = lines.reduce(
    (result, line) => {
      const grid = { ...result };
      if (line.x1 > grid.x) grid.x = line.x1 + 1;
      if (line.x2 > grid.x) grid.x = line.x2 + 1;
      if (line.y1 > grid.y) grid.y = line.y1 + 1;
      if (line.y2 > grid.y) grid.y = line.y2 + 1;
      return grid;
    },
    { x: 0, y: 0 },
  );
  return [lines, gridSize];
}

function printGrid(grid) {
  grid.forEach((row) => {
    let rowString = '';
    row.forEach((point) => {
      rowString += `${point}`;
    });
    console.log(rowString);
  });
}

function drawLine(line, grid) {
  const localGrid = [...grid];
  const isHorizontal = line.y1 === line.y2;
  if (isHorizontal) {
    const y = line.y1;
    const [xStart, xEnd] =
      line.x1 <= line.x2 ? [line.x1, line.x2] : [line.x2, line.x1];
    localGrid[y] = localGrid[y].map((point, index) => {
      if (index >= xStart && index <= xEnd) {
        return point + 1;
      }
      return point;
    });
  } else {
    const x = line.x1;
    const [yStart, yEnd] =
      line.y1 <= line.y2 ? [line.y1, line.y2] : [line.y2, line.y1];
    localGrid.forEach((row, rowIndex) => {
      if (rowIndex >= yStart && rowIndex <= yEnd)
        localGrid[rowIndex][x] += 1;
    });
  }
  return localGrid;
}

format('./input.txt').then(([lines, gridSize]) => {
  let grid = Array(gridSize.y)
    .fill(0)
    .map(() => Array(gridSize.x).fill(0));

  lines.forEach((line) => {
    grid = drawLine(line, grid);
  });
  const overlaps = grid.reduce((result, row) => {
    let current = result;
    row.forEach((point) => {
      if (point >= 2) current += 1;
    });
    return current;
  }, 0);
  console.log('Solution 1: ', overlaps);
});
