import { cookies } from 'next/headers';
import { findCustomer } from './data';

// Demo session: the cookie holds the customer id. Not for production use.
export function currentCustomer() {
  const id = cookies().get('larkspur_session')?.value;
  return id ? findCustomer(id) : null;
}
