import { showCities } from './utils/handlers/show-cities'
import { getCityInformations } from './utils/handlers/get-city-informations'

let searchBar = document.querySelector('#search-bar')
let form = document.forms['cities']

searchBar.addEventListener('input', showCities)
searchBar.addEventListener('keydown', getCityInformations)
form.addEventListener('submit', event => event.preventDefault())
