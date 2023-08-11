import { showUrbanAreaInformations } from './show-urban-area-informations'
import { apiGetUrbanArea } from '../api/api-get-urban-area'
import { filterToUrbanAreaInformations } from '../modules/filter-to-urban-area-informations'

function showBaseCity(informations, container) {
    for (let [key, value] of Object.entries(informations)) {
        if (key === 'urbanArea') continue
        let paragraph = document.createElement('p')
        paragraph.innerHTML = `${key}: ${value}`
        container.append(paragraph)
    }
}

function showCityInformations(informations, container) {
    showBaseCity(informations, container)
    let endpoint = informations.urbanArea

    if (!endpoint) return

    // if the city is a urban area
    apiGetUrbanArea(endpoint)
        .then(filterToUrbanAreaInformations)
        .then(result => {
            showUrbanAreaInformations(result, container)
        })
}

export { showCityInformations }
