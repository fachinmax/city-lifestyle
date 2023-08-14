function cachingDecoratorInformations() {
    let dictionary = new Map()

    return function (cityId) {
        let informations = dictionary.get(cityId)

        if (informations) return Promise.resolve(informations)

        let rawHref = process.env.API_SINGLE_CITY
        let endpoint = rawHref.replace(/code/, cityId)
        return fetch(endpoint)
            .then(response => response.json())
            .then(result => {
                dictionary.set(cityId, result)
                return result
            })
            .catch(error => {
                throw new Error('No internet connection')
            })
    }
}

const apiGetCityInformations = cachingDecoratorInformations()

export { apiGetCityInformations }
