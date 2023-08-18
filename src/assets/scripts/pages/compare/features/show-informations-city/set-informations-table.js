'use strict'

import { setInformationsCity } from './set-informations-city'
import { setInformationsUrbanArea } from './set-informations-urban-area'

function setInformationsTable(informations, table, index) {
    delete informations.infoCity.urbanArea

    setInformationsCity(informations.infoCity, table, index)
    informations.infoUrbanArea && setInformationsUrbanArea(informations.infoUrbanArea, table, index)
}

export { setInformationsTable }
