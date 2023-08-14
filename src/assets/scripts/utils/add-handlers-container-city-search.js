import { showCities } from './handlers/show-cities'
import { getInformationsCity } from './handlers/get-informations-city'
import { removeContainer } from './handlers/remove-container'
import { scrollToChoises } from './handlers/scroll-to-choises'

function addHandlersToContainerCitySearch() {
    let formsArr = Array.from(document.forms)
    formsArr.forEach(form => {
        let searchBar = form.elements['search-bar']
        let removeSignal = form
            .closest('#container-city-search')
            .querySelector('#remove')
        searchBar.oninput = showCities
        searchBar.onkeydown = getInformationsCity
        searchBar.addEventListener('keydown', scrollToChoises)
        form.onsubmit = event => event.preventDefault()

        // only compare.html page has a button to remove the container
        if (removeSignal) removeSignal.onclick = removeContainer
    })
}

export { addHandlersToContainerCitySearch }
