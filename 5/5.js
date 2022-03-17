const fs = require('fs').promises;

/**
 * Format input text file.
 * @param {String} path - file path
 * @returns {Array} - each element of the array is a line in the form [x1, y1, x2, y2]
 */
async function format(path) {
  const data = await fs.readFile(path, 'utf-8');
  return data
    .trim()
    .split('\n')
    .map((str) => str.match(/\d+/g).map((num) => +num));
}
/**
 * Adds a point to the grid and sets its value to 1.
 * If the point already exist increase its value instead.
 * @param {Array} grid
 * @param {String} key
 * @returns {Number} - point value at 'key' coordinates
 */
function addPoint(grid, key) {
  if (grid[key]) return grid[key] + 1;
  return 1;
}
/**
 *
 * @param {Array} grid
 * @returns {Number} Number of points where 2 or more lines overlap
 */
function getOverlaps(grid) {
  const points = Object.keys(grid);
  return points.reduce((result, current) => {
    if (grid[current] > 1) return result + 1;
    return result;
  }, 0);
}

/**
 * Solution 1
 * @param {Array} lines - array of lines where each line is in the form [x1, y1, x2, y2]
 * @returns {Number} Number of points where 2 or more lines overlap
 */
function solution1(lines) {
  const grid = {};
  lines.forEach((line) => {
    const [x1, y1, x2, y2] = [...line];
    const isHorizontal = y1 === y2;
    const isVertical = x1 === x2;
    if (isHorizontal) {
      // Determine the start and end of the x coord range
      const [xStart, xEnd] = x1 <= x2 ? [x1, x2] : [x2, x1];
      // for each x coord add the point to the grid and store the current number of overlaps as value
      for (let x = xStart; x <= xEnd; x += 1) {
        const key = `${x},${y1}`;
        grid[key] = addPoint(grid, key);
      }
    }
    if (isVertical) {
      // Determine the start and end of the y coord range
      const [yStart, yEnd] = y1 <= y2 ? [y1, y2] : [y2, y1];
      // for each yy coord add the point to the grid and store the current number of overlaps as value
      for (let y = yStart; y <= yEnd; y += 1) {
        const key = `${x1},${y}`;
        grid[key] = addPoint(grid, key);
      }
    }
  });
  return getOverlaps(grid);
}

format('./input.txt').then((lines) => {
  console.log('Solution 1: ', solution1(lines));
});
