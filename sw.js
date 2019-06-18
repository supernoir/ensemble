self.addEventListener('install', function (event){
  console.log('SW installed');
  // Install and Activate right away
  self.skipWaiting();
});

self.addEventListener('activate', function (event){
  console.log('SW activated');
});

self.addEventListener('fetch', function (event) {
  console.log(event.request.url);

  if (!navigator.onLine) {
    event.respondWith(new Response('<h1> Offline :( </h1>', {headers: { 'Content-Type': 'text/html'}}));
  } else {
    // Pass through request
    event.respondWith(fetch(event.request));
  }
})
