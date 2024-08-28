"use client";

import { GridContext } from "@/server/api";
import { NUM_COLS, NUM_ROWS } from "@/utils/constants";
import { computeNextBoard, createBoard } from "@/utils/functions";
import { useContext } from "react";

const Controls = () => {
  const { setBoardState, setIsPlaying, isPlaying, iterations, setIterations } =
    useContext(GridContext);

  const nextBoardIteration = (iterations: number = 1) => {
    setBoardState((prevBoardState) => {
      return computeNextBoard(iterations, prevBoardState);
    });
  };

  return (
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
  );
};

export default Controls;
