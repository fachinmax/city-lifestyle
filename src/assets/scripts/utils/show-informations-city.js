import { showInformationsUrbanArea } from './show-informations-urban-area'
import { apiGetUrbanAreaScore } from '../api/api-get-urban-area-score'
import { apiGetUrbanAreaDetails } from '../api/api-get-urban-area-details'
import { filterToInformationsUrbanArea } from '../modules/filter-to-informations-urban-area'

function showBaseCity(informations, container) {
    for (let [key, value] of Object.entries(informations)) {
        if (key === 'urbanArea') continue
        let paragraph = document.createElement('p')
        paragraph.innerHTML = `${key}: ${value}`
        container.append(paragraph)
    }
}

async function showInformationsCity(informations, container) {
    showBaseCity(informations, container)
    let endpoint = informations.urbanArea

    if (!endpoint) return

    // if the city is a urban area
    let response = await apiGetUrbanAreaScore(endpoint)
    let dataScore = await filterToInformationsUrbanArea(response)
    response = await apiGetUrbanAreaDetails(endpoint)
    let dataDetails = await filterToInformationsUrbanArea(response.categories)
    showInformationsUrbanArea(dataScore, dataDetails, container)
}

export { showInformationsCity }
