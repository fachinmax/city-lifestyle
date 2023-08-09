import { showCities } from './utils/handlers/show-cities'
import { getCityInformations } from './utils/handlers/get-city-informations'

let form = document.forms['cities']
let searchBar = form.elements['search-bar']

searchBar.addEventListener('input', showCities)
searchBar.addEventListener('keydown', getCityInformations)
form.addEventListener('submit', event => event.preventDefault())
