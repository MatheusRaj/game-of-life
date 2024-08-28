"use client";

import { GridContext } from "@/server/api";
import { NUM_COLS, NUM_ROWS } from "@/utils/constants";
import { computeNextBoard, createBoard } from "@/utils/functions";
import { useContext } from "react";

/**
 * Controls component for managing the Game of Life interaction.
 *
 * Provides buttons to control the game state, including resetting the board, playing/pausing the game,
 * advancing the board state by a number of iterations, and setting the number of iterations for each step.
 *
 * @component
 * @example
 * return (
 *   <Controls />
 * )
 */

const Controls = () => {
  const { setBoardState, setIsPlaying, isPlaying, iterations, setIterations } =
    useContext(GridContext);

  return (
    <div className="flex justify-center space-x-4 mb-4">
      <button
        disabled={isPlaying}
        onClick={() => setBoardState(createBoard(NUM_ROWS, NUM_COLS))}
      >
        Reset
      </button>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button
        disabled={isPlaying}
        onClick={() =>
          setBoardState((prevBoardState) =>
            computeNextBoard(iterations, prevBoardState)
          )
        }
      >
        Next
      </button>
      <input
        className="text-black w-20 rounded-md pl-2 focus:outline-none"
        type="number"
        value={iterations}
        disabled={isPlaying}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          setIterations(Number(ev.target.value));
        }}
      />
    </div>
  );
};

export default Controls;
