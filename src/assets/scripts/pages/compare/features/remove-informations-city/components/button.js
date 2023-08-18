'use strict'

import { handlerRemoveColumn } from '../actions/remove-column'
import { getButton } from '../../../../../components/button'

function getButtonRemoveColumn() {
    let btn = getButton('remove', '-')
    btn.onclick = handlerRemoveColumn
    return btn
}

export { getButtonRemoveColumn }
