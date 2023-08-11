'use strict'

import { mapContainerDecorator as getCoordsReturnCityInformations } from './utils/handlers/get-coords-return-city'

function initMap(container) {
    const map = L.map(container)
    map.setView([30, 10], 1)
    return map
}

function setViewMap(map, style) {
    const layer = L.tileLayer(
        `http://{s}.google.com/vt/lyrs=s,h,h&x={x}&y={y}&z={z}`,
        {
            maxZoom: 19,
            attribution: '© Google maps',
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        }
    )
    map.addLayer(layer)
}

const mapContainer = document.querySelector('#map')
const map = initMap(mapContainer)
setViewMap(map)
map.on('click', getCoordsReturnCityInformations(mapContainer))
