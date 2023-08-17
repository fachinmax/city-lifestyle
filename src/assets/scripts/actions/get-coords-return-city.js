import { apiGetLocation } from '../api/api-get-location'
import { filterToInformationsCitiesNameId } from '../modules/filter-to-cities-name-id'
import { filterToInformationsCity } from '../modules/filter-to-informations-city'
import { showInformationsCity } from '../utils/show-informations-city'
import { apiGetInformationsCity } from '../api/api-get-city'
import { removeChildren } from '../utils/remove-children'
import { checkExistenceCity } from '../utils/check-existence-city'

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
    return function (event) {
        let containerInformations = document.querySelector('#informations')
        let containerChoises = document.querySelector('#choises')
        removeChildren(containerChoises, containerInformations)
        document.querySelector('input').value = ''

        let lat = event.latlng.lat
        let lng = event.latlng.lng
        let popup = showPopup(this, lat, lng)
        apiGetLocation(lat, lng)
            .then(filterToInformationsCitiesNameId)
            .then(checkExistenceCity)
            .then(apiGetInformationsCity)
            .then(filterToInformationsCity)
            .then(informations => {
                showInformationsCity(informations, containerInformations)
            })
            .catch(error => {
                alert(error.message)
            })

        setTimeout(removePopup, 2500, this, popup)
    }
}

export { mapContainerDecorator }
