'use strict'

import { addFullRow } from './add-new-row'

function getRows(table, location) {
    let rows

    switch (location) {
        case 'head':
            rows = table.tHead.children
            break
        case 'body':
            rows = table.tBodies[0].children
            break
        case 'foot':
            rows = table.tFoot.children
            break
    }

    return rows
}

function writeCell(table, value, indexCol, indexRow, location, addFontWeightClass) {
    let td

    switch (location) {
        case 'head':
            td = table.tHead.children[indexRow].cells[indexCol]
            td.innerHTML = value

            if (addFontWeightClass) td.classList.add('font-weight-bold')

            break
        case 'body':
            td = table.tBodies[0].children[indexRow].cells[indexCol]
            td.innerHTML = value

            if (addFontWeightClass) td.classList.add('font-weight-bold')

            break
        case 'foot':
            td = table.tFoot.children[indexRow].cells[indexCol]
            td.innerHTML = value

            if (addFontWeightClass) td.classList.add('font-weight-bold')

            break
    }

    return ++indexRow
}

function findIndexOf(table, wordToFind, location) {
    let pos = -1
    let index = 0
    let rows = getRows(table, location)

    for (let row of rows) {
        if (row.cells[0].textContent === wordToFind) {
            pos = index
            break
        }

        index++
    }

    return pos
}

function checkIfAddRow(table, index, word, location) {
    switch (location) {
        case 'head':
            if (!table.tHead.children?.[index]) return true

            if (table.tHead.children[index].cells[0].textContent !== word) return true

            return false
            break
        case 'body':
            if (!table.tBodies[0].children?.[index]) return true

            if (table.tBodies[0].children[index].cells[0].textContent !== word) return true

            return false
            break
        case 'foot':
            if (!table.tFoot.children?.[index]) return true

            if (table.tFoot.children[index].cells[0].textContent !== word) return true

            return false
            break
    }
}

function writeNewRow(key, info, table, indexCol, indexRow, location, addFontWeightClass = false) {
    let index = findIndexOf(table, key, location)

    if (index !== -1) indexRow = index

    let isAddRow = checkIfAddRow(table, indexRow, key, location)

    !isAddRow || addFullRow(table, key, indexRow, location, addFontWeightClass)

    indexRow = writeCell(table, info, indexCol, indexRow, location, addFontWeightClass)

    return indexRow
}

export { writeNewRow }
