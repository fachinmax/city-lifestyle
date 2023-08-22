function highlightElement(event) {
    let form = event.target.closest('form')
    let input = form.elements['search-bar']
    let listChoises = this
    let target = event.target
    let relatedTarget = event.relatedTarget

    switch (event.type) {
        case 'mouseover':
            if (
                target instanceof HTMLLIElement &&
                relatedTarget instanceof HTMLLIElement
            ) {
                relatedTarget.setAttribute('data-highlight', false)
            }

            target.setAttribute('data-highlight', true)
            input.value = target.textContent
            listChoises.idCitySelected = target.idCity

            break
        case 'mouseout':
            if (
                target instanceof HTMLLIElement &&
                !(relatedTarget instanceof HTMLLIElement)
            ) {
                target.setAttribute('data-highlight', false)
                input.value = input.partialNameCity
                listChoises.idCitySelected = -1
            }

            break
    }
}

export { highlightElement }
