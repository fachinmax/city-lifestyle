'use strict'

import './../../../styles/main.scss'
import './map'
import { showCities } from '../../actions/show-cities'
import { showInformationsForIndexPage } from './show-informations-for-index-page'
import { scrollToChoises } from '../../actions/scroll-to-choises'
import { highlightElement } from '../../actions/highlight-element'
import { dispatchKeyDownEvent } from '../../actions/dispatch-key-down-event'
import { removeChildren } from '../../utils/remove-children'

function showInformations(event) {
    if (event.keyCode !== 13) return

    let form = this.form
    let idContainer = form.getAttribute('aria-controls')
    let containerInformations = document.querySelector(`#${idContainer}`)
    let containerChoises = form.querySelector('#choises')
    removeChildren(containerChoises, containerInformations)
    let cityName = this.value
    containerChoises.hidden = true

    if (!cityName) return

    this.value = ''
    // id city saved when the user score through the list of all possible cities. See data scroll to choises module

    let valueForGetInfo = containerChoises.idCitySelected
        ? Number(containerChoises.idCitySelected)
        : cityName

    showInformationsForIndexPage(valueForGetInfo, containerInformations)
}

let form = document.forms['cities']
let searchBar = form.elements['search-bar']
let containerChoises = form.querySelector('ul')
searchBar.oninput = showCities
searchBar.onkeydown = showInformations
searchBar.addEventListener('keydown', scrollToChoises)
containerChoises.onmouseover = containerChoises.onmouseout = highlightElement
containerChoises.onclick = dispatchKeyDownEvent
form.onsubmit = event => event.preventDefault()
