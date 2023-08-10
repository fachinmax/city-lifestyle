'use strict'

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
map.on('click', onMapClick)

function onMapClick(event) {
    const popup = L.popup()
    popup
        .setLatLng(event.latlng)
        .setContent(
            `Coordinates: latitude: ${event.latlng.lat}, longitude: ${event.latlng.lng}`
        )
    map.addLayer(popup)
    console.log(event.latlng)
    setTimeout(_ => map.removeLayer(popup), 2000)
}
