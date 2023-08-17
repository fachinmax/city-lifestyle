import { getForm } from '../components/form'
import { getInput } from '../components/input'
import { getUl } from '../components/ul'
import { getDiv } from '../components/div'
import { getButton } from '../components/button'
import { getArticle } from '../components/article'
import { showCities } from './show-cities'
import { showInformationsCity } from './show-informations-city'
import { scrollToChoises } from './scroll-to-choises'
import { removeContainer } from './remove-container'

function addHandlers(container) {
    let form = container.querySelector('form')
    let searchBar = form.elements['search-bar']
    let removeSignal = form
        .closest('#container-city-search')
        .querySelector('#remove')
    searchBar.oninput = showCities
    searchBar.onkeydown = showInformationsCity
    searchBar.addEventListener('keydown', scrollToChoises)
    form.onsubmit = event => event.preventDefault()
    removeSignal.onclick = removeContainer
}

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
addContainerCitySearch.key = 2

function addContainerCitySearch(event) {
    addContainerCitySearch.key++
    let containerCitySearch = getDiv('container-city-search')
    let form = createForm(addContainerCitySearch.key)
    let informations = getArticle(
        `informations-${addContainerCitySearch.key}`,
        `cities-${addContainerCitySearch.key}`
    )
    let remove = getButton('remove', '-')
    containerCitySearch.append(remove, form, informations)
    document
        .querySelector('#container-cities-search')
        .append(containerCitySearch)
    addHandlers(containerCitySearch)
}

export { addContainerCitySearch }
