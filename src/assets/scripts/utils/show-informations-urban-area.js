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

function findRelatedInformations(values, key) {
    let arr = values.filter(obj => {
        return obj.label === key
    })

    return arr[0]
}

function createContainerScore(score) {
    let card = document.createElement('div')
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
    let containerSummary = document.createElement('div')
    let title = document.createElement('h2')
    title.innerHTML = 'Summary'
    containerSummary.innerHTML = informations
    containerSummary.prepend(title)
    container.append(containerSummary)
}

function showStatistics(score, details, container) {
    let containerStatistics = document.createElement('div')
    let title = document.createElement('h2')
    title.innerHTML = 'Statistics'
    containerStatistics.append(title)

    score.forEach(statistic => {
        let containerScore = createContainerScore(statistic)
        let detailsScore = findRelatedInformations(details, statistic.name)

        if (!detailsScore) return

        let containerDetails = createContainerDetails(detailsScore)
        containerStatistics.append(containerScore, containerDetails)
    })
    container.append(containerStatistics)
}

function showAverageScore(informations, container) {
    let containerAverage = document.createElement('div')
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

export { showInformationsUrbanArea }
