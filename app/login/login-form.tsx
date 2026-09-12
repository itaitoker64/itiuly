'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type TripUser = { username: string; displayName: string; emoji: string };

export default function LoginForm({ users }: { users: TripUser[] }) {
  const router = useRouter();
  const [username, setUsername] = useState(users[0]?.username ?? '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body?.error || 'משהו השתבש, נסו שוב');
        setBusy(false);
        return;
      }
      router.replace('/trip');
      router.refresh();
    } catch {
      setError('אין חיבור לשרת');
      setBusy(false);
    }
  }

  return (
    <main className="login-wrap">
      <div className="login-card">
        <div className="login-hero">
          <div className="login-emoji">🌏</div>
          <h1>My Big Trip</h1>
          <p>התכנון המשותף של איתי וטליה · תאילנד ומה שאחריה</p>
        </div>

        <form onSubmit={submit}>
          <label className="login-label">מי נכנס?</label>
          <div className="login-users">
            {users.map((user) => (
              <button
                key={user.username}
                type="button"
                className={
                  'login-user' + (username === user.username ? ' active' : '')
                }
                onClick={() => {
                  setUsername(user.username);
                  setError('');
                }}
                aria-pressed={username === user.username}
              >
                <span className="lu-emoji">{user.emoji}</span>
                <span className="lu-name">{user.displayName}</span>
              </button>
            ))}
          </div>

          <label className="login-label" htmlFor="password">
            סיסמה
          </label>
          <input
            id="password"
            className="login-input"
            type="password"
            value={password}
            autoComplete="current-password"
            placeholder="הסיסמה שלכם"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <div className="login-error">{error}</div> : null}

          <button className="login-submit" type="submit" disabled={busy}>
            {busy ? 'רגע…' : 'יאללה, נכנסים'}
          </button>
        </form>

        <div className="login-foot">
          כל שינוי נשמר לשרת — ומופיע מיד גם אצל השני.
        </div>
      </div>
    </main>
  );
}
