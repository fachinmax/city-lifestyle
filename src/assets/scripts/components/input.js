function getInput(type, name, placeholder) {
    let input = document.createElement('input')
    input.type = type
    input.name = name
    input.placeholder = placeholder
    return input
}

export { getInput }
