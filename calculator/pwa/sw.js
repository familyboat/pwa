const cacheName = "calculatorPwa-v1";
const appShellFiles = [
  "./",
  "./index.html",
  "./app.js",
  "./pwa.webmanifest",
  "./style.css",
  "./icons/favicon.ico",
]

// 安装service worker
self.addEventListener("install", (e) => {
  console.log("[service worker] install");
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log("[service worker] caching all: app shell and content");
    await cache.addAll(appShellFiles);
  })());
});



// 使用service worker获取内容
self.addEventListener("fetch", (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[service worker] fetching resource: ${e.request.url}`);
    if (r) {
      return r;
    }

    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[service worker] caching new resource: ${e.request.url}`);
    cache.put(e.request, response);
    return response;
  })())
})