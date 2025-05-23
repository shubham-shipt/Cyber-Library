const CACHE_NAME = 'pdf-cache';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                '/',
                '/index.html'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(fetchResponse => {
                if (event.request.url.endsWith('.pdf')) {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, fetchResponse.clone());
                    });
                }
                return fetchResponse;
            });
        })
    );
});