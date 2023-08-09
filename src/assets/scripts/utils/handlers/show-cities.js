import { apiGetCities } from '../../api/api-get-cities'
import { removeChildren } from '../remove-children'
import { filterToCitiesNameIdInformations } from '../../modules/filter-to-cities-name-id'
import { showOptions } from '../show-options'

function showCities(event) {
    let container = this.form.querySelector('#choises')
    removeChildren(container)
    let cityName = this.value
    if (!cityName) return
    apiGetCities(cityName)
        .then(filterToCitiesNameIdInformations)
        .then(results => showOptions(results, container))
}

export { showCities }
