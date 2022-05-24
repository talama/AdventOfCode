const fs = require('fs').promises;

/**
 * Format the input file as an array representing a matrix of all the points in the input file
 * with an amount of rows equal to the number of lines in the file, and an amount of columns equal to
 * the number of elements on each line. matrix[rows][columns]
 *
 * @param {String} filePath
 * @returns {Array} - matrix of numnbers representing all the points from the input file.
 */
async function format(filePath) {
  const data = await fs.readFile(filePath, 'utf-8');
  return data
    .trim()
    .split('\n')
    .map((elem) => [...elem].map((str) => +str));
}

/**
 * Return the risk level for the current element.
 * The risk is the element value + 1 if all the
 * neighbours values are higher, 0 otherwise.
 *
 * @param {Array} heightmap
 * @param {Number} elem - current element value at array[rowIdx][colIdx]
 * @param {Number} rowIdx - current element row index
 * @param {Number} colIdx - current element column index
 * @returns {Number} -
 */
function riskLevel(heightmap, elem, rowIdx, colIdx) {
  const neighbours = [];
  // add left neighbour if the column index is not out of bound
  if (colIdx - 1 >= 0) neighbours.push(heightmap[rowIdx][colIdx - 1]);
  // add right neighbour column index is not out of bound
  if (colIdx + 1 <= heightmap[0].length - 1)
    neighbours.push(heightmap[rowIdx][colIdx + 1]);
  // add top neighbour if row index is not out of bound
  if (rowIdx - 1 >= 0) neighbours.push(heightmap[rowIdx - 1][colIdx]);
  // add bottom neighbour if row index is not out of bound
  if (rowIdx + 1 <= heightmap.length - 1)
    neighbours.push(heightmap[rowIdx + 1][colIdx]);
  // if all the neighbours are higher than the current element we found a low
  // and we return its risk level (element value + 1)
  if (neighbours.every((neighbour) => neighbour > elem))
    return elem + 1;
  return 0;
}

/**
 * Solution 1.
 *
 * @param {Array} data
 * @returns {Number} - returns the sum of all the risk levels on the heightmap.
 */
function solution1(data) {
  return data.reduce(
    (result, row, rowIdx, heightmap) =>
      result +
      row.reduce(
        (acc, elem, colIdx) =>
          acc + riskLevel(heightmap, elem, rowIdx, colIdx),
        0,
      ),
    0,
  );
}

// Print solutions to console.
format('./input.txt').then((data) => {
  console.log(solution1(data));
});
