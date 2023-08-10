import { getForm } from '../../components/form'
import { getInput } from '../../components/input'
import { getUl } from '../../components/ul'
import { getDiv } from '../../components/div'
import { getButton } from '../../components/button'
import { addHandlersToSearchContainer } from '../add-handlers-search-city-container'
import { getNumberSearchCityContainers } from '../get-number-search-city-containers'

let id = 2

function createForm(count) {
    let form = getForm(`cities-${count}`, `informations-${count}`)
    let input = getInput('text', 'search-bar', 'search')
    let ul = getUl('choises')
    form.append(input, ul)
    return form
}

function addSearchCityContainer(event) {
    this.hidden =
        process.env.MAX_NUMBER_SEARCH_CITY_CONTAINERS ==
        getNumberSearchCityContainers() + 1
    let searchCityContainer = getDiv('search-city-container')
    let form = createForm(++id)
    let informations = getDiv(`informations-${id}`)
    let remove = getButton('remove', '-')
    searchCityContainer.append(remove, form, informations)
    document
        .querySelector('#search-cities-container')
        .append(searchCityContainer)
    addHandlersToSearchContainer()
}

export { addSearchCityContainer }
