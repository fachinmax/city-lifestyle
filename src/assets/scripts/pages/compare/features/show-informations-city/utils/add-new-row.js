'use strict'

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

function createTdArr(length, text) {
    let arrTd = []

    let td = document.createElement('td')
    td.textContent = text
    arrTd.push(td)

    for (let i = 1; i < length; i++) {
        arrTd.push(document.createElement('td'))
    }

    return arrTd
}

function fillRow(table, indexRow, text, location) {
    let numbCells = table.rows[0].cells.length
    let arr = createTdArr(numbCells, text)
    addArrToRow(arr, table, indexRow, location)
}

function addRow(table, location, index) {
    let tr = document.createElement('tr')

    switch (location) {
        case 'head':
            if (table.tHead.children.length === 0 || table.tHead.children.length === index) {
                table.tHead.append(tr)
            } else {
                let children = Array.from(table.tHead.children)
                let right = children.slice(0, index)
                let left = children.slice(index)
                let newContent = [...right, tr, ...left]
                table.tHead.innerHTML = ''
                table.tHead.append(...newContent)
            }

            break

        case 'foot':
            if (table.tFoot.children.length === 0 || table.tFoot.children.length === index) {
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

function addFullRow(table, textToFirstCell, indexRow, location = 'body') {
    addRow(table, location, indexRow)
    fillRow(table, indexRow, textToFirstCell, location)
}

export { addFullRow }
