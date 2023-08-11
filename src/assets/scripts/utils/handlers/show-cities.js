import { apiGetCities } from '../../api/api-get-cities'
import { removeChildren } from '../remove-children'
import { filterToCitiesNameIdInformations } from '../../modules/filter-to-cities-name-id'
import { showOptions } from '../show-options'
import { checkExistenceCity } from '../check-existence-city'

function showCities(event) {
    let container = this.form.querySelector('#choises')
    removeChildren(container)
    // input element value
    let cityName = this.value

    if (!cityName) return

    apiGetCities(cityName)
        .then(filterToCitiesNameIdInformations)
        .then(checkExistenceCity)
        .then(results => showOptions(results, container))
        .catch(error => {})
}

export { showCities }
