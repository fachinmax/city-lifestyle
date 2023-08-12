import { getForm } from '../../components/form'
import { getInput } from '../../components/input'
import { getUl } from '../../components/ul'
import { getDiv } from '../../components/div'
import { getButton } from '../../components/button'
import { addHandlersToSearchContainer } from '../add-handlers-search-city-container'
import { getNumberSearchCityContainers } from '../get-number-search-city-containers'

function createForm(count) {
    let form = getForm(
        `cities-${count}`,
        `cities-${count}`,
        `informations-${count}`
    )
    let input = getInput('text', 'search-bar', 'search')
    let ul = getUl('choises')
    form.append(input, ul)
    return form
}

// variable to create a unique search city container. It's value is like a counter. It memorize the number of container created
addSearchCityContainer.key = 2

function addSearchCityContainer(event) {
    this.hidden =
        process.env.MAX_NUMBER_SEARCH_CITY_CONTAINERS ==
        getNumberSearchCityContainers() + 1
    addSearchCityContainer.key++
    let searchCityContainer = getDiv('search-city-container')
    let form = createForm(addSearchCityContainer.key)
    let informations = getDiv(
        `informations-${addSearchCityContainer.key}`,
        `cities-${addSearchCityContainer.key}`
    )
    let remove = getButton('remove', '-')
    searchCityContainer.append(remove, form, informations)
    document
        .querySelector('#search-cities-container')
        .append(searchCityContainer)
    addHandlersToSearchContainer()
}

export { addSearchCityContainer }
