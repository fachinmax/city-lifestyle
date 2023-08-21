'use strict'

import './../../../styles/main.scss'
import './features/map/index'
import { showCities } from '../../actions/show-cities'
import { showInformations } from './actions/show-informations'
import { scrollToChoises } from '../../actions/scroll-to-choises'

let form = document.forms['cities']
let searchBar = form.elements['search-bar']
searchBar.oninput = showCities
searchBar.onkeydown = showInformations
searchBar.addEventListener('keydown', scrollToChoises)
form.onsubmit = event => event.preventDefault()
