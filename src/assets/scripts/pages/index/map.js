'use strict'

import { mapContainerDecorator as getCoordsReturnCityInformations } from '../../actions/set-coords-show-city'
import { setStyleDecorator as setStyleMap } from '../../actions/set-style-map'
import L from '../../vendor/leaflet-src'
import { dataMapStyles } from '../../data/data-map-styles'

function setViewMap(map, style) {
    let layer = L.tileLayer(...dataMapStyles[style])
    map.addLayer(layer)
    return layer
}

function initMap(container) {
    let map = L.map(container)
    map.setView([30, 10], 2)
    return map
}

let containerMap = document.querySelector('#map')
let map = initMap(containerMap)
let layer = setViewMap(map, 'hybrid')
let styleMap = document.querySelector('#style-map')

map.on('click', getCoordsReturnCityInformations(containerMap))
styleMap.onchange = setStyleMap(map, layer)
