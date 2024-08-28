"use client";

import { useContext, useEffect, useRef } from "react";

import { HEIGHT, WIDTH } from "@/utils/constants";
import { computeNextBoard, drawBoard, toggleSquare } from "@/utils/functions";
import { GridContext } from "@/server/api";

const Grid = () => {
  const { boardState, setBoardState, isPlaying } = useContext(GridContext);

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
