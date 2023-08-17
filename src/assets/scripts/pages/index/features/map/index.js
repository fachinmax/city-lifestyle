'use strict'

import { mapContainerDecorator as getCoordsReturnCityInformations } from './actions/set-coords-show-city'
import { setStyleDecorator as setStyleMap } from './actions/set-style-map'
import { map, layer } from './components/map'

let containerMap = document.querySelector('#map')
let styleMap = document.querySelector('#style-map')

map.on('click', getCoordsReturnCityInformations(containerMap))
styleMap.onchange = setStyleMap(map, layer)
