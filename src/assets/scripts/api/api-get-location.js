'use strict'

function cachingDecoratorInformations() {
    let dictionary = new Map()

    return function (lat, lng) {
        let informations = dictionary.get(`${lat},${lng}`)

        if (informations) return Promise.resolve(informations)

        let rawHref = process.env.API_SEARCH_LOCATION
        let endpoint = rawHref.replace(/lat,lng/, `${lat},${lng}`)
        return fetch(endpoint)
            .then(response => response.json())
            .then(result => {
                dictionary.set(`${lat},${lng}`, result)
                return result
            })
            .catch(error => {
                throw new Error('No internet connection')
            })
    }
}

let apiGetLocation = cachingDecoratorInformations()

export { apiGetLocation }
