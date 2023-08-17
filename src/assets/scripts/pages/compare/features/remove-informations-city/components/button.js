'use strict'

import { handlerRemoveColumn } from '../actions/remove-column'

let btn = document.createElement('button')
btn.id = 'remove'
btn.onclick = handlerRemoveColumn

export { btn as buttonRemoveColumn }
