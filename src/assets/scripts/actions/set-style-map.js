'use strict'

import { dataMapStyles } from '../data/data-map-styles'

function setViewMap(map, style) {
    let layer = L.tileLayer(...dataMapStyles[style])
    map.addLayer(layer)
    return layer
}

function setStyleDecorator(map, style) {
    return function (event) {
        map.removeLayer(style)
        let newStyle = this.value
        style = setViewMap(map, newStyle)
    }
}

export { setStyleDecorator }
