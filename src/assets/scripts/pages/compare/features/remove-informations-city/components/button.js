'use strict'

import { handlerRemoveColumn } from '../actions/remove-column'

function getButtonRemoveColumn() {
    let btn = document.createElement('button')
    btn.id = 'remove'
    btn.textContent = '-'
    btn.onclick = handlerRemoveColumn
    return btn
}

export { getButtonRemoveColumn }
