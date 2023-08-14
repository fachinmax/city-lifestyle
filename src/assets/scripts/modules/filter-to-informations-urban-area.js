function filterToInformationsUrbanArea(response) {
    delete response._links
    return response
}

export { filterToInformationsUrbanArea }
