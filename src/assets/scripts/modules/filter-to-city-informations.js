function filterToCityInformations(response) {
    let [name, region, country] = response.full_name.split(', ')
    let informations = {
        name,
        region,
        country,
        population: response.population,
        urbanArea: response._links['city:urban_area']?.href,
    }
    return informations
}

export { filterToCityInformations }
