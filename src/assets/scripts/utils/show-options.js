function showOptions(cities, container) {
    cities.forEach(item => {
        let liElement = document.createElement('li')
        liElement.textContent = item.name
        liElement.idCity = item.id
        container.append(liElement)
    })
}

export { showOptions }
