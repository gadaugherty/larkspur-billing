import { NextResponse } from 'next/server';
import { currentCustomer } from '../../../../lib/session';
import { findInvoice } from '../../../../lib/data';

export function GET(_req, { params }) {
  const me = currentCustomer();
  if (!me) return NextResponse.json({ error: 'auth required' }, { status: 401 });
  const inv = findInvoice(params.id);
  if (!inv) return NextResponse.json({ error: 'not found' }, { status: 404 });
  if (inv.tenant !== me.tenant) return NextResponse.json({ error: 'nope: tenant boundary' }, { status: 403 });
  return NextResponse.json(inv);
}
