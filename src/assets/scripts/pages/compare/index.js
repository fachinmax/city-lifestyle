'use strict'

import './../../../styles/main.scss'
import { addColumn } from '../../actions/add-column'
import { showCities } from '../../actions/show-cities'
import { showInformationsForComparePage } from '../../utils/show-informations-for-compare-page'
import { handlerRemoveColumn } from '../../actions/remove-column'
import { scrollToChoises } from '../../actions/scroll-to-choises'
import { highlightElement } from '../../actions/highlight-element'
import { dispatchKeyDownEvent } from '../../actions/dispatch-key-down-event'

let formsArr = Array.from(document.forms)
formsArr.forEach(form => {
    let searchBar = form.elements['search-bar']
    let removeButton = form.closest('td').querySelector('#remove')
    let containerChoises = form.querySelector('ul')
    searchBar.oninput = showCities
    searchBar.onkeydown = showInformationsForComparePage
    searchBar.addEventListener('keydown', scrollToChoises)
    removeButton.onclick = handlerRemoveColumn
    containerChoises.onmouseover = containerChoises.onmouseout = highlightElement
    containerChoises.onclick = dispatchKeyDownEvent
    form.onsubmit = event => event.preventDefault()
})

let button = document.querySelector('#add-containers')
button.onclick = addColumn
