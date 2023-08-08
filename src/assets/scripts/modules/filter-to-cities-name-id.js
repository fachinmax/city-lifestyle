function filterToCitiesNameId(response) {
    let cities = response._embedded['city:search-results']
    if (response.count === 0) return []
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

export { filterToCitiesNameId }
