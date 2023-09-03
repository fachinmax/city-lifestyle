'use strict'

import { findIndexCell } from '../utils/find-index-cell'

function deleteAllCells(table, index) {
    let rows = Array.from(table.rows)

    rows.forEach(row => {
        row.deleteCell(index)
    })
}

function removeColumn(event) {
    let currentCell = this.closest('td')
    let table = document.querySelector('table')
    let index = findIndexCell(table, currentCell)
    deleteAllCells(table, index)
}

export { removeColumn as handlerRemoveColumn }
