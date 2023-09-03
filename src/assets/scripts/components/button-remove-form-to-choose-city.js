'use strict'

function findIndexCell(table, cell) {
    let cells = Array.from(table.rows[0].cells)
    let index = cells.indexOf(cell)
    return index
}

function deleteAllCells(table, index) {
    let rows = Array.from(table.rows)

    rows.forEach(row => {
        row.deleteCell(index)
    })
}

function getButtonRemoveColumn() {
    let btn = document.createElement('button')
    btn.id = 'remove'
    btn.textContent = '-'
    btn.onclick = handlerRemoveColumn
    return btn
}
function handlerRemoveColumn(event) {
    let currentCell = this.closest('td')
    let table = document.querySelector('table')
    let index = findIndexCell(table, currentCell)
    deleteAllCells(table, index)
}

function getButtonToRemoveFormToChooseCity() {
    let btn = getButtonRemoveColumn()
    btn.onclick = handlerRemoveColumn
    return btn
}

export { getButtonToRemoveFormToChooseCity }
