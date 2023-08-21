function getUl(id) {
    let ul = document.createElement('ul')
    ul.id = id
    ul.hidden = true
    return ul
}

export { getUl }
