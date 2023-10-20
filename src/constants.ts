import { Figure } from "./types";

export const TetrisFigures: {
  [key: string]: Figure
} = {
  A: [
    [undefined, true, undefined],
    [true, true, true],
  ],
  B: [
    //
    [true, true, true],
  ],
  C: [
    [true, true, true],
    [undefined, undefined, true],
  ],
};

export const CELL_CONTENTS = {
  EMPTY: "empty",
  FILLED: "filled",
  FIGURE_FILLED: "figure-filled",
};
