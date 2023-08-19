'use strict'

import { addNewRow } from './add-new-row'

function checkIfAddRow(table, index, word) {
    if (!table.rows[index]) return true

    if (table.rows[index].cells[0].textContent !== word) return true

    return false
}

function writeNewRow(key, info, table, indexCol, indexRow) {
    let isAddRow = checkIfAddRow(table, indexRow, key)

    !isAddRow || addNewRow(table, key, indexRow)
    console.log('key: ' + key, 'info ' + info)
    console.log(table.rows[indexRow])

    table.rows[indexRow++].cells[indexCol].textContent = info
    return indexRow
}

export { writeNewRow }
