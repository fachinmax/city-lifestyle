'use strict'

import './../../../styles/main.scss'
import { addShowInfoCityIntoTable } from './actions/add-show-info-city-into-table'
import { showCities } from '../../actions/show-cities'
import { showInformations } from './features/show-informations-city/actions/show-informations'
import { handlerRemoveColumn } from './features/remove-informations-city/actions/remove-column'
import { scrollToChoises } from '../../actions/scroll-to-choises'
import { highlightElement } from '../../actions/highlight-element'

let formsArr = Array.from(document.forms)
formsArr.forEach(form => {
    let searchBar = form.elements['search-bar']
    let removeButton = form.closest('td').querySelector('#remove')
    let containerChoises = form.querySelector('ul')
    searchBar.oninput = showCities
    searchBar.onkeydown = showInformations
    searchBar.addEventListener('keydown', scrollToChoises)
    removeButton.onclick = handlerRemoveColumn
    containerChoises.onmouseover = containerChoises.onmouseout = highlightElement
    form.onsubmit = event => event.preventDefault()
})

let button = document.querySelector('#add-containers')
button.onclick = addShowInfoCityIntoTable
