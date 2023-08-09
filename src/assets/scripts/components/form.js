function getForm(name, outputAttribute) {
    let form = document.createElement('form')
    form.name = name
    form.dataset.output = outputAttribute
    return form
}

export { getForm }
