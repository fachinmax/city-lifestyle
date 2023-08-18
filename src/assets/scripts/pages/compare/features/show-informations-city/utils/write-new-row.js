'use strict'

import { addNewRows } from './add-new-rows'

function writeNewRow(key, info, table, indexCol, indexRow, addRows) {
    !addRows || addNewRows(table, key)

    table.rows[indexRow++].cells[indexCol].textContent = info
    return indexRow
}

export { writeNewRow }
