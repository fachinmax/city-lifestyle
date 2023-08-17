'use strict'

import { removeForm } from '../actions/remove-column'

let btn = document.createElement('button')
btn.id = 'remove'
btn.onclick = removeForm

export { btn as buttonRemoveColumn }
