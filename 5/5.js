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
 * Create a grid from an array of lines.
 * @param {Array} lines - lines must be in the form [x1, x2, y1, y2]
 * @param {Boolean} useDiagonal - wheter to account for 45 degree diagonal lines or not.
 * @returns {Array} grid - the final grid where all the points have been stored with their respective values.
 */
function creatGrid(lines, useDiagonal = false) {
  const grid = {};
  lines.forEach((line) => {
    const [x1, y1, x2, y2] = [...line];
    const isHorizontal = y1 === y2;
    const isVertical = x1 === x2;
    const isDiagonal = Math.abs(x1 - x2) === Math.abs(y1 - y2);
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
      // for each y coord add the point to the grid and store the current number of overlaps as value
      for (let y = yStart; y <= yEnd; y += 1) {
        const key = `${x1},${y}`;
        grid[key] = addPoint(grid, key);
      }
    }
    if (isDiagonal && useDiagonal) {
      // determine how many points in the line
      const numPoints = Math.abs(x1 - x2);
      // we always start at the point with coords [x1, y1]
      // so we must determine if the increment is going to be positve or negative for both x and y
      const xIncrement = x1 < x2 ? +1 : -1;
      const yIncrement = y1 < y2 ? +1 : -1;
      // starting values for x and y
      let [x, y] = [x1, y1];
      for (let i = 0; i <= numPoints; i += 1) {
        const key = `${x},${y}`;
        grid[key] = addPoint(grid, key);
        x += xIncrement;
        y += yIncrement;
      }
    }
  });
  return grid;
}

/**
 * Solution 1
 * @param {Array} lines - array of lines where each line is in the form [x1, y1, x2, y2]
 * @returns {Number} Number of points where 2 or more lines overlap
 */
function solution1(lines) {
  const grid = creatGrid(lines);
  return getOverlaps(grid);
}

/**
 * Solution 2 - Accounts for 45 degrees diagonal lines too.
 * @param {Array} lines - array of lines where each line is in the form [x1, y1, x2, y2]
 * @returns {Number} Number of points where 2 or more lines overlap
 */
function solution2(lines) {
  const useDiagonal = true;
  const grid = creatGrid(lines, useDiagonal);
  return getOverlaps(grid);
}

format('./input.txt').then((lines) => {
  console.log('Solution 1: ', solution1(lines));
  console.log('Solution 2: ', solution2(lines));
});
