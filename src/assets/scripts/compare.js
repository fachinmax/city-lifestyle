'use strict'

import '../styles/main.scss'

function filterToInformationsUrbanArea(response) {
    delete response._links
    return response
}

function filterToInformationsCity(response) {
    let [name, region, country] = response.full_name.split(', ')
    let informations = {
        name,
        region,
        country,
        population: response.population,
        urbanArea: response._links['city:urban_area']?.href,
    }
    return informations
}

function cachingDecoratorCity() {
    let dictionary = new Map()

    return function (cityId) {
        let informations = dictionary.get(cityId)

        if (informations) return Promise.resolve(informations)

        let rawHref = process.env.API_SINGLE_CITY
        let endpoint = rawHref.replace(/code/, cityId)
        return fetch(endpoint)
            .then(response => response.json())
            .then(result => {
                dictionary.set(cityId, result)
                return result
            })
            .catch(error => {
                throw new Error('No internet connection')
            })
    }
}

function cachingDecoratorUrbanAreaDetails() {
    let dictionary = new Map()

    return function (endpoint) {
        let informations = dictionary.get(endpoint)

        if (informations) return Promise.resolve(informations)

        return fetch(`${endpoint}details/`)
            .then(response => response.json())
            .then(result => {
                dictionary.set(endpoint, result)
                return result
            })
            .catch(error => {
                throw new Error('No internet connection')
            })
    }
}

function cachingDecoratorUrbanAreaScore() {
    let dictionary = new Map()

    return function (endpoint) {
        let informations = dictionary.get(endpoint)

        if (informations) return Promise.resolve(informations)

        return fetch(`${endpoint}scores/`)
            .then(response => response.json())
            .then(result => {
                dictionary.set(endpoint, result)
                return result
            })
            .catch(error => {
                throw new Error('No internet connection')
            })
    }
}

// functions to get informations which are take and modified to show into the table for the sake of user
async function getInfoCity(subvalueEndpoint) {
    let response, info

    try {
        const apiGetCities = cachingDecoratorCities()
        const apiGetCity = cachingDecoratorCity()

        if (isFinite(subvalueEndpoint)) {
            response = await apiGetCity(Number(subvalueEndpoint))
            info = filterToInformationsCity(response)
        } else {
            response = await apiGetCities(subvalueEndpoint)
            response = filterToInformationsCitiesNameId(response)
            response = checkExistenceCity(response)
            response = await apiGetCity(response[0].id)
            info = filterToInformationsCity(response)
        }

        return info
    } catch (error) {
        alert(error.message)
        return undefined
    }
}

async function getInfoUrbanArea(endpoint) {
    let response, info, dataScore, dataDetails

    try {
        let apiGetUrbanAreaScore = cachingDecoratorUrbanAreaScore()
        let apiGetUrbanAreaDetails = cachingDecoratorUrbanAreaDetails()
        response = await apiGetUrbanAreaScore(endpoint)
        dataScore = await filterToInformationsUrbanArea(response)
        response = await apiGetUrbanAreaDetails(endpoint)
        dataDetails = await filterToInformationsUrbanArea(response.categories)

        return { dataScore, dataDetails }
    } catch (error) {
        alert(error.message)
        return undefined
    }
}

async function getInformations(subvalueEndpoint) {
    let infoCity, infoUrbanArea
    infoCity = await getInfoCity(subvalueEndpoint)
    let endpointUrbanArea = infoCity?.urbanArea
    infoUrbanArea = endpointUrbanArea
        ? await getInfoUrbanArea(endpointUrbanArea)
        : undefined

    return { infoCity, infoUrbanArea }
}

function unHighlightElement(listChoises) {
    let index = listChoises.index

    if (index !== -1) {
        let elementHighlighted = listChoises.children[index]
        elementHighlighted.setAttribute('data-highlight', false)
    }
}

function checkExistenceCity(city) {
    if (!city) throw Error('no city founded')

    return city
}

function showOptions(cities, container) {
    cities.forEach(item => {
        let liElement = document.createElement('li')
        liElement.textContent = item.name
        liElement.idCity = item.id
        container.append(liElement)
    })
}

// functions to filter all information by api to get only the id and the name of cities
function getDataFormLocation(response) {
    let city =
        response._embedded['location:nearest-cities']?.[0]._links['location:nearest-city']
    // no city founded
    if (!city) return undefined

    return city.href.match(/\d+/)[0]
}

