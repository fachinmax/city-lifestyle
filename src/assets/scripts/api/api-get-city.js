function apiGetCityInformations(cityId) {
    let rawHref = process.env.API_SINGLE_CITY
    let endpoint = rawHref.replace(/code/, cityId)
    return fetch(endpoint).then(response => response.json())
}

export { apiGetCityInformations }
