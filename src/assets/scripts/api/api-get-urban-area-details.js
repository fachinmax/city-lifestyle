'use strict'

function cachingDecoratorInformations() {
    let dictionary = new Map()

    return function (endpoint) {
        let informations = dictionary.get(endpoint)

        if (informations) return Promise.resolve(informations)

        return fetch(`${endpoint}details/`)
            .then(response => response.json())
            .then(result => {
                dictionary.set(endpoint, result)
                return result
            })
            .catch(error => {
                throw new Error('No internet connection')
            })
    }
}

const apiGetUrbanAreaDetails = cachingDecoratorInformations()

export { apiGetUrbanAreaDetails }
