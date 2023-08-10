import { showCities } from './handlers/show-cities'
import { getCityInformations } from './handlers/get-city-informations'
import { removeContainer } from './handlers/remove-container'

function addHandlersToSearchContainer() {
    let formsArr = Array.from(document.forms)
    formsArr.forEach(form => {
        let searchBar = form.elements['search-bar']
        let removeSignal = form
            .closest('#search-city-container')
            .querySelector('#remove')
        searchBar.oninput = showCities
        searchBar.onkeydown = getCityInformations
        form.onsubmit = event => event.preventDefault()
        removeSignal.onclick = removeContainer
    })
}

export { addHandlersToSearchContainer }
