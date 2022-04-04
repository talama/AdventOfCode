const fs = require('fs').promises;

/**
 * Format input text file.
 * @param {String} path - file path
 * @returns {Array} - array representing the inital state of the lanternsfish school.
 */
async function format(path) {
  const data = await fs.readFile(path, 'utf-8');
  return data
    .trim()
    .split(',')
    .map((num) => +num);
}

/**
 *
 * @param {Array} currentState
 * @returns {Array} - the updated state
 */
function updateState(currentState) {
  // create local copy of current state
  const localState = currentState;
  // shift the array to the left and store the number of new fishes to be created.
  const newFishes = localState.shift();
  // update the parent position [6] and the new fishes position [8]
  // and return the updated state.
  localState[6] += newFishes;
  localState.push(newFishes);
  return localState;
}

// Solutions
format('./input.txt').then((initialState) => {
  // create an array to store the number of fishes on each timer in the range [0-9]
  let currentState = Array(9).fill(0);
  // initialize the array based on the initial state of the fish school.
  initialState.forEach((elem) => {
    currentState[elem] += 1;
  });
  // update the state of the fish school each day
  // and calculate the number of fishes for solution1 and solution2
  for (let day = 1; day <= 256; day += 1) {
    currentState = updateState(currentState);
    if (day === 80) {
      console.log(
        `Solution 1: ${currentState.reduce(
          (acc, curr) => acc + curr,
        )}`,
      );
    }
  }
  console.log(
    `Solution 2: ${currentState.reduce((acc, curr) => acc + curr)}`,
  );
});
