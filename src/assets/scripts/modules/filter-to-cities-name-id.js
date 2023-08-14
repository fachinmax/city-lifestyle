function getDataFormLocation(response) {
    let city =
        response._embedded['location:nearest-cities']?.[0]._links[
            'location:nearest-city'
        ]
    // no city founded
    if (!city) return undefined

    return city.href.match(/\d+/)[0]
}

function getDataFormCityList(response) {
    // no city founded
    if (response.count === 0) return undefined

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

function filterToInformationsCitiesNameId(response) {
    if (response._embedded?.['city:search-results']) {
        return getDataFormCityList(response)
    } else {
        return getDataFormLocation(response)
    }
}

export { filterToInformationsCitiesNameId }
