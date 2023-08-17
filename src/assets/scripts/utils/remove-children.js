'use strict'

function removeChildren(...args) {
    args.forEach(container => {
        while (container.children.length) {
            container.firstElementChild.remove()
        }
    })
}

export { removeChildren }
