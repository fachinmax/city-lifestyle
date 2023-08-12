function removeContainer(event) {
    let container = this.closest('#city-search-container')
    container.remove()
}

export { removeContainer }
