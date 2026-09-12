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
    el.async = false;
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
export default function TripAppLoader({ user }: { user: TripUser }) {
  useEffect(() => {
    (window as unknown as { TRIP_USER: TripUser }).TRIP_USER = user;
    let cancelled = false;
    loadScript(LEAFLET_SRC)
      .catch(() => undefined) // the map degrades gracefully; the app must still boot
      .then(() => (cancelled ? undefined : loadScript(SHARED_SEED_SRC)))
      .then(() => (cancelled ? undefined : loadScript(APP_SRC)))
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [user]);

  return null;
}
