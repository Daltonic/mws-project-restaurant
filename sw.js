const cacheName = "mws-restaurant";
const offlinePage = "index.html";

self.addEventListener("install", event => {
 const urlForCache = [
   offlinePage,
   '/',
   "/restaurant.html",
   "/css/main.css",
   "/css/restaurant.css",
   "/data/restaurants.json",
   "/js/dbhelper.js",
   "/js/main.js",    
   "/js/restaurant_info.js",
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
 ];

 event.waitUntil(
   caches.open(cacheName).then(cache => cache.addAll(urlForCache))
 );
});

self.addEventListener("fetch", event => {
 event.respondWith(
   caches.match(event.request).then(response => {
     if (response) {
       return response;
     }
   
     const fetchRequest = event.request.clone();

     return fetch(fetchRequest)
       .then(response => {
         if (!response || response.status !== 200) {
           return response;
         }

         const cacheRes = response.clone();

         caches.open(cacheName).then(cache => {
           cache.put(event.request, cacheRes);
         });

         return response;
       })
       .catch(error => {
         if (
           event.request.method === "GET" &&
           event.request.headers.get("accept").includes("text/html")
         ) {
           return caches.match(offlinePage);
         }
       });
   })
 );
});