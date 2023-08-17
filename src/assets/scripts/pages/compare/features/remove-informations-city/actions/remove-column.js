'use strict'

function deleteAllCells(table, index) {
    let rows = Array.from(table.rows)

    rows.forEach(row => {
        row.deleteCell(index)
    })
}

function removeColumn(event) {
    let currentCell = this.closest('td')
    let table = document.querySelector('table')
    let cells = Array.from(table.rows[0].cells)
    let index = cells.indexOf(currentCell)

    deleteAllCells(table, index)
}

export { removeColumn as handlerRemoveColumn }
