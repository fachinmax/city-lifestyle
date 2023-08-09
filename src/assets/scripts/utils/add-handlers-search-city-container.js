import { showCities } from './handlers/show-cities'
import { getCityInformations } from './handlers/get-city-informations'

function addHandlersToSearchContainer() {
    let formsArr = Array.from(document.forms)
    formsArr.forEach(form => {
        let searchBar = form.elements['search-bar']
        searchBar.addEventListener('input', showCities)
        searchBar.addEventListener('keydown', getCityInformations)
        form.addEventListener('submit', event => event.preventDefault())
    })
}

export { addHandlersToSearchContainer }
