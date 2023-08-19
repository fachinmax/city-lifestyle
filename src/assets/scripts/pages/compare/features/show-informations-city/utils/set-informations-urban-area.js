'use strict'

import { findRelatedInformations } from '../../../../../utils/find-related-informations'
import { clearDescription } from '../../../../../utils/clear-description'
import { clearValue } from '../../../../../utils/clear-value'
import { writeNewRow } from './write-new-row'

function setDetails(info, table, indexCol, indexRow) {
    let description, value

    info.data.forEach(data => {
        description = clearDescription(data.label)
        value = clearValue(data)
        indexRow = writeNewRow(description, value, table, indexCol, indexRow)
    })

    return indexRow
}

function setCategories(categories, details, table, indexCol, indexRow) {
    categories.forEach(categorie => {
        indexRow = writeNewRow(
            categorie.name,
            categorie.score_out_of_10.toFixed(2),
            table,
            indexCol,
            indexRow
        )

        let relatedDetails = findRelatedInformations(details, categorie.name)

        if (!relatedDetails) return

        indexRow = setDetails(relatedDetails, table, indexCol, indexRow)
    })

    return indexRow
}

function setInformationsUrbanArea(informations, table, indexCol) {
    console.dir(informations)
    let indexRows = 5

    indexRows = setCategories(
        informations.dataScore.categories,
        informations.dataDetails,
        table,
        indexCol,
        indexRows
    )

    // set city score
    let data = informations.dataScore.teleport_city_score.toFixed(2)
    writeNewRow('City score', data, table, indexCol, indexRows)
}

export { setInformationsUrbanArea }
