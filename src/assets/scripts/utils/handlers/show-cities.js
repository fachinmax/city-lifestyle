import { apiSearchShowCities } from '../../api/api-search-show-cities'
import { removeChildren } from '../remove-children'

function showCities(event) {
    let container = document.querySelector('#choises')
    removeChildren(container)
    let cityName = this.value
    if (!cityName) return
    apiSearchShowCities(cityName)
}

export { showCities }
