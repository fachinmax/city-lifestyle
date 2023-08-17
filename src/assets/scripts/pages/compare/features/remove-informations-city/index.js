'use strict'

import { buttonRemoveColumn } from './components/button'
import { handlerRemoveColumn } from './actions/remove-column'

buttonRemoveColumn.onclick = handlerRemoveColumn

export { buttonRemoveColumn as removeInformationsCity }
