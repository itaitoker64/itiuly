'use client';

import { useEffect } from 'react';

type TripUser = { username: string; displayName: string; emoji: string };

const LEAFLET_SRC =
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
const SHARED_SEED_SRC = '/shared-seed.js';
const APP_SRC = '/trip-app.js';

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-trip-src="${src}"]`
    );
    if (existing) {
      resolve();
      return;
    }
    const el = document.createElement('script');
    el.src = src;
    // Must be async: dynamically inserted scripts with async=false run in
    // insertion order, so a slow CDN would hold the app's own scripts behind
    // it. Order within the app is enforced by chaining these promises instead.
    el.async = true;
    el.dataset.tripSrc = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`failed to load ${src}`));
    document.body.appendChild(el);
  });
}

/**
 * The trip app is plain DOM JavaScript that expects the markup to already be
 * on the page, so it is loaded here, after mount — Leaflet first, then the app.
 */
let booting: Promise<void> | null = null;

export default function TripAppLoader({ user }: { user: TripUser }) {
  // The identity must be in place before the app script runs.
  (globalThis as unknown as { TRIP_USER?: TripUser }).TRIP_USER = user;

  useEffect(() => {
    // Started once per page, never cancelled: a re-render must not abort a
    // half-loaded app, and each script is a no-op if it is already there.
    if (booting) return;
    // The app's own scripts first, and never behind the CDN: a blocked or slow
    // Leaflet must not stop the trip from loading.
    booting = loadScript(SHARED_SEED_SRC)
      .then(() => loadScript(APP_SRC))
      .catch(() => undefined);

    // The map library arrives on its own; the map tab re-initialises when it does.
    loadScript(LEAFLET_SRC)
      .then(() => {
        const app = window as unknown as { initMapIfNeeded?: () => void; activeTab?: string };
        if (app.activeTab === 'map' && typeof app.initMapIfNeeded === 'function') {
          app.initMapIfNeeded();
        }
      })
      .catch(() => undefined);
  }, []);

  return null;
}
