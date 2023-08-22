function getUl(id) {
    let ul = document.createElement('ul')
    ul.id = id
    ul.setAttribute('data-location', 'table')
    ul.hidden = true
    return ul
}

export { getUl }
