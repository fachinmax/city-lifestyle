'use strict'

import { getForm } from '../../../../../components/form'
import { getInput } from '../../../../../components/input'
import { getUl } from '../../../../../components/ul'

function form() {
    let form = getForm('cities')
    let input = getInput('text', 'search-bar', 'search')
    let ul = getUl('choises')
    form.append(input, ul)
    return form
}

export { form as getForm }
