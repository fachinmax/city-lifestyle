import { removeChildren } from '../remove-children'
import { apiGetCities } from '../../api/api-get-cities'
import { filterToCitiesNameIdInformations } from '../../modules/filter-to-cities-name-id'
import { filterToCityInformations } from '../../modules/filter-to-city-informations'
import { apiGetCityInformations } from '../../api/api-get-city'
import { showCityInformations } from '../show-city-informations'
import { checkExistenceCity } from '../check-existence-city'

function getCityInformations(event) {
    if (event.keyCode !== 13) return

    let form = this.form
    let idContainer = form.getAttribute('aria-controls')
    let containerInformations = document.querySelector(`#${idContainer}`)
    let containerChoises = form.querySelector('#choises')
    removeChildren(containerChoises, containerInformations)
    let cityName = event.target.value

    if (!cityName) return

    apiGetCities(cityName)
        .then(filterToCitiesNameIdInformations)
        .then(checkExistenceCity)
        .then(value => apiGetCityInformations(value[0].id))
        .then(filterToCityInformations)
        .then(informations =>
            showCityInformations(informations, containerInformations)
        )
        .catch(error => {})
}

export { getCityInformations }
