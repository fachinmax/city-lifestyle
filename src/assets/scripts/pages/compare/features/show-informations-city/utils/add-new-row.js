'use strict'

function addNewRow(table, textToFirstCell, indexRow = -1) {
    table.insertRow(indexRow)
    let numbCells = table.rows[0].cells.length
    for (let i = 0; i < numbCells; i++) {
        table.rows[indexRow].insertCell(i)
    }

    table.rows[indexRow].cells[0].textContent = textToFirstCell
}

export { addNewRow }
