export const mapConfig = {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

export const controlConfig = {
    position: 'bottomright',
    draggableWaypoints: false,
    routeWhileDragging: false,
    lineOptions: {
        styles: [
            {
                color: '#757de8',
            },
        ],
    },
}
