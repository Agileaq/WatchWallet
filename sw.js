const CACHE_NAME = 'bitwatch-v4.3';
const urlsToCache = [
  './bitwatch_V4.3.html',
  './libs/js/tailwind.min.js',
  './libs/js/vue.min.js',
  './libs/css/fontawesome.min.css',
  './libs/webfonts/fa-brands-400.woff2',
  './libs/webfonts/fa-regular-400.woff2',
  './libs/webfonts/fa-solid-900.woff2'
];

// 安装Service Worker并缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('缓存已打开');
        return cache.addAll(urlsToCache);
      })
  );
});

// 拦截请求，优先使用缓存
self.addEventListener('fetch', event => {
  // 只处理http/https协议的请求，忽略chrome-extension等协议
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 缓存命中，返回缓存
        if (response) {
          return response;
        }
        // 未命中，发起网络请求
        return fetch(event.request).then(
          response => {
            // 检查是否是有效响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // 只缓存http/https的GET请求
            if (event.request.method === 'GET' && event.request.url.startsWith('http')) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }
            return response;
          }
        ).catch(() => {
          // 网络请求失败，返回离线页面或默认响应
          return new Response('网络连接失败', { status: 503 });
        });
      })
  );
});

// 清理旧缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
