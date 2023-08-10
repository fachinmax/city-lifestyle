function getForm(id, name, controlsAttribute) {
    let form = document.createElement('form')
    form.id = id
    form.name = name
    form.setAttribute('aria-controls', controlsAttribute)
    return form
}

export { getForm }
