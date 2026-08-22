// Service Worker for BitWatch
// 更新机制（参考 CalorieCounter / vite-plugin-pwa 的 prompt 模式）：
// - sw.js 字节变化 → 浏览器检测到新 SW → 安装进入 waiting
// - 页面 updatefound 监听到 waiting → 显示"发现新版本"横幅
// - 用户点"更新" → postMessage({type:'SKIP_WAITING'}) → self.skipWaiting()
// - controllerchange → 页面自动刷新，加载新版本
//
// 触发字节变化的方式：BUILD_HASH 由 .git/hooks/post-commit 自动写入每次 commit 的 hash。
// 每次 git commit → hook 把 sw.js 的 BUILD_HASH 更新为当前 commit hash → sw.js 字节变 → 横幅必弹。
// 无需手动 bump 任何版本号。VERSION (index.html) 仅作展示，不参与更新检测。

// BUILD_HISTORICAL_VERSION：语义版本号，仅用于缓存命名区分（大版本时手动改）。
// BUILD_HASH：每次 commit 由 post-commit hook 注入，驱动 SW 字节变化。
const BUILD_HISTORICAL_VERSION = 'V6.3';
const BUILD_HASH = 'c23c9c7'; // 会被 post-commit hook 自动覆盖
const CACHE_VERSION = `${BUILD_HISTORICAL_VERSION}-${BUILD_HASH}`;
const CACHE_NAME = `bitwatch-${CACHE_VERSION}`;
const APP_SHELL = [
  './index.html',
  './libs/js/tailwind.min.js',
  './libs/js/vue.min.js',
  './libs/css/fontawesome.min.css',
  './libs/webfonts/fa-brands-400.woff2',
  './libs/webfonts/fa-regular-400.woff2',
  './libs/webfonts/fa-solid-900.woff2'
];

// 收到 SKIP_WAITING 消息：立即激活新 SW（prompt 模式由用户点击触发）
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 安装：预缓存应用骨架。cache: 'reload' 确保拿到最新内容，绕过 HTTP 缓存
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(APP_SHELL.map(url =>
        cache.add(new Request(url, { cache: 'reload' }))
      ))
    )
  );
});

// 拦截请求：缓存优先，未命中走网络
self.addEventListener('fetch', event => {
  // 只处理 http/https 协议，忽略 chrome-extension 等协议
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // 导航请求（页面刷新/打开）回退到缓存的 index.html，保证离线可用
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then(cached =>
        cached || fetch(event.request)
      )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
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
          // 只缓存 http/https 的 GET 请求
          if (event.request.method === 'GET' && event.request.url.startsWith('http')) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        }
      ).catch(() => {
        // 网络请求失败
        return new Response('网络连接失败', { status: 503 });
      });
    })
  );
});

// 清理旧缓存。不调用 clients.claim()：首次安装不自动抢夺 controller，
// 仅在用户点击"更新"(skipWaiting) 后由 controllerchange 触发刷新
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
