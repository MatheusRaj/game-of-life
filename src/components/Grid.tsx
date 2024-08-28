"use client";

import { useEffect, useRef, useState } from "react";

import {
  CELL_SIZE,
  HEIGHT,
  NUM_COLS,
  NUM_ROWS,
  WIDTH,
} from "@/utils/constants";
import { Board } from "@/utils/types";
import { computeNextBoard, createBoard, drawBoard } from "@/utils/functions";

const Grid = () => {
  const board = createBoard(NUM_ROWS, NUM_COLS);
  const [boardState, setBoardState] = useState<Board>(board);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [iterations, setIterations] = useState<number>(1);
  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  const nextBoardIteration = (iterations: number = 1) => {
    setBoardState((prevBoardState) => {
      return computeNextBoard(iterations, prevBoardState);
    });
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(nextBoardIteration, 100);

    return () => clearInterval(interval);
  }, [isPlaying, nextBoardIteration]);

  useEffect(() => {
    if (canvasRef.current) {
      drawBoard(canvasRef.current, boardState);
    }
  }, [boardState]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center space-x-4 mb-4">
        <button onClick={() => setBoardState(createBoard(NUM_ROWS, NUM_COLS))}>
          Reset
        </button>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={() => nextBoardIteration(iterations)}>Next</button>
        <input
          className="text-black w-20 rounded-md pl-2 focus:outline-none"
          type="number"
          value={iterations}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
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
