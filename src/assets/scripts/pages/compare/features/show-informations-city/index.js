'use strict'

import { getForm } from './components/form'
import { getRemoveInformationsCity } from '../remove-informations-city/index'
import { showCities } from '../../../../actions/show-cities'
import { scrollToChoises } from '../../../../actions/scroll-to-choises'
import { showInformations } from './actions/show-informations'

function getShowInformationsCity() {
    let form = getForm()
    let showInformationsCity = document.createElement('div')
    let searchBar = form.elements['search-bar']
    searchBar.oninput = showCities
    searchBar.onkeydown = showInformations
    searchBar.addEventListener('keydown', scrollToChoises)
    form.onsubmit = event => event.preventDefault()
    showInformationsCity.append(getRemoveInformationsCity(), form)
    return showInformationsCity
}

export { getShowInformationsCity }
