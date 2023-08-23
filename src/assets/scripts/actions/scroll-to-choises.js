'use strict'

import { unHighlightElement } from '../utils/un-highlight-choises'

function setIndex(direction, ulElement) {
    if (ulElement.index == -1 && direction === 'up') {
        ulElement.index = ulElement.children.length - 1
        return
    }

    if (ulElement.index == ulElement.children.length - 1 && direction === 'down') {
        ulElement.index = -1
        return
    }

    if (direction === 'up') {
        --ulElement.index
        return
    }

    if (direction === 'down') {
        ++ulElement.index
        return
    }
}

function highlightChildren(isElemToMark, container) {
    if (container.index === -1) return

    container.children[container.index].setAttribute('data-highlight', isElemToMark)
}

function rewriteInputElement(input, ul) {
    // value memorized by show-cities module
    if (ul.index === -1) input.value = input.partialNameCity
    else input.value = ul.children[ul.index].textContent
}

function scrollToChoises(event) {
    // 40 -> arrow down
    // 38 -> arrow up
    if (!(event.keyCode === 40 || event.keyCode === 38)) return

    if (!this.value) return

    let containerChoises = this.form.querySelector('#choises')
    unHighlightElement(containerChoises)

    if (!containerChoises.children.length) return

    let direction = event.keyCode === 40 ? 'down' : 'up'
    highlightChildren(false, containerChoises)
    setIndex(direction, containerChoises)

    if (containerChoises.index === -1) {
        containerChoises.idCitySelected = undefined
    } else {
        containerChoises.idCitySelected =
            containerChoises.children[containerChoises.index].idCity
    }

    highlightChildren(true, containerChoises)
    rewriteInputElement(this, containerChoises)
}

export { scrollToChoises }
