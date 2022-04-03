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
    .split(',')
    .map((num) => +num);
}

function updateDay(fishArray) {
  return fishArray.flatMap((fish) => {
    if (fish === 0) return [6, 8];
    return fish - 1;
  });
}

format('./input.txt').then((data) => {
  let result = data;
  for (let i = 1; i <= 256; i += 1) {
    result = updateDay(result);
  }
  console.log(result.length);
});
