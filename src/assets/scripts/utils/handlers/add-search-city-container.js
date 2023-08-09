import { getForm } from '../../components/form'
import { getInput } from '../../components/input'
import { getUl } from '../../components/ul'
import { getDiv } from '../../components/div'
import { showCities } from './show-cities'
import { getCityInformations } from './get-city-informations'

let count = 2

function addEvents(form, input) {
    input.addEventListener('input', showCities)
    input.addEventListener('keydown', getCityInformations)
    form.addEventListener('submit', event => event.preventDefault())
}

function createForm(count) {
    let form = getForm(`cities${count}`, `informations${count}`)
    let input = getInput('text', 'search-bar', 'search')
    addEvents(form, input)
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
}

export { addSearchCityContainer }
