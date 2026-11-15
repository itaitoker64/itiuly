/*
 * Service worker — the app has to open on a speedboat.
 *
 * The shell (page, script, styles, seed) is fetched network-first so an
 * update shows on the very next open, and falls back to the cached copy
 * after a few seconds or with no signal at all. Wikimedia photos are
 * cached as they are seen. The plan itself is not cached here: the page keeps
 * its own copy in localStorage, which it can also write to while offline.
 */
const VERSION = 'trip-v13';
const SHELL = `${VERSION}-shell`;
const PHOTOS = `${VERSION}-photos`;
// Uploaded files (vouchers, passports) outlive app versions: a ferry pier is no place to re-download them.
const FILES = 'trip-files';

const SHELL_FILES = ['/trip', '/trip-app.js', '/trip-app.css', '/shared-seed.js', '/journal-view.js', '/journal.css'];
// Libraries, fonts and map tiles from other hosts: saved as they are used, kept across versions.
const VENDOR = 'trip-vendor';
const TILES = 'trip-tiles';
const MAX_TILES = 1500;
// The page's own Next.js scripts: hashed and immutable, and without them the app cannot start offline.
const NEXT = 'trip-next';

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
          keys.filter((key) => !key.startsWith(VERSION) && ![FILES, VENDOR, TILES, NEXT].includes(key)).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isVendor(url) {
  return /^(cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|unpkg\.com)$/.test(url.hostname);
}
function isTile(url) {
  return /(^|\.)basemaps\.cartocdn\.com$|(^|\.)tile\.openstreetmap\.org$|(^|\.)arcgisonline\.com$/.test(url.hostname);
}
/** Cache first: a library version or a map tile never changes. */
function cacheFirst(event, name, limit) {
  event.respondWith(
    caches.open(name).then(async (cache) => {
      const hit = await cache.match(event.request);
      if (hit) return hit;
      try {
        const response = await fetch(event.request);
        if (response.ok || response.type === 'opaque') {
          await cache.put(event.request, response.clone());
          if (limit) cache.keys().then((keys) => { if (keys.length > limit) keys.slice(0, keys.length - limit).forEach((k) => cache.delete(k)); });
        }
        return response;
      } catch {
        return Response.error();
      }
    })
  );
}

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

  if (isVendor(url)) { cacheFirst(event, VENDOR); return; }
  if (url.origin === self.location.origin && url.pathname.startsWith('/_next/static/')) { cacheFirst(event, NEXT, 400); return; }
  if (isTile(url)) { cacheFirst(event, TILES, MAX_TILES); return; }

  // An uploaded file never changes: the network copy when there is one, the saved copy without signal.
  if (url.origin === self.location.origin && /^\/api\/files\/[^/]+$/.test(url.pathname)) {
    event.respondWith(
      caches.open(FILES).then(async (cache) => {
        try {
          const response = await fetch(request);
          if (response.ok) cache.put(request, response.clone());
          return response;
        } catch {
          const hit = await cache.match(request);
          return hit || Response.error();
        }
      })
    );
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
      const live = fetch(request, { cache: 'no-store' }).then(async (response) => {
        if (response.ok) {
          // keep one copy per file: the newest version replaces older ?v= copies
          const old = await cache.keys();
          await Promise.all(old.filter((k) => new URL(k.url).pathname === url.pathname && k.url !== request.url).map((k) => cache.delete(k)));
          await cache.put(request, response.clone());
        }
        return response;
      });
      // A versioned file (?v=) that is already saved is exactly this version: serve it at once.
      const exact = url.search ? await cache.match(request) : null;
      if (exact) { live.catch(() => undefined); return exact; }
      const any = await cache.match(request, { ignoreSearch: true });
      if (!any) return live.catch(() => Response.error());
      if (url.search) {
        // A new version: wait for it, falling back to the saved one only with no connection.
        return live.catch(() => any);
      }
      // The page itself: fresh when the network answers; the cached copy on a slow or dead connection.
      const timeout = new Promise((resolve) => setTimeout(() => resolve(any), 4000));
      return Promise.race([live.catch(() => any), timeout]);
    })
  );
});
