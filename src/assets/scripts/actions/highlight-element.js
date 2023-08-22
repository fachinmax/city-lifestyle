function highlightElement(event) {
    let form = event.target.closest('form')
    let input = form.elements['search-bar']
    let target = event.target
    let relatedTarget = relatedTarget

    switch (event.type) {
        case 'mouseover':
            if (target instanceof HTMLLIElement && !(relatedTarget instanceof HTMLLIElement)) {
                target.setAttribute('data-highlight', true)
                input.value = target.textContent
            }

            if (target instanceof HTMLLIElement && relatedTarget instanceof HTMLLIElement) {
                relatedTarget.setAttribute('data-highlight', false)
                target.setAttribute('data-highlight', true)
                input.value = input.textContent
            }

            break
        case 'mouseout':
            if (target instanceof HTMLLIElement && !(relatedTarget instanceof HTMLLIElement)) {
                target.setAttribute('data-highlight', false)
                input.value = input.partialNameCity
            }

            break
    }
}

export { highlightElement }
