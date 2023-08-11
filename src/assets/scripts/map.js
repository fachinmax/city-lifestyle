'use strict'

import { mapContainerDecorator as getCoordsReturnCityInformations } from './utils/handlers/get-coords-return-city'
import { setStyleDecorator as setMapStyle } from './utils/handlers/set-map-style'
import { setViewMap } from './utils/set-view-map'

function initMap(container) {
    let map = L.map(container)
    map.setView([30, 10], 1)
    return map
}

// setting the map
let mapContainer = document.querySelector('#map')
let map = initMap(mapContainer)
let mapLayer = setViewMap(map, 's,h')
map.on('click', getCoordsReturnCityInformations(mapContainer))

// handle the map style
let mapStyle = document.querySelector('#map-style')
mapStyle.onchange = setMapStyle(map, mapLayer)
