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

/**
 * Provides the grid state and controls for the Game of Life.
 *
 * @component
 * @param {Props} props - The children components to be wrapped by the provider.
 * @returns {JSX.Element} The GridContext provider wrapping the children components.
 */
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
