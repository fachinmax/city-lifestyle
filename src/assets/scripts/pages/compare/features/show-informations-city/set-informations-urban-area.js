'use strict'

import { findRelatedInformations } from '../../../../utils/find-related-informations'
import { clearDescription } from '../../../../utils/clear-description'
import { clearValue } from '../../../../utils/clear-value'
import { writeNewRow } from './utils/write-new-row'

function setDetails(info, table, indexCol, indexRow, addRows) {
    let description, value

    info.data.forEach(data => {
        description = clearDescription(data.label)
        value = clearValue(data)
        indexRow = writeNewRow(description, value, table, indexCol, indexRow, addRows)
    })

    return indexRow
}

function setCategories(categories, details, table, indexCol, indexRow, addRows) {
    categories.forEach(categorie => {
        indexRow = writeNewRow(
            categorie.name,
            categorie.score_out_of_10.toFixed(2),
            table,
            indexCol,
            indexRow,
            addRows
        )

        let relatedDetails = findRelatedInformations(details, categorie.name)

        if (!relatedDetails) return

        indexRow = setDetails(relatedDetails, table, indexCol, indexRow, addRows)
    })

    return indexRow
}

function setInformationsUrbanArea(informations, table, indexCol) {
    console.dir(informations)
    let indexRows = 5
    let moreRows = table.rows[5] ? false : true

    indexRows = setCategories(
        informations.dataScore.categories,
        informations.dataDetails,
        table,
        indexCol,
        indexRows,
        moreRows
    )
    indexRows++
}

export { setInformationsUrbanArea }
