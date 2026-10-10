import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { login } from '../../lib/data';

async function signIn(form) {
  'use server';
  const c = login(form.get('email'), form.get('password'));
  if (!c) redirect('/login?error=1');
  cookies().set('larkspur_session', c.id, { httpOnly: true, sameSite: 'lax' });
  redirect('/invoices');
}

export default function Login({ searchParams }) {
  return (
    <form action={signIn} style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <h3>Sign in</h3>
      {searchParams?.error && <p style={{ color: 'crimson' }}>Email or password did not match.</p>}
      <input name="email" type="email" placeholder="email" required />
      <input name="password" type="password" placeholder="password" required />
      <button type="submit">Sign in</button>
    </form>
  );
}
