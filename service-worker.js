const CACHE='personal-trainer-v1';
const ASSETS=[
  '/meu-personal-trainer/',
  '/meu-personal-trainer/index.html',
  '/meu-personal-trainer/manifest.webmanifest',
  '/meu-personal-trainer/icon-192.png',
  '/meu-personal-trainer/icon-512.png'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request).then(r=>r||caches.match('/meu-personal-trainer/'))));
});