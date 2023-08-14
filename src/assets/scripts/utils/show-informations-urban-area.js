function showSummary(informations, container) {
    let containerSummary = document.createElement('div')
    let title = document.createElement('h2')
    title.innerHTML = 'Summary'
    containerSummary.innerHTML = informations
    containerSummary.prepend(title)
    container.append(containerSummary)
}

function showStatistics(informations, container) {
    let containerStatistics = document.createElement('div')
    let title = document.createElement('h2')
    title.innerHTML = 'Statistics'
    containerStatistics.append(title)

    informations.forEach(statistic => {
        let card = document.createElement('div')
        let title = document.createElement('h3')
        title.innerHTML = statistic.name
        let paragraph = document.createElement('p')
        let dataFixed = Number(statistic.score_out_of_10).toFixed(2)
        paragraph.innerHTML = `${dataFixed}/10`
        card.append(title, paragraph)
        containerStatistics.append(card)
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

function showInformationsUrbanArea(informations, container) {
    showSummary(informations.summary, container)
    showStatistics(informations.categories, container)
    showAverageScore(informations.teleport_city_score, container)
}

export { showInformationsUrbanArea }
