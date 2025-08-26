// Nombre del caché para nuestra aplicación
const CACHE_NAME = 'notti-calc-v2'; // Incrementamos la versión del caché

// Lista de archivos esenciales para que la app funcione offline
const urlsToCache = [
    '/', // El archivo HTML principal (index.html)
    'manifest.json', // El archivo de manifiesto
    'Normas Residente 2022.pdf', // PDF de Normas 2022
    'normas 2024 by aime y juli-1.pdf', // PDF de Normas 2024
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

// Evento 'activate': Limpia cachés antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('notti-calc-') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
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
