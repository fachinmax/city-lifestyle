'use strict'

import { writeNewRow } from './utils/write-new-row'

function setInformationsCity(informations, table, indexCol) {
    let indexRows = 1
    let moreRows = table.rows[1] ? false : true

    for (let [key, value] of Object.entries(informations)) {
        key = key[0].toUpperCase() + key.slice(1)
        indexRows = writeNewRow(key, value, table, indexCol, indexRows, moreRows)
    }
}

export { setInformationsCity }
