import { neon } from '@neondatabase/serverless';

type SqlTag = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => Promise<Record<string, unknown>[]>;

function connectionString(): string {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.NEON_DATABASE_URL;
  if (!url) {
    throw new Error(
      'חסר DATABASE_URL — הגדירו את מחרוזת החיבור של Neon במשתני הסביבה של הפרויקט ב-Vercel'
    );
  }
  return url;
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
  initialized = true;
}
