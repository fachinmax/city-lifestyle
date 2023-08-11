function cachingDecoratorInformations() {
    let dictionary = new Map()

    return function (endpoint) {
        let informations = dictionary.get(endpoint)

        if (informations) return Promise.resolve(informations)

        return fetch(`${endpoint}scores/`)
            .then(response => response.json())
            .then(result => {
                dictionary.set(endpoint, result)
                return result
            })
    }
}

const apiGetUrbanArea = cachingDecoratorInformations()

export { apiGetUrbanArea }
