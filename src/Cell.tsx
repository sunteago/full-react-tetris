import { CELL_CONTENTS } from "./constants"

export function Cell({ content = CELL_CONTENTS.EMPTY, children = '' }) {
    //todo add figure filled
    const className = content === CELL_CONTENTS.EMPTY ? 'cell-empty' : 'cell-filled'

    return (
        <div className={`cell ${className}`}>
            {children}
        </div>
    )
}