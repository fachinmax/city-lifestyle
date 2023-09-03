'use strict'

import { getInformations } from './get-informations'
import { findRelatedInformations } from './find-related-informations'
import { clearDescription } from './clear-description'
import { clearValue } from './clear-value'

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

    if (!informations.infoUrbanArea) return

    let dataScore = informations.infoUrbanArea.dataScore
    let dataDetails = informations.infoUrbanArea.dataDetails
    showInformationsUrbanArea(dataScore, dataDetails, container)
}

export { showInformationsForIndexPage }
