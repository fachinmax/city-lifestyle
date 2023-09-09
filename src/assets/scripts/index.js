'use strict'

import '../styles/main.scss'
import L from './leaflet-src'

// dictionary with all map's styles
let hybrid = [
    `http://{s}.google.com/vt/lyrs=s,h,&x={x}&y={y}&z={z}`,
    {
        maxZoom: 19,
        attribution: '© Google maps',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
]
let terrain = [
    `http://{s}.google.com/vt/lyrs=p,&x={x}&y={y}&z={z}`,
    {
        maxZoom: 19,
        attribution: '© Google maps',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
]
let satellite = [
    `http://{s}.google.com/vt/lyrs=s,&x={x}&y={y}&z={z}`,
    {
        maxZoom: 19,
        attribution: '© Google maps',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
]
let street = [
    `http://{s}.google.com/vt/lyrs=m,&x={x}&y={y}&z={z}`,
    {
        maxZoom: 19,
        attribution: '© Google maps',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
]

let dataMapStyles = {
    hybrid,
    satellite,
    street,
    terrain,
}

// functions to set the style of map
function setViewMap(map, style) {
    let layer = L.tileLayer(...dataMapStyles[style])
    map.addLayer(layer)
    return layer
}

function setStyleDecorator(map, style) {
    return function (event) {
        map.removeLayer(style)
        let newStyle = this.value
        style = setViewMap(map, newStyle)
    }
}

// functions to show all city informations by use the map
function showPopup(map, lat, lng) {
    let popup = L.popup()
    popup
        .setLatLng([lat, lng])
        .setContent(`Coordinates: latitude: ${lat}, longitude: ${lng}`)
    map.addLayer(popup)

    return popup
}

function removePopup(map, popup) {
    map.closePopup(popup)
}

function mapContainerDecorator(container) {
    return async function (event) {
        let containerInformations = document.querySelector('#informations')
        let containerChoises = document.querySelector('#choises')
        removeChildren(containerChoises, containerInformations)
        document.querySelector('input').value = ''

        let lat = event.latlng.lat
        let lng = event.latlng.lng
        let popup = showPopup(this, lat, lng)
        setTimeout(removePopup, 2500, this, popup)

        try {
            let apiGetLocation = cachingDecoratorGetLocation()
            let idCity = await apiGetLocation(lat, lng)
                .then(filterToInformationsCitiesNameId)
                .then(checkExistenceCity)

            showInformationsForIndexPage(idCity, containerInformations)
        } catch (error) {
            alert(error)
        }
    }
}

function initMap(container) {
    let map = L.map(container)
    map.setView([30, 10], 2)
    return map
}

// functions to filter data from api and return only id and name of every city
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

function filterToInformationsUrbanArea(response) {
    delete response._links
    return response
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

function cachingDecoratorGetLocation() {
    let dictionary = new Map()

    return function (lat, lng) {
        let informations = dictionary.get(`${lat},${lng}`)

        if (informations) return Promise.resolve(informations)

        let rawHref = process.env.API_SEARCH_LOCATION
        let endpoint = rawHref.replace(/lat,lng/, `${lat},${lng}`)
        return fetch(endpoint)
            .then(response => response.json())
            .then(result => {
                dictionary.set(`${lat},${lng}`, result)
                return result
            })
            .catch(error => {
                throw new Error('No internet connection')
            })
    }
}

function removeChildren(...args) {
    args.forEach(container => {
        while (container.children.length) {
            container.firstElementChild.remove()
        }
    })
}

function checkExistenceCity(city) {
    if (!city) throw Error('no city founded')

    return city
}

// functions for show city informations to the user
function createContainerScore(score) {
    let card = document.createElement('section')
    card.classList.add('container-city-search__summary')
    let title = document.createElement('h3')
    title.innerHTML = score.name
    let paragraph = document.createElement('p')
    let dataFixed = Number(score.score_out_of_10).toFixed(2)
    paragraph.innerHTML = `${dataFixed}/10`
    card.append(title, paragraph)
    return card
}

function createContainerDetails(score) {
    let table = document.createElement('table')

    let rows = score.data.map(data => {
        let row = document.createElement('tr')
        let description = document.createElement('td')
        let value = document.createElement('td')
        description.textContent = clearDescription(data.label)
        value.textContent = clearValue(data)
        row.append(description, value)
        return row
    })

    table.append(...rows)
    return table
}

function showSummary(informations, container) {
    let containerSummary = document.createElement('section')
    let title = document.createElement('h2')
    containerSummary.classList.add('container-city-search__summary')

    title.innerHTML = 'Summary'
    containerSummary.innerHTML = informations
    containerSummary.prepend(title)
    container.append(containerSummary)
}

function showStatistics(score, details, container) {
    let containerStatistics = document.createElement('section')
    containerStatistics.classList.add('container-city-search__statistic')
    let title = document.createElement('h2')
    title.innerHTML = 'Statistics'
    containerStatistics.append(title)

    score.forEach(statistic => {
        let containerScore = createContainerScore(statistic)
        let detailsScore = findRelatedInformations(details, statistic.name)

        if (!detailsScore) return

        let containerDetails = createContainerDetails(detailsScore)
        containerScore.append(containerDetails)
        containerStatistics.append(containerScore)
    })
    container.append(containerStatistics)
}

function showAverageScore(informations, container) {
    let containerAverage = document.createElement('section')
    containerAverage.classList.add('flow')
    containerAverage.classList.add('container-city-search__average')
    let title = document.createElement('h2')
    title.innerHTML = 'Total average'
    let average = document.createElement('p')
    let dataFixed = Number(informations).toFixed(2)
    average.innerHTML = dataFixed
    containerAverage.prepend(title, average)
    container.append(containerAverage)
}

function showInformationsUrbanArea(score, details, container) {
    showSummary(score.summary, container)
    showStatistics(score.categories, details, container)
    showAverageScore(score.teleport_city_score, container)
}

async function showInformationsCity(informations, container) {
    let sectionElement = document.createElement('section')
    sectionElement.classList.add('container-city-search__general')
    let title = document.createElement('h2')
    title.innerHTML = 'General'
    sectionElement.prepend(title)

    for (let [key, value] of Object.entries(informations)) {
        if (key === 'urbanArea') continue
        let paragraph = document.createElement('p')
        paragraph.innerHTML = `${key}: ${value}`
        sectionElement.append(paragraph)
    }

    container.append(sectionElement)
}

async function showInformationsForIndexPage(cityCode, container) {
    let informations = await getInformations(cityCode)

    if (!informations.infoCity) return

    showInformationsCity(informations.infoCity, container)
    container.scrollIntoView()

    if (!informations.infoUrbanArea) return

    let dataScore = informations.infoUrbanArea.dataScore
    let dataDetails = informations.infoUrbanArea.dataDetails
    showInformationsUrbanArea(dataScore, dataDetails, container)
    container.scrollIntoView()
}

// functions to return all informations that will be shown to the user
async function getInfoCity(subvalueEndpoint) {
    let response, info

    try {
        let apiGetInformationsCity = cachingDecoratorCity()

        if (isFinite(subvalueEndpoint)) {
            response = await apiGetInformationsCity(Number(subvalueEndpoint))
            info = filterToInformationsCity(response)
        } else {
            let apiGetCities = cachingDecoratorCities()
            response = await apiGetCities(subvalueEndpoint)
            response = filterToInformationsCitiesNameId(response)
            response = checkExistenceCity(response)
            response = await apiGetInformationsCity(response[0].id)
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

let containerMap = document.querySelector('#map')
let map = initMap(containerMap)
let layer = setViewMap(map, 'hybrid')
let styleMap = document.querySelector('#style-map')
let getCoordsReturnCityInformations = mapContainerDecorator(containerMap)
map.on('click', getCoordsReturnCityInformations)
let setStyleMap = setStyleDecorator(map, layer)
styleMap.onchange = setStyleMap

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

function unHighlightElement(listChoises) {
    let index = listChoises.index

    if (index !== -1) {
        let elementHighlighted = listChoises.children[index]
        elementHighlighted.setAttribute('data-highlight', false)
    }
}

// functions to scroll through all the cities found by the api
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

function dispatchKeyDownEvent(event) {
    let form = event.target.closest('form')
    let ulChoises = event.target.parentElement
    let input = form.elements['search-bar']
    ulChoises.idCitySelected = event.target.idCity

    let keyDownEvent = new Event('keydown')
    keyDownEvent.keyCode = 13

    input.dispatchEvent(keyDownEvent)
}

function showOptions(cities, container) {
    cities.forEach(item => {
        let liElement = document.createElement('li')
        liElement.textContent = item.name
        liElement.idCity = item.id
        container.append(liElement)
    })
}

function showInformations(event) {
    if (event.keyCode !== 13) return

    let form = this.form
    let idContainer = form.getAttribute('aria-controls')
    let containerInformations = document.querySelector(`#${idContainer}`)
    let containerChoises = form.querySelector('#choises')
    removeChildren(containerChoises, containerInformations)
    let cityName = this.value
    containerChoises.hidden = true

    if (!cityName) return

    this.value = ''
    // id city saved when the user score through the list of all possible cities. See data scroll to choises module

    let valueForGetInfo = containerChoises.idCitySelected
        ? Number(containerChoises.idCitySelected)
        : cityName

    showInformationsForIndexPage(valueForGetInfo, containerInformations)
}

function findRelatedInformations(values, key) {
    let arr = values.filter(obj => {
        return obj.label === key
    })

    return arr[0]
}

function clearDescription(description) {
    return description.replace(/\[Teleport score\]/, '(score)')
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

let form = document.forms['cities']
let searchBar = form.elements['search-bar']
let containerChoises = form.querySelector('ul')
searchBar.oninput = showCities
searchBar.onkeydown = showInformations
searchBar.addEventListener('keydown', scrollToChoises)
containerChoises.onmouseover = containerChoises.onmouseout = highlightElement
containerChoises.onclick = dispatchKeyDownEvent
form.onsubmit = event => event.preventDefault()