function getDataFormCityList(response) {
    // no city founded
    if (response.count === 0) return undefined

    let cities = response._embedded['city:search-results']
    let cityName
    let cityId
    let href
    return cities.map(city => {
        cityName = city.matching_full_name
        href = city._links['city:item'].href
        cityId = href.match(/\d+/)[0]
        return {
            name: cityName,
            id: cityId,
        }
    })
}

function filterToInformationsCitiesNameId(response) {
    if (response._embedded?.['city:search-results']) {
        return getDataFormCityList(response)
    } else {
        return getDataFormLocation(response)
    }
}

function removeChildren(...args) {
    args.forEach(container => {
        while (container.children.length) {
            container.firstElementChild.remove()
        }
    })
}

function dispatchKeyDownEvent(event) {
    let form = event.target.closest('form')
    let ulChoises = event.target.parentElement
    let input = form.elements['search-bar']
    ulChoises.idCitySelected = event.target.idCity

    let keyDownEvent = new Event('keydown')
    keyDownEvent.keyCode = 13

    input.dispatchEvent(keyDownEvent)
}

function highlightElement(event) {
    let form = event.target.closest('form')
    let input = form.elements['search-bar']
    let listChoises = this
    let target = event.target
    let relatedTarget = event.relatedTarget
    unHighlightElement(listChoises)

    switch (event.type) {
        case 'mouseover':
            if (target instanceof HTMLLIElement) {
                target.setAttribute('data-highlight', true)
                let arrChoises = Array.from(listChoises.children)
                let index = arrChoises.indexOf(target)
                listChoises.index = index
            }

            break
        case 'mouseout':
            if (target instanceof HTMLLIElement) {
                target.setAttribute('data-highlight', false)
            }

            break
    }
}

function clearDataTable(table, pos) {
    let rows = Array.from(table.rows)

    rows.forEach((row, index) => {
        if (index === 0) return
        let cell = row.cells[pos]
        cell.innerHTML = ''
    })
}

function clearValue(value) {
    let valueCleared = undefined

    switch (value.type) {
        case 'float':
            valueCleared = parseFloat(value.float_value).toFixed(2)
            break
        case 'currency_dollar':
            valueCleared = `$ ${value.currency_dollar_value}`
            break
        case 'percent':
            valueCleared = parseFloat(value.percent_value).toFixed(2) + ' %'
            break
        default:
            valueCleared = value[`${value.type}_value`]
            break
    }

    return valueCleared
}

function clearDescription(description) {
    return description.replace(/\[Teleport score\]/, '(score)')
}

function findIndexCell(table, cell) {
    let cells = Array.from(table.rows[0].cells)
    let index = cells.indexOf(cell)
    return index
}

function findRelatedInformations(values, key) {
    let arr = values.filter(obj => {
        return obj.label === key
    })

    return arr[0]
}

// functions to grab all informations and puts into the table
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

// functions to create a button to remove a form to choose a new city
// function findIndexCell(table, cell) {
//     let cells = Array.from(table.rows[0].cells)
//     let index = cells.indexOf(cell)
//     return index
// }

function deleteAllCells(table, index) {
    let rows = Array.from(table.rows)

    rows.forEach(row => {
        row.deleteCell(index)
    })
}

function getButtonRemoveColumn() {
    let btn = document.createElement('button')
    btn.id = 'remove'
    btn.textContent = '-'
    btn.onclick = handlerRemoveColumn
    return btn
}
function handlerRemoveColumn(event) {
    let currentCell = this.closest('td')
    let table = document.querySelector('table')
    let index = findIndexCell(table, currentCell)
    deleteAllCells(table, index)
}

function getButtonToRemoveFormToChooseCity() {
    let btn = getButtonRemoveColumn()
    btn.onclick = handlerRemoveColumn
    return btn
}

// functions to scroll through all city founded by show all city functions
function setIndex(direction, ulElement) {
    if (ulElement.index == -1 && direction === 'up') {
        ulElement.index = ulElement.children.length - 1
        return
    }

    if (ulElement.index == ulElement.children.length - 1 && direction === 'down') {
        ulElement.index = -1
        return
    }

    if (direction === 'up') {
        --ulElement.index
        return
    }

    if (direction === 'down') {
        ++ulElement.index
        return
    }
}

function highlightChildren(isElemToMark, container) {
    if (container.index === -1) return

    container.children[container.index].setAttribute('data-highlight', isElemToMark)
}

function rewriteInputElement(input, ul) {
    // value memorized by show-cities module
    if (ul.index === -1) input.value = input.partialNameCity
    else input.value = ul.children[ul.index].textContent
}

