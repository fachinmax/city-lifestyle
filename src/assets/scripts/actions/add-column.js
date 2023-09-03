'use strict'

import { getFormToChooseCity } from '../components/form-to-choose-city'

function addColumn(event) {
    let table = document.querySelector('table')
    let rows = Array.from(table.rows)

    rows.forEach(row => row.insertCell(-1))

    let lastIndexCells = rows[0].cells.length - 1
    rows[0].cells[lastIndexCells].append(getFormToChooseCity())
}

export { addColumn }
