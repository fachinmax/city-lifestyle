'use strict'

import { removeChildren } from '../../../utils/remove-children'
import { showInformationsCity } from '../utils/show-informations-city'
import { showInformationsUrbanArea } from '../utils/show-informations-urban-area'
import { getInformations } from '../../../utils/get-informations'

async function showInformations(event) {
    if (event.keyCode !== 13) return

    let form = this.form
    let idContainer = form.getAttribute('aria-controls')
    let containerInformations = document.querySelector(`#${idContainer}`)
    let containerChoises = form.querySelector('#choises')
    removeChildren(containerChoises, containerInformations)
    let cityName = this.value
    containerChoises.hidden = true

    if (!cityName) return

    this.value = ''
    // id city saved when the user score through the list of all possible cities. See data scroll to choises module

    let valueForGetInfo = containerChoises.idCitySelected
        ? containerChoises.idCitySelected
        : cityName

    let informations = await getInformations(valueForGetInfo)

    if (!informations.infoCity) return

    showInformationsCity(informations.infoCity, containerInformations)

    if (!informations.infoUrbanArea) return

    let dataScore = informations.infoUrbanArea.dataScore
    let dataDetails = informations.infoUrbanArea.dataDetails
    showInformationsUrbanArea(dataScore, dataDetails, containerInformations)
}

export { showInformations }
