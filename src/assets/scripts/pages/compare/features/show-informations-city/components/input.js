function getInput(type, name, placeholder) {
    let input = document.createElement('input')
    input.type = type
    input.name = name
    input.placeholder = placeholder
    input.autocomplete = 'off'
    input.setAttribute('data-dimension', 'small')
    return input
}

export { getInput }
