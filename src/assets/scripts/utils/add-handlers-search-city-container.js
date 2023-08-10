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
        // only compare.html page has a button to remove the container
        if (removeSignal) removeSignal.onclick = removeContainer
    })
}

export { addHandlersToSearchContainer }
