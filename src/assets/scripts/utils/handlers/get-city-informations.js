import { removeChildren } from '../remove-children'
import { apiGetCities } from '../../api/api-get-cities'
import { filterToCitiesNameId } from '../../modules/filter-to-cities-name-id'
import { filterCityInformations } from '../../modules/filter-to-city-informations'
import { apiGetCityInformations } from '../../api/api-get-city'

function checkExistenceCity(cities) {
    if (cities.length === 0) throw Error('no city found')
    return cities
}

function getApiEndpoint(cities) {
    let cityId = cities[0].id
    let rawHref = process.env.API_SINGLE_CITY
    let href = rawHref.replace(/code/, cityId)
    return href
}

function showHtmlElement(informations) {
    let container = document.querySelector('#informations')

    for (let [key, value] of Object.entries(informations)) {
        let paragraph = document.createElement('p')
        paragraph.innerHTML = `${key}: ${value}`
        container.append(paragraph)
    }
}

function getCityInformations(event) {
    if (event.keyCode !== 13) return
    let containerResults = document.querySelector('#informations')
    let containerInformations = document.querySelector('#choises')
    removeChildren(containerResults, containerInformations)
    let cityName = event.target.value
    apiGetCities(cityName)
        .then(filterToCitiesNameId)
        .then(checkExistenceCity)
        .then(getApiEndpoint)
        .then(apiGetCityInformations)
        .then(filterCityInformations)
        .then(showHtmlElement)
        .catch(error => {
            return
        })
}

export { getCityInformations }
