'use strict'

function findIndexCell(table, cell) {
    let cells = Array.from(table.rows[0].cells)
    let index = cells.indexOf(cell)
    return index
}

export { findIndexCell }
