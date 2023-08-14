import { apiGetCities } from '../../api/api-get-cities'
import { removeChildren } from '../remove-children'
import { filterToCitiesNameIdInformations } from '../../modules/filter-to-cities-name-id'
import { showOptions } from '../show-options'
import { checkExistenceCity } from '../check-existence-city'

function showCities(event) {
    let container = this.form.querySelector('#choises')
    removeChildren(container)
    let nameCity = this.value

    if (!nameCity) return

    // I need memorize the input value and set the index to -1 because I'll use it when the user scroll all the city choises (see scroll-to-choises module)
    this.partialNameCity = nameCity
    container.index = -1
    container.idCity = undefined
    apiGetCities(nameCity)
        .then(filterToCitiesNameIdInformations)
        .then(checkExistenceCity)
        .then(results => showOptions(results, container))
        .catch(error => {})
}

export { showCities }
