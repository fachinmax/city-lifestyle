'use strict'

import { findIndexCell } from './find-index-cell'
import { clearDataTable } from './clear-data-table'
import { getInformations } from './get-informations'
import { removeChildren } from './remove-children'
import { findRelatedInformations } from './find-related-informations'
import { clearDescription } from './clear-description'
import { clearValue } from './clear-value'

function addArrToRow(arr, table, index, location) {
    switch (location) {
        case 'head':
            table.tHead.children[index].append(...arr)
            break

        case 'body':
            table.tBodies[0].children[index].append(...arr)
            break

        case 'foot':
            table.tFoot.children[index].append(...arr)
            break
    }
}

function createTdArr(length, text, addFontWeightClass) {
    let arrTd = []

    let td = document.createElement('td')
    td.textContent = text

    if (addFontWeightClass) td.classList.add('font-weight-bold')

    arrTd.push(td)

    for (let i = 1; i < length; i++) {
        arrTd.push(document.createElement('td'))
    }

    return arrTd
}

function fillRow(table, indexRow, text, location, addFontWeightClass) {
    let numbCells = table.rows[0].cells.length
    let arr = createTdArr(numbCells, text, addFontWeightClass)
    addArrToRow(arr, table, indexRow, location)
}

function addRow(table, location, index) {
    let tr = document.createElement('tr')

    switch (location) {
        case 'head':
            if (
                table.tHead.children.length === 0 ||
                table.tHead.children.length === index
            ) {
                table.tHead.append(tr)
            } else {
                let children = Array.from(table.tHead.children)
                let left = children.slice(0, index)
                let right = children.slice(index)
                let newContent = [...left, tr, ...right]
                table.tHead.innerHTML = ''
                table.tHead.append(...newContent)
            }

            break

        case 'foot':
            if (
                table.tFoot.children.length === 0 ||
                table.tFoot.children.length === index
            ) {
                table.tFoot.append(tr)
            } else {
                let children = Array.from(table.tFoot.children)
                let right = children.slice(0, index)
                let left = children.slice(index)
                let newContent = [...right, tr, ...left]
                table.tFoot.innerHTML = ''
                table.tFoot.append(...newContent)
            }

            break

        case 'body':
        default:
            if (
                table.tBodies[0].children.length === 0 ||
                table.tBodies[0].children.length === index
            ) {
                table.tBodies[0].append(tr)
            } else {
                let children = Array.from(table.tBodies[0].children)
                let right = children.slice(0, index)
                let left = children.slice(index)
                let newContent = [...right, tr, ...left]
                table.tBodies[0].innerHTML = ''
                table.tBodies[0].append(...newContent)
            }

            break
    }
}

function addFullRow(
    table,
    textToFirstCell,
    indexRow,
    location = 'body',
    addFontWeightClass
) {
    addRow(table, location, indexRow)
    fillRow(table, indexRow, textToFirstCell, location, addFontWeightClass)
}

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

            if (table.tBodies[0].children[index].cells[0].textContent !== word)
                return true

            return false
            break
        case 'foot':
            if (!table.tFoot.children?.[index]) return true

            if (table.tFoot.children[index].cells[0].textContent !== word) return true

            return false
            break
    }
}

function writeNewRow(
    key,
    info,
    table,
    indexCol,
    indexRow,
    location,
    addFontWeightClass = false
) {
    let index = findIndexOf(table, key, location)

    if (index !== -1) indexRow = index

    let isAddRow = checkIfAddRow(table, indexRow, key, location)

    !isAddRow || addFullRow(table, key, indexRow, location, addFontWeightClass)

    indexRow = writeCell(table, info, indexCol, indexRow, location, addFontWeightClass)

    return indexRow
}

function setDetails(info, table, indexCol, indexRow) {
    let description, value

    info.data.forEach(data => {
        description = clearDescription(data.label)
        value = clearValue(data)
        indexRow = writeNewRow(description, value, table, indexCol, indexRow, 'body')
    })

    return indexRow
}

function setCategories(categories, details, table, indexCol, indexRow) {
    categories.forEach(categorie => {
        indexRow = writeNewRow(
            categorie.name,
            categorie.score_out_of_10.toFixed(2),
            table,
            indexCol,
            indexRow,
            'body',
            true
        )

        let relatedDetails = findRelatedInformations(details, categorie.name)

        if (!relatedDetails) return

        indexRow = setDetails(relatedDetails, table, indexCol, indexRow)
    })

    return indexRow
}

function setInformationsUrbanArea(informations, table, indexCol, indexRows) {
    indexRows = setCategories(
        informations.dataScore.categories,
        informations.dataDetails,
        table,
        indexCol,
        indexRows
    )

    // show city score
    let data = informations.dataScore.teleport_city_score.toFixed(2)
    indexRows = 0
    writeNewRow('City score', data, table, indexCol, indexRows, 'foot', true)
}

function setInformationsCity(informations, table, indexCol) {
    let indexRows = 0

    for (let [key, value] of Object.entries(informations)) {
        key = key[0].toUpperCase() + key.slice(1)
        indexRows = writeNewRow(key, value, table, indexCol, indexRows, 'body')
    }

    return indexRows
}

function setInformationsTable(informations, table, index) {
    delete informations.infoCity.urbanArea
    let indexRow = setInformationsCity(informations.infoCity, table, index)
    informations.infoUrbanArea &&
        setInformationsUrbanArea(informations.infoUrbanArea, table, index, indexRow)
}

async function showInformationsForComparePage(event) {
    if (event.keyCode !== 13) return

    let form = this.form
    let table = document.querySelector('table')
    let currentCell = this.form.closest('td')
    let index = findIndexCell(table, currentCell)
    let listChoises = form.querySelector('#choises')
    removeChildren(listChoises)
    clearDataTable(table, index)
    let cityName = this.value
    listChoises.hidden = true

    if (!cityName) return

    this.value = ''

    // id city saved when the user score through the list of all possible cities. See data scroll to choises module
    let valueToGetInfo = listChoises.idCitySelected
        ? Number(listChoises.idCitySelected)
        : cityName

    let allInfo = await getInformations(valueToGetInfo)

    if (!allInfo.infoCity) return

    setInformationsTable(allInfo, table, index)
}

export { showInformationsForComparePage }
