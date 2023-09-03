'use strict'

import { getButtonToRemoveFormToChooseCity } from '../components/button-remove-form-to-choose-city'
import { showCities } from './show-cities'
import { scrollToChoises } from './scroll-to-choises'
import { showInformationsForComparePage } from '../pages/compare/show-informations-for-compare-page'
import { highlightElement } from './highlight-element'
import { dispatchKeyDownEvent } from './dispatch-key-down-event'

function inputElement(type, name, placeholder) {
    let input = document.createElement('input')
    input.type = type
    input.name = name
    input.placeholder = placeholder
    input.autocomplete = 'off'
    input.setAttribute('data-dimension', 'small')
    return input
}

function ulElement(id) {
    let ul = document.createElement('ul')
    ul.id = id
    ul.setAttribute('data-location', 'table')
    ul.hidden = true
    return ul
}

function getForm() {
    let form = document.createElement('form')
    form.name = 'cities'
    form.classList.add('container-city-search__form-small')
    let input = inputElement('text', 'search-bar', 'Search...')
    let ul = ulElement('choises')
    form.append(input, ul)
    return form
}

function getFormToChooseCity() {
    let form = getForm()
    let showInformationsCity = document.createElement('div')
    showInformationsCity.classList.add('container-city-search')
    showInformationsCity.setAttribute('data-position', 'left')
    let searchBar = form.elements['search-bar']
    let containerChoises = form.querySelector('ul')
    searchBar.oninput = showCities
    searchBar.onkeydown = showInformationsForComparePage
    searchBar.addEventListener('keydown', scrollToChoises)
    form.onsubmit = event => event.preventDefault()
    containerChoises.onmouseover = containerChoises.onmouseout = highlightElement
    containerChoises.onclick = dispatchKeyDownEvent
    showInformationsCity.append(getButtonToRemoveFormToChooseCity(), form)
    return showInformationsCity
}

function addColumn(event) {
    let table = document.querySelector('table')
    let rows = Array.from(table.rows)

    rows.forEach(row => row.insertCell(-1))

    let lastIndexCells = rows[0].cells.length - 1
    rows[0].cells[lastIndexCells].append(getFormToChooseCity())
}

export { addColumn }
