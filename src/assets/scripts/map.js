'use strict'

import '../styles/vendor/leaflet.css'
import { mapContainerDecorator as getCoordsReturnCityInformations } from './utils/handlers/get-coords-return-city'
import { setStyleDecorator as setStyleMap } from './utils/handlers/set-style-map'
import { setViewMap } from './utils/set-view-map'
import L from './vendor/leaflet-src'

function initMap(container) {
    let map = L.map(container)
    map.setView([30, 10], 2)
    return map
}

// setting the map
let containerMap = document.querySelector('#map')
let map = initMap(containerMap)
let layerMap = setViewMap(map, 'hybrid')

map.on('click', getCoordsReturnCityInformations(containerMap))

// handle the map style
let styleMap = document.querySelector('#style-map')
styleMap.onchange = setStyleMap(map, layerMap)
