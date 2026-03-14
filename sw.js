const CACHE_NAME = 'bitwatch-v1.1';
const urlsToCache = [
  './bitwatch_V1.1.html',
  'https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/tailwindcss-browser/4.1.13/index.global.min.js',
  'https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/vue/3.5.22/vue.global.prod.min.js'
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
            // 克隆响应并缓存
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
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
