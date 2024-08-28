"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  CELL_SIZE,
  COLORS,
  HEIGHT,
  NUM_COLS,
  NUM_ROWS,
  WIDTH,
} from "@/utils/constants";

type Board = number[][];

const createBoard = (rows: number, cols: number) => {
  return Array.from({ length: rows }, () => new Array(cols).fill(0));
};

const Grid = () => {
  const board = useMemo<Board>(() => createBoard(NUM_ROWS, NUM_COLS), []);

  const [boardState, setBoardState] = useState<Board>(board);

  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

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
    }
  }, [boardState]);

  return (
    <div className="flex justify-around">
      <canvas
        onClick={(e) => {
          const x = Math.floor(e.nativeEvent.offsetX / CELL_SIZE);
          const y = Math.floor(e.nativeEvent.offsetY / CELL_SIZE);

          const newBoardState = [...boardState];

          newBoardState[x][y] = boardState[x][y] ? 0 : 1;

          setBoardState(newBoardState);
        }}
        ref={canvasRef}
        className="bg-gray-950"
        width={WIDTH}
        height={HEIGHT}
      ></canvas>
    </div>
  );
};

export default Grid;
