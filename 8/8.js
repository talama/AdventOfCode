const fs = require('fs').promises;

/**
 *
 * @param {String} filePath
 * @returns {Array} - array of ONLY output values
 */
async function format(filePath) {
  const data = (await fs.readFile(filePath, 'utf-8'))
    .trim()
    .split('\n')
    .map((elem) => {
      let tmp = elem.split('|');
      return tmp[1].trim().split(' ');
    });

  return data;
}

/**
 * Solution 1
 *
 * @param {Array} outputValues
 * @returns {Number} - number of elements in the array whose length is in [2, 3, 4, 7]
 */
function solution1(outputValues) {
  return outputValues.reduce(
    (result, current) =>
      result +
      current.reduce((sum, digits) => {
        if ([2, 3, 4, 7].includes(digits.length)) sum += 1;
        return sum;
      }, 0),
    0,
  );
}

// Log solutions to console.
format('./input.txt').then((outputValues) => {
  console.log(solution1(outputValues));
});
