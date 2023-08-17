'use strict'

import { form } from './components/form'
import { removeInformationsCity } from '../remove-informations-city/index'
import { showCities } from '../../../../actions/show-cities'
import { scrollToChoises } from '../../../../actions/scroll-to-choises'
// import { showInformations } from './actions/show-informations'

let showInformationsCity = document.createElement('div')
let searchBar = form.querySelector('#choises')
console.log('ok')
searchBar.oninput = showCities
// searchBar.onkeydown = showInformations
searchBar.addEventListener('keydown', scrollToChoises)
form.onsubmit = event => event.preventDefault()

showInformationsCity.append(removeInformationsCity, form)

export { showInformationsCity }
