function filterToUrbanAreaInformations(response) {
    delete response._links
    return response
}

export { filterToUrbanAreaInformations }
