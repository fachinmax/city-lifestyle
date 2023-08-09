import { addSearchCityContainer } from './utils/handlers/add-search-city-container'
import { showCities } from './utils/handlers/show-cities'
import { getCityInformations } from './utils/handlers/get-city-informations'

let button = document.querySelector('#addForm')

button.addEventListener('click', addSearchCityContainer)

let forms = Array.from(document.forms)

forms.forEach(form => {
    let searchBar = form.elements['search-bar']
    searchBar.addEventListener('input', showCities)
    searchBar.addEventListener('keydown', getCityInformations)
    form.addEventListener('submit', event => event.preventDefault())
})
