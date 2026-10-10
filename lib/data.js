import customers from '../data/customers.json';
import invoices from '../data/invoices.json';

export const findCustomer = id => customers.find(c => c.id === id);
export const login = (email, password) =>
  customers.find(c => c.email === email && c.password === password);
export const invoicesFor = tenant => invoices.filter(i => i.tenant === tenant);
export const findInvoice = id => invoices.find(i => i.id === id);
export const money = minor => `$${(minor / 100).toFixed(2)}`;
