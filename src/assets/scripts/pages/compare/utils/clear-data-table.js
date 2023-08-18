'use strict'

function clearDataTable(table, pos) {
    let rows = Array.from(table.rows)

    rows.forEach((row, index) => {
        if (index === 0) return
        let cell = row.cells[pos]
        cell.innerHTML = ''
    })
}

export { clearDataTable }
