const fs = require('fs').promises;

/**
 *
 * @param {String} filePath
 * @returns {Array} - sorted array of numbers representing the crabs positions
 */
async function format(filePath) {
  return (await fs.readFile(filePath, 'utf-8'))
    .trim()
    .split(',')
    .map((str) => +str)
    .sort((a, b) => a - b);
}

/**
 *
 * @param {Array} data
 * @returns {Number} median value of the array
 */
function median(data) {
  const size = data.length;
  if (size % 2 !== 0) return data[(size - 1) / 2];
  return (data[size / 2] + data[size / 2 - 1]) / 2;
}

/**
 * Calculates the total fuel needed by the crabs in [crabPositions] to reach position
 * assuming they consume one unit of fuel each step
 *
 * @param {Number} position
 * @param {Array} crabPositions
 * @returns {Number} - total fuel consumed by each crab to reach position
 */
function getFuel(position, crabPositions) {
  return crabPositions.reduce(
    (fuel, current) => fuel + Math.abs(current - position),
    0,
  );
}

/**
 * Calculates the total fuel needed by the crabs in [crabPositions] to reach position
 * assuming the fuel they consume increases by one unit with each step.
 *
 * @param {Number} position
 * @param {Array} crabPositions
 * @returns - total fuel consumed by the crabs to reach position where fuel consumed increases
 */
function gaussianDistance(position, crabPositions) {
  return crabPositions.reduce((fuel, current) => {
    const distance = Math.abs(current - position);
    return fuel + (distance * (distance + 1)) / 2;
  }, 0);
}

// Solutions
format('./input.txt').then((crabPositions) => {
  // solution 1 - find median position of the array and calculate the fuel needed for all the crab to reach it.
  console.log(
    `Solution 1: ${getFuel(median(crabPositions), crabPositions)}`,
  );

  // solution 2
  // Find the min and max positions in the crab positions array,  and for each position inbetween calculate the gaussian distance
  // Pick the position for which less fuel is consumed.
  const [minPos, maxPos] = [
    crabPositions[0],
    crabPositions[crabPositions.length - 1],
  ];
  let minFuel = Infinity;
  for (let pos = minPos; pos <= maxPos; pos += 1) {
    const currentFuel = gaussianDistance(pos, crabPositions);
    if (currentFuel < minFuel) minFuel = currentFuel;
  }
  console.log(`Solution 2: ${minFuel}`);
});
