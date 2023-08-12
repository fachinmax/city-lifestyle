function removeContainer(event) {
    let container = this.closest('#search-city-container')
    container.remove()
}

export { removeContainer }
