import { apiGetCities } from '../../api/api-get-cities'
import { removeChildren } from '../remove-children'
import { filterToCitiesNameIdInformations } from '../../modules/filter-to-cities-name-id'

function addHtmlElements(cities) {
    if (cities.length === 0) return
    let container = document.querySelector('#choises')
    cities.forEach(item => {
        let liElement = document.createElement('li')
        liElement.textContent = item.name
        container.append(liElement)
    })
}

function showCities(event) {
    let container = document.querySelector('#choises')
    removeChildren(container)
    let cityName = this.value
    if (!cityName) return
    apiGetCities(cityName)
        .then(filterToCitiesNameIdInformations)
        .then(addHtmlElements)
}

export { showCities }
