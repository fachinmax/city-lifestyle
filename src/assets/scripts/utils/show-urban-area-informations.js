function showSummary(informations, container) {
    let summaryContainer = document.createElement('div')
    let title = document.createElement('h2')
    title.innerHTML = 'Summary'
    summaryContainer.innerHTML = informations
    summaryContainer.prepend(title)
    container.append(summaryContainer)
}

function showStatistics(informations, container) {
    let statisticsContainer = document.createElement('div')
    let title = document.createElement('h2')
    title.innerHTML = 'Statistics'
    statisticsContainer.append(title)

    informations.forEach(statistic => {
        let card = document.createElement('div')
        let title = document.createElement('h3')
        title.innerHTML = statistic.name
        let paragraph = document.createElement('p')
        let dataFixed = Number(statistic.score_out_of_10).toFixed(2)
        paragraph.innerHTML = `${dataFixed}/10`
        card.append(title, paragraph)
        statisticsContainer.append(card)
    })
    container.append(statisticsContainer)
}

function showAverageScore(informations, container) {
    let averageContainer = document.createElement('div')
    let title = document.createElement('h2')
    title.innerHTML = 'Total average'
    let average = document.createElement('p')
    let dataFixed = Number(informations).toFixed(2)
    average.innerHTML = dataFixed
    averageContainer.prepend(title, average)
    container.append(averageContainer)
}

function showUrbanAreaInformations(informations, container) {
    showSummary(informations.summary, container)
    showStatistics(informations.categories, container)
    showAverageScore(informations.teleport_city_score, container)
}

export { showUrbanAreaInformations }
