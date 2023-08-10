function getButton(id, content) {
    let btn = document.createElement('button')
    btn.id = id
    btn.textContent = content
    return btn
}

export { getButton }
