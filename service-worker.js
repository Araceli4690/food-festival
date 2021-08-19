//global constants we need
const APP_PREFIX = 'Foodfest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

//files we'd like to cache, there is storage limit so prioritize functionality
const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
];

//self refers to the service-worker object
self.addEventListener('install', function (e) {
    //telling browser to wait until work is complete before terminating service-worker
    e.waitUntil(
        //fincding specific chaes by na,e
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache :' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        //.keys() returns an array of all cache names & calling those name in keylist
        caches.keys().then(function (keyList) {
            //capture ones that have app prefix adn save in array cacheKeepList
            let cacheKeeplist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            cacheKeeplist.push(CACHE_NAME);

            return Promise.all(
                keyList.map(function (key, i) {
                    if (cacheKeeplist.indexOf(key) === -1) {
                        console.log('deleting cache:' + keyList[i]);
                        return caches.delete(keyList[i]);
                    }
                })
            )
        })
    )
})

//telling app how to retrieve info from the cache
//listen for fetch event
self.addEventListener('fetch', function (e) {
    //log url of requested resource
    console.log('fetch request:' + e.request.url)
    //how we will respond to the request
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
                //if cache is available respond with
                console.log('responding with cache:' + e.request.url)
                return request
            } else {
                //if there are no cache, try fetching request
                console.log('file is not caches, fetching:' + e.request.url)
                return fetch(e.request)
            }
        })
    )
})