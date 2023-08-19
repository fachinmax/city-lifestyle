'use strict'

import { writeNewRow } from './write-new-row'

function setInformationsCity(informations, table, indexCol) {
    let indexRows = 1

    for (let [key, value] of Object.entries(informations)) {
        key = key[0].toUpperCase() + key.slice(1)
        indexRows = writeNewRow(key, value, table, indexCol, indexRows)
    }
}

export { setInformationsCity }
