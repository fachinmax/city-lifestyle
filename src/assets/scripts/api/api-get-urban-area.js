function apiGetUrbanArea(endpoint) {
    return fetch(`${endpoint}scores/`).then(response => response.json())
}

export { apiGetUrbanArea }
