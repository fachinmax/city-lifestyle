'use strict'

import { findIndexCell } from '../../../utils/find-index-cell'
import { clearDataTable } from '../../../utils/clear-data-table'
import { setInformationsTable } from '../set-informations-table'
import { getInformations } from '../../../../../utils/get-informations'
import { removeChildren } from '../../../../../utils/remove-children'

async function showInformations(event) {
    if (event.keyCode !== 13) return

    let form = this.form
    let table = document.querySelector('table')
    let currentCell = this.form.closest('td')
    let index = findIndexCell(table, currentCell)
    let listChoises = form.querySelector('#choises')
    removeChildren(listChoises)
    clearDataTable(table, index)
    let cityName = this.value

    if (!cityName) return

    this.value = ''
    // id city saved when the user score through the list of all possible cities. See data scroll to choises module

    let valueToGetInfo = listChoises.idCitySelected ? listChoises.idCitySelected : cityName

    let allInfo = await getInformations(valueToGetInfo)
    setInformationsTable(allInfo, table, index)
}

export { showInformations }
