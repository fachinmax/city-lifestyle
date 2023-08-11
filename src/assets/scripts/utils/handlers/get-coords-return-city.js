import { apiGetLocation } from '../../api/api-get-location'
import { filterToCitiesNameIdInformations } from '../../modules/filter-to-cities-name-id'
import { filterToCityInformations } from '../../modules/filter-to-city-informations'
import { showCityInformations } from '../show-city-informations'
import { apiGetCityInformations } from '../../api/api-get-city'
import { removeChildren } from '../remove-children'
import { checkExistenceCity } from '../check-existence-city'

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

        let lat = event.latlng.lat
        let lng = event.latlng.lng
        let popup = showPopup(this, lat, lng)
        apiGetLocation(lat, lng)
            .then(filterToCitiesNameIdInformations)
            .then(checkExistenceCity)
            .then(apiGetCityInformations)
            .then(filterToCityInformations)
            .then(informations => {
                showCityInformations(informations, containerInformations)
            })
            .catch(error => {})
        setTimeout(removePopup, 2500, this, popup)
    }
}

export { mapContainerDecorator }
