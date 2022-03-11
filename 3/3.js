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
/**
 * Solution 1 - Returns the product of gamma and epsilon as an integer.
 * @param {Array} data
 * @returns
 */
function powerConsumption(data) {
  const gamma = findGamma(data);
  const epsilon = gamma.map((bit) => (bit === '0' ? '1' : '0'));
  return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
}

/**
 * Filters the data array based on the value of the bit at 'position' and returns the filtered array with
 * the elements with the most significant digit in that postion if the rating is 'oxygen', or the array with the elements
 * with the least significant bit in that position if the rating is 'co2'.
 * @param {Array} data
 * @param {Number} position
 * @param {String} rating
 * @returns {Array} the filtered array based on the chosen rating
 */
function findRating(data, position, rating) {
  const oneArray = [];
  const zeroArray = [];
  data.forEach((element) => {
    if (element[position] === '0') zeroArray.push(element);
    else oneArray.push(element);
  });
  if (rating === 'oxygen') {
    if (oneArray.length >= zeroArray.length) return oneArray;
    return zeroArray;
  }
  if (rating === 'co2') {
    if (oneArray.length >= zeroArray.length) return zeroArray;
    return oneArray;
  }
  throw new Error("Rating must be 'oxygen' or 'co2'");
}

/**
 * Solution 2
 * @param {Array} data
 * @returns
 */
function lifeSupport(data) {
  let position = 0;
  const postionMax = data[0].length;

  // filter data to initialize oxygen and co2
  let oxygen = findRating(data, position, 'oxygen');
  let co2 = findRating(data, position, 'co2');

  // keep filtering untill both oxygen and co2 length is 1
  while (oxygen.length > 1 || co2.length > 1) {
    position += 1;
    if (position > postionMax)
      throw new Error('Position out of boundaries.');
    if (oxygen.length > 1)
      oxygen = findRating(oxygen, position, 'oxygen');
    if (co2.length > 1) co2 = findRating(co2, position, 'co2');
  }
  return parseInt(oxygen, 2) * parseInt(co2, 2);
}

format('./input.txt')
  .then((data) => {
    console.log(`Solution 1: ${powerConsumption(data)}`);
    console.log(`Solution 2: ${lifeSupport(data)}`);
  })
  .catch((err) => console.log(`${err}`));
