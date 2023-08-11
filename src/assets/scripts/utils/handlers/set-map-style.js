import { setViewMap } from '../set-view-map'

function setStyleDecorator(map, style) {
    return function (event) {
        map.removeLayer(style)
        let newStyle = this.selectedOptions[0].value
        style = setViewMap(map, newStyle)
    }
}

export { setStyleDecorator }
