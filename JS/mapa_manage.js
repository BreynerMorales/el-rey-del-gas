// Crear mapa centrado en Lima
const map = L.map('map').setView([-12.06, -77.03], 13);

// Capa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 100,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Coordenadas aproximadas de tus direcciones
const ubicaciones = [
    {
    nombre: "Sucursal Arriola",
    direccion: "Av. Nicolás de Piérola 1300, Óvalo Arriola - La Victoria",
    coords: [-12.0723, -77.0209]
    },
    {
    nombre: "Sucursal Aviación",
    direccion: "Av. Aviación 1300, La Victoria",
    coords: [-12.0851, -77.0023]
    }
];

// Agregar marcadores
ubicaciones.forEach(ubic => {
    L.marker(ubic.coords)
    .addTo(map)
    .bindPopup(`<b>${ubic.nombre}</b><br>${ubic.direccion}`);
});

// Ajustar el mapa para mostrar ambos puntos
const group = new L.featureGroup(ubicaciones.map(u => L.marker(u.coords)));
map.fitBounds(group.getBounds().pad(0.4));