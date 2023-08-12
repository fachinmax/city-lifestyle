'use strict'

import { addCitySearchContainer } from './utils/handlers/add-city-search-container'
import { addHandlersToCitySearchContainer } from './utils/add-handlers-city-search-container'

let button = document.querySelector('#add-containers')

button.addEventListener('click', addCitySearchContainer)

addHandlersToCitySearchContainer()
