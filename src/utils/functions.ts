import {
  CELL_SIZE,
  COLORS,
  HEIGHT,
  NUM_COLS,
  NUM_ROWS,
  WIDTH,
} from "./constants";
import { Board } from "./types";

export const createBoard = (rows: number, cols: number) => {
  return Array.from({ length: rows }, () => new Array(cols).fill(0));
};

export const drawBoard = (canvas: HTMLCanvasElement, boardState: Board) => {
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.strokeStyle = "green";
  ctx.lineWidth = 0.1;

  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      ctx.fillStyle = COLORS[boardState[row][col]];

      ctx.fillRect(
        Math.floor((WIDTH / NUM_ROWS) * row),
        Math.floor((HEIGHT / NUM_COLS) * col),
        CELL_SIZE,
        CELL_SIZE
      );

      ctx.strokeRect(
        Math.floor((WIDTH / NUM_ROWS) * row),
        Math.floor((HEIGHT / NUM_COLS) * col),
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }
};

export const countAlive = (
  r0: number,
  c0: number,
  currentBoardState: Board
) => {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr != 0 || dc != 0) {
        const r = (r0 + dr + NUM_ROWS) % NUM_ROWS;
        const c = (c0 + dc + NUM_COLS) % NUM_COLS;

        if (currentBoardState[r][c] === 1) {
          count++;
        }
      }
    }
  }

  return count;
};

export const computeNextBoard = (
  iterations: number = 1,
  prevBoardState: Board
) => {
  let newBoardState = prevBoardState.map((r) => [...r]);

  for (let i = 0; i < iterations; i++) {
    const tempBoardState = newBoardState.map((r) => [...r]);

    for (let r = 0; r < NUM_ROWS; r++) {
      for (let c = 0; c < NUM_COLS; c++) {
        const aliveCount = countAlive(r, c, newBoardState);

        if (newBoardState[r][c] === 0) {
          if (aliveCount === 3) {
            tempBoardState[r][c] = 1;
          }
        } else {
          if (aliveCount !== 2 && aliveCount !== 3) {
            tempBoardState[r][c] = 0;
          }
        }
      }
    }

    newBoardState = tempBoardState.map((r) => [...r]);
  }

  return newBoardState;
};
