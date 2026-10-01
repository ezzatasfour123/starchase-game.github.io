const C="star-chase-v1",A=["./","icon-192.png","icon-512.png","manifest.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.origin!==location.origin||u.pathname.endsWith("admin.html"))return;
e.respondWith(fetch(r).then(s=>{const k=s.clone();caches.open(C).then(c=>c.put(r,k));return s}).catch(()=>caches.match(r).then(m=>m||caches.match("./"))))});
