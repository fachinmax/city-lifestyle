'use strict'

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

export { showInformationsCity }
