const version = 'v1';

self.addEventListener('install', event => {
	// Install and Activate right away
	self.skipWaiting();

	event.waitUntil(
		caches.open(version).then(cache =>
			cache.addAll([
				// add all files to cache
				'./offline/index.html'
			])
		)
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(keys) {
			return Promise.all(
				keys
					.filter(function(key) {
						return key !== version;
					})
					.map(key => {
						return caches.delete(key);
					})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(res) {
			if (res) {
				return res;
			}
			if (!navigator.onLine) {
				return caches.match(new Request('/app/offline/index.html'));
			}
			return fetchAndUpdate(event.request);
		})
	);
});

function fetchAndUpdate(request) {
	return fetch(request).then(res => {
		if (res) {
			return caches.open(version).then(cache => {
				return cache.put(request, res.clone()).then(() => {
					return res;
				});
			});
		}
	});
}
