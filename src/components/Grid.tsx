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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [iterations, setIterations] = useState<number>(1);
  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  const countAlive = (r0: number, c0: number, currentBoardState: Board) => {
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

  const computeNextBoard = (iterations: number = 1) => {
    setBoardState((prevBoardState) => {
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
    });
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(computeNextBoard, 100);

    return () => clearInterval(interval);
  }, [isPlaying, computeNextBoard]);

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
    <div className="flex flex-col">
      <div className="flex justify-center space-x-4 mb-4">
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={() => computeNextBoard(iterations)}>Next</button>
        <input
          className="text-black w-20 rounded-md pl-2 focus:outline-none"
          type="number"
          value={iterations}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            console.log("EVENT: ", ev.target.value);

            setIterations(Number(ev.target.value));
          }}
        />
      </div>

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
