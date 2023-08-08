import { showCities } from './utils/handlers/search-city'
import { getCityInformations } from './utils/handlers/get-city-informations'

let searchBar = document.querySelector('#search-bar')
let form = document.forms['cities']
searchBar.addEventListener('input', showCities)
