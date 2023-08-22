'use strict'

import './../../../styles/main.scss'
import './features/map/index'
import { showCities } from '../../actions/show-cities'
import { showInformations } from './actions/show-informations'
import { scrollToChoises } from '../../actions/scroll-to-choises'
import { highlightElement } from '../../actions/highlight-element'

let form = document.forms['cities']
let searchBar = form.elements['search-bar']
let containerChoises = form.querySelector('ul')
searchBar.oninput = showCities
searchBar.onkeydown = showInformations
searchBar.addEventListener('keydown', scrollToChoises)
containerChoises.onmouseover = containerChoises.onmouseout = highlightElement
form.onsubmit = event => event.preventDefault()
