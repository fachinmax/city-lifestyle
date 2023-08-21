'use strict'

import { getInput } from './input'
import { getUl } from './ul'

function form() {
    let form = document.createElement('form')
    form.name = 'cities'
    let input = getInput('text', 'search-bar', 'Search...')
    let ul = getUl('choises')
    form.append(input, ul)
    return form
}

export { form as getForm }
