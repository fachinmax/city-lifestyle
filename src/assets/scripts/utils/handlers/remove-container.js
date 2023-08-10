function removeContainer(event) {
    let container = this.closest('#search-city-container')
    console.log(container)
    container.remove()
}

export { removeContainer }
