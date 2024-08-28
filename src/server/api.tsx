import { NUM_COLS, NUM_ROWS } from "@/utils/constants";
import { createBoard } from "@/utils/functions";
import { Board } from "@/utils/types";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface GridContext {
  boardState: Board;
  setBoardState: Dispatch<SetStateAction<Board>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  iterations: number;
  setIterations: Dispatch<SetStateAction<number>>;
}

export const GridContext = createContext<GridContext>({} as GridContext);

interface Props {
  children: React.ReactElement;
}

export const GridContexProvider = ({ children }: Props) => {
  const board = createBoard(NUM_ROWS, NUM_COLS);
  const [boardState, setBoardState] = useState<Board>(board);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [iterations, setIterations] = useState<number>(1);

  return (
    <GridContext.Provider
      value={{
        boardState,
        setBoardState,
        isPlaying,
        setIsPlaying,
        iterations,
        setIterations,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};
