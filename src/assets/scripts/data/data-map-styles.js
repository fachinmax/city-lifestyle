let hybrid = [
    `http://{s}.google.com/vt/lyrs=s,h,&x={x}&y={y}&z={z}`,
    {
        maxZoom: 19,
        attribution: '© Google maps',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
]
let terrain = [
    `http://{s}.google.com/vt/lyrs=p,&x={x}&y={y}&z={z}`,
    {
        maxZoom: 19,
        attribution: '© Google maps',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
]
let satellite = [
    `http://{s}.google.com/vt/lyrs=s,&x={x}&y={y}&z={z}`,
    {
        maxZoom: 19,
        attribution: '© Google maps',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
]
let street = [
    `http://{s}.google.com/vt/lyrs=m,&x={x}&y={y}&z={z}`,
    {
        maxZoom: 19,
        attribution: '© Google maps',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
]

let dataMapStyles = {
    hybrid,
    satellite,
    street,
    terrain,
}

export { dataMapStyles }
