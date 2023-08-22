function unHighlightElement(listChoises) {
    let index = listChoises.index

    if (index !== -1) {
        let elementHighlighted = listChoises.children[index]
        elementHighlighted.setAttribute('data-highlight', false)
    }
}

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
                !(relatedTarget instanceof HTMLLIElement)
            ) {
                unHighlightElement(listChoises)
            }

            if (
                target instanceof HTMLLIElement &&
                relatedTarget instanceof HTMLLIElement
            ) {
                relatedTarget.setAttribute('data-highlight', false)
            }

            target.setAttribute('data-highlight', true)

            break
        case 'mouseout':
            if (
                target instanceof HTMLLIElement &&
                !(relatedTarget instanceof HTMLLIElement)
            ) {
                target.setAttribute('data-highlight', false)
            }

            break
    }
}

export { highlightElement }
