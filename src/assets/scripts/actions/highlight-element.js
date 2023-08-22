function highlightElement(event) {
    switch (event.type) {
        case 'mouseover':
            if (
                event.target instanceof HTMLLIElement &&
                !(event.relatedTarget instanceof HTMLLIElement)
            ) {
                event.target.setAttribute('data-highlight', true)
            }

            if (
                event.target instanceof HTMLLIElement &&
                event.relatedTarget instanceof HTMLLIElement
            ) {
                event.relatedTarget.setAttribute('data-highlight', false)
                event.target.setAttribute('data-highlight', true)
            }

            break
        case 'mouseout':
            if (
                event.target instanceof HTMLLIElement &&
                !(event.relatedTarget instanceof HTMLLIElement)
            ) {
                event.target.setAttribute('data-highlight', false)
            }

            break
    }
}

export { highlightElement }
