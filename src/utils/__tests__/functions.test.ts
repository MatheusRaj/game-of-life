import {
  createBoard,
  drawBoard,
  countAlive,
  computeNextBoard,
  toggleSquare,
} from "../functions";
import {
  IS_ALIVE,
  IS_DEAD,
  NUM_ROWS,
  NUM_COLS,
  WIDTH,
  HEIGHT,
} from "../constants";
import { Board } from "../types";

class MockCanvas {
  getContext = jest.fn().mockReturnValue({
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    strokeRect: jest.fn(),
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 0,
  });
}

describe("Game of Life Functions", () => {
  it("should create a board with all cells set to dead", () => {
    const board = createBoard(NUM_ROWS, NUM_COLS);
    expect(board).toHaveLength(NUM_ROWS);
    board.forEach((row) => {
      expect(row).toHaveLength(NUM_COLS);
      row.forEach((cell) => expect(cell).toBe(IS_DEAD));
    });
  });

  it("should draw the board on the canvas", () => {
    const canvas = new MockCanvas() as unknown as HTMLCanvasElement;
    const boardState: Board = createBoard(NUM_ROWS, NUM_COLS);
    drawBoard(canvas, boardState);
    const ctx = canvas.getContext("2d");
    expect(ctx?.clearRect).toHaveBeenCalledWith(0, 0, WIDTH, HEIGHT);
    expect(ctx?.fillRect).toHaveBeenCalled();
    expect(ctx?.strokeRect).toHaveBeenCalled();
  });

  it("should count the number of alive neighbors around a cell", () => {
    const boardState: Board = createBoard(NUM_ROWS, NUM_COLS);
    boardState[1][1] = IS_ALIVE;
    boardState[0][1] = IS_ALIVE;
    expect(countAlive(1, 1, boardState)).toBe(1);
    expect(countAlive(0, 0, boardState)).toBe(2);
  });

  it("should compute the next board state correctly", () => {
    const boardState: Board = createBoard(NUM_ROWS, NUM_COLS);
    boardState[1][1] = IS_ALIVE;
    boardState[1][2] = IS_ALIVE;
    boardState[2][1] = IS_ALIVE;

    const newBoardState = computeNextBoard(1, boardState);

    expect(newBoardState[1][1]).toBe(IS_ALIVE);
    expect(newBoardState[1][2]).toBe(IS_ALIVE);
    expect(newBoardState[2][1]).toBe(IS_ALIVE);
    expect(newBoardState[2][2]).toBe(IS_ALIVE);
  });

  it("should toggle the state of a square when clicked", () => {
    const boardState: Board = createBoard(NUM_ROWS, NUM_COLS);
    const mockEvent = {
      nativeEvent: { offsetX: 1, offsetY: 1 },
    } as React.MouseEvent<HTMLCanvasElement, MouseEvent>;

    const newBoardState = toggleSquare(mockEvent, boardState);

    expect(newBoardState[0][0]).toBe(IS_ALIVE); // Toggles from dead to alive
    const toggledBackBoardState = toggleSquare(mockEvent, newBoardState);
    expect(toggledBackBoardState[0][0]).toBe(IS_DEAD); // Toggles back from alive to dead
  });
});
