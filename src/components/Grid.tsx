"use client";

import { useContext, useEffect, useRef } from "react";

import { HEIGHT, WIDTH } from "@/utils/constants";
import { computeNextBoard, drawBoard, toggleSquare } from "@/utils/functions";
import { GridContext } from "@/server/api";

/**
 * Grid component responsible for rendering and managing the Game of Life grid.
 *
 * Core component of the Game Of Life application, renders a canvas element and manages the board state update when isPlaying is true.
 *
 * @component
 * @example
 * return (
 *   <Grid />
 * )
 */
const Grid = () => {
  const { boardState, setBoardState, isPlaying } = useContext(GridContext);

  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(
      () =>
        setBoardState((prevBoardState) => {
          return computeNextBoard(1, prevBoardState);
        }),
      100
    );

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (canvasRef.current) {
      drawBoard(canvasRef.current, boardState);
    }
  }, [boardState]);

  return (
    <div className="flex flex-col">
      <canvas
        onClick={(e) => {
          setBoardState(toggleSquare(e, boardState));
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
