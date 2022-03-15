const fs = require('fs').promises;

/**
 * Format the input file as an array of numbers to be called and an array of boards.
 * Each board is an array of rows and each element of a row is an object that stores
 * the number value and a boolean reperesenting if the number has been called or not:
 * {value: number, called: true|false}
 *
 * @param {String} input - input file path.
 * @returns {Array[numbers, boards]}
 */
async function format(input) {
  const data = await (await fs.readFile(input, 'utf-8'))
    .trim()
    .split('\n\n');

  const numbers = data
    .shift()
    .split(',')
    .map((number) => +number);

  const boards = data.map((board) =>
    board.split('\n').map((row) =>
      row
        .split(' ')
        .filter((number) => number !== '')
        .map((number) => ({ value: +number, called: false })),
    ),
  );
  return [numbers, boards];
}

// /**
//  * Helper function to print a board to console.
//  * Print the called numbers in red and the non-called numbers in cyan.
//  * @param {Array} board
//  *
// function printBoard(board) {
//   const COLORS = {
//     red: '\x1b[31m',
//     cyan: '\x1b[36m',
//     reset: '\x1b[0m',
//   };

//   board.forEach((row) => {
//     let rowString = '';
//     row.forEach((number) => {
//       if (number.called)
//         rowString += `${COLORS.red} ${number.value}${COLORS.reset}`;
//       else
//         rowString += `${COLORS.cyan} ${number.value}${COLORS.reset}`;
//     });
//     console.log(rowString);
//   });
//   console.log('');
// }

/**
 * Checks if a board is winning.
 * @param {Array} board
 * @returns {Boolean}
 */
function isWinner(board) {
  // we keep track of which colums we can skip checking
  // if a row has a number that has not been called
  // we can skip the corresponding column.
  const skipColumn = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  };

  // check rows and update skipColumn
  if (
    board.some((row) =>
      row.every((number, index) => {
        if (number.called) return true;
        skipColumn[index] = true;
        return false;
      }),
    )
  )
    return true;

  // check columns.
  // we use the first row elements index to convert a column to a row and check if they have all been called.
  if (
    board[0].some((_, columnIndex) => {
      if (skipColumn[columnIndex]) return false;
      return board
        .map((row) => row[columnIndex])
        .every((number) => number.called);
    })
  )
    return true;
  return false;
}

/**
 * Check if the number being called is on the board and returns the updated board.
 * @param {Array} board
 * @param {Number} num
 * @returns {Array} - the updated board
 */
function updateBoard(board, num) {
  return board.map((row) =>
    row.map((number) => {
      if (number.value === num)
        return { value: number.value, called: true };
      return number;
    }),
  );
}

/**
 * Calculates the score of the winning board as the sum of all the uncalled numbers.
 * @param {Array} board
 * @returns {Number} - the board score.
 */
function getScore(board) {
  return board.reduce(
    (rowSum, row) =>
      rowSum +
      row.reduce((sum, number) => {
        if (!number.called) return sum + number.value;
        return sum;
      }, 0),
    0,
  );
}

/**
 * Solution 1
 * @param {Array} numbers
 * @param {Array} boards
 * @returns {Number} - the board score * the winning number.
 */
function solution1(numbers, boards) {
  const localBoards = [...boards];
  let winningBoard;

  // find a number for which we can find a winning board.
  const winningNumber = numbers.find((num, numIndex) =>
    localBoards.find((board, boardIndex) => {
      // update the current board
      localBoards[boardIndex] = updateBoard(board, num);
      // if we find a winning board we store it in winningBoard
      if (numIndex >= 4 && isWinner(localBoards[boardIndex])) {
        winningBoard = localBoards[boardIndex];
        return true;
      }
      return false;
    }),
  );
  return getScore(winningBoard) * winningNumber;
}
/**
 * Solution 2
 * @param {Array} numbers
 * @param {Array} boards
 * @returns {Number} - the last winning board score * last winning number
 */
function solution2(numbers, boards) {
  let localBoards = [...boards];
  let lastWinBoard;
  let lastWinNum;

  numbers.forEach((num, numIndex) => {
    // update every board with the current number and filter out the winning boards
    localBoards = localBoards
      .map((board) => updateBoard(board, num))
      .filter((board) => {
        if (numIndex >= 4 && isWinner(board)) {
          // store the current last winning board and number
          lastWinBoard = board;
          lastWinNum = num;
          return false;
        }
        return true;
      });
  });
  return getScore(lastWinBoard) * lastWinNum;
}

// forma input and print solutions to console
format('./input.txt').then(([numbers, boards]) => {
  console.log('Solution 1: ', solution1(numbers, boards));
  console.log('Solution 2: ', solution2(numbers, boards));
});
