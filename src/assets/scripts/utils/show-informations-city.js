import { showInformationsUrbanArea } from './show-informations-urban-area'
import { apiGetUrbanArea } from '../api/api-get-urban-area'
import { filterToInformationsUrbanArea } from '../modules/filter-to-informations-urban-area'

function showBaseCity(informations, container) {
    for (let [key, value] of Object.entries(informations)) {
        if (key === 'urbanArea') continue
        let paragraph = document.createElement('p')
        paragraph.innerHTML = `${key}: ${value}`
        container.append(paragraph)
    }
}

function showInformationsCity(informations, container) {
    showBaseCity(informations, container)
    let endpoint = informations.urbanArea

    if (!endpoint) return

    // if the city is a urban area
    apiGetUrbanArea(endpoint)
        .then(filterToInformationsUrbanArea)
        .then(result => {
            showInformationsUrbanArea(result, container)
        })
}

export { showInformationsCity }
