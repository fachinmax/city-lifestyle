function showOptions(cities, container) {
    if (cities.length === 0) return

    cities.forEach(item => {
        let liElement = document.createElement('li')
        liElement.textContent = item.name
        container.append(liElement)
    })
}

export { showOptions }
