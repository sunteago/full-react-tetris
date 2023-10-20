import { CELL_CONTENTS } from "./constants";
import { Figure, FigureCoords, Grid, GridCell } from "./types";

export function rotateRight(figure: Figure): Figure {
  const rowsLength = figure.length;
  // assume all rows have the same number of columns
  const colsLength = Math.max(...figure.map(row => row.length));

  const result = Array.from({ length: colsLength }, () =>
    Array.from({ length: rowsLength })
  );

  for (let col = 0; col < colsLength; col++) {
    for (let row = 0; row < rowsLength; row++) {
      result[col][rowsLength - 1 - row] = figure[row][col];
    }
  }

  return result as Figure;
}

export function insertFigureIntoGrid(grid: Grid, figure: Figure): Grid {
  return grid.map((row, rowIdx) => {
    return row.map((cell, cellIdx) => {
      if (figure?.[rowIdx]?.[cellIdx] === true) {
        return {
          content: CELL_CONTENTS.FIGURE_FILLED as GridCell['content']
        }
      }
      return cell;
    })
  })
}

const getBoardObjects = (grid: Grid) => {
  const controllingFigureCoords: FigureCoords = [];
  grid = JSON.parse(JSON.stringify(grid));

  // find figures coords
  grid.forEach((row, rowIdx) => {
    row.forEach((cell, cellIdx) => {
      if (cell.content === CELL_CONTENTS.FIGURE_FILLED) {
        controllingFigureCoords[rowIdx] ??= [];
        controllingFigureCoords[rowIdx][cellIdx] = true;
      }
    })
  })

  return { grid, controllingFigureCoords };
}

function getGridWithFigureMoved(grid: Grid, figureCoords: FigureCoords, offsetX = 0, offsetY = 0): Grid {
  grid.forEach((row, rowIdx) => {
    row.forEach((cell, cellIdx) => {
      if (figureCoords?.[rowIdx + offsetX]?.[cellIdx + offsetY]) {
        grid[rowIdx][cellIdx] = { ...cell, content: CELL_CONTENTS.FIGURE_FILLED } as GridCell
      } else {
        grid[rowIdx][cellIdx] = { ...cell, content: CELL_CONTENTS.EMPTY } as GridCell
      }
    })
  })

  return grid;
}

export function moveBoardDown(_grid: Grid): Grid {
  const { grid, controllingFigureCoords } = getBoardObjects(_grid);
  return getGridWithFigureMoved(grid, controllingFigureCoords, -1)
}

export function moveBoardRight(_grid: Grid): Grid {
  const { grid, controllingFigureCoords } = getBoardObjects(_grid);
  return getGridWithFigureMoved(grid, controllingFigureCoords, 0, -1)

}

export function moveBoardLeft(_grid: Grid): Grid {
  const { grid, controllingFigureCoords } = getBoardObjects(_grid);
  return getGridWithFigureMoved(grid, controllingFigureCoords, 0, 1)
}

export function rotateFigure(_grid: Grid): Grid {
  const { grid, controllingFigureCoords } = getBoardObjects(_grid);

  grid.forEach((row, rowIdx) => {
    row.forEach((cell, cellIdx) => {
      grid[rowIdx][cellIdx] = { ...cell, content: CELL_CONTENTS.EMPTY } as GridCell
    })
  })
  const figure = controllingFigureCoords.filter(v => v != null) as Figure;

  const rotatedFigure = rotateRight(figure);

  return insertFigureIntoGrid(grid, rotatedFigure);
}
