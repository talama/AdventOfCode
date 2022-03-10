const fs = require('fs').promises;

// const test = [
//   '00100',
//   '11110',
//   '10110',
//   '10111',
//   '10101',
//   '01111',
//   '00111',
//   '11100',
//   '10000',
//   '11001',
//   '00010',
//   '01010',
// ];

/**
 * Formats the input file as an array of strings.
 * Each strings represents a binary number.
 * @param {String} input - file path
 * @returns {Array}
 */
async function format(input) {
  const data = await fs.readFile(input, 'utf-8');
  return data.split('\n');
}

/**
 * Finds the most common bit in the correspondin position of all the binary numbers.
 * @param {Array} data
 * @returns {Array} - gamma rate as an array of bits
 */
function findGamma(data) {
  // creates an initial value for gamma
  const gammaLength = data[0].length;
  const initialGamma = Array(gammaLength).fill('0');
  // finds the most common bit at each position iterating over the data array column by column
  return initialGamma.map((_bit, index) => {
    const bits = [0, 0];
    data.forEach((element) => {
      if (element[index] === '0') bits[0] += 1;
      else bits[1] += 1;
    });
    if (bits[0] > bits[1]) return '0';
    return '1';
  });
}

format('./input.txt').then((data) => {
  const gamma = findGamma(data);
  const epsilon = gamma.map((bit) => (bit === '0' ? '1' : '0'));
  const solution1 =
    parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
  console.log(`Solution1: ${solution1}`);
});
