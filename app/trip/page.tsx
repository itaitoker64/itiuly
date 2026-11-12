import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';
import { getUser } from '@/lib/users';
import TripAppLoader from './trip-app-loader';

export const dynamic = 'force-dynamic';

export default async function TripPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  if (!session) redirect('/login');
  const user = getUser(session.username);
  if (!user) redirect('/login');

  const shell = await readFile(
    path.join(process.cwd(), 'lib', 'shell.html'),
    'utf8'
  );

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500;700;900&family=Heebo:wght@300;400;500;600;700&display=swap"
      />
      <link rel="stylesheet" href="/trip-app.css" />
      <div dangerouslySetInnerHTML={{ __html: shell }} />
      <TripAppLoader user={user} />
    </>
  );
}
