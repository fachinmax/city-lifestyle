function getDiv(id, ariaLabelledbyAttribute) {
    let div = document.createElement('div')
    div.id = id
    ariaLabelledbyAttribute &&
        div.setAttribute('aria-labelledby', ariaLabelledbyAttribute)
    return div
}

export { getDiv }
