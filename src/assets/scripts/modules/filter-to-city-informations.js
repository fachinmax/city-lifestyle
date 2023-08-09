function filterCityInformations(response) {
    let [name, region, country] = response.full_name.split(', ')
    let informations = {
        name,
        region,
        country,
        population: response.population,
    }
    return informations
}

export { filterCityInformations }
