// Generates synthetic customers and invoices. Every record is fake:
// emails use example.com, phones use the reserved 555-01xx range,
// card numbers are processor test cards.
import { writeFileSync } from 'node:fs';

let s = 42;
const rand = () => ((s = (s * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);
const pick = a => a[Math.floor(rand() * a.length)];

const first = ['Maya', 'Jordan', 'Priya', 'Tomas', 'Aiko', 'Sam', 'Lena', 'Omar', 'Grace', 'Diego', 'Noor', 'Eli'];
const last = ['Okafor', 'Lindqvist', 'Ramirez', 'Chen', 'Haddad', 'Novak', 'Brennan', 'Sato', 'Adeyemi', 'Kowalski'];
const companies = ['Bramble & Finch Bakery', 'Northgate Dental', 'Tidewater Outfitters', 'Copperleaf Studio',
  'Harbor Lane Vet Clinic', 'Quill Street Books', 'Meridian Climbing Gym', 'Saltbox Coffee Roasters'];
const cities = [['Portland', 'OR', '972'], ['Austin', 'TX', '787'], ['Madison', 'WI', '537'], ['Raleigh', 'NC', '276'], ['Boise', 'ID', '837']];
const streets = ['Alder St', 'Juniper Ave', 'Harbor Way', 'Kestrel Rd', 'Mill Pond Ln'];
const cards = [['visa', '4242'], ['mastercard', '4444'], ['amex', '8431'], ['visa', '1881']];
const items = [['Supply plan - monthly', 4900], ['Packaging bundle', 12850], ['Express freight', 2400], ['Label printer rental', 1500], ['Bulk order credit', -2000]];

const customers = companies.map((company, i) => {
  const f = pick(first), l = pick(last), [city, st, zip] = pick(cities), [brand, last4] = pick(cards);
  const slug = company.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, '');
  return {
    id: `cus_${(1000 + i).toString(36)}${Math.floor(rand() * 1e6).toString(36)}`,
    tenant: slug,
    company,
    contact: `${f} ${l}`,
    email: `${f.toLowerCase()}.${l.toLowerCase()}@${slug}.example.com`,
    phone: `(${pick(["503", "512", "608", "919", "208"])}) 555-01${String(Math.floor(rand() * 100)).padStart(2, '0')}`,
    address: `${100 + Math.floor(rand() * 900)} ${pick(streets)}, ${city}, ${st} ${zip}${String(Math.floor(rand() * 100)).padStart(2, '0')}`,
    tax_id: `00-000${String(1000 + i * 37).slice(-4)}`,
    card: { brand, last4, exp: `${String(1 + Math.floor(rand() * 12)).padStart(2, '0')}/${28 + Math.floor(rand() * 3)}` },
    password: 'larkspur-demo-pass'
  };
});

const invoices = [];
let n = 1001;
for (const c of customers) {
  for (let k = 0; k < 3; k++) {
    const lines = Array.from({ length: 1 + Math.floor(rand() * 3) }, () => {
      const [desc, unit] = pick(items), qty = unit < 0 ? 1 : 1 + Math.floor(rand() * 4);
      return { desc, qty, unit_minor: unit };
    });
    const subtotal = lines.reduce((t, x) => t + x.qty * x.unit_minor, 0);
    const tax = Math.round(subtotal * 0.0825);
    invoices.push({
      id: `INV-${n++}`, customer: c.id, tenant: c.tenant, currency: 'usd',
      issued: `2026-${String(7 + k).padStart(2, '0')}-${String(1 + Math.floor(rand() * 27)).padStart(2, '0')}`,
      status: k < 2 ? 'paid' : pick(['open', 'past_due']),
      lines, subtotal_minor: subtotal, tax_minor: tax, total_minor: subtotal + tax
    });
  }
}

writeFileSync(new URL('../data/customers.json', import.meta.url), JSON.stringify(customers, null, 2) + '\n');
writeFileSync(new URL('../data/invoices.json', import.meta.url), JSON.stringify(invoices, null, 2) + '\n');
console.log(`seeded ${customers.length} customers, ${invoices.length} invoices`);
