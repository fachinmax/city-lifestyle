function showOptions(cities, container) {
    cities.forEach(item => {
        let liElement = document.createElement('li')
        liElement.textContent = item.name
        container.append(liElement)
    })
}

export { showOptions }
