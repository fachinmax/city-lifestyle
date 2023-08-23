'use strict'

function unHighlightElement(listChoises) {
    let index = listChoises.index

    if (index !== -1) {
        let elementHighlighted = listChoises.children[index]
        elementHighlighted.setAttribute('data-highlight', false)
    }
}

export { unHighlightElement }
