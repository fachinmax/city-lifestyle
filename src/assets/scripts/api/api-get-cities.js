function apiGetCities(cityName) {
    let api = process.env.API_SEARCH_CITY
    api = api.replace(/name/, cityName)
    return fetch(api).then(response => response.json())
}

export { apiGetCities }
