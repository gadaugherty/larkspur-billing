export const metadata = { title: 'Larkspur Supply Co. — Billing' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 760, margin: '40px auto', padding: '0 16px' }}>
        <header style={{ borderBottom: '1px solid #ddd', marginBottom: 24 }}>
          <h2>Larkspur Supply Co. · Billing</h2>
        </header>
        {children}
      </body>
    </html>
  );
}
