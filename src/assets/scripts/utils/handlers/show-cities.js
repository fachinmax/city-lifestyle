import { apiGetCities } from '../../api/api-get-cities'
import { removeChildren } from '../remove-children'
import { filterToCitiesNameIdInformations } from '../../modules/filter-to-cities-name-id'
import { showOptions } from '../show-options'
import { checkExistenceCity } from '../check-existence-city'
import { dataDictionaryChoises } from '../../data/data-scroll-user-choises'

function showCities(event) {
    let container = this.form.querySelector('#choises')
    removeChildren(container)
    // input element value
    let cityName = this.value

    if (!cityName) return

    // I need memorize the input value and set the index to -1 because I'll use when the user scroll all the city choises (see scroll-to-choises module)
    dataDictionaryChoises.inputValue.value = cityName
    dataDictionaryChoises.index.value = -1
    apiGetCities(cityName)
        .then(filterToCitiesNameIdInformations)
        .then(checkExistenceCity)
        .then(results => showOptions(results, container))
        .catch(error => {})
}

export { showCities }
