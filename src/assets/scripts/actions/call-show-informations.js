function callShowInformations(event) {
    let form = event.target.closest('form')
    let input = form.elements['search-bar']
    let keyDownEvent = new Event('keydown')
    keyDownEvent.keyCode = 13
    input.dispatchEvent(keyDownEvent)
}

export { callShowInformations }
