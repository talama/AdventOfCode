const fs = require('fs').promises;

/**
 *
 * @param {String} filePath
 * @returns {Array} - array o numbers representing the crabs positions
 */
async function format(filePath) {
  return (await fs.readFile(filePath, 'utf-8'))
    .trim()
    .split(',')
    .map((str) => +str);
}

/**
 *
 * @param {Array} data
 * @returns {Number} median value of the array
 */
function median(data) {
  const localData = data;
  localData.sort((a, b) => a - b);
  const size = localData.length;
  if (size % 2 !== 0) return localData[(size - 1) / 2];
  return (localData[size / 2] + localData[size / 2 - 1]) / 2;
}

/**
 *
 * @param {Number} position
 * @param {Array} crabPositions
 * @returns {Number} - total fuel consumed by each crab to reach the median position
 */
function getFuel(medianPosition, crabPositions) {
  return crabPositions.reduce(
    (fuel, current) => fuel + Math.abs(current - medianPosition),
    0,
  );
}

// Solutions
format('./input.txt').then((crabPositions) => {
  const medianPosition = median(crabPositions);
  console.log(
    `Solution 1: ${getFuel(medianPosition, crabPositions)}`,
  );
});
