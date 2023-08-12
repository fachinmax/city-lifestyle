import { dataMapStyles } from '../data/data-map-styles'

function setViewMap(map, style) {
    let layer = L.tileLayer(...dataMapStyles[style])
    map.addLayer(layer)
    return layer
}

export { setViewMap }
