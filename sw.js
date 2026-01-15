const CACHE_NAME = 'date-countdown-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 安装 Service Worker
self.addEventListener('install', event => {
  console.log('[SW] 安装 Service Worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] 缓存文件');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('[SW] 缓存失败:', error);
      })
  );
  // 立即激活新的 Service Worker
  self.skipWaiting();
});

// 激活 Service Worker
self.addEventListener('activate', event => {
  console.log('[SW] 激活 Service Worker');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] 删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // 立即控制所有客户端
  return self.clients.claim();
});

// 拦截网络请求 - 使用 Cache First 策略
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 缓存命中，返回缓存的资源
        if (response) {
          console.log('[SW] 缓存命中:', event.request.url);
          return response;
        }

        // 缓存未命中，发起网络请求
        return fetch(event.request).then(
          response => {
            // 检查是否为有效响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 克隆响应
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(error => {
          console.error('[SW] 网络请求失败:', error);
          // 可以在这里返回离线页面
        });
      })
  );
});
