const fs = require('fs').promises;

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

function isWinner(board) {
  const skipColumn = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  };
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

function updateBoard(board, num) {
  return board.map((row) =>
    row.map((number) => {
      if (number.value === num)
        return { value: number.value, called: true };
      return number;
    }),
  );
}

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

function solution1(boards, numbers) {
  const localBoards = [...boards];
  let winningBoard;

  const winningNumber = numbers.find((number, numIndex) => {
    localBoards.find((board, boardIndex) => {
      const currentBoard = updateBoard(board, number);
      if (numIndex >= 4 && isWinner(currentBoard, number)) {
        winningBoard = currentBoard;
        return true;
      }
      localBoards[boardIndex] = currentBoard;
      return undefined;
    });
    if (winningBoard) return true;
    return undefined;
  });

  return getScore(winningBoard) * winningNumber;
}

format('./test.txt').then(([numbers, boards]) => {
  console.log(solution1(boards, numbers));
});
