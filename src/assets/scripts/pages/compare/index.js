'use strict'

import { addContainerCitySearch } from '../../actions/add-container-city-search'
import { showCities } from '../../actions/show-cities'
import { showInformationsCity } from '../../actions/show-informations-city'
import { removeContainer } from '../../actions/remove-container'
import { scrollToChoises } from '../../actions/scroll-to-choises'

let formsArr = Array.from(document.forms)
formsArr.forEach(form => {
    let searchBar = form.elements['search-bar']
    let removeSignal = form
        .closest('#container-city-search')
        .querySelector('#remove')
    searchBar.oninput = showCities
    searchBar.onkeydown = showInformationsCity
    searchBar.addEventListener('keydown', scrollToChoises)
    form.onsubmit = event => event.preventDefault()
    removeSignal.onclick = removeContainer
})

let button = document.querySelector('#add-containers')
button.addEventListener('click', addContainerCitySearch)
