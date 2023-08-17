'use strict'

import './features/map/index'
import { showCities } from '../../actions/show-cities'
import { showInformationsCity } from './actions/show-informations-city'
import { scrollToChoises } from '../../actions/scroll-to-choises'

let form = document.forms['cities']
let searchBar = form.elements['search-bar']
searchBar.oninput = showCities
searchBar.onkeydown = showInformationsCity
searchBar.addEventListener('keydown', scrollToChoises)
form.onsubmit = event => event.preventDefault()
