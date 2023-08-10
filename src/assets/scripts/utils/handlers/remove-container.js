import { getNumberSearchCityContainers } from '../get-number-search-city-containers'

function showAddSeachCityContainerButton() {
    let btn = document.querySelector('#add-containers')
    btn.hidden =
        process.env.MAX_NUMBER_SEARCH_CITY_CONTAINERS ==
        getNumberSearchCityContainers()
}

function removeContainer(event) {
    let container = this.closest('#search-city-container')
    container.remove()
    showAddSeachCityContainerButton()
}

export { removeContainer }
