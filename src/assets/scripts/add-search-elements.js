import { addSearchCityContainer } from './utils/handlers/add-search-city-container'
import { addHandlersToSearchContainer } from './utils/add-handlers-search-city-container'

let button = document.querySelector('#addForm')

button.addEventListener('click', addSearchCityContainer)

addHandlersToSearchContainer()
