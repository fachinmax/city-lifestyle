import { getForm } from '../../components/form'
import { getInput } from '../../components/input'
import { getUl } from '../../components/ul'
import { getDiv } from '../../components/div'
import { addHandlersToSearchContainer } from '../add-handlers-search-city-container'

let count = 2

function createForm(count) {
    let form = getForm(`cities${count}`, `informations${count}`)
    let input = getInput('text', 'search-bar', 'search')
    // addEvents(form, input)
    let ul = getUl('choises')
    form.append(input, ul)
    return form
}

function addSearchCityContainer(event) {
    if (count === 5) {
        this.hidden = true
    }
    let searchCityContainer = getDiv(`search-city-container`)
    let form = createForm(++count)
    let div = getDiv(`informations${count}`)
    searchCityContainer.append(form, div)
    document
        .querySelector('#search-cities-container')
        .append(searchCityContainer)
    addHandlersToSearchContainer()
}

export { addSearchCityContainer }
