import { neon } from '@neondatabase/serverless';

type SqlTag = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => Promise<Record<string, unknown>[]>;

/**
 * Vercel's Neon integration names its variables after whichever prefix you
 * pick when connecting the database, so the exact name is not predictable.
 * Known names are tried first; failing that, any environment variable holding
 * a Postgres connection string is used, preferring a pooled one.
 */
const KNOWN_URL_VARS = [
  'DATABASE_URL',
  'POSTGRES_URL',
  'NEON_DATABASE_URL',
  'DATABASE_POSTGRES_URL',
  'STORAGE_URL',
  'POSTGRES_PRISMA_URL',
];

function isPostgresUrl(value: string | undefined): value is string {
  return !!value && /^postgres(ql)?:\/\//.test(value);
}

function connectionString(): string {
  for (const name of KNOWN_URL_VARS) {
    if (isPostgresUrl(process.env[name])) return process.env[name] as string;
  }

  const discovered = Object.entries(process.env)
    .filter(([, value]) => isPostgresUrl(value))
    .map(([name, value]) => ({ name, value: value as string }));

  // A pooled endpoint suits serverless better than a direct one.
  const pooled = discovered.find(
    (entry) =>
      entry.value.includes('-pooler.') && !entry.name.includes('UNPOOLED')
  );
  const chosen = pooled ?? discovered[0];
  if (chosen) return chosen.value;

  throw new Error(
    'חסר DATABASE_URL — חברו מסד נתונים של Neon לפרויקט ב-Vercel (Storage → Neon), ' +
      'ואז עשו Redeploy כדי שהמשתנה ייכנס לתוקף'
  );
}

/**
 * Neon in production (HTTP driver, no connection pooling needed on serverless);
 * plain node-postgres for a local database during development, so the same
 * tagged-template queries run in both.
 */
function createSql(): SqlTag {
  const url = connectionString();
  if (/neon\.tech|neon\.build/.test(url)) {
    return neon(url) as unknown as SqlTag;
  }

  // Lazily required so the pg driver never ships into the Neon path.
  const { Pool } = require('pg') as typeof import('pg');
  const pool = new Pool({ connectionString: url });
  return async (strings, ...values) => {
    const text = strings.reduce(
      (acc, part, i) => acc + part + (i < values.length ? `$${i + 1}` : ''),
      ''
    );
    const result = await pool.query(text, values as unknown[]);
    return result.rows;
  };
}

let sqlInstance: SqlTag | null = null;

export const sql: SqlTag = (strings, ...values) => {
  if (!sqlInstance) sqlInstance = createSql();
  return sqlInstance(strings, ...values);
};

let initialized = false;

/** Creates the tables on first use, so a fresh Neon database just works. */
export async function ensureSchema(): Promise<void> {
  if (initialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      username    TEXT PRIMARY KEY,
      display_name TEXT NOT NULL,
      emoji       TEXT NOT NULL DEFAULT '🧳',
      password_hash TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS trip_state (
      id         TEXT PRIMARY KEY,
      data       JSONB NOT NULL,
      version    BIGINT NOT NULL DEFAULT 1,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_by TEXT
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS trip_state_history (
      id         BIGSERIAL PRIMARY KEY,
      state_id   TEXT NOT NULL,
      data       JSONB NOT NULL,
      version    BIGINT NOT NULL,
      saved_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
      saved_by   TEXT
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS trip_state_history_lookup
      ON trip_state_history (state_id, version DESC)
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS login_attempts (
      username   TEXT NOT NULL,
      at         TIMESTAMPTZ NOT NULL DEFAULT now(),
      ok         BOOLEAN NOT NULL
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS login_attempts_recent ON login_attempts (username, at DESC)
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS trip_files (
      id         TEXT PRIMARY KEY,
      name       TEXT NOT NULL,
      mime       TEXT NOT NULL,
      bytes      BYTEA NOT NULL,
      size       INTEGER NOT NULL,
      uploaded_by TEXT,
      uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS presence (
      username TEXT PRIMARY KEY,
      at       TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  initialized = true;
}

/** כמה גרסאות אחורה שומרים לכל מסמך */
export const HISTORY_DEPTH = 30;
