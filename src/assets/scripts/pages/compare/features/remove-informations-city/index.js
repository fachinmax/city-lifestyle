'use strict'

import { getButtonRemoveColumn } from './components/button'
import { handlerRemoveColumn } from './actions/remove-column'

function getRemoveInformationsCity() {
    let btn = getButtonRemoveColumn()
    btn.onclick = handlerRemoveColumn
    return btn
}

export { getRemoveInformationsCity }
