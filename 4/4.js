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
  const data = await (
    await fs.readFile(input, 'utf-8')
  ).split('\n\n');

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

/** */
function printBoard(board) {
  const COLORS = {
    red: '\x1b[31m',
    blue: '\x1b[36m',
    reset: '\x1b[0m',
  };

  board.forEach((row) => {
    let rowString = '';
    row.forEach((number) => {
      if (number.called)
        rowString += `${COLORS.red} ${number.value}${COLORS.reset}`;
      else
        rowString += `${COLORS.blue} ${number.value}${COLORS.reset}`;
    });
    console.log(rowString);
  });
  console.log('');
}

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
 * @param {Array} boards
 * @param {Array} numbers
 * @returns {Number} - the board score * the winning number.
 */
function solution1(boards, numbers) {
  const localBoards = [...boards];
  let winningBoard;

  const winningNumber = numbers.find((number, numIndex) => {
    winningBoard = localBoards.find((board, boardIndex) => {
      localBoards[boardIndex] = updateBoard(board, number);
      return (
        numIndex >= 4 && isWinner(localBoards[boardIndex], number)
      );
    });
    if (winningBoard) return true;
    return false;
  });
  return getScore(winningBoard) * winningNumber;
}

format('./test.txt').then(([numbers, boards]) => {
  console.log('Solution 1: ', solution1(boards, numbers));
});
