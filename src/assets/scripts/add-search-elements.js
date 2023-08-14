'use strict'

import { addContainerCitySearch } from './utils/handlers/add-container-city-search'
import { addHandlersToContainerCitySearch } from './utils/add-handlers-container-city-search'

let button = document.querySelector('#add-containers')

button.addEventListener('click', addContainerCitySearch)

addHandlersToContainerCitySearch()
