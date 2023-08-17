'use strict'

import { getForm } from '../../../../../components/form'
import { getInput } from '../../../../../components/input'
import { getUl } from '../../../../../components/ul'

let form = getForm('cities')
let input = getInput('text', 'search-bar', 'search')
let ul = getUl('choises')
form.append(input, ul)

export { form }
