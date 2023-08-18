'use strict'

import { findIndexCell } from '../utils/find-index-cell'
import { clearDataTable } from '../utils/clear-data-table'
import { apiGetCities } from '../../../api/api-get-cities'
import { filterToInformationsCitiesNameId } from '../../../modules/filter-to-cities-name-id'
import { filterToInformationsCity } from '../../../modules/filter-to-informations-city'
import { apiGetInformationsCity } from '../../../api/api-get-city'
import { setInformationsTable } from '../utils/set-informations-table'
import { checkExistenceCity } from '../../../utils/check-existence-city'

async function showInformations(event) {
    if (event.keyCode !== 13) return

    let form = this.form
    let table = document.querySelector('table')
    let currentCell = this.form.closest('td')
    let index = findIndexCell(table, currentCell)
    let listChoises = form.querySelector('#choises')
    clearDataTable(table, index)
    let cityName = this.value

    if (!cityName) return

    this.value = ''
    // id city saved when the user score through the list of all possible cities. See data scroll to choises module

    if (listChoises.idCitySelected) {
        apiGetInformationsCity(listChoises.idCitySelected)
            .then(filterToInformationsCity)
            .then(informations => {
                setInformationsTable(informations, table, index)
            })
            .catch(error => alert(error.message))
    } else {
        apiGetCities(cityName)
            .then(filterToInformationsCitiesNameId)
            .then(checkExistenceCity)
            .then(value => apiGetInformationsCity(value[0].id))
            .then(filterToInformationsCity)
            .then(informations => {
                setInformationsTable(informations, table, index)
            })
            .catch(error => alert(error.message))
    }
}

export { showInformations }
