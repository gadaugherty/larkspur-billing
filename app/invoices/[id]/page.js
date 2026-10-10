import { notFound } from 'next/navigation';
import { findCustomer, findInvoice, money } from '../../../lib/data';

// Relies on middleware.js for authentication.
export default function Invoice({ params }) {
  const inv = findInvoice(params.id);
  if (!inv) notFound();
  const c = findCustomer(inv.customer);
  return (
    <>
      <h3>{inv.id} · {inv.status}</h3>
      <p>{c.company}<br />{c.contact} · {c.email} · {c.phone}<br />{c.address}<br />Tax ID {c.tax_id}</p>
      <table width="100%" cellPadding={6}>
        <tbody>
          {inv.lines.map((l, n) => (
            <tr key={n}><td>{l.desc}</td><td>× {l.qty}</td><td align="right">{money(l.qty * l.unit_minor)}</td></tr>
          ))}
          <tr><td colSpan={2}>Tax</td><td align="right">{money(inv.tax_minor)}</td></tr>
          <tr><td colSpan={2}><b>Total</b></td><td align="right"><b>{money(inv.total_minor)}</b></td></tr>
        </tbody>
      </table>
      <p>Paid with {c.card.brand} •••• {c.card.last4} (exp {c.card.exp})</p>
    </>
  );
}
