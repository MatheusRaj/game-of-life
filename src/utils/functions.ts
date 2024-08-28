import {
  CELL_SIZE,
  COLORS,
  HEIGHT,
  NUM_COLS,
  NUM_ROWS,
  WIDTH,
  IS_ALIVE,
  IS_DEAD,
} from "./constants";
import { Board } from "./types";

/**
 * Creates a new game board with the specified number of rows and columns.
 *
 * @param {number} rows - The number of rows in the board.
 * @param {number} cols - The number of columns in the board.
 * @returns {Board} A 2D array representing the initial board state.
 */
export const createBoard = (rows: number, cols: number) => {
  return Array.from({ length: rows }, () => new Array(cols).fill(IS_DEAD));
};

/**
 * Draws the game board on a canvas.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element where the board will be drawn.
 * @param {Board} boardState - The current state of the game board.
 */
export const drawBoard = (canvas: HTMLCanvasElement, boardState: Board) => {
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.strokeStyle = "green";
  ctx.lineWidth = 0.1;

  // Loop through each cell in the grid
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      ctx.fillStyle = COLORS[boardState[row][col]];

      // Draw the cell rectangle
      ctx.fillRect(
        Math.floor((WIDTH / NUM_ROWS) * row),
        Math.floor((HEIGHT / NUM_COLS) * col),
        CELL_SIZE,
        CELL_SIZE
      );

      // Draw the cell's border
      ctx.strokeRect(
        Math.floor((WIDTH / NUM_ROWS) * row),
        Math.floor((HEIGHT / NUM_COLS) * col),
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }
};

/**
 * Counts the number of alive neighbors around a specific cell.
 *
 * @param {number} r0 - The row index of the cell.
 * @param {number} c0 - The column index of the cell.
 * @param {Board} currentBoardState - The current state of the game board.
 * @returns {number} The number of alive neighbors.
 */
export const countAlive = (
  r0: number,
  c0: number,
  currentBoardState: Board
) => {
  let alive = 0;

  // Loop through the 3x3 grid centered around the cell at (r0, c0)
  for (let newRow = -1; newRow <= 1; newRow++) {
    for (let newCol = -1; newCol <= 1; newCol++) {
      if (newRow !== 0 || newCol !== 0) {
        // Calculate the index of the neighbor, wrapping around the grid
        const row = (r0 + newRow + NUM_ROWS) % NUM_ROWS;
        const col = (c0 + newCol + NUM_COLS) % NUM_COLS;

        // Increment the count of alive neighbors if the cell is alive
        if (currentBoardState[row][col] === IS_ALIVE) {
          alive++;
        }
      }
    }
  }

  return alive;
};

/**
 * Computes the next state of the game board after a number of iterations.
 *
 * @param {number} [iterations=1] - The number of iterations to compute.
 * @param {Board} prevBoardState - The previous state of the game board.
 * @returns {Board} The new state of the game board after the iterations.
 */
export const computeNextBoard = (
  iterations: number = 1,
  prevBoardState: Board
) => {
  let newBoardState = prevBoardState.map((row) => [...row]);

  // Loop through the number of iterations specified
  for (let i = 0; i < iterations; i++) {
    const tempBoardState = newBoardState.map((row) => [...row]);

    // Iterate over each cell in the grid
    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLS; col++) {
        const aliveCount = countAlive(row, col, newBoardState);

        if (
          newBoardState[row][col] === IS_ALIVE &&
          (aliveCount < 2 || aliveCount > 3)
        ) {
          tempBoardState[row][col] = IS_DEAD; // Cell dies due to under/overpopulation
          continue;
        }

        if (newBoardState[row][col] === IS_DEAD && aliveCount === 3) {
          tempBoardState[row][col] = IS_ALIVE; // Cell is born due to reproduction
        }
      }
    }

    newBoardState = tempBoardState.map((row) => [...row]);
  }

  return newBoardState;
};

/**
 * Toggles the state of a cell on the board based on a mouse click event.
 *
 * @param {React.MouseEvent<HTMLCanvasElement, MouseEvent>} e - The mouse click event.
 * @param {Board} boardState - The current state of the game board.
 * @returns {Board} The new state of the game board with the toggled cell.
 */
export const toggleSquare = (
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  boardState: Board
) => {
  const x = Math.floor(e.nativeEvent.offsetX / CELL_SIZE);
  const y = Math.floor(e.nativeEvent.offsetY / CELL_SIZE);

  const newBoardState = [...boardState];

  // Toggle the cell state between alive and dead
  newBoardState[x][y] = boardState[x][y] === IS_ALIVE ? IS_DEAD : IS_ALIVE;

  return newBoardState;
};
