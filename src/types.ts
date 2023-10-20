import { CELL_CONTENTS } from "./constants";

export type GridCell = {
    content: keyof typeof CELL_CONTENTS
}

export type Grid = Array<GridCell[]>

export type Figure = Array<(true | undefined)[]>

export type FigureCoords = boolean[][]