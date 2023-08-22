'use strict'

import { getForm } from './components/form'
import { getRemoveInformationsCity } from '../remove-informations-city/index'
import { showCities } from '../../../../actions/show-cities'
import { scrollToChoises } from '../../../../actions/scroll-to-choises'
import { showInformations } from './actions/show-informations'
import { highlightElement } from '../../../../actions/highlight-element'

function getShowInformationsCity() {
    let form = getForm()
    let showInformationsCity = document.createElement('div')
    showInformationsCity.classList.add('container-city-search')
    showInformationsCity.setAttribute('data-position', 'left')
    let searchBar = form.elements['search-bar']
    let containerChoises = form.querySelector('ul')
    searchBar.oninput = showCities
    searchBar.onkeydown = showInformations
    searchBar.addEventListener('keydown', scrollToChoises)
    form.onsubmit = event => event.preventDefault()
    containerChoises.onmouseover = containerChoises.onmouseout = highlightElement
    showInformationsCity.append(getRemoveInformationsCity(), form)
    return showInformationsCity
}

export { getShowInformationsCity }
