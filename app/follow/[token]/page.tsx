import { notFound } from 'next/navigation';
import { followTokenValid, listJournal } from '@/lib/journal';
import { USERS } from '@/lib/users';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'בדרכים · תאילנד 2026', robots: { index: false, follow: false } };

/**
 * The family follow page: the journal and the route, read-only, no sign-in.
 * Works only while the link's token is the one stored; turning the link off
 * in the app makes this a 404.
 */
export default async function FollowPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!(await followTokenValid(token))) notFound();
  const journal = await listJournal();
  const people = Object.fromEntries(USERS.map((u) => [u.username, { name: u.displayName, emoji: u.emoji }]));
  const boot = JSON.stringify({ token, people, ...journal }).replace(/</g, '\\u003c');

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@700&family=Heebo:wght@400;500;600;700&display=swap" />
      <link rel="stylesheet" href="/journal.css" />
      <style>{`
        body{margin:0;background:#F6F1E7;color:#3A332C;font-family:'Heebo',sans-serif;}
        .fw{max-width:620px;margin:0 auto;padding:18px 16px 40px;}
        .fw h1{font-family:'Frank Ruhl Libre',serif;font-size:26px;margin:4px 0 2px;}
        .fw .sub{color:#8C8272;font-size:13px;}
        .fw .live{display:inline-block;margin-top:8px;font-size:12px;color:#6F8560;}
      `}</style>
      <main className="fw" dir="rtl" lang="he">
        <h1>בדרכים 🌏</h1>
        <div className="sub">איתי וטליה בתאילנד · היומן מתעדכן מהטלפונים שלהם</div>
        <div id="fw-stats" />
        <div id="fw-map" className="jv-map" />
        <div id="fw-last" className="live" />
        <div id="fw-timeline" />
      </main>
      <script dangerouslySetInnerHTML={{ __html: `window.FOLLOW=${boot};` }} />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js" defer />
      <script src="/journal-view.js" defer />
      <script src="/follow-app.js" defer />
    </>
  );
}
