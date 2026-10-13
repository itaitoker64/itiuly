/*
 * Service worker — the app has to open on a speedboat.
 *
 * The shell (page, script, styles, seed) is fetched network-first so an
 * update shows on the very next open, and falls back to the cached copy
 * after a few seconds or with no signal at all. Wikimedia photos are
 * cached as they are seen. The plan itself is not cached here: the page keeps
 * its own copy in localStorage, which it can also write to while offline.
 */
const VERSION = 'trip-v2';
const SHELL = `${VERSION}-shell`;
const PHOTOS = `${VERSION}-photos`;

const SHELL_FILES = ['/trip', '/trip-app.js', '/trip-app.css', '/shared-seed.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(SHELL_FILES))
      .catch(() => undefined) // a missing file must not stop the worker installing
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => !key.startsWith(VERSION)).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isPhoto(url) {
  return /wikimedia\.org|wikipedia\.org/.test(url.hostname);
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  // The plan and the sign-in must always be the live answer.
  if (url.pathname.startsWith('/api/')) return;

  if (isPhoto(url)) {
    event.respondWith(
      caches.open(PHOTOS).then(async (cache) => {
        const hit = await cache.match(request);
        if (hit) return hit;
        try {
          const response = await fetch(request);
          if (response.ok) cache.put(request, response.clone());
          return response;
        } catch {
          return hit || Response.error();
        }
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  const shellPath = SHELL_FILES.includes(url.pathname) || url.pathname === '/trip';
  if (!shellPath) return;

  event.respondWith(
    caches.open(SHELL).then(async (cache) => {
      const hit = await cache.match(request, { ignoreSearch: true });
      const live = fetch(request, { cache: 'no-store' }).then((response) => {
        if (response.ok) cache.put(request, response.clone());
        return response;
      });
      if (!hit) return live.catch(() => Response.error());
      // Fresh when the network answers; the cached copy on a slow or dead connection.
      const timeout = new Promise((resolve) => setTimeout(() => resolve(hit), 4000));
      return Promise.race([live.catch(() => hit), timeout]);
    })
  );
});
