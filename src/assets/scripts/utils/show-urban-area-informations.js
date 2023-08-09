function showUrbanAreaInformations(informations, container) {
    for (let [key, value] of Object.entries(informations)) {
        if (key === 'urbanArea') continue
        let paragraph = document.createElement('p')
        paragraph.innerHTML = `${key}: ${value}`
        container.append(paragraph)
    }
}

export { showUrbanAreaInformations }
