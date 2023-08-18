'use strict'

import { getShowInformationsCity } from '../features/show-informations-city/index'

async function addShowInfoCityIntoTable(event) {
    let table = document.querySelector('table')
    let rows = Array.from(table.rows)

    rows.forEach(row => row.insertCell(-1))

    let lastIndexCells = rows[0].cells.length - 1
    rows[0].cells[lastIndexCells].append(getShowInformationsCity())
}

export { addShowInfoCityIntoTable }
