'use strict'

import { addContainerCitySearch } from '../../actions/add-container-city-search'
import { addHandlersToContainerCitySearch } from '../../utils/add-handlers-container-city-search'

addHandlersToContainerCitySearch()

let button = document.querySelector('#add-containers')
button.addEventListener('click', addContainerCitySearch)
