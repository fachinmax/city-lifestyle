'use strict'

import { apiGetLocation } from '../api/api-get-location'
import { filterToInformationsCitiesNameId } from '../modules/filter-to-cities-name-id'
import { removeChildren } from '../utils/remove-children'
import { checkExistenceCity } from '../utils/check-existence-city'
import { showInformationsForIndexPage } from '../pages/index/show-informations-for-index-page'

function showPopup(map, lat, lng) {
    let popup = L.popup()
    popup
        .setLatLng([lat, lng])
        .setContent(`Coordinates: latitude: ${lat}, longitude: ${lng}`)
    map.addLayer(popup)

    return popup
}

function removePopup(map, popup) {
    map.closePopup(popup)
}

function mapContainerDecorator(container) {
    return async function (event) {
        let containerInformations = document.querySelector('#informations')
        let containerChoises = document.querySelector('#choises')
        removeChildren(containerChoises, containerInformations)
        document.querySelector('input').value = ''

        let lat = event.latlng.lat
        let lng = event.latlng.lng
        let popup = showPopup(this, lat, lng)
        setTimeout(removePopup, 2500, this, popup)

        try {
            let idCity = await apiGetLocation(lat, lng)
                .then(filterToInformationsCitiesNameId)
                .then(checkExistenceCity)

            showInformationsForIndexPage(idCity, containerInformations)
        } catch (error) {
            alert(error)
        }
    }
}

export { mapContainerDecorator }
