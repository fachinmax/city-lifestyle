import { dataDictionaryChoises } from '../../data/data-scroll-user-choises'

function setIndex(elemToMark, ulElement) {
    if (dataDictionaryChoises.index.value == -1 && elemToMark === 'up') {
        dataDictionaryChoises.index.value = ulElement.children.length - 1
        return
    }

    if (
        dataDictionaryChoises.index.value == ulElement.children.length - 1 &&
        elemToMark === 'down'
    ) {
        dataDictionaryChoises.index.value = -1
        return
    }

    if (elemToMark === 'up') {
        --dataDictionaryChoises.index.value
        return
    }

    if (elemToMark === 'down') {
        ++dataDictionaryChoises.index.value
        return
    }
}

function highlightChildren(isElemToMark, ulElement, color) {
    if (dataDictionaryChoises.index.value === -1) return

    color = isElemToMark ? color : ''
    ulElement.children[
        dataDictionaryChoises.index.value
    ].style.backgroundColor = color
}

function rewriteInputElement(input, ulElement) {
    // value memorized into show-cities module
    if (dataDictionaryChoises.index.value === -1)
        input.value = dataDictionaryChoises.inputValue.value
    else
        input.value =
            ulElement.children[dataDictionaryChoises.index.value].textContent
}

function scrollToChoises(event) {
    // 40 -> arrow down
    // 38 -> arrow up
    if (!(event.keyCode === 40 || event.keyCode === 38)) return

    if (!this.value) return

    let choisesContainer = this.form.querySelector('#choises')

    if (!choisesContainer.children.length) return

    let direction = event.keyCode === 40 ? 'down' : 'up'
    highlightChildren(false, choisesContainer)
    setIndex(direction, choisesContainer)
    let index = dataDictionaryChoises.index.value
    if (index === -1) {
        dataDictionaryChoises.idCity.value = undefined
    } else {
        dataDictionaryChoises.idCity.value =
            choisesContainer.children[index].dataset.idCity
    }
    highlightChildren(true, choisesContainer, 'yellow')
    rewriteInputElement(this, choisesContainer)
}

export { scrollToChoises }
