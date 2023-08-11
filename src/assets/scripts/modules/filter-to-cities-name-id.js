function getDataFormLocation(response) {
    let city =
        response._embedded['location:nearest-cities'][0]._links[
            'location:nearest-city'
        ]
    return city.href.match(/\d+/)[0]
}

function getDataFormCityList(response) {
    if (response.count === 0) return []

    let cities = response._embedded['city:search-results']
    let cityName
    let cityId
    let href
    return cities.map(city => {
        cityName = city.matching_full_name
        href = city._links['city:item'].href
        cityId = href.match(/\d+/)[0]
        return {
            name: cityName,
            id: cityId,
        }
    })
}

function filterToCitiesNameIdInformations(response) {
    if (response._embedded?.['city:search-results']) {
        return getDataFormCityList(response)
    } else {
        return getDataFormLocation(response)
    }
}

export { filterToCitiesNameIdInformations }
