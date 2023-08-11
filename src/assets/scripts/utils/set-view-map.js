function setViewMap(map, style) {
    let layer = L.tileLayer(
        `http://{s}.google.com/vt/lyrs=${style},&x={x}&y={y}&z={z}`,
        {
            maxZoom: 19,
            attribution: '© Google maps',
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        }
    )
    map.addLayer(layer)
    return layer
}

export { setViewMap }
