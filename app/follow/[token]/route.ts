import { followTokenValid, listJournal } from '@/lib/journal';
import { USERS } from '@/lib/users';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * The family follow page: the journal and the route, read-only, no sign-in.
 * Served as plain HTML, not a React page: the journal is drawn by a small
 * script, and React hydration would wipe what that script drew.
 * Works only while the link's token is the one stored.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!(await followTokenValid(token))) {
    return new Response('<!doctype html><meta charset="utf-8"><p style="font-family:sans-serif;direction:rtl">הקישור לא פעיל.</p>', {
      status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
  const journal = await listJournal();
  const people = Object.fromEntries(USERS.map((u) => [u.username, { name: u.displayName, emoji: u.emoji }]));
  const boot = JSON.stringify({ token, people, ...journal }).replace(/</g, '\\u003c');
  const html = `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>בדרכים · תאילנד 2026</title>
<link rel="icon" href="/favicon.ico">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@700&family=Heebo:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/journal.css">
<style>
  body{margin:0;background:#F6F1E7;color:#3A332C;font-family:'Heebo',sans-serif;}
  .fw{max-width:620px;margin:0 auto;padding:16px 16px 40px;}
  .fw .live{display:block;margin:8px 0 0;font-size:12px;color:#6F8560;}
</style>
</head>
<body>
<main class="fw">
  <div class="jv-hero"><div class="jv-hero-top"><div><h2>בדרכים 🌏</h2>
    <div class="jv-hero-sub">איתי וטליה בתאילנד · היומן מתעדכן מהטלפונים שלהם</div></div></div>
    <div id="fw-stats"></div></div>
  <div id="fw-map" class="jv-map"></div>
  <span id="fw-last" class="live"></span>
  <div id="fw-timeline"></div>
</main>
<script>window.FOLLOW=${boot};</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
<script src="/journal-view.js"></script>
<script src="/follow-app.js"></script>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}
