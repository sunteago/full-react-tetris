import { Cell } from "./Cell";
import { Row } from "./Row";
import "./tetris.css";
import { CELL_CONTENTS, TetrisFigures } from "./constants"
import { useCallback, useEffect, useRef, useState } from "react";
import { insertFigureIntoGrid, moveBoardDown, moveBoardLeft, moveBoardRight, rotateFigure } from "./utils";
import { Figure, Grid, GridCell } from "./types";

const COLS = 14;
const ROWS = 30;
const initialGrid: Grid = Array.from({ length: ROWS }, () => {
    return Array.from({ length: COLS }, (): GridCell => ({
        content: CELL_CONTENTS.EMPTY as GridCell['content']
    }))
})

export function Tetris() {
    const [grid, setGrid] = useState(initialGrid);

    const nextFigureComingIn = useRef<Figure | null>(TetrisFigures.A);

    useEffect(() => {
        const id = setInterval(() => {
            setGrid(prevGrid => {
                if (nextFigureComingIn.current) {
                    const newGrid = insertFigureIntoGrid(prevGrid, nextFigureComingIn.current);
                    // setCurrentFigure(nextFigureComingIn.current)
                    nextFigureComingIn.current = null;

                    return newGrid;
                }

                return moveBoardDown(prevGrid);
            })
        }, 1000)

        return () => {
            clearInterval(id);
        }
    }, [])

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === ' ') {
            setGrid(prevGrid => rotateFigure(prevGrid))
        }
        if (event.key === 'ArrowRight') {
            setGrid(prevGrid => moveBoardRight(prevGrid))
        }
        if (event.key === 'ArrowLeft') {
            setGrid(prevGrid => moveBoardLeft(prevGrid))
        }
    }, []);

    return (
        <section id="tetris-container" onKeyDown={handleKeyDown} tabIndex={0}>
            {grid.map((row, rowIdx) =>
                <Row key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                        <Cell key={`${rowIdx}-${cellIdx}`} content={cell.content} />
                    ))}
                </Row>
            )}
        </section>
    )
}