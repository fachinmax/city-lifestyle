'use strict'

import { addNewRow } from './add-new-row'

function findIndexOf(table, wordToFind) {
    let pos = -1
    let rows = Array.from(table.rows)

    rows.forEach((row, index) => {
        if (row.cells[0].textContent !== wordToFind) return

        pos = index
    })

    return pos
}

function checkIfAddRow(table, index, word) {
    if (!table.rows[index]) return true

    if (table.rows[index].cells[0].textContent !== word) return true

    return false
}

function writeNewRow(key, info, table, indexCol, indexRow) {
    let index = findIndexOf(table, key)

    if (index !== -1) indexRow = index

    let isAddRow = checkIfAddRow(table, indexRow, key)

    !isAddRow || addNewRow(table, key, indexRow)

    table.rows[indexRow++].cells[indexCol].textContent = info
    return indexRow
}

export { writeNewRow }
