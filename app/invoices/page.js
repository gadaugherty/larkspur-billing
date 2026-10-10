import Link from 'next/link';
import { currentCustomer } from '../../lib/session';
import { invoicesFor, money } from '../../lib/data';

export default function Invoices() {
  const me = currentCustomer();
  if (!me) return <p>Session expired.</p>;
  return (
    <>
      <p>{me.company} · {me.contact} · card on file {me.card.brand} •••• {me.card.last4}</p>
      <table width="100%" cellPadding={6}>
        <thead><tr><th align="left">Invoice</th><th align="left">Issued</th><th align="left">Status</th><th align="right">Total</th></tr></thead>
        <tbody>
          {invoicesFor(me.tenant).map(i => (
            <tr key={i.id}>
              <td><Link href={`/invoices/${i.id}`}>{i.id}</Link></td>
              <td>{i.issued}</td><td>{i.status}</td><td align="right">{money(i.total_minor)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
