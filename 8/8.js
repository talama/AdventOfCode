const fs = require('fs').promises;

/**
 * Format the input file so that each line maps to an element in an array
 * where the element is an object in the form {pattern: {String}, output: {String}}
 *
 * @param {String} filePath
 * @returns {Array} - array of objects in the form {pattern: {String}, output: {String}}
 */
async function format(filePath) {
  const data = await fs.readFile(filePath, 'utf-8');
  return data.trim().split('\n').map((elem) => {
    const line = elem.split('|');
    return {
      pattern: line[0].trim(),
      output: line[1],
    };
  });
}

/**
 * Returns the number represented by the output as decoded analizing the  corresponding input pattern
 *
 * @param {Object} entry - object in the form {pattern: String, output: String}
 * @returns {Number} - the output number decoded.
 */
function getNumber(entry) {
  let result = '';

  // Format the output as an array where each entries corresponds to a number.
  // Sort the pattern array based on the amount of segments needed to represent the number.
  const output = entry.output.split(' ');
  const pattern = entry.pattern
    .split(' ')
    .sort((a, b) => a.length - b.length);

  // The segments representing the number 1 are going to be at index 0 in the pattern array.
  const one = pattern[0];

  // The pattern representing the number six is the only pattern of length 6 that does not include both segments in the
  // pattern representing the number one.
  const six = pattern.find(
    (elem) =>
      elem.length === 6 &&
      !(elem.includes(one[0]) && elem.includes(one[1])),
  );

  // The letter corresponding to the original c segment is the one corresponding to the segment in the
  // number one not present in the pattern representing number six.
  const c = six.includes(one[0]) ? one[1] : one[0];

  // Array containing all the segments representing the number four.
  const fourSegments = pattern[2].split('');

  // We can determine which pattern corresponds to which number based on the pattern length alone
  // for numbers 1, 4, 7, 8.
  // We can use the pattern length and whether the pattern contains some specific segments for the rest of the numbers.
  // Numbers [2, 3, 5] have 5 segments and numbers [0, 6, 9] have 6 segments.
  output.forEach((elem) => {
    switch (elem.length) {
      case 2:
        result += '1';
        break;
      case 3:
        result += '7';
        break;
      case 4:
        result += '4';
        break;
      // If the pattern has 5 segments and contains both segements representing the number 1 then it must represent the number 3.
      // If it does not AND it includes the segment c, then it must be the pattern representing the number 2.
      // Else it must be the pattern representing the number 5.
      case 5:
        if (elem.includes(one[0]) && elem.includes(one[1]))
          result += '3';
        else if (elem.includes(c)) result += '2';
        else result += '5';
        break;
      // If the pattern has 6 segments and does not contains both segments representing the number 1 then it must be the pattern representing number 6.
      // If it does not AND it contains all the segments representing the number 4, then it must be the pattern representing the number 9.
      // If it does not, then it must be the pattern representing the number 0.
      case 6:
        if (!(elem.includes(one[0]) && elem.includes(one[1])))
          result += '6';
        else if (
          fourSegments.every((segment) => elem.includes(segment))
        )
          result += '9';
        else result += '0';
        break;
      case 7:
        result += '8';
        break;
      default:
        break;
    }
  });
  return +result;
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
        if ([2, 3, 4, 7].includes(digits.length)) return sum + 1;
        return sum;
      }, 0),
    0,
  );
}

/**
 *  Solution 2
 *
 * @param {Array} data - input data as an array of obects in the form {pattern: String, output: String}
 * @returns {Number} - the sum of all the output values.
 */
function solution2(data) {
  return data.reduce(
    (result, current) => result + getNumber(current),
    0,
  );
}

// Log solutions to console.
format('./input.txt').then((data) => {
  const outputValues = data.map((elem) => elem.output.split(' '));
  console.log(solution1(outputValues));
  console.log(solution2(data));
});
