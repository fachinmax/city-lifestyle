import { setViewMap } from '../utils/set-view-map'

function setStyleDecorator(map, style) {
    return function (event) {
        map.removeLayer(style)
        let newStyle = this.value
        style = setViewMap(map, newStyle)
    }
}

export { setStyleDecorator }
