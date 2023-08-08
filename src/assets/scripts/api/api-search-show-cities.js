import { filterToCitiesNameId } from '../modules/filter-to-cities-name-id'

function addHtmlElements(cities) {
    if (cities.length === 0) return
    let container = document.querySelector('#choises')
    cities.forEach(item => {
        let liElement = document.createElement('li')
        liElement.textContent = item.name
        container.append(liElement)
    })
}

function apiSearchShowCities(cityName) {
    let api = process.env.API_SEARCH_CITY
    api = api.replace(/name/, cityName)
    let allCities = fetch(api)
        .then(response => response.json())
        .then(filterToCitiesNameId)
        .then(addHtmlElements)
}

export { apiSearchShowCities }
