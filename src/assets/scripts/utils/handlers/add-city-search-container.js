import { getForm } from '../../components/form'
import { getInput } from '../../components/input'
import { getUl } from '../../components/ul'
import { getDiv } from '../../components/div'
import { getButton } from '../../components/button'
import { addHandlersToCitySearchContainer } from '../add-handlers-city-search-container'

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

// variable to create a unique search city container. It's value is like a counter. It memorizes the number of container created
addCitySearchContainer.key = 2

function addCitySearchContainer(event) {
    addCitySearchContainer.key++
    let citySearchContainer = getDiv('city-search-container')
    let form = createForm(addCitySearchContainer.key)
    let informations = getDiv(
        `informations-${addCitySearchContainer.key}`,
        `cities-${addCitySearchContainer.key}`
    )
    let remove = getButton('remove', '-')
    citySearchContainer.append(remove, form, informations)
    document
        .querySelector('#cities-search-container')
        .append(citySearchContainer)
    addHandlersToCitySearchContainer()
}

export { addCitySearchContainer }
