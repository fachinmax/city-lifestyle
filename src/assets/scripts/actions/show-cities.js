import { apiGetCities } from '../api/api-get-cities'
import { removeChildren } from '../utils/remove-children'
import { filterToInformationsCitiesNameId } from '../modules/filter-to-cities-name-id'
import { showOptions } from '../utils/show-options'
import { checkExistenceCity } from '../utils/check-existence-city'

function showCities(event) {
    let container = this.form.querySelector('#choises')
    removeChildren(container)
    let nameCity = this.value

    if (!nameCity) {
        container.hidden = true
        return
    }

    // I need memorize the input value and set the index to -1 because I'll use it when the user scroll all the city choises (see scroll-to-choises module)
    this.partialNameCity = nameCity
    container.index = -1
    container.idCitySelected = undefined
    apiGetCities(nameCity)
        .then(filterToInformationsCitiesNameId)
        .then(checkExistenceCity)
        .then(
            results => {
                container.hidden = false
                showOptions(results, container)
            },
            error => (container.hidden = true)
        )
        .catch(error => {
            alert(error.message)
        })
}

export { showCities }
