'use strict'

import { removeChildren } from '../../../utils/remove-children'
import { apiGetCities } from '../../../api/api-get-cities'
import { filterToInformationsCitiesNameId } from '../../../modules/filter-to-cities-name-id'
import { filterToInformationsCity } from '../../../modules/filter-to-informations-city'
import { apiGetInformationsCity } from '../../../api/api-get-city'
import { showInformations } from '../utils/show-informations'
import { checkExistenceCity } from '../../../utils/check-existence-city'

async function showInformationsCity(event) {
    if (event.keyCode !== 13) return

    let form = this.form
    let idContainer = form.getAttribute('aria-controls')
    let containerInformations = document.querySelector(`#${idContainer}`)
    let containerChoises = form.querySelector('#choises')
    removeChildren(containerChoises, containerInformations)
    let cityName = this.value

    if (!cityName) return

    this.value = ''
    // id city saved when the user score through the list of all possible cities. See data scroll to choises module

    if (containerChoises.idCitySelected) {
        apiGetInformationsCity(containerChoises.idCitySelected)
            .then(filterToInformationsCity)
            .then(informations => {
                showInformations(informations, containerInformations)
            })
            .catch(error => alert(error.message))
    } else {
        apiGetCities(cityName)
            .then(filterToInformationsCitiesNameId)
            .then(checkExistenceCity)
            .then(value => apiGetInformationsCity(value[0].id))
            .then(filterToInformationsCity)
            .then(informations => {
                showInformations(informations, containerInformations)
            })
            .catch(error => alert(error.message))
    }
}

export { showInformationsCity }
