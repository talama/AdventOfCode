const fs = require('fs').promises;

// const test = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

/**
 * Formats the input in an array of numbers
 * @param {String} input - The input file path
 * @returns {Array}
 */
async function format(input) {
  const data = await fs.readFile(input, 'utf-8');
  return data.split('\n').map((str) => parseInt(str, 10));
}

/**
 *
 * @param {Array} data - The array of numbers to be used as input
 * @returns {Number} - Number of measurments bigget than the previous
 */
function depths(data) {
  return data.reduce((result, current, index) => {
    if (current > data[index - 1]) return result + 1;
    return result;
  }, 0);
}

/**
 * Builds an array of values by sampling every 3 numbers in the input array
 * @param {Array} data - the array of numbers to sample
 * @returns {Array} - the new array
 */
function sample(data) {
  return data.map((current, index, arr) => {
    // we return the last 2 numbers as they are
    if (index > arr.length - 3) return current;

    // sum the current number with the next consecutive 2
    let tmp = 0;
    for (let i = 1; i < 3; i += 1) tmp += arr[index + i];
    return current + tmp;
  });
}

// format input file and print solutions to console
format('./input.txt').then((data) => {
  const solution1 = depths(data);
  const solution2 = depths(sample(data));
  console.log(`Solution 1: ${solution1}\nSolution 2: ${solution2}`);
});
