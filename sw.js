
// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
	'/pwa/',
	'/pwa/index.html',
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
  var c = document.getElementById('console')
  c.innerHTML = 'fetch - ' + event.request.url
  console.log('fetch - ' + event.request.url)
	event.respondWith(
		caches
			.match(event.request)
			.then(function(response) {
        console.log(response)
				return response ? response : fetch(event.request);
			})
	);
});
