function apiGetCityInformations(endpoint) {
    return fetch(endpoint).then(response => response.json())
}

export { apiGetCityInformations }
