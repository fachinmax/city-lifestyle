'use strict'

function addNewRows(table, textToFirstCell) {
    table.insertRow(-1)
    let numbRows = table.rows.length
    let numbCells = table.rows[0].cells.length

    for (let i = 0; i < numbCells; i++) {
        table.rows[numbRows - 1].insertCell(i)
    }

    table.rows[numbRows - 1].cells[0].textContent = textToFirstCell
}

export { addNewRows }
