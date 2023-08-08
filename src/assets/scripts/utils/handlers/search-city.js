import { apiSearchShowCities } from '../../api/api-search-show-city'

function showCities(event) {
    let cityName = this.value
    let cities = apiSearchShowCities(cityName)
}

export { showCities }
