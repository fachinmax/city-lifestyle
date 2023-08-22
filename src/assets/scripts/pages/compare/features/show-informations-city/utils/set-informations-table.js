'use strict'

import { setInformationsCity } from './set-informations-city'
import { setInformationsUrbanArea } from './set-informations-urban-area'

function setInformationsTable(informations, table, index) {
    delete informations.infoCity.urbanArea
    let indexRow = setInformationsCity(informations.infoCity, table, index)
    informations.infoUrbanArea &&
        setInformationsUrbanArea(informations.infoUrbanArea, table, index, indexRow)
}

export { setInformationsTable }
