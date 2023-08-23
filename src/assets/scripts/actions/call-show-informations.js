'use strict'

function callShowInformations(event) {
    let form = event.target.closest('form')
    let ulChoises = event.target.parentElement
    let input = form.elements['search-bar']
    ulChoises.idCitySelected = event.target.idCity

    let keyDownEvent = new Event('keydown')
    keyDownEvent.keyCode = 13

    input.dispatchEvent(keyDownEvent)
}

export { callShowInformations }
