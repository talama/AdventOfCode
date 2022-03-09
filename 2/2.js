const fs = require('fs').promises;

// const test = [
//   { direction: 'forward', value: 5 },
//   { direction: 'down', value: 5 },
//   { direction: 'forward', value: 8 },
//   { direction: 'up', value: 3 },
//   { direction: 'down', value: 8 },
//   { direction: 'forward', value: 2 },
// ];

/**
 * Formats the input file as an array of objects.
 * Each object contains the direction of the movement as a string and the movement amount as a number.
 * es. {direction: 'up', value: 5}
 * @param {String} input - file path
 * @returns {Array}
 */
async function format(input) {
  const data = await fs.readFile(input, 'utf-8');
  return data.split('\n').map((element) => {
    const instruction = element.split(' ');
    return {
      direction: instruction[0],
      value: parseInt(instruction[1], 10),
    };
  });
}

/**
 * Updates the current pos ition based on the directions in the data array.
 * es. {direction: 'up', value: 5}
 * @param {Array} data
 * @returns {Number} - product of final position and final depth.
 */
function solution1(data) {
  const finalPosition = data.reduce(
    (position, instruction) => {
      const newPosition = { ...position };
      switch (instruction.direction) {
        case 'forward':
          newPosition.horizontal += instruction.value;
          break;
        case 'up':
          newPosition.depth -= instruction.value;
          break;
        case 'down':
          newPosition.depth += instruction.value;
          break;
        default:
          break;
      }
      return newPosition;
    },
    { horizontal: 0, depth: 0 },
  );
  return finalPosition.horizontal * finalPosition.depth;
}

/**
 * Updates the current pos ition based on the directions in the data array.
 * es. {direction: 'up', value: 5}
 * @param {Array} data
 * @returns {Number} - product of final position and final depth.
 */
function solution2(data) {
  const finalPosition = data.reduce(
    (position, instruction) => {
      const newPosition = { ...position };
      switch (instruction.direction) {
        case 'forward':
          newPosition.horizontal += instruction.value;
          newPosition.depth += newPosition.aim * instruction.value;
          break;
        case 'up':
          newPosition.aim -= instruction.value;
          break;
        case 'down':
          newPosition.aim += instruction.value;
          break;
        default:
          break;
      }
      return newPosition;
    },
    { horizontal: 0, depth: 0, aim: 0 },
  );
  return finalPosition.horizontal * finalPosition.depth;
}

// console.log(solution1(test));
// console.log(solution2(test));
format('./input.txt').then((data) => {
  console.log(solution1(data));
  console.log(solution2(data));
});