function scrollToChoises(event) {
    // 40 -> arrow down
    // 38 -> arrow up
    if (!(event.keyCode === 40 || event.keyCode === 38)) return

    if (!this.value) return

    let containerChoises = this.form.querySelector('#choises')
    unHighlightElement(containerChoises)

    if (!containerChoises.children.length) return

    let direction = event.keyCode === 40 ? 'down' : 'up'
    highlightChildren(false, containerChoises)
    setIndex(direction, containerChoises)

    if (containerChoises.index === -1) {
        containerChoises.idCitySelected = undefined
    } else {
        containerChoises.idCitySelected =
            containerChoises.children[containerChoises.index].idCity
    }

    highlightChildren(true, containerChoises)
    rewriteInputElement(this, containerChoises)
}

function cachingDecoratorCities() {
    let dictionary = new Map()

    return function (cityName) {
        let cities = dictionary.get(cityName)

        if (cities) return Promise.resolve(cities)

        let api = process.env.API_SEARCH_CITY
        api = api.replace(/name/, cityName)
        return fetch(api)
            .then(response => response.json())
            .then(result => {
                dictionary.set(cityName, result)
                return result
            })
            .catch(error => {
                throw new Error('No internet connection')
            })
    }
}

function showCities(event) {
    let container = this.form.querySelector('#choises')
    removeChildren(container)
    let nameCity = this.value

    if (!nameCity) {
        container.hidden = true
        return
    }

    // I need memorize the input value and set the index to -1 because I'll use it when the user scroll all the city choises (see scroll-to-choises module)
    this.partialNameCity = nameCity
    container.index = -1
    container.idCitySelected = undefined
    let apiGetCities = cachingDecoratorCities()

    apiGetCities(nameCity)
        .then(filterToInformationsCitiesNameId)
        .then(checkExistenceCity)
        .then(
            results => {
                container.hidden = false
                showOptions(results, container)
            },
            error => (container.hidden = true)
        )
        .catch(error => {
            alert(error.message)
        })
}

// functions to create a new form to choose a new city
function inputElement(type, name, placeholder) {
    let input = document.createElement('input')
    input.type = type
    input.name = name
    input.placeholder = placeholder
    input.autocomplete = 'off'
    input.setAttribute('data-dimension', 'small')
    return input
}

function ulElement(id) {
    let ul = document.createElement('ul')
    ul.id = id
    ul.setAttribute('data-location', 'table')
    ul.hidden = true
    return ul
}

function getForm() {
    let form = document.createElement('form')
    form.name = 'cities'
    form.classList.add('container-city-search__form-small')
    let input = inputElement('text', 'search-bar', 'Search...')
    let ul = ulElement('choises')
    form.append(input, ul)
    return form
}

function getFormToChooseCity() {
    let form = getForm()
    let showInformationsCity = document.createElement('div')
    showInformationsCity.classList.add('container-city-search')
    showInformationsCity.setAttribute('data-position', 'left')
    let searchBar = form.elements['search-bar']
    let containerChoises = form.querySelector('ul')
    searchBar.oninput = showCities
    searchBar.onkeydown = showInformationsForComparePage
    searchBar.addEventListener('keydown', scrollToChoises)
    form.onsubmit = event => event.preventDefault()
    containerChoises.onmouseover = containerChoises.onmouseout = highlightElement
    containerChoises.onclick = dispatchKeyDownEvent
    showInformationsCity.append(getButtonToRemoveFormToChooseCity(), form)
    return showInformationsCity
}

//  function to add a new column to table
function addColumn(event) {
    let table = document.querySelector('table')
    let rows = Array.from(table.rows)

    rows.forEach(row => row.insertCell(-1))

    let lastIndexCells = rows[0].cells.length - 1
    rows[0].cells[lastIndexCells].append(getFormToChooseCity())
}

let formsArr = Array.from(document.forms)
formsArr.forEach(form => {
    let searchBar = form.elements['search-bar']
    let removeButton = form.closest('td').querySelector('#remove')
    let containerChoises = form.querySelector('ul')
    searchBar.oninput = showCities
    searchBar.onkeydown = showInformationsForComparePage
    searchBar.addEventListener('keydown', scrollToChoises)
    removeButton.onclick = handlerRemoveColumn
    containerChoises.onmouseover = containerChoises.onmouseout = highlightElement
    containerChoises.onclick = dispatchKeyDownEvent
    form.onsubmit = event => event.preventDefault()
})

let button = document.querySelector('#add-containers')
button.onclick = addColumn
