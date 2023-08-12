function showOptions(cities, container) {
    cities.forEach(item => {
        let liElement = document.createElement('li')
        liElement.textContent = item.name
        liElement.dataset.idCity = item.id
        container.append(liElement)
    })
}

export { showOptions }
