'use strict'

import { setViewMap } from '../../../utils/set-view-map'
import L from '../../../../../vendor/leaflet-src'

function initMap(container) {
    let map = L.map(container)
    map.setView([30, 10], 2)
    return map
}

// setting the map
let containerMap = document.querySelector('#map')
let map = initMap(containerMap)
let layerMap = setViewMap(map, 'hybrid')

export { map, layerMap as layer }
