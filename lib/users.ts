import { sql, ensureSchema } from './db';
import { hashPassword, verifyPassword } from './auth';

export type TripUser = {
  username: string;
  displayName: string;
  emoji: string;
};

/** The two people on this trip. Passwords come from the environment. */
export const USER_SEEDS = [
  {
    username: 'itai',
    displayName: 'איתי',
    emoji: '🧭',
    passwordEnv: 'ITAI_PASSWORD',
  },
  {
    username: 'talia',
    displayName: 'טליה',
    emoji: '🌏',
    passwordEnv: 'TALIA_PASSWORD',
  },
] as const;

export const USERS: TripUser[] = USER_SEEDS.map((u) => ({
  username: u.username,
  displayName: u.displayName,
  emoji: u.emoji,
}));

export function getUser(username: string): TripUser | undefined {
  return USERS.find((u) => u.username === username);
}

/**
 * Makes sure both accounts exist and that their password matches whatever is
 * currently configured in the environment — so changing a password is just an
 * env var change plus a redeploy.
 */
export async function ensureUsers(): Promise<void> {
  await ensureSchema();
  for (const seed of USER_SEEDS) {
    const password = process.env[seed.passwordEnv];
    if (!password) {
      throw new Error(
        `חסר ${seed.passwordEnv} — הגדירו סיסמה עבור ${seed.displayName} במשתני הסביבה`
      );
    }
    const rows = (await sql`
      SELECT password_hash FROM users WHERE username = ${seed.username}
    `) as { password_hash: string }[];

    if (rows.length === 0) {
      await sql`
        INSERT INTO users (username, display_name, emoji, password_hash)
        VALUES (${seed.username}, ${seed.displayName}, ${seed.emoji}, ${await hashPassword(password)})
      `;
      continue;
    }
    // Env is the source of truth: re-hash when the configured password changed.
    if (!(await verifyPassword(password, rows[0].password_hash))) {
      await sql`
        UPDATE users
           SET password_hash = ${await hashPassword(password)},
               display_name  = ${seed.displayName},
               emoji         = ${seed.emoji}
         WHERE username = ${seed.username}
      `;
    }
  }
}

export async function checkCredentials(
  username: string,
  password: string
): Promise<TripUser | null> {
  await ensureUsers();
  const rows = (await sql`
    SELECT username, display_name, emoji, password_hash
      FROM users WHERE username = ${username}
  `) as {
    username: string;
    display_name: string;
    emoji: string;
    password_hash: string;
  }[];
  if (rows.length === 0) return null;
  if (!(await verifyPassword(password, rows[0].password_hash))) return null;
  return {
    username: rows[0].username,
    displayName: rows[0].display_name,
    emoji: rows[0].emoji,
  };
}
