import { apiGetInformationsCity } from '../api/api-get-city'
import { filterToInformationsCity } from '../modules/filter-to-informations-city'
import { filterToInformationsUrbanArea } from '../modules/filter-to-informations-urban-area'
import { filterToInformationsCitiesNameId } from '../modules/filter-to-cities-name-id'
import { checkExistenceCity } from './check-existence-city'
import { apiGetUrbanAreaScore } from '../api/api-get-urban-area-score'
import { apiGetUrbanAreaDetails } from '../api/api-get-urban-area-details'
import { apiGetCities } from '../api/api-get-cities'

async function getInfoCity(subvalueEndpoint) {
    let response, info

    try {
        if (isFinite(subvalueEndpoint)) {
            response = await apiGetInformationsCity(subvalueEndpoint)
            info = filterToInformationsCity(response)
        } else {
            response = await apiGetCities(subvalueEndpoint)
            response = filterToInformationsCitiesNameId(response)
            response = checkExistenceCity(response)
            response = await apiGetInformationsCity(response[0].id)
            info = filterToInformationsCity(response)
        }

        return info
    } catch (error) {
        alert(error.message)
    }
}

async function getInfoUrbanArea(endpoint) {
    let response, info, dataScore, dataDetails

    try {
        response = await apiGetUrbanAreaScore(endpoint)
        dataScore = await filterToInformationsUrbanArea(response)
        response = await apiGetUrbanAreaDetails(endpoint)
        dataDetails = await filterToInformationsUrbanArea(response.categories)

        return { dataScore, dataDetails }
    } catch (error) {
        alert(error.message)
    }
}

async function getInformations(subvalueEndpoint) {
    let infoCity, infoUrbanArea
    infoCity = await getInfoCity(subvalueEndpoint)
    let endpointUrbanArea = infoCity.urbanArea

    infoUrbanArea = endpointUrbanArea
        ? await getInfoUrbanArea(endpointUrbanArea)
        : undefined

    return { infoCity, infoUrbanArea }
}

export { getInformations }
