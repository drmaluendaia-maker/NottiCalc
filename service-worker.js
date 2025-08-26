// Nombre del caché para nuestra aplicación
const CACHE_NAME = 'notti-calc-v1';

// Lista de archivos esenciales para que la app funcione offline
const urlsToCache = [
    '/', // El archivo HTML principal (index.html)
    'manifest.json', // El archivo de manifiesto
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://unpkg.com/feather-icons'
];

// Evento 'install': se dispara cuando el service worker se instala por primera vez.
self.addEventListener('install', event => {
    // Esperamos a que la promesa de abrir el caché y agregar los archivos se complete
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto y archivos cacheados');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento 'fetch': se dispara cada vez que la app intenta acceder a un recurso (una página, un script, etc.)
self.addEventListener('fetch', event => {
    event.respondWith(
        // Buscamos si el recurso solicitado ya está en el caché
        caches.match(event.request)
            .then(response => {
                // Si encontramos el recurso en el caché, lo devolvemos.
                // Si no, intentamos obtenerlo de la red.
                return response || fetch(event.request);
            })
    );
});
