'use strict'

import { unHighlightElement } from '../utils/un-highlight-choises'

function highlightElement(event) {
    let form = event.target.closest('form')
    let input = form.elements['search-bar']
    let listChoises = this
    let target = event.target
    let relatedTarget = event.relatedTarget
    unHighlightElement(listChoises)

    switch (event.type) {
        case 'mouseover':
            if (target instanceof HTMLLIElement) {
                target.setAttribute('data-highlight', true)
                let arrChoises = Array.from(listChoises.children)
                let index = arrChoises.indexOf(target)
                listChoises.index = index
            }

            break
        case 'mouseout':
            if (target instanceof HTMLLIElement) {
                target.setAttribute('data-highlight', false)
            }

            break
    }
}

export { highlightElement }
