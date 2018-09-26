
// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches-2';
var urlsToCache = [
	'/pwa/',
	'/pwa/index.html',
	'/pwa/offline.html',
	'/pwa/css/style.css',
	'/pwa/drawer.js'
];

// インストール処理
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(function(cache) {
				return cache.addAll(urlsToCache);
			})
	);
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
  console.log('fetch - ' + event.request.url)

  const url = new URL(event.request.url);
  if (url.origin == location.origin && url.pathname == '/pwa/' && !navigator.onLine) {
    return event.respondWith(caches.match('/pwa/offline.html'));
  }

	event.respondWith(
		caches
			.match(event.request)
			.then(function(response) {
        console.log(response)
				return response ? response : fetch(event.request);
			})
	);
});
