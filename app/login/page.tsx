import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';
import { USERS } from '@/lib/users';
import LoginForm from './login-form';
import './login.css';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (await verifySessionToken(token)) redirect('/trip');
  return <LoginForm users={USERS} />;
}
