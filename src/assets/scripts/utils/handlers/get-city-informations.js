import { removeChildren } from '../remove-children'
import { apiGetCities } from '../../api/api-get-cities'
import { filterToCitiesNameIdInformations } from '../../modules/filter-to-cities-name-id'
import { filterToCityInformations } from '../../modules/filter-to-city-informations'
import { filterToUrbanAreaInformations } from '../../modules/filter-to-urban-area-informations'
import { apiGetCityInformations } from '../../api/api-get-city'
import { apiGetUrbanArea } from '../../api/api-get-urban-area'
import { showCityInformations } from '../show-city-informations'
import { showUrbanAreaInformations } from '../show-urban-area-informations'

function checkExistenceCity(cities) {
    if (cities.length === 0) throw Error('no city found')
    return cities
}

function showInformations(informations) {
    let container = document.querySelector('#informations')
    showCityInformations(informations, container)
    let endpoint = informations.urbanArea
    if (!endpoint) return
    apiGetUrbanArea(endpoint)
        .then(filterToUrbanAreaInformations)
        .then(result => {
            showUrbanAreaInformations(result, container)
        })
}

function getCityInformations(event) {
    if (event.keyCode !== 13) return
    let containerResults = document.querySelector('#informations')
    let containerInformations = document.querySelector('#choises')
    removeChildren(containerResults, containerInformations)
    let cityName = event.target.value
    apiGetCities(cityName)
        .then(filterToCitiesNameIdInformations)
        .then(checkExistenceCity)
        .then(value => apiGetCityInformations(value[0].id))
        .then(filterToCityInformations)
        .then(showInformations)
        .catch(error => {})
}

export { getCityInformations }
