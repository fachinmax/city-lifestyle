function removeChildren(container) {
    while (container.children.length) {
        container.firstElementChild.remove()
    }
}

export { removeChildren }
