function cachingDecoratorCities() {
    let dictionary = new Map()

    return function (cityName) {
        let cities = dictionary.get(cityName)

        if (cities) return Promise.resolve(cities)

        let api = process.env.API_SEARCH_CITY
        api = api.replace(/name/, cityName)
        return fetch(api)
            .then(response => response.json())
            .then(result => {
                dictionary.set(cityName, result)
                return result
            })
    }
}

let apiGetCities = cachingDecoratorCities()

export { apiGetCities }
